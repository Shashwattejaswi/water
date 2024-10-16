import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

const StockChart = ({ dates }) => {

  useEffect(() => {
    setOptions(prevOptions => ({
      ...prevOptions,
      series: prevOptions.series.map(seriesItem => ({
        ...seriesItem,
        data: dates,

      })),
     
    }));
  }, [dates])

  const [options, setOptions] = useState({
    series: [{
      name: 'children+adult+babies',
      data: dates,  // pass the 'dates' prop here
    }],
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: 'client per day',
      align: 'left',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val;  // Format the y-axis values
        },
      },
      title: {
        text: 'Number of person',
      },
    },
    xaxis: {
      type: 'datetime',  // Use datetime for x-axis
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val;  // Format tooltip values
        },
      },
    },
  });

  return (
    <div id="chart">
      <ApexCharts options={options} series={options.series} type="area" height={400} />
    </div>
  );
};

export default StockChart;
