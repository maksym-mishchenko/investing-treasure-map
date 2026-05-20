import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { randomUUID } from "crypto"
import type { Session } from "next-auth"

/** Ensures the user row exists, creates it if missing. Returns the user record. */
export async function getOrCreateUser(session: Session) {
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
