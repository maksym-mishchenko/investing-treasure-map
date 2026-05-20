import { auth } from "@auth"
import { getOrCreateUser } from "@/lib/auth-helpers"
import { db } from "@/lib/db"
import { badges, users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { randomUUID } from "crypto"
import type { Session } from "next-auth"

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) {
    return Response.json({ error: "Not authenticated" }, { status: 401 })
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email),
  })

  if (!user) {
    return Response.json({ badges: [] })
  }

  const userBadges = await db
    .select()
    .from(badges)
    .where(eq(badges.userId, user.id))

  return Response.json({ badges: userBadges })
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.email) {
    return Response.json({ error: "Not authenticated" }, { status: 401 })
  }

  const body = await request.json()
  const { badgeId } = body as { badgeId: string }

  if (!badgeId || typeof badgeId !== "string") {
    return Response.json({ error: "Invalid badgeId" }, { status: 400 })
  }

  const user = await getOrCreateUser(session)

  try {
    await db
      .insert(badges)
      .values({
        id: randomUUID(),
        userId: user.id,
        badgeId,
        earnedAt: new Date(),
      })
      .onConflictDoNothing({ target: [badges.userId, badges.badgeId] })
  } catch {
    // Duplicate badge — ignore
  }

  return Response.json({ success: true })
}
