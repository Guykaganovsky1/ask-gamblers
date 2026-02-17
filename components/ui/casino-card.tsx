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
      whileHover={{ y: -6, boxShadow: "0 0 30px rgba(212,175,55,0.15)" }}
      className="group relative overflow-hidden rounded-2xl border border-border-glass bg-card/80 p-6 backdrop-blur-md"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gold/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <div className="relative h-16 w-32">
          <Image
            src={urlFor(logo).width(256).height(128).url()}
            alt={name}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="font-heading text-xl font-bold">{name}</h3>
        <StarRating rating={rating} />
        {bonusAmount && (
          <div className="rounded-lg bg-gold/10 px-4 py-2">
            <p className="text-xs text-text-muted">{bonusTitle}</p>
            <p className="font-heading text-lg font-bold text-gold">
              <AnimatedCounter value={bonusAmount} />
            </p>
          </div>
        )}
        <p className="text-sm text-text-muted line-clamp-2">{description}</p>
        <div className="flex gap-3">
          <Button href={`/go/${slug.current}`} rel="nofollow sponsored">
            שחק עכשיו
          </Button>
          <Button href={`/casinos/${slug.current}`} variant="outline">
            קרא ביקורת
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
