import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";

dayjs.extend(utc);
dayjs.extend(timezone);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, formatTemplate: string) {
  return format(date, formatTemplate, { locale: ko });
}

export function formatPriceWithComma(price: number) {
  if (price === 0) return null;
  return Number(price).toLocaleString();
}
