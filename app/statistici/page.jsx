"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import Navbar from "../components/Navbar";

const Statistics = () => {
  const dummyData = [
    { date: "2024-11-25", count: 15 },
    { date: "2024-11-26", count: 10 },
    { date: "2024-11-27", count: 7 },
    { date: "2024-11-28", count: 5 },
    { date: "2024-11-29", count: 3 },
  ];

  const totalRequests = dummyData.reduce((sum, item) => sum + item.count, 0);
  const maxRequests = Math.max(...dummyData.map((item) => item.count));
  const popularDate = dummyData.find(
    (item) => item.count === maxRequests
  )?.date;

  const chartOptions = {
    title: {
      text: "Preferințe pentru zilele examenelor",
      left: "center",
      textStyle: {
        color: "#333",
        fontSize: 18,
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["Cereri"],
      top: "10%",
    },
    xAxis: {
      type: "category",
      data: dummyData.map((item) => item.date),
      axisLabel: {
        color: "#555",
        rotate: 30,
      },
    },
    yAxis: {
      type: "value",
      name: "Număr de cereri",
      axisLabel: {
        color: "#555",
      },
    },
    series: [
      {
        name: "Cereri",
        type: "bar",
        data: dummyData.map((item) => item.count),
        itemStyle: {
          color: "#5470C6",
          borderRadius: [4, 4, 0, 0],
        },
        barWidth: "50%",
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full lg:w-2/3">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
            Statistici Examene
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
            <div className="text-center md:text-left">
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                Total cereri:
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {totalRequests}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                Ziua cea mai populară:
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {popularDate}
              </p>
            </div>
          </div>
          <ReactECharts
            option={chartOptions}
            style={{ height: "400px", width: "100%" }}
          />
        </div>
      </div>
    </>
  );
};

export default Statistics;
