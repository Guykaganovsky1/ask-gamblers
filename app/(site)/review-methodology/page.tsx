import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { generateReviewMethodologyPageSchema } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";
const LAST_UPDATED = "2026-07-07";

export const metadata: Metadata = {
  title: "שיטת הדירוג שלנו | Ask Gamblers",
  description: "איך Ask Gamblers בודק ומדרג קזינו אונליין: בטיחות, שקיפות, בונוסים, תשלומים, משחקים, תמיכה ומשחק אחראי.",
  alternates: { canonical: `${SITE_URL}/review-methodology` },
};

const CRITERIA = [
  ["בטיחות ושקיפות", "בדיקת מידע גלוי על מפעיל הקזינו, רישוי, תנאים והגנת שחקנים.", "25%"],
  ["בונוס ותנאים", "בדיקת גובה ההצעה, דרישות הימור, משחקים מוחרגים, תוקף ותקרות משיכה.", "20%"],
  ["תשלומים ומשיכות", "בדיקת שיטות תשלום, זמני טיפול, עמלות ותהליך אימות.", "20%"],
  ["חוויית משחק", "בדיקת מובייל, ניווט, איכות המשחקים, ספקי תוכנה וזמינות קטגוריות.", "15%"],
  ["תמיכה ושירות", "בדיקת ערוצי תמיכה, בהירות תשובות ושפה זמינה למשתמשים.", "10%"],
  ["משחק אחראי", "בדיקת מגבלות הפקדה, השעיה עצמית, מידע על סיכונים וכלי בקרה.", "10%"],
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
        <p className="text-sm text-text-muted/80">
          עודכן לאחרונה: <time dateTime={LAST_UPDATED}>7 ביולי 2026</time>
        </p>

        <h2 className="font-heading text-3xl font-black text-text-primary">העיקרון המרכזי</h2>
        <p className="mt-5 max-w-3xl">
          דירוג קזינו באתר לא אמור להתבסס רק על בונוס גבוה. אנחנו בודקים האם
          ההצעה ברורה, האם תנאי המשחק מובנים, האם יש סימני שקיפות, והאם לשחקן
          יש כלים לשמור על תקציב ושליטה.
        </p>

        <section className="mt-8 rounded-2xl border border-border-glass bg-card/40 p-6">
          <h2 className="font-heading text-2xl font-bold text-text-primary">איך לקרוא דירוג באתר?</h2>
          <p className="mt-4">
            דירוג באתר Ask Gamblers הוא סיכום מערכתי של כמה בדיקות: שקיפות
            מפעיל, תנאי בונוס, תשלומים, חוויית משחק, תמיכה וכלים למשחק אחראי.
            הדירוג אינו הבטחה לתוצאה, לזכייה או לחוויית משתמש זהה לכל קורא.
          </p>
        </section>

        <h2 className="mt-12 font-heading text-2xl font-bold text-text-primary">קריטריונים ומשקלים</h2>
        <p className="mt-4 max-w-3xl">
          כל דירוג הוא ממוצע משוקלל של שישה קריטריונים. המשקלים נותנים עדיפות
          לבטיחות ולתנאים ברורים על פני גובה הבונוס בלבד.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border-glass bg-card/40">
          <table className="w-full min-w-[560px] border-collapse text-start">
            <thead>
              <tr className="border-b border-border-glass text-text-primary">
                <th className="p-4 text-start font-heading font-bold">קריטריון</th>
                <th className="p-4 text-start font-heading font-bold">מה אנחנו בודקים</th>
                <th className="whitespace-nowrap p-4 text-start font-heading font-bold">משקל</th>
              </tr>
            </thead>
            <tbody>
              {CRITERIA.map(([title, body, weight]) => (
                <tr key={title} className="border-b border-border-glass/40 align-top">
                  <td className="whitespace-nowrap p-4 font-bold text-text-primary">{title}</td>
                  <td className="p-4">{body}</td>
                  <td className="whitespace-nowrap p-4 font-heading text-lg font-black text-accent">{weight}</td>
                </tr>
              ))}
              <tr className="text-text-primary">
                <td className="p-4 font-heading font-black">סה״כ</td>
                <td className="p-4" />
                <td className="whitespace-nowrap p-4 font-heading text-lg font-black text-accent">100%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 font-heading text-2xl font-bold text-text-primary">מה לא מספיק לבדיקה</h2>
        <p className="mt-4">
          בונוס גבוה, עמלת שותפים או שם מותג מוכר אינם מספיקים כדי להציג קזינו
          כבחירה מתאימה. כל עמוד צריך להיבחן לפי התנאים הגלויים, מגבלות המשיכה,
          אפשרויות התשלום, איכות התמיכה והיכולת של שחקן להגדיר גבולות.
        </p>

        <h2 className="mt-12 font-heading text-2xl font-bold text-text-primary">עדכונים ותיקונים</h2>
        <p className="mt-4">
          אם תנאי קזינו משתנים, אם בונוס מסתיים, או אם נמצא מידע לא מדויק,
          העמודים באתר יכולים להתעדכן. קוראים ומפעילים מוזמנים לשלוח תיקונים
          דרך עמוד יצירת הקשר.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <Link href="/affiliate-disclosure" className="rounded-lg border border-accent/30 px-4 py-2 text-accent hover:bg-accent/10">
            גילוי נאות
          </Link>
          <Link href="/responsible-gambling" className="rounded-lg border border-accent/30 px-4 py-2 text-accent hover:bg-accent/10">
            משחק אחראי
          </Link>
          <Link href="/contact" className="rounded-lg border border-accent/30 px-4 py-2 text-accent hover:bg-accent/10">
            שליחת תיקון
          </Link>
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateReviewMethodologyPageSchema()) }}
      />
    </>
  );
}
