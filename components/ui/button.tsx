"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

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
    <>
      <style>{`
        @keyframes buttonShine {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .button-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.4) 25%,
            rgba(255, 255, 255, 0.7) 50%,
            rgba(255, 255, 255, 0.4) 75%,
            transparent 100%
          );
          animation: buttonShine 3s ease-in-out infinite;
          width: 200%;
          pointer-events: none;
          border-radius: inherit;
        }
      `}</style>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative">
        <Link href={href} rel={rel} className={`relative ${base} ${variants[variant]} ${className} overflow-hidden`}>
          {variant === "primary" && <div className="button-shine" />}
          <span className="relative z-10">{children}</span>
        </Link>
      </motion.div>
    </>
  );
}
