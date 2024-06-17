import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { z } from "zod";
import qs from "query-string";

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

export function extractCustomerIdFromUrl(
  url: string
) {
  const partition = url.split("/");
  const customer_id =
    partition[partition.length - 1];
  return customer_id;
}
export function encrypt(id: string) {
  return btoa(id);
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
    postalCode:
      type === "login"
        ? z.string().optional()
        : z.string().min(3).max(6),
    dateOfBirth:
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

export function formUrlQuery({
  params,
  key,
  value,
}: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}
export function removeSpecialChars(
  name: String
) {
  return name.replace(/[^\w\s]/gi, "");
}
export function getAccountTypeColors(
  type: AccountTypes
) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

export function formatDateTime(
  dateString: Date
) {
  const dateTimeOptions: Intl.DateTimeFormatOptions =
    {
      weekday: "short", // abbreviated weekday name (e.g., 'Mon')
      month: "short", // abbreviated month name (e.g., 'Oct')
      day: "numeric", // numeric day of the month (e.g., '25')
      hour: "numeric", // numeric hour (e.g., '8')
      minute: "numeric", // numeric minute (e.g., '30')
      hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    };

  const dateDayOptions: Intl.DateTimeFormatOptions =
    {
      weekday: "short", // abbreviated weekday name (e.g., 'Mon')
      year: "numeric", // numeric year (e.g., '2023')
      month: "2-digit", // abbreviated month name (e.g., 'Oct')
      day: "2-digit", // numeric day of the month (e.g., '25')
    };

  const dateOptions: Intl.DateTimeFormatOptions =
    {
      month: "short", // abbreviated month name (e.g., 'Oct')
      year: "numeric", // numeric year (e.g., '2023')
      day: "numeric", // numeric day of the month (e.g., '25')
    };

  const timeOptions: Intl.DateTimeFormatOptions =
    {
      hour: "numeric", // numeric hour (e.g., '8')
      minute: "numeric", // numeric minute (e.g., '30')
      hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    };

  const formattedDateTime: string = new Date(
    dateString
  ).toLocaleString("en-US", dateTimeOptions);

  const formattedDateDay: string = new Date(
    dateString
  ).toLocaleString("en-US", dateDayOptions);

  const formattedDate: string = new Date(
    dateString
  ).toLocaleString("en-US", dateOptions);

  const formattedTime: string = new Date(
    dateString
  ).toLocaleString("en-US", timeOptions);

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
}
