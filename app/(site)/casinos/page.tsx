import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { CASINOS_QUERY } from "@/sanity/lib/queries";
import { CasinoCard } from "@/components/ui/casino-card";
import { SectionHeading } from "@/components/ui/section-heading";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "קזינו מומלצים | קזינו רז",
  description: "רשימת הקזינו המובילים עם ביקורות, דירוגים ובונוסים בלעדיים",
};

export default async function CasinosPage() {
  const casinos = await client.fetch(CASINOS_QUERY);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading>כל הקזינו</SectionHeading>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {casinos.map((casino: any, i: number) => (
          <CasinoCard key={casino._id} {...casino} index={i} />
        ))}
      </div>
    </div>
  );
}
