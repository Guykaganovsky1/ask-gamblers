import { client } from "@/sanity/lib/client";
import { FEATURED_CASINOS_QUERY, LATEST_POSTS_QUERY, CATEGORIES_QUERY
} from "@/sanity/lib/queries";
import { SECTION_COPY } from "@/config/copywriting-config";
import { Casino, BlogPost, Category } from "@/sanity/lib/types";
import { Hero } from "@/components/sections/hero";
import { BonusCards } from "@/components/sections/bonus-cards";
import { BlogCard } from "@/components/ui/blog-card";
import { CategoryCard } from "@/components/ui/category-card";
import { GamesShowcaseSection } from "@/components/sections/games-showcase-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { CasinoCard } from "@/components/ui/casino-card";
import { LastUpdated } from "@/components/ui/last-updated";
import { FAQSection } from "@/components/sections/faq-section";
import { NotRecommendedSection } from "@/components/sections/not-recommended-section";
import { PaymentMethodsSection } from "@/components/sections/payment-methods-section";
import { PlayerRoadmapSection } from "@/components/sections/player-roadmap-section";
import { SafeCasinosSection } from "@/components/sections/safe-casinos-section";

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

export default async function HomePage() {
  const { casinos, posts, categories } = await getHomeData();

  return (
    <>
      <style>{`
        @keyframes bonusButtonShine {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .bonus-button-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.4) 25%,
            rgba(255, 255, 255, 0.7) 50%,
            rgba(255, 255,255, 0.4) 75%,
            transparent 100%
          );
          animation: bonusButtonShine 3s ease-in-out infinite;
          width: 200%;
          pointer-events: none;
          border-radius: inherit;
        }
      `}</style>
      <Hero />
      {/* <StatsBar /> */}

      {/* Last Updated Badge */}
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <LastUpdated />
      </div>

      {/* Safe Casinos Section */}
      <SafeCasinosSection />

      {/* Casinos Section */}
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
              גלו כל {casinos.length} הקזינו
            </Button>
          </div>
        </section>
      )}

      {/* Not Recommended Section */}
      <NotRecommendedSection />

      {/* Player Roadmap Section */}
      <PlayerRoadmapSection />

      {/* Payment Methods Section */}
      <PaymentMethodsSection />

      {/* Categories Section */}
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


      {/* Games Showcase Section */}
      <GamesShowcaseSection />

      {/* Bonus Cards Section */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-text-primary mb-4">
            הבונוסים הטובים ביותר למכונות מזל
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full" />
        </div>
        <BonusCards />
      </section>

      {/* Blog Section */}
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

      {/* FAQ Section with Schema */}
      <FAQSection />

      {/* Conclusion Section */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="bg-gradient-to-br from-card-light to-card border border-border-glass rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-black text-text-primary mb-4">
            מוכנים להתחיל? בחרו קזינו בטוח היום
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
            כל הקזינו באתר עברו בדיקה מקיפה. אנחנו בודקים רישיון, שיטות תשלום, בונוסים, תמיכה וחוויית משתמש — כדי שתוכלו לשחק בראש שקט.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/casinos">
              גלו את כל הקזינו
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
