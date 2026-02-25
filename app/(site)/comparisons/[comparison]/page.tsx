"use client";

/**
 * COMPARISON PAGE TEMPLATE
 *
 * Usage: Create comparison pages like:
 * - /comparisons/casino-a-vs-casino-b
 * - /comparisons/roulette-casinos-2026
 * - /comparisons/mobile-vs-desktop-casinos
 *
 * This template is for client-side comparisons.
 * For SEO-optimized server-rendered comparisons,
 * create dedicated pages in the casinos/comparisons route.
 *
 * Example content structure:
 * 1. Hero section with comparison title
 * 2. Quick comparison grid (features vs casinos)
 * 3. Detailed comparison table
 * 4. Pros/Cons breakdown
 * 5. CTA buttons
 * 6. Related casinos sidebar
 * 7. FAQ section
 */

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Sample comparison data structure
interface ComparisonItem {
  name: string;
  description: string;
  rating: number;
  features: {
    bonus: string;
    wagering: string;
    methods: string[];
    license: string;
    games: number;
  };
  pros: string[];
  cons: string[];
  verdict: string;
}

// TODO: Replace with dynamic data from Sanity
const comparisonData: {
  title: string;
  items: ComparisonItem[];
} = {
  title: "Casino A vs Casino B",
  items: [
    {
      name: "Casino A",
      description: "מובילה בבונוסים",
      rating: 4.5,
      features: {
        bonus: "₪500 + 100 סיבובים",
        wagering: "35x",
        methods: ["Credit Card", "E-wallet", "Bank Transfer"],
        license: "Malta Gaming Authority",
        games: 2500,
      },
      pros: ["Bonus טובים", "תמיכה בעברית", "משיכה מהירה"],
      cons: ["דרישות הימור גבוהות"],
      verdict: "אפשרות טובה לבונוסים",
    },
    {
      name: "Casino B",
      description: "מיוחדת למכונות",
      rating: 4.7,
      features: {
        bonus: "₪250 + 200 סיבובים",
        wagering: "25x",
        methods: ["Credit Card", "Cryptocurrency"],
        license: "Curacao eGaming",
        games: 3000,
      },
      pros: ["דרישות נמוכות", "יותר משחקים", "עמלות נמוכות"],
      cons: ["תמיכה מוגבלת"],
      verdict: "מיוחדת למהנים במכונות",
    },
  ],
};

