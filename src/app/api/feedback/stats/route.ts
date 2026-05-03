const STATS_API_URL = "https://api.mmishchenko.dev/api/feedback-stats";

export async function GET() {
  try {
    const res = await fetch(STATS_API_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Stats unavailable");
    const data = await res.json();
    return Response.json(data);
  } catch {
    return Response.json({ liked: 0, "want-more": 0, completed: 0, total: 0 });
  }
}
