# Investing Treasure Map — Curriculum v2 Design

## Problem

The current 7-zone curriculum is too fluffy. Zones 1 (money mindset/psychology), 6 (paper trading), and 7 (personal plan) don't teach actionable investing. Resources are generic. The goal is to teach real investing — S&P 500, REITs, stock picking, dividends — from near-zero knowledge without "skip your latte" filler.

## Approach

Full rewrite of all 7 zones in `src/lib/zones.ts` with new content, resources, and quizzes. Stranger Things theme is kept. A version-based popup handles returning users whose progress is reset. Three new UX features are added: curriculum update popup, per-zone rating, and completion feedback.

## Zone Structure

All 7 zones are rewritten. Each zone teaches something the user can act on.

### Zone 1 — The Upside Down

- **Slug:** `why-investing`
- **Subtitle:** Why Investing Beats Saving
- **Icon:** 🌀
- **Hawkins Location:** The Gate (Hawkins Lab)
- **Color:** `#ff1744`
- **Description:** Inflation is the Upside Down — silently eating your savings. This zone covers why keeping money in a savings account loses value over time, how compound interest works, and the real cost of doing nothing. No latte lectures — just math.
- **Key Takeaway:** Every year you don't invest, inflation takes a bite. Compound interest is the most powerful force in finance — but only if you start.
- **Resources:**
  - 🎬 "How the Economic Machine Works" — Ray Dalio (YouTube, free, 30 min). A billionaire hedge fund founder explains the entire economy in half an hour. URL: https://www.youtube.com/watch?v=PHe0bXAIuk0
  - 📖 "The Simple Path to Wealth" — JL Collins. Written as letters to his daughter. No jargon, no BS, just the case for why you must invest.
  - 🎧 "The Plain Bagel" — YouTube channel. Clear, no-hype explanations of investing concepts. URL: https://www.youtube.com/@ThePlainBagel
- **Quiz (5 questions — mix of knowledge + scenario):**
  1. What does inflation do to your savings? → Reduces their purchasing power over time
  2. If inflation is 5% and your savings account pays 2%, what happens? → You lose 3% of purchasing power each year
  3. What is compound interest? → Earning returns on your returns over time
  4. You have $10,000 in a savings account for 10 years at 1% interest while inflation averages 3%. In real terms, you: → Lost money
  5. According to Ray Dalio, what drives the economy in the short term? → Credit and debt cycles

### Zone 2 — Eleven's Shield

- **Slug:** `index-funds`
- **Subtitle:** Index Funds & the S&P 500
- **Icon:** 🛡️
- **Hawkins Location:** The Void
- **Color:** `#e040fb`
- **Description:** Like Eleven's psychic shield, index funds protect you from making bad individual stock picks. One fund = hundreds of companies. Over 90% of professional fund managers fail to beat the S&P 500 over 15 years. The data is clear.
- **Key Takeaway:** Index funds are the single most reliable way to build wealth. Don't try to outsmart the market — own the market.
- **Resources:**
  - 🎬 "The Big Short" (2015 film). Shows what happens when people don't understand their investments. Entertaining and essential.
  - 📖 "A Random Walk Down Wall Street" — Burton Malkiel. The academic case for why picking stocks is mostly futile.
  - 🎧 "Rational Reminder" podcast. Evidence-based investing, respected in the financial community. URL: https://rationalreminder.ca/
  - 📰 Bogleheads Wiki — Getting Started. The index fund community's bible. URL: https://www.bogleheads.org/wiki/Getting_started
- **Quiz (5 questions):**
  1. What is an index fund? → A fund that tracks a market index like the S&P 500
  2. What percentage of professional fund managers fail to beat the S&P 500 over 15 years? → Over 90%
  3. What is an ETF? → An exchange-traded fund you can buy/sell like a stock
  4. You want to invest $500/month with minimal effort. Best option? → A low-cost S&P 500 index fund with automatic contributions
  5. Warren Buffett's bet: he wagered that an S&P 500 index fund would beat hedge funds over 10 years. What happened? → The index fund won decisively

### Zone 3 — Castle Byers

- **Slug:** `reits`
- **Subtitle:** REITs & Real Estate Investing
- **Icon:** 🏰
- **Hawkins Location:** Castle Byers
- **Color:** `#00e5ff`
- **Description:** You don't need $500,000 to invest in real estate. REITs (Real Estate Investment Trusts) let you own shopping malls, apartments, data centers, and hospitals for the price of a single share. They're legally required to pay 90% of income as dividends.
- **Key Takeaway:** REITs give you real estate exposure with stock market liquidity. They're required to distribute most of their income — making them a powerful income tool.
- **Resources:**
  - 📖 "The Intelligent REIT Investor" — Krewson-Kelly & Brad Thomas. The definitive guide to REIT investing.
  - 🎧 BiggerPockets Real Estate podcast. Largest real estate investing community. Covers REITs alongside physical property. URL: https://www.biggerpockets.com/podcast
  - 📰 Nareit — What's a REIT? Official industry resource with beginner guides. URL: https://www.reit.com/what-reit
