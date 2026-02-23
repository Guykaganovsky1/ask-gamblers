"use client";

import { useInViewOnce } from "@/lib/animations";

const notRecommendedCasinos = [
  {
    name: "Casinoin",
    rating: 2,
    reasons: [
      "עיכובים חוזרים ונשנים במשיכת כספים",
      "תנאי בונוסים לא ברורים ומבלבלים",
      "רישוי חוץ-יבשתי חלש וללא פיקוח אמין",
      "היעדר כלים לאחריות אישית"
    ]
  },
  {
    name: "Betmaster",
    rating: 2,
    reasons: [
      "שירות לקוחות איטי ולעיתים לא זמין",
      "בעיות אימות זהות ותהליכים מסובכים",
      "עיכובים בתשלומי זכיות",
      "מדיניות לא שקופה בכל הקשור לבונוסים"
    ]
  },
  {
    name: "Bongo",
    rating: 1,
    reasons: [
      "תלונות רבות על חסימות פתאומיות של חשבונות",
      "חוסר כלים אמיתיים להגנה על שחקנים",
      "בעיות אמון חמורות בקהילה",
      "שקיפות ופרטיות נתונים ברמה נמוכה"
    ]
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" dir="ltr">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-red-500" : "text-gray-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function NotRecommendedSection() {
  const { ref, isInView } = useInViewOnce(0.1);

  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-1 h-8 bg-red-500 rounded" />
        <h2 className="font-heading text-2xl md:text-3xl font-black text-text-primary">
          קזינו שאיננו ממליצים עליהם — שקיפות מלאה
        </h2>
      </div>

      <p className="text-text-secondary mb-8 max-w-3xl leading-relaxed">
        אנחנו לא ממליצים לשחק בקזינו הבאים. במהלך הסקירות שלנו מצאנו ליקויים מהותיים בשירות, 
        בשקיפות ובאמינות. שחקנים דיווחו על עיכובים בהעברות כספים, תשלומים שבוטלו ללא סיבה ברורה 
        ותנאי בונוסים מבלבלים.
      </p>

      <div ref={ref as React.RefObject<HTMLDivElement>} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {notRecommendedCasinos.map((casino, index) => (
          <div
            key={casino.name}
            className={`border border-red-500/30 rounded-xl bg-red-500/5 p-6 ${isInView ? "animate-slide-up" : "opacity-0"}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-text-primary">{casino.name}</h3>
              <StarRating rating={casino.rating} />
            </div>

            <ul className="space-y-2">
              {casino.reasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className={`mt-8 p-6 rounded-xl bg-emerald/10 border border-emerald/30 ${isInView ? "animate-fade-in" : "opacity-0"}`}
        style={{ animationDelay: "0.4s" }}
      >
        <div className="flex items-start gap-4">
          <svg className="w-8 h-8 text-emerald flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="font-heading font-bold text-text-primary mb-2">למה אנחנו מפרסמים את זה?</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              המטרה שלנו היא להגן על שחקנים ישראלים. אנחנו מעדיפים לאבד עמלות שיווקיות מאשר להמליץ על אתר 
              שעלול לפגוע בשחקנים. כל הקזינו ברשימה שלנו נבדקו בפועל, והביקורות שלנו מבוססות על ניסיון אמיתי.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}