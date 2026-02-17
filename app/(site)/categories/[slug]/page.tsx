import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { CATEGORY_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { CasinoCard } from "@/components/ui/casino-card";
import { BlogCard } from "@/components/ui/blog-card";
import { SectionHeading } from "@/components/ui/section-heading";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await client.fetch(CATEGORY_BY_SLUG_QUERY, { slug });
  if (!category) return {};
  return {
    title: `${category.name} | קזינו רז`,
    description: category.description || `קזינו ומאמרים בקטגוריית ${category.name}`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await client.fetch(CATEGORY_BY_SLUG_QUERY, { slug });
  if (!category) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading>{category.name}</SectionHeading>
      {category.description && (
        <p className="mt-4 max-w-2xl text-text-muted">{category.description}</p>
      )}

      {category.casinos?.length > 0 && (
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold">קזינו</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.casinos.map((casino: any, i: number) => (
              <CasinoCard key={casino._id} {...casino} index={i} />
            ))}
          </div>
        </section>
      )}

      {category.posts?.length > 0 && (
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold">מאמרים</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.posts.map((post: any, i: number) => (
              <BlogCard key={post._id} {...post} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
