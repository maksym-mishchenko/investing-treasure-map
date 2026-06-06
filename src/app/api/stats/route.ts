import { db } from "@/lib/db"
import { users, progress } from "@/lib/db/schema"
import { eq, count, sql } from "drizzle-orm"
import { zones } from "@/lib/zones"

let cache: { data: Record<string, unknown>; expires: number } | null = null

export async function GET() {
  if (cache && Date.now() < cache.expires) {
    return Response.json(cache.data)
  }

  try {
    const [userCount] = await db.select({ count: count() }).from(users)
    const [completionCount] = await db
      .select({ count: count() })
      .from(progress)
      .where(eq(progress.completed, true))

    const topZoneResult = await db
      .select({ zoneId: progress.zoneId, count: count() })
      .from(progress)
      .where(eq(progress.completed, true))
      .groupBy(progress.zoneId)
      .orderBy(sql`count(*) desc`)
      .limit(1)

    const zoneNames: Record<number, string> = Object.fromEntries(
      zones.map((z) => [z.id, z.subtitle])
    )

    const data = {
      users: userCount.count,
      completions: completionCount.count,
      topZone: topZoneResult[0]
        ? zoneNames[topZoneResult[0].zoneId] ?? "Unknown"
        : null,
    }

    cache = { data, expires: Date.now() + 5 * 60 * 1000 }
    return Response.json(data)
  } catch {
    return Response.json({ users: 0, completions: 0, topZone: null })
  }
}
