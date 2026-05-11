export interface ChangelogEntry {
  version: string
  date: string
  status: "shipped" | "current" | "planned"
  items: { emoji: string; text: string; done: boolean }[]
}

export const changelog: ChangelogEntry[] = [
  {
    version: "v2.3",
    date: "Coming Soon",
    status: "planned",
    items: [
      {
        emoji: "📊",
        text: "Live Stock Ticker — real market data in zones",
        done: false,
      },
    ],
  },
  {
    version: "v2.2",
    date: "May 2026",
    status: "current",
    items: [
      {
        emoji: "🏆",
        text: "Achievements & Badges — earn 10 badges as you learn",
        done: true,
      },
      {
        emoji: "📝",
        text: "Investment Journal — reflect on what you learned",
        done: true,
      },
      {
        emoji: "👤",
        text: "Profile page — view your badges and stats",
        done: true,
      },
    ],
  },
  {
    version: "v2.1",
    date: "May 2026",
    status: "shipped",
    items: [
      {
        emoji: "🧮",
        text: "Interactive Calculators — compound interest, dividends, portfolio allocation",
        done: true,
      },
      {
        emoji: "👥",
        text: "Community Stats — see how many investors are learning",
        done: true,
      },
      {
        emoji: "📋",
        text: "Roadmap — track what's new and what's coming",
        done: true,
      },
    ],
  },
  {
    version: "v2.0",
    date: "May 2026",
    status: "shipped",
    items: [
      {
        emoji: "📚",
        text: "New curriculum — S&P 500, REITs, dividends, stock picking",
        done: true,
      },
      {
        emoji: "🔐",
        text: "Google Sign In + cross-device progress sync",
        done: true,
      },
      {
        emoji: "🎯",
        text: "Per-zone ratings (Practical / Useful / Meh)",
        done: true,
      },
      {
        emoji: "💬",
        text: "Feedback form — general feedback, topic requests, issue reports",
        done: true,
      },
      {
        emoji: "📜",
        text: "Privacy policy & legal disclaimers",
        done: true,
      },
      {
        emoji: "🔄",
        text: "Smart progress migration from v1",
        done: true,
      },
    ],
  },
  {
    version: "v1.0",
    date: "April 2026",
    status: "shipped",
    items: [
      {
        emoji: "🗺️",
        text: "7 learning zones with Stranger Things theme",
        done: true,
      },
      {
        emoji: "❓",
        text: "Quizzes with pass/fail scoring",
        done: true,
      },
      {
        emoji: "🔓",
        text: "Sequential zone unlocking",
        done: true,
      },
      {
        emoji: "👻",
        text: "Public read-only guest mode",
        done: true,
      },
    ],
  },
]
