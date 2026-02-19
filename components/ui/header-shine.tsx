"use client";

export function HeaderShine() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes shineSlideRTL {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(-100%);
            opacity: 0;
          }
        }

        .header-shine {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(212, 175, 55, 0.2) 25%,
            rgba(212, 175, 55, 0.4) 50%,
            rgba(212, 175, 55, 0.2) 75%,
            transparent 100%
          );
          animation: shineSlideRTL 5s ease-in-out infinite;
          width: 200%;
        }
      `}</style>
      <div className="header-shine" />
    </div>
  );
}
