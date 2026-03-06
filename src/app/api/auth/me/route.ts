import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) {
    return Response.json({ authenticated: false }, { status: 401 });
  }
  try {
    const decoded = JSON.parse(Buffer.from(session, "base64").toString());
    return Response.json({ authenticated: true, ...decoded });
  } catch {
    return Response.json({ authenticated: false }, { status: 401 });
  }
}
