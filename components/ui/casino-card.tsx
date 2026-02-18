"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { StarRating } from "./star-rating";
import { AnimatedCounter } from "./animated-counter";
import { Button } from "./button";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";

interface CasinoCardProps {
  name: string;
  slug: { current: string };
  logo: SanityImage;
  rating: number;
  description: string;
  bonusTitle?: string;
  bonusAmount?: string;
  index?: number;
}

export function CasinoCard({
  name, slug, logo, rating, description, bonusTitle, bonusAmount, index = 0,
}: CasinoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: "0 0 30px rgba(155,81,224,0.15)" }}
      className="group relative overflow-hidden rounded-2xl border border-border-card bg-card-light/80 backdrop-blur-md"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative z-10 flex items-center gap-4 p-5">
        {/* Logo */}
        <div className="relative flex h-16 w-24 shrink-0 items-center justify-center">
          {logo ? (
            <Image
              src={urlFor(logo).width(192).height(128).url()}
              alt={name}
              fill
              className="object-contain"
            />
          ) : (
            <span className="font-heading text-sm font-bold text-text-muted">{name}</span>
          )}
        </div>

        {/* Info */}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="font-heading text-lg font-bold">{name}</h3>
          <StarRating rating={rating} size="sm" />
          <p className="text-xs text-text-muted line-clamp-1">{description}</p>
        </div>

        {/* Bonus */}
        {bonusAmount && (
          <div className="hidden shrink-0 text-center sm:block">
            <p className="text-[11px] text-text-muted">{bonusTitle}</p>
            <p className="font-heading text-xl font-black text-accent">
              <AnimatedCounter value={bonusAmount} />
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="flex shrink-0 flex-col gap-2">
          <Button href={`/go/${slug.current}`} rel="nofollow sponsored" className="text-xs px-4 py-2">
            שחק עכשיו
          </Button>
          <Button href={`/casinos/${slug.current}`} variant="outline" className="text-xs px-4 py-2">
            ביקורת
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
