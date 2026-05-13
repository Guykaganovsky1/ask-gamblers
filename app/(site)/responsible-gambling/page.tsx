import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "משחק אחראי | Ask Gamblers",
  description: "כללי משחק אחראי באתר Ask Gamblers: סימני אזהרה, הגדרת תקציב, מגבלות זמן, מתי לעצור הימורים אונליין ואיך לפנות לעזרה מקצועית.",
  alternates: { canonical: `${SITE_URL}/responsible-gambling` },
};

export default function ResponsibleGamblingPage() {
  return (
    <>
      <PageHero
        title="משחק אחראי"
        subtitle="קזינו צריך להיות בידור בלבד, לא דרך לפתור בעיות כסף"
        badge="18+"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "משחק אחראי" }]} />
      <article className="mx-auto max-w-4xl px-4 py-16 text-text-muted leading-relaxed">
        <h2 className="font-heading text-3xl font-black text-text-primary">כללים בסיסיים</h2>
        <ul className="mt-5 space-y-3">
          <li>שחקו רק אם אתם בני 18 ומעלה ובהתאם לחוק שחל עליכם.</li>
          <li>קבעו תקציב לפני המשחק ואל תחרגו ממנו.</li>
          <li>אל תרדפו אחרי הפסדים ואל תשתמשו בכסף שנועד לשכר דירה, חשבונות או חובות.</li>
          <li>הגדירו מגבלת זמן והפסקות קבועות.</li>
          <li>הימנעו ממשחק תחת לחץ, כעס, אלכוהול או עייפות.</li>
        </ul>

        <h2 className="mt-10 font-heading text-2xl font-bold text-text-primary">סימני אזהרה</h2>
        <p className="mt-4">
          אם אתם מסתירים משחק, מלווים כסף כדי להמר, מרגישים שאי אפשר לעצור, או
          ממשיכים לשחק כדי להחזיר הפסדים, זה סימן לעצור ולפנות לעזרה מקצועית.
        </p>

        <h2 className="mt-10 font-heading text-2xl font-bold text-text-primary">כלי בקרה</h2>
        <p className="mt-4">
          לפני הפקדה בדקו אם הקזינו מציע מגבלת הפקדה, מגבלת הפסד, מגבלת זמן,
          השעיה זמנית או חסימה עצמית. כלים כאלה חשובים יותר מבונוס גבוה.
        </p>
      </article>
    </>
  );
}
