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
    <section
      className="mt-16 py-12"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <h2 className="font-heading text-2xl md:text-3xl font-black text-text-primary mb-8">
        שאלות נפוצות ב{casinoName}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg border border-border-glass bg-card-light overflow-hidden"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-card-light/80 transition-colors text-right"
            >
              <span
                className={`flex-shrink-0 text-accent text-lg font-bold transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
              <h3
                className="text-lg font-semibold text-text-primary flex-1 mr-4"
                itemProp="name"
              >
                {faq.question}
              </h3>
            </button>
            {openIndex === index && (
              <div
                className="px-6 pb-6 bg-card border-t border-border-glass"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p className="text-text-secondary leading-relaxed" itemProp="text">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
