'use client'

import { useState, useMemo } from 'react'

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`
  return `$${n.toFixed(0)}`
}

export default function CompoundInterestCalc() {
  const [principal, setPrincipal] = useState(1000)
  const [monthly, setMonthly] = useState(200)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(20)

  const result = useMemo(() => {
    const r = rate / 100 / 12
    let balance = principal
    const totalMonths = years * 12
    for (let i = 0; i < totalMonths; i++) {
      balance = balance * (1 + r) + monthly
    }
    const totalContributed = principal + monthly * totalMonths
    const interestEarned = balance - totalContributed

    // "If you waited 5 years" scenario
    const delayYears = 5
    const delayMonths = (years - delayYears) * 12
    let delayBalance = principal
    if (delayMonths > 0) {
      for (let i = 0; i < delayMonths; i++) {
        delayBalance = delayBalance * (1 + r) + monthly
      }
    }

    return { balance, totalContributed, interestEarned, delayBalance }
  }, [principal, monthly, rate, years])

  return (
    <div
      className="rounded-xl border p-5 sm:p-6 my-8"
      style={{
        borderColor: 'rgba(255,23,68,0.2)',
        backgroundColor: 'rgba(255,23,68,0.03)',
      }}
    >
      <h3 className="font-neon text-sm tracking-widest mb-5" style={{ color: '#ff1744' }}>
        💰 Compound Interest Calculator
      </h3>

      <div className="space-y-4">
        <SliderInput
          label="Starting Amount"
          value={principal}
          min={100}
          max={50000}
          step={100}
          format={formatCurrency}
          color="#ff1744"
          onChange={setPrincipal}
        />
        <SliderInput
          label="Monthly Contribution"
          value={monthly}
          min={0}
          max={2000}
          step={25}
          format={formatCurrency}
          color="#ff1744"
          onChange={setMonthly}
        />
        <SliderInput
          label="Annual Return"
          value={rate}
          min={1}
          max={15}
          step={0.5}
          format={(v) => `${v}%`}
          color="#ff1744"
          onChange={setRate}
        />
        <SliderInput
          label="Years"
          value={years}
          min={1}
          max={40}
          step={1}
          format={(v) => `${v} yrs`}
          color="#ff1744"
          onChange={setYears}
        />
      </div>

      <div className="mt-6 rounded-lg p-4" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <div className="text-center mb-3">
          <p className="text-[10px] font-neon tracking-widest text-gray-500 mb-1">Final Amount</p>
          <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#ff1744' }}>
            {formatCurrency(result.balance)}
          </p>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-3">
          <span>Contributed: {formatCurrency(result.totalContributed)}</span>
          <span style={{ color: '#4caf50' }}>Interest: {formatCurrency(result.interestEarned)}</span>
        </div>
        {years > 5 && (
          <p className="text-[10px] text-gray-600 mt-3 text-center">
            ⏳ If you waited 5 years: {formatCurrency(result.delayBalance)} — you&apos;d miss out on{' '}
            <span style={{ color: '#ff1744' }}>
              {formatCurrency(result.balance - result.delayBalance)}
            </span>
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
