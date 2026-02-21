"use client";

const CASINO_ICONS: Record<string, React.ReactNode> = {
  dice: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="6" y="6" width="52" height="52" rx="12" fill="#A855F7" />
      <circle cx="20" cy="20" r="5" fill="white" />
      <circle cx="44" cy="20" r="5" fill="white" />
      <circle cx="20" cy="44" r="5" fill="white" />
      <circle cx="44" cy="44" r="5" fill="white" />
    </svg>
  ),
  "dice-2": (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="6" y="6" width="52" height="52" rx="12" fill="#A855F7" />
      <circle cx="32" cy="32" r="8" fill="white" />
    </svg>
  ),
  "dice-3": (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="6" y="6" width="52" height="52" rx="12" fill="#A855F7" />
      <circle cx="18" cy="18" r="5" fill="white" />
      <circle cx="32" cy="32" r="5" fill="white" />
      <circle cx="46" cy="46" r="5" fill="white" />
    </svg>
  ),
  "dice-4": (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="6" y="6" width="52" height="52" rx="12" fill="#A855F7" />
      <circle cx="18" cy="18" r="5" fill="white" />
      <circle cx="46" cy="18" r="5" fill="white" />
      <circle cx="18" cy="46" r="5" fill="white" />
      <circle cx="46" cy="46" r="5" fill="white" />
    </svg>
  ),
  blackjack: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="6" y="6" width="52" height="52" rx="12" fill="#A855F7" />
      <text x="32" y="40" textAnchor="middle" fontSize="26" fontWeight="bold" fill="white">A♠</text>
    </svg>
  ),
  baccarat: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="6" y="6" width="52" height="52" rx="12" fill="#A855F7" />
      <circle cx="20" cy="32" r="8" fill="white" />
      <circle cx="44" cy="32" r="8" fill="white" />
    </svg>
  ),
  sports: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="6" y="6" width="52" height="52" rx="12" fill="#A855F7" />
      <circle cx="32" cy="32" r="16" fill="none" stroke="white" strokeWidth="3" />
      <circle cx="32" cy="32" r="6" fill="white" />
    </svg>
  ),
  "video-poker": (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="6" y="6" width="52" height="52" rx="12" fill="#A855F7" />
      <rect x="14" y="18" width="36" height="4" rx="2" fill="white" />
      <rect x="14" y="26" width="36" height="4" rx="2" fill="white" />
      <rect x="14" y="34" width="36" height="4" rx="2" fill="white" />
      <rect x="14" y="42" width="36" height="4" rx="2" fill="white" />
    </svg>
  ),
  slots: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="6" y="6" width="52" height="52" rx="12" fill="#A855F7" />
      <rect x="16" y="16" width="32" height="32" rx="6" fill="none" stroke="white" strokeWidth="2" />
      <text x="32" y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">💰</text>
    </svg>
  ),
  poker: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="6" y="6" width="52" height="52" rx="12" fill="#A855F7" />
      <text x="32" y="42" textAnchor="middle" fontSize="30" fontWeight="bold" fill="white">♠</text>
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
