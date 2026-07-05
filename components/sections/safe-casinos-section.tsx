const safetyChecks = [
  {
    icon: "📜",
    title: "בדיקת רישוי",
    description: "פרטי מפעיל, מדינת פיקוח ותנאי שימוש גלויים"
  },
  {
    icon: "🔒",
    title: "פרטיות ואבטחה",
    description: "מידע על הצפנה, אימות זהות ומדיניות פרטיות"
  },
  {
    icon: "🎮",
    title: "מידע על משחקים",
    description: "ספקי תוכן, כללי משחק ותנאים שמופיעים באתר"
  },
  {
    icon: "💰",
    title: "תשלומים ומשיכות",
    description: "זמני טיפול, עמלות, מסמכים ומגבלות משיכה"
  },
  {
    icon: "💬",
    title: "ערוצי תמיכה",
    description: "זמינות צ'אט, מייל, שפות וזמני מענה מוצהרים"
  },
  {
    icon: "🛡️",
    title: "הגנת שחקנים",
    description: "כלים למשחק אחראי והגבלות"
  }
];

export function SafeCasinosSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="animate-fade-in rounded-2xl border border-emerald/30 bg-gradient-to-br from-emerald/10 to-emerald/5 p-8 md:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald/20 rounded-xl">
            <svg className="w-8 h-8 text-emerald" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-heading text-xl md:text-2xl font-bold text-text-primary">
              מה אנחנו בודקים לפני שמציגים קזינו
            </h3>
            <p className="text-text-secondary text-sm mt-1">
              רשימת בדיקות בסיסית להשוואה לפני הרשמה
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {safetyChecks.map((check, index) => (
            <div
              key={check.title}
              className="animate-slide-up rounded-xl bg-card/50 p-4 text-center"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="text-3xl mb-2">{check.icon}</div>
              <h3 className="font-heading font-bold text-text-primary text-sm mb-1">
                {check.title}
              </h3>
              <p className="text-text-muted text-xs leading-relaxed">
                {check.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