- **Quiz (4 questions):**
  1. What is a REIT? → A company that owns income-producing real estate and trades like a stock
  2. What percentage of taxable income must REITs distribute as dividends? → At least 90%
  3. Which of these is NOT a type of REIT? → Cryptocurrency REIT (real types: residential, healthcare, data center, retail)
  4. A REIT owns 50 apartment buildings generating $10M/year in profit. How much must it pay as dividends? → At least $9M

### Zone 4 — The Lab Files

- **Slug:** `financial-statements`
- **Subtitle:** Reading Financial Statements
- **Icon:** 📋
- **Hawkins Location:** Hawkins National Laboratory
- **Color:** `#76ff03`
- **Description:** Every public company publishes three key reports: income statement (are they making money?), balance sheet (what do they own vs owe?), and cash flow statement (is real cash coming in?). Like Hopper breaking into the Lab, you're going to learn to read what companies don't want you to miss.
- **Key Takeaway:** Revenue, profit, assets, liabilities, and cash flow — these five numbers tell you 80% of what you need to know about any company.
- **Resources:**
  - 🎬 Khan Academy — Financial Statements series (free, visual, step-by-step). URL: https://www.khanacademy.org/economics-finance-domain/core-finance/accounting-and-financial-stateme
  - 📖 "Financial Statements" — Thomas Ittelson. Illustrated, designed for non-accountants.
  - 📰 SEC — "How to Read a 10-K" guide. Straight from the regulator. URL: https://www.sec.gov/oiea/Article/edgarguide.html
- **Quiz (5 questions):**
  1. What does revenue mean? → Total money earned from sales before expenses
  2. A company has $50M revenue and $60M in expenses. What is their net income? → -$10M (a loss)
  3. What does a balance sheet show? → What a company owns (assets) vs what it owes (liabilities)
  4. Company X reports $20M profit but -$5M cash flow. Should you be concerned? → Yes — profit without cash flow can indicate accounting tricks or unsustainable operations
  5. Why is free cash flow important? → It shows actual cash generated after all expenses — the real money a company can use

### Zone 5 — The Party Investigates

- **Slug:** `stock-picking`
- **Subtitle:** Researching & Picking Stocks
- **Icon:** 🔍
- **Hawkins Location:** Mike's Basement
- **Color:** `#ffab00`
- **Description:** Like the Party gathering in Mike's basement to plan their next move, you'll research real companies. Focus on businesses you understand. Look at revenue growth, profit margins, competitive advantages (moats), and whether the price makes sense.
- **Key Takeaway:** Research = confidence. You don't need to be a Wall Street analyst. Start with companies you use, read their financials, and ask: is this a good business at a fair price?
- **Resources:**
  - 📖 "One Up on Wall Street" — Peter Lynch. "Invest in what you know." The most practical stock-picking book ever written.
  - 🎬 "Margin Call" (2011 film). The institutional side of markets — shows how Wall Street operates during a crisis.
  - 🎧 "InvestED" podcast — Phil Town. Value investing explained simply, with real examples. URL: https://www.ruleoneinvesting.com/podcast/
- **Quiz (5 questions):**
  1. What is a P/E ratio? → Price to Earnings — how much you pay per dollar of profit
  2. Peter Lynch's core advice: → Invest in what you know and understand
  3. Company A: P/E of 15, growing revenue 20%/year. Company B: P/E of 50, growing 5%/year. Which is likely a better value? → Company A — cheaper relative to growth
  4. What is a "moat" in investing? → A competitive advantage that protects a company from rivals (brand, patents, network effects)
  5. You love a company's product but their revenue has declined 3 years straight. Should you invest? → No — loving the product isn't enough, the financials must support the investment

### Zone 6 — The Snowball Effect

- **Slug:** `dividends`
- **Subtitle:** Dividends & Income Investing
- **Icon:** ❄️
- **Hawkins Location:** The Snow Ball Dance
- **Color:** `#ff6d00`
- **Description:** Like a snowball rolling downhill, dividends compound when reinvested. Some companies have paid and increased dividends for 25+ years straight (Dividend Aristocrats). This isn't passive income hype — it's a proven, boring, powerful strategy.
- **Key Takeaway:** Dividend investing isn't sexy, but reinvested dividends account for roughly 40% of total stock market returns historically. The snowball is real.
- **Resources:**
  - 📖 "The Little Book of Big Dividends" — Charles Carlson. Practical guide to selecting dividend stocks.
  - 🎧 "Dividend Cafe" by David Bahnsen. Weekly income investing insights. URL: https://thebahnsengroup.com/dividend-cafe/
  - 📰 S&P Dividend Aristocrats list. Companies with 25+ years of consecutive dividend increases. URL: https://www.spglobal.com/spdji/en/indices/dividends-factors/sp-500-dividend-aristocrats/
