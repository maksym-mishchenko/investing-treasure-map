'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { BADGES, type BadgeDefinition } from '@/lib/badges'
import BadgeCard from '@/components/BadgeCard'
import Particles from '@/components/Particles'
import { zones } from '@/lib/zones'
import { isZoneCompleted } from '@/lib/progress'

interface EarnedBadge {
  badgeId: string
  earnedAt: string
}

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [earnedBadges, setEarnedBadges] = useState<EarnedBadge[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!loading && !user?.authenticated) {
      router.push('/login')
    }
  }, [loading, user, router])

  useEffect(() => {
    if (user?.authenticated) {
      fetch('/api/badges')
        .then((res) => res.json())
        .then((data) => setEarnedBadges(data.badges ?? []))
        .catch(() => {})
    }
  }, [user])

  if (loading || !user?.authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-cinzel text-sm tracking-widest text-gray-500">Loading...</p>
      </div>
    )
  }

  const username = user.username
  const completedCount = mounted
    ? zones.filter((z) => isZoneCompleted(username, z.id)).length
    : 0

  function isEarned(badgeId: string) {
    return earnedBadges.some((b) => b.badgeId === badgeId)
  }

  function getEarnedAt(badgeId: string) {
    return earnedBadges.find((b) => b.badgeId === badgeId)?.earnedAt ?? null
  }

  return (
    <div className="min-h-screen relative">
      <Particles />

      <div className="relative z-10 px-4 py-12 max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-block text-xs text-gray-500 hover:text-gray-300 font-cinzel tracking-widest mb-8"
        >
          ← Back to Map
        </Link>

        {/* Profile Header */}
        <div className="text-center mb-10">
          {user.image && (
            <img
              src={user.image}
              alt=""
              className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-[#ff1744]/30"
              referrerPolicy="no-referrer"
              style={{ boxShadow: '0 0 20px rgba(255,23,68,0.2)' }}
            />
          )}
          <h1
            className="font-cinzel text-2xl tracking-wide neon-glow mb-1"
            style={{ '--neon-color': '#ff1744' } as React.CSSProperties}
          >
            {user.displayName}
          </h1>
          <p className="text-xs text-gray-500">{user.username}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
            <p className="text-2xl font-cinzel text-[#00e5ff]">{completedCount}</p>
            <p className="text-[10px] font-cinzel tracking-widest text-gray-500 mt-1">
              Zones Completed
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
            <p className="text-2xl font-cinzel text-[#ff1744]">
              {earnedBadges.length}
            </p>
            <p className="text-[10px] font-cinzel tracking-widest text-gray-500 mt-1">
              Badges Earned
            </p>
          </div>
        </div>

        {/* Badges */}
        <h2 className="font-cinzel text-sm tracking-widest text-gray-400 mb-4">
          🏅 Achievements
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          {BADGES.map((badge: BadgeDefinition) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              earned={isEarned(badge.id)}
              earnedAt={getEarnedAt(badge.id)}
            />
          ))}
        </div>

        {/* Links */}
        <div className="flex justify-center gap-4">
          <Link
            href="/journal"
            className="text-xs font-cinzel tracking-widest border border-[#00e5ff]/30 px-4 py-2 rounded-lg transition-all hover:border-[#00e5ff] hover:text-[#00e5ff]"
            style={{ color: 'rgba(0,229,255,0.6)' }}
          >
            📝 Journal
          </Link>
          <Link
            href="/"
            className="text-xs font-cinzel tracking-widest border border-[#ff1744]/30 px-4 py-2 rounded-lg transition-all hover:border-[#ff1744] hover:text-[#ff1744]"
            style={{ color: 'rgba(255,23,68,0.6)' }}
          >
            🗺️ Map
          </Link>
        </div>
      </div>
    </div>
  )
}
