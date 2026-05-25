# AGENTS.md

> **Stranger Things-themed interactive investing guide**
> Stack: TypeScript/Next.js

## Quick Start

<<<<<<< HEAD
See `docs/adr/` for architectural decisions.
||||||| parent of ab5da7f (chore: update agent-readiness files)
| Field | Value |
|-------|-------|
| Stack | Next.js 16, React 19, TypeScript (strict), Tailwind CSS v4 |
| Auth | NextAuth.js v5 — Google OAuth, JWT sessions |
| Database | PostgreSQL (Neon/Vercel Postgres) via Drizzle ORM |
| Deploy | Vercel |
| Node | ≥ 18 |
| Package manager | npm |
=======
| Field           | Value                                                      |
| --------------- | ---------------------------------------------------------- |
| Stack           | Next.js 16, React 19, TypeScript (strict), Tailwind CSS v4 |
| Auth            | NextAuth.js v5 — Google OAuth, JWT sessions                |
| Database        | PostgreSQL (Neon/Vercel Postgres) via Drizzle ORM          |
| Deploy          | Vercel (auto-deploy on push to `main`)                     |
| Node            | ≥ 18                                                       |
| Package manager | npm                                                        |
>>>>>>> ab5da7f (chore: update agent-readiness files)

## Rules

<<<<<<< HEAD
- Follow existing code style and patterns
- Run tests before opening a PR
- Document architectural decisions in `docs/adr/`
- Keep this file ≤10 bullets, ≤400 tokens
||||||| parent of ab5da7f (chore: update agent-readiness files)
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
=======
```
src/
├── app/                         # Next.js App Router pages & API routes
│   ├── api/
│   │   ├── auth/[...nextauth]/  # NextAuth handler
│   │   ├── badges/              # Badge CRUD
│   │   ├── feedback/            # Feedback + Telegram notify + rate limiting
│   │   ├── journal/             # Journal entries per zone
│   │   ├── progress/            # Progress sync (GET/POST) — auth required
│   │   ├── quiz/check/          # Quiz answer validation (server-side)
│   │   ├── stats/               # Aggregate stats with in-memory cache
│   │   └── ticker/              # Stock ticker data
│   ├── journal/page.tsx
│   ├── login/page.tsx
│   ├── profile/page.tsx
│   ├── roadmap/page.tsx
│   ├── zone/[slug]/page.tsx     # Dynamic zone pages
│   ├── layout.tsx               # Root layout (AuthProvider)
│   └── page.tsx                 # Main treasure map UI
├── components/
│   ├── calculators/             # Financial calculators (client components)
│   ├── AuthProvider.tsx         # Session + progress sync on login
│   ├── Quiz.tsx                 # Quiz component
│   ├── MapPath.tsx              # SVG animated path between zones
│   └── ...                      # Other UI components
├── lib/
│   ├── db/
│   │   ├── index.ts             # Drizzle client (Vercel Postgres)
│   │   └── schema.ts            # Tables: users, progress, badges, journal_entries
│   ├── auth.ts                  # Auth session helpers
│   ├── badges.ts                # Badge definitions
│   ├── progress.ts              # localStorage + server sync logic
│   ├── quiz-answers.ts          # SERVER-ONLY — correct answers, never import in client
│   └── zones.ts                 # Zone content, resources, quiz questions
└── types/
    └── next-auth.d.ts           # NextAuth session type augmentation
auth.ts                          # NextAuth config (root) — Google OAuth + JWT callbacks
drizzle.config.ts                # Drizzle Kit config (points at POSTGRES_URL)
next.config.ts                   # Security headers (CSP, X-Frame-Options, etc.)
```
>>>>>>> ab5da7f (chore: update agent-readiness files)

## Key Paths

<<<<<<< HEAD
See repo README for project structure.
||||||| parent of ab5da7f (chore: update agent-readiness files)
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
=======
| Action      | Command                  | Notes                                   |
| ----------- | ------------------------ | --------------------------------------- |
| Dev server  | `npm run dev`            | Starts on http://localhost:3000         |
| Build       | `npm run build`          | Must pass before commit                 |
| Start       | `npm run start`          | Runs production build                   |
| Lint        | `npm run lint`           | ESLint — must pass before commit        |
| Push schema | `npx drizzle-kit push`   | Applies schema changes to Neon/Postgres |
| DB studio   | `npx drizzle-kit studio` | Opens Drizzle Studio GUI                |
| Install     | `npm install`            | After package.json changes              |

## Architecture

- **Hybrid progress model**: localStorage for offline/anonymous users; syncs to Postgres on auth via `AuthProvider.tsx`
- **Auth**: NextAuth v5 with Google OAuth, JWT strategy. Admin role assigned in `jwt()` callback via `ADMIN_EMAILS` env var — no DB role table
- **API routes**: All under `src/app/api/` — REST pattern using `Response.json()`, no tRPC
- **Database**: Drizzle ORM with Vercel Postgres (Neon). Schema in `src/lib/db/schema.ts`
- **Stats caching**: In-memory cache in `src/app/api/stats/route.ts` — resets on serverless cold starts
- **Feedback**: Rate-limited (1/IP/10 min, in-memory) + Telegram notification + external stats API
- **Security headers**: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy configured in `next.config.ts`
- **Quiz answers**: Must remain server-side only (`src/lib/quiz-answers.ts`) — never import in client components

