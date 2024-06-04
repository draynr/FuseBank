import React from "react";
import { formatCurrentBalance } from "../../../libs/utils";
import AnimatedCounter from "./AnimatedCounter";
import Chart from "./Chart";

const BalanceBox = ({
  accounts = [],
  banks,
  current_balance,
}: BalanceBoxProps) => {
  return (
    <section className="balance">
      {" "}
      <div className="balance-chart">
        <Chart accounts={accounts} />
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="header-2">
          Bank Accounts: {banks}
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        <p className="balance-label">
          Current Balance
        </p>
        <div className="balance-amnt flex-center gap-2">
          <AnimatedCounter
            balance={current_balance}
          />
        </div>
      </div>
    </section>
  );
};

export default BalanceBox;
