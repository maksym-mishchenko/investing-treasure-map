'use client'

import { useState, useMemo } from 'react'

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`
  return `$${n.toFixed(2)}`
}

export default function DividendCalc() {
  const [sharePrice, setSharePrice] = useState(50)
  const [shares, setShares] = useState(100)
  const [dividend, setDividend] = useState(2)
  const [years, setYears] = useState(20)
  const [drip, setDrip] = useState(true)

  const result = useMemo(() => {
    // With DRIP: reinvest dividends to buy more shares
    let dripShares = shares
    let dripTotalDividends = 0
    let currentPrice = sharePrice

    for (let y = 0; y < years; y++) {
      const annualDiv = dripShares * dividend
      dripTotalDividends += annualDiv
      // Assume share price grows ~3% annually (conservative)
      currentPrice *= 1.03
      if (drip) {
        dripShares += annualDiv / currentPrice
      }
    }

    // Without DRIP: just collect cash
    const noDripShares = shares
    const noDripTotalDividends = shares * dividend * years
    const finalPrice = sharePrice * Math.pow(1.03, years)

    return {
      drip: {
        finalShares: dripShares,
        totalDividends: dripTotalDividends,
        portfolioValue: dripShares * finalPrice,
      },
      noDrip: {
        finalShares: noDripShares,
        totalDividends: noDripTotalDividends,
        portfolioValue: noDripShares * finalPrice + noDripTotalDividends,
      },
      finalPrice,
    }
  }, [sharePrice, shares, dividend, years, drip])

  const active = drip ? result.drip : result.noDrip
  const diff = result.drip.portfolioValue - result.noDrip.portfolioValue

  return (
    <div
      className="rounded-xl border p-5 sm:p-6 my-8"
      style={{
        borderColor: 'rgba(255,109,0,0.2)',
        backgroundColor: 'rgba(255,109,0,0.03)',
      }}
    >
      <h3 className="font-cinzel text-sm tracking-widest mb-5" style={{ color: '#ff6d00' }}>
        ❄️ Dividend Snowball Calculator
      </h3>

      <div className="space-y-4">
        <SliderInput
          label="Share Price"
          value={sharePrice}
          min={1}
          max={500}
          step={1}
          format={(v) => `$${v}`}
          color="#ff6d00"
          onChange={setSharePrice}
        />
        <SliderInput
          label="Shares Owned"
          value={shares}
          min={1}
          max={1000}
          step={1}
          format={(v) => `${v}`}
          color="#ff6d00"
          onChange={setShares}
        />
        <SliderInput
          label="Annual Dividend/Share"
          value={dividend}
          min={0.5}
          max={10}
          step={0.25}
          format={(v) => `$${v.toFixed(2)}`}
          color="#ff6d00"
          onChange={setDividend}
        />
        <SliderInput
          label="Years"
          value={years}
          min={1}
          max={30}
          step={1}
          format={(v) => `${v} yrs`}
          color="#ff6d00"
          onChange={setYears}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">DRIP (Reinvest Dividends)</span>
          <button
            onClick={() => setDrip(!drip)}
            className="px-3 py-1 rounded-full text-xs font-cinzel tracking-widest transition-all"
            style={{
              backgroundColor: drip ? 'rgba(255,109,0,0.2)' : 'rgba(255,255,255,0.05)',
              color: drip ? '#ff6d00' : '#666',
              border: `1px solid ${drip ? 'rgba(255,109,0,0.4)' : 'rgba(255,255,255,0.1)'}`,
            }}
          >
            {drip ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-lg p-4" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <div className="text-center mb-3">
          <p className="text-[10px] font-cinzel tracking-widest text-gray-500 mb-1">
            Portfolio Value ({drip ? 'With DRIP' : 'Without DRIP'})
          </p>
          <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#ff6d00' }}>
            {formatCurrency(active.portfolioValue)}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs mt-3">
          <div className="text-center">
            <p className="text-gray-500 text-[10px]">Final Shares</p>
            <p className="text-gray-300">{active.finalShares.toFixed(1)}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-[10px]">Total Dividends</p>
            <p style={{ color: '#4caf50' }}>{formatCurrency(active.totalDividends)}</p>
          </div>
        </div>
        {diff > 0 && (
          <p className="text-[10px] text-gray-600 mt-3 text-center">
            ❄️ DRIP advantage:{' '}
            <span style={{ color: '#ff6d00' }}>+{formatCurrency(diff)}</span> more over {years} years
          </p>
        )}
      </div>
    </div>
  )
}

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  format,
  color,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (v: number) => string
  color: string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-xs font-mono" style={{ color }}>
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${color} ${((value - min) / (max - min)) * 100}%, #333 ${((value - min) / (max - min)) * 100}%)`,
        }}
      />
    </div>
  )
}
