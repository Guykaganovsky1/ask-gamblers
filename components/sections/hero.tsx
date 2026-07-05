import Link from "next/link";

export function Hero() {
  return (
    <section 
      className="relative min-h-[80vh] flex items-center overflow-hidden pt-0.5 -mt-5 md:mt-0 md:pt-8"
      // Inline gradient renders instantly for LCP - no image wait
      style={{
        background: 'linear-gradient(135deg, #0B0E14 0%, #1a1a2e 50%, #16213e 100%)',
      }}
    >
      <picture className="absolute inset-0 block">
        <source media="(min-width: 1280px)" srcSet="/images/hero-bg-desktop.webp" type="image/webp" />
        <source media="(min-width: 768px)" srcSet="/images/hero-bg-tablet.webp" type="image/webp" />
        <img
          src="/images/hero-bg-mobile.webp"
          alt=""
          width={780}
          height={439}
          className="h-full w-full object-cover object-[35%_center] md:object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      
      <div className="absolute inset-0 bg-gradient-to-l from-background/95 via-background/70 to-transparent" />

      <div className="relative z-10 w-full px-4 md:px-[60px] md:pr-[120px] py-16">
        <div className="max-w-xl mr-0 ml-auto text-right">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6">
            <span className="text-accent text-lg">★</span>
            <span className="text-sm font-bold text-accent">בדיקות קזינו לישראלים</span>
          </div>

          <h1 className="font-heading text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
            <span className="text-text-primary">השוואת קזינו אונליין —</span>
            <br />
            <span className="text-accent">בתי קזינו בישראל 2026</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg md:text-xl text-text-secondary mr-0 ml-auto leading-relaxed">
            ביקורות, בונוסים, תשלומים, משחקים וכללי משחק אחראי במקום אחד.
            <br />
            <span className="text-text-muted">בדקנו את הפרטים החשובים לפני הרשמה והפקדה.</span>
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/casinos"
              prefetch={false}
              className="w-full sm:flex-1 text-base py-3 px-6 rounded-lg bg-accent text-background font-bold text-center hover:bg-accent/90 transition-colors"
            >
              השוואת בתי קזינו בישראל ←
            </Link>
            <Link
              href="/blog"
              prefetch={false}
              className="w-full sm:flex-1 text-base py-3 px-6 rounded-lg border border-accent text-accent font-bold text-center hover:bg-accent/10 transition-colors "
            >
              מדריכי קזינו אונליין
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-end gap-6 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>בדיקת רישוי</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>תשלומים ומשיכות</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>תנאי בונוס</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
