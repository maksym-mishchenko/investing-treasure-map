'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import Particles from '@/components/Particles'
import { zones } from '@/lib/zones'

interface JournalEntry {
  zoneId: number
  content: string
  updatedAt: string
}

export default function JournalPage() {
  const { user, loading } = useAuth()
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    if (user?.authenticated) {
      fetch('/api/journal')
        .then((res) => res.json())
        .then((data) => {
          setEntries(data.entries ?? [])
          setFetched(true)
        })
        .catch(() => setFetched(true))
    }
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-neon text-sm tracking-widest text-gray-500">Loading...</p>
      </div>
    )
  }

  const sortedEntries = [...entries].sort((a, b) => a.zoneId - b.zoneId)
  const allZonesCovered = sortedEntries.length === zones.length

  return (
    <div className="min-h-screen relative">
      <Particles />

      <div className="relative z-10 px-4 py-12 max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-block text-xs text-gray-500 hover:text-gray-300 font-neon tracking-widest mb-8"
        >
          ← Back to Map
        </Link>

        <div className="text-center mb-10">
          <h1
            className="font-neon text-2xl sm:text-3xl tracking-wide neon-glow mb-2"
            style={{ '--neon-color': '#ff1744' } as React.CSSProperties}
          >
            📝 Your Investment Journal
          </h1>
          <p className="text-sm text-gray-400">
            Your personal reflections on each zone
          </p>
        </div>

        {!user?.authenticated ? (
          <div className="text-center py-16">
            <p className="text-3xl mb-4">🔒</p>
            <p className="text-gray-400 mb-4">Sign in to view your journal</p>
            <a
              href="/login"
              className="text-xs font-neon tracking-widest border border-[#00e5ff]/30 px-6 py-2 rounded-lg transition-all hover:border-[#00e5ff] hover:text-[#00e5ff]"
              style={{ color: 'rgba(0,229,255,0.6)' }}
            >
              Sign In
            </a>
          </div>
        ) : fetched && entries.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-3xl mb-4">📖</p>
            <p className="text-gray-400 text-sm">
              Complete zones and write reflections to build your journal
            </p>
          </div>
        ) : (
          <>
            {allZonesCovered && (
              <div
                className="rounded-xl border border-[#00e5ff]/30 bg-[#00e5ff]/5 p-5 mb-8 text-center"
                style={{ boxShadow: '0 0 30px rgba(0,229,255,0.1)' }}
              >
                <p className="text-lg mb-1">🏆</p>
                <h2 className="font-neon text-sm tracking-widest text-[#00e5ff] mb-1">
                  Personal Investment Manifesto
                </h2>
                <p className="text-[10px] text-gray-400">
                  You&apos;ve reflected on every zone — your investment philosophy is taking shape!
                </p>
              </div>
            )}

            <div className="space-y-4">
              {sortedEntries.map((entry) => {
                const zone = zones.find((z) => z.id === entry.zoneId)
                if (!zone) return null

                return (
                  <div
                    key={entry.zoneId}
                    className="rounded-xl border p-5"
                    style={{
                      borderColor: `${zone.color}30`,
                      backgroundColor: `${zone.color}05`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{zone.icon}</span>
                      <div>
                        <h3
                          className="font-neon text-xs tracking-widest"
                          style={{ color: zone.color }}
                        >
                          Zone {zone.id}: {zone.name}
                        </h3>
                        <p className="text-[10px] text-gray-600">
                          {new Date(entry.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {entry.content}
                    </p>
                  </div>
                )
              })}
            </div>
          </>
        )}

        <div className="flex justify-center gap-4 mt-10">
          <Link
            href="/profile"
            className="text-xs font-neon tracking-widest border border-[#ff1744]/30 px-4 py-2 rounded-lg transition-all hover:border-[#ff1744] hover:text-[#ff1744]"
            style={{ color: 'rgba(255,23,68,0.6)' }}
          >
            🏅 Profile
          </Link>
          <Link
            href="/"
            className="text-xs font-neon tracking-widest border border-[#ff1744]/30 px-4 py-2 rounded-lg transition-all hover:border-[#ff1744] hover:text-[#ff1744]"
            style={{ color: 'rgba(255,23,68,0.6)' }}
          >
            🗺️ Map
          </Link>
        </div>
      </div>
    </div>
  )
}
