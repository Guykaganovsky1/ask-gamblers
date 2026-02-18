"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MobileMenu } from "./mobile-menu";

const NAV_LINKS = [
  { href: "/", label: "דף הבית", highlight: true },
  { href: "/categories", label: "תכונות" },
  { href: "/blog?cat=news", label: "חדשות מכונות מזל" },
  { href: "/casinos", label: "בתי קזינו" },
  { href: "/blog?cat=games", label: "משחקים" },
  { href: "/blog?cat=bonuses", label: "בונוסים" },
  { href: "/blog", label: "חדשות" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md">
      <div className="flex w-full items-center justify-between px-4 py-4">
        <Link href="/" className="font-heading text-2xl font-black text-text-primary tracking-tight">
          Royal Spinz
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className={`rounded-lg px-4 py-2 font-heading text-sm font-semibold transition-all duration-200 ${
                link.highlight
                  ? "bg-accent text-white hover:bg-accent-light"
                  : "text-text-muted hover:text-text-primary hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-col gap-1.5 lg:hidden"
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
