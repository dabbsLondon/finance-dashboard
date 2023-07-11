import React from 'react';

const DataSources = () => {
  const dataSources = {
    summary: 'http://localhost:8000/api/holdingsTotals',
    nasticker: 'http://localhost:8000/api/nasTicker',
    spticker: 'http://localhost:8000/api/spTicker',
    dowticker: 'http://localhost:8000/api/dowTicker',
    gbpticker: 'http://localhost:8000/api/gbpTicker',
    holdings: 'http://localhost:8000/api/holdings',
    instrumentValues: 'http://localhost:8000/api/stockData/Day',
    // Add more key-value pairs as needed
  };

  return dataSources;
};

export default DataSources;
