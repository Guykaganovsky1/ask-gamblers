"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { LightRays } from "@/components/ui/light-rays";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-16">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          fetchPriority="high"
        />
        {/* Animation Layer 1: Floating Particles */}
        <FloatingParticles particleCount={50} particleSize={3} />

        {/* Animation Layer 2: Light Rays */}
        <LightRays />

        {/* Gradient overlay — dark on right for text readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-background/95 via-background/70 to-transparent" />
      </div>

      {/* Content — aligned right (RTL) */}
      <div className="relative z-10 w-full px-4 md:px-[60px] md:pr-[120px] py-16 mt-8">
        <div className="max-w-xl mr-0 ml-auto text-right">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6"
          >
            <span className="text-accent text-lg">★</span>
            <span className="text-sm font-bold text-accent">מדורג #1 בישראל</span>
          </motion.div>

          {/* Main H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-heading text-4xl font-black leading-tight md:text-5xl lg:text-6xl"
          >
            <span className="text-text-primary">הבחירה של אלפי שחקנים —</span>
            <br />
            <span className="text-accent">הקזינו הטובים ביותר בישראל 2026</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 max-w-lg text-lg md:text-xl text-text-secondary mr-0 ml-auto leading-relaxed"
          >
            בונוסים עצומים, משחקים מהנים ורווחים אמיתיים מחכים לך עכשיו.
            <br />
            <span className="text-text-muted">בדקנו, דירגנו ובחרנו רק את המובטחים ביותר.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button href="/casinos" className="w-full sm:flex-1 text-base py-3">
              גלה את הקזינו המובילים ←
            </Button>
            <Button href="/blog" variant="outline" className="w-full sm:flex-1 text-base py-3 mb-[30px]">
              קרא ביקורות מלאות
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 flex items-center justify-end gap-6 text-sm text-text-muted"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>רישיון מלא</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>תשלומים מאובטחים</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>תמיכה 24/7</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
