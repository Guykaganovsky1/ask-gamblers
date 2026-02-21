"use client";

const CASINO_ICONS: Record<string, React.ReactNode> = {
  dice: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="diceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="48" height="48" rx="10" fill="url(#diceGrad)" />
      <circle cx="20" cy="20" r="4" fill="white" />
      <circle cx="44" cy="20" r="4" fill="white" />
      <circle cx="20" cy="44" r="4" fill="white" />
      <circle cx="44" cy="44" r="4" fill="white" />
    </svg>
  ),
  "dice-2": (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="diceGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="48" height="48" rx="10" fill="url(#diceGrad2)" />
      <circle cx="32" cy="32" r="6" fill="white" />
    </svg>
  ),
  "dice-3": (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="diceGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="48" height="48" rx="10" fill="url(#diceGrad3)" />
      <circle cx="18" cy="18" r="4" fill="white" />
      <circle cx="32" cy="32" r="4" fill="white" />
      <circle cx="46" cy="46" r="4" fill="white" />
    </svg>
  ),
  "dice-4": (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="diceGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="48" height="48" rx="10" fill="url(#diceGrad4)" />
      <circle cx="18" cy="18" r="4" fill="white" />
      <circle cx="46" cy="18" r="4" fill="white" />
      <circle cx="18" cy="46" r="4" fill="white" />
      <circle cx="46" cy="46" r="4" fill="white" />
    </svg>
  ),
  blackjack: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="10" y="10" width="44" height="44" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <text x="32" y="36" textAnchor="middle" fontSize="22" fontWeight="bold" fill="currentColor">A</text>
    </svg>
  ),
  baccarat: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="10" y="10" width="44" height="44" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="22" cy="32" r="6" fill="currentColor" />
      <circle cx="42" cy="32" r="6" fill="currentColor" />
    </svg>
  ),
  sports: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="10" y="10" width="44" height="44" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  "video-poker": (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="10" y="10" width="44" height="44" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <rect x="18" y="20" width="28" height="4" rx="2" fill="currentColor" />
      <rect x="18" y="28" width="28" height="4" rx="2" fill="currentColor" />
      <rect x="18" y="36" width="28" height="4" rx="2" fill="currentColor" />
    </svg>
  ),
  slots: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="10" y="10" width="44" height="44" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <rect x="20" y="20" width="24" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="5" fill="currentColor" />
    </svg>
  ),
  poker: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="10" y="10" width="44" height="44" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <text x="32" y="38" textAnchor="middle" fontSize="20" fontWeight="bold" fill="currentColor">♠</text>
    </svg>
  ),
};

interface CasinoIconProps {
  slug: string;
  className?: string;
}

export function CasinoIcon({ slug, className = "w-16 h-16" }: CasinoIconProps) {
  return (
    <div className={`${className} text-accent`}>
      {CASINO_ICONS[slug] || (
        <div className="w-full h-full flex items-center justify-center text-4xl">🎲</div>
      )}
    </div>
  );
}
