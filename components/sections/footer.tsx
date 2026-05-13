import Link from "next/link";
import { FooterShine } from "@/components/ui/footer-shine";
import { client } from "@/sanity/lib/client";
import { CASINOS_QUERY } from "@/sanity/lib/queries";
import { Casino } from "@/sanity/lib/types";

const FOOTER_LINKS = [
  { href: "/casinos", label: "קזינו" },
  { href: "/blog", label: "בלוג" },
  { href: "/softwares", label: "ספקי תוכנה" },
];

const TRUST_LINKS = [
  { href: "/about", label: "אודות" },
  { href: "/review-methodology", label: "שיטת הדירוג" },
  { href: "/affiliate-disclosure", label: "גילוי נאות" },
  { href: "/responsible-gambling", label: "משחק אחראי" },
  { href: "/contact", label: "צור קשר" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "פרטיות" },
  { href: "/terms", label: "תנאי שימוש" },
];

async function getTopCasinos() {
  try {
    const casinos = await client.fetch<Casino[]>(CASINOS_QUERY);
    return casinos ?? [];
  } catch {
    return [];
  }
}

export async function Footer() {
  const casinos = await getTopCasinos();
  return (
    <footer className="relative border-t border-border-glass bg-card/40 overflow-hidden">
      <FooterShine />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12">
        {/* Top Rated Casinos - Premium Showcase */}
        {casinos.length > 0 && (
          <div className="mb-16 pb-12 border-b border-border-glass/20">
            <style>{`
              @keyframes cardGlow {
                0%, 100% {
                  box-shadow: 0 8px 24px rgba(168, 85, 247, 0.15);
                  border-color: rgba(168, 85, 247, 0.2);
                }
                50% {
                  box-shadow: 0 12px 36px rgba(168, 85, 247, 0.25);
                  border-color: rgba(168, 85, 247, 0.35);
                }
              }

              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: translateY(12px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              .casino-card {
                animation: slideIn 0.6s ease-out forwards;
              }

              .casino-card:nth-child(1) { animation-delay: 0.05s; }
              .casino-card:nth-child(2) { animation-delay: 0.1s; }
              .casino-card:nth-child(3) { animation-delay: 0.15s; }
              .casino-card:nth-child(4) { animation-delay: 0.2s; }
              .casino-card:nth-child(5) { animation-delay: 0.25s; }
              .casino-card:nth-child(6) { animation-delay: 0.3s; }

              .premium-badge {
                position: absolute;
                top: 1px;
                right: 12px;
                background: linear-gradient(135deg, #D4AF37, #F4E4C1);
                color: #0A0A0F;
                font-size: 12px;
                font-weight: 900;
                padding: 5px 12px;
                border-radius: 6px;
                text-transform: uppercase;
                letter-spacing: 0.8px;
                box-shadow: 0 2px 8px rgba(212, 175, 55, 0.5);
                z-index: 20;
              }
            `}</style>

            {/* Section Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent rounded-lg blur-lg opacity-40" />
                  <div className="relative w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-xl">♔</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-3xl md:text-4xl font-black text-text-primary">
                    קזינו מדורגים
                  </h3>
                  <p className="text-xs text-text-muted/70 mt-1 font-medium tracking-wide">קזינו מובחרים ומדורגים</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-lg text-xs font-bold text-accent">
                  ★★★★★
                </span>
              </div>
            </div>

            {/* Casino Cards Grid */}
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {casinos.slice(0, 8).map((casino, i) => (
                <div
                  key={casino._id}
                  className="casino-card group relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-card/60 to-card/20 p-5 backdrop-blur-sm hover:from-card/80 hover:to-card/40 transition-all duration-500 hover:shadow-2xl hover:border-accent/40"
                >
                  {/* Accent Glow Background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
                  </div>

                  {/* Badge */}
                  {i === 0 && <div className="premium-badge">⭐ המובחר</div>}

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full gap-4">
                    {/* Icon & Rating */}
                    <div className="flex items-start justify-between gap-3">
                      <div className={`relative flex-shrink-0 w-20 h-20 rounded-xl flex items-center justify-center text-3xl font-black text-white shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                        [
                          'bg-gradient-to-br from-yellow-400 to-yellow-500',
                          'bg-gradient-to-br from-blue-500 to-blue-600',
                          'bg-gradient-to-br from-teal-500 to-teal-600',
                          'bg-gradient-to-br from-purple-600 to-purple-700',
                          'bg-gradient-to-br from-gray-700 to-gray-800',
                          'bg-gradient-to-br from-red-500 to-red-600',
                          'bg-gradient-to-br from-red-600 to-red-700',
                          'bg-gradient-to-br from-blue-600 to-blue-700'
                        ][i % 8]
                      }`}>
                        {casino.icon || '🎰'}
                      </div>

                      {/* Stars */}
                      <div className="flex flex-col gap-1 items-end">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <span key={idx} className="text-lg">
                              {idx < Math.round(casino.rating) ? '★' : '☆'}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs font-bold text-accent">{casino.rating?.toFixed(1)}/5</span>
                      </div>
                    </div>

                    {/* Casino Info */}
                    <div className="flex-1">
                      <h4 className="font-heading font-black text-lg text-text-primary group-hover:text-accent transition-colors duration-300 mb-2">
                        {casino.name}
                      </h4>
                      <p className="text-sm text-text-muted/80 leading-relaxed line-clamp-2">
                        {casino.description || 'קזינו מובחר עם בונוסים מעולים וחוויה משחק פריימיום'}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2 border-t border-accent/10">
                      <Link
                        href={`/go/${casino.slug.current}`}
                        rel="nofollow sponsored"
                        className="block w-full py-2 px-3 bg-accent/90 hover:bg-accent text-white font-bold text-sm rounded-lg transition-all duration-300 transform group-hover:scale-105 active:scale-95 text-center"
                      >
                        בדוק עכשיו
                      </Link>
                    </div>
                  </div>

                  {/* Hover Border Animation */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
                    animation: 'cardGlow 3s ease-in-out infinite'
                  }} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="font-heading text-xl font-black text-accent">
              Ask Gamblers
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-muted">
              מדריך עברי לבדיקת קזינו אונליין, בונוסים, תשלומים ומשחק אחראי לשחקנים ישראלים.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <nav aria-label="ניווט ראשי">
              <h4 className="font-heading text-sm font-bold text-text-primary">ניווט</h4>
              <div className="mt-3 grid gap-2">
                {FOOTER_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
            <nav aria-label="אמון ושקיפות">
              <h4 className="font-heading text-sm font-bold text-text-primary">אמון ושקיפות</h4>
              <div className="mt-3 grid gap-2">
                {TRUST_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
            <nav aria-label="משפטי">
              <h4 className="font-heading text-sm font-bold text-text-primary">משפטי</h4>
              <div className="mt-3 grid gap-2">
                {LEGAL_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t border-border-glass pt-8 text-center text-xs text-text-muted">
          <p className="mx-auto max-w-2xl">
            הימורים עלולים לגרום להתמכרות. שחק באחריות. מותר מגיל 18+ בלבד.
            האתר מכיל קישורי שותפים.
          </p>
          <p className="mt-4">&copy; {new Date().getFullYear()} Ask Gamblers. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
}
