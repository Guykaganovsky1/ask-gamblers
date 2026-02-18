"use client";

export function FooterShine() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes shineSlide {
          0% {
            transform: translateX(-100%);
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
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .footer-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(212, 175, 55, 0.3) 25%,
            rgba(212, 175, 55, 0.6) 50%,
            rgba(212, 175, 55, 0.3) 75%,
            transparent 100%
          );
          animation: shineSlide 6s ease-in-out infinite;
          width: 200%;
        }
      `}</style>
      <div className="footer-shine" />
    </div>
  );
}
