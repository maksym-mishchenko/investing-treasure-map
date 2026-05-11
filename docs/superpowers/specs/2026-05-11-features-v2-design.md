# Investing Treasure Map — Features v2 Design

## Problem

The app has solid curriculum content but lacks depth, interactivity, and social proof. Users read and quiz but don't interact with real data or see that others use the app. The app needs features that make it both a genuine learning tool and a technically impressive portfolio piece.

## Features (3 Phases)

---

## Phase 1: Quick Wins

### 1.1 Community Stats Dashboard

**What:** Live counters on the homepage showing aggregate usage data.

**Display:**
```
🎓 142 investors trained · 📚 487 zones completed · ⭐ Most loved: Dividends
```

**Data source:** Extend existing `/api/feedback/stats` endpoint to also return:
- Total unique users (from `users` table count)
- Total zone completions (from `progress` table count where completed=true)
- Most completed zone (GROUP BY zoneId, ORDER BY count DESC)
- Average rating per zone (for "most loved")

**Implementation:**
- New API route: `GET /api/stats` — returns `{ users, completions, topZone, topRating }`
- Query the Postgres DB directly (no external API)
- Cache response for 5 minutes (in-memory or via `Cache-Control`)
- Component: `CommunityStats.tsx` — renders the stats bar on homepage
- Also counts guest completions from the feedback stats API (existing)

**Files:**
- New: `src/app/api/stats/route.ts`
- New: `src/components/CommunityStats.tsx`
- Modified: `src/app/page.tsx` (replace old community stats section)

### 1.2 Interactive Calculators

**What:** Three calculators users can play with, embedded in relevant zones.

**Calculator 1 — Compound Interest (Zone 1: Why Investing)**
- Inputs: Starting amount, monthly contribution, annual return %, years
- Output: Animated growing chart + final amount vs total contributed
- Shows the "cost of waiting" — what happens if you start 5 years later
- Defaults: $1,000 start, $200/month, 8% return, 20 years

**Calculator 2 — Dividend Reinvestment (Zone 6: Dividends)**
- Inputs: Share price, shares owned, dividend per share, years, DRIP on/off
- Output: Side-by-side comparison of DRIP vs cash dividends
- Shows snowball effect visually — share count growing each year
- Defaults: $50/share, 100 shares, $2 dividend, 20 years

**Calculator 3 — Portfolio Allocator (Zone 7: Portfolio)**
- Inputs: Total amount, sliders for stocks/bonds/REITs allocation
- Output: Pie chart + historical return range for that allocation
- Preset buttons: "Conservative (40/50/10)", "Balanced (60/30/10)", "Aggressive (80/10/10)"
- Shows estimated range after 10/20/30 years

**Implementation:**
- All calculators are client-side only (no API calls)
- Use simple canvas/CSS for charts (no charting library — keep bundle small)
- Each calculator is a self-contained component
- Added as a new "interactive" resource type in the zone page (renders inline, not as a link)

**Files:**
- New: `src/components/calculators/CompoundInterestCalc.tsx`
- New: `src/components/calculators/DividendCalc.tsx`
- New: `src/components/calculators/PortfolioAllocator.tsx`
- Modified: `src/app/zone/[slug]/page.tsx` (render calculators for matching zones)
- Modified: `src/lib/zones.ts` (add calculator flag to zones 1, 6, 7)

---

## Phase 2: Engagement Features

### 2.1 Achievements & Badges

**What:** Unlockable badges displayed on a user profile page.

**Badge List (10 badges):**

| Badge | Name | Trigger | Icon |
|-------|------|---------|------|
| 1 | First Steps | Complete Zone 1 | 🌱 |
| 2 | Index Fund Believer | Complete Zone 2 | 🛡️ |
| 3 | Real Estate Mogul | Complete Zone 3 | 🏰 |
| 4 | Number Cruncher | Complete Zone 4 | 📊 |
| 5 | Stock Detective | Complete Zone 5 | 🔍 |
| 6 | Dividend Collector | Complete Zone 6 | ❄️ |
| 7 | Portfolio Architect | Complete all 7 zones | ⚔️ |
| 8 | Speed Runner | Complete all zones in one session | ⚡ |
| 9 | Perfectionist | Score 100% on any quiz | 💎 |
| 10 | Feedback Hero | Submit feedback or topic request | 💬 |

