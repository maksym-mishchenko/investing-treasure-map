'use client'

import type { BadgeDefinition } from '@/lib/badges'

interface BadgeCardProps {
  badge: BadgeDefinition
  earned: boolean
  earnedAt?: string | null
}

export default function BadgeCard({ badge, earned, earnedAt }: BadgeCardProps) {
  return (
    <div
      className={`relative rounded-xl border p-4 text-center transition-all duration-300 ${
        earned
          ? 'border-[#00e5ff]/30 bg-[#00e5ff]/5'
          : 'border-white/5 bg-white/[0.02] opacity-50'
      }`}
      style={
        earned
          ? { boxShadow: '0 0 20px rgba(0,229,255,0.1)' }
          : undefined
      }
    >
      <div
        className={`text-3xl mb-2 ${earned ? '' : 'grayscale'}`}
        style={earned ? { filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.4))' } : undefined}
      >
        {badge.icon}
      </div>
      <h3
        className={`font-neon text-xs tracking-widest mb-1 ${
          earned ? 'text-[#00e5ff]' : 'text-gray-600'
        }`}
      >
        {badge.name}
      </h3>
      {earned ? (
        <>
          <p className="text-[10px] text-gray-400">{badge.description}</p>
          {earnedAt && (
            <p className="text-[9px] text-gray-600 mt-1">
              Earned {new Date(earnedAt).toLocaleDateString()}
            </p>
          )}
        </>
      ) : (
        <p className="text-[10px] text-gray-600 italic">{badge.hint}</p>
      )}
    </div>
  )
}
