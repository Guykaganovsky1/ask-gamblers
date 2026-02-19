"use client";

import Link from "next/link";

export function LuxuryLogo() {
  return (
    <Link href="/" className="group flex items-center gap-3" style={{ direction: "ltr" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap');

        @keyframes slotGlow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(212,175,55,0.35)); }
          50%       { filter: drop-shadow(0 0 16px rgba(212,175,55,0.75)); }
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

        .logo-name-royal {
          font-family: 'Cinzel', 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
          font-weight: 700;
          font-size: 1.15rem;
          letter-spacing: 0.18em;
          background: linear-gradient(160deg, #FFE878 0%, #D4AF37 45%, #A07820 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .logo-name-spinz {
          font-family: 'Cinzel', 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
          font-weight: 700;
          font-size: 1.15rem;
          letter-spacing: 0.22em;
          background: linear-gradient(160deg, #F0F0F0 0%, #C0C0C0 50%, #888 100%);
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
          <linearGradient id="sl-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#FFE878"/>
            <stop offset="40%"  stopColor="#D4AF37"/>
            <stop offset="100%" stopColor="#8B6914"/>
          </linearGradient>
          <linearGradient id="sl-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#22223a"/>
            <stop offset="100%" stopColor="#0d0d1a"/>
          </linearGradient>
          <linearGradient id="sl-top" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#FFE878"/>
            <stop offset="50%"  stopColor="#D4AF37"/>
            <stop offset="100%" stopColor="#8B6914"/>
          </linearGradient>
        </defs>

        {/* Top light bar */}
        <rect x="3" y="2" width="36" height="4" rx="2" fill="url(#sl-top)"/>

        {/* Machine body */}
        <rect x="3" y="6" width="36" height="35" rx="4" fill="url(#sl-body)" stroke="url(#sl-gold)" strokeWidth="1.4"/>

        {/* Reel window frame */}
        <rect x="7" y="11" width="28" height="18" rx="2.5" fill="#06060f" stroke="#D4AF37" strokeWidth="1"/>

        {/* Reel dividers */}
        <line x1="16.3" y1="11" x2="16.3" y2="29" stroke="#D4AF37" strokeWidth="0.7" opacity="0.55"/>
        <line x1="25.7" y1="11" x2="25.7" y2="29" stroke="#D4AF37" strokeWidth="0.7" opacity="0.55"/>

        {/* Reel 1 — "7" */}
        <text x="11.5" y="24.5" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" fontWeight="bold" fill="#D4AF37">7</text>
        {/* Reel 2 — "★" */}
        <text x="21"   y="24"   textAnchor="middle" fontFamily="serif"          fontSize="11"             fill="#FFE878">★</text>
        {/* Reel 3 — "7" */}
        <text x="30.5" y="24.5" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" fontWeight="bold" fill="#D4AF37">7</text>

        {/* Win line */}
        <line x1="7" y1="20" x2="35" y2="20" stroke="#00E676" strokeWidth="0.6" strokeDasharray="2 1.5" opacity="0.55"/>

        {/* Lever arm */}
        <g className="slot-lever">
          <rect x="37" y="11" width="3.5" height="18" rx="1.75" fill="url(#sl-gold)"/>
          <circle cx="38.75" cy="11" r="3.2" fill="#FFE878" stroke="#8B6914" strokeWidth="0.8"/>
        </g>

        {/* Coin slot */}
        <rect x="18" y="33" width="8" height="2" rx="1" fill="#D4AF37" opacity="0.6"/>

        {/* Bottom base */}
        <rect x="3" y="38" width="36" height="5" rx="3" fill="url(#sl-gold)" opacity="0.35"/>

        {/* Legs */}
        <rect x="8"  y="42" width="5" height="8" rx="2" fill="#D4AF37" opacity="0.4"/>
        <rect x="29" y="42" width="5" height="8" rx="2" fill="#D4AF37" opacity="0.4"/>
      </svg>

      {/* ── Wordmark ── */}
      <div className="flex flex-col leading-none gap-[3px]">
        <span className="logo-name-royal">ROYAL</span>
        <span className="logo-name-spinz">SPINZ</span>
      </div>
    </Link>
  );
}
