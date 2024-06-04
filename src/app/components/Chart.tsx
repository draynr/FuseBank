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
  const data = {
    datasets: [
      {
        label: "Bank",
        data: [1000, 2000, 3000],
        backgroundColor: [
          "#FFFFFF",
          "#C5C9D0",
          "#868686",
        ],
        borderColor: "#000000",
      },
    ],
    labels: ["Bank 1", "Bank 2", "Bank 3"],
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
