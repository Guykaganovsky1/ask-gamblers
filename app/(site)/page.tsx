import { client } from "@/sanity/lib/client";
import { FEATURED_CASINOS_QUERY, LATEST_POSTS_QUERY, CATEGORIES_QUERY, FEATURED_SOFTWARE_PROVIDERS_QUERY } from "@/sanity/lib/queries";
import { SECTION_COPY } from "@/config/copywriting-config";
import { Casino, BlogPost, Category, SoftwareProvider } from "@/sanity/lib/types";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { BlogCard } from "@/components/ui/blog-card";
import { CategoryCard } from "@/components/ui/category-card";
import { SoftwareProviderCard } from "@/components/ui/software-provider-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { CasinoCard } from "@/components/ui/casino-card";
import { BonusCard } from "@/components/ui/bonus-card";

export const revalidate = 60;

async function getHomeData() {
  try {
    const [casinos, posts, categories, softwareProviders] = await Promise.all([
      client.fetch<Casino[]>(FEATURED_CASINOS_QUERY),
      client.fetch<BlogPost[]>(LATEST_POSTS_QUERY),
      client.fetch<Category[]>(CATEGORIES_QUERY),
      client.fetch<SoftwareProvider[]>(FEATURED_SOFTWARE_PROVIDERS_QUERY),
    ]);
    return { casinos: casinos ?? [], posts: posts ?? [], categories: categories ?? [], softwareProviders: softwareProviders ?? [] };
  } catch {
    return { casinos: [], posts: [], categories: [], softwareProviders: [] };
  }
}

export default async function HomePage() {
  const { casinos, posts, categories, softwareProviders } = await getHomeData();

  return (
    <>
      <Hero />
      <StatsBar />

      {casinos.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-24">
          <SectionHeading>{SECTION_COPY.casinos.heading}</SectionHeading>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {casinos.map((casino, i) => (
              <CasinoCard key={casino._id} {...casino} index={i} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/casinos" variant="outline">גלו כל {casinos.length} הקזינו</Button>
          </div>
        </section>
      )}


      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-24">
          <SectionHeading>{SECTION_COPY.categories.heading}</SectionHeading>
          <div className="mt-12 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <CategoryCard key={cat._id} name={cat.name} slug={cat.slug} description={cat.description} casinoCount={cat.casinoCount} postCount={cat.postCount} index={i} />
            ))}
          </div>
        </section>
      )}
      {softwareProviders.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-24">
          <SectionHeading>{SECTION_COPY.softwareProviders.heading}</SectionHeading>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {softwareProviders.map((provider, i) => (
              <SoftwareProviderCard key={provider._id} {...provider} index={i} />
            ))}
          </div>
        </section>
      )}

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


      {/* Slots Bonuses Section */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-text-primary mb-4">
            הבונוסים הטובים ביותר למכונות מזל
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full" />
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-border-glass bg-card p-6"><div className="h-24 bg-slate-700 rounded mb-4 flex items-center justify-center text-4xl">💎</div><p className="font-bold">Diamond</p><button className="w-full mt-3 bg-accent text-white py-1 rounded text-sm">קבל בונוס</button></div>
          <div className="rounded-2xl border border-border-glass bg-card p-6"><div className="h-24 bg-yellow-400 rounded mb-4 flex items-center justify-center text-4xl">🏆</div><p className="font-bold">Golden</p><button className="w-full mt-3 bg-accent text-white py-1 rounded text-sm">קבל בונוס</button></div>
          <div className="rounded-2xl border border-border-glass bg-card p-6"><div className="h-24 bg-black rounded mb-4 flex items-center justify-center text-4xl">⚡</div><p className="font-bold">Lucky</p><button className="w-full mt-3 bg-accent text-white py-1 rounded text-sm">קבל בונוס</button></div>
          <div className="rounded-2xl border border-border-glass bg-card p-6"><div className="h-24 bg-purple-900 rounded mb-4 flex items-center justify-center text-4xl">🎰</div><p className="font-bold">Monte</p><button className="w-full mt-3 bg-accent text-white py-1 rounded text-sm">קבל בונוס</button></div>
          <div className="rounded-2xl border border-border-glass bg-card p-6"><div className="h-24 bg-slate-800 rounded mb-4 flex items-center justify-center text-4xl">🎯</div><p className="font-bold">Play</p><button className="w-full mt-3 bg-accent text-white py-1 rounded text-sm">קבל בונוס</button></div>
          <div className="rounded-2xl border border-border-glass bg-card p-6"><div className="h-24 bg-red-500 rounded mb-4 flex items-center justify-center text-4xl">👑</div><p className="font-bold">Pharaoh</p><button className="w-full mt-3 bg-accent text-white py-1 rounded text-sm">קבל בונוס</button></div>
        </div>
      </section>
    </>
  );
}

      {/* Slots Bonuses Section */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-text-primary mb-4">
            הבונוסים הטובים ביותר למכונות מזל
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full" />
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <BonusCard
            index={0}
            casino="Diamond Casino"
            bonus="Get 100% up to $100 + $88 no deposit"
            description="New players only. Welcome Bonus - 100% bonus on your first deposit up to £/$/€200 Unless otherwise stated. This bonus only applies for deposits of £/$/€10 or higher! All you need to do is just deposit the money in your website.com account and you will receive this bonus instantly!"
            color="bg-slate-700"
            icon="💎"
          />
          <BonusCard
            index={1}
            casino="Golden Casino"
            bonus="Get 100% up to $150 + 50 bonus spins"
            description="New players only. Welcome Bonus - 100% bonus on your first deposit up to £/$/€200 Unless otherwise stated. This bonus only applies for deposits of £/$/€10 or higher! All you need to do is just deposit the money in your website.com account and you will receive this bonus instantly!"
            color="bg-yellow-400"
            icon="🏆"
          />
          <BonusCard
            index={2}
            casino="Lucky Casino"
            bonus="Up to $500 bonus + 50 bonus spins"
            description="New players only. Welcome Bonus - 100% bonus on your first deposit up to £/$/€200 Unless otherwise stated. This bonus only applies for deposits of £/$/€10 or higher! All you need to do is just deposit the money in your website.com account and you will receive this bonus instantly!"
            color="bg-black"
            icon="⚡"
          />
          <BonusCard
            index={3}
            casino="Monte Casino"
            bonus="Slots Casino: 100% up to $100 + 200 spins"
            description="New players only. Welcome Bonus - 100% bonus on your first deposit up to £/$/€200 Unless otherwise stated. This bonus only applies for deposits of £/$/€10 or higher! All you need to do is just deposit the money in your website.com account and you will receive this bonus instantly!"
            color="bg-purple-900"
            icon="🎰"
          />
          <BonusCard
            index={4}
            casino="Play Casino"
            bonus="Get 10 no deposit spins + 100% up to $200"
            description="New players only. Welcome Bonus - 100% bonus on your first deposit up to £/$/€200 Unless otherwise stated. This bonus only applies for deposits of £/$/€10 or higher! All you need to do is just deposit the money in your website.com account and you will receive this bonus instantly!"
            color="bg-slate-800"
            icon="🎯"
          />
          <BonusCard
            index={5}
            casino="Pharaoh Casino"
            bonus="Claim a 100% deposit bonus up to $250 + free spins"
            description="New players only. Welcome Bonus - 100% bonus on your first deposit up to £/$/€200 Unless otherwise stated. This bonus only applies for deposits of £/$/€10 or higher! All you need to do is just deposit the money in your website.com account and you will receive this bonus instantly!"
            color="bg-red-500"
            icon="👑"
          />
        </div>
      </section>