## Coding Conventions

### Required

- TypeScript strict mode — no `any` unless absolutely necessary
- Functional React components with hooks only (no class components)
- `async/await` over `.then()` chains
- Path aliases: `@/*` → `./src/*`, `@auth` → `./auth.ts` (root)
- Error handling on all API routes: `try/catch` with `Response.json({ error }, { status })`
- Server Components by default; add `"use client"` only when state/effects/browser APIs are needed
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`
- Always append Co-authored-by trailer to commits
- Functions under 50 lines; files under 300 lines

### Forbidden

| Pattern                                                   | Why                             | Use Instead                                         |
| --------------------------------------------------------- | ------------------------------- | --------------------------------------------------- |
| `any` type                                                | Loses type safety               | Proper typing or `unknown`                          |
| `var` declarations                                        | Function-scoped, error-prone    | `const` or `let`                                    |
| `.then()` chains                                          | Less readable, harder to debug  | `async/await`                                       |
| Importing `quiz-answers.ts` in client                     | Leaks answers to browser bundle | Server-only import                                  |
| Secrets in client-side code                               | Security risk                   | `NEXT_PUBLIC_` prefix only for non-sensitive values |
| Disabling TypeScript strict (`@ts-ignore`, `@ts-nocheck`) | Bypasses safety                 | Fix the type properly                               |
| `console.log` in production code                          | No structured logging           | Remove or use logger                                |
| Committing secrets/API keys                               | Git history is permanent        | Use `.env.local` (gitignored)                       |
| Editing `package-lock.json` directly                      | Managed by npm                  | Run `npm install`                                   |
| String-concatenated SQL                                   | SQL injection                   | Drizzle ORM parameterized queries                   |

## Testing

No test framework configured. If adding tests:

- **Unit/integration**: Vitest (with mock Drizzle client for API routes)
- **E2E**: Playwright
- **Minimum validation**: `npm run lint` + `npm run build` must pass

## Environment Variables

| Variable               | Description                                 | Required         |
| ---------------------- | ------------------------------------------- | ---------------- |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID                      | Yes              |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret                  | Yes              |
| `AUTH_SECRET`          | NextAuth JWT secret                         | Yes              |
| `NEXTAUTH_URL`         | App canonical URL for NextAuth callbacks    | Yes (production) |
| `ADMIN_EMAILS`         | Comma-separated admin email addresses       | Yes              |
| `POSTGRES_URL`         | Neon/Vercel Postgres connection string      | Yes              |
| `NEXT_PUBLIC_APP_URL`  | Public app URL (used in client-side links)  | Optional         |
| `TELEGRAM_BOT_TOKEN`   | Bot token for feedback notifications        | Optional         |
| `TELEGRAM_CHAT_ID`     | Telegram chat/group ID for feedback         | Optional         |
| `TELEGRAM_THREAD_ID`   | Telegram thread ID (for forum groups)       | Optional         |
| `STATS_API_KEY`        | API key for external feedback stats service | Optional         |

## Known Pitfalls

| Issue                                                   | Workaround                                                                                            |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Progress sync race condition                            | localStorage and server can diverge across tabs — last write wins; no conflict resolution             |
| Quiz answers bundle leak                                | `quiz-answers.ts` must NEVER be imported in any `"use client"` component or page                      |
| Admin role in JWT only                                  | Admin check is purely `ADMIN_EMAILS` env var — changing it requires redeployment                      |
| In-memory rate limiting resets                          | Feedback rate limit (`recentFeedback` Map) resets on serverless cold starts — not persistent          |
| Stats cache resets on cold starts                       | In-memory cache in `stats/route.ts` is not shared across Vercel instances                             |
| README is outdated                                      | README.md describes "cookie-based auth / Base64 JSON" — actual auth is NextAuth v5 JWT                |
| `GOOGLE_CLIENT_ID` vs `AUTH_GOOGLE_ID`                  | Actual env var is `GOOGLE_CLIENT_ID`, not `AUTH_GOOGLE_ID` (old name)                                 |
| `next.config.ts` CSP uses `unsafe-inline`/`unsafe-eval` | Required for Tailwind/Next.js dev but weakens CSP — do not remove without testing                     |
| No CI/CD pipeline                                       | No GitHub Actions configured — Vercel deploys directly from `main`; lint/build not enforced pre-merge |

## Git Workflow

### Branch Naming

```
<type>/<short-description>
```

| Type        | Use For                   | Example                        |
| ----------- | ------------------------- | ------------------------------ |
| `feat/`     | New features              | `feat/add-pagination`          |
| `fix/`      | Bug fixes                 | `fix/login-redirect`           |
| `chore/`    | Maintenance, deps, config | `chore/update-deps`            |
| `refactor/` | Code restructuring        | `refactor/extract-auth-module` |
| `docs/`     | Documentation only        | `docs/update-api-guide`        |
| `test/`     | Test additions/fixes      | `test/add-e2e-coverage`        |

### Commit Messages

Format: `<type>(<scope>): <description>`

```
feat(zones): add zone 7 portfolio content
fix(auth): handle expired token refresh
chore(deps): update next to v16.3
```

Always include trailer:

```
Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

