import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { CASINOS_QUERY } from "@/sanity/lib/queries";
import { Casino } from "@/sanity/lib/types";
import { CasinoFilter } from "@/components/ui/casino-filter";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "קזינו מומלצים | קזינו רז",
  description: "רשימת הקזינו המובילים עם ביקורות, דירוגים ובונוסים בלעדיים",
};

export default async function CasinosPage() {
  const casinos = await client.fetch<Casino[]>(CASINOS_QUERY);

  return (
    <>
      <PageHero
        title="הקזינו הטובים ביותר לישראלים"
        subtitle="ביקורות אמיתיות, דירוגים שקופים ובונוסים בלעדיים — כל מה שצריך כדי לשחק חכם"
        badge="קזינו מומלצים 2025"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "בתי קזינו" }]} />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <CasinoFilter casinos={casinos} />
      </div>
    </>
  );
}
