"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={onClose}
          />
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 flex h-full w-72 flex-col bg-card border-l border-border-glass p-8"
          >
            <button onClick={onClose} className="mb-8 self-start text-2xl text-text-muted hover:text-text-primary">
              ✕
            </button>
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block py-3 font-heading text-lg font-bold text-text-primary transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
