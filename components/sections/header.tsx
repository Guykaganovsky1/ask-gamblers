"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MobileMenu } from "./mobile-menu";

const NAV_LINKS = [
  { href: "/", label: "ראשי" },
  { href: "/casinos", label: "קזינו" },
  { href: "/blog", label: "בלוג" },
  { href: "/categories", label: "קטגוריות" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-glass bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-heading text-2xl font-black text-gold">
          קזינו רז
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative font-heading text-sm font-semibold text-text-primary transition-colors hover:text-gold"
            >
              {link.label}
              <motion.span
                className="absolute -bottom-1 right-0 h-0.5 w-0 bg-gold"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="תפריט"
        >
          <span className="block h-0.5 w-6 bg-text-primary" />
          <span className="block h-0.5 w-6 bg-text-primary" />
          <span className="block h-0.5 w-4 bg-text-primary" />
        </button>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={NAV_LINKS} />
    </header>
  );
}
