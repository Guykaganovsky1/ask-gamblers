import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { Category } from "@/sanity/lib/types";
import { CategoryCard } from "@/components/ui/category-card";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "ספקי תוכנה | קזינו רז",
  description: "גלה קזינו לפי ספק תוכנה - NetEnt, Microgaming, Playtech ועוד",
};

export default async function CategoriesPage() {
  const categories = await client.fetch<Category[]>(CATEGORIES_QUERY);

  return (
    <>
      <PageHero
        title="הטכנולוגיה מאחורי המשחקים הגדולים"
        subtitle="NetEnt, Microgaming, Playtech ועוד — גלה איזה ספק מתאים לסגנון המשחק שלך"
        badge="ספקי תוכנה מובילים"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "ספקי תוכנה" }]} />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((cat, i) => (
            <CategoryCard key={cat._id} name={cat.name} slug={cat.slug} description={cat.description} casinoCount={cat.casinoCount} postCount={cat.postCount} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
