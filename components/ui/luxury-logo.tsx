"use client";

import Image from "next/image";
import Link from "next/link";

export function LuxuryLogo() {
  return (
    <Link href="/" className="group" style={{ direction: "ltr" }}>
      <style>{`
        @keyframes neonGlow {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(0,255,255,0.3)) drop-shadow(0 0 8px rgba(107,45,209,0.2)); }
          50%      { filter: drop-shadow(0 0 8px rgba(0,255,255,0.6)) drop-shadow(0 0 16px rgba(107,45,209,0.4)); }
        }

        .neon-logo {
          animation: neonGlow 3s ease-in-out infinite;
          transition: transform 0.3s ease;
        }
        .group:hover .neon-logo {
          transform: scale(1.04);
        }
      `}</style>

      {/* Neon Logo SVG */}
      <svg
        className="neon-logo h-10 w-auto flex-shrink-0"
        viewBox="0 0 400 150"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Ask Gamblers"
      >
        <defs>
          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"#00FFFF", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#00CCFF", stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="whiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"#FFFFFF", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#D8B4FF", stopOpacity:1}} />
          </linearGradient>
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* "Ask" text in cyan */}
        <text
          x="20"
          y="65"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="42"
          fontWeight="900"
          fill="url(#cyanGrad)"
          filter="url(#neonGlow)"
          letterSpacing="-0.5"
        >
          Ask
        </text>

        {/* "Gamblers" text in white-to-purple gradient */}
        <text
          x="20"
          y="115"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="42"
          fontWeight="900"
          fill="url(#whiteGrad)"
          filter="url(#neonGlow)"
          letterSpacing="-0.5"
        >
          Gamblers
        </text>
      </svg>
    </Link>
  );
}
