// This file is NEVER imported by client components
// Server-only: contains correct answers for quiz validation

export const quizAnswers: Record<string, { correctIndex: number; explanation: string }[]> = {
  'why-investing': [
    {
      correctIndex: 1,
      explanation:
        'Inflation erodes the purchasing power of your money. $100 today buys less than $100 ten years ago.',
    },
    {
      correctIndex: 1,
      explanation:
        'When inflation outpaces your savings rate, you lose purchasing power every year — even though your bank balance grows.',
    },
    {
      correctIndex: 1,
      explanation:
        "Compound interest means your returns generate their own returns. It's exponential growth — the longer you invest, the more powerful it becomes.",
    },
    {
      correctIndex: 1,
      explanation:
        'At 1% interest vs 3% inflation, you lose ~2% purchasing power annually. After 10 years, your $10,000 buys significantly less.',
    },
    {
      correctIndex: 1,
      explanation:
        'Dalio explains that short-term economic fluctuations are driven by credit expansion and contraction — the debt cycle.',
    },
  ],
  'index-funds': [
    {
      correctIndex: 1,
      explanation:
        'An index fund automatically tracks a market index. An S&P 500 fund owns all 500 companies — instant diversification.',
    },
    {
      correctIndex: 1,
      explanation:
        'The SPIVA scorecard consistently shows over 90% of active managers underperform the S&P 500 over 15 years. The data is overwhelming.',
    },
    {
      correctIndex: 1,
      explanation:
        'An ETF (Exchange-Traded Fund) trades on exchanges like a stock but holds a basket of assets. Low fees, high liquidity.',
    },
    {
      correctIndex: 1,
      explanation:
        'Automatic contributions to a low-cost index fund is the simplest, most effective strategy for most investors.',
    },
    {
      correctIndex: 1,
      explanation:
        "Buffett's million-dollar bet proved that a simple Vanguard S&P 500 fund crushed a portfolio of hedge funds over a decade.",
    },
  ],
  'reits': [
    {
      correctIndex: 1,
      explanation:
        'REITs own and operate income-producing real estate. They trade on stock exchanges, making real estate accessible to anyone.',
    },
    {
      correctIndex: 1,
      explanation:
        'By law, REITs must distribute at least 90% of taxable income as dividends. This makes them powerful income generators.',
    },
    {
      correctIndex: 1,
      explanation:
        'There are many REIT types — residential, healthcare, data center, retail — but cryptocurrency REITs do not exist.',
    },
    {
      correctIndex: 1,
      explanation:
        '90% of $10M = $9M minimum dividend distribution. This is what makes REITs attractive for income investors.',
    },
  ],
  'financial-statements': [
    {
      correctIndex: 1,
      explanation:
        'Revenue is the total money earned from sales before any expenses are deducted. It\'s the "top line" of the income statement.',
    },
    {
      correctIndex: 1,
      explanation:
        'Net income = Revenue - Expenses. $50M - $60M = -$10M. The company is operating at a loss.',
    },
    {
      correctIndex: 1,
      explanation:
        'A balance sheet is a snapshot: Assets (what you own) = Liabilities (what you owe) + Shareholders\' Equity.',
    },
    {
      correctIndex: 1,
      explanation:
        'Profit without cash flow is a red flag. Companies can show accounting profit while burning through cash — cash flow reveals the truth.',
    },
    {
      correctIndex: 1,
      explanation:
        'Free cash flow = actual cash generated after all expenses and capital expenditures. It\'s the real money available for dividends, buybacks, or growth.',
    },
  ],
  'stock-picking': [
    {
      correctIndex: 1,
      explanation:
        'P/E = Stock Price ÷ Earnings Per Share. It tells you how much investors pay for each dollar of profit. Lower P/E generally = cheaper.',
    },
    {
      correctIndex: 1,
      explanation:
        'Peter Lynch found his best investments in everyday life — the mall, the grocery store. Invest in businesses you understand.',
    },
    {
      correctIndex: 1,
      explanation:
        'Company A grows 4x faster but costs 3x less (by P/E). A low P/E with high growth is the value investor\'s dream.',
    },
    {
      correctIndex: 1,
      explanation:
        'A moat is a durable competitive advantage — brand loyalty (Apple), network effects (Visa), patents, or switching costs.',
    },
    {
      correctIndex: 1,
      explanation:
        'Never invest based on product love alone. Declining revenue for 3 years signals structural problems no amount of fandom can fix.',
    },
  ],
  'dividends': [
    {
      correctIndex: 1,
      explanation:
        'Dividends are a share of profits distributed to stockholders — typically quarterly. They represent real cash returned to investors.',
    },
    {
      correctIndex: 1,
      explanation:
        'DRIP automatically uses your dividends to buy more shares. Those new shares earn dividends too — the snowball grows.',
    },
    {
      correctIndex: 1,
      explanation:
        '100 shares × $2 = $200 in dividends. At $50/share, that buys 4 new shares. Now you have 104 shares, all earning dividends.',
    },
    {
      correctIndex: 1,
      explanation:
        'Dividend Aristocrats have raised dividends for 25+ consecutive years — showing exceptional financial discipline and stability.',
    },
  ],
  'portfolio': [
    {
      correctIndex: 1,
      explanation:
        'DCA removes emotion from investing. You buy more shares when prices are low and fewer when high — automatically.',
    },
    {
      correctIndex: 1,
      explanation:
        'Asset allocation is how you split money across asset classes. It\'s the single biggest driver of portfolio risk and return.',
    },
    {
      correctIndex: 1,
      explanation:
        'A 20% drop means everything is on sale. DCA investors benefit from buying at lower prices — don\'t panic, stay the course.',
    },
    {
      correctIndex: 1,
      explanation:
        'A simple 80/10/10 split gives broad stock exposure, some bond stability, and real estate diversification. Simple beats complex.',
    },
    {
      correctIndex: 1,
      explanation:
        'Time in the market consistently beats timing the market. Regular contributions + patience = the most reliable wealth builder.',
    },
  ],
};
