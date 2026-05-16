interface Progress {
  completedZones: number[];
  currentZone: number;
  quizScores: Record<number, number>;
  startedAt: string;
}

function storageKey(username: string): string {
  return `progress_${username}`;
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

  // Fire-and-forget server sync for authenticated users (not guest)
  if (username !== 'guest') {
    saveProgressToServer(zoneId, score).catch((err) =>
      console.error('[progress] server sync failed:', err)
    );
  }
}

export function isZoneUnlocked(username: string, zoneId: number): boolean {
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

/** Fetch progress from server and merge into localStorage */
export async function syncProgressFromServer(username: string): Promise<void> {
  try {
    const res = await fetch('/api/progress');
    if (!res.ok) return;
    const data = await res.json();
    if (!data.progress || data.progress.length === 0) {
      // No server progress — import localStorage to server.
      // Prefer user-keyed progress; fall back to guest progress (user played before signing in).
      let local = getProgress(username);
      if (local.completedZones.length === 0) {
        const guest = getProgress('guest');
        if (guest.completedZones.length > 0) {
          local = guest;
          saveProgress(username, local); // migrate guest progress to user key
        }
      }
      if (local.completedZones.length > 0) {
        await fetch('/api/progress/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            completedZones: local.completedZones,
            quizScores: local.quizScores,
          }),
        });
      }
      return;
    }

    // Merge server progress into localStorage
    const local = getProgress(username);
    for (const entry of data.progress as { zoneId: number; quizScore: number | null; completed: boolean }[]) {
      if (entry.completed && !local.completedZones.includes(entry.zoneId)) {
        local.completedZones.push(entry.zoneId);
      }
      if (entry.quizScore != null) {
        const existing = local.quizScores[entry.zoneId] ?? 0;
        local.quizScores[entry.zoneId] = Math.max(existing, entry.quizScore);
      }
    }
    local.currentZone = local.completedZones.length > 0
      ? Math.min(Math.max(...local.completedZones) + 1, 7)
      : 1;
    saveProgress(username, local);
  } catch {
    // Silently fail — localStorage is the fallback
  }
}

/** Save a single zone completion to the server */
export async function saveProgressToServer(
  zoneId: number,
  quizScore?: number,
  rating?: string,
): Promise<void> {
  await fetch('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ zoneId, quizScore, rating }),
  });
}
