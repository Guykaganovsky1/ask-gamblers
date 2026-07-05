import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { FEATURED_CASINOS_QUERY, LATEST_POSTS_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { SECTION_COPY } from "@/config/copywriting-config";
import { Casino, BlogPost, Category } from "@/sanity/lib/types";
import { Hero } from "@/components/sections/hero";
import { BlogCard } from "@/components/ui/blog-card";
import { CategoryCard } from "@/components/ui/category-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { CasinoCard } from "@/components/ui/casino-card";
import { LastUpdated } from "@/components/ui/last-updated";
import { SafeCasinosSection } from "@/components/sections/safe-casinos-section";
import { SeoTopicHub } from "@/components/sections/seo-topic-hub";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "קזינו אונליין בישראל 2026 | השוואת ביקורות בונוסים ותשלומים",
  description:
    "השוואת קזינו אונליין ובתי קזינו בישראל 2026: ביקורות, בונוסים, משחקים, שיטות תשלום, רישוי ומשחק אחראי לפני הרשמה.",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "he-IL": SITE_URL,
      he: SITE_URL,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    title: "קזינו אונליין בישראל 2026 | השוואת ביקורות בונוסים ותשלומים",
    description:
      "השוואת קזינו אונליין ובתי קזינו בישראל 2026 לפי ביקורות, בונוסים, משחקים, תשלומים ורישוי.",
    url: SITE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "קזינו אונליין בישראל 2026 | השוואת ביקורות בונוסים ותשלומים",
    description:
      "השוואת קזינו אונליין ובתי קזינו בישראל 2026 לפי ביקורות, בונוסים, משחקים, תשלומים ורישוי.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

const FAQSection = dynamic(
  () => import("@/components/sections/faq-section").then((mod) => ({ default: mod.FAQSection })),
  { loading: () => <div className="min-h-[200px]" /> }
);

const PaymentMethodsSection = dynamic(
  () => import("@/components/sections/payment-methods-section").then((mod) => ({ default: mod.PaymentMethodsSection })),
  { loading: () => <div className="min-h-[200px]" /> }
);

const PlayerRoadmapSection = dynamic(
  () => import("@/components/sections/player-roadmap-section").then((mod) => ({ default: mod.PlayerRoadmapSection })),
  { loading: () => <div className="min-h-[200px]" /> }
);

const GamesShowcaseSection = dynamic(
  () => import("@/components/sections/games-showcase-section").then((mod) => ({ default: mod.GamesShowcaseSection })),
  { loading: () => <div className="min-h-[200px]" /> }
);

const BonusCards = dynamic(
  () => import("@/components/sections/bonus-cards").then((mod) => ({ default: mod.BonusCards })),
  { loading: () => <div className="min-h-[200px]" /> }
);

const NotRecommendedSection = dynamic(
  () => import("@/components/sections/not-recommended-section").then((mod) => ({ default: mod.NotRecommendedSection })),
  { loading: () => <div className="min-h-[200px]" /> }
);

export const revalidate = 60;

async function getHomeData() {
  try {
    const [casinos, posts, categories] = await Promise.all([
      client.fetch<Casino[]>(FEATURED_CASINOS_QUERY),
      client.fetch<BlogPost[]>(LATEST_POSTS_QUERY),
      client.fetch<Category[]>(CATEGORIES_QUERY)
    ]);
    return { casinos: casinos ?? [], posts: posts ?? [], categories: categories ?? [] };
  } catch {
    return { casinos: [], posts: [], categories: [] };
  }
}

function HomepageIntro() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16" aria-labelledby="homepage-intro-title">
      <div className="rounded-2xl border border-border-glass bg-card/40 p-6 md:p-10">
        <p className="text-sm font-bold text-accent-light">השוואה לפני הרשמה</p>
        <h2 id="homepage-intro-title" className="mt-3 font-heading text-3xl font-black text-text-primary md:text-4xl">
          השוואת קזינו אונליין ובתי קזינו בישראל 2026
        </h2>
        <div className="mt-6 grid gap-6 text-text-secondary md:grid-cols-[1.25fr_1fr]">
          <div className="space-y-4 leading-relaxed">
            <p>
              Ask Gamblers מרכז מידע על קזינו אונליין בישראל כדי לעזור לשחקנים לבדוק אתר לפני הרשמה,
              לא לבחור רק לפי באנר או לפי גובה בונוס. בכל סקירה אנחנו מסתכלים על רישוי, תנאי שימוש,
              שיטות תשלום, זמני משיכה, משחקים זמינים, תמיכה וכלים למשחק אחראי, ואז מציגים את המידע
              בצורה שאפשר להשוות בין כמה אפשרויות בלי לפתוח עשרות עמודים.
            </p>
            <p>
              המטרה של העמוד היא לתת נקודת פתיחה ברורה: להבין אילו בתי קזינו בישראל מציגים תנאים
              שקופים, אילו בונוסים דורשים קריאה זהירה, ואילו מדריכים כדאי לקרוא לפני הפקדה ראשונה.
              השוואת קזינו אונליין טובה בודקת גם את הפרטים הקטנים, למשל תקרות משיכה, מסמכי אימות,
              משחקים שלא נספרים לבונוס והבדלים בין מובייל, לייב וסלוטים.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
            <article className="rounded-xl border border-border-glass bg-background/35 p-4">
              <h3 className="font-heading text-lg font-bold text-text-primary">רישוי ושקיפות</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                בדקו מי מפעיל את האתר, איפה הרישיון מוצג ומה כתוב בתנאי השימוש לפני יצירת חשבון.
              </p>
            </article>
            <article className="rounded-xl border border-border-glass bg-background/35 p-4">
              <h3 className="font-heading text-lg font-bold text-text-primary">בונוסים ותשלומים</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                השוו דרישות הימור, תוקף, תקרות משיכה, עמלות ואמצעי תשלום שמתאימים לשחקנים ישראלים.
              </p>
            </article>
            <article className="rounded-xl border border-border-glass bg-background/35 p-4">
              <h3 className="font-heading text-lg font-bold text-text-primary">משחק אחראי</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                הגדירו תקציב וזמן משחק מראש, והעדיפו אתרים שמציגים כלי הגבלה ועזרה בצורה נגישה.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

async function HomeContent() {
  const { casinos, posts, categories } = await getHomeData();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <LastUpdated />
      </div>

      <SeoTopicHub />

      <SafeCasinosSection />

      {casinos.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-24">
          <SectionHeading>{SECTION_COPY.casinos.heading}</SectionHeading>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {casinos.map((casino, i) => (
              <CasinoCard key={casino._id} {...casino} index={i} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/casinos" variant="outline">
              פתחו רשימת קזינו לבדיקה ({casinos.length})
            </Button>
          </div>
        </section>
      )}

      <NotRecommendedSection />

      <PlayerRoadmapSection />

      <PaymentMethodsSection />

      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-24">
          <SectionHeading>{SECTION_COPY.categories.heading}</SectionHeading>
          <div className="mt-12 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map((cat, i) => (
              <CategoryCard
                key={cat._id}
                name={cat.name}
                slug={cat.slug}
                description={cat.description}
                casinoCount={cat.casinoCount}
                postCount={cat.postCount}
                index={i}
              />
            ))}
          </div>
        </section>
      )}

      <GamesShowcaseSection />

      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-text-primary mb-4">
            בונוסים למכונות מזל: מה לבדוק
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full" />
        </div>
        <BonusCards />
      </section>

      {posts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-24">
          <SectionHeading>{SECTION_COPY.blog.heading}</SectionHeading>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <BlogCard key={post._id} {...post} index={i} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/blog" variant="outline">עברו למדריכי קזינו ({posts.length}+)</Button>
          </div>
        </section>
      )}

      <FAQSection />

      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="bg-gradient-to-br from-card-light to-card border border-border-glass rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-black text-text-primary mb-4">
            רוצים להשוות לפני הרשמה?
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
            אנחנו בודקים רישיון, שיטות תשלום, בונוסים, תמיכה, חוויית משתמש וכלי משחק אחראי — כדי שתוכלו להשוות בצורה מסודרת לפני החלטה.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/casinos">
              פתחו טבלת השוואת קזינו
            </Button>
            <Button href="/blog" variant="outline">
              קראו מדריכי בדיקה לפני הרשמה
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />

      <HomepageIntro />

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <HomeContent />
      </Suspense>
    </>
  );
}
