// This file is NEVER imported by client components
// Server-only: contains correct answers for quiz validation

export const quizAnswers: Record<string, { correctIndex: number; explanation: string }[]> = {
  'money-mindset': [
    {
      correctIndex: 1,
      explanation:
        'Morgan Housel shows that behavior — patience, humility, and consistency — beats raw intelligence every time.',
    },
    {
      correctIndex: 1,
      explanation:
        "Compounding means your money earns money, and THAT money earns money too. It's the most powerful force in investing.",
    },
    {
      correctIndex: 1,
      explanation:
        'Knowing your "enough" prevents you from taking dangerous risks chasing more when you already have what you need.',
    },
    {
      correctIndex: 1,
      explanation:
        "Buffett started at age 11. His wealth came from 75+ years of compounding — not from being the best stock picker.",
    },
    {
      correctIndex: 1,
      explanation:
        "When emotions take over — panic selling, FOMO buying, impulse spending — you're in the Upside Down of finance.",
    },
  ],
  'economy-basics': [
    {
      correctIndex: 1,
      explanation:
        'Inflation means your money loses purchasing power. $100 today buys less than $100 ten years ago.',
    },
    {
      correctIndex: 1,
      explanation:
        "If inflation is 3% and your savings account pays 1%, you're actually LOSING 2% per year in real terms.",
    },
    {
      correctIndex: 1,
      explanation:
        'Saving = putting money aside safely. Investing = putting money to work so it grows, accepting some risk.',
    },
    {
      correctIndex: 2,
      explanation:
        "Compounding turns 240,000 CZK of contributions into ~590,000 CZK. That's the magic!",
    },
  ],
  'index-funds': [
    {
      correctIndex: 1,
      explanation:
        'An index fund automatically buys ALL companies in an index. S&P 500 index fund = owning a tiny piece of 500 top US companies.',
    },
    {
      correctIndex: 1,
      explanation:
        'Over 15 years, ~90% of professional fund managers LOSE to a simple S&P 500 index fund. Less effort, better results.',
    },
    {
      correctIndex: 1,
      explanation:
        'Diversification = not putting all eggs in one basket. If one company fails, the others protect you.',
    },
    {
      correctIndex: 1,
      explanation:
        "The 2008 crisis happened because people invested in things they didn't understand. Always know what you own.",
    },
  ],
  'financial-statements': [
    {
      correctIndex: 1,
      explanation:
        'Revenue = total sales. It\'s the "top line." Profit comes AFTER subtracting all costs from revenue.',
    },
    {
      correctIndex: 1,
      explanation:
        'Revenue: $100 in sales. Costs: $70. Profit: $30. Revenue is the whole pie; profit is your slice.',
    },
    {
      correctIndex: 1,
      explanation:
        'Balance sheet = snapshot of health. Assets (what you own) = Liabilities (what you owe) + Equity (your stake).',
    },
    {
      correctIndex: 1,
      explanation:
        'Profit can be manipulated with accounting tricks. Cash flow shows REAL money movement. Cash is king.',
    },
  ],
  'research-companies': [
    {
      correctIndex: 1,
      explanation:
        "Lynch found his best investments at the mall, the grocery store, his wife's shopping bags. Everyday life = investment ideas.",
    },
    {
      correctIndex: 1,
      explanation:
        'P/E = Stock Price ÷ Earnings Per Share. A P/E of 20 means you pay $20 for every $1 of profit. Lower = cheaper (usually).',
    },
    {
      correctIndex: 1,
      explanation:
        'A company growing revenue and profit year after year is a healthy company. Short-term stock price is noise.',
    },
  ],
  'practice-arena': [
    {
      correctIndex: 1,
      explanation:
        'Paper trading lets you practice investing with virtual money. All the learning, none of the financial risk.',
    },
    {
      correctIndex: 1,
      explanation:
        "Don't put all your tokens in one arcade game. Spread them across several to maximize your chances.",
    },
    {
      correctIndex: 1,
      explanation:
        'The goal isn\'t to "win" — it\'s to understand how you react to gains and losses. Self-awareness is the real reward.',
    },
  ],
  'your-decision': [
    {
      correctIndex: 2,
      explanation:
        'Time in the market beats timing the market. The sooner you start, the more compounding works for you.',
    },
    {
      correctIndex: 2,
      explanation:
        "Consistent, boring, automatic contributions to an index fund. Not exciting, but it works. Every. Single. Time.",
    },
    {
      correctIndex: 2,
      explanation:
        "You don't need to be rich, smart, or an expert. You need patience, a plan, and the courage to start. You're ready. 🏆",
    },
  ],
};
