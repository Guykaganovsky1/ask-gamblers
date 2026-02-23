"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchFormProps {
  initialQuery?: string;
}

export function SearchForm({ initialQuery = "" }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="חפשו קזינו, מאמרים, מדריכים..."
          className="w-full rounded-xl border border-border-card bg-card-light px-5 py-4 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
          dir="rtl"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-accent px-6 py-4 font-bold text-white hover:bg-accent-dark transition-colors"
        >
          חיפוש
        </button>
      </div>
    </form>
  );
}
