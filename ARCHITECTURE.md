# Investing Treasure Map — Architecture

## System Overview

```
┌─────────────────────────────────────────────────┐
│                   Vercel Edge                    │
├─────────────────────────────────────────────────┤
│  Next.js 16 App Router                          │
│  ┌──────────────┐  ┌────────────────────────┐   │
│  │  Pages (SSR)  │  │  API Routes            │   │
│  │  - Map UI     │  │  - /api/auth/          │   │
│  │  - Zones      │  │  - /api/progress/      │   │
│  │  - Profile    │  │  - /api/quiz/check/    │   │
│  │  - Journal    │  │  - /api/badges/        │   │
│  └──────┬───────┘  │  - /api/feedback/       │   │
│         │          │  - /api/stats/           │   │
│         │          │  - /api/journal/         │   │
│         │          │  - /api/ticker/          │   │
│         │          └──────────┬───────────────┘   │
│         │                     │                   │
│  ┌──────▼───────┐  ┌─────────▼────────────┐     │
│  │ localStorage  │  │  Drizzle ORM         │     │
│  │ (offline      │  │  (server-side)       │     │
│  │  progress)    │  └─────────┬────────────┘     │
│  └──────────────┘             │                   │
└───────────────────────────────┼───────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │  Vercel Postgres      │
                    │  (Neon)               │
                    │  - users              │
                    │  - progress           │
                    │  - badges             │
                    │  - journal_entries    │
                    └───────────────────────┘
```

## Auth Flow

1. User clicks Login → Google OAuth via NextAuth v5
2. JWT session created (no database sessions)
3. Admin role determined by matching email against `ADMIN_EMAILS` env var
4. On first auth: localStorage progress synced to server

## Data Flow

- **Anonymous users**: Progress stored in localStorage only
- **Authenticated users**: Progress syncs to Postgres, badges and journal entries stored server-side
- **Quiz validation**: Client sends answers → server checks against `quiz-answers.ts` → returns pass/fail + explanations

## Key Design Decisions

- Hybrid localStorage + server progress for offline-first UX
- Quiz answers server-side only to prevent cheating
- Drizzle ORM for type-safe database access
- Security headers (CSP, HSTS) applied globally via next.config.ts
