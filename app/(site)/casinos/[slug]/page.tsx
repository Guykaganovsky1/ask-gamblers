import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { CASINO_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { Casino } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { casinoReviewJsonLd } from "@/lib/json-ld";
import { StarRating } from "@/components/ui/star-rating";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Button } from "@/components/ui/button";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const casino = await client.fetch<Casino>(CASINO_BY_SLUG_QUERY, { slug });
  if (!casino) return {};
  return {
    title: `${casino.name} - ביקורת | קזינו רז`,
    description: casino.description,
  };
}

export default async function CasinoReviewPage({ params }: Props) {
  const { slug } = await params;
  const casino = await client.fetch<Casino>(CASINO_BY_SLUG_QUERY, { slug });
  if (!casino) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative h-20 w-40">
          <Image
            src={urlFor(casino.logo).width(320).height(160).url()}
            alt={casino.name}
            fill
            className="object-contain"
          />
        </div>
        <h1 className="font-heading text-4xl font-black">{casino.name}</h1>
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
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {casino.pros?.length > 0 && (
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
        {casino.cons?.length > 0 && (
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

      {casino.categories?.length > 0 && (
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(casinoReviewJsonLd(casino)),
        }}
      />
    </div>
  );
}
