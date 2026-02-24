"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./mobile-menu";
import { LuxuryLogo } from "@/components/ui/luxury-logo";

const NAV_LINKS = [
  { href: "/", label: "דף הבית", highlight: true },
  { href: "/softwares", label: "ספקי תוכנה" },
  { href: "/news", label: "חדשות" },
  { href: "/casinos", label: "בתי קזינו", badge: { text: "Best", bg: "#15803d" } },
  { href: "/games", label: "משחקים", badge: { text: "Top", bg: "#0e7490" } },
  { href: "/bonuses", label: "בונוסים", badge: { text: "Hot", bg: "#b91c1c" } },
  { href: "/blog", label: "בלוג" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>

      <header
        className="sticky top-0 z-50"
        style={{
          background: "linear-gradient(180deg, rgba(11,14,20,0.98) 0%, rgba(15,10,25,0.97) 100%)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(168,85,247,0.15)",
        }}
      >
        <div className="flex w-full items-center justify-between px-6 py-3" dir="ltr">
          <LuxuryLogo />

          <nav className="hidden items-center gap-0.5 lg:flex" dir="rtl">
            {NAV_LINKS.map((link) => {
              const isHome = link.highlight;
              const isActive = isHome ? pathname === "/" : pathname.startsWith(link.href);

              if (isHome) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="mx-1 rounded-lg px-5 py-2 font-heading text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #9333EA 100%)",
                      border: "1px solid rgba(192,132,252,0.6)",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className={`relative rounded-lg px-4 py-2 font-heading text-sm font-semibold transition-all ${
                    isActive
                      ? "text-purple-300"
                      : "text-text-muted hover:text-purple-200"
                  }`}
                  style={isActive ? {
                    background: "rgba(168,85,247,0.12)",
                    border: "1px solid rgba(168,85,247,0.25)",
                  } : undefined}
                >
                  {"badge" in link && link.badge && (
                    <span
                      className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-1.5 py-0.5 text-[9px] font-extrabold text-white"
                      style={{ background: link.badge.bg }}
                    >
                      {link.badge.text}
                    </span>
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setMobileOpen(true)}
            className="flex flex-col gap-[5px] p-2 lg:hidden"
            aria-label="תפריט"
          >
            <span className="block h-[2px] w-6 rounded-full bg-text-secondary transition-colors hover:bg-purple-400" />
            <span className="block h-[2px] w-6 rounded-full bg-text-secondary transition-colors hover:bg-purple-400" />
            <span className="block h-[2px] w-4 rounded-full bg-text-secondary transition-colors hover:bg-purple-400" />
          </button>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={NAV_LINKS} />
    </>
  );
}
