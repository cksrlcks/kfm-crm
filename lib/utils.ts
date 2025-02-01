import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ko } from "date-fns/locale";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  const d = new Date(date);

  return format(d, "yyyy.MM.dd", { locale: ko });
}

export function formatPriceWithComma(price: number) {
  if (price === 0) return null;
  return Number(price).toLocaleString();
}
