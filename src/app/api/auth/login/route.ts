import { NextRequest, NextResponse } from "next/server";
import { signSession } from "@/lib/session";

const USERS: Record<string, { password: string; role: "admin" | "user"; displayName: string }> = {
  admin: { password: process.env.ADMIN_PASSWORD ?? "", role: "admin", displayName: "Admin" },
  guest: { password: process.env.GUEST_PASSWORD ?? "", role: "user", displayName: "Explorer" },
};

// Simple in-memory rate limiter (per-instance, resets on cold start)
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60_000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { username, password } = body as { username?: unknown; password?: unknown };

  if (typeof username !== "string" || typeof password !== "string" ||
      username.length > 100 || password.length > 200 || username.length === 0) {
    return Response.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const user = USERS[username.toLowerCase()];
  if (!user || user.password !== password) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const payload = { username: username.toLowerCase(), role: user.role, displayName: user.displayName };
  const signed = signSession(payload);

  const response = NextResponse.json({ success: true, role: user.role, displayName: user.displayName });
  response.cookies.set("session", signed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days (reduced from 30)
    path: "/",
  });
  return response;
}
