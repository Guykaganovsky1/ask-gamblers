"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const CATEGORY_ICONS: Record<string, string> = {
  slots: "🎰",
  poker: "🃏",
  live: "🎥",
  sports: "⚽",
  roulette: "🎡",
  blackjack: "🂡",
};

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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="relative h-48"
    >
      {/* Gradient Border Background - Split color gradient: purple on left, emerald on right */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-accent-light to-emerald-neon p-1" />

      <Link
        href={`/categories/${slug.current}`}
        className="group relative flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-card-light to-card px-6 py-8 text-center backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]"
      >
        <span className="text-5xl transition-transform duration-300 group-hover:scale-110">{icon ? CATEGORY_ICONS[icon] || "🎲" : "🎲"}</span>
        <div className="flex flex-col gap-2 flex-1 justify-center">
          <h3 className="font-heading text-lg font-black group-hover:text-accent transition-colors leading-tight">
            {name}
          </h3>
          {description && <p className="text-xs text-text-muted line-clamp-2">{description}</p>}
        </div>
        <div className="flex gap-4 text-xs text-text-muted font-medium mt-2">
          {casinoCount !== undefined && <span>{casinoCount} קזינו</span>}
          {postCount !== undefined && <span>{postCount} מאמרים</span>}
        </div>
      </Link>
    </motion.div>
  );
}
