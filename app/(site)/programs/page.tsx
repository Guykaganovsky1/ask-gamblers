import type { Metadata } from "next";
import { GameFinder } from "@/components/sections/game-finder";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "תוכניות משחק קזינו 2026 | סלוטס, פוקר, רולטה",
  description: "מצאו את תוכנית המשחק המושלמת עבורכם — סלוטס, פוקר, רולטה, בלאקג'ק ועוד. התאימו את הקזינו לסגנון המשחק שלכם ותתחילו לנצח.",
  alternates: {
    canonical: `${SITE_URL}/programs`,
  },
  openGraph: {
    title: "תוכניות משחק קזינו 2026 | סלוטס, פוקר, רולטה",
    description: "מצאו את תוכנית המשחק המושלמת עבורכם — סלוטס, פוקר, רולטה ובלאקג'ק.",
    url: `${SITE_URL}/programs`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    type: "website",
  },
  robots: "index, follow",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        title="איזה שחקן אתה? מצא את המשחק שלך"
        subtitle="סלוטס, פוקר, רולטה או בלאקג'ק — תתאים את הקזינו לסגנון המשחק שלך ותתחיל לנצח"
        badge="תוכניות משחק"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "תוכניות" }]} />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <GameFinder />
      </div>
    </>
  );
}
