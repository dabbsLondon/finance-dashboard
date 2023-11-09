import React, { useState, useEffect } from 'react';
import PageHeader from './header';
import Tickers from './Tickers';
import HoldingsTable from './HoldingsTable';
import BarChart from './BarChart';
import getDataSources from './DataSources';
import HoldingsBySectorGraph from './HoldingsBySectorGraph';
import GainAreaChart from './GainAreaChart';
import TreeMapComponent from './TreeMap';
import GridLayout from 'react-grid-layout';
import DataLoader from './DataLoader';

import bearImage1 from '../images/bear1.png';
import bearImage2 from '../images/bear2.png';
import bearImage3 from '../images/bear3.png';
import bearImage4 from '../images/bear4.png';

import bullImage1 from '../images/bull1.png';
import bullImage2 from '../images/bull2.png';
import bullImage3 from '../images/bull3.png';
import bullImage4 from '../images/bull4.png';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const Dashboard = ({ summaryData, tickerData }) => {
    const [holdingsData, setHoldingsData] = useState([]);
    const [instrumentValue, setInstrumentValues] = useState([]);
    const [gainDatas, setGainData] = useState([]);
    const [treeMapData, setTreeMapData] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const images = [bullImage1, bearImage1, bullImage2, bearImage2, bullImage3, bearImage3, bullImage4, bearImage4];
    const [isLoading, setIsLoading] = useState(true);
    const [dotCount, setDotCount] = useState(1);
    const dataSources = getDataSources();
    const refreshInterval = 60000; // Refresh data every 60 seconds

    const layout = [
        { i: 'table', x: 0, y: 0, w: 2, h: 1 },
        { i: 'barchart', x: 0, y: 1, w: 1, h: 1 },
        { i: 'holdingsgraph', x: 0, y: 2, w: 1, h: 1 },
        { i: 'gainchart', x: 1, y: 1, w: 1, h: 1 },
        { i: 'treemap', x: 1, y: 2, w: 1, h: 1 },
    ];
    

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDotCount((prevCount) => (prevCount % 10) + 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const loadingText = `Awaiting Server Connection${'.'.repeat(dotCount)}`;

    useEffect(() => {
        setIsLoading(!summaryData || !tickerData || !holdingsData || !instrumentValue || !gainDatas || !treeMapData);
    }, [holdingsData, gainDatas, treeMapData, instrumentValue, tickerData, summaryData]);

    return (
        <div className="dashboard-container">
            <DataLoader
                dataSources={dataSources}
                refreshInterval={refreshInterval}
                onDataLoaded={(data) => {
                setHoldingsData(data['holdings']);
                setInstrumentValues(data['instrumentValues']);
                setGainData(data['gainData']);
                setTreeMapData(data['treeMap']);
                }}
            />
            <PageHeader summaryData={summaryData} />
            <Tickers items={tickerData} />

            <div className="chart-grid" style={{ marginTop: '20px' }}>
                
                {isLoading ? (
                    <div className="loading-container">
                        <div className="loading-row"></div>
                        <div className="loading-row">
                            <img src={images[currentImage]} alt="Loading" className="loading-image" />
                            <div className="loading-text">{loadingText}</div>
                        </div>
                    </div>
                ) : (
                    <GridLayout className="layout" layout={layout} cols={2} rowHeight={window.innerHeight / 4} width={window.innerWidth} margin={[50, 80]} containerPadding={[10, 10]}>
                        <div key="table" className="chart-item">
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
                )}
            </div>
        </div>
    );
};

export default Dashboard;
