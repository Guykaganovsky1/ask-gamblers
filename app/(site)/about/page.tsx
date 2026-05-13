import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { generateAboutPageSchema } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "אודות Ask Gamblers ישראל | מי אנחנו",
  description: "מי עומד מאחורי Ask Gamblers ישראל, איך האתר בודק קזינו אונליין, ומה חשוב לדעת על דירוגים, גילוי נאות ומשחק אחראי.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="אודות Ask Gamblers ישראל"
        subtitle="מדריך עברי לבדיקת קזינו אונליין, בונוסים ומשחק אחראי לשחקנים ישראלים"
        badge="מי אנחנו"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "אודות" }]} />
      <article className="mx-auto max-w-4xl px-4 py-16 text-text-muted leading-relaxed">
        <h2 className="font-heading text-3xl font-black text-text-primary">מה אנחנו עושים</h2>
        <p className="mt-5">
          Ask Gamblers ישראל מרכז מידע בעברית על קזינו אונליין, בונוסים, משחקים,
          שיטות תשלום וכללי בטיחות. המטרה שלנו היא לעזור לקורא להבין מה צריך
          לבדוק לפני הרשמה: תנאי בונוס, שקיפות, זמינות תמיכה, אפשרויות תשלום,
          מגבלות משחק וכלים למשחק אחראי.
        </p>

        <h2 className="mt-10 font-heading text-2xl font-bold text-text-primary">איך אנחנו עובדים</h2>
        <p className="mt-4">
          הביקורות באתר מבוססות על מסגרת בדיקה קבועה ולא רק על גובה הבונוס.
          אנחנו בוחנים את המידע הגלוי באתרי הקזינו, קוראים תנאים, משווים יתרונות
          וחסרונות ומעדכנים דפים כאשר מידע משתנה או כאשר עולה צורך לשפר שקיפות.
        </p>

        <h2 className="mt-10 font-heading text-2xl font-bold text-text-primary">גילוי נאות</h2>
        <p className="mt-4">
          חלק מהקישורים באתר הם קישורי שותפים. ייתכן שנקבל עמלה אם משתמש נרשם
          דרך קישור כזה. העמלה לא משנה את הצורך שלנו להציג חסרונות, תנאים
          חשובים והמלצות למשחק אחראי.
        </p>

        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          <Link href="/review-methodology" className="rounded-lg border border-accent/30 px-4 py-2 text-accent hover:bg-accent/10">
            שיטת הדירוג
          </Link>
          <Link href="/affiliate-disclosure" className="rounded-lg border border-accent/30 px-4 py-2 text-accent hover:bg-accent/10">
            גילוי נאות
          </Link>
          <Link href="/contact" className="rounded-lg border border-accent/30 px-4 py-2 text-accent hover:bg-accent/10">
            צור קשר
          </Link>
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateAboutPageSchema()) }}
      />
    </>
  );
}
