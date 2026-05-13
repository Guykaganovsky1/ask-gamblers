import Link from "next/link";

const topicGroups = [
  {
    title: "בחירת קזינו אונליין בישראל",
    answer:
      "הבחירה מתחילה בבדיקת רישוי, תנאי בונוס, זמני משיכה, תמיכה ושקיפות מפעיל. דירוג גבוה בלי תנאים ברורים לא מספיק כדי להמליץ על אתר.",
    links: [
      { href: "/casinos", label: "קזינו מומלצים" },
      { href: "/review-methodology", label: "שיטת הדירוג" },
      { href: "/responsible-gambling", label: "משחק אחראי" },
    ],
  },
  {
    title: "בונוסים ותנאי הרשמה",
    answer:
      "בונוס טוב נמדד לפי דרישות הימור, משחקים מוחרגים, תוקף, תקרת משיכה ואפשרות לסרב לבונוס. סכום גבוה לבדו לא אומר שההצעה משתלמת.",
    links: [
      { href: "/bonuses", label: "בונוסי קזינו" },
      { href: "/blog/casino-bonuses-israel-guide", label: "מדריך בונוסים" },
      { href: "/affiliate-disclosure", label: "גילוי נאות" },
    ],
  },
  {
    title: "משחקים ותשלומים",
    answer:
      "לפני הפקדה כדאי לבדוק אם האתר מתאים למובייל, אילו משחקים זמינים, אילו שיטות תשלום נתמכות ומה כתוב במדיניות משיכה ואימות זהות.",
    links: [
      { href: "/games", label: "משחקי קזינו" },
      { href: "/blog/casino-payment-methods", label: "שיטות תשלום" },
      { href: "/blog/mobile-casino", label: "קזינו במובייל" },
    ],
  },
];

export function SeoTopicHub() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-bold text-accent">מדריך מהיר</p>
        <h2 className="mt-3 font-heading text-3xl font-black text-text-primary md:text-4xl">
          מה לבדוק לפני שבוחרים קזינו אונליין?
        </h2>
        <p className="mt-4 leading-relaxed text-text-secondary">
          התשובה הקצרה: לא לבחור לפי גובה הבונוס בלבד. אתר אמין צריך להציג מפעיל ברור,
          תנאי בונוס מלאים, אפשרויות תשלום, כלי משחק אחראי ומידע עדכני שניתן לבדיקה.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {topicGroups.map((group) => (
          <article key={group.title} className="rounded-xl border border-border-glass bg-card/40 p-6">
            <h3 className="font-heading text-xl font-bold text-text-primary">{group.title}</h3>
            <p className="mt-4 min-h-28 leading-relaxed text-text-muted">{group.answer}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-accent/25 px-3 py-2 text-sm font-bold text-accent transition-colors hover:bg-accent/10"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
