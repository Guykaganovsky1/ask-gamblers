const WHATSAPP_NUMBER = "972509200920";
const WHATSAPP_MESSAGE = "שלום, השאירו הודעה ונחזור אליכם בהקדם. תודה\nAsk Gamblers";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="שוחח עם נציג בוואטסאפ"
      className="group fixed bottom-6 right-6 z-[9999] flex items-center gap-2.5 rounded-full border border-emerald-neon/45 bg-gradient-to-br from-card-light to-card px-[18px] py-2.5 no-underline shadow-[0_0_14px_rgba(15,143,95,0.18),0_4px_16px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-gradient-to-br hover:from-emerald-neon hover:to-[#0B6B49] hover:shadow-[0_0_28px_rgba(15,143,95,0.42),0_4px_20px_rgba(0,0,0,0.4)]"
      dir="rtl"
    >
      {/* WhatsApp Icon */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
          className="fill-emerald-neon/15 group-hover:fill-white/20"
        />
        <path
          d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
          className="stroke-emerald-neon group-hover:stroke-white"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M8.5 9.5C8.5 9 9 8 9.5 8c.4 0 .6.2.8.5l1 2c.2.3.1.6-.1.8l-.6.6c.4.8 1 1.4 1.8 1.8l.6-.6c.2-.2.5-.3.8-.1l2 1c.3.2.5.4.5.8 0 .5-1 1-1.5 1C11 15.8 8.2 13 8.5 9.5z"
          className="fill-emerald-neon group-hover:fill-white"
        />
      </svg>

      {/* Label */}
      <span className="whitespace-nowrap text-[13px] font-semibold tracking-[0.01em] text-emerald-neon transition-colors duration-300 group-hover:text-white">
        שוחח עם נציג
      </span>

      {/* Pulse ring */}
      <span className="wa-pulse-ring group-hover:hidden" />
    </a>
  );
}

export default WhatsAppButton;
