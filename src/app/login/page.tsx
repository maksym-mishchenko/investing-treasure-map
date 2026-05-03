'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      router.push('/');
    } catch {
      setError('Wrong credentials. The Upside Down rejects you.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(255,23,68,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="spore"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${8 + i * 2}s`,
            }}
          />
        ))}
      </div>

        <div className="relative z-10 w-full max-w-sm">
          <div className="text-center mb-10">
          <div className="text-5xl mb-4" style={{ filter: 'drop-shadow(0 0 20px #ff1744)' }}>
            🔦
          </div>
          <h1
            className="text-3xl sm:text-4xl font-cinzel neon-glow mb-2"
            style={{ '--neon-color': '#ff1744' } as React.CSSProperties}
          >
            Enter Hawkins
          </h1>
          <p className="text-xs text-gray-500 font-cinzel tracking-widest">
            Identify yourself, traveler
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-cinzel tracking-widest text-gray-500 mb-2 uppercase">
              Agent Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              placeholder="e.g. guest"
              className="w-full bg-black/60 border rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-700 outline-none transition-all duration-300 focus:border-[#ff1744]"
              style={{
                borderColor: 'rgba(255,23,68,0.3)',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow =
                  'inset 0 0 10px rgba(0,0,0,0.5), 0 0 15px rgba(255,23,68,0.15)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = 'inset 0 0 10px rgba(0,0,0,0.5)';
              }}
            />
          </div>

          <div>
            <label className="block text-[10px] font-cinzel tracking-widest text-gray-500 mb-2 uppercase">
              Secret Code
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="w-full bg-black/60 border rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-700 outline-none transition-all duration-300 focus:border-[#ff1744]"
              style={{
                borderColor: 'rgba(255,23,68,0.3)',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow =
                  'inset 0 0 10px rgba(0,0,0,0.5), 0 0 15px rgba(255,23,68,0.15)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = 'inset 0 0 10px rgba(0,0,0,0.5)';
              }}
            />
          </div>

          {error && (
            <div
              className="text-xs text-center py-2 px-3 rounded border font-cinzel tracking-wide"
              style={{
                color: '#ff1744',
                borderColor: 'rgba(255,23,68,0.3)',
                backgroundColor: 'rgba(255,23,68,0.05)',
                animation: 'flicker 0.5s ease-in-out',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-cinzel text-sm tracking-widest transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              backgroundColor: '#ff1744',
              color: '#0a0a0a',
              boxShadow: loading
                ? 'none'
                : '0 0 25px rgba(255,23,68,0.5), 0 0 50px rgba(255,23,68,0.2)',
            }}
          >
            {loading ? '⚡ Entering...' : '⚡ Enter'}
          </button>
        </form>

        <p className="text-center text-[10px] text-gray-700 mt-8 font-cinzel tracking-widest">
          &quot;The gate is open. Identify yourself.&quot;
        </p>
      </div>
    </div>
  );
}
