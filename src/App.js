import React, { useState } from 'react';
import DataLoader from './components/DataLoader';
import getDataSources from './components/DataSources';
import PageHeader from './components/header';
import Tickers from './components/Tickers';
import HoldingsTable from './components/HoldingsTable';
import BarChart from './components/BarChart';
import HoldingsBySectorGraph from './components/HoldingsBySectorGraph';
import GainAreaChart from './components/GainAreaChart';
import TreeMapComponent from './components/TreeMap';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const App = () => {
  const dataSources = getDataSources();
  const refreshInterval = 60000; // Refresh data every 60 seconds
  const [summaryData, setSummaryData] = useState(null);
  const [tickerData, setTickerData] = useState([]);
  const [holdingsData, setHoldingsData] = useState([]);
  const [instrumentValue, setInstrumentValues] = useState([]);
  const [gainDatas, setGainData] = useState([]);
  const [treeMapData, setTreeMapData] = useState([]);

  // Define the layout for the GridLayout
  const layout = [
    { i: 'table', x: 0, y: 0, w: 2, h: 1 }, // Table spanning full width
    { i: 'barchart', x: 0, y: 1, w: 1, h: 1 }, // BarChart, top-left of the remaining area
    { i: 'holdingsgraph', x: 0, y: 2, w: 1, h: 1 }, // HoldingsBySectorGraph, top-right of the remaining area
    { i: 'gainchart', x: 1, y: 1, w: 1, h: 1 }, // GainAreaChart, bottom-left of the remaining area
    { i: 'treemap', x: 1, y: 2, w: 1, h: 1 }, // TreeMapComponent, bottom-right of the remaining area
  ];
  

  return (
    <div className="app-container">
      <DataLoader
        dataSources={dataSources}
        refreshInterval={refreshInterval}
        onDataLoaded={(data) => {
          setSummaryData(data['summary']);
          setHoldingsData(data['holdings']);
          setInstrumentValues(data['instrumentValues']);
          setGainData(data['gainData']);
          setTreeMapData(data['treeMap']);
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
       <div className="chart-grid">
       <GridLayout className="layout" layout={layout} cols={2} rowHeight={window.innerHeight / 4} width={window.innerWidth} margin={[50, 80]} containerPadding={[10, 10]} >
          <div key="table" className="chart-item">
            {/* The table content here */}
            <HoldingsTable data={holdingsData} instrumentValues={instrumentValue} lineData={instrumentValue} />
          </div>
          <div key="barchart" className="chart-item">
            <BarChart data={holdingsData} />
          </div>
          <div key="holdingsgraph" className="chart-item">
            <HoldingsBySectorGraph data={holdingsData} />
          </div>
          <div key="gainchart" className="chart-item">
            <GainAreaChart data={gainDatas} />
          </div>
          <div key="treemap" className="chart-item">
            <TreeMapComponent data={treeMapData} />
          </div>
        </GridLayout>
      </div>
    </div>
  );
};

export default App;
