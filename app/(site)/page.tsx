import { client } from "@/sanity/lib/client";
import { FEATURED_CASINOS_QUERY, LATEST_POSTS_QUERY, CATEGORIES_QUERY, FEATURED_SOFTWARE_PROVIDERS_QUERY } from "@/sanity/lib/queries";
import { SECTION_COPY, CTA_COPY } from "@/config/copywriting-config";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { CasinoCard } from "@/components/ui/casino-card";
import { BlogCard } from "@/components/ui/blog-card";
import { CategoryCard } from "@/components/ui/category-card";
import { SoftwareProviderCard } from "@/components/ui/software-provider-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export const revalidate = 60;

async function getHomeData() {
  try {
    const [casinos, posts, categories, softwareProviders] = await Promise.all([
      client.fetch(FEATURED_CASINOS_QUERY),
      client.fetch(LATEST_POSTS_QUERY),
      client.fetch(CATEGORIES_QUERY),
      client.fetch(FEATURED_SOFTWARE_PROVIDERS_QUERY),
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
          <div className="mt-12 grid gap-5">
            {casinos.map((casino: any, i: number) => (
              <CasinoCard key={casino._id} {...casino} index={i} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/casinos" variant="outline">{CTA_COPY.navigation.allCasinos}</Button>
          </div>
        </section>
      )}

      {softwareProviders.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-24">
          <SectionHeading>{SECTION_COPY.softwareProviders.heading}</SectionHeading>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {softwareProviders.map((provider: any, i: number) => (
              <SoftwareProviderCard key={provider._id} {...provider} index={i} />
            ))}
          </div>
        </section>
      )}

      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-24">
          <SectionHeading>{SECTION_COPY.categories.heading}</SectionHeading>
          <div className="mt-12 grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat: any, i: number) => (
              <CategoryCard key={cat._id} {...cat} index={i} />
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-24">
          <SectionHeading>{SECTION_COPY.blog.heading}</SectionHeading>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any, i: number) => (
              <BlogCard key={post._id} {...post} index={i} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/blog" variant="outline">{CTA_COPY.navigation.allPosts}</Button>
          </div>
        </section>
      )}
    </>
  );
}
