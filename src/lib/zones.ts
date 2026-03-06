export interface Resource {
  type: 'book' | 'movie' | 'podcast' | 'article' | 'interactive';
  title: string;
  author?: string;
  description: string;
  url?: string;
  emoji: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Zone {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  icon: string;
  description: string;
  hawkinsLocation: string;
  color: string;
  resources: Resource[];
  quiz: QuizQuestion[];
  keyTakeaway: string;
}

export const zones: Zone[] = [
  {
    id: 1,
    slug: 'money-mindset',
    name: "The Mind Flayer's Grip",
    subtitle: 'Understanding your money psychology',
    icon: '🧠',
    hawkinsLocation: 'Hawkins Middle School',
    color: '#ff1744',
    description:
      'Before you invest a single crown, understand your relationship with money. Your emotions are the real Mind Flayer — controlling your financial decisions from the shadows.',
    resources: [
      {
        type: 'book',
        title: 'The Psychology of Money',
        author: 'Morgan Housel',
        description:
          'THE starting point. Short chapters, story-based, no jargon. Teaches why behavior beats intelligence.',
        emoji: '📖',
      },
      {
        type: 'movie',
        title: 'Becoming Warren Buffett',
        author: 'HBO',
        description:
          "See how the world's greatest investor thinks. Spoiler: it's simpler than you think.",
        emoji: '🎬',
      },
      {
        type: 'podcast',
        title: 'Planet Money: "The Invention of Money"',
        author: 'NPR',
        description:
          'Fun storytelling about what money actually is and why we trust it.',
        url: 'https://www.npr.org/sections/money/',
        emoji: '🎧',
      },
    ],
    quiz: [
      {
        question:
          'According to "The Psychology of Money", what matters MORE in investing?',
        options: [
          'Mathematical skill',
          'Behavior and patience',
          'Insider knowledge',
          'Starting capital',
        ],
        correctIndex: 1,
        explanation:
          'Morgan Housel shows that behavior — patience, humility, and consistency — beats raw intelligence every time.',
      },
      {
        question: 'What is compounding?',
        options: [
          'Buying many stocks at once',
          'Earning returns on your returns over time',
          'A type of bank account',
          'Mixing different currencies',
        ],
        correctIndex: 1,
        explanation:
          "Compounding means your money earns money, and THAT money earns money too. It's the most powerful force in investing.",
      },
      {
        question: 'What does "enough" mean in investing?',
        options: [
          'Having exactly $1 million',
          'Knowing when to stop taking unnecessary risks',
          'Never spending money',
          'Only investing in safe bonds',
        ],
        correctIndex: 1,
        explanation:
          'Knowing your "enough" prevents you from taking dangerous risks chasing more when you already have what you need.',
      },
      {
        question: 'Why did Warren Buffett become so wealthy?',
        options: [
          'He took huge risks',
          'He started investing at 11 and never stopped (compounding)',
          'He inherited money',
          'He only bought tech stocks',
        ],
        correctIndex: 1,
        explanation:
          "Buffett started at age 11. His wealth came from 75+ years of compounding — not from being the best stock picker.",
      },
      {
        question:
          'What is the "Upside Down" of money management?',
        options: [
          'Saving too much',
          'Letting emotions control your financial decisions',
          'Having a budget',
          'Investing in index funds',
        ],
        correctIndex: 1,
        explanation:
          "When emotions take over — panic selling, FOMO buying, impulse spending — you're in the Upside Down of finance.",
      },
    ],
    keyTakeaway:
      "Money is emotional, not mathematical. Patience beats cleverness. Escape the Mind Flayer's grip on your financial emotions.",
  },
  {
    id: 2,
    slug: 'economy-basics',
    name: 'The Gate Opens',
    subtitle: 'How the economy really works',
    icon: '🌀',
    hawkinsLocation: 'The Gate (Hawkins Lab)',
    color: '#e040fb',
    description:
      "The Gate between our world and the Upside Down is like inflation — invisible, always open, slowly consuming your savings if you don't protect them.",
    resources: [
      {
        type: 'movie',
        title: 'Money Explained (Netflix)',
        author: 'Netflix',
        description:
          "Animated series. Episode 1 explains why saving alone isn't enough.",
        emoji: '🎬',
      },
      {
        type: 'podcast',
        title: 'The Indicator from Planet Money',
        author: 'NPR',
        description:
          'Bite-sized episodes (10 min). Covers inflation, jobs, economy simply.',
        url: 'https://www.npr.org/sections/the-indicator/',
        emoji: '🎧',
      },
      {
        type: 'article',
        title: 'Investopedia: Investing for Beginners',
        author: 'Investopedia',
        description:
          'Free, well-written guide covering stocks, bonds, and cash.',
        url: 'https://www.investopedia.com/articles/basics/06/invest1000.asp',
        emoji: '📰',
      },
      {
        type: 'interactive',
        title: 'Compound Interest Calculator',
        description:
          'See how 1000 CZK/month grows over 20 years. This will blow your mind.',
        emoji: '🔮',
      },
    ],
    quiz: [
      {
        question: 'What is inflation?',
        options: [
          'When stock prices go up',
          'When prices rise and money buys less over time',
          'A type of investment',
          'When banks increase interest rates',
        ],
        correctIndex: 1,
        explanation:
          'Inflation means your money loses purchasing power. $100 today buys less than $100 ten years ago.',
      },
      {
        question:
          'Why are savings accounts NOT enough to grow wealth?',
        options: [
          'Banks are unsafe',
          'Interest rates are usually lower than inflation',
          "You can't access your money",
          'Savings accounts have high fees',
        ],
        correctIndex: 1,
        explanation:
          "If inflation is 3% and your savings account pays 1%, you're actually LOSING 2% per year in real terms.",
      },
      {
        question:
          'What is the difference between saving and investing?',
        options: [
          'There is no difference',
          'Saving preserves money; investing grows it (with risk)',
          'Investing is only for rich people',
          'Saving gives better returns',
        ],
        correctIndex: 1,
        explanation:
          'Saving = putting money aside safely. Investing = putting money to work so it grows, accepting some risk.',
      },
      {
        question:
          'If you invest 1000 CZK/month for 20 years at 8% return, roughly how much would you have?',
        options: [
          '240,000 CZK',
          '400,000 CZK',
          '600,000 CZK',
          'Over 1,000,000 CZK',
        ],
        correctIndex: 2,
        explanation:
          "Compounding turns 240,000 CZK of contributions into ~590,000 CZK. That's the magic!",
      },
    ],
    keyTakeaway:
      'Inflation is the invisible gate. Your savings are being consumed. Investing is how you close the gate and protect your future.',
  },
  {
    id: 3,
    slug: 'index-funds',
    name: "Eleven's Shield",
    subtitle: 'The power of index funds',
    icon: '🛡️',
    hawkinsLocation: 'The Void',
    color: '#00e5ff',
    description:
      "Like Eleven's psychic shield, index funds protect you from making bad individual stock picks. One fund = hundreds of companies. Simple. Powerful.",
    resources: [
      {
        type: 'book',
        title: 'The Simple Path to Wealth',
        author: 'JL Collins',
        description:
          'Written as letters to his daughter. "Buy VTSAX and chill." The gospel of index investing.',
        emoji: '📖',
      },
      {
        type: 'movie',
        title: 'The Big Short',
        author: '2015 Film',
        description:
          "Shows what happens when people DON'T understand their investments. Scary but essential.",
        emoji: '🎬',
      },
      {
        type: 'podcast',
        title: 'Stacking Benjamins: Index Funds 101',
        author: 'Stacking Benjamins',
        description:
          'Why most fund managers LOSE to a simple index fund.',
        emoji: '🎧',
      },
      {
        type: 'article',
        title: 'What is the S&P 500?',
        description:
          'Visual history of the index from 1950 to today. The long-term trend is UP.',
        url: 'https://www.investopedia.com/terms/s/sp500.asp',
        emoji: '📰',
      },
    ],
    quiz: [
      {
        question: 'What is an index fund?',
        options: [
          'A fund that only buys tech stocks',
          'A fund that tracks a market index (like S&P 500)',
          'A savings account with higher interest',
          'A fund managed by Warren Buffett',
        ],
        correctIndex: 1,
        explanation:
          'An index fund automatically buys ALL companies in an index. S&P 500 index fund = owning a tiny piece of 500 top US companies.',
      },
      {
        question:
          'Why does Warren Buffett recommend index funds for most people?',
        options: [
          'They are risk-free',
          'They beat most professional fund managers over time',
          'They pay monthly dividends',
          'They are the cheapest stocks',
        ],
        correctIndex: 1,
        explanation:
          'Over 15 years, ~90% of professional fund managers LOSE to a simple S&P 500 index fund. Less effort, better results.',
      },
      {
        question: 'What is diversification?',
        options: [
          'Buying only one stock you believe in',
          'Spreading your investments across many assets to reduce risk',
          'Investing in foreign currencies',
          'Changing your investments daily',
        ],
        correctIndex: 1,
        explanation:
          'Diversification = not putting all eggs in one basket. If one company fails, the others protect you.',
      },
      {
        question:
          'In The Big Short, what lesson should investors learn?',
        options: [
          'Always trust the banks',
          "Understand what you're investing in",
          'Real estate always goes up',
          'Ignore warning signs',
        ],
        correctIndex: 1,
        explanation:
          "The 2008 crisis happened because people invested in things they didn't understand. Always know what you own.",
      },
    ],
    keyTakeaway:
      "Index funds are Eleven's shield — they protect you from the monsters of stock picking. You don't need to be a genius. You need to be consistent.",
  },
  {
    id: 4,
    slug: 'financial-statements',
    name: 'The Lab Files',
    subtitle: "Reading a company's secrets",
    icon: '📋',
    hawkinsLocation: 'Hawkins National Laboratory',
    color: '#76ff03',
    description:
      "Every company has secret files — they're called financial statements. Like Hopper breaking into the Lab, you're going to learn to read what companies don't want you to miss.",
    resources: [
      {
        type: 'book',
        title: 'Reading Financial Statements',
        description:
          'Your paper copy! Perfect for beginners. Revenue, profit, balance sheet, cash flow — decoded.',
        emoji: '📖',
      },
      {
        type: 'article',
        title: 'Khan Academy: Income Statements',
        author: 'Khan Academy',
        description:
          'Free video lessons. Visual, step-by-step, pause and replay.',
        url: 'https://www.khanacademy.org/economics-finance-domain',
        emoji: '📰',
      },
      {
        type: 'interactive',
        title: "Read Apple's Income Statement",
        description:
          'Interactive exercise: identify revenue, net income, and profit margin from a real Apple report.',
        emoji: '🔮',
      },
    ],
    quiz: [
      {
        question: 'What does "revenue" mean?',
        options: [
          "The company's profit",
          'Total money earned from sales before expenses',
          'Money in the bank',
          'Stock price × shares',
        ],
        correctIndex: 1,
        explanation:
          'Revenue = total sales. It\'s the "top line." Profit comes AFTER subtracting all costs from revenue.',
      },
      {
        question:
          'What is the difference between revenue and profit?',
        options: [
          "They're the same thing",
          "Revenue is total sales; profit is what's left after all costs",
          'Profit is always bigger than revenue',
          'Revenue only counts cash payments',
        ],
        correctIndex: 1,
        explanation:
          'Revenue: $100 in sales. Costs: $70. Profit: $30. Revenue is the whole pie; profit is your slice.',
      },
      {
        question: 'What does a balance sheet show?',
        options: [
          "Only the company's debts",
          'What a company owns (assets) vs what it owes (liabilities)',
          "The CEO's salary",
          'Future sales predictions',
        ],
        correctIndex: 1,
        explanation:
          'Balance sheet = snapshot of health. Assets (what you own) = Liabilities (what you owe) + Equity (your stake).',
      },
      {
        question: 'Why is cash flow important?',
        options: [
          'It shows the stock price',
          'It shows actual money moving in and out — a company can be "profitable" but run out of cash',
          "It's not important for investors",
          'It only matters for banks',
        ],
        correctIndex: 1,
        explanation:
          'Profit can be manipulated with accounting tricks. Cash flow shows REAL money movement. Cash is king.',
      },
    ],
    keyTakeaway:
      "Financial statements are a company's lab files. Revenue, profit, balance sheet, cash flow — now you can read them like Hopper reads classified documents.",
  },
  {
    id: 5,
    slug: 'research-companies',
    name: 'The Party Investigates',
    subtitle: 'Research real S&P 500 companies',
    icon: '🔍',
    hawkinsLocation: "Mike's Basement",
    color: '#ffab00',
    description:
      "Like the Party gathering in Mike's basement to plan their next move, you'll research real companies. Pick 3 that YOU know and love, and investigate them.",
    resources: [
      {
        type: 'book',
        title: 'One Up on Wall Street',
        author: 'Peter Lynch',
        description:
          '"Invest in what you know." You use Apple? Research Apple. You drink Starbucks? Research Starbucks.',
        emoji: '📖',
      },
      {
        type: 'interactive',
        title: 'Company Research Cards',
        description:
          'Pick 3 companies from a curated list and fill in: What do they sell? Is revenue growing? Would you invest?',
        emoji: '🔮',
      },
      {
        type: 'podcast',
        title: 'Investing for Beginners: How to Research a Stock',
        author: 'einvestingforbeginners.com',
        description:
          'Step-by-step walkthrough of researching a real company.',
        emoji: '🎧',
      },
    ],
    quiz: [
      {
        question: 'Peter Lynch said you should...',
        options: [
          'Only buy tech stocks',
          'Invest in what you know and understand',
          'Follow what celebrities invest in',
          'Buy the cheapest stocks',
        ],
        correctIndex: 1,
        explanation:
          "Lynch found his best investments at the mall, the grocery store, his wife's shopping bags. Everyday life = investment ideas.",
      },
      {
        question: 'What is a P/E ratio?',
        options: [
          'Price per Employee',
          'Price to Earnings — how much you pay per dollar of profit',
          'Profit to Expense ratio',
          'A type of stock order',
        ],
        correctIndex: 1,
        explanation:
          'P/E = Stock Price ÷ Earnings Per Share. A P/E of 20 means you pay $20 for every $1 of profit. Lower = cheaper (usually).',
      },
      {
        question:
          "When researching a company, what's the MOST important trend?",
        options: [
          'Stock price this week',
          'Revenue and profit growth over several years',
          'Number of employees',
          'How many ads they run',
        ],
        correctIndex: 1,
        explanation:
          'A company growing revenue and profit year after year is a healthy company. Short-term stock price is noise.',
      },
    ],
    keyTakeaway:
      "Research = confidence. Like the Party gathering clues in Mike's basement, you can investigate any company. You don't need to be a Wall Street analyst.",
  },
  {
    id: 6,
    slug: 'practice-arena',
    name: 'The Arcade Challenge',
    subtitle: 'Practice with virtual money',
    icon: '🕹️',
    hawkinsLocation: 'The Palace Arcade',
    color: '#ff6d00',
    description:
      'Before you play with real money, practice at the arcade. $10,000 in virtual dollars. Build a portfolio. Track it. Learn from mistakes when they cost nothing.',
    resources: [
      {
        type: 'interactive',
        title: 'Paper Trading Simulator',
        description:
          'Get $10,000 virtual dollars. Build a portfolio of 5 stocks + 1 index fund. Track for 2 weeks.',
        emoji: '🕹️',
      },
      {
        type: 'movie',
        title: 'Inside Job',
        author: 'Documentary',
        description:
          'Shows the consequences of not understanding risk. Motivation to learn properly.',
        emoji: '🎬',
      },
      {
        type: 'article',
        title: 'Investopedia Stock Simulator',
        description:
          'Free paper trading platform. Practice without risking real money.',
        url: 'https://www.investopedia.com/simulator/',
        emoji: '📰',
      },
    ],
    quiz: [
      {
        question: 'What is "paper trading"?',
        options: [
          'Trading paper stocks',
          'Practicing with fake money to learn without risk',
          'Writing stock picks on paper',
          'A type of bond',
        ],
        correctIndex: 1,
        explanation:
          'Paper trading lets you practice investing with virtual money. All the learning, none of the financial risk.',
      },
      {
        question: 'Why should you diversify your portfolio?',
        options: [
          'To make trading more exciting',
          'To reduce risk — if one investment fails, others protect you',
          "It's required by law",
          'To impress your broker',
        ],
        correctIndex: 1,
        explanation:
          "Don't put all your tokens in one arcade game. Spread them across several to maximize your chances.",
      },
      {
        question:
          'After paper trading for 2 weeks, what should you evaluate?',
        options: [
          'Only whether you made money',
          'Your decision-making process, emotional reactions, and what you learned',
          'Whether to quit investing',
          'How to pick better stocks next time',
        ],
        correctIndex: 1,
        explanation:
          'The goal isn\'t to "win" — it\'s to understand how you react to gains and losses. Self-awareness is the real reward.',
      },
    ],
    keyTakeaway:
      "The arcade is where you level up. Practice, fail, learn — when it costs nothing. Then you're ready for the real game.",
  },
  {
    id: 7,
    slug: 'your-decision',
    name: 'The Final Battle',
    subtitle: 'Make your own investment plan',
    icon: '⚔️',
    hawkinsLocation: 'Starcourt Mall (The Final Stand)',
    color: '#ffd600',
    description:
      "You've traveled through all of Hawkins. You've learned the psychology, the basics, the tools. Now it's YOUR turn. No pressure. No rush. Your journey, your rules.",
    resources: [
      {
        type: 'interactive',
        title: 'Personal Investment Plan Builder',
        description:
          'Answer 5 questions and get a personalized starting plan. How much to save, where to invest, when to start.',
        emoji: '📋',
      },
      {
        type: 'article',
        title: 'Everything You Learned',
        description:
          'One-page cheat sheet of key concepts from all 7 zones.',
        emoji: '📰',
      },
    ],
    quiz: [
      {
        question: "What's the best time to start investing?",
        options: [
          "When you're rich",
          'When the market is "low"',
          'Yesterday. The second best time is today.',
          'After retirement',
        ],
        correctIndex: 2,
        explanation:
          'Time in the market beats timing the market. The sooner you start, the more compounding works for you.',
      },
      {
        question:
          'Which investment strategy is recommended for beginners?',
        options: [
          'Day trading',
          'Buying cryptocurrency',
          'Regular contributions to a diversified index fund',
          'Following stock tips on social media',
        ],
        correctIndex: 2,
        explanation:
          "Consistent, boring, automatic contributions to an index fund. Not exciting, but it works. Every. Single. Time.",
      },
      {
        question:
          "You've completed Diana's Investment Journey! What's the most important thing you learned?",
        options: [
          'How to get rich quick',
          'That investing is only for experts',
          'That patience, knowledge, and starting early are the keys to financial freedom',
          'That you need $100,000 to start investing',
        ],
        correctIndex: 2,
        explanation:
          "You don't need to be rich, smart, or an expert. You need patience, a plan, and the courage to start. You're ready. 🏆",
      },
    ],
    keyTakeaway:
      "You survived Hawkins. You defeated the Mind Flayer of bad financial habits. Now go build your future. Friends don't let friends not invest. 💛",
  },
];
