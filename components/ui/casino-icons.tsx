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
      <rect x="8" y="8" width="48" height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <text x="32" y="36" textAnchor="middle" fontSize="22" fontWeight="bold" fill="currentColor">A♠</text>
    </svg>
  ),
  baccarat: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="8" y="8" width="48" height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="20" cy="32" r="7" fill="currentColor" />
      <circle cx="44" cy="32" r="7" fill="currentColor" />
    </svg>
  ),
  sports: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="8" y="8" width="48" height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="5" fill="currentColor" />
    </svg>
  ),
  "video-poker": (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="8" y="8" width="48" height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <rect x="14" y="18" width="36" height="4" rx="2" fill="currentColor" />
      <rect x="14" y="26" width="36" height="4" rx="2" fill="currentColor" />
      <rect x="14" y="34" width="36" height="4" rx="2" fill="currentColor" />
      <rect x="14" y="42" width="36" height="4" rx="2" fill="currentColor" />
    </svg>
  ),
  slots: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="8" y="8" width="48" height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <rect x="16" y="16" width="32" height="32" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="32" y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor">💰</text>
    </svg>
  ),
  poker: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="8" y="8" width="48" height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <text x="32" y="40" textAnchor="middle" fontSize="26" fontWeight="bold" fill="currentColor">♠</text>
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
        <div className="w-full h-full flex items-center justify-center text-4xl">♠️</div>
      )}
    </div>
  );
}
