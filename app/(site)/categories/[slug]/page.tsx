import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { CATEGORY_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { CategoryDetail } from "@/sanity/lib/types";
import { CasinoCard } from "@/components/ui/casino-card";
import { BlogCard } from "@/components/ui/blog-card";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await client.fetch<CategoryDetail>(CATEGORY_BY_SLUG_QUERY, { slug });
  if (!category) return {};
  return {
    title: `${category.name} | קזינו רז`,
    description: category.description || `קזינו ומאמרים בקטגוריית ${category.name}`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await client.fetch<CategoryDetail>(CATEGORY_BY_SLUG_QUERY, { slug });
  if (!category) notFound();

  return (
    <>
      {/* Professional Hero Section */}
      <div className="w-full bg-gradient-to-b from-card to-background py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4">
          {/* Category Badge */}
          <div className="mb-8">
            <span className="inline-block rounded-full bg-accent/20 border border-accent/40 px-4 py-2 text-sm font-bold text-accent">
              קטגוריה
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-5xl md:text-6xl font-black leading-tight text-text-primary mb-6">
            {category.name}
          </h1>

          {/* Description */}
          {category.description && (
            <p className="text-lg text-text-secondary max-w-3xl leading-relaxed">
              {category.description}
            </p>
          )}

          {/* Stats */}
          {((category.casinos && category.casinos.length > 0) || (category.posts && category.posts.length > 0)) && (
            <div className="mt-10 flex gap-8">
              {category.casinos && category.casinos.length > 0 && (
                <div>
                  <div className="text-3xl font-black text-accent">{category.casinos.length}</div>
                  <div className="text-sm text-text-muted mt-1">קזינו מומלץ</div>
                </div>
              )}
              {category.posts && category.posts.length > 0 && (
                <div>
                  <div className="text-3xl font-black text-accent">{category.posts.length}</div>
                  <div className="text-sm text-text-muted mt-1">מאמרים</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-7xl px-4 py-20">
        {/* Casinos Section */}
        {category.casinos && category.casinos.length > 0 && (
          <section className="mb-24">
            <div className="mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-text-primary mb-4">
                קזינו מומלצים
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.casinos.map((casino, i) => (
                <CasinoCard key={casino._id} {...casino} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Posts Section */}
        {category.posts && category.posts.length > 0 && (
          <section>
            <div className="mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-text-primary mb-4">
                מאמרים וטיפים
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.posts.map((post, i) => (
                <BlogCard key={post._id} {...post} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
