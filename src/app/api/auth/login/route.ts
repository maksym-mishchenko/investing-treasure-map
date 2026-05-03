import { NextRequest, NextResponse } from "next/server";

const USERS: Record<string, { password: string; role: "admin" | "user"; displayName: string }> = {
  admin: { password: process.env.ADMIN_PASSWORD ?? "", role: "admin", displayName: "Admin" },
  diana: { password: process.env.DIANA_PASSWORD ?? "", role: "user", displayName: "Diana" },
};

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const user = USERS[username?.toLowerCase()];

  if (!user || user.password !== password) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const session = JSON.stringify({ username: username.toLowerCase(), role: user.role, displayName: user.displayName });
  const encoded = Buffer.from(session).toString("base64");

  const response = NextResponse.json({ success: true, role: user.role, displayName: user.displayName });
  response.cookies.set("session", encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return response;
}
