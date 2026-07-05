import Link from "next/link";
import { CasinoIcon } from "./casino-icons";

function encodeCategorySlug(slug: string) {
  return encodeURIComponent(slug).replace(/'/g, "%27");
}

function cleanCategoryCopy(value: string) {
  return value
    .replace("מכונות מזל - הניצחון מהדייש כאן", "מכונות מזל")
    .replace("קזינו חי - חוויה הבא לאשך", "קזינו חי")
    .replace("בלאק ג'ק - יזמי הטקטיקה", "בלאק ג'ק")
    .replace("רולטה - מהמרים החכמים בוחרים", "רולטה")
    .replace("הימורי ספורט - רווח מהידע", "הימורי ספורט")
    .replace("מובטח", "נבדק")
    .replace("משחקים שמזכים", "משחקים להשוואה")
    .trim();
}

interface CategoryCardProps {
  name: string;
  slug: { current: string };
  description?: string;
  icon?: string;
  casinoCount?: number;
  postCount?: number;
  index?: number;
}

export function CategoryCard({ name, slug, description, icon, casinoCount, postCount, index = 0 }: CategoryCardProps) {
  const iconSlugs = ["slots", "poker", "blackjack", "sports", "baccarat", "video-poker"];
  const iconSlug = icon || iconSlugs[index % iconSlugs.length];
  const displayName = cleanCategoryCopy(name);
  const displayDescription = description ? cleanCategoryCopy(description) : undefined;
  
  return (
    <div
      className="relative h-64 animate-slide-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-accent-light to-emerald-neon p-1" />

      <Link
        href={`/categories/${encodeCategorySlug(slug.current)}`}
        prefetch={false}
        className="group relative flex h-full flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-br from-card-light to-card px-6 py-8 text-center backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]"
      >
        <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
          <CasinoIcon slug={iconSlug} className="w-20 h-20" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-2 w-full">
          <h3 className="font-heading text-lg font-black group-hover:text-accent transition-colors leading-tight">
            {displayName}
          </h3>
          {displayDescription && <p className="text-xs text-text-muted line-clamp-2">{displayDescription}</p>}
        </div>

        <div className="flex-shrink-0 flex gap-4 text-xs text-text-muted font-medium">
          {casinoCount !== undefined && <span>{casinoCount} קזינו</span>}
          {postCount !== undefined && <span>{postCount} מאמרים</span>}
        </div>
      </Link>
    </div>
  );
}
