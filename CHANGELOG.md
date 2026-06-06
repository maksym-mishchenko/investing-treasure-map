# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

**Agent contribution policy:** Every agent-authored PR must append an entry to `[Unreleased]` with a one-line summary. Include task ID if available.

---

## [Unreleased]

### Added
- Vitest test setup, task #2769 (PR #13)
- What's New v2.5 content, task #2763 (PR #9)

### Changed
- Extracted `getOrCreateUser()` to shared `lib/auth-helpers.ts` (PR #15)

### Fixed
- Guest progress migrated to user account on first sign-in (PR #8)
- Progress restored after sign-in (zones show locked) (PR #8)
- Continue button fix, task #2765 (PR #10)
- Accessibility improvements, task #2764 (PR #11)
- Slop audit cleanup, task #2767 (PR #12)
- Try/catch error boundaries on 3 API routes, task #2815 (PR #14)
