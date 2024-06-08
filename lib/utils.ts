import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { z } from "zod";
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

export const authFormSchema = (type: string) =>
  z.object({
    // sign up
    firstName:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3),
    lastName:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3),
    address1:
      type === "sign-in"
        ? z.string().optional()
        : z.string().max(50),
    city:
      type === "sign-in"
        ? z.string().optional()
        : z.string().max(50),
    state:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(2).max(2),
    postalCode:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3).max(6),
    dateOfBirth:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3),
    ssn:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3),
    // both
    email: z.string().email(),
    password: z.string().min(8),
  });
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
