import type { Metadata } from "next";
import { GameFinder } from "@/components/sections/game-finder";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "תוכניות | Ask Gamblers",
  description: "מצאו את המשחק המושלם שלכם",
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
