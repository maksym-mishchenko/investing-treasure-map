import Link from 'next/link'
import { changelog } from '@/lib/changelog'

const statusConfig = {
  current: { label: '✨ Current', color: '#00e5ff' },
  shipped: { label: '🚀 Shipped', color: '#4caf50' },
  planned: { label: '🔮 Planned', color: '#ffd600' },
}

export default function RoadmapPage() {
  return (
    <div className="min-h-screen px-4 py-12 max-w-2xl mx-auto">
      <Link
        href="/"
        className="inline-block text-xs text-gray-500 hover:text-gray-300 font-neon tracking-widest mb-8"
      >
        ← Back to Map
      </Link>

      <h1
        className="text-2xl sm:text-3xl font-neon tracking-wide mb-2 neon-glow"
        style={{ '--neon-color': '#00e5ff' } as React.CSSProperties}
      >
        📋 Roadmap
      </h1>
      <p className="text-sm text-gray-400 mb-10">
        What&apos;s new, what&apos;s next, and what&apos;s been built.
      </p>

      <div className="space-y-6">
        {changelog.map((entry) => {
          const status = statusConfig[entry.status]
          return (
            <div
              key={entry.version}
              className="rounded-xl border p-5"
              style={{
                borderColor: `${status.color}20`,
                backgroundColor: `${status.color}05`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-neon text-base tracking-wide" style={{ color: status.color }}>
                  {entry.version}
                </span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-neon tracking-widest"
                  style={{
                    backgroundColor: `${status.color}15`,
                    color: status.color,
                    border: `1px solid ${status.color}30`,
                  }}
                >
                  {status.label}
                </span>
                <span className="text-[10px] text-gray-600 ml-auto">{entry.date}</span>
              </div>

              <ul className="space-y-2">
                {entry.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="flex-shrink-0 mt-0.5">{item.done ? '✅' : '⬜'}</span>
                    <span className={item.done ? 'text-gray-300' : 'text-gray-500'}>
                      {item.emoji} {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-[10px] text-gray-600 font-neon tracking-widest">
          Have an idea?{' '}
          <Link href="/" className="underline hover:text-gray-400">
            Submit feedback on the map
          </Link>
        </p>
      </div>
    </div>
  )
}
