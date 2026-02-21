"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Floating casino SVG */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <style>{`
          @keyframes nf-float { 0%,100%{transform:translateY(0) rotate(-10deg)} 50%{transform:translateY(-18px) rotate(-5deg)} }
          @keyframes nf-float2 { 0%,100%{transform:translateY(0) rotate(12deg)} 50%{transform:translateY(-14px) rotate(18deg)} }
          @keyframes nf-spin { to{transform:rotate(360deg)} }
          .nf-c1{animation:nf-float 7s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 50%}
          .nf-c2{animation:nf-float2 9s ease-in-out infinite 2s;transform-box:fill-box;transform-origin:50% 50%}
          .nf-wheel{animation:nf-spin 16s linear infinite;transform-box:fill-box;transform-origin:50% 50%}
        `}</style>

        {/* Card ♠ */}
        <g transform="translate(200, 220)" className="nf-c1">
          <rect x="-22" y="-32" width="44" height="62" rx="6" fill="rgba(12,8,25,0.9)" stroke="rgba(168,85,247,0.6)" strokeWidth="2" />
          <text x="0" y="-6" textAnchor="middle" fontSize="26" fill="#e2e8f0" dominantBaseline="middle">♠</text>
        </g>
        {/* Card ♥ */}
        <g transform="translate(1240, 300)" className="nf-c2">
          <rect x="-22" y="-32" width="44" height="62" rx="6" fill="rgba(12,8,25,0.9)" stroke="rgba(168,85,247,0.5)" strokeWidth="2" />
          <text x="0" y="-6" textAnchor="middle" fontSize="26" fill="#ef4444" dominantBaseline="middle">♥</text>
        </g>
        {/* Die */}
        <g transform="translate(1100, 150)" className="nf-c1">
          <rect x="-24" y="-24" width="48" height="48" rx="8" fill="rgba(230,226,248,0.85)" stroke="rgba(168,85,247,0.4)" strokeWidth="1.5" />
          {[[-9,-9],[9,-9],[0,0],[-9,9],[9,9]].map(([dx,dy],i) => (
            <circle key={i} cx={dx} cy={dy} r="4" fill="#1a1a2e" />
          ))}
        </g>
        {/* Chip */}
        <g transform="translate(340, 420)" className="nf-c2">
          <circle r="20" fill="#7c3aed" opacity="0.6" />
          <circle r="20" fill="none" stroke="rgba(196,170,255,0.7)" strokeWidth="2" strokeDasharray="5 3" />
        </g>
      </svg>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        {/* 404 number */}
        <div
          className="font-heading text-[120px] md:text-[180px] font-black leading-none"
          style={{
            background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #C084FC 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 40px rgba(168,85,247,0.5))",
          }}
        >
          404
        </div>

        {/* Dice icon */}
        <div className="text-5xl">♠️</div>

        {/* Headline */}
        <h1 className="font-heading text-2xl md:text-3xl font-black text-text-primary">
          נראה שהסיכון לא שילם הפעם
        </h1>

        {/* Subtitle */}
        <p className="max-w-md text-text-muted leading-relaxed">
          הדף שחיפשת לא נמצא — אולי הוא קפץ לשולחן אחר.
          <br />
          נסה לחזור לדף הבית ולהתחיל מחדש.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <Link
            href="/"
            className="relative overflow-hidden rounded-xl px-8 py-3 font-heading text-sm font-bold text-white transition-transform duration-150 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #9333EA 100%)",
              border: "1px solid rgba(192,132,252,0.5)",
              boxShadow: "0 0 20px rgba(168,85,247,0.3)",
            }}
          >
            חזור לדף הבית
          </Link>
          <Link
            href="/casinos"
            className="rounded-xl border border-accent/30 bg-accent/10 px-8 py-3 font-heading text-sm font-bold text-accent transition-all duration-150 hover:bg-accent/20"
          >
            גלה קזינו
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
