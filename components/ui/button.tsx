"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  rel?: string;
  className?: string;
}

export function Button({ href, children, variant = "primary", rel, className = "" }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-xl px-6 py-3 font-heading font-bold text-sm transition-all duration-300";
  const variants = {
    primary: "bg-gradient-to-l from-gold to-gold-light text-background hover:shadow-[0_0_24px_rgba(212,175,55,0.4)]",
    outline: "border border-gold/40 text-gold hover:bg-gold/10",
  };

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <Link href={href} rel={rel} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    </motion.div>
  );
}
