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
  const base = "inline-flex items-center justify-center rounded-lg px-6 py-3 font-heading font-bold text-sm transition-all duration-300";
  const variants = {
    primary: "bg-accent text-white hover:bg-accent-light hover:shadow-[0_0_24px_rgba(155,81,224,0.4)]",
    outline: "border border-text-muted/30 text-text-primary hover:border-accent hover:text-accent",
  };

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <Link href={href} rel={rel} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    </motion.div>
  );
}
