"use client";
import React from "react";
import CountUp from "react-countup";

const AnimatedCounter = ({
  balance,
}: {
  balance: number;
}) => {
  return (
    <div className="w-full">
      <CountUp
        end={balance}
        decimals={2}
        duration={1}
        prefix="$"
      />
    </div>
  );
};

export default AnimatedCounter;
