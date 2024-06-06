import React from "react";
import { formatCurrentBalance } from "../../../lib/utils";
import AnimatedCounter from "./AnimatedCounter";
import Chart from "./Chart";

const BalanceBox = ({
  accounts = [],
  banks,
  current_balance,
}: BalanceBoxProps) => {
  return (
    <section className="balance">
      <div className="balance-chart">
        <Chart accounts={accounts} />
      </div>
      <div className="flex flex-col gap-6">
        {/* // don't think this is necessary */}
        {/* <h2 className="header-2">
          Bank Accounts: {banks}
        </h2> */}
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
      </div>
    </section>
  );
};

export default BalanceBox;
