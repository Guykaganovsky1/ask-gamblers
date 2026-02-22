"use client";

import { motion } from "framer-motion";

const roadmapSteps = [
  {
    number: "1",
    title: "בדקו רישיון",
    description: "האם יש רישיון חוקי כמו Curacao או MGA? בלי רישיון — לא נכנסים.",
    icon: "📜"
  },
  {
    number: "2",
    title: "בדקו תמיכה בעברית",
    description: "האם האתר תומך בשפה העברית או באנגלית ברורה?",
    icon: "🗣️"
  },
  {
    number: "3",
    title: "בדקו שיטות תשלום",
    description: "אילו אפשרויות הפקדה ומשיכה קיימות? כרטיס אשראי, ביטקוין, ארנק דיגיטלי?",
    icon: "💳"
  },
  {
    number: "4",
    title: "בדקו את הבונוסים",
    description: "האם הבונוסים הגיוניים? בלי דרישות מוגזמות או אותיות קטנות מסובכות?",
    icon: "🎁"
  },
  {
    number: "5",
    title: "בדקו תמיכה בנייד",
    description: "האם יש תמיכה בנייד? רוב המשתמשים בארץ משחקים מהטלפון.",
    icon: "📱"
  }
];

export function PlayerRoadmapSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 bg-card/30 rounded-3xl my-8">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-bold mb-4"
        >
          מרגישים אבודים?
        </motion.span>
        <h2 className="font-heading text-2xl md:text-3xl font-black text-text-primary mb-4">
          מפת הדרכים לשחקן הישראלי
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
          עולם הקזינו אונליין יכול להיות מבלבל. הנה 5 הדברים שחייבים לבדוק לפני שבוחרים קזינו:
        </p>
      </div>

      {/* Roadmap Steps */}
      <div className="space-y-6">
        {roadmapSteps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-6 rounded-xl bg-card-light/50 border border-border-glass hover:border-accent/30 transition-colors"
          >
            {/* Number */}
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
              <span className="font-heading font-bold text-accent text-lg">{step.number}</span>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{step.icon}</span>
                <h3 className="font-heading font-bold text-text-primary text-lg">{step.title}</h3>
              </div>
              <p className="text-text-secondary leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-10 text-center"
      >
        <p className="text-text-secondary">
          רק קזינו שעומד בכל הקריטריונים האלה שווה את הזמן והכסף שלכם.
        </p>
      </motion.div>
    </section>
  );
}
