const SITE_NAME = "Ask Gamblers";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";
const SITE_DESCRIPTION = "Ask Gamblers ישראל הוא מדריך עברי לבדיקת קזינו אונליין, בונוסים, תשלומים ומשחק אחראי לשחקנים ישראלים.";

export interface ArticlePost {
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  modifiedAt?: string;
  _createdAt?: string;
  author?: {
    name: string;
    image?: string;
  };
  reviewedBy?: {
    name: string;
    image?: string;
  };
  featuredImage?: string;
  body?: unknown;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateArticleSchema(post: ArticlePost) {
  const articleUrl = `${SITE_URL}/blog/${post.slug.current}`;
  
  // Fix null dates - use _createdAt as fallback or remove field
  const publishedDate = post.publishedAt || post._createdAt || undefined;
  const modifiedDate = post.modifiedAt || post.publishedAt || post._createdAt || undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    headline: post.title,
    description: post.excerpt || SITE_DESCRIPTION,
    image: post.featuredImage ? [post.featuredImage] : undefined,
    ...(publishedDate && { datePublished: publishedDate }),
    ...(modifiedDate && { dateModified: modifiedDate }),
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          image: post.author.image,
        }
      : {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
    reviewedBy: post.reviewedBy
      ? {
          "@type": "Person",
          name: post.reviewedBy.name,
          image: post.reviewedBy.image,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
        width: 600,
        height: 120,
      },
    },
    inLanguage: "he-IL",
    isAccessibleForFree: true,
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ["Ask Gamblers Israel", "AskGamblers Israel", "Ask Gamblers ישראל"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
    },
    description: SITE_DESCRIPTION,
    inLanguage: "he-IL",
    areaServed: "IL",
    knowsAbout: [
      "Online Casino",
      "Casino Bonuses",
      "Online Gambling",
      "Responsible Gambling",
      "קזינו אונליין",
      "בונוסי קזינו",
      "משחק אחראי",
      "שיטות תשלום לקזינו"
    ],
    publishingPrinciples: `${SITE_URL}/review-methodology`,
    ethicsPolicy: `${SITE_URL}/affiliate-disclosure`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "editorial support",
      telephone: "+972-50-920-0920",
      email: "contact@askgamblers.co.il",
      availableLanguage: ["Hebrew", "English"],
    },
    sameAs: [
      "https://wa.me/972509200920"
    ]
  };
}

export function generateAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "אודות Ask Gamblers",
    url: `${SITE_URL}/about`,
    inLanguage: "he-IL",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function generateContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "צור קשר עם Ask Gamblers",
    url: `${SITE_URL}/contact`,
    inLanguage: "he-IL",
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "editorial support",
      telephone: "+972-50-920-0920",
      email: "contact@askgamblers.co.il",
      availableLanguage: ["Hebrew", "English"],
    },
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "he-IL",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return generateOrganizationSchema();
}

export function webSiteJsonLd() {
  return generateWebSiteSchema();
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
