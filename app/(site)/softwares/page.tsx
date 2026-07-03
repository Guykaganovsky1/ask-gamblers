import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { Category } from "@/sanity/lib/types";
import { CategoryCard } from "@/components/ui/category-card";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "ספקי תוכנה קזינו 2026 | NetEnt, Microgaming, Playtech",
  description: "הכירו ספקי תוכנה לקזינו אונליין כמו NetEnt, Microgaming ו-Playtech, ובדקו מגוון משחקים, מובייל, לייב ושקיפות לפני בחירה.",
  alternates: {
    canonical: `${SITE_URL}/softwares`,
  },
  openGraph: {
    title: "ספקי תוכנה קזינו 2026 | NetEnt, Microgaming, Playtech",
    description: "הכירו ספקי תוכנה לקזינו אונליין ובדקו מגוון משחקים, מובייל, לייב ושקיפות.",
    url: `${SITE_URL}/softwares`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    type: "website",
  },
  robots: "index, follow",
};

export default async function CategoriesPage() {
  const categories = await client.fetch<Category[]>(CATEGORIES_QUERY);

  return (
    <>
      <PageHero
        title="ספקי התוכנה שמאחורי חוויית המשחק"
        subtitle="NetEnt, Microgaming, Playtech ועוד — השוו לפי סוגי משחקים, מובייל, לייב ושקיפות מידע"
        badge="מדריך ספקי תוכנה"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "ספקי תוכנה" }]} />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((cat, i) => (
            <CategoryCard key={cat._id} name={cat.name} slug={cat.slug} description={cat.description} casinoCount={cat.casinoCount} postCount={cat.postCount} index={i} />
          ))}
        </div>

        <section className="mt-20 rounded-2xl border border-border-glass bg-card/40 p-6 md:p-8">
          <h2 className="font-heading text-2xl font-black text-text-primary md:text-3xl">
            למה ספקי תוכנה חשובים בבחירת קזינו?
          </h2>
          <p className="mt-4 max-w-4xl leading-relaxed text-text-secondary">
            ספקי תוכנה משפיעים על איכות המשחקים, יציבות המובייל, מגוון סלוטים ושולחנות
            לייב, ולעיתים גם על שקיפות נתוני המשחק. בעמוד זה אנחנו מפנים לקטגוריות
            שבהן אפשר למצוא קזינו ומדריכים לפי סוג משחק, תוכנה או חוויית שימוש.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border-glass bg-background/40 p-5">
              <h3 className="font-heading text-lg font-bold text-text-primary">מגוון משחקים</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                בדקו אם הקזינו מציע את סוגי המשחקים שאתם מחפשים ולא רק מספר משחקים גבוה.
              </p>
            </div>
            <div className="rounded-xl border border-border-glass bg-background/40 p-5">
              <h3 className="font-heading text-lg font-bold text-text-primary">מובייל ולייב</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                ספק טוב צריך לעבוד חלק במובייל ולתמוך בחוויית משחק יציבה.
              </p>
            </div>
            <div className="rounded-xl border border-border-glass bg-background/40 p-5">
              <h3 className="font-heading text-lg font-bold text-text-primary">שקיפות</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                חפשו מידע ברור על כללי המשחק, גרסאות, תשלומים וספקי התוכן באתר הקזינו.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
