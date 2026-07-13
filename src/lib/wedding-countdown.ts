import { siteConfig } from "@/config/site";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Whole calendar days remaining until the wedding (Manila local date). */
export function daysUntilWedding(now: Date = new Date()): number {
  const wedding = siteConfig.wedding.date;
  const startOfToday = startOfLocalDay(now);
  const startOfWeddingDay = startOfLocalDay(wedding);

  return Math.round(
    (startOfWeddingDay.getTime() - startOfToday.getTime()) / MS_PER_DAY,
  );
}

function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
