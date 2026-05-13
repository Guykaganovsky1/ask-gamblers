export function casinoReviewJsonLd(casino: {
  name: string;
  description: string;
  rating: number;
  slug: { current: string };
  clicks?: number;
  reviewedBy?: {
    name: string;
  };
  lastCheckedAt?: string;
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
    dateModified: casino.lastCheckedAt,
    author: casino.reviewedBy
      ? {
          "@type": "Person",
          name: casino.reviewedBy.name,
        }
      : {
          "@type": "Organization",
          name: "Ask Gamblers",
          url: "https://askgamblers.co.il",
        },
    publisher: {
      "@type": "Organization",
      name: "Ask Gamblers",
      url: "https://askgamblers.co.il",
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ask Gamblers",
    "description": "המדריך המלא לקזינו אונליין בישראל - ביקורות, בונוסים ודירוגים",
    "url": "https://askgamblers.co.il",
    "telephone": "+972-50-920-0920",
    "email": "contact@askgamblers.co.il",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IL",
      "addressLocality": "Israel"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Israel"
    },
    "inLanguage": "he",
    "priceRange": "₪₪₪₪"
  };
}
