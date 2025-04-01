import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistance } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, formatStr = "PPP"): string {
  try {
    const date = new Date(dateString);
    return format(date, formatStr);
  } catch (error) {
    console.log("error", error);
    return dateString;
  }
}

export function formatRelativeDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return formatDistance(date, new Date(), { addSuffix: true });
  } catch (error) {
    console.log("error", error);

    return dateString;
  }
}