### Pull Requests

- **Title format:** `<type>(<scope>): <description>`
- **Description:** What changed, why, and how to test
- **Merge strategy:** Squash and merge to `main`

## Deployment

- **Platform**: Vercel
- **Trigger**: Auto-deploy on push to `main` via Vercel Git integration
- **Build command**: `npm run build`
- **Env vars**: Set in Vercel dashboard (not in repo)
- **Database schema**: Push via `npx drizzle-kit push` against `POSTGRES_URL`
- **No CI/CD workflows**: No GitHub Actions configured

## Security

### MUST

- Never commit secrets, API keys, or tokens — use `.env.local` (gitignored) and `.env.example` for docs
- Never log PII (emails, passwords, tokens) even at debug level
- Validate all external input in API routes
- Use Drizzle ORM parameterized queries — never string-concatenate SQL

### MUST NOT

- Never disable SSL/TLS verification
- Never use `eval()` or dynamic code execution with user input
- Never expose stack traces to end users in production
- Never import `quiz-answers.ts` in client components
- Never remove or weaken security headers in `next.config.ts` without explicit justification

### Generated / Do-Not-Edit Files

| File                | Generated By  | Edit Instead      |
| ------------------- | ------------- | ----------------- |
| `package-lock.json` | npm           | Run `npm install` |
| `.next/`            | Next.js build | Source files      |
| `node_modules/`     | npm           | `package.json`    |

## Module Boundaries

- `src/lib/quiz-answers.ts` — **server-only**; never import in any client component or page
- `src/lib/db/` — server-side only; never import Drizzle client in `"use client"` files
- `auth.ts` (root) — server-side NextAuth config; use `@auth` alias to import
- `src/lib/progress.ts` — safe in both client and server (uses localStorage on client, no DB calls)
- `src/lib/zones.ts` — safe in both client and server (static content only)

## Error Handling

API routes use `Response.json()` with appropriate HTTP status codes:

```typescript
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const result = await db.select().from(progress);
    return Response.json({ progress: result });
  } catch (error) {
    console.error("DB error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

## Agent Output Contract

When completing a task, agents MUST report:

1. **Files changed** — list all modified/created/deleted files
2. **Commands run** — exact validation commands executed (lint, build)
3. **Test results** — pass/fail counts, any new tests added
4. **What was NOT verified** — be honest about gaps
5. **Risks** — correctness, compatibility, or performance concerns

Additional constraints:

- All code changes must pass `npm run lint` and `npm run build`
- Do not modify `.env.local` — use `.env.example` for documentation
- Preserve existing security headers in `next.config.ts`
- Keep quiz answers in server-only files

## Pre-Commit Checklist

**MUST (required for merge):**

- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] No secrets or hardcoded credentials in committed code
- [ ] Quiz answers not exposed to client bundle
- [ ] New env vars documented in `.env.example`
- [ ] Conventional commit message with Co-authored-by trailer
- [ ] TypeScript strict mode respected (no `// @ts-ignore`)

**SHOULD (expected unless justified):**

- [ ] New/changed code has test coverage
- [ ] Functions under 50 lines
- [ ] Files under 300 lines
- [ ] No `TODO`/`FIXME` without a linked issue

<!-- agent-readiness:managed — Do not remove this line. Sections above
     are auto-generated by the agent-readiness skill. Add custom
     project-specific sections BELOW this marker. They will be
     preserved when running agent-readiness update. -->
>>>>>>> ab5da7f (chore: update agent-readiness files)

<!-- agent-memory:start (managed by scripts/seed-agent-memory.sh — edit canonical source: docs/operations/agent-memory-protocol.md) -->
## Agent Memory Protocol (condensed)

**Before work (substantive tasks):** read `.agent/STATE.md` (check `Last updated`); before changing a subsystem, `grep .agent/DECISIONS.md` for its tag. Trivial tasks: this file only.

**After work:** update `.agent/STATE.md` (merge, preserve untouched in-progress items). If a non-trivial decision was made, append a tagged entry to `.agent/DECISIONS.md`.

**Boundary:** cross-project/stack-wide → ADR in the `docs` repo; single-project → `.agent/DECISIONS.md`.

**Non-trivial =** a future agent would be confused or break something without knowing it.

Full protocol: `docs/operations/agent-memory-protocol.md` in the `docs` repo.
<!-- agent-memory:end -->
