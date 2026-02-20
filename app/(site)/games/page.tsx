import type { Metadata } from "next";
import { TopDevelopers } from "@/components/sections/top-developers";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "משחקים | קזינו רז",
  description: "משחקים מהמפתחים המובילים בעולם - NetEnt, Microgaming, Playtech ועוד",
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
