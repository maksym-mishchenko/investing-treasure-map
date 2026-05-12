'use client';

import { useEffect, useState } from 'react';

const CURRICULUM_VERSION = '2';

// Map old zone IDs to new zone IDs where topics overlap
// Old: 1=mindset, 2=economy, 3=index, 4=statements, 5=research, 6=practice, 7=decision
// New: 1=why-investing, 2=index, 3=reits, 4=statements, 5=stock-picking, 6=dividends, 7=portfolio
const ZONE_MIGRATION: Record<number, number> = {
  2: 1, // economy basics → why investing (similar)
  3: 2, // index funds → index funds (same)
  4: 4, // financial statements → financial statements (same)
  5: 5, // research companies → stock picking (similar)
};

export default function CurriculumUpdateModal() {
  const [show, setShow] = useState(false);
  const [migratedCount, setMigratedCount] = useState(0);

  useEffect(() => {
    const version = localStorage.getItem('curriculum_version');
    if (version === CURRICULUM_VERSION) return;

    // Check if user has any progress at all
    const keys = Object.keys(localStorage);
    const hasProgress = keys.some((k) => k.startsWith('progress_'));
    if (!hasProgress && !version) {
      // Brand new user — just set version, no popup
      localStorage.setItem('curriculum_version', CURRICULUM_VERSION);
      return;
    }

    if (hasProgress) {
      setShow(true);
    }
  }, []);

  function handleDismiss() {
    // Migrate progress for each user key (progress_admin, progress_guest, etc.)
    const keys = Object.keys(localStorage);
    let migrated = 0;

    keys.filter((k) => k.startsWith('progress_')).forEach((key) => {
      try {
        const progress = JSON.parse(localStorage.getItem(key) ?? '{}');
        if (!progress.completedZones || !Array.isArray(progress.completedZones)) return;

        const newCompleted: number[] = [];
        for (const oldZoneId of progress.completedZones) {
          const newId = ZONE_MIGRATION[oldZoneId];
          if (newId && !newCompleted.includes(newId)) {
            newCompleted.push(newId);
            migrated++;
          }
        }

        // Ensure sequential unlock: only keep zones where all previous are completed
        newCompleted.sort((a, b) => a - b);
        const sequential: number[] = [];
        for (const id of newCompleted) {
          if (id === 1 || sequential.includes(id - 1)) {
            sequential.push(id);
          }
        }

        progress.completedZones = sequential;
        progress.currentZone = sequential.length > 0 ? Math.max(...sequential) + 1 : 1;
        progress.quizScores = {};
        localStorage.setItem(key, JSON.stringify(progress));
      } catch { /* skip malformed */ }
    });

    // Clear old rating/feedback keys
    keys.forEach((key) => {
      if (key.startsWith('rating_') || key === 'feedback_sent' || key === 'completion_feedback_sent') {
        localStorage.removeItem(key);
      }
    });

    setMigratedCount(migrated);
    localStorage.setItem('curriculum_version', CURRICULUM_VERSION);
    setShow(false);
    window.location.reload();
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
      <div
        className="max-w-md w-full rounded-2xl border p-8 text-center"
        style={{
          borderColor: 'rgba(0,229,255,0.3)',
          backgroundColor: '#111',
          boxShadow: '0 0 40px rgba(0,229,255,0.15)',
        }}
      >
        <span className="text-4xl block mb-4">🔄</span>
        <h2 className="font-neon text-xl tracking-wide mb-3" style={{ color: '#00e5ff' }}>
          Curriculum v2.0
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          We&apos;ve redesigned the journey with real investing content:
          S&amp;P 500, REITs, dividends, stock picking — no fluff.
          <br /><br />
          Your progress on matching topics has been carried over.
          You may want to revisit them since the content is updated.
        </p>
        <button
          onClick={handleDismiss}
          className="px-8 py-3 rounded-xl font-neon text-sm tracking-widest transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: '#00e5ff',
            color: '#0a0a0a',
            boxShadow: '0 0 20px rgba(0,229,255,0.4)',
          }}
        >
          Let&apos;s go!
        </button>
      </div>
    </div>
  );
}
