import React, { useEffect, useState } from 'react';

const DataLoader = ({ dataSources, refreshInterval, onDataLoaded }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = {};
        for (const key in dataSources) {
          try {
            const response = await fetch(dataSources[key]);
            if (!response.ok) {
              throw new Error(`Server Error (${response.status}): ${response.statusText}`);
            }
            const jsonData = await response.json();
            newData[key] = jsonData;
          } catch (error) {
            console.error(`Error fetching data for ${key}:`, error);
            newData[key] = ""; // Set the result for the item to an empty string on error
          }
        }
        setData(newData);
        onDataLoaded(newData); // Pass the loaded data to the onDataLoaded callback
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data initially
    fetchData();

    // Refresh data at the specified interval
    const interval = setInterval(fetchData, refreshInterval);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [dataSources, refreshInterval, onDataLoaded]);

  return null;
};

export default DataLoader;
