import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://synklist.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"], // adjust as needed
      },
      { userAgent: "GPTBot", allow: "/" }, // OpenAI
      { userAgent: "GPTBot-Image", allow: "/" }, // OpenAI images
      { userAgent: "OAI-SearchBot", allow: "/" }, // OpenAI search crawler
      { userAgent: "ClaudeBot", allow: "/" }, // Anthropic
      { userAgent: "Claude-Web", allow: "/" }, // Anthropic web
      { userAgent: "PerplexityBot", allow: "/" }, // Perplexity
      { userAgent: "Google-Extended", allow: "/" }, // Google (Gemini/Bard data access)
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" }, // Common Crawl (used by many labs)

      // Keep normal web crawlers happy too (optional explicit groups)
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "bingbot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
