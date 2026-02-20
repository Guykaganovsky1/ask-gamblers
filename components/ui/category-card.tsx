"use client";

import { motion } from "framer-motion";
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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ delay: index * 0.08 }}
      className="relative h-64"
    >
      {/* Gradient Border Background - Split color gradient: purple on left, emerald on right */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-accent-light to-emerald-neon p-1" />

      <Link
        href={`/softwares/${slug.current}`}
        className="group relative flex h-full flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-br from-card-light to-card px-6 py-8 text-center backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]"
      >
        {/* Icon - Fixed size at top */}
        <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
          <CasinoIcon slug={icon || slug.current} className="w-20 h-20" />
        </div>

        {/* Center content - Takes available space */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2 w-full">
          <h3 className="font-heading text-lg font-black group-hover:text-accent transition-colors leading-tight">
            {name}
          </h3>
          {description && <p className="text-xs text-text-muted line-clamp-2">{description}</p>}
        </div>

        {/* Stats at bottom - Fixed */}
        <div className="flex-shrink-0 flex gap-4 text-xs text-text-muted font-medium">
          {casinoCount !== undefined && <span>{casinoCount} קזינו</span>}
          {postCount !== undefined && <span>{postCount} מאמרים</span>}
        </div>
      </Link>
    </motion.div>
  );
}
