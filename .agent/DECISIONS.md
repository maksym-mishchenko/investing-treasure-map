# Decisions — investing-treasure-map

<!-- Tag vocabulary (controlled, edit per repo): #api #ui #data #auth #infra #build -->

<!-- Newest entries on top. Template:

## [YYYY-MM-DD] <short title>  #tag
**What:** <what changed>
**Why:** <reasoning / problem solved>
**Rejected:** <alternatives and why not> (optional)

-->
## [2026-09-02] Consolidate CI around application checks and one Gitleaks workflow  #infra #build
**What:** Kept `ci.yml`, retained `gitleaks.yml` as the sole secret scan with `main` push and pull-request triggers, and removed the duplicate `secret-scan.yml` plus advisory `agent-state-freshness.yml`.
**Why:** Application checks and secret scanning remain intact while redundant feature-branch runs and advisory memory-policy CI are removed.

## [2026-05-20] Extract shared auth helper to reduce duplication  #api
**What:** Refactored `getOrCreateUser()` out of 4 API routes (badges, journal, progress, progress/import) into shared `lib/auth-helpers.ts` (27f4e43).
**Why:** The same user validation/creation pattern was duplicated across routes; centralizing it makes changes propagate safely and avoids drift.

## [2026-05-20] Add try/catch error boundaries to API routes  #api
**What:** Wrapped async handlers in try/catch with error logging across journal, progress, progress/import routes (5e95cf5).
**Why:** Unhandled promise rejections were silently failing; boundaries return proper HTTP errors instead of hanging requests.

## [2026-05-16] Migrate guest progress to user account on first sign-in  #data
**What:** On first sign-in, fall back to `localStorage['progress_guest']` and migrate it to `localStorage['progress_<email>']` (ae10941).
**Why:** Without this, signing in after guest play re-locked all zones (server had no progress); the guest fallback preserves the user's work across the auth boundary.

## [2026-05-16] Track progress sync by email + version counter  #data
**What:** Replaced the boolean `synced` flag with a `syncedEmail` field and added a `progressVersion` context to force UI re-read after server sync (dcaefd4).
**Why:** The old once-per-session sync meant re-logging-in as a different user never refetched their progress; email-tracking re-syncs whenever identity changes.

## [2026-05-12] Upsert user record on every sign-in  #auth
**What:** Google OAuth callback upserts users on sign-in with `.onConflictDoNothing()` rather than only on first registration (98b8cc5).
**Why:** Tracks all authenticated users in the DB (even those who never complete a zone) and enables admin assignment via `ADMIN_EMAILS`.

## [2026-05-11] Migrate auth to Auth.js v5 + Vercel Postgres  #auth
**What:** Replaced custom cookie auth (login/logout/me routes, manual session.ts) with Auth.js v5 (Google provider, JWT sessions) + Drizzle ORM on Vercel Postgres (820e3a0).
**Why:** Custom auth was high-maintenance and lacked standard protections; Auth.js gives battle-tested OAuth/CSRF, and DB-backed users enable cross-device progress sync and role-based access.
**Rejected:** Keeping hand-rolled cookie sessions.

## [2026-05-11] Curriculum v2 with progress-mapping migration  #data
**What:** Rewrote the 7 zones and added a `CurriculumUpdateModal` that maps old zone IDs to new ones on first load, preserving completion through the breaking schema change (eb5d769).
**Why:** A content overhaul changed zone structure; smart re-mapping avoids confusing users with locked/missing zones and keeps achievement history.

## [2026-05-03] Comprehensive security hardening  #infra
**What:** Added HMAC-SHA256 signed session cookies, login rate limiting (5/min), CSP headers, input validation, removed answer leaks, cut session maxAge 30→7 days, rotated env secrets (d494630).
**Why:** The initial build was open to session forgery, brute force, XSS/clickjacking, and answer leakage; these close common web exploits and shorten the compromise window.

## [2026-05-03] Public read-only mode (no forced login)  #auth
**What:** Removed the `/login` redirect for unauthenticated users; all zones/quizzes are accessible, with guest progress saved to `localStorage['progress_guest']` (d55dafa).
**Why:** Forced login was a friction barrier; guests can explore freely while authenticated users get persistent, cross-device progress.
