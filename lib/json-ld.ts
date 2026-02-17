export function casinoReviewJsonLd(casino: {
  name: string;
  description: string;
  rating: number;
  slug: { current: string };
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
    },
    description: casino.description,
    publisher: {
      "@type": "Organization",
      name: "קזינו רז",
    },
  };
}
