import Link from "next/link";
import React from "react";
import { cn, formatAmount } from "../lib/utils";
import Image from "next/image";

const Card = ({
  account,
  user_name,
  show_balance = true,
}: CardProps) => {
  console.log(account);
  return (
    <div
      className={"flex flex-col bg-transparent"}
    >
      <Link href="/" className="bank-card">
        <div className="card-content">
          <div className="bg-transparent">
            <h1 className="bg-transparent text-[16px] font-semibold">
              {user_name || account.name}
            </h1>
            <p className="bg-transparent font-black">
              {formatAmount(
                account.availableBalance
                  ? account.availableBalance
                  : 123.45
              )}
            </p>
          </div>
          <article
            className={cn(
              "bg-transparent flex flex-col gap-2"
            )}
          >
            <div className="bg-transparent flex justify-between">
              <h1 className=" text-[12px] font-semibold bg-transparent">
                {user_name}
              </h1>
              <h2 className="bg-transparent text-[12px] font-semibold text-white">
                ●● / ●●
              </h2>
            </div>
            <p className="bg-transparent text-[14px] font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●●
              <span className="bg-transparent text-[16px]">
                {account.mask || "1234"}
              </span>
            </p>
          </article>
        </div>
        <div className="card-icon">
          <Image
            src="/icons/pass.svg"
            width={30}
            height={34}
            alt="card icon"
            className="bg-transparent"
          />
          <Image
            src="/icons/visa.svg"
            width={45}
            height={32}
            alt="card icon"
            className="bg-transparent"
          />
        </div>
        <Image
          src="/icons/lines.png"
          alt="lines"
          width={316}
          height={190}
          className=" bg-transparent absolute top-0 left-0"
        />
      </Link>
    </div>
  );
};

export default Card;
