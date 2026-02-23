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

export const metadata: Metadata = {
  title: "קזינו רז - המדריך המלא לקזינו אונליין",
  description: "ביקורות קזינו, בונוסים והמלצות - המדריך המלא שלך לעולם הקזינו האונליין",
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
