import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合併 Tailwind class 名稱：支援條件式，並自動解決衝突的工具類
 * （例如 `px-2` 與 `px-4` 會保留後者）。
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
