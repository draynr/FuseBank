import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
export function formatCurrentBalance(
  balance: number
): string {
  const formatter = new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }
  );

  return formatter.format(balance);
}

export function formatAmount(
  amount: number
): string {
  const formatter = new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }
  );

  return formatter.format(amount);
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
