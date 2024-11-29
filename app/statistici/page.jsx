"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const adminNav = [
  {
    title: "Statistici",
    url: "/dashboard/admin/statistics",
    icon: null,
  },
  {
    title: "Exam Calendar",
    url: "/dashboard/admin/exams",
    icon: null,
  },
  {
    title: "Cereri",
    url: "/dashboard/admin/cereri",
    icon: null,
  },
];

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
    <SidebarProvider>
      <AppSidebar
        navMain={adminNav}
        user={{
          name: "Admin",
          email: "admin@example.com",
          avatar: "/avatars/admin.jpg",
        }}
      />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 bg-white dark:bg-gray-800 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Statistici</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <div className="grid gap-6">
            {/* Summary Stats Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
                Statistici Examene
              </h1>
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
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
            </div>

            {/* Chart Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <ReactECharts
                option={chartOptions}
                style={{ height: "600px", width: "100%" }} // Increased graph height
              />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Statistics;
