import { auth } from "@auth"
import { getOrCreateUser } from "@/lib/auth-helpers"
import { db } from "@/lib/db"
import { progress, users } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { randomUUID } from "crypto"
import type { Session } from "next-auth"

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) {
    return Response.json({ error: "Not authenticated" }, { status: 401 })
  }

  try {
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
  } catch (err) {
    console.error('[progress/GET] DB error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
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

  try {
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
  } catch (err) {
    console.error('[progress/POST] DB error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
