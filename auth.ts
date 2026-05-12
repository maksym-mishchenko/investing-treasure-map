import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { randomUUID } from "crypto"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return true
      // Upsert user on every sign-in so we track all authenticated users,
      // not just those who complete a zone
      await db
        .insert(users)
        .values({
          id: randomUUID(),
          email: user.email,
          name: user.name ?? null,
          image: user.image ?? null,
          role: "user",
        })
        .onConflictDoNothing()
      return true
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.email = profile.email
        token.name = profile.name
        token.picture = profile.picture
        const adminEmails = (process.env.ADMIN_EMAILS ?? "")
          .split(",")
          .map((e) => e.trim().toLowerCase())
        token.role = adminEmails.includes((profile.email ?? "").toLowerCase())
          ? "admin"
          : "user"
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.image = token.picture as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
