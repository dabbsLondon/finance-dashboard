import React from "react";
import "../css/Tickers.css";

const Tickers = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="tickers-container">
        <table>
          <tbody>
            <tr>
              <td>
                <div className="spinner"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // Filter out items with empty data
  const validItems = items.filter((item) => Object.keys(item).length !== 0);

  if (validItems.length === 0) {
    return null; // No valid items to display
  }

  return (
    <div className="tickers-container">
      <table className="tickers-table">
        <tbody>
          <tr>
            {validItems.map((item, index) => {
              const percentage_difference = parseFloat(item.percentage_difference);
              return (
                <td key={index}>
                  <span>
                    {item.name} (
                    <span
                      className={percentage_difference >= 0 ? "green" : "red"}
                    >
                      {item.percentage_difference}
                    </span>
                    )
                  </span>
                  <span
                    className={percentage_difference >= 0 ? "green" : "red"}
                  >
                    {percentage_difference > 0 ? "▲" : "▼"}
                  </span>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      <div className="black-line"></div>
    </div>
  );
};

export default Tickers;
