import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineGraph = ({ data, label, change }) => {
  if (!data || !data.datasets || data.datasets.length === 0) {
    return <div className="spinner"></div>;
  }

  const dataset = data.datasets.find(dataset => dataset.label === label);

  if (!dataset) {
    return <div className="spinner"></div>;
  }

  // Convert 'change' from a string to a number
  const changeNumber = parseFloat(change);

  // Determine the color of the line based on the 'change' prop.
  const lineColor = changeNumber > 0 ? 'rgb(75, 192, 75)' : 'rgb(192, 75, 75)';

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: label,
        data: dataset.data,
        fill: false,
        backgroundColor: lineColor,
        borderColor: lineColor,
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div style={{ width: '40%', height: '2em', overflow: 'auto'}}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineGraph;
