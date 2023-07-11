import React, { useState } from 'react';
import DataLoader from './components/DataLoader';
import getDataSources from './components/DataSources';
import PageHeader from './components/header';
import Tickers from './components/Tickers';
import HoldingsTable from './components/HoldingsTable';

const App = () => {
  const dataSources = getDataSources();
  const refreshInterval = 60000; // Refresh data every 60 seconds

  const [summaryData, setSummaryData] = useState(null);
  const [tickerData, setTickerData] = useState([]);
  const [holdingsData, setHoldingsData] = useState([]);
  const [instrumentValue, setInstrumentValues] =useState([]);

  return (
    <div>
      <DataLoader
        dataSources={dataSources}
        refreshInterval={refreshInterval}
        onDataLoaded={(data) => {
          setSummaryData(data['summary']);
          setHoldingsData(data['holdings']);
          setInstrumentValues(data['instrumentValues']);
          setTickerData([
            data['nasticker'],
            data['spticker'],
            data['dowticker'],
            data['gbpticker']
          ]);
        }}
      />
      <PageHeader summaryData={summaryData} />
      <Tickers items={tickerData} />
      <HoldingsTable data={holdingsData} instrumentValues={instrumentValue} />
    </div>
  );
};

export default App;
