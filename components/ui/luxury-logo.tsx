"use client";

import Link from "next/link";

export function LuxuryLogo() {
  return (
    <Link href="/" className="group flex items-center gap-3" style={{ direction: "ltr" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap');

        @keyframes slotGlow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(168,85,247,0.4)); }
          50%       { filter: drop-shadow(0 0 16px rgba(168,85,247,0.85)); }
        }
        @keyframes leverBounce {
          0%, 100% { transform: rotate(0deg); }
          20%      { transform: rotate(-18deg); }
          50%      { transform: rotate(5deg); }
        }

        .slot-machine {
          animation: slotGlow 3.5s ease-in-out infinite;
          transition: transform 0.3s ease;
        }
        .group:hover .slot-machine {
          transform: scale(1.06);
        }
        .slot-lever {
          transform-origin: 36px 11px;
        }
        .group:hover .slot-lever {
          animation: leverBounce 0.8s ease-in-out forwards;
        }

        .logo-name-ask {
          font-family: 'Cinzel', 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
          font-weight: 700;
          font-size: 1.15rem;
          letter-spacing: 0.15em;
          background: linear-gradient(160deg, #fff 0%, #D8B4FE 60%, #A855F7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .logo-name-gamblers {
          font-family: 'Cinzel', 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
          font-weight: 700;
          font-size: 1.15rem;
          letter-spacing: 0.18em;
          background: linear-gradient(160deg, #D8B4FE 0%, #A855F7 60%, #7C3AED 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
      `}</style>

      {/* ── Slot Machine Icon ── */}
      <svg
        className="slot-machine h-11 w-auto flex-shrink-0"
        viewBox="0 0 48 52"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Slot machine"
      >
        <defs>
          <linearGradient id="sl-purple" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#D8B4FE"/>
            <stop offset="45%"  stopColor="#A855F7"/>
            <stop offset="100%" stopColor="#7C3AED"/>
          </linearGradient>
          <linearGradient id="sl-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1e1030"/>
            <stop offset="100%" stopColor="#0d0818"/>
          </linearGradient>
          <linearGradient id="sl-top" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#D8B4FE"/>
            <stop offset="50%"  stopColor="#A855F7"/>
            <stop offset="100%" stopColor="#7C3AED"/>
          </linearGradient>
        </defs>

        {/* Top light bar */}
        <rect x="3" y="2" width="36" height="4" rx="2" fill="url(#sl-top)"/>

        {/* Machine body */}
        <rect x="3" y="6" width="36" height="35" rx="4" fill="url(#sl-body)" stroke="url(#sl-purple)" strokeWidth="1.4"/>

        {/* Reel window frame */}
        <rect x="7" y="11" width="28" height="18" rx="2.5" fill="#06020f" stroke="#A855F7" strokeWidth="1"/>

        {/* Reel dividers */}
        <line x1="16.3" y1="11" x2="16.3" y2="29" stroke="#A855F7" strokeWidth="0.7" opacity="0.55"/>
        <line x1="25.7" y1="11" x2="25.7" y2="29" stroke="#A855F7" strokeWidth="0.7" opacity="0.55"/>

        {/* Reel 1 — "7" */}
        <text x="11.5" y="24.5" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" fontWeight="bold" fill="#A855F7">7</text>
        {/* Reel 2 — "★" */}
        <text x="21"   y="24"   textAnchor="middle" fontFamily="serif"          fontSize="11"             fill="#D8B4FE">★</text>
        {/* Reel 3 — "7" */}
        <text x="30.5" y="24.5" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" fontWeight="bold" fill="#A855F7">7</text>

        {/* Win line */}
        <line x1="7" y1="20" x2="35" y2="20" stroke="#10B981" strokeWidth="0.6" strokeDasharray="2 1.5" opacity="0.6"/>

        {/* Lever arm */}
        <g className="slot-lever">
          <rect x="37" y="11" width="3.5" height="18" rx="1.75" fill="url(#sl-purple)"/>
          <circle cx="38.75" cy="11" r="3.2" fill="#D8B4FE" stroke="#7C3AED" strokeWidth="0.8"/>
        </g>

        {/* Coin slot */}
        <rect x="18" y="33" width="8" height="2" rx="1" fill="#A855F7" opacity="0.6"/>

        {/* Bottom base */}
        <rect x="3" y="38" width="36" height="5" rx="3" fill="url(#sl-purple)" opacity="0.35"/>

        {/* Legs */}
        <rect x="8"  y="42" width="5" height="8" rx="2" fill="#A855F7" opacity="0.4"/>
        <rect x="29" y="42" width="5" height="8" rx="2" fill="#A855F7" opacity="0.4"/>
      </svg>

      {/* ── Wordmark ── */}
      <div className="flex flex-col leading-none gap-[3px]">
        <span className="logo-name-ask">ASK</span>
        <span className="logo-name-gamblers">GAMBLERS</span>
      </div>
    </Link>
  );
}
