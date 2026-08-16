import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const ARABIC_DATE_FORMATTER = new Intl.DateTimeFormat("ar-SA", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatArabicDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return ARABIC_DATE_FORMATTER.format(d);
}

export function timeAgo(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

  const units: [number, string][] = [
    [60, "ثانية"],
    [60, "دقيقة"],
    [24, "ساعة"],
    [30, "يوم"],
    [12, "شهر"],
    [Number.MAX_SAFE_INTEGER, "سنة"],
  ];

  let value = seconds;
  for (const [step, label] of units) {
    if (value < step) return `منذ ${Math.max(1, Math.floor(value))} ${label}`;
    value = Math.floor(value / step);
  }
  return formatArabicDate(d);
}
