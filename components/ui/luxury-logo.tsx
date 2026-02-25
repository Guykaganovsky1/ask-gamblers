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

      {/* ── Wordmark ── */}
      <div className="flex flex-col leading-none gap-[3px]">
        <span className="logo-name-ask">ASK</span>
        <span className="logo-name-gamblers">GAMBLERS</span>
      </div>
    </Link>
  );
}
