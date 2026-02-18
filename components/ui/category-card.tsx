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
    >
      <Link
        href={`/categories/${slug.current}`}
        className="group flex flex-col items-center gap-3 rounded-2xl border border-border-glass bg-card/60 p-6 text-center backdrop-blur-md transition-all hover:border-accent/30 hover:shadow-[0_0_20px_rgba(155,81,224,0.1)]"
      >
        <span className="text-4xl">{icon ? CATEGORY_ICONS[icon] || "🎲" : "🎲"}</span>
        <h3 className="font-heading text-lg font-bold group-hover:text-accent transition-colors">{name}</h3>
        {description && <p className="text-sm text-text-muted line-clamp-2">{description}</p>}
        <div className="flex gap-4 text-xs text-text-muted">
          {casinoCount !== undefined && <span>{casinoCount} קזינו</span>}
          {postCount !== undefined && <span>{postCount} מאמרים</span>}
        </div>
      </Link>
    </motion.div>
  );
}
