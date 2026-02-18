"use client";

export function AnimatedGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes gradientShift {
          0% {
            background: linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 50%, #0A0A0F 100%);
          }
          25% {
            background: linear-gradient(135deg, #1A0A2E 0%, #2D0A3F 50%, #1A0A2E 100%);
          }
          50% {
            background: linear-gradient(135deg, #0A2E1A 0%, #0A4D2E 50%, #0A2E1A 100%);
          }
          75% {
            background: linear-gradient(135deg, #2E1A0A 0%, #4D2E0A 50%, #2E1A0A 100%);
          }
          100% {
            background: linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 50%, #0A0A0F 100%);
          }
        }

        .animated-gradient-bg {
          animation: gradientShift 12s ease-in-out infinite;
        }
      `}</style>
      <div className="animated-gradient-bg absolute inset-0" />
    </div>
  );
}
