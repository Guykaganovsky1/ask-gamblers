export function casinoReviewJsonLd(casino: {
  name: string;
  description: string;
  rating: number;
  slug: { current: string };
  clicks?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Organization",
      name: casino.name,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: casino.rating,
      bestRating: 5,
      worstRating: 1,
    },
    description: casino.description,
    publisher: {
      "@type": "Organization",
      name: "Ask Gamblers",
      url: "https://askgamblers.co.il",
    },
  };
}

export function casinoAggregateRatingJsonLd(casino: {
  name: string;
  rating: number;
  clicks?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: casino.rating,
    bestRating: 5,
    worstRating: 1,
    reviewCount: Math.max(1, Math.ceil((casino.clicks || 0) / 50)), // Estimate based on clicks
  };
}
