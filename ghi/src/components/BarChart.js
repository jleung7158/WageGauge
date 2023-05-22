import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  return (
    <div className="chart-container">
      <Bar
        data={chartData}
        options={{
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: false,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
              font: {
                size: 20,
              },
            },
            legend: {
              display: true,
            },
          },
        }}
      />
    </div>
  );
}

export default BarChart;
