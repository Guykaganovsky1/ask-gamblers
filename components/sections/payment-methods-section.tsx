"use client";

import { motion } from "framer-motion";

const paymentMethods = [
  {
    name: "כרטיסי אשראי",
    icon: "💳",
    description: "ויזה, מאסטרקארד",
    speed: "3-5 ימים",
    fees: "ללא עמלה",
    recommended: true
  },
  {
    name: "קריפטו",
    icon: "₿",
    description: "Bitcoin, Ethereum, USDT",
    speed: "מיידי - 24 שעות",
    fees: "ללא עמלה",
    recommended: true
  },
  {
    name: "ארנקים דיגיטליים",
    icon: "📱",
    description: "Skrill, Neteller",
    speed: "24-48 שעות",
    fees: "עמלה נמוכה",
    recommended: false
  },
  {
    name: "העברה בנקאית",
    icon: "🏦",
    description: "העברה מקומית/בינלאומית",
    speed: "3-7 ימים",
    fees: "תלוי בבנק",
    recommended: false
  }
];

export function PaymentMethodsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-8 bg-accent rounded" />
        <h2 className="font-heading text-2xl md:text-3xl font-black text-text-primary">
          שיטות תשלום מומלצות לשחקנים ישראלים
        </h2>
      </div>

      <p className="text-text-secondary mb-10 max-w-3xl leading-relaxed">
        לפני שבוחרים קזינו, חשוב לבדוק אילו שיטות תשלום הוא תומך. הנה השיטות הפופולריות ביותר 
        עבור שחקנים ישראלים, כולל זמני עיבוד ועמלות:
      </p>

      {/* Payment Methods Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {paymentMethods.map((method, index) => (
          <motion.div
            key={method.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-6 rounded-xl border ${
              method.recommended 
                ? 'border-accent/50 bg-accent/5' 
                : 'border-border-glass bg-card-light/30'
            }`}
          >
            {method.recommended && (
              <span className="absolute -top-3 right-4 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                מומלץ
              </span>
            )}
            
            {/* Icon */}
            <div className="text-4xl mb-4">{method.icon}</div>
            
            {/* Name */}
            <h3 className="font-heading font-bold text-text-primary text-lg mb-2">
              {method.name}
            </h3>
            
            {/* Description */}
            <p className="text-text-muted text-sm mb-4">{method.description}</p>
            
            {/* Details */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">מהירות:</span>
                <span className="text-text-secondary">{method.speed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">עמלות:</span>
                <span className="text-text-secondary">{method.fees}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
