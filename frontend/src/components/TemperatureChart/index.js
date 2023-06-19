import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const TemperatureChart = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Blood Temperature (C)",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/data/temperature"
        );

        const newLabel = response.data.StatusSNS.Time;
        const newData = response.data.StatusSNS.AM2301.Temperature;

        setChartData((prevChartData) => ({
          labels: [...prevChartData.labels, newLabel],
          datasets: [
            {
              ...prevChartData.datasets[0],
              data: [...prevChartData.datasets[0].data, newData],
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    // Destroy existing chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Initial chart setup
    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    }

    // Interval to update chart data every 1 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 3000);

    // Clean up interval and chart instance on unmount
    return () => {
      clearInterval(intervalId);
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartContainer]);

  // Update chart when chartData changes
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.data = chartData;
      chartInstance.current.update();
    }
  }, [chartData]);

  return <canvas ref={chartContainer} />;
};

export default TemperatureChart;
