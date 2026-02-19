import { client } from "@/sanity/lib/client";
import { FEATURED_CASINOS_QUERY, LATEST_POSTS_QUERY, CATEGORIES_QUERY, FEATURED_SOFTWARE_PROVIDERS_QUERY } from "@/sanity/lib/queries";
import { SECTION_COPY } from "@/config/copywriting-config";
import { Casino, BlogPost, Category, SoftwareProvider } from "@/sanity/lib/types";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { BonusCards } from "@/components/sections/bonus-cards";
import { BlogCard } from "@/components/ui/blog-card";
import { CategoryCard } from "@/components/ui/category-card";
import { SoftwareProviderCard } from "@/components/ui/software-provider-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { CasinoCard } from "@/components/ui/casino-card";

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
            rgba(255, 255, 255, 0.4) 75%,
            transparent 100%
          );
          animation: bonusButtonShine 3s ease-in-out infinite;
          width: 200%;
          pointer-events: none;
          border-radius: inherit;
        }
      `}</style>
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
        <BonusCards />
      </section>

      {/* Slots Affiliate Programs Section */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-text-primary mb-4">
            Slots Affiliate Programs
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full" />
        </div>
        <div className="prose prose-invert max-w-none space-y-4 text-text-muted leading-relaxed">
          <p>
            Cras in nisi id turpis cursus vulputate. Aliquam at sapien non tellus congue efficitur. Nam scelerisque quam quis link turpis pellentesque, in placerat erat laoreet. Integer porttitor malesuada ante, nec aliquet dui pellentesque sit amet. Fusce non pretium lacus, id malesuada dui.
          </p>
          <p>
            Aliquam sapien ex, finibus ut interdum a, varius hendrerit felis. Ut lobortis lorem sit amet dolor sagittis, vel blandit massa porttitor. Aliquam erat volutpat. Duis tincidunt, turpis ut porta malesuada. Cras in nisi id turpis cursus vulputate. Aliquam at sapien non tellus congue efficitur. Nam scelerisque quam quis turpis pellentesque, in placerat erat laoreet. Integer porttitor malesuada ante, nec aliquet dui pellentesque sit amet.
          </p>
          <p>
            Donec bibendum augue in erat porttitor, id pharetra purus mattis. Integer gravida ornare auctor. Sed mauris libero, pretium consectetur cursus eu, blandit at arcu. Morbi justo turpis, vulputate et elementum non, dapibus at ante. Morbi id augue id justo pulvinar elementum. Donec volutpat quam quis porta maximus.
          </p>
          <p>
            Aliquam sapien ex, finibus ut interdum a, varius hendrerit felis. Ut lobortis lorem sit amet dolor sagittis, vel blandit massa porttitor. Aliquam erat volutpat. Duis tincidunt, turpis ut porta malesuada.
          </p>
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

      {/* Final Content Section */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="space-y-6 text-text-muted leading-relaxed">
          <p>
            Cras in nisi id turpis cursus vulputate. Aliquam at sapien non tellus congue efficitur. Nam scelerisque quam quis turpis pellentesque, in placerat erat laoreet. Integer porttitor malesuada ante, nec aliquet dui pellentesque sit amet.
          </p>

          <ul className="space-y-4 pl-6">
            <li className="flex gap-3">
              <span className="text-accent flex-shrink-0 mt-1">●</span>
              <span>
                <strong className="text-text-primary">Donec bibendum augue in erat porttitor, id pharetra purus mattis.</strong> Integer gravida ornare auctor. Sed mauris libero, pretium consectetur cursus eu, blandit at arcu. Morbi justo turpis, vulputate et elementum non, dapibus at ante. Morbi id augue id justo pulvinar elementum. Donec volutpat quam quis porta maximus.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent flex-shrink-0 mt-1">●</span>
              <span>
                <strong className="text-text-primary">Cras in nisi id turpis cursus vulputate.</strong> Aliquam at sapien non tellus congue efficitur. Nam scelerisque quam quis turpis pellentesque, in placerat erat laoreet. Integer porttitor malesuada ante, nec aliquet dui pellentesque sit amet.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent flex-shrink-0 mt-1">●</span>
              <span>
                <strong className="text-text-primary">Praesent magna lacus, faucibus ac sapien vel, efficitur ullamcorper ipsum.</strong> Maecenas varius risus at ipsum hendrerit, non aliquet sem scelerisque. Vestibulum vel augue eget nibh laoreet facilisis ut ultricies sapien. Aliquam sit amet velit egestas, ultrices lacus ut, elementum sapien.
              </span>
            </li>
          </ul>

          <p>
            Sed mauris libero, pretium consectetur cursus eu, blandit at arcu. Morbi justo turpis, vulputate et elementum non, dapibus at ante. Morbi id augue id justo pulvinar elementum. Donec volutpat quam quis porta maximus.
          </p>

          <p>
            Cras in nisi id turpis cursus vulputate. Aliquam at sapien non tellus congue efficitur. Nam scelerisque quam quis link turpis pellentesque, in placerat erat laoreet. Integer porttitor malesuada ante, nec aliquet dui pellentesque sit amet. Fusce non pretium lacus, id malesuada dui.
          </p>

          <p className="italic text-text-muted/80">
            Sed hendrerit libero eros, ut faucibus ante pulvinar in. Integer erat sem, aliquam at eros sed, gravida lobortis elit. Suspendisse metus sem, dignissim et eleifend a, malesuada vel tortor. Nulla sit amet velit quis tellus convallis facilisis a et mi. Donec luctus, arcu in accumsan auctor, ligula ante dictum lectus, lobortis pellentesque tellus magna quis felis.
          </p>

          <div className="flex justify-center pt-8">
            <span className="text-6xl">💎</span>
          </div>
        </div>
      </section>

    </>
  );
}
