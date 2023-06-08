import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineController,
  BarController,
  LineElement,
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
  PointElement,
  LineController,
  BarController,
  LineElement,
  Title,
  Tooltip,
  Legend
);
/* eslint-disable */
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

  function avg(array) {
    let s = 0;
    for (let n of array) {
      s += n;
    }
    return s / array.length;
  }

  function med(array) {
    if (array.length === 0) {
      return 0;
    } else if (array.length % 2 === 0) {
      return avg(array);
    } else {
      const half = Math.floor(array.length / 2);
      return array[half];
    }
  }

  function splitSalariesToTiers(array) {
    let salaries = {
      salaries_03: [],
      salaries_46: [],
      salaries_710: [],
      salaries_1100: [],
    };
    for (let data of filteredEData) {
      if (data.years_exp === "0-3") {
        salaries["salaries_03"].push(data.salary);
        salaries["salaries_03"].sort();
      } else if (data.years_exp === "4-6") {
        salaries["salaries_46"].push(data.salary);
        salaries["salaries_46"].sort();
      } else if (data.years_exp === "7-10") {
        salaries["salaries_710"].push(data.salary);
        salaries["salaries_710"].sort();
      } else {
        salaries["salaries_1100"].push(data.salary);
        salaries["salaries_1100"].sort();
      }
    }
    return salaries;
  }

  const tieredSalaries = splitSalariesToTiers(filteredEData);

  const getAveragedEData = (tieredSalaries) => {
    let averages = [{ "0-3": 0 }, { "4-6": 0 }, { "7-10": 0 }, { "11+": 0 }];
    averages[0]["0-3"] = avg(tieredSalaries["salaries_03"]);
    averages[1]["4-6"] = avg(tieredSalaries["salaries_46"]);
    averages[2]["7-10"] = avg(tieredSalaries["salaries_710"]);
    averages[3]["11+"] = avg(tieredSalaries["salaries_1100"]);
    return averages;
  };

  const getMedianEData = (tieredSalaries) => {
    let medians = [{ "0-3": 0 }, { "4-6": 0 }, { "7-10": 0 }, { "11+": 0 }];
    medians[0]["0-3"] = med(tieredSalaries["salaries_03"]);
    medians[1]["4-6"] = med(tieredSalaries["salaries_46"]);
    medians[2]["7-10"] = med(tieredSalaries["salaries_710"]);
    medians[3]["11+"] = med(tieredSalaries["salaries_1100"]);
    return medians;
  };

  const getHighEData = (tieredSalaries) => {
    let highs = [{ "0-3": 0 }, { "4-6": 0 }, { "7-10": 0 }, { "11+": 0 }];
    highs[0]["0-3"] = Math.max(...tieredSalaries["salaries_03"]);
    highs[1]["4-6"] = Math.max(...tieredSalaries["salaries_46"]);
    highs[2]["7-10"] = Math.max(...tieredSalaries["salaries_710"]);
    highs[3]["11+"] = Math.max(...tieredSalaries["salaries_1100"]);
    return highs;
  };

  const getLowEData = (tieredSalaries) => {
    let lows = [{ "0-3": 0 }, { "4-6": 0 }, { "7-10": 0 }, { "11+": 0 }];
    lows[0]["0-3"] = Math.min(...tieredSalaries["salaries_03"]);
    lows[1]["4-6"] = Math.min(...tieredSalaries["salaries_46"]);
    lows[2]["7-10"] = Math.min(...tieredSalaries["salaries_710"]);
    lows[3]["11+"] = Math.min(...tieredSalaries["salaries_1100"]);
    return lows;
  };

  const averageEData = getAveragedEData(tieredSalaries);
  const medianEData = getMedianEData(tieredSalaries);
  const highEData = getHighEData(tieredSalaries);
  const lowEData = getLowEData(tieredSalaries);

  const labels = averageEData?.map((tier) => Object.keys(tier));
  const chartData = {
    labels: labels,
    datasets: [
      {
        type: "bar",
        label: "Average salaries",
        data: averageEData.map((tier) => Object.values(tier)[0]),
        backgroundColor: "#1999ff",
        borderColor: ["rgb(0, 0, 0, 1)"],
        borderWidth: 1,
        order: 1,
      },
      {
        label: "Median salaries",
        data: medianEData.map((tier) => Object.values(tier)[0]),
        pointBackgroundColor: "rgb(160, 32, 240, 0.5)",
        backgroundColor: "rgb(160, 32, 240, 0.5)",
        borderColor: "rgb(160, 32, 240, 0.5)",
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 10,
        pointHoverBorderWidth: 5,
        fill: false,
        type: "line",
        order: 0,
      },
      {
        label: "High salaries",
        data: highEData.map((tier) => Object.values(tier)[0]),
        pointBackgroundColor: "rgb(0, 128, 0, 0.5)",
        backgroundColor: "rgb(0, 128, 0, 0.5)",
        borderColor: "rgb(0, 128, 0, 0.5)",
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 10,
        pointHoverBorderWidth: 5,
        fill: false,
        type: "line",
        order: 0,
      },
      {
        label: "Low salaries",
        data: lowEData.map((tier) => Object.values(tier)[0]),
        pointBackgroundColor: "rgb(128, 0, 0, 0.5)",
        backgroundColor: "rgb(128, 0, 0, 0.5)",
        borderColor: "rgb(128, 0, 0, 0.5)",
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 10,
        pointHoverBorderWidth: 5,
        fill: false,
        type: "line",
        order: 0,
      },
    ],
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <div
          className="
        mr-2 mt-2 mb-2 mr-8 p-2 w-max h-max
        bg-wageblue rounded
        text-2xl font-bold
        text-black dark:text-darktext
        "
        >
          {position.company}
        </div>
        <div
          className="
        mr-2 mt-2 mb-2 pl-2 pr-2
        text-lg font-bold
        text-black dark:text-darktext
        "
        >
          {position.name}
        </div>
        <div
          className="
        mr-2 mt-2 mb-2 pl-2 pr-2 
        text-sm
        text-black dark:text-darktext
        "
        >
          {position.description}
        </div>
      </div>

      <div className="w-[800px] h-[500px]">
        <BarChart chartData={chartData} />
      </div>
    </div>
  );
}

export default PositionFigure;
/* eslint-enable */
