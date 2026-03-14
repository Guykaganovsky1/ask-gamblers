"use client";

import { useInViewOnce } from "@/lib/animations";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";

interface BlogCardProps {
  title: string;
  slug: { current: string };
  featuredImage?: SanityImage;
  publishedAt?: string;
  author?: { name: string };
  index?: number;
}

export function BlogCard({ title, slug, featuredImage, publishedAt, author, index = 0 }: BlogCardProps) {
  const { ref, isInView } = useInViewOnce(0.1);
  const shouldAnimate = isInView || index < 4;

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={`group h-full ${shouldAnimate ? "animate-slide-up-blog" : "opacity-0"}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link href={`/blog/${slug.current}`} className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-card bg-gradient-to-br from-card-light to-card backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]">
        {featuredImage ? (
          <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5">
            <Image
              src={urlFor(featuredImage).width(750).height(422).url()}
              alt={title}
              fill
              priority={index < 2}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-accent/20 via-accent/10 to-card-light flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="font-heading text-lg font-black leading-snug text-text-primary group-hover:text-accent transition-colors line-clamp-2">
            {title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-text-muted mt-auto">
            {author && <span className="font-medium">{author.name}</span>}
            {publishedAt && (
              <>
                <span>•</span>
                <time>{new Date(publishedAt).toLocaleDateString("he-IL")}</time>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
