import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart({ chartData }) {
  return (
    <div
      className="
    chart-container 
    h-[560px] w-full
    m-2 p-2 overflow-visible
    bg-slate-100
    -translate-y-5
    justify-stretch 
    rounded my-2"
    >
      <Bar
        type="bar"
        data={chartData}
        options={{
          animation: {
            duration: 3000,
          },
          scales: {
            x: {
              stacked: true,
              title: {
                display: true,
                text: "Years of Experience",
                font: {
                  size: 15,
                },
                color: ["rgb(0, 0, 0, 1"],
              },
              border: {
                display: true,
                color: ["rgb(0, 0, 0, 0.5"],
              },
              ticks: {
                color: ["rgb(0, 0, 0, 1"],
              },
            },
            y: {
              stacked: false,
              title: {
                display: true,
                text: "Salary ($)",
                font: {
                  size: 15,
                },
                color: ["rgb(0, 0, 0, 1"],
              },
              border: {
                display: true,
                color: ["rgb(0, 0, 0, 0.5"],
              },
              ticks: {
                color: ["rgb(0, 0, 0, 1"],
              },
              min: 50000,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Employee salaries",
              font: {
                size: 20,
              },
              color: ["rgb(0, 0, 0, 1"],
            },
            legend: {
              display: true,
              labels: {
                color: ["rgb(0, 0, 0, 1"],
              },
            },
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}

export default BarChart;
