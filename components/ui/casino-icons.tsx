"use client";

const CASINO_ICONS: Record<string, React.ReactNode> = {
  dice: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="6" y="6" width="52" height="52" rx="12" fill="#A855F7" />
      <circle cx="32" cy="32" r="12" fill="none" stroke="white" strokeWidth="3" />
      <text x="32" y="40" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">777</text>
    </svg>
  ),
  "dice-2": (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="6" y="6" width="52" height="52" rx="12" fill="#A855F7" />
      <circle cx="20" cy="32" r="6" fill="white" />
      <circle cx="44" cy="32" r="6" fill="white" />
    </svg>
  ),
  "dice-3": (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="6" y="6" width="52" height="52" rx="12" fill="#A855F7" />
      <polygon points="32,14 38,28 26,28" fill="white" />
    </svg>
  ),
  "dice-4": (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="6" y="6" width="52" height="52" rx="12" fill="#A855F7" />
      <circle cx="32" cy="32" r="14" fill="none" stroke="white" strokeWidth="2" />
      <circle cx="32" cy="32" r="6" fill="white" />
    </svg>
  ),
  blackjack: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="6" y="6" width="52" height="52" rx="12" fill="#A855F7" />
      <text x="32" y="40" textAnchor="middle" fontSize="24" fontWeight="bold" fill="white">A♠</text>
    </svg>
  ),
  baccarat: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="6" y="6" width="52" height="52" rx="12" fill="#A855F7" />
      <text x="32" y="40" textAnchor="middle" fontSize="22" fontWeight="bold" fill="white">B</text>
    </svg>
  ),
  sports: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect x="6" y="6" width="52" height="52" rx="12" fill="#A855F7" />
      <circle cx="32" cy="32" r="14" fill="none" stroke="white" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="5" fill="white" />
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
      <text x="32" y="42" textAnchor="middle" fontSize="28" fontWeight="bold" fill="white">♠</text>
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
