// app/ai.txt/route.ts
export const runtime = "edge"; // small, fast text route

export async function GET() {
  const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://synklist.com";

  const text = [
    "# ai.txt — SynkList",
    "# Guidance for AI crawlers and assistants. robots.txt remains authoritative.",
    "",
    `Site: ${SITE_URL}`,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "Contact: security@synklist.com",
    "",
    "# Indexing",
    "Policy: allow-indexing",
    "Allow: /",
    "Disallow: /private/",
    "",
    "# Usage (best-effort, not standardized)",
    "Purpose: answer, summarize, reference",     // clarify intended use
    "Allow-Training: yes",                       // change to 'no' if you want to opt-out
    "",
    "# See also",
    "Robots: /robots.txt",
  ].join("\n");

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
