'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/AuthProvider'

interface JournalPromptProps {
  zoneSlug: string
  zoneId: number
  zoneColor: string
  journalPrompt: string
}

export default function JournalPrompt({ zoneSlug, zoneId, zoneColor, journalPrompt }: JournalPromptProps) {
  const { user } = useAuth()
  const [content, setContent] = useState('')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [existingEntry, setExistingEntry] = useState(false)

  useEffect(() => {
    if (!user?.authenticated) return

    fetch('/api/journal')
      .then((res) => res.json())
      .then((data) => {
        const entry = data.entries?.find(
          (e: { zoneId: number }) => e.zoneId === zoneId,
        )
        if (entry) {
          setContent(entry.content)
          setExistingEntry(true)
        }
      })
      .catch(() => {})
  }, [user, zoneId])

  if (!user?.authenticated) return null

  async function handleSave() {
    if (!content.trim() || loading) return
    setLoading(true)

    try {
      await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zoneId, content: content.trim() }),
      })
      setSaved(true)
      setExistingEntry(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      /* non-critical */
    }

    setLoading(false)
  }

  return (
    <div
      className="mt-8 rounded-xl border p-5"
      style={{
        borderColor: `${zoneColor}20`,
        backgroundColor: `${zoneColor}05`,
      }}
    >
      <h4
        className="font-neon text-xs tracking-widest mb-3"
        style={{ color: zoneColor }}
      >
        📝 Reflect &amp; Journal
      </h4>
      <p className="text-xs text-gray-400 mb-3 italic">&ldquo;{journalPrompt}&rdquo;</p>
      <textarea
        value={content}
        onChange={(e) => {
          if (e.target.value.length <= 500) {
            setContent(e.target.value)
            setSaved(false)
          }
        }}
        placeholder="Write your reflection..."
        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm text-gray-300 placeholder-gray-600 resize-none focus:outline-none focus:border-white/20 transition-colors"
        rows={3}
      />
      <div className="flex items-center justify-between mt-2">
        <span className="text-[10px] text-gray-600">
          {content.length}/500
        </span>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-[10px] font-neon tracking-widest" style={{ color: zoneColor }}>
              ✓ Saved
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={!content.trim() || loading}
            className="text-[10px] font-neon tracking-widest border px-4 py-1.5 rounded-lg transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ borderColor: `${zoneColor}40`, color: zoneColor }}
          >
            {loading ? 'Saving...' : existingEntry ? 'Update Reflection' : 'Save Reflection'}
          </button>
        </div>
      </div>
    </div>
  )
}
