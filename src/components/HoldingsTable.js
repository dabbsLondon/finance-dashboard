import React from 'react';
import LineGraph from './LineGraph';
import '../css/HoldingsTable.css';

const HoldingsTable = ({ data, lineData }) => {
  if (!data || !data.columns || !Array.isArray(data.columns) || data.columns.length === 0) {
    return <div>No data available</div>;
  }

  const columns = data.columns;
  const values = data.columns[0].values; // Assuming the first column contains the values

  const excludedColumns = ['last_close', 'total_gain', 'last_close_value', 'day_gain'];

  const filteredColumns = columns.filter(column => !excludedColumns.includes(column.name.toLowerCase()));

  const formatHeader = (header) => {
    const words = header.split('_');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
  };

  const formatCellValue = (value, columnIndex, rowIndex) => {
    if (columnIndex === filteredColumns.length - 1 || columnIndex === filteredColumns.length - 2) {
      const numericValue = parseFloat(value);
      const isPositive = numericValue > 0;

      if (isPositive) {
        return (
          <span className="green">
            {value}% <span className="green">▲</span>
          </span>
        );
      } else {
        return (
          <span className="red">
            {value}% <span className="red">▼</span>
          </span>
        );
      }
    }

    if (columnIndex === filteredColumns.length) {
      return (
        <div className="line-graph-cell">
          <LineGraph data={lineData} label={columns[1].values[rowIndex]} change={columns[columns.length - 1].values[rowIndex]} />
        </div>
      );
    }

    if (columnIndex === 6) {
      const numericValue = parseFloat(value);
      const numericValue8 = parseFloat(columns[8].values[rowIndex]);
      const totalValues = columns[columnIndex].values.map(parseFloat);
      const totalValue = totalValues.reduce((sum, val) => sum + val, 0);
      const percentage = (numericValue / totalValue) * 100;

      const cellStyle = {
        backgroundColor: numericValue8 > 0 ? `rgb(153, 255, 153)` : `rgb(255, 153, 153)`, // Light green for positive, light red for negative
        width: `${percentage}%`,
        color: 'purple', // Set text color to black
        fontWeight: 'bold' // Set text to bold
      };

      return <div className="value-cell" style={cellStyle}>${value}</div>;
    }
    else if (columnIndex === 3 || columnIndex === 5) {
      return <div>${value}</div>
    }

    return value;
  };

  return (
    <div className="holdings-table-container">
      <table className="holdings-table">
        <colgroup>
          {filteredColumns.map((_, index) => (
            <col key={index} style={{ width: `${100 / (filteredColumns.length + 1)}%` }} />
          ))}
          <col style={{ width: `${100 / (filteredColumns.length + 1)}%` }} /> {/* Column for the line graph */}
        </colgroup>
        <thead>
          <tr>
            {filteredColumns.map((column, index) => (
              <th
                key={index}
                className={
                  index <= 2 ? 'text-left' : index === filteredColumns.length - 1 ? 'text-center' : 'text-right'
                }
              >
                {formatHeader(column.name)}
              </th>
            ))}
            <th className="text-center">Line Graph</th> {/* New column for line graph */}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => (
            <tr key={index}>
              {filteredColumns.map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  className={
                    columnIndex <= 2 ? 'text-left' : columnIndex === filteredColumns.length - 1 ? 'text-center' : 'text-right'
                  }
                >
                  {formatCellValue(column.values[index], columnIndex, index)}
                </td>
              ))}
              <td className="text-left">
                {formatCellValue(columns[columns.length - 1].values[index], filteredColumns.length, index)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HoldingsTable;
