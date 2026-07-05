import Image from "next/image";
import { StarRating } from "./star-rating";
import { Button } from "./button";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";

interface CasinoCardProps {
  name: string;
  slug: { current: string };
  logo?: SanityImage;
  rating: number;
  description: string;
  bonusTitle?: string;
  bonusAmount?: string;
  index?: number;
}

function cleanCasinoDescription(description: string) {
  return description
    .replace("תוצאות אמיתיות שאנחנו יכולים להמליץ עליהן", "מידע ותנאים שכדאי לבדוק לפני הרשמה")
    .replace("ביטחון מדורג 5 כוכבים", "דירוג גבוה באתר")
    .replace("בונוס עצום, משחקים מהטובים בעולם, בדוק ומומלץ על ידי אלפים", "בונוס ותנאים שכדאי לבדוק לפני הרשמה")
    .replace("בונוסים עצומים שלא תיפסיקו", "בונוסים ותנאים שכדאי לבדוק")
    .replace("ומלא משחקים שמזכים", "ומבחר משחקים להשוואה")
    .replace("משחקים שמזכים", "מבחר משחקים")
    .replace("בדוק, מובטח,", "נבדק,")
    .replace("מובטח", "נבדק")
    .replace("בדוק, נבדק,", "נבדק,")
    .trim();
}

function cleanBonusText(value: string) {
  return value.replace(/ספינות/g, "ספינים").trim();
}

export function CasinoCard({
  name, slug, logo, rating, description, bonusTitle, bonusAmount, index = 0,
}: CasinoCardProps) {
  const delayClass = index === 0 ? "animate-slide-up" : `animate-slide-up-delay-${Math.min(index, 3)}`;

  return (
    <div className={`group h-full ${delayClass}`}>
      <div className="relative h-full overflow-hidden rounded-2xl border border-border-card bg-gradient-to-br from-card-light to-card backdrop-blur-md transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative z-10 flex h-full flex-col gap-5 p-6">
          <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 py-4">
            <div className="relative h-20 w-32">
              {logo ? (
                <Image
                  src={urlFor(logo).width(256).height(145).url()}
                  alt={name}
                  fill
                  priority={index < 3}
                  sizes="(max-width: 768px) 128px, 128px"
                  className="object-contain"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center font-heading text-sm font-bold text-text-muted">
                  {name}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <h3 className="font-heading text-xl font-black leading-tight text-text-primary">
              {name}
            </h3>

            <div className="flex items-center gap-2">
              <StarRating rating={rating} size="sm" />
              <span className="text-xs font-bold text-accent">{rating.toFixed(1)}</span>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
              {cleanCasinoDescription(description)}
            </p>

            {bonusAmount && (
              <div className="mt-2 rounded-lg bg-accent/10 border border-accent/20 px-4 py-3">
                <p className="text-xs font-bold text-text-muted mb-1">{bonusTitle}</p>
                <p className="font-heading text-2xl font-black text-accent">
                  {cleanBonusText(bonusAmount)}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button
              href={`/go/${slug.current}`}
              rel="nofollow sponsored"
              className="w-full text-sm"
            >
              בדקו תנאים
            </Button>
            <Button
              href={`/casinos/${slug.current}`}
              variant="outline"
              className="w-full text-sm"
            >
              קרא ביקורת
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
