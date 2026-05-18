'use client';

import { useEffect, useState } from 'react';
import { changelog } from '@/lib/changelog';

const WHATS_NEW_KEY = 'whats_new_seen';

export default function WhatsNewModal() {
  const [show, setShow] = useState(false);
  const currentVersion = changelog[0]?.version;

  useEffect(() => {
    const seen = localStorage.getItem(WHATS_NEW_KEY);
    if (seen !== currentVersion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
    }
  }, [currentVersion]);

  function handleDismiss() {
    localStorage.setItem(WHATS_NEW_KEY, currentVersion);
    setShow(false);
  }

  if (!show) return null;

  const entry = changelog[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
      <div
        className="max-w-md w-full rounded-2xl border p-8 text-center"
        style={{
          borderColor: 'rgba(224,64,251,0.3)',
          backgroundColor: '#111',
          boxShadow: '0 0 40px rgba(224,64,251,0.15)',
        }}
      >
        <span className="text-4xl block mb-4">✨</span>
        <h2 className="font-neon text-xl tracking-wide mb-2" style={{ color: '#e040fb' }}>
          What&apos;s New
        </h2>
        <p className="text-[10px] font-neon tracking-widest text-gray-500 mb-5">
          {entry.version} · {entry.date}
        </p>

        <div className="text-left space-y-3 mb-6">
          {entry.items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
              <span className="text-lg flex-shrink-0">{item.emoji}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <div
          className="text-[10px] text-gray-600 leading-relaxed mb-6 border-t border-gray-800 pt-4"
        >
          <span className="text-gray-500">💜 This update was shaped by your feedback</span>
        </div>

        <button
          onClick={handleDismiss}
          className="px-8 py-3 rounded-xl font-neon text-sm tracking-widest transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: '#e040fb',
            color: '#0a0a0a',
            boxShadow: '0 0 20px rgba(224,64,251,0.4)',
          }}
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
