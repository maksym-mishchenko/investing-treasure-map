'use client';

import { useState, useEffect } from 'react';

export default function CompletionModal() {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('completion_feedback_sent') === 'true') return;
    setShow(true);
  }, []);

  async function handleSubmit() {
    if (!rating || sending) return;
    setSending(true);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'completion',
          rating,
          message: message.trim() || undefined,
        }),
      });
    } catch { /* non-critical */ }
    localStorage.setItem('completion_feedback_sent', 'true');
    setSending(false);
    setShow(false);
  }

  function handleClose() {
    localStorage.setItem('completion_feedback_sent', 'true');
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
      <div
        className="max-w-md w-full rounded-2xl border p-8 text-center"
        style={{
          borderColor: 'rgba(255,214,0,0.3)',
          backgroundColor: '#111',
          boxShadow: '0 0 40px rgba(255,214,0,0.15)',
        }}
      >
        <span className="text-4xl block mb-4">🏆</span>
        <h2 className="font-neon text-xl tracking-wide mb-2" style={{ color: '#ffd600' }}>
          You completed the Investment Treasure Map!
        </h2>
        <p className="text-xs text-gray-500 mb-6">
          You survived Hawkins and learned real investing.
        </p>

        <p className="text-xs font-neon tracking-widest text-gray-400 mb-4">
          How was the journey?
        </p>
        <div className="flex justify-center gap-3 mb-6">
          {(['practical', 'useful', 'meh'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRating(r)}
              className={`text-[10px] font-neon tracking-widest border px-4 py-2 rounded-lg transition-all hover:scale-105 ${
                rating === r ? 'scale-105' : 'opacity-60'
              }`}
              style={{
                borderColor: rating === r ? '#ffd600' : 'rgba(255,255,255,0.1)',
                color: rating === r ? '#ffd600' : '#999',
                backgroundColor: rating === r ? 'rgba(255,214,0,0.1)' : 'transparent',
              }}
            >
              {r === 'practical' ? '🎯 Practical' : r === 'useful' ? '💡 Useful' : '😐 Meh'}
            </button>
          ))}
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Any feedback? (optional)"
          maxLength={500}
          className="w-full rounded-lg border border-white/10 bg-black/30 text-sm text-gray-300 p-3 mb-4 resize-none focus:outline-none focus:border-[#ffd600]/30"
          rows={3}
        />

        <div className="flex justify-center gap-3">
          <button
            onClick={handleClose}
            className="text-xs text-gray-600 hover:text-gray-400 font-neon tracking-widest px-4 py-2"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            disabled={!rating || sending}
            className="px-8 py-3 rounded-xl font-neon text-sm tracking-widest transition-all duration-300 hover:scale-105 disabled:opacity-40"
            style={{
              backgroundColor: '#ffd600',
              color: '#0a0a0a',
              boxShadow: '0 0 20px rgba(255,214,0,0.3)',
            }}
          >
            {sending ? 'Sending...' : 'Send & Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
