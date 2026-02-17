import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { POST_BY_SLUG_QUERY, FEATURED_CASINOS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { CasinoCard } from "@/components/ui/casino-card";
import { SectionHeading } from "@/components/ui/section-heading";

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
      <div className="my-8 overflow-hidden rounded-xl">
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
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, topCasinos] = await Promise.all([
    client.fetch(POST_BY_SLUG_QUERY, { slug }),
    client.fetch(FEATURED_CASINOS_QUERY),
  ]);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
        <article>
          {post.featuredImage && (
            <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl">
              <Image
                src={urlFor(post.featuredImage).width(900).height(500).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <h1 className="font-heading text-3xl font-black md:text-4xl">{post.title}</h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-text-muted">
            {post.author && <span>{post.author.name}</span>}
            {post.publishedAt && (
              <>
                <span>•</span>
                <time>{new Date(post.publishedAt).toLocaleDateString("he-IL")}</time>
              </>
            )}
          </div>
          {post.categories?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.categories.map((cat: any) => (
                <span key={cat._id} className="rounded-full border border-border-glass bg-card px-3 py-1 text-xs text-text-muted">
                  {cat.name}
                </span>
              ))}
            </div>
          )}
          <div className="prose prose-invert mt-8 max-w-none prose-headings:font-heading prose-headings:text-text-primary prose-p:text-text-muted prose-a:text-gold">
            {post.body && <PortableText value={post.body} components={portableTextComponents} />}
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <SectionHeading className="text-xl">קזינו מומלצים</SectionHeading>
            <div className="mt-6 flex flex-col gap-4">
              {topCasinos.slice(0, 3).map((casino: any, i: number) => (
                <CasinoCard key={casino._id} {...casino} index={i} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
