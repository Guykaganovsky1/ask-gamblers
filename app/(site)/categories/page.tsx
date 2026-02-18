import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { Category } from "@/sanity/lib/types";
import { CategoryCard } from "@/components/ui/category-card";
import { SectionHeading } from "@/components/ui/section-heading";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "קטגוריות | קזינו רז",
  description: "גלה קזינו לפי קטגוריה - סלוטים, פוקר, קזינו חי ועוד",
};

export default async function CategoriesPage() {
  const categories = await client.fetch<Category[]>(CATEGORIES_QUERY);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading>קטגוריות</SectionHeading>
      <div className="mt-10 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat, i) => (
          <CategoryCard key={cat._id} {...cat} index={i} />
        ))}
      </div>
    </div>
  );
}
