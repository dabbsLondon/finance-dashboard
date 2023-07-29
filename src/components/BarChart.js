import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import chroma from 'chroma-js';
import "../css/BarChart.css" // Make sure to adjust CSS for night mode here as well

const BarChart = ({ data }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Data:', data);
    if (data && data.columns) {
      setLoading(false);
    }
  }, [data]);

  if (!data || !data.columns || data.columns.length === 0) {
    return <div style={{ color: 'white' }}>Loading...</div>; // or show a spinner component
  }

  const { columns } = data;
  console.log('Columns:', columns);

  const nameColumn = columns.find(column => column.name === 'name');
  const dayGainColumn = columns.find(column => column.name === 'day_gain');

  const sortedData = dayGainColumn.values
    .map((value, index) => ({ name: nameColumn.values[index], value }))
    .sort((a, b) => a.value - b.value);

  const reversedData = sortedData.reverse();
  const reversedLabels = reversedData.map(item => item.name);

  const chartData = {
    labels: reversedLabels,
    datasets: [
      {
        label: 'Day Gain',
        backgroundColor: createColors(reversedData.map(item => item.value)),
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
        data: reversedData.map(item => item.value),
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
  };

  // Create colors based on day gain values
  function createColors(values) {
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const midValue = 0;

    return values.map(value => {
      if (value < midValue) {
        const normalizedValue = (value - minValue) / (midValue - minValue);
        const color = chroma.scale(['red', 'gray']).mode('lch')(normalizedValue).darken().hex();
        return color;
      } else if (value > midValue) {
        const normalizedValue = (value - midValue) / (maxValue - midValue);
        const color = chroma.scale(['gray', 'green']).mode('lch')(normalizedValue).darken().hex();
        return color;
      } else {
        return 'darkgray';
      }
    });
  }

  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
      <div style={{ width: '100%', height: '25vh' }}>
        {loading ? (
          <div>Loading...</div> // or show a spinner component
        ) : (
          <>
          <h2 style={{ textAlign: 'center', color: 'white' }}>Day Gain</h2>
          <Bar data={chartData} options={options} />
          </>
        )}
      </div>
    </div>
  );
};

export default BarChart;
