import type { Metadata } from "next";
import { BonusCards } from "@/components/sections/bonus-cards";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "בונוסים | Ask Gamblers",
  description: "מצאו את הבונוסים הכי שווים לקזינו אונליין — בונוסי הפקדה, ספינים חינם וקאשבק בלעדי — השוו הצעות, בחרו את הבונוס המושלם והתחילו לזכות עכשיו",
};

export default function BonusesPage() {
  return (
    <>
      <PageHero
        title="בונוסים שווים יותר ממה שחשבתם"
        subtitle="קאשבק, ספינים חינם ובונוסי הפקדה — מצא את ההצעה שמכפילה את הכסף שלך"
        badge="הצעות בלעדיות"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "בונוסים" }]} />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <BonusCards />
      </div>
    </>
  );
}
