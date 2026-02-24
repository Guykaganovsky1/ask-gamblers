import type { Metadata } from "next";
import { TopDevelopers } from "@/components/sections/top-developers";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "משחקי קזינו אונליין 2026 — סלוטים, רולטה, בלאקג'ק | Ask Gamblers",
  description: "גלו משחקי קזינו באינטרנט מהמפתחים המובילים — סלוטים, רולטה, בלאקג׳ק ועוד עם גרפיקה מרהיבה וזכיות גדולות — מצאו את המשחק שלכם והתחילו לשחק עכשיו",
};

export default function GamesPage() {
  return (
    <>
      <PageHero
        title="משחקים מהמפתחים המובילים בעולם"
        subtitle="גרפיקה מדהימה, אחוז החזר גבוה וחוויית משחק בלתי נשכחת"
        badge="משחקי פרמיום"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "משחקים" }]} />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <TopDevelopers />
      </div>
    </>
  );
}
