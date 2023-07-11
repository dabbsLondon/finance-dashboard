import React from 'react';

const HoldingsTable = ({ data }) => {
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

  const formatCellValue = (value, columnIndex) => {
    if (columnIndex === filteredColumns.length - 1 || columnIndex === filteredColumns.length - 2) {
      const numericValue = parseFloat(value);
      const isPositive = numericValue > 0;

      if (isPositive) {
        return (
          <span style={{ color: 'green' }}>
            {value} <span style={{ color: 'green' }}>▲</span>
          </span>
        );
      } else {
        return (
          <span style={{ color: 'red' }}>
            {value} <span style={{ color: 'red' }}>▼</span>
          </span>
        );
      }
    }

    return value;
  };

  return (
    <div style={{ width: '100%', height: '25vh', overflow: 'auto' }}>
      <table style={{ width: '100%' }}>
        <thead style={{ background: 'lightgrey' }}>
          <tr>
            {filteredColumns.map((column, index) => (
              <th
                key={index}
                style={{
                  textAlign: index >= filteredColumns.length - 6 ? 'right' : 'left',
                  paddingRight: index >= filteredColumns.length - 6 ? '10px' : '0'
                }}
              >
                {formatHeader(column.name)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => (
            <tr key={index}>
              {filteredColumns.map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  style={{
                    textAlign: columnIndex >= filteredColumns.length - 6 ? 'right' : 'left',
                    paddingRight: columnIndex >= filteredColumns.length - 6 ? '10px' : '0'
                  }}
                >
                  {formatCellValue(column.values[index], columnIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HoldingsTable;
