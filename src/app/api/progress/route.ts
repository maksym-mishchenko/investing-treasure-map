import { auth } from "@auth"
import { db } from "@/lib/db"
import { progress, users } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { randomUUID } from "crypto"
import type { Session } from "next-auth"

/** Ensures the user row exists, creates it if missing. Returns the user record. */
async function getOrCreateUser(session: Session) {
  const email = session.user!.email!
  const existing = await db.query.users.findFirst({ where: eq(users.email, email) })
  if (existing) return existing

  const id = randomUUID()
  const [inserted] = await db
    .insert(users)
    .values({
      id,
      email,
      name: session.user!.name ?? null,
      image: session.user!.image ?? null,
      role: session.user!.role ?? "user",
    })
    .returning()
  return inserted
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) {
    return Response.json({ error: "Not authenticated" }, { status: 401 })
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email),
  })

  if (!user) {
    return Response.json({ progress: [] })
  }

  const userProgress = await db
    .select()
    .from(progress)
    .where(eq(progress.userId, user.id))
  return Response.json({ progress: userProgress })
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.email) {
    return Response.json({ error: "Not authenticated" }, { status: 401 })
  }

  const body = await request.json()
  const { zoneId, quizScore, rating } = body as {
    zoneId: number
    quizScore?: number
    rating?: string
  }

  if (typeof zoneId !== "number" || zoneId < 1 || zoneId > 7) {
    return Response.json({ error: "Invalid zone" }, { status: 400 })
  }

  const user = await getOrCreateUser(session)

  const existing = await db.query.progress.findFirst({
    where: and(eq(progress.userId, user.id), eq(progress.zoneId, zoneId)),
  })

  if (existing) {
    await db
      .update(progress)
      .set({
        completed: true,
        quizScore: quizScore ?? existing.quizScore,
        rating: rating ?? existing.rating,
        completedAt: new Date(),
      })
      .where(eq(progress.id, existing.id))
  } else {
    await db.insert(progress).values({
      id: randomUUID(),
      userId: user.id,
      zoneId,
      completed: true,
      quizScore: quizScore ?? null,
      rating: rating ?? null,
      completedAt: new Date(),
    })
  }

  return Response.json({ success: true })
}
