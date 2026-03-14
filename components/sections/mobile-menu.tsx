"use client";

import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string; badge?: { text: string; bg: string } }[];
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  return (
    <LazyMotion features={domAnimation}>
    <AnimatePresence>
      {open && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={onClose}
          />
          <m.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[60] flex h-full w-72 flex-col overflow-hidden"
          >
            {/* Background gradient with blur */}
            <div className="absolute inset-0 bg-gradient-to-b from-card-light/95 via-card/95 to-background/98 backdrop-blur-xl" />

            {/* Decorative gradient border */}
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-accent via-emerald-neon to-accent opacity-60" />

            {/* Shine effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{
                background: 'linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.1) 50%, transparent 100%)',
              }} />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full w-full flex-col p-8">
              <button onClick={onClose} className="mb-8 self-start text-2xl text-text-muted hover:text-accent transition-colors">
                ✕
              </button>
              {links.map((link, i) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center gap-3 py-4 px-3 font-heading text-lg font-bold text-text-primary transition-all duration-200 hover:text-accent hover:bg-white/5 rounded-lg"
                  >
                    {link.label}
                    {link.badge && (
                      <span
                        className="text-[9px] font-extrabold px-2 py-0.5 rounded-full text-white leading-none"
                        style={{ background: link.badge.bg }}
                      >
                        {link.badge.text}
                      </span>
                    )}
                  </Link>
                </m.div>
              ))}
            </div>
          </m.nav>
        </>
      )}
    </AnimatePresence>
    </LazyMotion>
  );
}

export default MobileMenu;
