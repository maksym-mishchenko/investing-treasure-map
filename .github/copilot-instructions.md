# Investing Treasure Map — Copilot Instructions

Next.js 16 + React 19 + TypeScript (strict) + Tailwind v4 + Drizzle ORM + Vercel Postgres.
Stranger Things-themed investing education platform with quizzes, badges, progress tracking.

## Commands

| Action | Command | Notes |
|--------|---------|-------|
| Dev server | `npm run dev` | localhost:3000 |
| Build | `npm run build` | Must pass before commit |
| Lint | `npm run lint` | Must pass before commit |
| Push schema | `npx drizzle-kit push` | Applies Drizzle schema to Neon |

## Coding Conventions

### Required

- TypeScript strict mode — no `any`
- Path aliases: `@/*` → `./src/*`, `@auth` → `./auth.ts` (root)
- Server Components by default; `"use client"` only when needed
- `async/await` only, no `.then()` chains
- API error handling: `Response.json({ error }, { status })` pattern
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
- Co-authored-by: `Copilot <223556219+Copilot@users.noreply.github.com>`

### Forbidden

| Pattern | Why | Use Instead |
|---------|-----|-------------|
| `any` type | Loses type safety | Proper typing or `unknown` |
| `var` | Function-scoped | `const` / `let` |
| `.then()` | Less readable | `async/await` |
| Import `quiz-answers.ts` in client | Leaks answers | Server-only import |
| Secrets in client code | Security risk | `.env.local` + `.env.example` |
| `@ts-ignore` / `@ts-nocheck` | Bypasses safety | Fix the type |

## Architecture

- Auth: NextAuth v5 (Google OAuth, JWT). Admin role via `ADMIN_EMAILS` env var
- DB: Drizzle ORM → Vercel Postgres (Neon). Schema in `src/lib/db/schema.ts`
- Progress: localStorage (offline) + server sync on auth via `AuthProvider.tsx`
- API routes: `src/app/api/` — REST, no tRPC
- Quiz answers: **SERVER-ONLY** (`src/lib/quiz-answers.ts`) — never import in client

## Known Pitfalls

| Issue | Workaround |
|-------|-----------|
| Env var is `GOOGLE_CLIENT_ID`, not `AUTH_GOOGLE_ID` | Use correct name in `.env.local` |
| In-memory rate limit/cache resets on cold starts | Expected behavior on serverless |
| README describes old cookie auth | Ignore — actual auth is NextAuth v5 JWT |
| `quiz-answers.ts` must never reach browser | Only import in server routes/components |

## Security

- Never commit secrets — use `.env.local` (gitignored) + `.env.example`
- Validate all external input in API routes
- No `eval()` with user input
- Drizzle parameterized queries only
- Do not remove/weaken security headers in `next.config.ts`

## Pre-Commit Checklist

- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] No secrets or hardcoded credentials
- [ ] Quiz answers not exposed to client bundle
- [ ] New env vars documented in `.env.example`
- [ ] Conventional commit message with Co-authored-by trailer

<!-- agent-readiness:managed — Do not remove this line. -->
