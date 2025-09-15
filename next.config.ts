/** @type {import('next').NextConfig} */
module.exports = {
  productionBrowserSourceMaps: true,  // keep if you want Lighthouse to see source maps
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "synklist.com" },
    ],
  },
  async headers() {
    const CONTENT_SECURITY_POLICY = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob:;
      font-src 'self' data:;
      connect-src 'self' https://graph.facebook.com https://*.whatsapp.com https://api.openai.com;
      frame-ancestors 'none';
      base-uri 'self';
      form-action 'self';
    `.replace(/\s{2,}/g, " ").trim();

    return [{
      source: "/:path*",
      headers: [
        { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },

  // Turbopack-specific options live under `turbopack`
  turbopack: {
    // Example: resolve aliases (replacement for webpack resolve.alias)
    resolveAlias: {
      underscore: "lodash",
    },
    // You can add rules here as Turbopack supports more hooks over time.
  },
};
