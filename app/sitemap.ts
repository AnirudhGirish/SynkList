import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://synklist.com";

// Static routes from your build output
const staticRoutes = [
  "/", "/about", "/blog", "/careers", "/compliance", "/contact", "/cookies",
  "/docs", "/features", "/integration", "/pricing", "/privacy",
  "/security", "/status", "/terms","/synclist",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // If you later have dynamic routes, fetch their slugs here and push to links[]
  const now = new Date();

  const links: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));

  return links;
}
