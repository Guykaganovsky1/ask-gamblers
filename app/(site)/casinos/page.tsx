import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { CASINOS_QUERY } from "@/sanity/lib/queries";
import { Casino } from "@/sanity/lib/types";
import { CasinoFilter } from "@/components/ui/casino-filter";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const revalidate = 60;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "קזינו אונליין בישראל - ביקורות 2026",
  description: "השוו בתי קזינו אונליין לישראלים עם ביקורות, דירוגים ותנאי בונוס לבדיקה — קראו מידע על תשלומים, משיכות ומשחק אחראי לפני הרשמה.",
  alternates: {
    canonical: `${baseUrl}/casinos`,
    languages: {
      "he": `${baseUrl}/casinos`,
      "x-default": `${baseUrl}/casinos`,
    },
  },
  openGraph: {
    title: "קזינו אונליין בישראל - ביקורות 2026",
    description: "השוו בתי קזינו אונליין לישראלים עם ביקורות, דירוגים ותנאי בונוס לבדיקה — קראו מידע על תשלומים, משיכות ומשחק אחראי לפני הרשמה.",
    type: "website",
    url: `${baseUrl}/casinos`,
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "קזינו אונליין בישראל - ביקורות 2026",
    description: "השוו בתי קזינו אונליין לישראלים עם ביקורות, דירוגים ותנאי בונוס לבדיקה.",
    images: [`${baseUrl}/opengraph-image`],
  },
};

function cleanCasinoDescription(description: string) {
  return description
    .replace("תוצאות אמיתיות שאנחנו יכולים להמליץ עליהן", "מידע ותנאים שכדאי לבדוק לפני הרשמה")
    .replace("ביטחון מדורג 5 כוכבים", "דירוג גבוה באתר")
    .replace("בונוס עצום, משחקים מהטובים בעולם, בדוק ומומלץ על ידי אלפים", "בונוס ותנאים שכדאי לבדוק לפני הרשמה")
    .replace("בונוסים עצומים שלא תיפסיקו", "בונוסים ותנאים שכדאי לבדוק")
    .replace("ומלא משחקים שמזכים", "ומבחר משחקים להשוואה")
    .replace("משחקים שמזכים", "מבחר משחקים")
    .replace("בדוק, מובטח,", "נבדק,")
    .replace("מובטח", "נבדק")
    .replace("בדוק, נבדק,", "נבדק,")
    .trim();
}

function cleanBonusText(value: string) {
  return value.replace(/ספינות/g, "ספינים").trim();
}

function cleanCategoryName(name: string) {
  return name
    .replace("מכונות מזל - הניצחון מהדייש כאן", "מכונות מזל")
    .replace("קזינו חי - חוויה הבא לאשך", "קזינו חי")
    .replace("בלאק ג'ק - יזמי הטקטיקה", "בלאק ג'ק")
    .replace("רולטה - מהמרים החכמים בוחרים", "רולטה")
    .replace("הימורי ספורט - רווח מהידע", "הימורי ספורט")
    .trim();
}

function cleanCasinoForDisplay(casino: Casino): Casino {
  casino.description = cleanCasinoDescription(casino.description);
  casino.bonusAmount = casino.bonusAmount ? cleanBonusText(casino.bonusAmount) : casino.bonusAmount;
  casino.categories = casino.categories?.map((category) => ({
    ...category,
    name: cleanCategoryName(category.name),
  }));
  return casino;
}

export default async function CasinosPage() {
  const casinos = (await client.fetch<Casino[]>(CASINOS_QUERY)).map(cleanCasinoForDisplay);

  return (
    <>
      <PageHero
        title="בתי קזינו להשוואה לישראלים"
        subtitle="ביקורות, דירוגים ותנאי בונוס לבדיקה — כל מה שחשוב לבדוק לפני הרשמה"
        badge="השוואת קזינו 2026"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "בתי קזינו" }]} />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <CasinoFilter casinos={casinos} />

        <section className="mt-20 rounded-2xl border border-border-glass bg-card/40 p-6 md:p-8">
          <h2 className="font-heading text-2xl font-black text-text-primary md:text-3xl">
            איך אנחנו בודקים קזינו לישראלים?
          </h2>
          <p className="mt-4 max-w-4xl leading-relaxed text-text-secondary">
            קזינו להשוואה הוא לא רק אתר עם בונוס גבוה. אנחנו בודקים האם המפעיל מציג
            תנאים ברורים, אילו שיטות תשלום זמינות, מה כתוב על משיכות ואימות זהות,
            האם יש תמיכה נגישה וכלים למשחק אחראי, והאם הבונוס באמת מתאים לשחקנים
            ישראלים.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border-glass bg-background/40 p-5">
              <h3 className="font-heading text-lg font-bold text-text-primary">שקיפות ורישוי</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                פרטי מפעיל, תנאי שימוש, מדיניות אימות וכלים להגבלת משחק הם סימני בסיס.
              </p>
            </div>
            <div className="rounded-xl border border-border-glass bg-background/40 p-5">
              <h3 className="font-heading text-lg font-bold text-text-primary">תשלום ומשיכות</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                זמני משיכה, עמלות ואמצעי תשלום חשובים יותר מהבטחות פרסומיות.
              </p>
            </div>
            <div className="rounded-xl border border-border-glass bg-background/40 p-5">
              <h3 className="font-heading text-lg font-bold text-text-primary">תנאי בונוס</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                אנחנו בודקים דרישות הימור, תוקף, משחקים מוחרגים ותקרות משיכה.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
