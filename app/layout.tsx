import type { Metadata } from "next";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/seo";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  title: "קזינו אונליין בישראל 2026 | ביקורות בונוסים ותשלומים",
  description: "Ask Gamblers מציג השוואת קזינו אונליין בישראל 2026 עם ביקורות, בונוסים, משחקים, תשלומים, רישוי ושיקולי משחק אחראי לפני הרשמה.",
  keywords: [
    "קזינו אונליין",
    "קזינו בישראל",
    "בונוס קזינו",
    "השוואת קזינו",
    "דירוג קזינו",
    "הימורים אונליין",
    "קזינו מקוון",
    "בונוסי קזינו",
    "משחקי קזינו",
    "casino israel",
    "online casino israel"
  ],
  openGraph: {
    title: "קזינו אונליין בישראל 2026 | ביקורות בונוסים ותשלומים",
    description: "Ask Gamblers מציג השוואת קזינו אונליין בישראל 2026 עם ביקורות, בונוסים, משחקים, תשלומים, רישוי ושיקולי משחק אחראי לפני הרשמה.",
    url: SITE_URL,
    siteName: "Ask Gamblers",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Ask Gamblers - השוואת קזינו אונליין בישראל 2026",
      },
    ],
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "קזינו אונליין בישראל 2026 | ביקורות בונוסים ותשלומים",
    description: "השוואת קזינו אונליין בישראל 2026 עם ביקורות, בונוסים, משחקים, תשלומים ורישוי.",
    images: [`${SITE_URL}/opengraph-image`],
  },
  ...(GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "he-IL": SITE_URL,
      he: SITE_URL,
      "x-default": SITE_URL,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preload" as="image" href="/images/hero-bg-mobile.webp" fetchPriority="high" type="image/webp" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/images/hero-bg-tablet.webp" fetchPriority="high" type="image/webp" media="(min-width: 768px) and (max-width: 1279px)" />
        <link rel="preload" as="image" href="/images/hero-bg-desktop.webp" fetchPriority="high" type="image/webp" media="(min-width: 1280px)" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest.json" />
        <meta name="theme-color" content="#9333EA" />
      </head>
      <body
        className="font-body bg-[#0B0E14] text-[#F5F5F5] antialiased"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd()) }}
        />
        {children}
      </body>
    </html>
  );
}
