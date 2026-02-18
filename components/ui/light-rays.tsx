"use client";

export function LightRays() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes sweepLight {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translateX(200%) translateY(200%) rotate(45deg);
            opacity: 0;
          }
        }

        .light-ray {
          position: absolute;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(212, 175, 55, 0.2) 25%,
            rgba(212, 175, 55, 0.4) 50%,
            rgba(212, 175, 55, 0.2) 75%,
            transparent 100%
          );
          animation: sweepLight 6s ease-in-out infinite;
          width: 200px;
          height: 2px;
          filter: blur(8px);
        }

        .light-ray-1 {
          animation-delay: 0s;
        }

        .light-ray-2 {
          animation-delay: 2s;
        }

        .light-ray-3 {
          animation-delay: 4s;
        }
      `}</style>
      <div className="light-ray light-ray-1" />
      <div className="light-ray light-ray-2" />
      <div className="light-ray light-ray-3" />
    </div>
  );
}
