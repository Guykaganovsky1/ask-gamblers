"use client";

import { useInViewOnce } from "@/lib/animations";
import Link from "next/link";
import { CasinoIcon } from "./casino-icons";

interface CategoryCardProps {
  name: string;
  slug: { current: string };
  description?: string;
  icon?: string;
  casinoCount?: number;
  postCount?: number;
  index?: number;
}

export function CategoryCard({ name, slug, description, icon, casinoCount, postCount, index = 0 }: CategoryCardProps) {
  const { ref, isInView } = useInViewOnce(0.1);
  const iconSlugs = ["slots", "poker", "blackjack", "sports", "baccarat", "video-poker"];
  const iconSlug = icon || iconSlugs[index % iconSlugs.length];
  
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative h-64 ${isInView ? "animate-slide-up" : "opacity-0"}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-accent-light to-emerald-neon p-1" />

      <Link
        href={`/softwares/${slug.current}`}
        className="group relative flex h-full flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-br from-card-light to-card px-6 py-8 text-center backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]"
      >
        <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
          <CasinoIcon slug={iconSlug} className="w-20 h-20" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-2 w-full">
          <h3 className="font-heading text-lg font-black group-hover:text-accent transition-colors leading-tight">
            {name}
          </h3>
          {description && <p className="text-xs text-text-muted line-clamp-2">{description}</p>}
        </div>

        <div className="flex-shrink-0 flex gap-4 text-xs text-text-muted font-medium">
          {casinoCount !== undefined && <span>{casinoCount} קזינו</span>}
          {postCount !== undefined && <span>{postCount} מאמרים</span>}
        </div>
      </Link>
    </div>
  );
}