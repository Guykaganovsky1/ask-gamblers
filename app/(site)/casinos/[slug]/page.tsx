import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { CASINO_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { Casino } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { casinoReviewJsonLd } from "@/lib/json-ld";
import { generateFAQSchema } from "@/lib/seo";
import { StarRating } from "@/components/ui/star-rating";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CasinoFAQ } from "@/components/ui/casino-faq";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const casino = await client.fetch<Casino>(CASINO_BY_SLUG_QUERY, { slug });
  if (!casino) return {};
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";
  const title = casino.seoTitle || `${casino.name} - ביקורת קזינו | Ask Gamblers`;
  const description = casino.seoDescription || `${casino.name}: ביקורת קזינו לישראלים עם דירוג, יתרונות, חסרונות, בונוס, שיטת בדיקה וגילוי נאות של Ask Gamblers.`;
  const imageUrl = casino.logo ? urlFor(casino.logo).width(1200).height(630).url() : `${baseUrl}/og-image.png`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/casinos/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${baseUrl}/casinos/${slug}`,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function CasinoReviewPage({ params }: Props) {
  const { slug } = await params;
  const casino = await client.fetch<Casino>(CASINO_BY_SLUG_QUERY, { slug });
  if (!casino) notFound();
  const categoryNames = casino.categories?.map((cat) => cat.name).filter(Boolean) || [];
  const hasBonus = Boolean(casino.bonusAmount);

  return (
    <>
      <PageHero
        title={casino.name}
        subtitle={casino.description}
        badge="ביקורת קזינו"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "בתי קזינו", href: "/casinos" }, { label: casino.name }]} />
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative h-20 w-40">
          {casino.logo && (
            <Image
              src={urlFor(casino.logo).width(320).height(160).url()}
              alt={casino.name}
              fill
              sizes="(max-width: 768px) 160px, 160px"
              className="object-contain"
            />
          )}
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-black">{casino.name}</h2>
        <StarRating rating={casino.rating} size="lg" />
      </div>

      {casino.bonusAmount && (
        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center">
          <p className="text-sm text-text-muted">{casino.bonusTitle}</p>
          <p className="mt-2 font-heading text-3xl font-black text-accent">
            <AnimatedCounter value={casino.bonusAmount} />
          </p>
          {casino.wageringRequirement && (
            <p className="mt-2 text-xs text-text-muted">דרישות הימור: {casino.wageringRequirement}</p>
          )}
          <div className="mt-6">
            <Button href={`/go/${casino.slug.current}`} rel="nofollow sponsored">
              קבל בונוס
            </Button>
          </div>
        </div>
      )}

      <div className="mt-12">
        <h2 className="font-heading text-2xl font-bold">סקירה</h2>
        <p className="mt-4 text-text-muted leading-relaxed">{casino.description}</p>
        <p className="mt-4 text-text-muted leading-relaxed">
          הביקורת הזו נכתבה עבור שחקנים ישראלים שרוצים להבין לא רק מה גובה הבונוס,
          אלא גם האם תנאי המשחק ברורים, האם חוויית ההרשמה סבירה, ומה חשוב לבדוק
          לפני שמפקידים כסף אמיתי. הדירוג שלנו משלב בדיקת חוויית משתמש, שקיפות,
          תנאי בונוס, זמינות משחקים, תמיכה ושיקולי משחק אחראי.
        </p>
      </div>

      <section className="mt-12 rounded-2xl border border-border-glass bg-card/40 p-6">
        <h2 className="font-heading text-2xl font-bold">איך בדקנו את {casino.name}</h2>
        <p className="mt-4 text-text-muted leading-relaxed">
          Ask Gamblers מדרג קזינו לפי מסגרת בדיקה קבועה: קריאת תנאי הבונוס, בדיקת
          מידע על רישוי ובעלות שמופיע באתר הקזינו, איכות התשלום והמשיכה, זמינות
          משחקים פופולריים, תמיכה ללקוחות, התאמה למובייל ושקיפות מול שחקנים.
          כאשר מידע מסוים לא זמין או לא ברור, אנחנו מתייחסים לכך כחולשה ולא
          כיתרון.
        </p>
        <ul className="mt-5 grid gap-3 text-sm text-text-muted md:grid-cols-2">
          <li className="rounded-lg border border-border-glass bg-background/40 p-4">בדיקת תנאי בונוס, דרישות הימור ותקרות משיכה.</li>
          <li className="rounded-lg border border-border-glass bg-background/40 p-4">בדיקת אפשרויות תשלום, משיכה וזמני טיפול משוערים.</li>
          <li className="rounded-lg border border-border-glass bg-background/40 p-4">בדיקת התאמה לשחקנים ישראלים, עברית, מובייל ותמיכה.</li>
          <li className="rounded-lg border border-border-glass bg-background/40 p-4">בדיקת כלים למשחק אחראי, מגבלות והגנת שחקנים.</li>
        </ul>
        <p className="mt-5 text-sm text-text-muted">
          לפירוט מלא קראו את{" "}
          <Link href="/review-methodology" className="text-accent hover:text-accent-light">
            שיטת הדירוג שלנו
          </Link>
          .
        </p>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border-glass bg-card/40 p-6">
          <h2 className="font-heading text-2xl font-bold">בטיחות ושקיפות</h2>
          <p className="mt-4 text-text-muted leading-relaxed">
            לפני הרשמה ל-{casino.name}, חשוב לבדוק בעמודי הקזינו את פרטי החברה,
            הרישיון, מדיניות האימות, תנאי המשיכה וכלי ההגבלה העצמית. אנחנו
            ממליצים להימנע מכל אתר שלא מציג תנאים ברורים או שמקשה למצוא מידע על
            זהות המפעיל, מגבלות בונוס ותהליך טיפול במשיכות.
          </p>
        </div>
        <div className="rounded-2xl border border-border-glass bg-card/40 p-6">
          <h2 className="font-heading text-2xl font-bold">בונוס ותנאים</h2>
          <p className="mt-4 text-text-muted leading-relaxed">
            {hasBonus
              ? `ההצעה שמופיעה אצלנו עבור ${casino.name} היא ${casino.bonusTitle || "בונוס"} ${casino.bonusAmount}. לפני מימוש ההצעה צריך לבדוק דרישות הימור, משחקים שמוחרגים מהבונוס, תוקף הבונוס ותקרת משיכה.`
              : `כרגע לא מוצג אצלנו בונוס פעיל עבור ${casino.name}. אם מוצעת לכם הטבה באתר הקזינו עצמו, בדקו את דרישות ההימור, תוקף ההצעה ותקרת המשיכה לפני הפקדה.`}
          </p>
          {casino.wageringRequirement && (
            <p className="mt-3 text-sm text-text-muted">דרישת הימור שמופיעה אצלנו: {casino.wageringRequirement}</p>
          )}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-border-glass bg-card/40 p-6">
        <h2 className="font-heading text-2xl font-bold">למי {casino.name} מתאים?</h2>
        <p className="mt-4 text-text-muted leading-relaxed">
          {categoryNames.length > 0
            ? `${casino.name} מופיע אצלנו בקטגוריות ${categoryNames.join(", ")}. לכן הוא יכול להתאים לשחקנים שמחפשים את סוגי המשחק או ההצעות האלה, כל עוד תנאי האתר מתאימים לתקציב ולרמת הניסיון שלהם.`
            : `${casino.name} יכול להתאים לשחקנים שמעדיפים לבדוק קזינו לפי דירוג, בונוס, חוויית מובייל ותנאי תשלום לפני הרשמה.`}
          שחקנים חדשים צריכים להתחיל בסכומים קטנים, לקרוא את תנאי הבונוס במלואם
          ולהגדיר מראש תקציב וזמן משחק.
        </p>
      </section>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {casino.pros && casino.pros.length > 0 && (
          <div className="rounded-2xl border border-emerald-neon/20 bg-emerald-neon/5 p-6">
            <h3 className="font-heading text-lg font-bold text-emerald-neon">יתרונות</h3>
            <ul className="mt-4 space-y-2">
              {casino.pros.map((pro: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                  <span className="text-emerald-neon">✓</span> {pro}
                </li>
              ))}
            </ul>
          </div>
        )}
        {casino.cons && casino.cons.length > 0 && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <h3 className="font-heading text-lg font-bold text-red-400">חסרונות</h3>
            <ul className="mt-4 space-y-2">
              {casino.cons.map((con: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                  <span className="text-red-400">✕</span> {con}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {casino.categories && casino.categories.length > 0 && (
        <div className="mt-12">
          <h3 className="font-heading text-lg font-bold">קטגוריות</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {casino.categories.map((cat) => (
              <span key={cat._id} className="rounded-full border border-border-glass bg-card px-4 py-1 text-sm text-text-muted">
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <section className="mt-12 rounded-2xl border border-border-glass bg-card/40 p-6">
        <h2 className="font-heading text-2xl font-bold">לפני הרשמה</h2>
        <ul className="mt-4 space-y-3 text-text-muted">
          <li>בדקו שהשם והכתובת של מפעיל הקזינו מופיעים באתר הקזינו.</li>
          <li>קראו את תנאי הבונוס, במיוחד דרישות הימור, תוקף ותקרת משיכה.</li>
          <li>ודאו שאפשרויות ההפקדה והמשיכה מתאימות לכם לפני הפקדה.</li>
          <li>הגדירו תקציב, מגבלת זמן ומגבלת הפסד מראש.</li>
          <li>אם המשחק כבר לא מרגיש כמו בידור, עצרו ופנו לעזרה מקצועית.</li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <Link href="/responsible-gambling" className="rounded-lg border border-accent/30 px-4 py-2 text-accent hover:bg-accent/10">
            משחק אחראי
          </Link>
          <Link href="/affiliate-disclosure" className="rounded-lg border border-accent/30 px-4 py-2 text-accent hover:bg-accent/10">
            גילוי נאות
          </Link>
        </div>
      </section>

      {casino.faqs && casino.faqs.length > 0 && (
        <CasinoFAQ casinoName={casino.name} faqs={casino.faqs} />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(casinoReviewJsonLd(casino)),
        }}
      />
      {casino.faqs && casino.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema(casino.faqs)),
          }}
        />
      )}
    </div>
    </>
  );
}
