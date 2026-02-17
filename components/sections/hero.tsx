"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FLOATING_ITEMS = ["🎰", "🃏", "🎲", "💎", "🏆", "♠️", "♦️", "♣️"];

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4">
      {FLOATING_ITEMS.map((item, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute text-4xl opacity-10"
          initial={{
            x: `${(i * 12.5) % 100}%`,
            y: `${(i * 17) % 100}%`,
          }}
          animate={{
            y: [
              `${(i * 17) % 100}%`,
              `${((i * 17) + 15) % 100}%`,
              `${(i * 17) % 100}%`,
            ],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item}
        </motion.span>
      ))}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-heading text-5xl font-black leading-tight md:text-7xl"
        >
          המדריך המלא
          <br />
          <span className="bg-gradient-to-l from-gold to-gold-light bg-clip-text text-transparent">
            לקזינו אונליין
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mx-auto mt-6 max-w-xl text-lg text-text-muted"
        >
          ביקורות מקצועיות, בונוסים בלעדיים והמלצות מומחים — הכל במקום אחד
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 flex justify-center gap-4"
        >
          <Button href="/casinos">גלה קזינו מומלצים</Button>
          <Button href="/blog" variant="outline">קרא מאמרים</Button>
        </motion.div>
      </div>
    </section>
  );
}
