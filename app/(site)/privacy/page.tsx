import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "מדיניות פרטיות | Ask Gamblers",
  description: "מדיניות פרטיות של Ask Gamblers: איזה מידע עשוי להיאסף, שימוש בקישורי שותפים, אנליטיקה ופניות משתמשים.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="מדיניות פרטיות"
        subtitle="איך אנחנו מתייחסים למידע, פניות וקישורים חיצוניים"
        badge="Privacy"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "פרטיות" }]} />
      <article className="mx-auto max-w-4xl px-4 py-16 text-text-muted leading-relaxed">
        <p>
          Ask Gamblers הוא אתר תוכן והשוואה. האתר עשוי להשתמש בכלי אנליטיקה,
          קישורי שותפים וקבצי לוג בסיסיים כדי להבין שימוש באתר ולשפר תוכן.
        </p>
        <h2 className="mt-10 font-heading text-2xl font-bold text-text-primary">מידע מפניות</h2>
        <p className="mt-4">
          אם אתם פונים אלינו באימייל או WhatsApp, נשתמש בפרטים ששלחתם כדי להשיב
          לפנייה ולטפל בבקשה. אל תשלחו סיסמאות, מסמכים פיננסיים או מידע רגיש
          שאינו נחוץ לפנייה.
        </p>
        <h2 className="mt-10 font-heading text-2xl font-bold text-text-primary">אתרים חיצוניים</h2>
        <p className="mt-4">
          קישורים באתר עשויים להוביל לאתרי קזינו או שירותים חיצוניים. אתרים אלה
          פועלים לפי מדיניות פרטיות ותנאים משלהם, ולכן יש לקרוא אותם לפני שימוש.
        </p>
      </article>
    </>
  );
}
