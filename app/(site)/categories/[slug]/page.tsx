import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { CATEGORY_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { CategoryDetail } from "@/sanity/lib/types";
import { CasinoCard } from "@/components/ui/casino-card";
import { BlogCard } from "@/components/ui/blog-card";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

interface Props {
  params: Promise<{ slug: string }>;
}

function decodeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categorySlug = decodeSlug(slug);
  const category = await client.fetch<CategoryDetail>(CATEGORY_BY_SLUG_QUERY, { slug: categorySlug });
  if (!category) return {};

  const categoryName = category.name || categorySlug;
  const title = `${categoryName} | Ask Gamblers`;
  const description = category.description || `קזינו ומאמרים בקטגוריית ${categoryName}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/categories/${encodeURIComponent(categorySlug)}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/categories/${encodeURIComponent(categorySlug)}`,
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const categorySlug = decodeSlug(slug);
  const category = await client.fetch<CategoryDetail>(CATEGORY_BY_SLUG_QUERY, { slug: categorySlug });
  if (!category) notFound();

  const categoryName = category.name || categorySlug;

  return (
    <>
      <PageHero
        title={categoryName}
        subtitle={category.description || `קזינו ומאמרים בקטגוריית ${categoryName}`}
        badge="קטגוריה"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: categoryName }]} />

      <div className="mx-auto max-w-7xl px-4 py-20">
        {category.casinos && category.casinos.length > 0 && (
          <section className="mb-24">
            <div className="mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-text-primary mb-4">
                קזינו מומלצים
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.casinos.map((casino, i) => (
                <CasinoCard key={casino._id} {...casino} index={i} />
              ))}
            </div>
          </section>
        )}

        {category.posts && category.posts.length > 0 && (
          <section>
            <div className="mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-text-primary mb-4">
                מאמרים וטיפים
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
