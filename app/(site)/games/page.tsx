import type { Metadata } from "next";
import { TopDevelopers } from "@/components/sections/top-developers";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "משחקי קזינו אונליין - סלוטים ורולטה 2026",
  description: "מדריך משחקי קזינו אונליין לישראלים: סלוטים, רולטה, בלאקג׳ק, פוקר ולייב קזינו — איך להבין סיכון, חוקים, קצב משחק ומשחק אחראי.",
  alternates: {
    canonical: `${SITE_URL}/games`,
  },
  openGraph: {
    title: "משחקי קזינו אונליין - סלוטים ורולטה 2026",
    description: "מדריך משחקי קזינו אונליין לישראלים: סלוטים, רולטה, בלאקג׳ק, פוקר ולייב קזינו.",
    url: `${SITE_URL}/games`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    type: "website",
  },
  robots: "index, follow",
};

export default function GamesPage() {
  return (
    <>
      <PageHero
        title="משחקי קזינו אונליין: איך בוחרים נכון"
        subtitle="השוואה פשוטה בין סלוטים, רולטה, בלאקג׳ק, פוקר ולייב קזינו לפי חוקים, קצב משחק ורמת סיכון"
        badge="מדריך משחקים"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "משחקים" }]} />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <TopDevelopers />

        <section className="mt-20 rounded-2xl border border-border-glass bg-card/40 p-6 md:p-8">
          <h2 className="font-heading text-2xl font-black text-text-primary md:text-3xl">
            איך לבחור משחק קזינו אונליין?
          </h2>
          <p className="mt-4 max-w-4xl leading-relaxed text-text-secondary">
            בחירת משחק מתחילה בהבנת הסיכון, קצב המשחק והחוקים. סלוטים פשוטים יותר
            אך תנודתיים, רולטה תלויה בסוג ההימור, ובלאקג׳ק דורש החלטות אסטרטגיות.
            לפני שמשחקים בכסף אמיתי כדאי להכיר את החוקים ולבדוק מגבלות תקציב.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border-glass bg-background/40 p-5">
              <h3 className="font-heading text-lg font-bold text-text-primary">סלוטים</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                מתאימים למי שמעדיף משחק מהיר ופשוט, אבל חשוב להבין תנודתיות ותקרות זכייה.
              </p>
            </div>
            <div className="rounded-xl border border-border-glass bg-background/40 p-5">
              <h3 className="font-heading text-lg font-bold text-text-primary">רולטה</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                משחק שולחן עם סוגי הימור שונים. סיכון ההימור משתנה לפי בחירת המספר או הצבע.
              </p>
            </div>
            <div className="rounded-xl border border-border-glass bg-background/40 p-5">
              <h3 className="font-heading text-lg font-bold text-text-primary">בלאקג׳ק ופוקר</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                משחקים שדורשים היכרות עם החלטות, סבלנות וניהול תקציב ברור.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
