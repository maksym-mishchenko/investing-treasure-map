'use client'

import { useState, useMemo } from 'react'

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`
  return `$${n.toFixed(0)}`
}

const PRESETS = [
  { label: 'Conservative', stocks: 40, bonds: 50, reits: 10 },
  { label: 'Balanced', stocks: 60, bonds: 30, reits: 10 },
  { label: 'Aggressive', stocks: 80, bonds: 10, reits: 10 },
]

// Historical averages (simplified)
const RETURNS = {
  stocks: { avg: 0.10, range: 0.20 },
  bonds: { avg: 0.04, range: 0.05 },
  reits: { avg: 0.08, range: 0.15 },
}

export default function PortfolioAllocator() {
  const [total, setTotal] = useState(10000)
  const [stocks, setStocks] = useState(60)
  const [bonds, setBonds] = useState(30)
  const [reits, setReits] = useState(10)

  function setAllocation(s: number, b: number, r: number) {
    setStocks(s)
    setBonds(b)
    setReits(r)
  }

  function handleStocksChange(v: number) {
    const remaining = 100 - v
    const bondRatio = bonds / Math.max(bonds + reits, 1)
    setStocks(v)
    setBonds(Math.round(remaining * bondRatio))
    setReits(remaining - Math.round(remaining * bondRatio))
  }

  function handleBondsChange(v: number) {
    const remaining = 100 - v
    const stockRatio = stocks / Math.max(stocks + reits, 1)
    setBonds(v)
    setStocks(Math.round(remaining * stockRatio))
    setReits(remaining - Math.round(remaining * stockRatio))
  }

  function handleReitsChange(v: number) {
    const remaining = 100 - v
    const stockRatio = stocks / Math.max(stocks + bonds, 1)
    setReits(v)
    setStocks(Math.round(remaining * stockRatio))
    setBonds(remaining - Math.round(remaining * stockRatio))
  }

  const scenarios = useMemo(() => {
    const sW = stocks / 100
    const bW = bonds / 100
    const rW = reits / 100

    const avgReturn =
      sW * RETURNS.stocks.avg + bW * RETURNS.bonds.avg + rW * RETURNS.reits.avg
    const lowReturn =
      sW * (RETURNS.stocks.avg - RETURNS.stocks.range) +
      bW * (RETURNS.bonds.avg - RETURNS.bonds.range) +
      rW * (RETURNS.reits.avg - RETURNS.reits.range)
    const highReturn =
      sW * (RETURNS.stocks.avg + RETURNS.stocks.range) +
      bW * (RETURNS.bonds.avg + RETURNS.bonds.range) +
      rW * (RETURNS.reits.avg + RETURNS.reits.range)

    const years = 10
    return {
      low: total * Math.pow(1 + lowReturn, years),
      expected: total * Math.pow(1 + avgReturn, years),
      high: total * Math.pow(1 + highReturn, years),
    }
  }, [total, stocks, bonds, reits])

  // Build conic-gradient for the pie chart
  const gradient = `conic-gradient(
    #2196f3 0% ${stocks}%,
    #4caf50 ${stocks}% ${stocks + bonds}%,
    #ff9800 ${stocks + bonds}% 100%
  )`

  return (
    <div
      className="rounded-xl border p-5 sm:p-6 my-8"
      style={{
        borderColor: 'rgba(255,214,0,0.2)',
        backgroundColor: 'rgba(255,214,0,0.03)',
      }}
    >
      <h3 className="font-cinzel text-sm tracking-widest mb-5" style={{ color: '#ffd600' }}>
        ⚔️ Portfolio Builder
      </h3>

      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2 mb-5">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => setAllocation(p.stocks, p.bonds, p.reits)}
            className="px-3 py-1.5 rounded-lg text-[10px] font-cinzel tracking-widest transition-all"
            style={{
              backgroundColor:
                stocks === p.stocks && bonds === p.bonds && reits === p.reits
                  ? 'rgba(255,214,0,0.2)'
                  : 'rgba(255,255,255,0.05)',
              color:
                stocks === p.stocks && bonds === p.bonds && reits === p.reits
                  ? '#ffd600'
                  : '#888',
              border: `1px solid ${
                stocks === p.stocks && bonds === p.bonds && reits === p.reits
                  ? 'rgba(255,214,0,0.4)'
                  : 'rgba(255,255,255,0.1)'
              }`,
            }}
          >
            {p.label} ({p.stocks}/{p.bonds}/{p.reits})
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">Total Investment</span>
            <span className="text-xs font-mono" style={{ color: '#ffd600' }}>
              {formatCurrency(total)}
            </span>
          </div>
          <input
            type="range"
            min={1000}
            max={100000}
            step={1000}
            value={total}
            onChange={(e) => setTotal(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ffd600 ${((total - 1000) / 99000) * 100}%, #333 ${((total - 1000) / 99000) * 100}%)`,
            }}
          />
        </div>

        <AllocationSlider
          label="Stocks"
          value={stocks}
          color="#2196f3"
          onChange={handleStocksChange}
        />
        <AllocationSlider
          label="Bonds"
          value={bonds}
          color="#4caf50"
          onChange={handleBondsChange}
        />
        <AllocationSlider
          label="REITs"
          value={reits}
          color="#ff9800"
          onChange={handleReitsChange}
        />
      </div>

      <div className="mt-6 rounded-lg p-4" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Pie chart */}
          <div
            className="w-24 h-24 rounded-full flex-shrink-0"
            style={{ background: gradient }}
          />

          {/* Legend & Amounts */}
          <div className="flex-1 space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2196f3]" />
              <span className="text-gray-400">Stocks: {stocks}%</span>
              <span className="ml-auto text-gray-300">{formatCurrency(total * stocks / 100)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4caf50]" />
              <span className="text-gray-400">Bonds: {bonds}%</span>
              <span className="ml-auto text-gray-300">{formatCurrency(total * bonds / 100)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff9800]" />
              <span className="text-gray-400">REITs: {reits}%</span>
              <span className="ml-auto text-gray-300">{formatCurrency(total * reits / 100)}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5">
          <p className="text-[10px] font-cinzel tracking-widest text-gray-500 mb-2 text-center">
            Estimated 10-Year Range
          </p>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <p className="text-gray-600 text-[10px]">Low</p>
              <p className="text-red-400">{formatCurrency(scenarios.low)}</p>
            </div>
            <div>
              <p className="text-gray-600 text-[10px]">Expected</p>
              <p style={{ color: '#ffd600' }}>{formatCurrency(scenarios.expected)}</p>
            </div>
            <div>
              <p className="text-gray-600 text-[10px]">High</p>
              <p style={{ color: '#4caf50' }}>{formatCurrency(scenarios.high)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AllocationSlider({
  label,
  value,
  color,
  onChange,
}: {
  label: string
  value: number
  color: string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-xs font-mono" style={{ color }}>
          {value}%
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${color} ${value}%, #333 ${value}%)`,
        }}
      />
    </div>
  )
}
