import { NextRequest } from "next/server"

// In-memory cache: 15 minute TTL
let cache: { data: Record<string, TickerData>; expires: number } | null = null
const CACHE_TTL = 15 * 60 * 1000

interface TickerData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  currency: string
}

export async function GET(request: NextRequest) {
  const symbolsParam = request.nextUrl.searchParams.get("symbols")
  if (!symbolsParam) {
    return Response.json({ error: "symbols parameter required" }, { status: 400 })
  }

  const requestedSymbols = symbolsParam.split(",").slice(0, 10) // max 10

  // Return from cache if valid
  if (cache && Date.now() < cache.expires) {
    const result: Record<string, TickerData> = {}
    for (const s of requestedSymbols) {
      if (cache.data[s]) result[s] = cache.data[s]
    }
    return Response.json({ tickers: result, cached: true })
  }

  // Fetch from Yahoo Finance v8 API (free, no key needed)
  const allSymbols = ["SPY", "VTI", "VNQ", "AAPL", "MSFT", "KO", "JNJ", "PG", "O", "SCHD"]
  const data: Record<string, TickerData> = {}

  // Yahoo Finance batch quote
  try {
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${allSymbols.join(",")}&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,shortName,currency`
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 900 }, // 15 min ISR cache
    })

    if (response.ok) {
      const json = await response.json()
      for (const quote of json.quoteResponse?.result ?? []) {
        data[quote.symbol] = {
          symbol: quote.symbol,
          name: quote.shortName ?? quote.symbol,
          price: quote.regularMarketPrice ?? 0,
          change: quote.regularMarketChange ?? 0,
          changePercent: quote.regularMarketChangePercent ?? 0,
          currency: quote.currency ?? "USD",
        }
      }
    }
  } catch {
    // If Yahoo fails, return empty gracefully
  }

  // If Yahoo didn't work (they sometimes block), return unavailable message
  if (Object.keys(data).length === 0) {
    return Response.json({ tickers: {}, cached: false, error: "Market data temporarily unavailable" })
  }

  cache = { data, expires: Date.now() + CACHE_TTL }

  const result: Record<string, TickerData> = {}
  for (const s of requestedSymbols) {
    if (data[s]) result[s] = data[s]
  }

  return Response.json({ tickers: result, cached: false })
}
