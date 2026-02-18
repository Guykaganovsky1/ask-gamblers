"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[75vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay — dark on right for text readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-background/95 via-background/70 to-transparent" />
      </div>

      {/* Content — aligned right (RTL) */}
      <div className="relative z-10 w-full px-4 py-14">
        <div className="max-w-xl mr-0 ml-auto text-right">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-heading text-4xl font-black leading-tight md:text-6xl"
          >
            קזינו אונליין
            <br />
            בטוח ורווחי — הבחירה המושכלת
            <br />
            של אלפי שחקנים
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 max-w-lg text-lg text-text-muted mr-0 ml-auto"
          >
            אנחנו בדקנו כל פרט של כל קזינו. אתם מקבלים בחירה
            בטוחה, מובטחת ומדורגת על ידי מומחים אמיתיים.
            לא עוד בזבוז זמן וכסף על קזינו לא אמינים.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button href="/casinos" className="sm:flex-1">בחרו קזינו בטוח היום</Button>
            <Button href="/blog" variant="outline" className="sm:flex-1">גלו טיפים שמנצחים</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
