import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "השוואת קזינו לא זמינה | Ask Gamblers",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ComparisonPage() {
  notFound();
}
