'use client';

import { useState } from 'react';

const TYPES = [
  { value: 'feedback', label: '💬 General Feedback', placeholder: 'What do you think about the journey?' },
  { value: 'topic-request', label: '📚 Request a Topic', placeholder: 'What investing topic should we cover next?' },
  { value: 'report-issue', label: '🐛 Report an Issue', placeholder: 'What went wrong? Which zone?' },
] as const;

export default function FeedbackForm() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>('feedback');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const current = TYPES.find((t) => t.value === type) ?? TYPES[0];

  async function handleSubmit() {
    if (!message.trim() || sending) return;
    setSending(true);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, message: message.trim() }),
      });
    } catch { /* non-critical */ }
    setSending(false);
    setSent(true);
    setMessage('');
  }

  if (sent) {
    return (
      <div className="mt-12 w-full max-w-md text-center">
        <p className="text-xs font-neon tracking-widest" style={{ color: '#00e5ff' }}>
          ✓ Thanks for your feedback! We read every message.
        </p>
        <button
          onClick={() => { setSent(false); setOpen(false); }}
          className="text-[10px] text-gray-600 hover:text-gray-400 mt-2"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <div className="mt-12 w-full max-w-md">
      {!open ? (
        <div className="text-center">
          <button
            onClick={() => setOpen(true)}
            className="text-[10px] font-neon tracking-widest text-gray-500 hover:text-gray-300 transition-colors border border-gray-800 hover:border-gray-600 px-5 py-2.5 rounded-lg"
          >
            💬 Feedback · Request · Report
          </button>
        </div>
      ) : (
        <div
          className="border rounded-xl p-5"
          style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-neon tracking-widest text-gray-400">
              Talk to us
            </p>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-600 hover:text-gray-400 text-sm"
            >
              ✕
            </button>
          </div>

          <div className="flex gap-2 mb-4 flex-wrap">
            {TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                className="text-[10px] font-neon tracking-widest border px-3 py-1.5 rounded-lg transition-all"
                style={{
                  borderColor: type === t.value ? '#00e5ff40' : 'rgba(255,255,255,0.08)',
                  color: type === t.value ? '#00e5ff' : '#666',
                  backgroundColor: type === t.value ? 'rgba(0,229,255,0.05)' : 'transparent',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={current.placeholder}
            maxLength={500}
            className="w-full rounded-lg border border-white/10 bg-black/30 text-sm text-gray-300 p-3 mb-3 resize-none focus:outline-none focus:border-[#00e5ff]/30"
            rows={3}
          />

          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-700">{message.length}/500</span>
            <button
              onClick={handleSubmit}
              disabled={!message.trim() || sending}
              className="px-6 py-2 rounded-lg font-neon text-[10px] tracking-widest transition-all hover:scale-105 disabled:opacity-40"
              style={{
                backgroundColor: '#00e5ff',
                color: '#0a0a0a',
                boxShadow: '0 0 15px rgba(0,229,255,0.2)',
              }}
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
