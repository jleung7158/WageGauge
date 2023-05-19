import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { Data } from "./Data";
import BarChart from "./components/BarChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = Data.map((data) => data.year);
console.log(labels);

function PositionFigure({ position }) {
  const [chartData, setChartData] = useState({
    labels: labels,
    datasets: [
      {
        label: "Users Lost",
        data: Data.map((data) => data.userLost),
      },
      {
        label: "Users Gained",
        data: Data.map((data) => data.userGain),
      },
    ],
  });

  return (
    <div>
      <div className="text-xl font-medium text-black">{position.name}</div>
      <div style={{ width: "700px" }}>
        <BarChart chartData={chartData} />
      </div>
    </div>
  );
}

export default PositionFigure;
