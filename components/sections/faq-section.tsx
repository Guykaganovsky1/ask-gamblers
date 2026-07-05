interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "האם קזינו אונליין חוקי בישראל?",
    answer: "נכון ל-2026, אין רגולציה רשמית על קזינו אונליין בישראל. שחקנים שבוחנים אתר בינלאומי צריכים לבדוק מי המפעיל, איזה רישיון מוצג, מהם תנאי השימוש והאם קיימים כלי משחק אחראי."
  },
  {
    question: "איך בודקים קזינו אונליין לפני הרשמה?",
    answer: "לפני שנרשמים לקזינו כלשהו, בדקו את הדברים הבאים: 1) מי המפעיל ואיזה רישיון מוצג? 2) האם יש תמיכה בשפה שאתם מבינים? 3) אילו שיטות תשלום קיימות? 4) מה תנאי הבונוסים? 5) האם קיימים כלים למשחק אחראי?"
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
    answer: "זמן המשיכה תלוי בשיטת התשלום, באימות הזהות ובתנאי הקזינו. קריפטו וארנקים דיגיטליים יכולים להיות מהירים יותר, בעוד העברות בנקאיות וכרטיסי אשראי עשויים לקחת כמה ימי עסקים. בדקו את מדיניות המשיכה לפני הפקדה."
  }
];

function FAQItem({ item, index }: { item: FAQItem; index: number }) {
  return (
    <details
      className="group animate-fade-in overflow-hidden rounded-xl border border-border-glass bg-card-light/30"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <summary className="flex w-full cursor-pointer list-none items-center justify-between p-5 text-right transition-colors hover:bg-card-light/50 [&::-webkit-details-marker]:hidden">
        <span className="font-heading font-bold text-text-primary pr-4">{item.question}</span>
        <span className="flex-shrink-0 text-accent transition-transform duration-200 group-open:rotate-180">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </summary>
      <p className="px-5 pb-5 text-text-secondary leading-relaxed">{item.answer}</p>
    </details>
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
