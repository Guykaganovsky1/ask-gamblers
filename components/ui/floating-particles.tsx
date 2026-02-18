"use client";

import React from "react";

interface FloatingParticlesProps {
  particleCount?: number;
  particleSize?: number;
  colors?: string[];
}

function generateParticles(count: number, size: number, colors: string[]) {
  return Array.from({ length: count }).map(() => ({
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 8 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    width: size + Math.random() * 2,
    height: size + Math.random() * 2,
    opacity: Math.random() * 0.5 + 0.2,
  }));
}

export function FloatingParticles({
  particleCount = 40,
  particleSize = 4,
  colors = ["#D4AF37", "#FFE082", "#00E676", "#A855F7"],
}: FloatingParticlesProps) {
  const particles = React.useMemo(
    () => generateParticles(particleCount, particleSize, colors),
    [particleCount, particleSize, colors]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes float {
          0% {
            opacity: 0;
            transform: translateY(100vh) translateX(0) scale(0);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-100vh) translateX(100px) scale(1);
          }
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          animation: float linear infinite;
          filter: blur(0.5px);
        }
      `}</style>
      {particles.map((particle, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${particle.left}%`,
            bottom: `-${particleSize}px`,
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            backgroundColor: particle.color,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
}
