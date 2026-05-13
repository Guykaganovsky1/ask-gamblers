import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "שיטת הדירוג שלנו | Ask Gamblers",
  description: "איך Ask Gamblers בודק ומדרג קזינו אונליין: בטיחות, שקיפות, בונוסים, תשלומים, משחקים, תמיכה ומשחק אחראי.",
  alternates: { canonical: `${SITE_URL}/review-methodology` },
};

const CRITERIA = [
  ["בטיחות ושקיפות", "בדיקת מידע גלוי על מפעיל הקזינו, רישוי, תנאים והגנת שחקנים."],
  ["בונוס ותנאים", "בדיקת גובה ההצעה, דרישות הימור, משחקים מוחרגים, תוקף ותקרות משיכה."],
  ["תשלומים ומשיכות", "בדיקת שיטות תשלום, זמני טיפול, עמלות ותהליך אימות."],
  ["חוויית משחק", "בדיקת מובייל, ניווט, איכות המשחקים, ספקי תוכנה וזמינות קטגוריות."],
  ["תמיכה ושירות", "בדיקת ערוצי תמיכה, בהירות תשובות ושפה זמינה למשתמשים."],
  ["משחק אחראי", "בדיקת מגבלות הפקדה, השעיה עצמית, מידע על סיכונים וכלי בקרה."],
];

export default function ReviewMethodologyPage() {
  return (
    <>
      <PageHero
        title="שיטת הדירוג שלנו"
        subtitle="הקריטריונים שמשמשים אותנו בבדיקת קזינו אונליין"
        badge="Editorial Methodology"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "שיטת הדירוג" }]} />
      <article className="mx-auto max-w-5xl px-4 py-16 text-text-muted leading-relaxed">
        <h2 className="font-heading text-3xl font-black text-text-primary">העיקרון המרכזי</h2>
        <p className="mt-5 max-w-3xl">
          דירוג קזינו באתר לא אמור להתבסס רק על בונוס גבוה. אנחנו בודקים האם
          ההצעה ברורה, האם תנאי המשחק מובנים, האם יש סימני שקיפות, והאם לשחקן
          יש כלים לשמור על תקציב ושליטה.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {CRITERIA.map(([title, body]) => (
            <section key={title} className="rounded-2xl border border-border-glass bg-card/40 p-6">
              <h3 className="font-heading text-xl font-bold text-text-primary">{title}</h3>
              <p className="mt-3">{body}</p>
            </section>
          ))}
        </div>
        <h2 className="mt-12 font-heading text-2xl font-bold text-text-primary">עדכונים ותיקונים</h2>
        <p className="mt-4">
          אם תנאי קזינו משתנים, אם בונוס מסתיים, או אם נמצא מידע לא מדויק,
          העמודים באתר יכולים להתעדכן. קוראים ומפעילים מוזמנים לשלוח תיקונים
          דרך עמוד יצירת הקשר.
        </p>
      </article>
    </>
  );
}
