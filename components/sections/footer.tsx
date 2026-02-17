import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/casinos", label: "קזינו" },
  { href: "/blog", label: "בלוג" },
  { href: "/categories", label: "קטגוריות" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-glass bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <Link href="/" className="font-heading text-xl font-black text-gold">
            קזינו רז
          </Link>
          <nav className="flex gap-6">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-border-glass pt-8 text-center text-xs text-text-muted">
          <p className="mx-auto max-w-2xl">
            הימורים עלולים לגרום להתמכרות. שחק באחריות. מותר מגיל 18+ בלבד.
            האתר מכיל קישורי שותפים.
          </p>
          <p className="mt-4">&copy; {new Date().getFullYear()} קזינו רז. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
}
