"use client";

import { useState } from "react";
import { Casino } from "@/sanity/lib/types";
import { CasinoCard } from "@/components/ui/casino-card";

const FILTERS = [
  { label: "הכל", key: "all" },
  { label: "מאומתים", key: "certified" },
  { label: "מובייל", key: "mobile" },
  { label: "חדשים", key: "newest" },
  { label: "אונליין", key: "online" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

const KEYWORDS: Record<Exclude<FilterKey, "all">, string[]> = {
  certified: ["certified", "מאומת"],
  mobile:    ["mobile", "מובייל"],
  newest:    ["newest", "חדש", "new"],
  online:    ["online", "אונליין"],
};

function matchesFilter(casino: Casino, key: FilterKey): boolean {
  if (key === "all") return true;
  if (!casino.categories || casino.categories.length === 0) return false;
  const words = KEYWORDS[key];
  return casino.categories.some((cat) =>
    words.some((w) => cat.name.toLowerCase().includes(w.toLowerCase()))
  );
}

interface Props {
  casinos: Casino[];
}

export function CasinoFilter({ casinos }: Props) {
  const [active, setActive] = useState<FilterKey>("all");

  const filtered = casinos.filter((c) => matchesFilter(c, active));

  return (
    <>
      {/* Filter bar */}
      <div className="mb-10 flex flex-wrap gap-2" dir="rtl">
        {FILTERS.map(({ label, key }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`rounded-full border px-5 py-1.5 text-sm font-semibold transition-all duration-200 ${
              active === key
                ? "border-accent bg-accent text-white shadow-lg shadow-accent/30"
                : "border-border-glass bg-card/40 text-text-muted hover:border-accent/60 hover:text-accent"
            }`}
          >
            {label}
            {key !== "all" && (
              <span className="ms-1.5 text-xs opacity-90">
                ({casinos.filter((c) => matchesFilter(c, key)).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((casino, i) => (
            <CasinoCard key={casino._id} {...casino} index={i} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center text-text-muted">
          לא נמצאו קזינו בקטגוריה זו
        </div>
      )}
    </>
  );
}
