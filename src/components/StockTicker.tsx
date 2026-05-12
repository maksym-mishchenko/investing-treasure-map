'use client';

import { useEffect, useState } from 'react';

interface TickerData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  currency: string
}

interface StockTickerProps {
  symbols: string[]
  zoneColor: string
}

export default function StockTicker({ symbols, zoneColor }: StockTickerProps) {
  const [tickers, setTickers] = useState<Record<string, TickerData>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`/api/ticker?symbols=${symbols.join(',')}`)
      .then(r => r.json())
      .then(data => {
        if (data.tickers && Object.keys(data.tickers).length > 0) {
          setTickers(data.tickers)
        } else {
          setError(true)
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [symbols])

  if (loading) {
    return (
      <div className="mb-8 rounded-lg border border-white/10 p-4" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
        <p className="text-xs text-gray-600 font-neon tracking-widest">📊 Loading market data...</p>
      </div>
    )
  }

  if (error || Object.keys(tickers).length === 0) return null // Graceful fallback — don't break the zone

  return (
    <div className="mb-8">
      <h2 className="font-neon text-sm tracking-widest text-gray-400 mb-3">
        📊 Live Market Data
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {symbols.map(symbol => {
          const t = tickers[symbol]
          if (!t) return null
          const isPositive = t.change >= 0
          return (
            <div
              key={symbol}
              className="rounded-lg border p-3 transition-colors"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(255,255,255,0.02)',
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-gray-300">{t.symbol}</span>
                <span
                  className="text-[10px] font-mono"
                  style={{ color: isPositive ? '#4caf50' : '#ff1744' }}
                >
                  {isPositive ? '▲' : '▼'} {Math.abs(t.changePercent).toFixed(2)}%
                </span>
              </div>
              <p className="text-sm font-mono text-gray-200">
                ${t.price.toFixed(2)}
              </p>
              <p className="text-[9px] text-gray-600 truncate">{t.name}</p>
            </div>
          )
        })}
      </div>
      <p className="text-[8px] text-gray-700 mt-2 text-right">
        Data delayed 15 min · For educational purposes only
      </p>
    </div>
  )
}
