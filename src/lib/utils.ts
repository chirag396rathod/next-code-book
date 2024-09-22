import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDate, formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function FormateRelativeData(from: Date) {
  const currantDate = new Date();
  if (currantDate.getTime() - from.getTime() < 24 * 16 * 16 * 1000) {
    return formatDistanceToNowStrict(from, {
      addSuffix: true,
    });
  } else {
    if (currantDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, "MMM d");
    } else {
      return formatDate(from, "MMM d, yyy");
    }
  }
}
