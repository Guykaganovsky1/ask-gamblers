"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface BonusCardProps {
  casino: string;
  bonus: string;
  description: string;
  disclaimer?: string;
  color: string;
  icon: string;
  index?: number;
}

export function BonusCard({
  casino,
  bonus,
  description,
  disclaimer = "*New users only",
  color,
  icon,
  index = 0,
}: BonusCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="flex flex-col h-full rounded-2xl overflow-hidden border border-border-glass bg-card hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all duration-300"
    >
      {/* Icon/Color Section */}
      <div className={`${color} h-32 flex items-center justify-center text-6xl`}>
        {icon}
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col gap-4 p-6">
        {/* Casino Name */}
        <h3 className="font-heading text-sm text-text-muted">{casino}</h3>

        {/* Bonus Text */}
        <h2 className="font-heading text-xl font-black leading-tight text-text-primary">
          {bonus}
        </h2>

        {/* Description */}
        <p className="text-xs text-text-muted leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        {/* Disclaimer */}
        <p className="text-xs text-text-muted italic">{disclaimer}</p>

        {/* Button */}
        <Button href="#" className="w-full mt-auto">
          קבל בונוס
        </Button>
      </div>
    </motion.div>
  );
}
