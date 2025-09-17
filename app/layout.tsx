import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://synklist.com";

export const metadata: Metadata = {
  verification: {
    google: "K2jWKm-j5XRdLkvthe7qEjmo-Qv49E81CsUXxDEOvPA" // from GSC meta tag option
  },
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SynkList",
    template: "%s | SynkList",
  },
  description: "AI-powered command center in WhatsApp. Private by design.",
  applicationName: "SynkList",
  keywords: [
    "SynkList",
    "WhatsApp AI",
    "productivity assistant",
    "Gmail",
    "Calendar",
    "Notion",
    "Slack",
  ],
  authors: [{ name: "SynkList Team", url: SITE_URL }],
  creator: "SynkList",
  publisher: "SynkList",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "SynkList",
    title: "SynkList — AI Command Center in WhatsApp",
    description:
      "Summarize mail, schedule, search docs, and act across your stack from WhatsApp.",
    // Use the dynamic OG route below
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SynkList — AI Command Center in WhatsApp",
    description:
      "Act across Gmail, Calendar, Drive, Notion, Slack — privately — from WhatsApp.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "productivity",
  // Manifest route below; keep only one manifest source (this OR a public file)
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#18181b",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // inside your orgLd object in app/layout.tsx
const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SynkList",
  alternateName: "Synclist",
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  sameAs: [
    "https://github.com/AnirudhGirish/SynkList",     // replace with real URLs you control
    "https://x.com/SynkList",
    "https://www.linkedin.com/company/synklist",
    "https://www.instagram.com/synklist"
  ],
};
  return (
    <html lang="en">
      {/* Put JSON-LD inside <head>. Avoid <Script> directly under <html>. */}
      <head >
        <meta name="google-site-verification" content="K2jWKm-j5XRdLkvthe7qEjmo-Qv49E81CsUXxDEOvPA" />
        <script
          id="ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </head>
      <body className="bg-white text-neutral-900 antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
