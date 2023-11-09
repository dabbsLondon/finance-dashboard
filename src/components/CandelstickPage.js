import React, { useState,useEffect } from 'react';
import { timeParse, timeFormat } from "d3-time-format";
import { ChartCanvas, Chart } from "react-stockcharts";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { BarSeries } from "react-stockcharts/lib/series";
import { MouseCoordinateX, MouseCoordinateY } from "react-stockcharts/lib/coordinates";
import { CrossHairCursor } from "react-stockcharts/lib/coordinates";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { useParams } from 'react-router-dom';

import DataLoader from './DataLoader';
import '../css/CandlestickChart.css';

const parseDate = timeParse("%Y-%m-%dT%H:%M:%S");
const formatDate = timeFormat("%Y-%m-%d %H:%M:%S");

const CandlestickPage = () => {
    const [data, setData] = useState([]);
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const { symbol } = useParams();

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);

        return () => { // cleanup
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const transformData = (inputData) => {
        if (inputData && inputData.chart_data && inputData.chart_data.length) {
            return inputData.chart_data.map(d => ({
                date: parseDate(d.date),
                open: d.open,
                close: d.close,
                high: d.high,
                low: d.low,
                volume: d.volume
            }));
        }
        return [];
    };

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
    const {
        data: chartData,
        xScale,
        xAccessor,
        displayXAccessor
    } = xScaleProvider(transformData(data));

    return (
        <div className="chart-container">
            <div className="summary-table">
                {data && data.summary && (
                    <div>
                        <h3>Summary:</h3>
                        <table>
                            <tbody>
                                <tr><td>Symbol</td><td>{data.summary.symbol}</td></tr>
                                <tr><td>Current Price</td><td>{data.summary.current_price}</td></tr>
                                <tr><td>Last Close</td><td>{data.summary.last_close}</td></tr>
                                <tr><td>Shares Held</td><td>{data.summary.number_of_shares_held}</td></tr>
                                <tr><td>Current Value</td><td>{data.summary.current_value}</td></tr>
                                <tr><td>Original Value</td><td>{data.summary.original_value}</td></tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <div className="chart-wrapper">
                <DataLoader
                    dataSources={{ chartData: `http://localhost:8000/api/candleData?symbol=${symbol}` }}
                    refreshInterval={60000}
                    onDataLoaded={(newData) => {
                        setData(newData.chartData);
                    }}
                />

                  {chartData.length > 0 && (
                    <ChartCanvas
                      height={dimensions.height * 0.8}
                      width={dimensions.width*.99}
                      ratio={1}
                      margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
                      seriesName="DataSeries"
                      data={chartData}
                      type="hybrid"
                      zoomEvent={false}
                      xAccessor={xAccessor}
                      xScale={xScale}
                      xExtents={[xAccessor(chartData[0]), xAccessor(chartData[chartData.length - 1])]}>

                      {/* Candlestick Chart */}
                      <Chart id={1} height={dimensions.height * 0.65} yExtents={d => [d.high, d.low]}>
                          <XAxis
                              axisAt="bottom"
                              orient="bottom"
                              ticks={20}
                              stroke="white"
                              tickStroke="white"
                              showGrid={true}   // Show grid
                              gridStroke="white"   // Color for the gridlines
                              gridStrokeDashArray="Solid"  // Solid line for the gridlines
                          />

                          <YAxis
                              axisAt="right"
                              orient="right"
                              ticks={20}
                              stroke="white"
                              tickStroke="white"
                              showGrid={true}   // Show grid
                              gridStroke="white"   // Color for the gridlines
                              gridStrokeDashArray="Solid"  // Solid line for the gridlines
                          />

                          <MouseCoordinateY at="right" orient="right" stroke="white" />
                          <CandlestickSeries wickStroke="white"/>
                          <MouseCoordinateX at="bottom" orient="bottom" displayFormat={time => time.toLocaleString()} />
                      </Chart>

                        {/* Volume Chart */}
                        <Chart id={2} height={dimensions.height * 0.15} yExtents={d => d.volume} origin={(w, h) => [0, h - dimensions.height * 0.15]}>
                            <YAxis axisAt="right" orient="right" ticks={5} stroke="white" tickStroke="white"/>
                            <BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"} />
                            <MouseCoordinateY at="right" orient="right" stroke="white" />
                        </Chart>

                        <CrossHairCursor />
                    </ChartCanvas>
                )}
            </div>
        </div>
    );
};

export default CandlestickPage;
