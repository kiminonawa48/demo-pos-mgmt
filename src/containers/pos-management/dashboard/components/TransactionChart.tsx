import React from "react";
import { Card } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const paymentData = [
  { date: "2025-04-01", amount: 15000 },
  { date: "2025-04-02", amount: 12500 },
  { date: "2025-04-03", amount: 9800 },
  { date: "2025-04-04", amount: 7200 },
  { date: "2025-04-05", amount: 6400 },
  { date: "2025-04-06", amount: 8300 },
  { date: "2025-04-07", amount: 9100 },
  { date: "2025-04-08", amount: 10200 },
  { date: "2025-04-09", amount: 11700 },
  { date: "2025-04-10", amount: 13500 },
];

// Sort data by amount in descending order
const maxBars = 10;

const sortedData = [...paymentData].sort((a, b) => b.amount - a.amount);

const paddedData =
  sortedData.length < maxBars
    ? sortedData.concat(
        Array.from({ length: maxBars - sortedData.length }, () => ({
          date: "N/A",
          amount: 0,
        }))
      )
    : sortedData.slice(0, maxBars);

const TransactionChart: React.FC = () => {
  const data = {
    labels: paddedData.map((item) => item.date),
    datasets: [
      {
        label: "Payment Amount",
        data: paddedData.map((item) => item.amount),
        backgroundColor: "#91cbff",
        borderColor: "#0958d9",
        borderWidth: 1,
        barThickness: 32,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "x" as const, // keep horizontal bar or remove for vertical
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Total Payment by Date",
        font: { size: 12 },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `Amount: ${context.raw.toLocaleString()} LAK`;
          },
        },
      },
    },
    scales: {
    //   x: {
    //     title: {
    //       display: true,
    //       text: "Date",
    //     },
    //   },
      y: {
        title: {
          display: true,
          text: "Amount (LAK)",
        },
        ticks: {
          callback: function (value: any) {
            return value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <Card title="Total Payment">
      <div style={{ height: 400 }}>
        <Bar data={data} options={options} />
      </div>
    </Card>
  );
};

export default TransactionChart;
