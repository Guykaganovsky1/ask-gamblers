"use client";

import { useState } from "react";

type BonusType = "cashback" | "bonusdeposit" | "bonusfree" | "spinswelcome" | "bonus";

interface Bonus {
  emoji: string;
  name: string;
  desc: string;
  bg: string;
  type: BonusType;
}

const BONUSES: Bonus[] = [
  { emoji: "💎", name: "Diamond",   desc: "100% בונוס הפקדה",      bg: "bg-slate-700",   type: "bonusdeposit" },
  { emoji: "🏆", name: "Golden",    desc: "+50 ספינים בהצטרפות",   bg: "bg-yellow-400",  type: "spinswelcome" },
  { emoji: "⚡", name: "Lucky",     desc: "עד $500 בונוס",          bg: "bg-black",       type: "bonusdeposit" },
  { emoji: "🎰", name: "Monte",     desc: "+200 ספינים חינם",       bg: "bg-purple-900",  type: "spinswelcome" },
  { emoji: "🎯", name: "Play",      desc: "+100% בונוס ראשון",      bg: "bg-slate-800",   type: "bonus" },
  { emoji: "👑", name: "Pharaoh",   desc: "ספינים ללא הפקדה",       bg: "bg-red-500",     type: "bonusfree" },
  { emoji: "💰", name: "CashKing",  desc: "15% קאשבק שבועי",        bg: "bg-emerald-800", type: "cashback" },
  { emoji: "🎁", name: "FreePlay",  desc: "₪50 ללא הפקדה",          bg: "bg-indigo-700",  type: "bonusfree" },
  { emoji: "🔄", name: "Refund",    desc: "10% קאשבק על הפסדים",   bg: "bg-teal-800",    type: "cashback" },
  { emoji: "🌟", name: "Welcome",   desc: "+300% בונוס ברוכים הבאים", bg: "bg-violet-800", type: "bonus" },
  { emoji: "🎡", name: "SpinFest",  desc: "100 ספינים בהרשמה",      bg: "bg-pink-800",    type: "spinswelcome" },
  { emoji: "💳", name: "Reload",    desc: "50% בונוס על הפקדה חוזרת", bg: "bg-blue-900",  type: "bonusdeposit" },
];

const FILTERS: { label: string; key: "all" | BonusType }[] = [
  { label: "הכל",           key: "all" },
  { label: "קאשבק",         key: "cashback" },
  { label: "בונוס הפקדה",   key: "bonusdeposit" },
  { label: "בונוס חינם",    key: "bonusfree" },
  { label: "ספינים",        key: "spinswelcome" },
  { label: "בונוס",         key: "bonus" },
];

export function BonusCards() {
  const [active, setActive] = useState<"all" | BonusType>("all");

  const filtered = active === "all" ? BONUSES : BONUSES.filter((b) => b.type === active);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2" dir="rtl">
        {FILTERS.map(({ label, key }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`rounded-full border px-5 py-1.5 text-sm font-semibold transition-all duration-200 ${
              active === key
                ? "border-accent bg-accent text-white shadow-lg shadow-accent/30"
                : "border-border-glass bg-card/40 text-text-muted hover:border-accent/60 hover:text-accent"
            }`}
          >
            {label}
            {key !== "all" && (
              <span className="ms-1.5 text-xs opacity-90">
                ({BONUSES.filter((b) => b.type === key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((bonus, i) => (
          <div
            key={bonus.name}
            className="group relative h-full animate-slide-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-accent-light to-emerald-neon p-1" />
            <div className="group relative flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-card-light to-card px-6 py-8 text-center backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]">
              <div className={`h-24 w-32 ${bonus.bg} rounded-lg flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300`}>
                {bonus.emoji}
              </div>
              <div className="flex flex-col gap-1 flex-1 justify-center">
                <h3 className="font-heading text-lg font-black text-text-primary group-hover:text-accent transition-colors">
                  {bonus.name}
                </h3>
                <p className="text-xs text-text-muted">{bonus.desc}</p>
              </div>
              <button className="relative w-full bg-accent hover:bg-accent/80 text-white font-bold py-2 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all overflow-hidden">
                <div className="bonus-button-shine" />
                <span className="relative z-10">קבל בונוס</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center text-text-muted">
          לא נמצאו בונוסים בקטגוריה זו
        </div>
      )}
    </>
  );
}