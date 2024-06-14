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
    firstName:
      type === "login"
        ? z.string().optional()
        : z.string().min(3),
    lastName:
      type === "login"
        ? z.string().optional()
        : z.string().min(3),
    primaryAddress:
      type === "login"
        ? z.string().optional()
        : z.string().max(50),
    city:
      type === "login"
        ? z.string().optional()
        : z.string().max(50),
    state:
      type === "login"
        ? z.string().optional()
        : z.string().min(2).max(2),
    zipCode:
      type === "login"
        ? z.string().optional()
        : z.string().min(3).max(6),
    dob:
      type === "login"
        ? z.string().optional()
        : z.string().date(),
    ssn:
      type === "login"
        ? z.string().optional()
        : z
            .string()
            .regex(/^\d{3}-\d{2}-\d{4}$/),
    // both
    email: z.string().email(),
    password: z.string().min(8),
  });

export const formatDate = (
  date: Date
): string => {
  const day = String(date.getDate()).padStart(
    2,
    "0"
  );
  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};
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