- **Quiz (4 questions):**
  1. What is a dividend? → A portion of a company's profits paid regularly to shareholders
  2. What is DRIP? → Dividend Reinvestment Plan — automatically reinvesting dividends to buy more shares
  3. A company pays $2/share dividend annually. You own 100 shares and reinvest via DRIP at $50/share. After one year you have: → 104 shares (and those 4 new shares will also earn dividends)
  4. What makes a company a "Dividend Aristocrat"? → 25+ consecutive years of increasing their dividend

### Zone 7 — The Final Battle

- **Slug:** `portfolio`
- **Subtitle:** Building Your Portfolio
- **Icon:** ⚔️
- **Hawkins Location:** Starcourt Mall (The Final Stand)
- **Color:** `#ffd600`
- **Description:** You've traveled through all of Hawkins. Now build your actual portfolio. Choose a brokerage, decide your allocation (stocks/bonds/REITs), set up automatic contributions, and start. Dollar-cost averaging means you invest the same amount regularly — no timing the market.
- **Key Takeaway:** The best portfolio is one you'll stick with. Pick a simple allocation, automate contributions, and don't touch it. Time in the market beats timing the market.
- **Resources:**
  - 📖 "The Bogleheads' Guide to Investing" — Larimore, Lindauer, LeBoeuf. Community-written classic on building a real portfolio.
  - 🎬 "Money, Explained" (Netflix series). Practical, no-fluff financial education. Episodes on retirement, credit, and investing.
  - 🎧 "ChooseFI" podcast. Actionable financial independence content, community-driven. URL: https://www.choosefi.com/podcast/
- **Quiz (5 questions):**
  1. What is dollar-cost averaging (DCA)? → Investing a fixed amount at regular intervals regardless of market price
  2. What is asset allocation? → How you divide investments across stocks, bonds, REITs, and other asset classes
  3. The market drops 20%. You're investing via DCA. What should you do? → Keep investing — you're now buying at lower prices
  4. A simple starter portfolio for a 25-year-old could be: → 80% stock index fund, 10% bond index fund, 10% REIT index fund
  5. What is the most important factor in long-term investment returns? → Time in the market and consistent contributions

## UX Features

### 1. Curriculum Update Popup

**Trigger:** User has any of the old zone slugs in localStorage (`money-mindset`, `economy-basics`, etc.) AND `curriculum_version` is not `2`.

**Content:**
```
🔄 Curriculum v2.0

We've redesigned the journey with real investing content:
S&P 500, REITs, dividends, stock picking — no fluff.

Your previous progress has been reset.
```

**Button:** "Let's go!" — clears old progress keys, sets `curriculum_version: 2`, dismisses popup.

**Implementation:** New `CurriculumUpdateModal` component. Check runs on mount in `page.tsx`. Shows once, never again after dismissal.

### 2. Per-Zone Rating

**Trigger:** After completing a zone's quiz (passing all questions), before returning to map.

**Content:**
```
Was this zone useful?

🎯 Practical    💡 Useful    😐 Meh
```

- **Practical** = "I can act on this right now"
- **Useful** = "I learned something valuable"
- **Meh** = "Didn't click for me"

**Implementation:**
- Shows in the zone page (`/zone/[slug]`) after quiz completion
- Sends POST to `/api/feedback` with `{ type: "zone-rating", zone: slug, rating: "practical" | "useful" | "meh" }`
- Rating stored in localStorage as `rating_${slug}` — doesn't ask again
- Telegram notification includes zone name + rating

### 3. Completion Feedback Popup

**Trigger:** User completes Zone 7 quiz (all zones done).

**Content:**
```
🏆 You completed the Investment Treasure Map!

How was the journey?

[🎯 Practical]  [💡 Useful]  [😐 Meh]

Any feedback? [optional text input]

[Send & Close]
```

**Implementation:**
- Modal component shown after Zone 7 quiz
- Sends to `/api/feedback` with `{ type: "completion", rating: "...", message: "..." }`
- Telegram notification: "🏆 Someone completed the treasure map! Rating: Practical. Feedback: ..."
- Stored in localStorage as `completion_feedback_sent` — shows once

## Files Changed

1. **`src/lib/zones.ts`** — Complete rewrite. 7 new zones with new slugs, resources, quizzes.
2. **`src/components/CurriculumUpdateModal.tsx`** — New component. Version check + progress reset popup.
3. **`src/components/ZoneRating.tsx`** — New component. Per-zone 3-option rating after quiz.
4. **`src/components/CompletionModal.tsx`** — New component. End-of-journey feedback popup.
5. **`src/app/page.tsx`** — Add CurriculumUpdateModal. Update subtitle text.
6. **`src/app/zone/[slug]/page.tsx`** — Add ZoneRating after quiz completion.
7. **`src/app/api/feedback/route.ts`** — Handle new feedback types: `zone-rating` and `completion`.
8. **`src/lib/progress.ts`** — No structural changes, but old localStorage keys become stale (handled by update modal).

## Out of Scope

- Brokerage account setup guides (too region-specific)
- Tax implications (varies by country)
- Cryptocurrency (not traditional investing)
- Interactive calculators or simulators (keep as future enhancement)
- Backend/database for feedback (continue using existing VM stats API)
