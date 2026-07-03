import type { Metadata } from "next";
import { GameFinder } from "@/components/sections/game-finder";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "סוגי משחקי קזינו 2026 | סלוטס, פוקר, רולטה",
  description: "הכירו סוגי משחקי קזינו כמו סלוטס, פוקר, רולטה ובלאקג'ק, ובדקו חוקים, קצב משחק, רמת סיכון והתאמה לתקציב לפני בחירה.",
  alternates: {
    canonical: `${SITE_URL}/programs`,
  },
  openGraph: {
    title: "סוגי משחקי קזינו 2026 | סלוטס, פוקר, רולטה",
    description: "הכירו סוגי משחקי קזינו ובדקו חוקים, קצב משחק, רמת סיכון והתאמה לתקציב.",
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
        title="איזה משחק מתאים לכם?"
        subtitle="סלוטס, פוקר, רולטה או בלאקג'ק — השוו קצב משחק, חוקים ורמת סיכון לפני בחירה"
        badge="תוכניות משחק"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "תוכניות" }]} />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <GameFinder />

        <section className="mt-20 rounded-2xl border border-border-glass bg-card/40 p-6 md:p-8">
          <h2 className="font-heading text-2xl font-black text-text-primary md:text-3xl">
            איך להתאים משחק לתקציב ולניסיון שלכם?
          </h2>
          <p className="mt-4 max-w-4xl leading-relaxed text-text-secondary">
            תוכנית משחק טובה מתחילה בהחלטה מראש: כמה זמן משחקים, מה התקציב, ואילו
            משחקים מתאימים לרמת הידע שלכם. אין שיטה שמבטיחה תוצאה, ולכן המטרה היא
            לבחור משחק שמבינים ולשמור על גבולות ברורים.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border-glass bg-background/40 p-5">
              <h3 className="font-heading text-lg font-bold text-text-primary">מתחילים</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                התחילו ממשחקים פשוטים, סכומים קטנים וללא לחץ לממש בונוס מסובך.
              </p>
            </div>
            <div className="rounded-xl border border-border-glass bg-background/40 p-5">
              <h3 className="font-heading text-lg font-bold text-text-primary">שחקנים מנוסים</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                השוו חוקי שולחן, מגבלות, תנודתיות ותנאי בונוס לפני בחירת קזינו.
              </p>
            </div>
            <div className="rounded-xl border border-border-glass bg-background/40 p-5">
              <h3 className="font-heading text-lg font-bold text-text-primary">משחק אחראי</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                אם המשחק מפסיק להיות בידור, עצרו והשתמשו בכלי הגבלה או פנו לעזרה.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
