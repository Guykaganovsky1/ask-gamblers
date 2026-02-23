"use client";

import { useInViewOnce } from "@/lib/animations";

const GAMES = [
  {
    icon: "🎰",
    name: "סלוטס",
    description: "מאות מכונות מזל מהספקים המובילים בעולם עם ג'קפוטים עצומים",
    tag: "הכי פופולרי",
  },
  {
    icon: "♠️",
    name: "פוקר",
    description: "טורנירים ושולחנות לכל רמות המיומנות - מתחילים ועד מקצוענים",
    tag: null,
  },
  {
    icon: "🃏",
    name: "בלאקג'ק",
    description: "הגיע ל-21 ונצח את הבנק. אחוז החזר גבוה ואסטרטגיה פשוטה",
    tag: "אחוז החזר גבוה",
  },
  {
    icon: "🎡",
    name: "רולטה",
    description: "סובב את הגלגל ובחר את המספר שלך — אירופאית, אמריקאית או צרפתית",
    tag: null,
  },
  {
    icon: "📺",
    name: "קזינו חי",
    description: "דילרים אמיתיים בשידור חי 24/7 — חוויה אמיתית מהבית",
    tag: "חדש",
  },
  {
    icon: "♠️",
    name: "קרפס ובינגו",
    description: "משחקי קוביה ובינגו מרגשים — פשוטים, מהירים ומשתלמים",
    tag: null,
  },
];

export function GameFinder() {
  const { ref, isInView } = useInViewOnce(0.1);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {GAMES.map((game, i) => (
        <div
          key={game.name}
          className={`group relative ${isInView ? "animate-slide-up" : "opacity-0"}`}
          style={{ animationDelay: `${i * 0.08}s` }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent via-accent-light to-emerald-neon p-[1px]" />

          <div className="relative flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-card-light to-card p-6 h-full backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_36px_rgba(168,85,247,0.3)]">

            {game.tag && (
              <span className="absolute top-4 left-4 rounded-full bg-accent/20 border border-accent/30 px-2.5 py-0.5 text-[10px] font-bold text-accent tracking-wide">
                {game.tag}
              </span>
            )}

            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-3xl transition-transform duration-300 group-hover:scale-110">
              {game.icon}
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <h3 className="font-heading text-xl font-black text-text-primary group-hover:text-accent transition-colors">
                {game.name}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {game.description}
              </p>
            </div>

            <button className="mt-2 w-full rounded-lg bg-accent/10 hover:bg-accent text-accent hover:text-white border border-accent/30 hover:border-accent py-2.5 text-sm font-bold transition-all duration-200 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              שחקו עכשיו
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}