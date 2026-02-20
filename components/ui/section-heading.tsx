"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      className={`font-heading text-4xl font-bold text-text-primary md:text-5xl ${className}`}
    >
      {children}
      <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-l from-accent to-accent-light" />
    </motion.h2>
  );
}
