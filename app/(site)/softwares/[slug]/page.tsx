import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "ספק תוכנה לא זמין | Ask Gamblers",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SoftwareProviderPage() {
  notFound();
}
