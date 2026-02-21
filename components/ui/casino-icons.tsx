"use client";

const CASINO_ICONS: Record<string, React.ReactNode> = {
  dice: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="8" y="8" width="48" height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="4" fill="currentColor" />
      <circle cx="44" cy="20" r="4" fill="currentColor" />
      <circle cx="20" cy="44" r="4" fill="currentColor" />
      <circle cx="44" cy="44" r="4" fill="currentColor" />
    </svg>
  ),
  "dice-2": (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="8" y="8" width="48" height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="5" fill="currentColor" />
    </svg>
  ),
  "dice-3": (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="8" y="8" width="48" height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="18" cy="18" r="4" fill="currentColor" />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
      <circle cx="46" cy="46" r="4" fill="currentColor" />
    </svg>
  ),
  "dice-4": (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="8" y="8" width="48" height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="18" cy="18" r="4" fill="currentColor" />
      <circle cx="46" cy="18" r="4" fill="currentColor" />
      <circle cx="18" cy="46" r="4" fill="currentColor" />
      <circle cx="46" cy="46" r="4" fill="currentColor" />
    </svg>
  ),
  blackjack: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="12" y="8" width="40" height="48" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="32" y="38" textAnchor="middle" fontSize="24" fontWeight="bold" fill="currentColor">♠</text>
      <text x="32" y="50" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">A</text>
    </svg>
  ),
  baccarat: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="44" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="44" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="20" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor">K</text>
      <text x="44" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor">Q</text>
      <text x="32" y="49" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor">J</text>
    </svg>
  ),
  sports: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 32 L20 32 M44 32 L52 32 M32 12 L32 20 M32 44 L32 52" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
    </svg>
  ),
  "video-poker": (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="8" y="12" width="48" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="32" r="6" fill="currentColor" />
      <circle cx="32" cy="32" r="6" fill="currentColor" />
      <circle cx="44" cy="32" r="6" fill="currentColor" />
      <line x1="8" y1="52" x2="56" y2="52" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  slots: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="10" y="8" width="44" height="48" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="16" y="14" width="32" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="22" cy="28" r="4" fill="currentColor" />
      <circle cx="32" cy="28" r="4" fill="currentColor" />
      <circle cx="42" cy="28" r="4" fill="currentColor" />
      <rect x="14" y="48" width="36" height="4" fill="currentColor" />
    </svg>
  ),
  poker: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <g transform="translate(16, 8)">
        <rect x="0" y="0" width="16" height="24" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="8" y="12" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor">♣</text>
        <text x="8" y="22" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor">K</text>
      </g>
      <g transform="translate(18, 16)">
        <rect x="0" y="0" width="16" height="24" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="8" y="12" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor">♦</text>
        <text x="8" y="22" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor">Q</text>
      </g>
      <g transform="translate(20, 24)">
        <rect x="0" y="0" width="16" height="24" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="8" y="12" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor">♥</text>
        <text x="8" y="22" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor">J</text>
      </g>
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
