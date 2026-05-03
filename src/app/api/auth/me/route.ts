import { NextRequest } from "next/server";
import { verifySession } from "@/lib/session";

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get("session")?.value;
  if (!cookie) {
    return Response.json({ authenticated: false }, { status: 401 });
  }

  const payload = verifySession(cookie);
  if (!payload) {
    return Response.json({ authenticated: false }, { status: 401 });
  }

  return Response.json({ authenticated: true, ...payload });
}
