import React from 'react';
import '../css/HeaderTableComponent.css';

const TableComponent = ({ summaryData }) => {
  const renderTableContent = () => {
    if (!summaryData) {
      return (
        <tr>
          <td className="loading-spinner">
            <div className="spinner"></div>
            </td>
            <td className="loading-spinner">
            <div className="spinner"></div>
            </td>
        </tr>
      );
    }

    const currentValue = parseFloat(summaryData?.columns[1]?.values[0]);
    const totalPercentageGain = parseFloat(summaryData?.columns[5]?.values[0]);
    const totalGain = parseFloat(summaryData?.columns[3]?.values[0]);
    const dayGain = parseFloat(summaryData?.columns[4]?.values[0]);
    const dayGainPercentage = parseFloat(summaryData?.columns[6]?.values[0]);

    const formattedCurrentValue = `$${currentValue.toFixed(2)}`;
    const formattedTotalPercentageGain = `${totalPercentageGain.toFixed(2)}%`;
    const formattedTotalGain = `$${Math.abs(totalGain).toFixed(2)}`;

    const totalGainPositive = totalGain > 0;
    const totalGainClassName = totalGainPositive ? 'green-text' : 'red-text';

    const dayGainPositive = dayGain > 0;
    const dayGainClassName = dayGainPositive ? 'green-text' : 'red-text';

    const triangleClassName = dayGainPositive ? 'green-triangle' : 'red-triangle';

    const formattedDayGain = `$${dayGain.toFixed(2)}`;
    const formattedDayGainPercentage = `${dayGainPercentage.toFixed(2)}%`;

    return (
      <tr>
        <td>
          {formattedCurrentValue}{' '}
          {totalGainPositive ? <span className="green-triangle">&#9650;</span> : <span className="red-triangle">&#9660;</span>}{' '}
          <span className={totalGainClassName}>{formattedTotalGain} ({formattedTotalPercentageGain})</span>
        </td>
        <td>
        {formattedDayGain} <span className={dayGainClassName}> ({formattedDayGainPercentage})</span>{' '}
        {dayGainPositive && <span className="green-triangle">&#9650;</span>} 
        {!dayGainPositive && <span className="red-triangle">&#9660;</span>}
        </td>
      </tr>
    );
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Total Market Value</th>
          <th>Day Gain/Loss</th>
        </tr>
      </thead>
      <tbody>
        {renderTableContent()}
      </tbody>
    </table>
  );
};

export default TableComponent;
