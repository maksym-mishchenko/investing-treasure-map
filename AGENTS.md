# Investing Treasure Map — Agent Instructions

> Stranger Things-themed interactive investing education platform with quizzes, badges, and progress tracking.

## Project Summary

| Field | Value |
|-------|-------|
| Stack | Next.js 16, React 19, TypeScript (strict), Tailwind CSS v4 |
| Auth | NextAuth.js v5 — Google OAuth, JWT sessions |
| Database | PostgreSQL (Neon/Vercel Postgres) via Drizzle ORM |
| Deploy | Vercel |
| Node | ≥ 18 |
| Package manager | npm |

## Repository Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/
│   │   ├── auth/[...nextauth]/  # NextAuth handler
│   │   ├── badges/              # Badge CRUD
│   │   ├── feedback/            # Feedback + stats
│   │   ├── journal/             # Journal entries
│   │   ├── progress/            # Progress sync (GET/POST)
│   │   ├── quiz/check/          # Quiz answer validation
│   │   ├── stats/               # Aggregate stats (cached)
│   │   └── ticker/              # Stock ticker data
│   ├── journal/page.tsx
│   ├── login/page.tsx
│   ├── profile/page.tsx
│   ├── roadmap/page.tsx
│   ├── zone/[slug]/page.tsx     # Dynamic zone pages
│   ├── layout.tsx               # Root layout (AuthProvider)
│   └── page.tsx                 # Main treasure map UI
├── components/
│   ├── calculators/             # Financial calculators
│   ├── AuthProvider.tsx         # Session + progress sync
│   ├── Quiz.tsx                 # Quiz component
│   ├── MapPath.tsx              # SVG map path
│   └── ...                      # UI components
├── lib/
│   ├── db/
│   │   ├── index.ts             # Drizzle client
│   │   └── schema.ts            # DB schema (users, progress, badges, journal_entries)
│   ├── auth.ts                  # Auth helpers
│   ├── badges.ts                # Badge definitions
│   ├── progress.ts              # localStorage + server sync
│   ├── quiz-answers.ts          # Server-side quiz answers
│   └── zones.ts                 # Zone content definitions
└── types/
    └── next-auth.d.ts           # NextAuth type augmentation
auth.ts                          # NextAuth config (root)
drizzle.config.ts                # Drizzle Kit config
```

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |
| `npx drizzle-kit push` | Push schema to database |
| `npx drizzle-kit studio` | Open Drizzle Studio |

## Architecture

- **Hybrid progress model**: localStorage for offline/anonymous users, syncs to Postgres on auth
- **Auth**: NextAuth v5 with Google OAuth, JWT strategy, admin role via `ADMIN_EMAILS` env var
- **API routes**: All under `src/app/api/` — REST endpoints, no tRPC
- **Database**: Drizzle ORM with Vercel Postgres (Neon). Tables: `users`, `progress`, `badges`, `journal_entries`
- **Security headers**: CSP + HSTS + X-Frame-Options set in `next.config.ts`
- **Quiz answers**: Server-side only (`src/lib/quiz-answers.ts`) — never expose to client

## Coding Conventions

### Required

- TypeScript strict mode — no `any` unless absolutely necessary
- Functional React components with hooks
- `async/await` over `.then()` chains
- Path alias `@/*` maps to `./src/*`, `@auth` maps to `./auth.ts`
- Error handling on all API routes (try/catch with proper HTTP status codes)
- Server Components by default; add `"use client"` only when needed
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`

### Forbidden

- Do NOT expose quiz answers in client bundles
- Do NOT use `var` — use `const`/`let`
- Do NOT disable TypeScript strict checks
- Do NOT store secrets in client-side code
- Do NOT import from `node_modules` internals

## Testing

No test framework configured. If adding tests:
- Use Vitest for unit/integration tests
- Use Playwright for E2E tests
- Test API routes with mock Drizzle client

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `AUTH_GOOGLE_ID` | Google OAuth client ID | Yes |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret | Yes |
| `AUTH_SECRET` | NextAuth JWT secret | Yes |
| `NEXTAUTH_URL` | App URL for NextAuth | Yes (production) |
| `ADMIN_EMAILS` | Comma-separated admin emails | Yes |
| `POSTGRES_URL` | Neon/Vercel Postgres connection string | Yes |
| `NEXT_PUBLIC_APP_URL` | Public app URL | Optional |
| `TELEGRAM_BOT_TOKEN` | Feedback notifications | Optional |
| `TELEGRAM_CHAT_ID` | Feedback notifications | Optional |

## Known Pitfalls

1. **Progress sync race condition**: localStorage and server can diverge if user opens multiple tabs
2. **Quiz answers leak**: `quiz-answers.ts` must NEVER be imported in client components
3. **Admin role check**: Relies on `ADMIN_EMAILS` env var — no database role table
4. **Rate limiting**: Feedback endpoint has basic rate limiting but no global middleware
5. **README outdates**: README mentions "cookie-based auth / Base64 JSON" but actual implementation uses NextAuth JWT

## Git Workflow

- Branch from `main`
- Conventional commit messages
- Push to feature branch, PR to `main`
- Always include: `Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>`

## Deployment

- **Platform**: Vercel
- **Build**: `npm run build`
- **Env vars**: Set in Vercel dashboard
- **Database**: Vercel Postgres (Neon) — schema push via `npx drizzle-kit push`
- No CI/CD workflows — deploys on push to `main` via Vercel Git integration

## Security

- CSP headers configured in `next.config.ts`
- API routes validate session via `auth()` from NextAuth
- Quiz answers server-side only
- CSRF protection via NextAuth
- No exposed admin endpoints without auth check

## Error Handling

- API routes: try/catch with `NextResponse.json({ error }, { status })` pattern
- Client: Error boundaries where appropriate
- Database: Drizzle operations wrapped in try/catch

## Agent Output Contract

- All code changes must pass `npm run lint` and `npm run build`
- Do not modify `.env.local` — use `.env.example` for documentation
- Preserve existing security headers in `next.config.ts`
- Keep quiz answers in server-only files

## Pre-Commit Checklist

- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] No secrets in committed code
- [ ] Quiz answers not exposed to client
- [ ] Conventional commit message with Co-authored-by trailer
- [ ] TypeScript strict mode respected (no `// @ts-ignore`)

<!-- agent-readiness:managed -->
