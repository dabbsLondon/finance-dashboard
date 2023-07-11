import React from 'react';
import '../css/header.css'; // Assuming the stylesheet is named header.css
import iconImage from '../images/icon.png'; // Import the icon image
import TableComponent from '../components/HeaderTableComponent'; // Import the TableComponent

const PageHeader = ({ summaryData }) => {
  return (
    <div className="header-container">
      <div className="header-left">
        <div className="title-container">
          <img src={iconImage} alt="Icon" className="logo-image" />
          <h1 className="title">Finance Dashboard</h1>
        </div>
      </div>
      <div className="header-right">
        <TableComponent summaryData={summaryData} /> {/* Pass the 'summaryData' prop to the TableComponent */}
      </div>
    </div>
  );
};

export default PageHeader;
