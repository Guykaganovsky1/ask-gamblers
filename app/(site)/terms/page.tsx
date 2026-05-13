import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "תנאי שימוש באתר Ask Gamblers ישראל",
  description: "תנאי שימוש באתר Ask Gamblers: מידע בלבד, הגבלת אחריות, גיל 18+, קישורים חיצוניים, שינויי בונוסים וחובת בדיקת תנאים לפני הרשמה.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="תנאי שימוש"
        subtitle="האתר מספק מידע בלבד ואינו מפעיל שירותי הימורים"
        badge="Terms"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "תנאי שימוש" }]} />
      <article className="mx-auto max-w-4xl px-4 py-16 text-text-muted leading-relaxed">
        <h2 className="font-heading text-3xl font-black text-text-primary">מידע בלבד</h2>
        <p className="mt-5">
          התוכן באתר נועד למידע והשוואה בלבד. Ask Gamblers אינו מפעיל קזינו,
          אינו מקבל הימורים ואינו מחזיק כספי משתמשים.
        </p>
        <h2 className="mt-10 font-heading text-2xl font-bold text-text-primary">גיל ואחריות</h2>
        <p className="mt-4">
          השימוש בתוכן מיועד לבני 18 ומעלה בלבד. על כל משתמש לבדוק את החוק,
          התנאים וההגבלות החלים עליו לפני שימוש באתר חיצוני.
        </p>
        <h2 className="mt-10 font-heading text-2xl font-bold text-text-primary">דיוק מידע</h2>
        <p className="mt-4">
          אנחנו משתדלים לעדכן מידע, אך בונוסים, תנאים, זמינות משחקים ושיטות
          תשלום יכולים להשתנות. התנאים המחייבים הם אלה שמופיעים באתר החיצוני
          בזמן ההרשמה או ההפקדה.
        </p>
      </article>
    </>
  );
}
