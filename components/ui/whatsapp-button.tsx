"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "972509200920";
const WHATSAPP_MESSAGE = "Ask Gamblers\nשלום, השאירו הודעה ונחזור אליכם בהקדם. תודה";

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="שוחח עם נציג בוואטסאפ"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        direction: "rtl",
        background: hovered
          ? "linear-gradient(135deg, #A855F7, #7C3AED)"
          : "linear-gradient(135deg, #1A1A2E, #131825)",
        border: "1px solid rgba(168,85,247,0.45)",
        borderRadius: "50px",
        padding: "10px 18px 10px 14px",
        boxShadow: hovered
          ? "0 0 28px rgba(168,85,247,0.55), 0 4px 20px rgba(0,0,0,0.4)"
          : "0 0 14px rgba(168,85,247,0.2), 0 4px 16px rgba(0,0,0,0.35)",
        cursor: "pointer",
        textDecoration: "none",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-2px) scale(1.03)" : "translateY(0) scale(1)",
      }}
    >
      {/* WhatsApp Icon */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <path
          d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
          fill={hovered ? "rgba(255,255,255,0.2)" : "rgba(168,85,247,0.15)"}
        />
        <path
          d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
          stroke={hovered ? "#fff" : "#A855F7"}
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M8.5 9.5C8.5 9 9 8 9.5 8c.4 0 .6.2.8.5l1 2c.2.3.1.6-.1.8l-.6.6c.4.8 1 1.4 1.8 1.8l.6-.6c.2-.2.5-.3.8-.1l2 1c.3.2.5.4.5.8 0 .5-1 1-1.5 1C11 15.8 8.2 13 8.5 9.5z"
          fill={hovered ? "#fff" : "#D8B4FE"}
        />
      </svg>

      {/* Label */}
      <span
        style={{
          fontFamily: "'Heebo', sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          color: hovered ? "#fff" : "#D8B4FE",
          whiteSpace: "nowrap",
          transition: "color 0.3s ease",
          letterSpacing: "0.01em",
        }}
      >
        שוחח עם נציג
      </span>

      {/* Pulse ring */}
      {!hovered && (
        <span
          style={{
            position: "absolute",
            inset: "-1px",
            borderRadius: "50px",
            border: "1px solid rgba(168,85,247,0.4)",
            animation: "waPulse 2.5s ease-out infinite",
            pointerEvents: "none",
          }}
        />
      )}

      <style>{`
        @keyframes waPulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.08); opacity: 0; }
          100% { transform: scale(1.08); opacity: 0; }
        }
      `}</style>
    </a>
  );
}
