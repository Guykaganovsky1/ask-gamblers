import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { generateContactPageSchema } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "צור קשר עם Ask Gamblers ישראל | תיקונים ושאלות",
  description: "יצירת קשר עם Ask Gamblers ישראל עבור תיקוני מידע, שאלות מערכתיות, שיתופי פעולה או בקשות הסרה ועדכון תוכן.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="צור קשר"
        subtitle="פניות מערכת, תיקוני מידע ושאלות על תוכן האתר"
        badge="Contact"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "צור קשר" }]} />
      <article className="mx-auto max-w-4xl px-4 py-16 text-text-muted leading-relaxed">
        <h2 className="font-heading text-3xl font-black text-text-primary">איך לפנות אלינו</h2>
        <p className="mt-5">
          ניתן לפנות אל Ask Gamblers ישראל לגבי תיקון מידע, עדכון בונוס, שאלת
          גילוי נאות, בקשת הסרה או הצעה לשיפור תוכן.
        </p>
        <div className="mt-8 rounded-2xl border border-border-glass bg-card/40 p-6">
          <p>אימייל: <a href="mailto:contact@askgamblers.co.il" className="text-accent hover:text-accent-light">contact@askgamblers.co.il</a></p>
          <p className="mt-3">WhatsApp: <a href="https://wa.me/972509200920" className="text-accent hover:text-accent-light" rel="nofollow">+972-50-920-0920</a></p>
        </div>
        <p className="mt-8">
          בפנייה על קזינו מסוים, צרפו את שם הקזינו, כתובת העמוד והסבר קצר על
          המידע שצריך לבדוק. אנחנו לא מספקים ייעוץ משפטי, פיננסי או טיפול
          בהתמכרות; במקרה של חשש להתמכרות יש לפנות לגורם מקצועי מוסמך.
        </p>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateContactPageSchema()) }}
      />
    </>
  );
}
