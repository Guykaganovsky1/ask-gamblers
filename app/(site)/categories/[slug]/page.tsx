import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { CATEGORY_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { CategoryDetail } from "@/sanity/lib/types";
import { CasinoCard } from "@/components/ui/casino-card";
import { BlogCard } from "@/components/ui/blog-card";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

interface Props {
  params: Promise<{ slug: string }>;
}

function decodeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function categoryPath(slug: string) {
  return `/categories/${encodeURIComponent(slug)}`;
}

function buildCategoryTitle(categoryName: string) {
  const compactName = categoryName.split(/\s[-–—]\s/)[0]?.trim() || categoryName;
  return `${compactName}: מדריך ובונוסים | Ask Gamblers`;
}

function buildCategoryDescription(categoryName: string, description?: string) {
  const cleanDescription = description?.trim();
  if (cleanDescription && cleanDescription.length >= 90 && cleanDescription.length <= 170) {
    return cleanDescription;
  }

  return `השוואת קזינו, בונוסים ומדריכים בקטגוריית ${categoryName}: איך לבחור אתר בטוח, לבדוק תנאים ותשלומים, ולהימנע מהצעות לא שקופות לפני הרשמה.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categorySlug = decodeSlug(slug);
  const category = await client.fetch<CategoryDetail>(CATEGORY_BY_SLUG_QUERY, { slug: categorySlug });
  if (!category) return {};

  const categoryName = category.name || categorySlug;
  const title = buildCategoryTitle(categoryName);
  const description = buildCategoryDescription(categoryName, category.description);
  const path = categoryPath(categorySlug);

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}${path}`,
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const categorySlug = decodeSlug(slug);
  const category = await client.fetch<CategoryDetail>(CATEGORY_BY_SLUG_QUERY, { slug: categorySlug });
  if (!category) notFound();

  const categoryName = category.name || categorySlug;
  const categoryDescription = buildCategoryDescription(categoryName, category.description);

  return (
    <>
      <PageHero
        title={categoryName}
        subtitle={categoryDescription}
        badge="קטגוריה"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: categoryName }]} />

      <div className="mx-auto max-w-7xl px-4 py-20">
        <section className="mb-16 border-y border-border-glass py-10">
          <div className="max-w-4xl text-text-muted leading-relaxed">
            <h2 className="font-heading text-3xl font-black text-text-primary">
              מדריך קצר לקטגוריית {categoryName}
            </h2>
            <p className="mt-5">
              עמוד זה מרכז קזינו, מדריכים והמלצות שקשורים לקטגוריית {categoryName}.
              לפני שבוחרים אתר חשוב לבדוק את התמונה המלאה: תנאי הבונוס, דרישות
              ההימור, זמני משיכה, אפשרויות תשלום, איכות התמיכה וכלים למשחק אחראי.
              בונוס גדול יכול להיראות טוב בפרסום, אבל התנאים הקטנים הם אלה שקובעים
              אם ההצעה באמת מתאימה לשחקנים ישראלים.
            </p>
            <p className="mt-4">
              אנחנו ממליצים להשוות בין כמה אתרים ולא להסתמך על פרמטר אחד בלבד.
              בדקו האם האתר מציג מידע ברור על המפעיל, האם יש מגבלות משיכה, האם
              המשחקים שאתם מחפשים זמינים גם במובייל, והאם התמיכה עונה בשפה שאתם
              מבינים. אם משהו בתנאים לא ברור, עדיף לעצור ולבדוק לפני הרשמה או
              הפקדה.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border-glass bg-card/30 p-4">
                <h3 className="font-heading text-lg font-bold text-text-primary">בטיחות</h3>
                <p className="mt-2 text-sm">
                  ודאו שקיימים תנאים ברורים, מדיניות אימות, פרטי מפעיל וכלים להגבלת משחק.
                </p>
              </div>
              <div className="rounded-lg border border-border-glass bg-card/30 p-4">
                <h3 className="font-heading text-lg font-bold text-text-primary">בונוסים</h3>
                <p className="mt-2 text-sm">
                  קראו דרישות הימור, תוקף, משחקים מוחרגים ותקרות משיכה לפני מימוש הטבה.
                </p>
              </div>
              <div className="rounded-lg border border-border-glass bg-card/30 p-4">
                <h3 className="font-heading text-lg font-bold text-text-primary">תשלומים</h3>
                <p className="mt-2 text-sm">
                  השוו זמני משיכה, עמלות, ארנקים דיגיטליים, כרטיסים ופתרונות שמתאימים לישראל.
                </p>
              </div>
            </div>
          </div>
        </section>

        {category.casinos && category.casinos.length > 0 && (
          <section className="mb-24">
            <div className="mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-text-primary mb-4">
                קזינו מומלצים
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.casinos.map((casino, i) => (
                <CasinoCard key={casino._id} {...casino} index={i} />
              ))}
            </div>
          </section>
        )}

        {category.posts && category.posts.length > 0 && (
          <section>
            <div className="mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-text-primary mb-4">
                מאמרים וטיפים
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.posts.map((post, i) => (
                <BlogCard key={post._id} {...post} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
