import Link from "next/link";
import React from "react";
import { formatAmount } from "../../../lib/utils";

const Card = ({
  account,
  user_name,
  show_balance = true,
}: CardProps) => {
  return (
    <div className="flex flex-col ">
      <Link href="/" className="bank-card">
        <div className="card-content">
          <div>
            <h1 className="bg-gray-700 text-[16px] font-semibold">
              {user_name || account.name}
            </h1>
            <p>
              {formatAmount(account.balance)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