export default function ComparisonPage() {
  const { title, items } = comparisonData;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "דף הבית", href: "/" },
          { label: "בתי קזינו", href: "/casinos" },
          { label: title },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-black text-text-primary mb-4">
            {title}
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            השוואה מקיפה בין שני קזינוים מובילים בישראל. בדוק בונוסים, שיטות
            תשלום, ודירוגים.
          </p>
        </div>

        {/* Quick Comparison Grid */}
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          {items.map((casino) => (
            <div
              key={casino.name}
              className="rounded-2xl border border-border-glass bg-card-light p-8"
            >
              <div className="mb-6">
                <h2 className="font-heading text-2xl font-black text-text-primary mb-2">
                  {casino.name}
                </h2>
                <p className="text-text-secondary text-sm">{casino.description}</p>
              </div>

              <div className="mb-6 flex items-center gap-2">
                <span className="text-2xl font-black text-accent">
                  {casino.rating}
                </span>
                <span className="text-yellow-400">★★★★★</span>
              </div>

              <div className="space-y-4 mb-8 pb-8 border-b border-border-glass/50">
                <div>
                  <p className="text-xs text-text-muted font-semibold">בונוס</p>
                  <p className="text-text-primary font-bold">{casino.features.bonus}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted font-semibold">דרישות הימור</p>
                  <p className="text-text-primary">{casino.features.wagering}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted font-semibold">רישיון</p>
                  <p className="text-text-primary text-sm">
                    {casino.features.license}
                  </p>
                </div>
              </div>

              <Button
                href="#"
                className="w-full mb-3"
                rel="nofollow sponsored"
              >
                בחר {casino.name}
              </Button>
              <Button
                href={`#${casino.name.toLowerCase().replace(" ", "-")}`}
                variant="outline"
                className="w-full"
              >
                קרא ביקורה מלאה
              </Button>
            </div>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        <div className="mb-16 overflow-x-auto">
          <table className="w-full border border-border-glass rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-card">
                <th className="p-4 text-right font-heading font-bold text-text-primary">
                  תכונה
                </th>
                {items.map((casino) => (
                  <th
                    key={casino.name}
                    className="p-4 text-center font-heading font-bold text-text-primary"
                  >
                    {casino.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border-glass">
                <td className="p-4 text-right text-text-secondary font-semibold">
                  דירוג
                </td>
                {items.map((casino) => (
                  <td key={casino.name} className="p-4 text-center">
                    <span className="inline-block bg-accent/20 px-3 py-1 rounded-full font-bold text-accent">
                      {casino.rating}/5
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border-glass">
                <td className="p-4 text-right text-text-secondary font-semibold">
                  משחקים
                </td>
                {items.map((casino) => (
                  <td key={casino.name} className="p-4 text-center text-text-primary">
                    {casino.features.games}+
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border-glass">
                <td className="p-4 text-right text-text-secondary font-semibold">
                  רישיון
                </td>
                {items.map((casino) => (
                  <td
                    key={casino.name}
                    className="p-4 text-center text-text-primary text-sm"
                  >
                    {casino.features.license}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border-glass bg-emerald-neon/5">
                <td className="p-4 text-right text-text-secondary font-semibold">
                  יתרונות
                </td>
                {items.map((casino) => (
                  <td key={casino.name} className="p-4">
                    <ul className="space-y-1 text-sm text-text-secondary">
                      {casino.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-neon font-bold">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border-glass bg-red-500/5">
                <td className="p-4 text-right text-text-secondary font-semibold">
                  חסרונות
                </td>
                {items.map((casino) => (
                  <td key={casino.name} className="p-4">
                    <ul className="space-y-1 text-sm text-text-secondary">
                      {casino.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-400 font-bold">✕</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Verdict Section */}
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          {items.map((casino) => (
            <div
              key={casino.name}
              className="rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 p-6"
            >
              <h3 className="font-heading text-lg font-bold text-accent mb-2">
                הגבייה לגבי {casino.name}
              </h3>
              <p className="text-text-secondary leading-relaxed">{casino.verdict}</p>
            </div>
          ))}
        </div>

        {/* Related Casinos Section */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl font-black text-text-primary mb-8">
            קזינוים דומים שכדאי להכיר
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {/* TODO: Replace with actual casino cards from Sanity */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-border-glass bg-card-light p-6 hover:bg-card-light hover:border-accent/50 transition-all"
              >
                <div className="h-12 bg-card rounded mb-4" />
                <h3 className="font-heading font-bold text-text-primary mb-2">
                  Casino Placeholder {i}
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  תיאור קזינו קצר
                </p>
                <Button href="#" className="w-full" variant="outline">
                  בדוק זה
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl font-black text-text-primary mb-8">
            שאלות נפוצות
          </h2>
          <div className="space-y-4 max-w-3xl">
            {[
              {
                q: "איזה קזינו טוב יותר?",
                a: "זה תלוי בהעדפות שלך. Casino A טוב לבונוסים, Casino B טוב למכונות.",
              },
              {
                q: "שניהם בטוחים?",
                a: "כן, לשניהם רישיונות מחוקיות וכן בטוחים.",
              },
              {
                q: "אפשר לשחק משני הקזינוים?",
                a: "בהחלט! אתה יכול לפתוח חשבון בשניהם.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-border-glass bg-card-light/50 p-6"
              >
                <h3 className="font-heading font-bold text-text-primary mb-2">
                  {item.q}
                </h3>
                <p className="text-text-secondary">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 p-12 text-center">
          <h2 className="font-heading text-3xl font-black text-text-primary mb-4">
            בחר את הקזינו המושלם שלך
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto mb-8">
            שני הקזינוים הללו זוכים בהמלצה שלנו. בחר בהתאם להעדפות שלך
            ותהנה מחווית משחק מעולה!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {items.map((casino) => (
              <Button
                key={casino.name}
                href="#"
                rel="nofollow sponsored"
                className="px-8"
              >
                בחר {casino.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
