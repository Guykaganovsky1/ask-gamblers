import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { CASINOS_QUERY } from "@/sanity/lib/queries";
import { Casino } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StarRating } from "@/components/ui/star-rating";

export const revalidate = 3600;

interface Props {
  params: Promise<{ comparison: string }>;
}

const COMPARISON_MAP: Record<string, string[]> = {
  "bet365-vs-leovegas": ["bet365", "leovegas"],
  "unibet-vs-playojo": ["unibet", "playojo"],
  "all-casinos": ["bet365", "leovegas", "unibet", "playojo"],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { comparison } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";
  
  return {
    title: "השוואת בתי קזינו | Ask Gamblers",
    description: "השוואה מפורטת בין בתי קזינו מובילים - דירוגים, בונוסים, ותכונות",
    alternates: {
      canonical: `${baseUrl}/comparisons/${comparison}`,
    },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { comparison } = await params;
  const casinoSlugs = COMPARISON_MAP[comparison];

  if (!casinoSlugs) {
    notFound();
  }

  const casinos = await client.fetch<Casino[]>(CASINOS_QUERY);
  const comparisonCasinos = casinos.filter((c) =>
    casinoSlugs.includes(c.slug.current)
  );

  if (comparisonCasinos.length === 0) {
    notFound();
  }

  return (
    <>
      <PageHero title="השוואת בתי קזינו" subtitle="בחר את בית הקזינו המתאים לך" badge="השוואה" />
      <Breadcrumb
        items={[
          { label: "דף הבית", href: "/" },
          { label: "השוואות", href: "/comparisons" },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <section className="mb-16">
          <h2 className="font-heading text-2xl md:text-3xl font-black text-text-primary mb-8">
            השוואה מהירה
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {comparisonCasinos.map((casino) => (
              <div key={casino._id} className="rounded-lg border border-border-glass bg-card-light p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-xl font-bold text-text-primary">
                    {casino.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-bold text-lg">{casino.rating}</span>
                    <StarRating rating={casino.rating} />
                  </div>
                </div>
                <p className="text-text-secondary mb-4">{casino.description}</p>
                {casino.bonusTitle && (
                  <div className="mb-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
                    <p className="text-sm text-text-muted mb-1">בונוס עדכני</p>
                    <p className="font-semibold text-accent">{casino.bonusTitle}</p>
                  </div>
                )}
                <Button href={`/go/${casino.slug.current}`} className="w-full" rel="nofollow sponsored">
                  בקר בחנות
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([{ name: "דף הבית", url: "/" }, { name: "השוואות", url: "/comparisons" }])) }} />
    </>
  );
}
