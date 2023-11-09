import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';  // Importing the new Dashboard component
import CandlestickPage from './components/CandelstickPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DataLoader from './components/DataLoader';
import getDataSources from './components/DataSources';

const App = () => {
    const dataSources = getDataSources();
    const refreshInterval = 60000;
    const [summaryData, setSummaryData] = useState(null);
    const [tickerData, setTickerData] = useState([]);

    return (
        <Router>
            <div className="app-container">
                <DataLoader
                    dataSources={dataSources}
                    refreshInterval={refreshInterval}
                    onDataLoaded={(data) => {
                        setSummaryData(data['summary']);
                        setTickerData([
                            data['nasticker'],
                            data['spticker'],
                            data['dowticker'],
                            data['gbpticker']
                        ]);
                    }}
                />

                <Routes>
                    <Route path="/" element={<Dashboard summaryData={summaryData} tickerData={tickerData} />} exact />
                    <Route path="/hello/:symbol" element={<CandlestickPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
