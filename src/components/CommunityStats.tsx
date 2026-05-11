'use client'

import { useEffect, useState } from 'react'

interface Stats {
  users: number
  completions: number
  topZone: string | null
}

export default function CommunityStats() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {})
  }, [])

  if (!stats || (stats.users === 0 && stats.completions === 0)) return null

  return (
    <div className="mt-6 w-full max-w-md text-center">
      <div className="flex flex-wrap justify-center gap-4 text-[10px] font-cinzel tracking-widest text-gray-500">
        {stats.users > 0 && <span>🎓 {stats.users} investors trained</span>}
        {stats.completions > 0 && <span>📚 {stats.completions} zones completed</span>}
        {stats.topZone && <span>⭐ Most loved: {stats.topZone}</span>}
      </div>
    </div>
  )
}
