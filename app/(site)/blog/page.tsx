import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { BlogPost } from "@/sanity/lib/types";
import { BlogCard } from "@/components/ui/blog-card";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const revalidate = 60;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "בלוג קזינו - מדריכים להשוואה ומשחק אחראי 2026",
  description: "קראו מדריכי קזינו אונליין על בונוסים, תשלומים, משחקים, תנאים ומשחק אחראי כדי לבדוק מידע חשוב לפני הרשמה.",
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  openGraph: {
    title: "בלוג קזינו - מדריכים להשוואה ומשחק אחראי 2026",
    description: "קראו מדריכי קזינו אונליין על בונוסים, תשלומים, משחקים, תנאים ומשחק אחראי.",
    type: "website",
    url: `${baseUrl}/blog`,
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "בלוג קזינו - מדריכים להשוואה ומשחק אחראי 2026",
    description: "קראו מדריכי קזינו אונליין על בונוסים, תשלומים, משחקים, תנאים ומשחק אחראי.",
    images: [`${baseUrl}/og-image.png`],
  },
};

export default async function BlogPage() {
  const posts = await client.fetch<BlogPost[]>(POSTS_QUERY);

  return (
    <>
      <PageHero
        title="מדריכים שעוזרים לבדוק לפני שנרשמים"
        subtitle="הסברים על בונוסים, תשלומים, משחקים ומשחק אחראי בשפה ברורה"
        badge="מדריכים ועדכונים"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "בלוג" }]} />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <BlogCard key={post._id} {...post} index={i} />
          ))}
        </div>

        <section className="mt-20 rounded-2xl border border-border-glass bg-card/40 p-6 md:p-8">
          <h2 className="font-heading text-2xl font-black text-text-primary md:text-3xl">
            איך להשתמש במדריכי הקזינו שלנו?
          </h2>
          <p className="mt-4 max-w-4xl leading-relaxed text-text-secondary">
            התחילו מהשאלה שמעניינת אתכם: בונוס, משחק, שיטת תשלום או בדיקת בטיחות.
            כל מדריך נועד לתת תשובה ישירה, להסביר את התנאים החשובים ולהפנות לעמודים
            שבהם אפשר להשוות קזינו, לקרוא ביקורת או לבדוק משחק אחראי לפני הרשמה.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border-glass bg-background/40 p-5">
              <h3 className="font-heading text-lg font-bold text-text-primary">בדקו תנאים</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                חפשו בכל מדריך דרישות הימור, מגבלות משיכה, תוקף בונוס ומשחקים מוחרגים.
              </p>
            </div>
            <div className="rounded-xl border border-border-glass bg-background/40 p-5">
              <h3 className="font-heading text-lg font-bold text-text-primary">השוו בין אתרים</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                אל תבחרו לפי כותרת אחת. השוו דירוגים, תשלומים, תמיכה וחוויית מובייל.
              </p>
            </div>
            <div className="rounded-xl border border-border-glass bg-background/40 p-5">
              <h3 className="font-heading text-lg font-bold text-text-primary">שחקו באחריות</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                כל מדריך הוא מידע כללי בלבד. הגדירו תקציב וזמן משחק לפני כל הפקדה.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
