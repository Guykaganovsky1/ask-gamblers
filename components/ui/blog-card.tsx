"use client";

import { motion } from "framer-motion";
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
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={`/blog/${slug.current}`} className="group block overflow-hidden rounded-2xl border border-border-glass bg-card/60 backdrop-blur-md transition-all hover:border-gold/20">
        {featuredImage && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={urlFor(featuredImage).width(640).height(360).url()}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5">
          <h3 className="font-heading text-lg font-bold leading-tight group-hover:text-gold transition-colors">
            {title}
          </h3>
          <div className="mt-3 flex items-center gap-2 text-xs text-text-muted">
            {author && <span>{author.name}</span>}
            {publishedAt && (
              <>
                <span>•</span>
                <time>{new Date(publishedAt).toLocaleDateString("he-IL")}</time>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
