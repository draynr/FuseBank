"use client";

import Image from "next/image";
import {
  useSearchParams,
  useRouter,
} from "next/navigation";

import {
  cn,
  formUrlQuery,
  formatAmount,
  getAccountTypeColors,
} from "../lib/utils";

const BankInfo = ({
  account,
  appwriteItemId,
  type,
}: BankInfoProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const colors = getAccountTypeColors(
    account?.type as AccountTypes
    // "credit"
  );

  return (
    <div
      onClick={handleBankChange}
      className={cn(`bank-info ${colors.bg}`, {
        "shadow-sm border-blue-700":
          type === "card" && isActive,
        "rounded-xl": true,
        "hover:shadow-sm cursor-pointer":
          type === "card",
      })}
    >
      <figure
        className={`bg-blue-200 flex-center h-fit rounded-full bg-blue-100 ${colors.lightBg}`}
      >
        <Image
          src="/icons/connect-bank.svg"
          width={20}
          height={20}
          alt={account.subtype}
          className="bg-transparent m-2 min-w-5"
        />
      </figure>
      <div className="bg-transparent flex w-full flex-1 flex-col justify-center gap-1">
        <div className="bank-info_content bg-transparent">
          <h2
            className={`bg-transparent text-[16px] line-clamp-1 flex-1 font-bold text-blue-900 ${colors.title}`}
          >
            {account.name}
          </h2>
          {type === "full" && (
            <p
              className={`text-[12px] bg-transparent rounded-full px-3 py-1 font-medium text-blue-700 ${colors.subText} ${colors.lightBg}`}
            >
              {account.subtype}
            </p>
          )}
        </div>

        <p
          className={`text-[16px] bg-transparent font-medium text-blue-700 ${colors.subText}`}
        >
          {formatAmount(account.currentBalance)}
        </p>
      </div>
    </div>
  );
};

export default BankInfo;
