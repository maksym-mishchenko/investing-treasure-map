'use client';

import { useState, useEffect } from 'react';

interface ZoneRatingProps {
  zoneSlug: string;
  zoneColor: string;
}

export default function ZoneRating({ zoneSlug, zoneColor }: ZoneRatingProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSent(localStorage.getItem(`rating_${zoneSlug}`) !== null);
  }, [zoneSlug]);

  async function handleRate(rating: 'practical' | 'useful' | 'meh') {
    if (loading || sent) return;
    setLoading(true);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'zone-rating', zone: zoneSlug, rating }),
      });
    } catch { /* non-critical */ }
    localStorage.setItem(`rating_${zoneSlug}`, rating);
    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <p className="text-center text-xs font-neon tracking-widest mt-6" style={{ color: zoneColor }}>
        ✓ Thanks for your feedback!
      </p>
    );
  }

  return (
    <div className="mt-8 text-center">
      <p className="text-xs font-neon tracking-widest text-gray-400 mb-4">
        Was this zone useful?
      </p>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => handleRate('practical')}
          disabled={loading}
          className="text-[10px] font-neon tracking-widest border px-4 py-2 rounded-lg transition-all hover:scale-105 disabled:opacity-50"
          style={{ borderColor: `${zoneColor}40`, color: zoneColor }}
        >
          🎯 Practical
        </button>
        <button
          onClick={() => handleRate('useful')}
          disabled={loading}
          className="text-[10px] font-neon tracking-widest border px-4 py-2 rounded-lg transition-all hover:scale-105 disabled:opacity-50"
          style={{ borderColor: `${zoneColor}40`, color: zoneColor }}
        >
          💡 Useful
        </button>
        <button
          onClick={() => handleRate('meh')}
          disabled={loading}
          className="text-[10px] font-neon tracking-widest border border-gray-700 px-4 py-2 rounded-lg transition-all hover:scale-105 disabled:opacity-50 text-gray-500"
        >
          😐 Meh
        </button>
      </div>
    </div>
  );
}
