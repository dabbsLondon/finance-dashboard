import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const HoldingsBySectorGraph = ({ data }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Data:", data);
    if (data && data.columns) {
      setLoading(false);
    }
  }, [data]);

  if (!data || !data.columns || data.columns.length === 0) {
    return <div>Loading...</div>;
  }

  const { columns } = data;
  console.log("Columns:", columns);

  const nameColumn = columns.find((column) => column.name === "name");
  const sectorColumn = columns.find((column) => column.name === "sector");
  const currentValueColumn = columns.find((column) => column.name === "current_value");

  const uniqueCompanies = Array.from(new Set(nameColumn.values));
  const uniqueSectors = Array.from(new Set(sectorColumn.values));

  const aggregation = {};
  uniqueSectors.forEach((sector) => {
    aggregation[sector] = {
      companies: [],
      totalValue: 0,
    };
  });

  nameColumn.values.forEach((name, index) => {
    const sector = sectorColumn.values[index];
    const currentValue = currentValueColumn.values[index];

    aggregation[sector].companies.push({ name, value: currentValue });
    aggregation[sector].totalValue += currentValue;
  });

  function getRandomColor(index) {
    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#43a047",
      "#d32f2f",
      "#FFCD56",
      "#42A5F5",
      "#66BB6A",
      "#D4E157",
    ];
    return colors[index % colors.length];
  }

  const chartData = {
    labels: uniqueSectors,
    datasets: uniqueCompanies.map((company, index) => {
      const backgroundColor = getRandomColor(index);
      const data = uniqueSectors.map((sector) => {
        const companyData = aggregation[sector].companies.find((c) => c.name === company);
        return companyData ? companyData.value : 0;
      });

      return {
        label: company,
        backgroundColor,
        borderWidth: 1,
        data,
      };
    }),
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        stacked: true,
        scaleLabel: {
          display: true,
          labelString: "Sector",
        },
        ticks: {
          beginAtZero: true,
          font: {
            size: 14,
            color: '#E0E0E3', // Added color for night mode
          },
        },
      },
      y: {
        stacked: true,
        scaleLabel: {
          display: true,
          labelString: "Current Value ($)",
        },
        ticks: {
          beginAtZero: true,
          font: {
            size: 14,
            color: '#E0E0E3', // Added color for night mode
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    tooltips: {
      callbacks: {
        label: (context) => {
          const dataset = context.dataset.label || "";
          const value = context.parsed.y || 0;
          return `${dataset}: $${value}`;
        },
      },
      bodyFont: {
        size: 16,
        color: '#E0E0E3', // Added color for night mode
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "25vh", float: "left", backgroundColor: 'black' }}> {/* Added background color for night mode */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
        <h2 style={{ textAlign: 'center', color: '#E0E0E3' }}>Value By Sector</h2> {/* Added color for night mode */}
        <Bar data={chartData} options={options} />
        </>
      )}
    </div>
  );
};

export default HoldingsBySectorGraph;
