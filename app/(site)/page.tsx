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
            {categories.slice(0, 6).map((cat, i) => (
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
      )}      {/* Slots Bonuses Section */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-text-primary mb-4">
            הבונוסים הטובים ביותר למכונות מזל
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full" />
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="group relative h-full">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-accent-light to-emerald-neon p-1" />
            <div className="group relative flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-card-light to-card px-6 py-8 text-center backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]">
              <div className="h-24 w-32 bg-slate-700 rounded-lg flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">💎</div>
              <div className="flex flex-col gap-1 flex-1 justify-center"><h3 className="font-heading text-lg font-black text-text-primary group-hover:text-accent transition-colors">Diamond</h3><p className="text-xs text-text-muted">100% bonus</p></div>
              <button className="w-full bg-accent hover:bg-accent-light text-white font-bold py-2 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">קבל בונוס</button>
            </div>
          </div>
          <div className="group relative h-full">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-accent-light to-emerald-neon p-1" />
            <div className="group relative flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-card-light to-card px-6 py-8 text-center backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]">
              <div className="h-24 w-32 bg-yellow-400 rounded-lg flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">🏆</div>
              <div className="flex flex-col gap-1 flex-1 justify-center"><h3 className="font-heading text-lg font-black text-text-primary group-hover:text-accent transition-colors">Golden</h3><p className="text-xs text-text-muted">+50 spins</p></div>
              <button className="w-full bg-accent hover:bg-accent-light text-white font-bold py-2 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">קבל בונוס</button>
            </div>
          </div>
          <div className="group relative h-full">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-accent-light to-emerald-neon p-1" />
            <div className="group relative flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-card-light to-card px-6 py-8 text-center backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]">
              <div className="h-24 w-32 bg-black rounded-lg flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">⚡</div>
              <div className="flex flex-col gap-1 flex-1 justify-center"><h3 className="font-heading text-lg font-black text-text-primary group-hover:text-accent transition-colors">Lucky</h3><p className="text-xs text-text-muted">Up to $500</p></div>
              <button className="w-full bg-accent hover:bg-accent-light text-white font-bold py-2 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">קבל בונוס</button>
            </div>
          </div>
          <div className="group relative h-full">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-accent-light to-emerald-neon p-1" />
            <div className="group relative flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-card-light to-card px-6 py-8 text-center backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]">
              <div className="h-24 w-32 bg-purple-900 rounded-lg flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">🎰</div>
              <div className="flex flex-col gap-1 flex-1 justify-center"><h3 className="font-heading text-lg font-black text-text-primary group-hover:text-accent transition-colors">Monte</h3><p className="text-xs text-text-muted">+200 spins</p></div>
              <button className="w-full bg-accent hover:bg-accent-light text-white font-bold py-2 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">קבל בונוס</button>
            </div>
          </div>
          <div className="group relative h-full">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-accent-light to-emerald-neon p-1" />
            <div className="group relative flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-card-light to-card px-6 py-8 text-center backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]">
              <div className="h-24 w-32 bg-slate-800 rounded-lg flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">🎯</div>
              <div className="flex flex-col gap-1 flex-1 justify-center"><h3 className="font-heading text-lg font-black text-text-primary group-hover:text-accent transition-colors">Play</h3><p className="text-xs text-text-muted">+100% bonus</p></div>
              <button className="w-full bg-accent hover:bg-accent-light text-white font-bold py-2 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">קבל בונוס</button>
            </div>
          </div>
          <div className="group relative h-full">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-accent-light to-emerald-neon p-1" />
            <div className="group relative flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-card-light to-card px-6 py-8 text-center backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]">
              <div className="h-24 w-32 bg-red-500 rounded-lg flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">👑</div>
              <div className="flex flex-col gap-1 flex-1 justify-center"><h3 className="font-heading text-lg font-black text-text-primary group-hover:text-accent transition-colors">Pharaoh</h3><p className="text-xs text-text-muted">+free spins</p></div>
              <button className="w-full bg-accent hover:bg-accent-light text-white font-bold py-2 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">קבל בונוס</button>
            </div>
          </div>
        </div>
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
