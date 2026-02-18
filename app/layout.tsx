import type { Metadata } from "next";
import { Heebo, Assistant, Inter } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
      <body
        className={`${heebo.variable} ${assistant.variable} ${inter.variable} font-assistant bg-[#0B0E14] text-[#F5F5F5] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
