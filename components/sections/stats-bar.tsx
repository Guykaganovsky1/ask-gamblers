"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const STATS = [
  { icon: "🏆", value: "+200", label: "קורסים" },
  { icon: "📅", value: "24/7", label: "חדשות" },
  { icon: "🏛️", value: "25", label: "בתי קזינו" },
];

export function StatsBar() {
  return (
    <section className="mx-auto max-w-4xl px-4 -mt-16 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex flex-col items-center gap-2 rounded-xl border border-border-card bg-card-light/80 backdrop-blur-sm p-6 text-center"
          >
            <span className="text-2xl">{stat.icon}</span>
            <span className="font-heading text-3xl font-black text-accent md:text-4xl">
              <AnimatedCounter value={stat.value} />
            </span>
            <span className="text-sm text-text-muted">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
