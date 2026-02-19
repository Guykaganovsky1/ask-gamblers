"use client";

import { useState } from "react";
import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { HeaderShine } from "@/components/ui/header-shine";
import { LuxuryLogo } from "@/components/ui/luxury-logo";

const NAV_LINKS = [
  { href: "/", label: "דף הבית", highlight: true },
  { href: "/categories", label: "תכונות" },
  { href: "/news", label: "חדשות" },
  { href: "/casinos", label: "בתי קזינו" },
  { href: "/blog?cat=games", label: "משחקים" },
  { href: "/blog?cat=bonuses", label: "בונוסים" },
  { href: "/blog", label: "בלוג" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes navShine {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .nav-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 25%,
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0.3) 75%,
            transparent 100%
          );
          animation: navShine 4s ease-in-out infinite;
          width: 200%;
          pointer-events: none;
          border-radius: inherit;
        }
      `}</style>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md relative overflow-hidden">
        <HeaderShine />
        <div className="relative z-10 flex w-full items-center justify-between px-4 py-4">
        <LuxuryLogo />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <div key={link.href + link.label} className={link.highlight ? "relative" : ""}>
              <Link
                href={link.href}
                className={`relative rounded-lg px-4 py-2 font-heading text-sm font-semibold transition-all duration-200 inline-flex items-center ${
                  link.highlight
                    ? "bg-accent text-white hover:bg-accent-light overflow-hidden"
                    : "text-text-muted hover:text-text-primary hover:bg-white/5"
                }`}
              >
                {link.highlight && <div className="nav-shine" />}
                <span className={link.highlight ? "relative z-10" : ""}>{link.label}</span>
              </Link>
            </div>
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
    </>
  );
}
