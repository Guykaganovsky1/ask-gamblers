import type { Metadata } from "next";
import { Heebo, Assistant, Inter } from "next/font/google";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/seo";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  preload: true,
});

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
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
  title: "Ask Gamblers - בתי קזינו מומלצים בישראל 2026 | ביקורות ובונוסים",
  description: "ביקורות קזינו, בונוסים והמלצות - המדריך המלא שלך לעולם הקזינו באינטרנט",
  openGraph: {
    title: "Ask Gamblers - בתי קזינו מומלצים בישראל 2026 | ביקורות ובונוסים",
    description: "ביקורות קזינו, בונוסים והמלצות - המדריך המלא שלך לעולם הקזינו באינטרנט",
    url: SITE_URL,
    siteName: "Ask Gamblers",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Ask Gamblers - בתי קזינו מומלצים בישראל 2026 | ביקורות ובונוסים",
      },
    ],
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ask Gamblers - בתי קזינו מומלצים בישראל 2026 | ביקורות ובונוסים",
    description: "ביקורות קזינו, בונוסים והמלצות - המדריך המלא שלך לעולם הקזינו באינטרנט",
    images: [`${SITE_URL}/og-image.png`],
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
