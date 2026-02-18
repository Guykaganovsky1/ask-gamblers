import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { POST_BY_SLUG_QUERY, FEATURED_CASINOS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { CasinoCard } from "@/components/ui/casino-card";
import { StarRating } from "@/components/ui/star-rating";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug });
  if (!post) return {};
  return {
    title: post.seoTitle || `${post.title} | קזינו רז`,
    description: post.seoDescription || "",
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-10 overflow-hidden rounded-xl">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || ""}
          width={800}
          height={450}
          className="w-full object-cover"
        />
      </div>
    ),
  },
  block: {
    h2: ({ children }: any) => <h2 className="mt-10 mb-4 font-heading text-2xl font-black text-text-primary">{children}</h2>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-accent pl-6 py-2 my-8 italic text-text-secondary">
        {children}
      </blockquote>
    ),
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, topCasinos] = await Promise.all([
    client.fetch(POST_BY_SLUG_QUERY, { slug }),
    client.fetch(FEATURED_CASINOS_QUERY),
  ]);

  if (!post) notFound();

  return (
    <>
      {/* Hero Section with Background Image */}
      {post.featuredImage && (
        <div className="relative min-h-[400px] w-full overflow-hidden">
          <Image
            src={urlFor(post.featuredImage).width(1400).height(600).url()}
            alt={post.title}
            fill
            className="absolute inset-0 object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />

          {/* Hero Content */}
          <div className="relative z-10 flex items-end h-full px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              {/* Category Badge */}
              {post.categories?.length > 0 && (
                <div className="mb-6">
                  <span className="inline-block rounded-full bg-accent px-4 py-2 text-sm font-bold text-white">
                    {post.categories[0].name}
                  </span>
                </div>
              )}
              {/* Title */}
              <h1 className="font-heading text-4xl md:text-5xl font-black leading-tight text-text-primary mb-6">
                {post.title}
              </h1>
              {/* Metadata */}
              <div className="flex items-center gap-4 text-sm text-text-secondary">
                {post.author && (
                  <>
                    <span>{post.author.name}</span>
                    <span>•</span>
                  </>
                )}
                {post.publishedAt && (
                  <time>{new Date(post.publishedAt).toLocaleDateString("he-IL")}</time>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          {/* Main Content */}
          <article>
            <div className="prose prose-invert max-w-none">
              <style>{`
                .prose p { margin-bottom: 1.5rem; line-height: 1.8; }
                .prose strong { color: var(--color-text-primary); }
                .prose em { color: var(--color-text-secondary); }
              `}</style>
              {post.body && <PortableText value={post.body} components={portableTextComponents} />}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* Recommended Casinos Widget */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-6 bg-accent rounded" />
                  <h3 className="font-heading text-lg font-black text-text-primary">קזינו מומלצים</h3>
                </div>

                <div className="space-y-4">
                  {topCasinos.slice(0, 4).map((casino: any) => (
                    <div key={casino._id} className="group rounded-lg border border-border-card bg-card-light/50 p-4 hover:bg-card-light transition-colors">
                      <div className="flex gap-3">
                        {/* Casino Logo */}
                        {casino.logo && (
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
                            <Image
                              src={urlFor(casino.logo).width(80).height(80).url()}
                              alt={casino.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {/* Casino Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-heading font-bold text-text-primary text-sm truncate">{casino.name}</h4>
                          <div className="mt-1 flex items-center gap-1">
                            <StarRating rating={casino.rating} size="sm" />
                          </div>
                          {casino.description && (
                            <p className="mt-2 text-xs text-text-muted line-clamp-2">{casino.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
