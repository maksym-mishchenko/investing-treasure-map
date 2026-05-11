import { auth } from "@auth"
import { db } from "@/lib/db"
import { progress, users } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { randomUUID } from "crypto"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.email) {
    return Response.json({ error: "Not authenticated" }, { status: 401 })
  }

  const body = await request.json()
  const { completedZones, quizScores } = body as {
    completedZones: number[]
    quizScores: Record<string, number>
  }

  if (!Array.isArray(completedZones)) {
    return Response.json({ error: "Invalid data" }, { status: 400 })
  }

  let user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email),
  })

  if (!user) {
    const id = randomUUID()
    const [inserted] = await db
      .insert(users)
      .values({
        id,
        email: session.user.email,
        name: session.user.name ?? null,
        image: session.user.image ?? null,
        role: (session.user as Record<string, unknown>).role as string ?? "user",
      })
      .returning()
    user = inserted
  }

  for (const zoneId of completedZones) {
    if (typeof zoneId !== "number" || zoneId < 1 || zoneId > 7) continue

    const existing = await db.query.progress.findFirst({
      where: and(eq(progress.userId, user.id), eq(progress.zoneId, zoneId)),
    })

    const score = quizScores?.[String(zoneId)] ?? null

    if (!existing) {
      await db.insert(progress).values({
        id: randomUUID(),
        userId: user.id,
        zoneId,
        completed: true,
        quizScore: score,
        completedAt: new Date(),
      })
    } else if (score && (!existing.quizScore || score > existing.quizScore)) {
      await db
        .update(progress)
        .set({ quizScore: score })
        .where(eq(progress.id, existing.id))
    }
  }

  return Response.json({ success: true, imported: completedZones.length })
}
