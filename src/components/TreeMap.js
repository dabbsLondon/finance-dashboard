import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import TreemapModule from 'highcharts/modules/treemap';
import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';

TreemapModule(Highcharts);

const MyTreeMap = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>Loading...</p>;
  }

  const processedData = data["data"][0]["labels"].map((label, index) => ({
    id: label,
    name: label,
    parent: data["data"][0]["parents"][index] || null,
    value: data["data"][0]["values"][index],
    day_gain: data["data"][0]["day_gain"][index], // Added the day_gain property to processedData
  }));

  const sectorValues = processedData.reduce((acc, curr) => {
    acc[curr.parent] = (acc[curr.parent] || 0) + curr.value;
    return acc;
  }, {});

  const sectorNodes = Object.entries(sectorValues).map(([id, value]) => ({
    id,
    name: id,
    value,
  }));

  const finalData = [...processedData, ...sectorNodes];

  finalData.forEach(d => {
    const greenColor = "#77dd77";
    const redColor = "#FF0000";
    const greyColor = "#808080";
  
    const colorScale = (value) => {
      if (value > 0) {
        return interpolateRgb(greyColor, greenColor)(value);
      } else if (value < 0) {
        return interpolateRgb(greyColor, redColor)(-value);
      } else {
        return greyColor;
      }
    };
  
    const scaledValue = d.day_gain//(d.day_gain + 1) / 2;
    const col = colorScale(scaledValue);
    d.color = col;
  });
  
  const options = {
    chart: {
      backgroundColor: 'black', // Set chart's background to dark color
      height: '28%',
    },
    title: {
      text: 'Holdings TreeMap',
      style: {
        color: '#E0E0E3', // Set title's color to light
        fontSize: '24px',
        fontWeight: 'bold',
      },
      margin: 40,
    },
    series: [{
      type: 'treemap',
      layoutAlgorithm: 'squarified',
      dataLabels: {
        enabled: true,
        style: {
          color: 'black', // Set data label's color to light
          fontSize: '15px',
          textOutline: '0',
          textPadding: 10,
        },
        allowOverlap: false,
      },
      levelIsConstant: false,
      levels: [{
        level: 2,
        dataLabels: {
          enabled: true,
        },
        borderWidth: 1,
        borderColor: 'black', // Set border's color to white
      }],
      data: finalData
    }],
  };

  const style = {
    width: '100%',
    position: 'absolute',
    right: 0,
    height: '100%',
    backgroundColor: 'black', // Set the container's background to dark
    padding: '10px',
    borderRadius: '5px',
  };

  return <div style={style}><HighchartsReact highcharts={Highcharts} options={options} /></div>;
};

export default MyTreeMap;
