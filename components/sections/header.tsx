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
  { href: "/casinos", label: "בתי קזינו", badge: { text: "Best", bg: "#16a34a" } },
  { href: "/games", label: "משחקים", badge: { text: "Top", bg: "#0891b2" } },
  { href: "/bonuses", label: "בונוסים", badge: { text: "Hot", bg: "#dc2626" } },
  { href: "/blog", label: "בלוג" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <style>{`
        /* ── Neon home button glow pulse ── */
        @keyframes homePulse {
          0%, 100% {
            box-shadow:
              0 0 5px rgba(168,85,247,0.5),
              0 0 14px rgba(168,85,247,0.3),
              0 0 28px rgba(168,85,247,0.15),
              inset 0 1px 0 rgba(255,255,255,0.1);
          }
          50% {
            box-shadow:
              0 0 8px rgba(192,132,252,0.65),
              0 0 20px rgba(168,85,247,0.4),
              0 0 40px rgba(168,85,247,0.2),
              inset 0 1px 0 rgba(255,255,255,0.15);
          }
        }

        /* ── Shine sweep ── */
        @keyframes homeShine {
          0%   { transform: translateX(-150%); opacity: 0; }
          15%  { opacity: 0.7; }
          85%  { opacity: 0.4; }
          100% { transform: translateX(150%); opacity: 0; }
        }

        /* ── Neon scan line on header bottom ── */
        @keyframes scanPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }

        /* ── Nav link hover glow ── */
        @keyframes navGlow {
          0%, 100% { text-shadow: 0 0 8px rgba(168,85,247,0.6); }
          50%       { text-shadow: 0 0 16px rgba(192,132,252,0.9); }
        }

        .home-btn {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #9333EA 100%);
          animation: homePulse 2.8s ease-in-out infinite;
          border: 1px solid rgba(192,132,252,0.6);
          transition: transform 0.15s ease;
        }
        .home-btn:hover {
          transform: translateY(-1px) scale(1.03);
        }
        .home-btn::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 60%; height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.35),
            transparent
          );
          animation: homeShine 3s ease-in-out infinite;
          pointer-events: none;
        }

        .nav-link {
          position: relative;
          transition: all 0.2s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 80%; height: 1px;
          background: linear-gradient(90deg, transparent, #A855F7, transparent);
          transition: transform 0.25s ease;
        }
        .nav-link:hover::after {
          transform: translateX(-50%) scaleX(1);
        }
        .nav-link:hover {
          color: #D8B4FE;
          text-shadow: 0 0 12px rgba(168,85,247,0.7);
        }

        .nav-active {
          color: #C084FC;
          background: rgba(168,85,247,0.12);
          border: 1px solid rgba(168,85,247,0.25);
          text-shadow: 0 0 10px rgba(168,85,247,0.6);
          box-shadow: inset 0 0 12px rgba(168,85,247,0.08);
        }
        .nav-active::after {
          transform: translateX(-50%) scaleX(1) !important;
        }

        .header-scanline {
          animation: scanPulse 3s ease-in-out infinite;
        }

        .burger-line {
          transition: background 0.2s ease, box-shadow 0.2s ease;
        }
        .burger-btn:hover .burger-line {
          background: #A855F7;
          box-shadow: 0 0 6px rgba(168,85,247,0.7);
        }

        @keyframes badgePop {
          0%, 100% { transform: translateX(-50%) scale(1); }
          50%       { transform: translateX(-50%) scale(1.1); }
        }
        .nav-badge {
          position: absolute;
          top: -9px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 9px;
          font-weight: 800;
          line-height: 1;
          padding: 2px 6px;
          border-radius: 999px;
          color: #fff;
          white-space: nowrap;
          letter-spacing: 0.04em;
          pointer-events: none;
          animation: badgePop 2.5s ease-in-out infinite;
        }
      `}</style>

      <header className="sticky top-0 z-50 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(11,14,20,0.98) 0%, rgba(15,10,25,0.97) 100%)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(168,85,247,0.15)",
        }}
      >
        {/* Neon bottom scanline */}
        <div
          className="header-scanline absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.6) 20%, rgba(192,132,252,0.9) 50%, rgba(168,85,247,0.6) 80%, transparent 100%)",
          }}
        />

        {/* Subtle top inner glow */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.2), transparent)",
          }}
        />

        <div className="relative z-10 flex w-full items-center justify-between px-6 py-3" dir="ltr">

          {/* Logo */}
          <LuxuryLogo />

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-0.5 lg:flex" dir="rtl">
            {NAV_LINKS.map((link) => {
              const isHome = link.highlight;
              const isActive = isHome ? pathname === "/" : pathname.startsWith(link.href);

              if (isHome) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="home-btn mx-1 rounded-lg px-5 py-2 font-heading text-sm font-bold text-white"
                  >
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className={`nav-link relative rounded-lg px-4 py-2 font-heading text-sm font-semibold ${
                    isActive
                      ? "nav-active"
                      : "text-text-muted"
                  }`}
                >
                  {"badge" in link && link.badge && (
                    <span
                      className="nav-badge"
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

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="burger-btn flex flex-col gap-[5px] lg:hidden p-2"
            aria-label="תפריט"
          >
            <span className="burger-line block h-[2px] w-6 rounded-full bg-text-secondary" />
            <span className="burger-line block h-[2px] w-6 rounded-full bg-text-secondary" />
            <span className="burger-line block h-[2px] w-4 rounded-full bg-text-secondary" />
          </button>
        </div>

      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={NAV_LINKS} />
    </>
  );
}
