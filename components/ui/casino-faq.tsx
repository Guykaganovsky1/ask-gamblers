"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface CasinoFAQProps {
  casinoName: string;
  faqs: FAQItem[];
}

export function CasinoFAQ({ casinoName, faqs }: CasinoFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-16 py-12">
      <div className="mb-8">
        <h2 className="font-heading text-2xl md:text-3xl font-black text-text-primary mb-2">
          שאלות נפוצות ב{casinoName}
        </h2>
        <div className="w-16 h-1 bg-accent rounded-full" />
      </div>

      <div className="space-y-4 max-w-3xl">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-border-glass rounded-lg overflow-hidden bg-card-light/50 hover:bg-card-light transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-card-light/50 transition-colors"
            >
              <h3 className="font-heading font-bold text-text-primary pr-4">
                {faq.question}
              </h3>
              <span
                className={`flex-shrink-0 text-accent text-xl font-bold transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {openIndex === index && (
              <div className="px-6 pb-6 pt-2 border-t border-border-glass/50">
                <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
