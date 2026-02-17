import { client } from "@/sanity/lib/client";
import { FEATURED_CASINOS_QUERY, LATEST_POSTS_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { Hero } from "@/components/sections/hero";
import { CasinoCard } from "@/components/ui/casino-card";
import { BlogCard } from "@/components/ui/blog-card";
import { CategoryCard } from "@/components/ui/category-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export const revalidate = 60;

async function getHomeData() {
  try {
    const [casinos, posts, categories] = await Promise.all([
      client.fetch(FEATURED_CASINOS_QUERY),
      client.fetch(LATEST_POSTS_QUERY),
      client.fetch(CATEGORIES_QUERY),
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
      <Hero />

      {casinos.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20">
          <SectionHeading>קזינו מומלצים</SectionHeading>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {casinos.map((casino: any, i: number) => (
              <CasinoCard key={casino._id} {...casino} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/casinos" variant="outline">כל הקזינו ←</Button>
          </div>
        </section>
      )}

      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20">
          <SectionHeading>קטגוריות</SectionHeading>
          <div className="mt-10 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat: any, i: number) => (
              <CategoryCard key={cat._id} {...cat} index={i} />
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20">
          <SectionHeading>מאמרים אחרונים</SectionHeading>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any, i: number) => (
              <BlogCard key={post._id} {...post} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/blog" variant="outline">כל המאמרים ←</Button>
          </div>
        </section>
      )}
    </>
  );
}
