interface Progress {
  completedZones: number[];
  currentZone: number;
  quizScores: Record<number, number>;
  startedAt: string;
}

function storageKey(username: string): string {
  return `progress_${username}`;
}

export function isAdminMode(username: string): boolean {
  return username === 'admin';
}

export function getProgress(username: string): Progress {
  if (typeof window === 'undefined') return defaultProgress();
  const saved = localStorage.getItem(storageKey(username));
  return saved ? JSON.parse(saved) : defaultProgress();
}

export function saveProgress(username: string, progress: Progress): void {
  localStorage.setItem(storageKey(username), JSON.stringify(progress));
}

export function completeZone(username: string, zoneId: number, score: number): void {
  const progress = getProgress(username);
  if (!progress.completedZones.includes(zoneId)) {
    progress.completedZones.push(zoneId);
  }
  progress.quizScores[zoneId] = score;
  progress.currentZone = Math.min(zoneId + 1, 7);
  saveProgress(username, progress);
}

export function isZoneUnlocked(username: string, zoneId: number): boolean {
  if (isAdminMode(username)) return true;
  if (zoneId === 1) return true;
  const progress = getProgress(username);
  return progress.completedZones.includes(zoneId - 1);
}

export function isZoneCompleted(username: string, zoneId: number): boolean {
  return getProgress(username).completedZones.includes(zoneId);
}

export function resetProgress(username: string): void {
  localStorage.removeItem(storageKey(username));
}

function defaultProgress(): Progress {
  return {
    completedZones: [],
    currentZone: 1,
    quizScores: {},
    startedAt: new Date().toISOString(),
  };
}