**Profile Page (`/profile`):**
- User avatar + name (from Google)
- Badge grid (earned = full color, unearned = grayed out with hint)
- Progress summary: zones completed, average quiz score, time invested
- "Share your achievement" button — generates an OG image or shareable card

**Implementation:**
- New DB table: `badges` (id, userId, badgeId, earnedAt)
- Badge checking logic runs after quiz completion and feedback submission
- New component: `BadgeCard.tsx`
- New page: `src/app/profile/page.tsx`
- Link to profile from user avatar in header

**Files:**
- New: `src/lib/db/schema.ts` (add badges table)
- New: `src/app/profile/page.tsx`
- New: `src/components/BadgeCard.tsx`
- New: `src/lib/badges.ts` (badge definitions + check logic)
- New: `src/app/api/badges/route.ts` (GET user badges)
- Modified: `src/components/AuthProvider.tsx` (avatar links to /profile)
- Modified: Quiz completion flow (trigger badge check)

### 2.2 Investment Journal

**What:** After completing each zone's quiz, users write a short reflection.

**Prompt per zone:**
| Zone | Journal Prompt |
|------|---------------|
| 1 | "What's one financial habit you want to change?" |
| 2 | "Would you invest in an index fund? Why or why not?" |
| 3 | "Does real estate investing interest you? What type?" |
| 4 | "Pick a company you use daily. What would you look for in their statements?" |
| 5 | "Name one company you'd research first. Why?" |
| 6 | "Would you prefer dividend income or growth stocks? Why?" |
| 7 | "Write your one-sentence investment plan." |

**Flow:**
1. User completes quiz → sees zone rating (existing)
2. Below rating, journal prompt appears with textarea
3. User writes reflection (optional, max 500 chars)
4. Saved to DB for authenticated users
5. After Zone 7, show full journal summary — all 7 reflections as a "Personal Investment Manifesto"

**Summary Page (`/journal`):**
- Shows all journal entries chronologically
- Beautiful card layout with zone colors
- Print-friendly / shareable
- Only visible to authenticated users

**Implementation:**
- New DB table: `journal_entries` (id, userId, zoneId, content, createdAt)
- New component: `JournalPrompt.tsx` (textarea after quiz)
- New page: `src/app/journal/page.tsx`
- New API: `src/app/api/journal/route.ts` (GET/POST)

**Files:**
- Modified: `src/lib/db/schema.ts` (add journal_entries table)
- New: `src/components/JournalPrompt.tsx`
- New: `src/app/journal/page.tsx`
- New: `src/app/api/journal/route.ts`
- Modified: `src/app/zone/[slug]/page.tsx` (add journal after rating)
- Modified: `src/lib/zones.ts` (add journalPrompt to Zone interface)

---

## Phase 3: Live Data

### 3.1 Real-Time Stock Ticker

**What:** Live market data shown in relevant zones.

**Per-zone display:**
| Zone | Ticker Data |
|------|------------|
| 2 (Index Funds) | S&P 500 (SPY), Total Market (VTI) — price + daily change |
| 3 (REITs) | Vanguard Real Estate ETF (VNQ) — price + dividend yield |
| 5 (Stock Picking) | 3-5 well-known stocks (AAPL, MSFT, KO, JNJ) — price + P/E |
| 6 (Dividends) | Top 3 Dividend Aristocrats — price + yield |

**API:** Yahoo Finance v8 (free, no key needed, rate-limited)
- Endpoint: `https://query1.finance.yahoo.com/v8/finance/chart/{symbol}`
- Alternative: Alpha Vantage (free tier: 25 requests/day)

**Implementation:**
- Server-side API route: `GET /api/ticker?symbols=SPY,VTI,VNQ`
- Cache responses for 15 minutes (market data doesn't need to be real-time for education)
- Component: `StockTicker.tsx` — shows price, daily change (green/red), mini sparkline
- Graceful fallback: if API fails, show "Market data unavailable" (never break the zone)

**Files:**
- New: `src/app/api/ticker/route.ts`
- New: `src/components/StockTicker.tsx`
- Modified: `src/app/zone/[slug]/page.tsx` (render ticker for zones 2,3,5,6)
- Modified: `src/lib/zones.ts` (add tickerSymbols to Zone interface)

---

## Out of Scope

- Gamification leaderboards (comparing users against each other)
- Social login providers beyond Google
- Mobile app (PWA could be future enhancement)
- Real brokerage integration
- AI-powered content generation
- Multi-language support
