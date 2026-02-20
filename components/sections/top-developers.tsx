"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type GameType = "newgames" | "slots" | "tablegames" | "upcoming";

interface Developer {
  name: string;
  logo: string;
  games: string;
  known: string;
  rtp: string;
  type: GameType;
}

const DEVELOPERS: Developer[] = [
  { name: "NetEnt",          logo: "🎮", games: "500+", known: "Starburst, Gonzo's Quest",          rtp: "96.5%", type: "slots" },
  { name: "Microgaming",     logo: "🏆", games: "800+", known: "Mega Moolah, Immortal Romance",      rtp: "96.8%", type: "slots" },
  { name: "Playtech",        logo: "⚡", games: "700+", known: "Age of the Gods, Buffalo Blitz",     rtp: "95.9%", type: "slots" },
  { name: "Evolution",       logo: "📺", games: "200+", known: "Lightning Roulette, Crazy Time",     rtp: "97.3%", type: "tablegames" },
  { name: "Pragmatic Play",  logo: "🎰", games: "300+", known: "Gates of Olympus, Sweet Bonanza",    rtp: "96.5%", type: "newgames" },
  { name: "IGT",             logo: "🎲", games: "600+", known: "Wheel of Fortune, Cleopatra",        rtp: "95.5%", type: "tablegames" },
  { name: "Play'n GO",       logo: "🃏", games: "250+", known: "Book of Dead, Reactoonz",            rtp: "96.2%", type: "newgames" },
  { name: "Ezugi",           logo: "🎱", games: "80+",  known: "Live Blackjack, Live Baccarat",      rtp: "98.1%", type: "tablegames" },
  { name: "Hacksaw Gaming",  logo: "🚀", games: "120+", known: "Chaos Crew, Stick'em",               rtp: "96.7%", type: "newgames" },
  { name: "Push Gaming",     logo: "🌊", games: "60+",  known: "Jammin' Jars, Razor Returns",        rtp: "96.4%", type: "upcoming" },
  { name: "Nolimit City",    logo: "🔥", games: "90+",  known: "Mental, xWays Hoarder",              rtp: "96.1%", type: "upcoming" },
  { name: "Relax Gaming",    logo: "💫", games: "70+",  known: "Money Train 4, Snake Arena",         rtp: "96.0%", type: "upcoming" },
];

const FILTERS: { label: string; key: "all" | GameType }[] = [
  { label: "הכל",            key: "all" },
  { label: "משחקים חדשים",   key: "newgames" },
  { label: "סלוטס",          key: "slots" },
  { label: "משחקי שולחן",    key: "tablegames" },
  { label: "בקרוב",          key: "upcoming" },
];

export function TopDevelopers() {
  const [active, setActive] = useState<"all" | GameType>("all");

  const filtered = active === "all" ? DEVELOPERS : DEVELOPERS.filter((d) => d.type === active);

  return (
    <>
      {/* Filter bar */}
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
              <span className="ms-1.5 text-xs opacity-60">
                ({DEVELOPERS.filter((d) => d.type === key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((dev, i) => (
            <motion.div
              key={dev.name}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="group relative"
            >
              {/* Gradient border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent via-accent-light to-emerald-neon p-[1px]" />

              <div className="relative flex flex-col gap-5 rounded-2xl bg-gradient-to-br from-card-light to-card p-6 h-full backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_36px_rgba(168,85,247,0.3)]">

                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-2xl transition-transform duration-300 group-hover:scale-110">
                    {dev.logo}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-black text-text-primary group-hover:text-accent transition-colors">
                      {dev.name}
                    </h3>
                    <span className="text-xs text-text-muted">{dev.games} משחקים</span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">ידועים בזכות</span>
                    <span className="text-text-secondary font-medium text-left">{dev.known}</span>
                  </div>
                  <div className="h-px bg-border-glass" />
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">ממוצע RTP</span>
                    <span className="font-bold text-accent">{dev.rtp}</span>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full rounded-lg bg-accent/10 hover:bg-accent text-accent hover:text-white border border-accent/30 hover:border-accent py-2.5 text-sm font-bold transition-all duration-200 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  צפו במשחקים
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center text-text-muted">
          לא נמצאו משחקים בקטגוריה זו
        </div>
      )}
    </>
  );
}
