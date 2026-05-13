import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { SEARCH_CASINOS_QUERY, SEARCH_POSTS_QUERY } from "@/sanity/lib/queries";
import { Casino, BlogPost } from "@/sanity/lib/types";
import { CasinoCard } from "@/components/ui/casino-card";
import { BlogCard } from "@/components/ui/blog-card";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SearchForm } from "./search-form";

export const revalidate = 60;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

interface SearchParams {
  q?: string;
}

interface SearchPageProps {
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q || "";

  return {
    title: query ? `חיפוש: ${query} | Ask Gamblers` : "חיפוש קזינו בישראל | Ask Gamblers",
    description: query
      ? `תוצאות חיפוש עבור "${query}" - קזינו מומלצים ומאמרים מקצועיים`
      : "חפשו קזינו מומלצים, מאמרים ומדריכים ב-Ask Gamblers",
    alternates: {
      canonical: `${baseUrl}/search`,
    },
    robots: "noindex, follow",
    openGraph: {
      title: query ? `חיפוש: ${query} | Ask Gamblers` : "חיפוש קזינו בישראל | Ask Gamblers",
      description: query
        ? `תוצאות חיפוש עבור "${query}" - קזינו מומלצים ומאמרים מקצועיים`
        : "חפשו קזינו מומלצים, מאמרים ומדריכים ב-Ask Gamblers",
      type: "website",
      url: `${baseUrl}/search`,
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() || "";

  let casinos: Casino[] = [];
  let posts: BlogPost[] = [];

  if (query) {
    const searchQuery = `*${query}*`;
    [casinos, posts] = await Promise.all([
      client.fetch<Casino[]>(SEARCH_CASINOS_QUERY, { query: searchQuery } as Record<string, string>),
      client.fetch<BlogPost[]>(SEARCH_POSTS_QUERY, { query: searchQuery } as Record<string, string>),
    ]);
  }

  const hasResults = casinos.length > 0 || posts.length > 0;
  const totalResults = casinos.length + posts.length;

  return (
    <>
      <PageHero
        title={query ? `תוצאות חיפוש עבור "${query}"` : "חיפוש באתר"}
        subtitle={query ? `נמצאו ${totalResults} תוצאות` : "חפשו קזינו, מאמרים ומדריכים"}
        badge="חיפוש"
      />
      <Breadcrumb
        items={[{ label: "דף הבית", href: "/" }, { label: "חיפוש" }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <SearchForm initialQuery={query} />

        {!query && (
          <div className="mt-12 text-center">
            <p className="text-text-muted text-lg">
              הזינו מונח חיפוש כדי למצוא קזינו ומאמרים רלוונטיים
            </p>
          </div>
        )}

        {query && !hasResults && (
          <div className="mt-12 text-center">
            <div className="mx-auto max-w-md">
              <div className="mb-4 text-5xl">🔍</div>
              <h2 className="font-heading text-xl font-bold text-text-primary mb-2">
                לא נמצאו תוצאות
              </h2>
              <p className="text-text-muted">
                לא מצאנו תוצאות עבור &quot;{query}&quot;. נסו מונח חיפוש אחר.
              </p>
            </div>
          </div>
        )}

        {casinos.length > 0 && (
          <section className="mt-12">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
              קזינו ({casinos.length})
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {casinos.map((casino, i) => (
                <CasinoCard key={casino._id} {...casino} index={i} />
              ))}
            </div>
          </section>
        )}

        {posts.length > 0 && (
          <section className="mt-12">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
              מאמרים ({posts.length})
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <BlogCard key={post._id} {...post} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
