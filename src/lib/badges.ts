export interface BadgeDefinition {
  id: string
  name: string
  description: string
  icon: string
  hint: string
}

export const BADGES: BadgeDefinition[] = [
  { id: 'first-steps', name: 'First Steps', description: 'Complete your first zone', icon: '🌱', hint: 'Complete Zone 1' },
  { id: 'index-believer', name: 'Index Fund Believer', description: 'Complete the Index Funds zone', icon: '🛡️', hint: 'Complete Zone 2' },
  { id: 'real-estate', name: 'Real Estate Mogul', description: 'Complete the REITs zone', icon: '🏰', hint: 'Complete Zone 3' },
  { id: 'number-cruncher', name: 'Number Cruncher', description: 'Complete Financial Statements', icon: '📊', hint: 'Complete Zone 4' },
  { id: 'stock-detective', name: 'Stock Detective', description: 'Complete Stock Picking', icon: '🔍', hint: 'Complete Zone 5' },
  { id: 'dividend-collector', name: 'Dividend Collector', description: 'Complete the Dividends zone', icon: '❄️', hint: 'Complete Zone 6' },
  { id: 'portfolio-architect', name: 'Portfolio Architect', description: 'Complete all zones', icon: '⚔️', hint: 'Complete all zones' },
  { id: 'speed-runner', name: 'Speed Runner', description: 'Complete all zones in one day', icon: '⚡', hint: 'Finish everything in 24 hours' },
  { id: 'perfectionist', name: 'Perfectionist', description: 'Score 100% on any quiz', icon: '💎', hint: 'Get a perfect quiz score' },
  { id: 'feedback-hero', name: 'Feedback Hero', description: 'Submit feedback or topic request', icon: '💬', hint: 'Share your thoughts' },
]

export const ZONE_BADGES: Record<number, string> = {
  1: 'first-steps',
  2: 'index-believer',
  3: 'real-estate',
  4: 'number-cruncher',
  5: 'stock-detective',
  6: 'dividend-collector',
}
