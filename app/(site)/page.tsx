import { Suspense } from "react";
import dynamic from "next/dynamic";
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
              גלו את כל {casinos.length} בתי הקזינו
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
            הבונוסים הטובים ביותר למכונות מזל
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
            <Button href="/blog" variant="outline">קראו {posts.length}+ מאמרים</Button>
          </div>
        </section>
      )}

      <FAQSection />

      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="bg-gradient-to-br from-card-light to-card border border-border-glass rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-black text-text-primary mb-4">
            מוכנים להתחיל? בחרו קזינו בטוח היום
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
            כל בתי הקזינו באתר עברו בדיקה מקיפה. אנחנו בודקים רישיון, שיטות תשלום, בונוסים, תמיכה וחוויית משתמש — כדי שתוכלו לשחק בראש שקט.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/casinos">
              גלו את כל בתי הקזינו
            </Button>
            <Button href="/blog" variant="outline">
              קראו את המדריך המלא
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

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <HomeContent />
      </Suspense>
    </>
  );
}
