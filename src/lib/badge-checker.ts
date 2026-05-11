import { ZONE_BADGES } from './badges'

export async function checkAndAwardBadges(
  zoneId: number,
  quizScore: number,
  totalQuestions: number,
  username: string,
) {
  const badgesToAward: string[] = []

  // Zone completion badge
  if (ZONE_BADGES[zoneId]) {
    badgesToAward.push(ZONE_BADGES[zoneId])
  }

  // Perfectionist: 100% score
  if (quizScore === totalQuestions) {
    badgesToAward.push('perfectionist')
  }

  // Portfolio Architect: check if all 7 zones completed
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(`progress_${username}`)
    if (saved) {
      const progress = JSON.parse(saved)
      const completed = progress.completedZones as number[] | undefined
      if (
        (completed?.length === 7) ||
        (completed?.length === 6 && !completed.includes(zoneId))
      ) {
        badgesToAward.push('portfolio-architect')
      }
    }
  }

  // Award each badge via API
  for (const badgeId of badgesToAward) {
    try {
      await fetch('/api/badges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ badgeId }),
      })
    } catch {
      /* non-critical */
    }
  }

  return badgesToAward
}
