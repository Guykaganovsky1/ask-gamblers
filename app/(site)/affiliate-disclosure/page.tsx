import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "גילוי נאות וקישורי שותפים | Ask Gamblers",
  description: "הסבר על קישורי שותפים, עמלות, אופן דירוג קזינו והפרדה בין תוכן מערכתי לבין הכנסה מסחרית באתר Ask Gamblers.",
  alternates: { canonical: `${SITE_URL}/affiliate-disclosure` },
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <PageHero
        title="גילוי נאות"
        subtitle="איך קישורי שותפים עובדים באתר ומה המשמעות עבור הקורא"
        badge="Affiliate Disclosure"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "גילוי נאות" }]} />
      <article className="mx-auto max-w-4xl px-4 py-16 text-text-muted leading-relaxed">
        <h2 className="font-heading text-3xl font-black text-text-primary">קישורי שותפים</h2>
        <p className="mt-5">
          חלק מהכפתורים והקישורים באתר מובילים לעמודי הרשמה של צדדים שלישיים.
          כאשר משתמש נרשם דרך קישור כזה, Ask Gamblers עשוי לקבל עמלת שותפים.
          קישורים אלה מסומנים טכנית כקישורי sponsored/nofollow כדי לשקף את
          האופי המסחרי שלהם למנועי חיפוש.
        </p>

        <h2 className="mt-10 font-heading text-2xl font-bold text-text-primary">איך זה משפיע על הדירוג</h2>
        <p className="mt-4">
          העמלה אינה מבטלת את הצורך להציג חסרונות, תנאי בונוס, מגבלות ומשחק
          אחראי. דירוגים באתר צריכים להתבסס על איכות ההצעה, שקיפות, תנאים,
          תשלומים, תמיכה וחוויית משתמש, ולא רק על גובה העמלה.
        </p>

        <h2 className="mt-10 font-heading text-2xl font-bold text-text-primary">אחריות הקורא</h2>
        <p className="mt-4">
          לפני הרשמה או הפקדה, יש לקרוא את תנאי האתר החיצוני במלואם. מידע על
          בונוסים, זמינות משחקים ושיטות תשלום עשוי להשתנות ללא הודעה מוקדמת.
        </p>
      </article>
    </>
  );
}
