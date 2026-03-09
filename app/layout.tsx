import type { Metadata } from "next";
import { Heebo, Assistant, Inter } from "next/font/google";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/seo";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "700", "900"],
  variable: "--font-heebo",
  display: "swap",
  preload: true,
});

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-assistant",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "קזינו בישראל | ביקורות ובונוסים",
  description: "מדריך קזינו בישראל 2026 — ביקורות מקיפות, בונוסים בלעדיים ודירוגי ביטחון לשחקנים ישראלים. בדקנו עשרות אתרים ובחרנו רק את הבטוחים והמשתלמים ביותר.",
  openGraph: {
    title: "קזינו בישראל | ביקורות ובונוסים",
    description: "מדריך קזינו בישראל 2026 — ביקורות מקיפות, בונוסים בלעדיים ודירוגי ביטחון לשחקנים ישראלים. בדקנו עשרות אתרים ובחרנו רק את הבטוחים והמשתלמים ביותר.",
    url: SITE_URL,
    siteName: "Ask Gamblers",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Ask Gamblers - מדריך קזינו בטוח בישראל 2026",
      },
    ],
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "קזינו בישראל | ביקורות ובונוסים",
    description: "מדריך קזינו בישראל 2026 — ביקורות מקיפות, בונוסים בלעדיים ודירוגי ביטחון לשחקנים ישראלים.",
    images: [`${SITE_URL}/og-image.png`],
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
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
        <link rel="preload" as="image" href="/images/hero-bg.webp" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#9333EA" />
      </head>
      <body
        className={`${heebo.variable} ${assistant.variable} ${inter.variable} font-assistant bg-[#0B0E14] text-[#F5F5F5] antialiased`}
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
