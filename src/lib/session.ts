import { createHmac, randomBytes } from "crypto";

const SECRET = process.env.SESSION_SECRET ?? randomBytes(32).toString("hex");

export interface SessionPayload {
  username: string;
  role: "admin" | "user";
  displayName: string;
}

/** Create an HMAC-signed session cookie value */
export function signSession(payload: SessionPayload): string {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", SECRET).update(data).digest("base64url");
  return `${data}.${sig}`;
}

/** Verify and decode a signed session cookie. Returns null if invalid. */
export function verifySession(cookie: string): SessionPayload | null {
  const parts = cookie.split(".");
  if (parts.length !== 2) return null;

  const [data, sig] = parts;
  const expected = createHmac("sha256", SECRET).update(data).digest("base64url");

  // Constant-time comparison to prevent timing attacks
  if (sig.length !== expected.length) return null;
  let mismatch = 0;
  for (let i = 0; i < sig.length; i++) {
    mismatch |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  if (mismatch !== 0) return null;

  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString());
    if (typeof payload.username !== "string" || typeof payload.role !== "string") return null;
    return payload as SessionPayload;
  } catch {
    return null;
  }
}
