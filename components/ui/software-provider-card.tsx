"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";

interface SoftwareProviderCardProps {
  name: string;
  slug: { current: string };
  logo?: SanityImage;
  description?: string;
  index?: number;
}

export function SoftwareProviderCard({
  name,
  logo,
  description,
  index = 0,
}: SoftwareProviderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="relative h-80"
    >
      {/* Gradient Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-accent-light to-emerald-neon p-1" />

      <div
        className="group relative flex h-full flex-col items-center justify-center gap-6 rounded-2xl bg-gradient-to-br from-card-light to-card px-6 py-8 text-center backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] cursor-default"
      >
        {/* Logo Section */}
        <div className="relative h-24 w-32">
          {logo ? (
            <Image
              src={urlFor(logo).width(256).height(192).url()}
              alt={name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-purple-900 to-purple-700 text-center">
              <span className="text-sm font-bold text-white">{name.slice(0, 2).toUpperCase()}</span>
            </div>
          )}
        </div>

        {/* Provider Name */}
        <h3 className="font-heading text-xl font-black leading-tight text-text-primary group-hover:text-accent transition-colors">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 flex-1">
          {description}
        </p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-lg bg-accent hover:bg-accent-light px-6 py-2 font-heading font-bold text-sm text-white transition-all duration-200 shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
        >
          צפו בגיימס
        </motion.button>
      </div>
    </motion.div>
  );
}
