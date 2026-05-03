import { NextRequest } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? "";
const STATS_API_URL = "https://api.mmishchenko.dev/api/feedback-stats";
const STATS_API_KEY = process.env.FEEDBACK_STATS_API_KEY ?? "";

// Rate limit: 1 feedback per IP per 10 minutes
const recentFeedback = new Map<string, number>();
const COOLDOWN_MS = 10 * 60 * 1000;

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const lastSent = recentFeedback.get(ip);
  if (lastSent && now - lastSent < COOLDOWN_MS) {
    return Response.json({ error: "Thanks! You already sent feedback recently." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const { type, message } = body as { type?: string; message?: string };

  if (typeof type !== "string" || !["liked", "want-more", "completed"].includes(type)) {
    return Response.json({ error: "Invalid feedback type" }, { status: 400 });
  }

  if (message && (typeof message !== "string" || message.length > 500)) {
    return Response.json({ error: "Message too long" }, { status: 400 });
  }

  recentFeedback.set(ip, now);

  // Log for Vercel logs
  console.log(`[FEEDBACK] type=${type} message=${message ?? ""} ip=${ip} time=${new Date().toISOString()}`);

  // Send Telegram notification if configured
  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    const emoji = type === "liked" ? "❤️" : type === "completed" ? "🏆" : "📬";
    const text = [
      `${emoji} *Investing Map Feedback*`,
      `Type: ${type}`,
      message ? `Message: ${message}` : "",
      `_${new Date().toISOString()}_`,
    ].filter(Boolean).join("\n");

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "Markdown" }),
      });
    } catch {
      // Non-critical — still return success
    }
  }

  // Store stats on dashboard
  if (STATS_API_KEY) {
    try {
      await fetch(STATS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": STATS_API_KEY },
        body: JSON.stringify({ type, ip }),
      });
    } catch {
      // Non-critical
    }
  }

  return Response.json({ success: true });
}
