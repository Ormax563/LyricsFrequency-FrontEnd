import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = (props) => {
  const labels = props.labels;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Words count",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: props.values,
      },
    ],
  }
  return (
    <div>
      <Bar data={data} />
    </div>
  );
}
export {
    BarChart
  };
