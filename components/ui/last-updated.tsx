"use client";

interface LastUpdatedProps {
  date?: string;
}

export function LastUpdated({ date }: LastUpdatedProps) {
  const displayDate = date || new Date().toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long", 
    day: "numeric"
  });

  return (
    <div className="animate-fade-in flex items-center gap-2 text-sm text-text-muted">
      <svg className="w-4 h-4 text-emerald" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
      <span>עודכן לאחרונה: {displayDate}</span>
    </div>
  );
}