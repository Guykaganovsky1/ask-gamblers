"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Game icons as SVG components
const gameIcons = {
  slots: (
    <svg viewBox="0 0 64 64" className="w-16 h-16">
      <rect x="8" y="12" width="48" height="40" rx="4" fill="url(#slotGrad)" stroke="currentColor" strokeWidth="2"/>
      <rect x="14" y="18" width="10" height="14" rx="2" fill="#1a1a2e" stroke="#00E676" strokeWidth="1.5"/>
      <rect x="27" y="18" width="10" height="14" rx="2" fill="#1a1a2e" stroke="#00E676" strokeWidth="1.5"/>
      <rect x="40" y="18" width="10" height="14" rx="2" fill="#1a1a2e" stroke="#00E676" strokeWidth="1.5"/>
      <text x="19" y="28" fontSize="8" fill="#00E676">7</text>
      <text x="32" y="28" fontSize="8" fill="#D4AF37">★</text>
      <text x="45" y="28" fontSize="8" fill="#00E676">7</text>
      <circle cx="32" cy="44" r="4" fill="#D4AF37"/>
      <defs>
        <linearGradient id="slotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a4a"/>
          <stop offset="100%" stopColor="#1a1a2e"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  roulette: (
    <svg viewBox="0 0 64 64" className="w-16 h-16">
      <circle cx="32" cy="32" r="26" fill="url(#rouletteGrad)" stroke="currentColor" strokeWidth="2"/>
      <circle cx="32" cy="32" r="20" fill="none" stroke="#D4AF37" strokeWidth="1"/>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <line key={i} x1="32" y1="14" x2="32" y2="20" stroke="#00E676" strokeWidth="2" transform={`rotate(${angle} 32 32)`}/>
      ))}
      <circle cx="32" cy="32" r="4" fill="#D4AF37"/>
      <defs>
        <linearGradient id="rouletteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a4a"/>
          <stop offset="100%" stopColor="#1a1a2e"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  cards: (
    <svg viewBox="0 0 64 64" className="w-16 h-16">
      <rect x="12" y="16" width="28" height="36" rx="3" fill="url(#cardGrad)" stroke="currentColor" strokeWidth="2" transform="rotate(-10 26 34)"/>
      <rect x="24" y="12" width="28" height="36" rx="3" fill="url(#cardGrad)" stroke="#D4AF37" strokeWidth="2"/>
      <text x="38" y="28" fontSize="14" fill="#D4AF37" fontWeight="bold">A</text>
      <text x="36" y="42" fontSize="16" fill="#D4AF37">♠</text>
      <defs>
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a3a5a"/>
          <stop offset="100%" stopColor="#2a2a4a"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  dice: (
    <svg viewBox="0 0 64 64" className="w-16 h-16">
      <rect x="14" y="14" width="36" height="36" rx="6" fill="url(#diceGrad)" stroke="currentColor" strokeWidth="2" transform="rotate(5 32 32)"/>
      <circle cx="24" cy="24" r="3" fill="#D4AF37"/>
      <circle cx="40" cy="24" r="3" fill="#D4AF37"/>
      <circle cx="32" cy="32" r="3" fill="#D4AF37"/>
      <circle cx="24" cy="40" r="3" fill="#D4AF37"/>
      <circle cx="40" cy="40" r="3" fill="#D4AF37"/>
      <defs>
        <linearGradient id="diceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a3a5a"/>
          <stop offset="100%" stopColor="#2a2a4a"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  poker: (
    <svg viewBox="0 0 64 64" className="w-16 h-16">
      <ellipse cx="32" cy="48" rx="24" ry="8" fill="#1a1a2e" opacity="0.5"/>
      <circle cx="20" cy="20" r="10" fill="url(#chipGrad1)" stroke="#D4AF37" strokeWidth="2"/>
      <circle cx="32" cy="16" r="10" fill="url(#chipGrad2)" stroke="#00E676" strokeWidth="2"/>
      <circle cx="44" cy="20" r="10" fill="url(#chipGrad1)" stroke="#D4AF37" strokeWidth="2"/>
      <text x="20" y="24" fontSize="8" fill="#D4AF37" textAnchor="middle">$</text>
      <text x="32" y="20" fontSize="8" fill="#00E676" textAnchor="middle">$</text>
      <text x="44" y="24" fontSize="8" fill="#D4AF37" textAnchor="middle">$</text>
      <defs>
        <linearGradient id="chipGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a3a5a"/>
          <stop offset="100%" stopColor="#2a2a4a"/>
        </linearGradient>
        <linearGradient id="chipGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a4a3a"/>
          <stop offset="100%" stopColor="#1a3a2a"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  jackpot: (
    <svg viewBox="0 0 64 64" className="w-16 h-16">
      <rect x="10" y="28" width="44" height="26" rx="3" fill="url(#jackpotGrad)" stroke="currentColor" strokeWidth="2"/>
      <rect x="16" y="32" width="32" height="12" rx="2" fill="#0a0a0f" stroke="#D4AF37" strokeWidth="1"/>
      <text x="32" y="42" fontSize="10" fill="#D4AF37" textAnchor="middle" fontWeight="bold">JACKPOT</text>
      <polygon points="32,8 36,18 28,18" fill="#D4AF37"/>
      <rect x="30" y="16" width="4" height="12" fill="#D4AF37"/>
      <circle cx="20" cy="50" r="4" fill="#D4AF37"/>
      <circle cx="44" cy="50" r="4" fill="#D4AF37"/>
      <defs>
        <linearGradient id="jackpotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a3a2a"/>
          <stop offset="100%" stopColor="#3a2a1a"/>
        </linearGradient>
      </defs>
    </svg>
  ),
};

const games = [
  { id: "slots", name: "מכונות מזל", icon: gameIcons.slots, color: "from-purple-600 to-pink-500", players: "2.5K+", href: "/games?category=slots" },
  { id: "roulette", name: "רולטה", icon: gameIcons.roulette, color: "from-emerald-500 to-teal-400", players: "1.8K+", href: "/games?category=roulette" },
  { id: "cards", name: "בלאקג׳ק", icon: gameIcons.cards, color: "from-amber-500 to-orange-400", players: "3.2K+", href: "/games?category=blackjack" },
  { id: "dice", name: "קוביות", icon: gameIcons.dice, color: "from-red-500 to-rose-400", players: "1.2K+", href: "/games?category=dice" },
  { id: "poker", name: "פוקר", icon: gameIcons.poker, color: "from-blue-500 to-cyan-400", players: "4.1K+", href: "/games?category=poker" },
  { id: "jackpot", name: "ג'קפוט", icon: gameIcons.jackpot, color: "from-yellow-500 to-amber-400", players: "890+", href: "/games?category=jackpot" },
];

export function GamesShowcaseSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0f0f1a] to-background">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-3xl"
        />
      </div>

      {/* Flowing lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        />
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
        />
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-emerald-600/20 border border-purple-500/30 mb-6"
          >
            <span className="text-2xl">🎮</span>
            <span className="text-sm font-bold text-purple-300">המשחקים הכי חמים</span>
          </motion.div>
          
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-emerald-200 mb-6">
            היכון, הסתכל... זכה!
          </h2>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-text-secondary leading-relaxed">
            גלה עולם שלם של משחקים מטורפים — סלוטים עם ג׳קפוטים ענקיים, רולטה חיה, קלפים מנצחים ועוד. 
            <span className="text-accent font-bold"> כל משחק הוא הזדמנות חדשה לזכות!</span>
          </p>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              <Link href={game.href}>
                {/* Animated border */}
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-emerald-500 opacity-0 group-hover:opacity-100 blur transition-all duration-500 animate-pulse" />
                
                {/* Card */}
                <div className="relative h-44 md:h-52 rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border border-white/10 overflow-hidden flex flex-col items-center justify-center gap-3 p-4 transition-all duration-300 group-hover:border-transparent">
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${game.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <div className={`relative text-white/80 group-hover:text-white transition-colors duration-300 group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]`}>
                    {game.icon}
                  </div>
                  
                  {/* Name */}
                  <span className="font-heading text-lg font-bold text-white text-center">
                    {game.name}
                  </span>
                  
                  {/* Players badge */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs text-emerald-400 font-medium">{game.players} משחקים</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/games"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-emerald-500 text-white font-heading font-bold text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-105 group"
          >
            <span>קדימה, בואו לשחק!</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🎰
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
