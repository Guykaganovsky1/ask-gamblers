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
        {/* ── Die 1 — large, L→R ──
            Layer 1 (outermost): horizontal travel
            Layer 2 (middle):    vertical bounce
            Layer 3 (inner):     axis spin              */}
        <g className="d1x">
          <g className="d1y">
            <g className="d1spin">
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
            <g className="d2spin">
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
