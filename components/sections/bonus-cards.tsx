"use client";

import { motion } from "framer-motion";

const BONUSES = [
  { emoji: "💎", name: "Diamond", desc: "100% bonus", bg: "bg-slate-700" },
  { emoji: "🏆", name: "Golden", desc: "+50 spins", bg: "bg-yellow-400" },
  { emoji: "⚡", name: "Lucky", desc: "Up to $500", bg: "bg-black" },
  { emoji: "🎰", name: "Monte", desc: "+200 spins", bg: "bg-purple-900" },
  { emoji: "🎯", name: "Play", desc: "+100% bonus", bg: "bg-slate-800" },
  { emoji: "👑", name: "Pharaoh", desc: "+free spins", bg: "bg-red-500" },
];

export function BonusCards() {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {BONUSES.map((bonus, i) => (
        <motion.div
          key={bonus.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="group relative h-full"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-accent-light to-emerald-neon p-1" />
          <div className="group relative flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-card-light to-card px-6 py-8 text-center backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]">
            <div className={`h-24 w-32 ${bonus.bg} rounded-lg flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300`}>{bonus.emoji}</div>
            <div className="flex flex-col gap-1 flex-1 justify-center">
              <h3 className="font-heading text-lg font-black text-text-primary group-hover:text-accent transition-colors">
                {bonus.name}
              </h3>
              <p className="text-xs text-text-muted">{bonus.desc}</p>
            </div>
            <button className="relative w-full bg-accent hover:bg-accent-light text-white font-bold py-2 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all overflow-hidden">
              <div className="bonus-button-shine" />
              <span className="relative z-10">קבל בונוס</span>
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
