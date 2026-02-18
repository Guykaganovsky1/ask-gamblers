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
  const base = "inline-flex items-center justify-center rounded-lg px-6 py-3 font-heading font-bold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-background min-h-[44px]";
  const variants = {
    primary: "bg-accent hover:bg-accent-light active:scale-95 text-white shadow-lg hover:shadow-[0_0_24px_rgba(155,81,224,0.4)]",
    outline: "border border-accent/50 text-text-primary hover:border-accent hover:bg-accent/10 active:bg-accent/20",
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link href={href} rel={rel} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    </motion.div>
  );
}
