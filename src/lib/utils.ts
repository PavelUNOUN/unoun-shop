import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Объединяет классы Tailwind без конфликтов, поддерживает условные классы
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
