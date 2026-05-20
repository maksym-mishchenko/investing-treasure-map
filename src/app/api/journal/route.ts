import { auth } from "@auth"
import { db } from "@/lib/db"
import { journalEntries, users } from "@/lib/db/schema"
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

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
    })

    if (!user) {
      return Response.json({ entries: [] })
    }

    const entries = await db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.userId, user.id))

    return Response.json({ entries })
  } catch (err) {
    console.error('[journal/GET] DB error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.email) {
    return Response.json({ error: "Not authenticated" }, { status: 401 })
  }

  const body = await request.json()
  const { zoneId, content } = body as { zoneId: number; content: string }

  if (typeof zoneId !== "number" || zoneId < 1 || zoneId > 7) {
    return Response.json({ error: "Invalid zone" }, { status: 400 })
  }

  if (!content || typeof content !== "string" || content.length > 500) {
    return Response.json({ error: "Content required (max 500 chars)" }, { status: 400 })
  }

  try {
    const user = await getOrCreateUser(session)

    const existing = await db.query.journalEntries.findFirst({
      where: and(
        eq(journalEntries.userId, user.id),
        eq(journalEntries.zoneId, zoneId),
      ),
    })

    if (existing) {
      await db
        .update(journalEntries)
        .set({ content, updatedAt: new Date() })
        .where(eq(journalEntries.id, existing.id))
    } else {
      await db.insert(journalEntries).values({
        id: randomUUID(),
        userId: user.id,
        zoneId,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('[journal/POST] DB error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
