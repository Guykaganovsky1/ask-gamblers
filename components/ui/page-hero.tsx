"use client";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

const FACE_5: [number, number][] = [[-14, -14], [14, -14], [0, 0], [-14, 14], [14, 14]];
const FACE_3: [number, number][] = [[-10, -10], [0, 0], [10, 10]];

const SPARKLES: [number, number, number, number][] = [
  [95, 42, 3.1, 0],
  [490, 160, 2.8, 1.2],
  [830, 185, 3.7, 0.8],
  [1160, 172, 2.5, 0.3],
  [1370, 136, 3.9, 1.0],
];

export function PageHero({ title, subtitle, badge }: PageHeroProps) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 300 }}>
      <style>{`
        /* ── X: constant linear travel ── */
        @keyframes d1x {
          from { transform: translateX(-100px); }
          to   { transform: translateX(1560px); }
        }
        @keyframes d2x {
          from { transform: translateX(1560px); }
          to   { transform: translateX(-100px); }
        }

        /* ── Y: smooth arc bounces (3 full arcs per pass) ── */
        @keyframes d1y {
          0%     { transform: translateY(245px); animation-timing-function: ease-in; }
          16.67% { transform: translateY(55px);  animation-timing-function: ease-out; }
          33.33% { transform: translateY(245px); animation-timing-function: ease-in; }
          50%    { transform: translateY(55px);  animation-timing-function: ease-out; }
          66.67% { transform: translateY(245px); animation-timing-function: ease-in; }
          83.33% { transform: translateY(55px);  animation-timing-function: ease-out; }
          100%   { transform: translateY(245px); }
        }

        /* ── Spin: continuous slow axis rotation ── */
        @keyframes dSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── Sparkles ── */
        @keyframes phTwinkle {
          0%, 100% { opacity: 0.07; transform: scale(0.5); }
          50%      { opacity: 0.55; transform: scale(1); }
        }

        .d1x { animation: d1x 20s linear infinite; }
        .d2x { animation: d2x 20s linear infinite 10s; }
        .d1y { animation: d1y 20s linear infinite; }
        .d2y { animation: d1y 20s linear infinite 10s; }
        .d1spin {
          animation: dSpin 11s linear infinite;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .d2spin {
          animation: dSpin 14s linear infinite reverse;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .ph-spark { transform-box: fill-box; transform-origin: 50% 50%; }
      `}</style>

      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #06060E 0%, #0B0619 50%, #06060E 100%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 110% at 50% 50%, rgba(139,92,246,0.14) 0%, transparent 65%)" }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="f-dice" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"/>
            <feColorMatrix in="blur" type="matrix"
              values="1.4 0 0 0 0.1  0 0.05 0 0 0  0 0 0.05 0 0  0 0 0 0.8 0"
              result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* ── Die 1 — large, L→R ──
            Layer 1 (outermost): horizontal travel
            Layer 2 (middle):    vertical bounce
            Layer 3 (inner):     axis spin              */}
        <g className="d1x">
          <g className="d1y">
            <g className="d1spin" filter="url(#f-dice)">
              {/* Right face */}
              <polygon points="27,-27 43,-43 43,12 27,27"    fill="#7F1D1D"/>
              {/* Right face dots — 3 (diagonal) */}
              <ellipse cx="31" cy="-20" rx="2.5" ry="3" fill="white" opacity="0.72"/>
              <ellipse cx="35" cy="-6"  rx="2.5" ry="3" fill="white" opacity="0.72"/>
              <ellipse cx="39" cy="8"   rx="2.5" ry="3" fill="white" opacity="0.72"/>
              {/* Top face */}
              <polygon points="-27,-27 27,-27 43,-43 -11,-43" fill="#F87171"/>
              {/* Top face dots — 2 */}
              <ellipse cx="-1" cy="-37" rx="3.2" ry="2" fill="white" opacity="0.6"/>
              <ellipse cx="20" cy="-37" rx="3.2" ry="2" fill="white" opacity="0.6"/>
              {/* Front face */}
              <rect x="-27" y="-27" width="54" height="54" rx="7" fill="#DC2626"/>
              <line x1="-27" y1="-27" x2="27" y2="-27" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2"/>
              <line x1="-27" y1="-27" x2="-27" y2="27"  stroke="rgba(255,255,255,0.18)" strokeWidth="1.2"/>
              {/* Front face dots — 5 */}
              {FACE_5.map(([dx, dy], i) => (
                <circle key={i} cx={dx} cy={dy} r="4.2" fill="white" opacity="0.93"/>
              ))}
            </g>
          </g>
        </g>

        {/* ── Die 2 — smaller, R→L ── */}
        <g className="d2x">
          <g className="d2y">
            <g className="d2spin" filter="url(#f-dice)">
              {/* Right face */}
              <polygon points="22,-22 34,-34 34,10 22,22"    fill="#7F1D1D"/>
              {/* Right face dots — 2 */}
              <ellipse cx="28" cy="-16" rx="2" ry="2.5" fill="white" opacity="0.7"/>
              <ellipse cx="28" cy="2"   rx="2" ry="2.5" fill="white" opacity="0.7"/>
              {/* Top face */}
              <polygon points="-22,-22 22,-22 34,-34 -10,-34" fill="#F87171"/>
              {/* Top face dot — 1 */}
              <ellipse cx="7" cy="-29" rx="2.8" ry="1.8" fill="white" opacity="0.6"/>
              {/* Front face */}
              <rect x="-22" y="-22" width="44" height="44" rx="6" fill="#DC2626"/>
              <line x1="-22" y1="-22" x2="22" y2="-22" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
              <line x1="-22" y1="-22" x2="-22" y2="22"  stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
              {/* Front face dots — 3 */}
              {FACE_3.map(([dx, dy], i) => (
                <circle key={i} cx={dx} cy={dy} r="3.8" fill="white" opacity="0.92"/>
              ))}
            </g>
          </g>
        </g>

        {/* Sparkles */}
        {SPARKLES.map(([x, y, dur, delay], i) => (
          <text
            key={i} x={x} y={y}
            textAnchor="middle" dominantBaseline="middle"
            fontSize={8 + (i % 3) * 3}
            fill="rgba(168,85,247,0.9)"
            className="ph-spark"
            style={{ animation: `phTwinkle ${dur}s ease-in-out infinite ${delay}s` }}
          >✦</text>
        ))}

        <line x1="0" y1="298" x2="1440" y2="298" stroke="rgba(168,85,247,0.10)" strokeWidth="1"/>
      </svg>

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6 z-10">
        {badge && (
          <span className="inline-block rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-xs font-bold text-accent uppercase tracking-widest">
            {badge}
          </span>
        )}
        <h1
          className="font-heading text-4xl md:text-5xl font-black text-text-primary"
          style={{ textShadow: "0 0 40px rgba(139,92,246,0.45)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-text-muted text-sm md:text-base max-w-lg leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0A0A0F)" }}
      />
    </div>
  );
}
