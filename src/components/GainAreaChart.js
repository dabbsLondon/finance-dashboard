import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const GainAreaChart = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const items_to_slice = 2

  useEffect(() => {
    console.log('Data:', data);
    if (data && data.datasets) {
      setLoading(false);
    }
  }, [data]);

  if (!data || !data.datasets || data.datasets.length === 0) {
    return <div>Loading...</div>;
  }

  const { datasets } = data;
  console.log('Datasets:', datasets);

  const gainDataset = datasets.find(dataset => dataset.label === 'Gain');
  const gainData = gainDataset.data;

  const sortedData = gainData.sort((a, b) => a.x.localeCompare(b.x));
  const startingIndex = sortedData.length - 20;
  const slicedData = sortedData.slice(items_to_slice,startingIndex);
  const reversedLabels = sortedData.map(item => moment(item.x).format('HH:mm'));
  const slicedLabels = reversedLabels.slice(items_to_slice,startingIndex)

  const chartData = {
    labels: slicedLabels,
    datasets: [
      {
        label: 'Day Gain',
        fill: true,
        lineTension: 0.3,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderColor: 'rgba(255, 255, 255, 1)',
        pointRadius: 1,
        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 1)',
        pointHoverRadius: 3,
        pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointHoverBorderColor: 'rgba(255, 255, 255, 1)',
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: slicedData.map(item => item.y),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 1)',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 1)',
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  const chartWrapperStyle = {
    backgroundColor: 'black',
    borderRadius: '5px',
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#E0E0E3',
  };

  return (
    <div style={chartWrapperStyle}>
      <h2 style={titleStyle}>Percentage Gain</h2>
      <div style={{ width: '100%', height: '25vh' }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default GainAreaChart;
