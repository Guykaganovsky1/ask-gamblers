export function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffMins < 1) return "זה עתה";
  
  // Hebrew plural handling: 1 דקה, 2 דקות, 3+ דקות
  if (diffMins < 60) {
    if (diffMins === 1) return "לפני דקה";
    if (diffMins === 2) return "לפני שתי דקות";
    return `לפני ${diffMins} דקות`;
  }
  
  // Hebrew plural handling: 1 שעה, 2 שעות, 3+ שעות
  if (diffHours < 24) {
    if (diffHours === 1) return "לפני שעה";
    if (diffHours === 2) return "לפני שעתיים";
    return `לפני ${diffHours} שעות`;
  }
  
  // Hebrew plural handling: 1 יום, 2 ימים, 3+ ימים
  if (diffDays < 7) {
    if (diffDays === 1) return "לפני יום";
    if (diffDays === 2) return "לפני יומיים";
    return `לפני ${diffDays} ימים`;
  }
  
  // Hebrew plural handling: 1 שבוע, 2 שבועות, 3+ שבועות
  if (diffWeeks < 4) {
    if (diffWeeks === 1) return "לפני שבוע";
    if (diffWeeks === 2) return "לפני שבועיים";
    return `לפני ${diffWeeks} שבועות`;
  }
  
  // Hebrew plural handling: 1 חודש, 2 חודשים, 3+ חודשים
  if (diffMonths < 12) {
    if (diffMonths === 1) return "לפני חודש";
    if (diffMonths === 2) return "לפני חודשיים";
    return `לפני ${diffMonths} חודשים`;
  }
  
  // Hebrew plural handling: 1 שנה, 2 שנים, 3+ שנים
  if (diffYears === 1) return "לפני שנה";
  if (diffYears === 2) return "לפני שנתיים";
  return `לפני ${diffYears} שנים`;
}

export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
