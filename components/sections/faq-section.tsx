"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "האם קזינו אונליין חוקי בישראל?",
    answer: "נכון ל-2026, אין רגולציה רשמית על קזינו אונליין בישראל, אך שחקנים רבים פונים לאתרים עם רישיון בינלאומי חוקי. כל עוד אתם בוחרים קזינו עם רישיון Curacao או MGA — אתם בידיים טובות. אנחנו ממליצים רק על אתרים עם רישיון תקף ומוכר."
  },
  {
    question: "איך בוחרים קזינו אונליין בטוח?",
    answer: "לפני שנרשמים לקזינו כלשהו, בדקו את הדברים הבאים: 1) האם יש רישיון חוקי (Curacao, MGA)? 2) האם יש תמיכה בעברית? 3) אילו שיטות תשלום קיימות? 4) מה תנאי הבונוסים? 5) האם יש ביקורות חיוביות משחקנים אחרים? כל בתי הקזינו באתר שלנו עברו את כל הבדיקות האלה."
  },
  {
    question: "אילו שיטות תשלום מקובלות בקזינו אונליין?",
    answer: "רוב בתי הקזינו המובילים מקבלים: כרטיסי אשראי בינלאומיים (ויזה, מאסטרקארד), העברות בנקאיות, ארנקים דיגיטליים (Skrill, Neteller), ומטבעות קריפטוגרפיים (Bitcoin, Ethereum, USDT). חשוב לבדוק זמני עיבוד ועמלות לפני בחירת שיטת תשלום."
  },
  {
    question: "מה זה בונוס הרשמה ואיך מממשים אותו?",
    answer: "בונוס הרשמה הוא הטבה שמקבלים עם הפקדה ראשונה, בדרך כלל התאמה של 100%-200% מסכום ההפקדה + סיבובים חינם. חשוב לקרוא את תנאי הבונוס — במיוחד את דרישות ההימור (Wagering Requirements) שקובעות כמה פעמים צריך להמר על הכסף לפני שניתן למשוך אותו."
  },
  {
    question: "כמה זמן לוקח לקבל את הכסף אחרי זכייה?",
    answer: "זמן המשיכה תלוי בשיטת התשלום ובקזינו עצמו. קריפטו — מיידי עד 24 שעות. ארנקים דיגיטליים — 24-48 שעות. העברות בנקאיות — 3-7 ימי עסקים. כרטיסי אשראי — 3-5 ימי עסקים. אנחנו ממליצים על קזינו עם זמני משיכה מהירים."
  }
];

function FAQItem({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border border-border-glass rounded-xl overflow-hidden bg-card-light/30"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-right hover:bg-card-light/50 transition-colors"
      >
        <span className="font-heading font-bold text-text-primary pr-4">{item.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-accent flex-shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-text-secondary leading-relaxed">{item.answer}</p>
      </motion.div>
    </motion.div>
  );
}

export function FAQSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-1 h-8 bg-accent rounded" />
        <h2 className="font-heading text-2xl md:text-3xl font-black text-text-primary">
          שאלות נפוצות על קזינו אונליין בישראל
        </h2>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <FAQItem key={index} item={item} index={index} />
        ))}
      </div>

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map((item) => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />
    </section>
  );
}
