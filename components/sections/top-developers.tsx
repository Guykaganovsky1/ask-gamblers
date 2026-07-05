"use client";

import { useState } from "react";
import Link from "next/link";

type GameType = "slots" | "table" | "cards" | "live";

interface GameGuide {
  name: string;
  icon: string;
  description: string;
  risk: string;
  skill: string;
  check: string;
  href: string;
  type: GameType;
}

const GAME_GUIDES: GameGuide[] = [
  {
    name: "סלוטים",
    icon: "🎰",
    description: "משחקים מהירים ופשוטים להבנה, אבל עם תנודתיות גבוהה ותוצאות אקראיות.",
    risk: "בינוני עד גבוה",
    skill: "נמוכה",
    check: "תנודתיות, תקרת זכייה, קניית בונוס ומשחקים מוחרגים מבונוסים.",
    href: "/categories/slots",
    type: "slots",
  },
  {
    name: "רולטה",
    icon: "🎡",
    description: "משחק שולחן עם הימורים על צבעים, מספרים וקבוצות מספרים. הסיכון משתנה לפי סוג ההימור.",
    risk: "משתנה לפי הימור",
    skill: "נמוכה",
    check: "סוג הרולטה, מגבלות שולחן, חוקי אפס יחיד או כפול וקצב סיבוב.",
    href: "/categories/roulette",
    type: "table",
  },
  {
    name: "בלאקג׳ק",
    icon: "🃏",
    description: "משחק קלפים שבו החלטות השחקן משפיעות על התוצאה יותר מאשר בסלוטים או רולטה.",
    risk: "בינוני",
    skill: "בינונית",
    check: "חוקי שולחן, תשלום על בלאקג׳ק, פיצול, דאבל ודילר עומד או מושך.",
    href: "/categories/blackjack",
    type: "cards",
  },
  {
    name: "פוקר",
    icon: "♠️",
    description: "משחק מבוסס החלטות, סבלנות וניהול תקציב. מתאים יותר לשחקנים שמכירים את החוקים.",
    risk: "בינוני עד גבוה",
    skill: "גבוהה",
    check: "סוג הפוקר, עמלות שולחן, רמת שחקנים וקצב הטורניר או הקאש.",
    href: "/categories/poker",
    type: "cards",
  },
  {
    name: "לייב קזינו",
    icon: "🎥",
    description: "משחקי שולחן עם דילר חי. החוויה איטית וברורה יותר, אך עדיין דורשת תקציב מוגדר מראש.",
    risk: "משתנה לפי משחק",
    skill: "נמוכה עד בינונית",
    check: "איכות שידור, מגבלות שולחן, זמינות בעברית ותמיכה במובייל.",
    href: "/categories/live",
    type: "live",
  },
  {
    name: "באקרה",
    icon: "🎴",
    description: "משחק שולחן עם חוקים קבועים וקצב מהיר יחסית. חשוב להבין את סוגי ההימור לפני שמתחילים.",
    risk: "בינוני",
    skill: "נמוכה",
    check: "מגבלות שולחן, עמלות, גרסת המשחק וזמינות בלייב או במובייל.",
    href: "/categories/baccarat",
    type: "table",
  },
];

const FILTERS: { label: string; key: "all" | GameType }[] = [
  { label: "הכל", key: "all" },
  { label: "סלוטים", key: "slots" },
  { label: "שולחן", key: "table" },
  { label: "קלפים", key: "cards" },
  { label: "לייב", key: "live" },
];

export function TopDevelopers() {
  const [active, setActive] = useState<"all" | GameType>("all");

  const filtered = active === "all" ? GAME_GUIDES : GAME_GUIDES.filter((game) => game.type === active);

  return (
    <>
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-black text-text-primary md:text-3xl">
          סוגי משחקי קזינו להשוואה
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-text-secondary">
          בחרו משחק לפי רמת סיכון, קצב, חוקים וכמה החלטות צריך לקבל. אין משחק שמבטיח זכייה,
          ולכן כדאי להבין את הכללים ולהגדיר תקציב לפני כל הפקדה.
        </p>
      </section>

      <div className="mb-10 flex flex-wrap gap-2" dir="rtl">
        {FILTERS.map(({ label, key }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`rounded-full border px-5 py-1.5 text-sm font-semibold transition-all duration-200 ${
              active === key
                ? "border-accent bg-accent text-background shadow-lg shadow-accent/30"
                : "border-border-glass bg-card/40 text-text-muted hover:border-accent/60 hover:text-accent"
            }`}
          >
            {label}
            {key !== "all" && (
              <span className="ms-1.5 text-xs opacity-90">
                ({GAME_GUIDES.filter((game) => game.type === key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((game, i) => (
          <div
            key={game.name}
            className="group relative animate-slide-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent via-accent-light to-emerald-neon p-[1px]" />

            <div className="relative flex flex-col gap-5 rounded-2xl bg-gradient-to-br from-card-light to-card p-6 h-full backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_32px_rgba(200,162,74,0.28)]">

              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-2xl transition-transform duration-300 group-hover:scale-110">
                  {game.icon}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-black text-text-primary group-hover:text-accent transition-colors">
                    {game.name}
                  </h3>
                  <span className="text-xs text-text-muted">מדריך בחירה לשחקנים ישראלים</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <p className="text-sm leading-relaxed text-text-secondary">{game.description}</p>
                <div className="h-px bg-border-glass" />
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">רמת סיכון</span>
                  <span className="text-text-secondary font-medium text-left">{game.risk}</span>
                </div>
                <div className="h-px bg-border-glass" />
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">מיומנות</span>
                  <span className="font-bold text-accent">{game.skill}</span>
                </div>
                <p className="rounded-lg border border-border-glass bg-background/30 p-3 text-xs leading-relaxed text-text-muted">
                  <span className="font-bold text-text-secondary">מה לבדוק: </span>
                  {game.check}
                </p>
              </div>

              <Link
                href={game.href}
                className="w-full rounded-lg bg-accent/10 hover:bg-accent text-accent hover:text-background border border-accent/30 hover:border-accent py-2.5 text-center text-sm font-bold transition-all duration-200 hover:shadow-[0_0_20px_rgba(200,162,74,0.32)]"
              >
                קראו מדריך
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center text-text-muted">
          לא נמצאו מדריכים בקטגוריה זו
        </div>
      )}
    </>
  );
}
