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
import BarChart from "./components/BarChart";
import { useGetEmployeesQuery } from "./services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function PositionFigure({ position }) {
  const { data: eData, isLoading: isELoading } = useGetEmployeesQuery();
  if (isELoading) return <p> Loading... </p>;

  const getFilteredEData = (position, eData) => {
    if (!position) {
      return eData;
    } else {
      return eData?.filter((employee) => {
        for (const [key, value] of Object.entries([employee])) {
          if (employee.position_id === position) {
            return employee.position_id;
          }
        }
      });
    }
  };
  const filteredEData = getFilteredEData(position.id, eData);
  const labels = filteredEData.map((data) => data.id);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Employee salaries",
        data: filteredEData.map((data) => data.salary),
        backgroundColor: "#1999ff",
        borderColor: ["rgb(0, 0, 0, 1"],
        borderWidth: 1,
      },
      // {
      //   label: "Users Gained",
      //   data: Data.map((data) => data.userGain),
      // },
    ],
  };

  return (
    <div>
      <div className="text-xl font-bold text-black dark:text-darktext">
        {position.company}
      </div>
      <div className="text-xl font-medium text-black dark:text-darktext">
        {position.name}
      </div>
      <div style={{ width: "700px" }}>
        <BarChart chartData={chartData} />
      </div>
    </div>
  );
}

export default PositionFigure;
