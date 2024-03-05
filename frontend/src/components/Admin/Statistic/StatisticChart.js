import React from "react";
import { Bar } from 'react-chartjs-2';

export default function StatisticChart() {
  const data = {
    labels: ["Label 1", "Label 2", "Label 3"],
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 20, 30],
        backgroundColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    title: {
        display: true,
        text: "Top thành viên",
      },
      legend: {
        display: false,
      },
      scales: {
        x: { 
          beginAtZero: true 
        },
        y: {
          beginAtZero: true
        }
      },
      indexAxis: 'y',
  };
  return (
    <>
      <div>
        <h2>Biểu đồ của tôi</h2>
        <Bar data={data} options={options} />
      </div>
    </>
  );
}
