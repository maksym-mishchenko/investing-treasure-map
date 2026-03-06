const STORAGE_KEY = 'diana-investment-journey';

interface Progress {
  completedZones: number[];
  currentZone: number;
  quizScores: Record<number, number>;
  startedAt: string;
}

export function getProgress(): Progress {
  if (typeof window === 'undefined') return defaultProgress();
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : defaultProgress();
}

export function saveProgress(progress: Progress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function completeZone(zoneId: number, score: number): void {
  const progress = getProgress();
  if (!progress.completedZones.includes(zoneId)) {
    progress.completedZones.push(zoneId);
  }
  progress.quizScores[zoneId] = score;
  progress.currentZone = Math.min(zoneId + 1, 7);
  saveProgress(progress);
}

export function isZoneUnlocked(zoneId: number): boolean {
  if (zoneId === 1) return true;
  const progress = getProgress();
  return progress.completedZones.includes(zoneId - 1);
}

export function isZoneCompleted(zoneId: number): boolean {
  return getProgress().completedZones.includes(zoneId);
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}

function defaultProgress(): Progress {
  return {
    completedZones: [],
    currentZone: 1,
    quizScores: {},
    startedAt: new Date().toISOString(),
  };
}
