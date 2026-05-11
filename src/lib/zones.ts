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
  calculator?: 'compound' | 'dividend' | 'portfolio';
}

export const zones: Zone[] = [
  {
    id: 1,
    slug: 'why-investing',
    name: 'The Upside Down',
    subtitle: 'Why Investing Beats Saving',
    icon: '🌀',
    hawkinsLocation: 'The Gate (Hawkins Lab)',
    color: '#ff1744',
    description:
      "Inflation is the Upside Down — silently eating your savings. This zone covers why keeping money in a savings account loses value over time, how compound interest works, and the real cost of doing nothing. No latte lectures — just math.",
    resources: [
      {
        type: 'movie',
        title: 'How the Economic Machine Works',
        author: 'Ray Dalio',
        description:
          'A billionaire hedge fund founder explains the entire economy in 30 minutes. Free on YouTube — arguably the best economics explainer ever made.',
        url: 'https://www.youtube.com/watch?v=PHe0bXAIuk0',
        emoji: '🎬',
      },
      {
        type: 'book',
        title: 'The Simple Path to Wealth',
        author: 'JL Collins',
        description:
          'Written as letters to his daughter. No jargon, no BS — just the case for why you must invest and how to do it simply.',
        emoji: '📖',
      },
      {
        type: 'podcast',
        title: 'The Plain Bagel',
        author: 'Richard Coffin',
        description:
          'Clear, no-hype explanations of investing concepts. A Canadian finance YouTuber respected for accuracy and simplicity.',
        url: 'https://www.youtube.com/@ThePlainBagel',
        emoji: '🎧',
      },
    ],
    quiz: [
      {
        question: 'What does inflation do to your savings?',
        options: [
          'Increases their value over time',
          'Reduces their purchasing power over time',
          'Has no effect on savings accounts',
          'Only affects cash, not bank deposits',
        ],
      },
      {
        question:
          'If inflation is 5% and your savings account pays 2%, what happens?',
        options: [
          'You gain 7% in real terms',
          'You lose about 3% of purchasing power each year',
          'You break even',
          'The bank covers the difference',
        ],
      },
      {
        question: 'What is compound interest?',
        options: [
          'Interest paid only on your initial deposit',
          'Earning returns on your returns over time',
          'A special type of savings account',
          'Interest that compounds only annually',
        ],
      },
      {
        question:
          'You have $10,000 in a savings account for 10 years at 1% interest while inflation averages 3%. In real terms, you:',
        options: [
          'Gained money',
          'Lost money — your purchasing power decreased',
          'Broke even',
          'It depends on the stock market',
        ],
      },
      {
        question:
          'According to Ray Dalio, what drives the economy in the short term?',
        options: [
          'Stock market performance',
          'Credit and debt cycles',
          'Government spending alone',
          'Consumer confidence surveys',
        ],
      },
    ],
    keyTakeaway:
      "Every year you don't invest, inflation takes a bite. Compound interest is the most powerful force in finance — but only if you start.",
    calculator: 'compound',
  },
  {
    id: 2,
    slug: 'index-funds',
    name: "Eleven's Shield",
    subtitle: 'Index Funds & the S&P 500',
    icon: '🛡️',
    hawkinsLocation: 'The Void',
    color: '#e040fb',
    description:
      "Like Eleven's psychic shield, index funds protect you from making bad individual stock picks. One fund = hundreds of companies. Over 90% of professional fund managers fail to beat the S&P 500 over 15 years. The data is clear.",
    resources: [
      {
        type: 'movie',
        title: 'The Big Short',
        author: '2015 Film',
        description:
          "Shows what happens when people don't understand their investments. Entertaining, terrifying, and essential viewing for any investor.",
        emoji: '🎬',
      },
      {
        type: 'book',
        title: 'A Random Walk Down Wall Street',
        author: 'Burton Malkiel',
        description:
          "The academic case for why picking stocks is mostly futile. First published in 1973, still relevant — because the data hasn't changed.",
        emoji: '📖',
      },
      {
        type: 'podcast',
        title: 'Rational Reminder',
        author: 'Ben Felix & Cameron Passmore',
        description:
          'Evidence-based investing podcast. Respected in the financial community for rigorous, data-driven analysis.',
        url: 'https://rationalreminder.ca/',
        emoji: '🎧',
      },
      {
        type: 'article',
        title: 'Bogleheads Wiki — Getting Started',
        author: 'Bogleheads Community',
        description:
          "The index fund community's bible. Free, comprehensive, and written by passionate investors who follow Jack Bogle's philosophy.",
        url: 'https://www.bogleheads.org/wiki/Getting_started',
        emoji: '📰',
      },
    ],
    quiz: [
      {
        question: 'What is an index fund?',
        options: [
          'A fund managed by top Wall Street traders',
          'A fund that tracks a market index like the S&P 500',
          'A government savings bond',
          'A high-risk cryptocurrency fund',
        ],
      },
      {
        question:
          'What percentage of professional fund managers fail to beat the S&P 500 over 15 years?',
        options: [
          'About 50%',
          'Over 90%',
          'Around 25%',
          'Less than 10%',
        ],
      },
      {
        question: 'What is an ETF?',
        options: [
          'A type of savings account',
          'An exchange-traded fund you can buy and sell like a stock',
          'A bond issued by the government',
          'An exclusive fund for wealthy investors',
        ],
      },
      {
        question:
          'You want to invest $500/month with minimal effort. Best option?',
        options: [
          'Pick individual stocks based on news',
          'A low-cost S&P 500 index fund with automatic contributions',
          'Keep it in a savings account until the market dips',
          'Buy cryptocurrency monthly',
        ],
      },
      {
        question:
          'Warren Buffett wagered that an S&P 500 index fund would beat hedge funds over 10 years. What happened?',
        options: [
          'The hedge funds won easily',
          'The index fund won decisively',
          'It was a tie',
          'The bet was cancelled',
        ],
      },
    ],
    keyTakeaway:
      "Index funds are the single most reliable way to build wealth. Don't try to outsmart the market — own the market.",
  },
  {
    id: 3,
    slug: 'reits',
    name: 'Castle Byers',
    subtitle: 'REITs & Real Estate Investing',
    icon: '🏰',
    hawkinsLocation: 'Castle Byers',
    color: '#00e5ff',
    description:
      "You don't need $500,000 to invest in real estate. REITs (Real Estate Investment Trusts) let you own shopping malls, apartments, data centers, and hospitals for the price of a single share. They're legally required to pay 90% of income as dividends.",
    resources: [
      {
        type: 'book',
        title: 'The Intelligent REIT Investor',
        author: 'Stephanie Krewson-Kelly & R. Brad Thomas',
        description:
          'The definitive guide to REIT investing. Covers all REIT types, valuation methods, and portfolio strategies.',
        emoji: '📖',
      },
      {
        type: 'podcast',
        title: 'BiggerPockets Real Estate',
        author: 'BiggerPockets',
        description:
          'The largest real estate investing community. Covers REITs alongside physical property investing.',
        url: 'https://www.biggerpockets.com/podcast',
        emoji: '🎧',
      },
      {
        type: 'article',
        title: "Nareit — What's a REIT?",
        author: 'Nareit',
        description:
          'The official REIT industry resource. Clear beginner guides straight from the trade association.',
        url: 'https://www.reit.com/what-reit',
        emoji: '📰',
      },
    ],
    quiz: [
      {
        question: 'What is a REIT?',
        options: [
          'A real estate agency',
          'A company that owns income-producing real estate and trades like a stock',
          'A government housing program',
          'A type of mortgage',
        ],
      },
      {
        question:
          'What percentage of taxable income must REITs distribute as dividends?',
        options: [
          'At least 50%',
          'At least 90%',
          'At least 75%',
          'There is no requirement',
        ],
      },
      {
        question: 'Which of these is NOT a type of REIT?',
        options: [
          'Data Center REIT',
          'Cryptocurrency REIT',
          'Healthcare REIT',
          'Residential REIT',
        ],
      },
      {
        question:
          'A REIT owns 50 apartment buildings generating $10M/year in profit. How much must it pay as dividends?',
        options: [
          '$5M',
          'At least $9M',
          '$10M exactly',
          'Whatever the CEO decides',
        ],
      },
    ],
    keyTakeaway:
      "REITs give you real estate exposure with stock market liquidity. They're required to distribute most of their income — making them a powerful income tool.",
  },
  {
    id: 4,
    slug: 'financial-statements',
    name: 'The Lab Files',
    subtitle: 'Reading Financial Statements',
    icon: '📋',
    hawkinsLocation: 'Hawkins National Laboratory',
    color: '#76ff03',
    description:
      "Every public company publishes three key reports: income statement (are they making money?), balance sheet (what do they own vs owe?), and cash flow statement (is real cash coming in?). Like Hopper breaking into the Lab, you're going to learn to read what companies don't want you to miss.",
    resources: [
      {
        type: 'movie',
        title: 'Khan Academy — Financial Statements',
        author: 'Khan Academy',
        description:
          'Free, visual, step-by-step lessons on income statements, balance sheets, and cash flow. Pause and replay as needed.',
        url: 'https://www.khanacademy.org/economics-finance-domain/core-finance/accounting-and-financial-stateme',
        emoji: '🎬',
      },
      {
        type: 'book',
        title: 'Financial Statements',
        author: 'Thomas Ittelson',
        description:
          'Illustrated guide designed for non-accountants. Makes balance sheets and income statements actually understandable.',
        emoji: '📖',
      },
      {
        type: 'article',
        title: 'SEC — How to Read a 10-K',
        author: 'U.S. Securities and Exchange Commission',
        description:
          'Straight from the regulator. The official guide to understanding annual reports that public companies must file.',
        url: 'https://www.sec.gov/oiea/Article/edgarguide.html',
        emoji: '📰',
      },
    ],
    quiz: [
      {
        question: 'What does revenue mean?',
        options: [
          "The company's profit after expenses",
          'Total money earned from sales before expenses',
          "Money in the company's bank account",
          'Stock price multiplied by shares outstanding',
        ],
      },
      {
        question:
          'A company has $50M revenue and $60M in expenses. What is their net income?',
        options: [
          '$50M profit',
          '-$10M — a net loss',
          '$110M combined',
          'Cannot be determined',
        ],
      },
      {
        question: 'What does a balance sheet show?',
        options: [
          "Only the company's debts",
          'What a company owns (assets) vs what it owes (liabilities)',
          "The CEO's compensation",
          'Future sales predictions',
        ],
      },
      {
        question:
          'Company X reports $20M profit but negative $5M cash flow. Should you be concerned?',
        options: [
          'No — profit is all that matters',
          'Yes — profit without cash flow can mean accounting tricks or unsustainable operations',
          'No — cash flow is irrelevant',
          'Only if the stock price is dropping',
        ],
      },
      {
        question: 'Why is free cash flow important?',
        options: [
          'It shows the stock price direction',
          "It shows actual cash generated after all expenses — the real money a company can use",
          "It's only important for banks",
          'It measures employee productivity',
        ],
      },
    ],
    keyTakeaway:
      'Revenue, profit, assets, liabilities, and cash flow — these five numbers tell you 80% of what you need to know about any company.',
  },
  {
    id: 5,
    slug: 'stock-picking',
    name: 'The Party Investigates',
    subtitle: 'Researching & Picking Stocks',
    icon: '🔍',
    hawkinsLocation: "Mike's Basement",
    color: '#ffab00',
    description:
      "Like the Party gathering in Mike's basement to plan their next move, you'll research real companies. Focus on businesses you understand. Look at revenue growth, profit margins, competitive advantages (moats), and whether the price makes sense.",
    resources: [
      {
        type: 'book',
        title: 'One Up on Wall Street',
        author: 'Peter Lynch',
        description:
          '"Invest in what you know." The most practical stock-picking book ever written, by the legendary Fidelity fund manager.',
        emoji: '📖',
      },
      {
        type: 'movie',
        title: 'Margin Call',
        author: '2011 Film',
        description:
          'The institutional side of markets — shows how Wall Street operates during a crisis. Stellar cast, terrifyingly realistic.',
        emoji: '🎬',
      },
      {
        type: 'podcast',
        title: 'InvestED',
        author: 'Phil Town',
        description:
          'Value investing explained simply, with real examples. Phil Town breaks down how to evaluate companies like Buffett and Munger.',
        url: 'https://www.ruleoneinvesting.com/podcast/',
        emoji: '🎧',
      },
    ],
    quiz: [
      {
        question: 'What is a P/E ratio?',
        options: [
          'Price per Employee',
          'Price to Earnings — how much you pay per dollar of profit',
          'Profit to Expense ratio',
          'A type of stock order',
        ],
      },
      {
        question: "Peter Lynch's core investing advice:",
        options: [
          'Follow what celebrities invest in',
          'Invest in what you know and understand',
          'Buy the cheapest stocks available',
          'Only invest in tech companies',
        ],
      },
      {
        question:
          'Company A: P/E of 15, revenue growing 20%/year. Company B: P/E of 50, revenue growing 5%/year. Which is likely a better value?',
        options: [
          'Company B — higher P/E means better company',
          'Company A — cheaper relative to its growth rate',
          "They're equal in value",
          'Cannot compare without knowing the industry',
        ],
      },
      {
        question: 'What is a "moat" in investing?',
        options: [
          'A physical barrier around a stock exchange',
          'A competitive advantage that protects a company from rivals',
          'A type of stock option',
          'A legal restriction on selling shares',
        ],
      },
      {
        question:
          "You love a company's product but their revenue has declined 3 years straight. Should you invest?",
        options: [
          'Yes — great products always recover',
          "No — loving the product isn't enough, the financials must support the investment",
          'Yes — declining revenue means the stock is cheap',
          'Only if the CEO is well-known',
        ],
      },
    ],
    keyTakeaway:
      "Research = confidence. You don't need to be a Wall Street analyst. Start with companies you use, read their financials, and ask: is this a good business at a fair price?",
  },
  {
    id: 6,
    slug: 'dividends',
    name: 'The Snowball Effect',
    subtitle: 'Dividends & Income Investing',
    icon: '❄️',
    hawkinsLocation: 'The Snow Ball Dance',
    color: '#ff6d00',
    description:
      "Like a snowball rolling downhill, dividends compound when reinvested. Some companies have paid and increased dividends for 25+ years straight (Dividend Aristocrats). This isn't passive income hype — it's a proven, boring, powerful strategy.",
    resources: [
      {
        type: 'book',
        title: 'The Little Book of Big Dividends',
        author: 'Charles Carlson',
        description:
          'Practical guide to selecting dividend stocks. Covers yield, payout ratios, and how to build a dividend portfolio.',
        emoji: '📖',
      },
      {
        type: 'podcast',
        title: 'Dividend Cafe',
        author: 'David Bahnsen',
        description:
          'Weekly income investing insights from a respected wealth manager. Concise, data-driven, no hype.',
        url: 'https://thebahnsengroup.com/dividend-cafe/',
        emoji: '🎧',
      },
      {
        type: 'article',
        title: 'S&P Dividend Aristocrats',
        author: 'S&P Global',
        description:
          'The official list of companies with 25+ consecutive years of dividend increases. Real data, real track records.',
        url: 'https://www.spglobal.com/spdji/en/indices/dividends-factors/sp-500-dividend-aristocrats/',
        emoji: '📰',
      },
    ],
    quiz: [
      {
        question: 'What is a dividend?',
        options: [
          'A fee you pay to your broker',
          "A portion of a company's profits paid regularly to shareholders",
          'Interest earned on a savings account',
          'A tax on stock gains',
        ],
      },
      {
        question: 'What is DRIP?',
        options: [
          'A stock trading strategy',
          'Dividend Reinvestment Plan — automatically reinvesting dividends to buy more shares',
          'A type of market order',
          'Daily Return Investment Portfolio',
        ],
      },
      {
        question:
          'A company pays $2/share dividend annually. You own 100 shares and reinvest via DRIP at $50/share. After one year you have:',
        options: [
          '100 shares and $200 cash',
          '104 shares — and those 4 new shares will also earn dividends',
          '102 shares',
          "100 shares — DRIP doesn't add shares",
        ],
      },
      {
        question: 'What makes a company a Dividend Aristocrat?',
        options: [
          'Having the highest dividend yield',
          '25+ consecutive years of increasing their dividend payment',
          'Being in the S&P 500',
          'Paying dividends monthly instead of quarterly',
        ],
      },
    ],
    keyTakeaway:
      "Dividend investing isn't sexy, but reinvested dividends account for roughly 40% of total stock market returns historically. The snowball is real.",
    calculator: 'dividend',
  },
  {
    id: 7,
    slug: 'portfolio',
    name: 'The Final Battle',
    subtitle: 'Building Your Portfolio',
    icon: '⚔️',
    hawkinsLocation: 'Starcourt Mall (The Final Stand)',
    color: '#ffd600',
    description:
      "You've traveled through all of Hawkins. Now build your actual portfolio. Choose a brokerage, decide your allocation (stocks/bonds/REITs), set up automatic contributions, and start. Dollar-cost averaging means you invest the same amount regularly — no timing the market.",
    resources: [
      {
        type: 'book',
        title: "The Bogleheads' Guide to Investing",
        author: 'Larimore, Lindauer & LeBoeuf',
        description:
          'Community-written classic on building a real portfolio. Covers asset allocation, rebalancing, and staying the course.',
        emoji: '📖',
      },
      {
        type: 'movie',
        title: 'Money, Explained',
        author: 'Netflix',
        description:
          'Practical, no-fluff financial education. Episodes on retirement, credit, and investing — all under 20 minutes.',
        emoji: '🎬',
      },
      {
        type: 'podcast',
        title: 'ChooseFI',
        author: 'ChooseFI',
        description:
          'Actionable financial independence content. Community-driven, practical, and focused on real results.',
        url: 'https://www.choosefi.com/podcast/',
        emoji: '🎧',
      },
    ],
    quiz: [
      {
        question: 'What is dollar-cost averaging (DCA)?',
        options: [
          'Buying stocks only when prices are low',
          'Investing a fixed amount at regular intervals regardless of market price',
          'Averaging the price of your stocks daily',
          'A technique used only by professional traders',
        ],
      },
      {
        question: 'What is asset allocation?',
        options: [
          'Putting all your money in the best-performing stock',
          'How you divide investments across stocks, bonds, REITs, and other asset classes',
          'The amount of money you allocate to savings',
          'A government regulation on investment limits',
        ],
      },
      {
        question:
          "The market drops 20%. You're investing via DCA. What should you do?",
        options: [
          'Sell everything to avoid further losses',
          "Keep investing — you're now buying at lower prices",
          'Wait until the market recovers to resume',
          'Switch all investments to bonds',
        ],
      },
      {
        question:
          'A simple starter portfolio for a 25-year-old could be:',
        options: [
          '100% individual tech stocks',
          '80% stock index fund, 10% bond index fund, 10% REIT index fund',
          '100% savings account until age 40',
          '50% crypto, 50% gold',
        ],
      },
      {
        question:
          'What is the most important factor in long-term investment returns?',
        options: [
          'Timing the market perfectly',
          'Time in the market and consistent contributions',
          'Having a large starting amount',
          'Picking the right individual stocks',
        ],
      },
    ],
    keyTakeaway:
      "The best portfolio is one you'll stick with. Pick a simple allocation, automate contributions, and don't touch it. Time in the market beats timing the market.",
    calculator: 'portfolio',
  },
];
