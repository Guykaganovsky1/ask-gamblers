import type { Metadata } from "next";
import { BonusCards } from "@/components/sections/bonus-cards";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "בונוסי קזינו אונליין 2026 | השוואת תנאים והטבות",
  description: "השוו בונוסי הפקדה, ספינים חינם וקאשבק לפי דרישות הימור, תוקף, תקרות משיכה והתאמה לתקציב לפני הרשמה.",
  alternates: {
    canonical: `${SITE_URL}/bonuses`,
  },
  openGraph: {
    title: "בונוסי קזינו אונליין 2026 | השוואת תנאים והטבות",
    description: "השוו בונוסי הפקדה, ספינים חינם וקאשבק לפי דרישות הימור, תוקף ותקרות משיכה.",
    url: `${SITE_URL}/bonuses`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    type: "website",
  },
  robots: "index, follow",
};

export default function BonusesPage() {
  return (
    <>
      <PageHero
        title="השוואת בונוסי קזינו לפי תנאים"
        subtitle="קאשבק, ספינים חינם ובונוסי הפקדה — בדקו דרישות הימור, תוקף ותקרות משיכה לפני בחירה"
        badge="השוואת בונוסים"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "בונוסים" }]} />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <BonusCards />

        <section className="mt-20 rounded-2xl border border-border-glass bg-card/40 p-6 md:p-8">
          <h2 className="font-heading text-2xl font-black text-text-primary md:text-3xl">
            מה הופך בונוס קזינו להצעה טובה?
          </h2>
          <p className="mt-4 max-w-4xl leading-relaxed text-text-secondary">
            בונוס טוב הוא בונוס שאפשר להבין לפני שמפקידים. סכום גבוה או הרבה ספינים
            חינם לא מספיקים אם דרישות ההימור גבוהות מדי, אם יש משחקים מוחרגים או אם
            תקרת המשיכה מגבילה את הזכייה.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border-glass bg-background/40 p-5">
              <h3 className="font-heading text-lg font-bold text-text-primary">דרישות הימור</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                בדקו כמה פעמים צריך להמר לפני שאפשר למשוך כסף מהבונוס.
              </p>
            </div>
            <div className="rounded-xl border border-border-glass bg-background/40 p-5">
              <h3 className="font-heading text-lg font-bold text-text-primary">תוקף ומגבלות</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                חפשו תאריך תפוגה, משחקים שלא נספרים ותקרת זכייה או משיכה.
              </p>
            </div>
            <div className="rounded-xl border border-border-glass bg-background/40 p-5">
              <h3 className="font-heading text-lg font-bold text-text-primary">התאמה לשחקן</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                בחרו בונוס שמתאים לתקציב, למשחקים שאתם אוהבים ולרמת הניסיון שלכם.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
