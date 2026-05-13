# Investing Treasure Map — Copilot Instructions

Next.js 16 + React 19 + TypeScript (strict) + Tailwind v4 + Drizzle ORM + Vercel Postgres.
Stranger Things-themed investing education platform with quizzes, badges, progress tracking.

## Key Rules
- TypeScript strict, no `any`. Path aliases: `@/*` → `./src/*`, `@auth` → `./auth.ts`
- Server Components by default; `"use client"` only when needed
- `async/await` only, no `.then()` chains
- Conventional commits: `feat:`, `fix:`, `chore:`
- Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>

## Architecture
- Auth: NextAuth v5 (Google OAuth, JWT sessions, admin via ADMIN_EMAILS)
- DB: Drizzle ORM → Vercel Postgres (Neon). Schema in `src/lib/db/schema.ts`
- Progress: localStorage (offline) + server sync on auth
- API routes: `src/app/api/` — REST, no tRPC
- Quiz answers: SERVER-ONLY (`src/lib/quiz-answers.ts`) — never import in client

## Commands
- `npm run dev` / `npm run build` / `npm run lint`
- `npx drizzle-kit push` (schema) / `npx drizzle-kit studio`

## Validation
- `npm run lint` + `npm run build` must pass before commit
- No secrets in client code, no quiz answers in client bundles

<!-- agent-readiness:managed -->
