"use client";
import React from "react";
import {
  Chart as Chart_1,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart_1.register(ArcElement, Tooltip, Legend);

const Chart = ({ accounts }: ChartProps) => {
  const accountNames = accounts.map(
    x => x.name
  );
  const balances = accounts.map(
    x => x.currentBalance
  );
  const data = {
    datasets: [
      {
        label: "Bank",
        data: balances,
        backgroundColor: [
          "#FFFFFF",
          "#C5C9D0",
          "#868686",
        ],
        borderColor: "#FFF",
      },
    ],
    labels: accountNames,
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: "60%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default Chart;
