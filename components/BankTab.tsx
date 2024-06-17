"use client";

import {
  useSearchParams,
  useRouter,
} from "next/navigation";

import { cn, formUrlQuery } from "../lib/utils";

export const BankTab = ({
  account,
  appwriteItemId,
}: BankTabProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isActive =
    appwriteItemId === account?.appwriteItemId;

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account?.appwriteItemId,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      onClick={handleBankChange}
      className={cn(`banktab-item`, {
        " border-slate-600": isActive,
      })}
    >
      <p
        className={cn(
          `text-16 line-clamp-1 flex-1 font-medium text-gray-500`,
          {
            " text-white": isActive,
          }
        )}
      >
        {account.name}
      </p>
    </div>
  );
};