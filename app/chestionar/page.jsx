"use client";

import React, { useState } from "react";
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
    title: "Chestionar",
    url: "/dashboard/admin/survey",
    icon: null,
  },
  {
    title: "Exam Calendar",
    url: "/dashboard/admin/exams",
    icon: null,
  },
  {
    title: "Statistici",
    url: "/dashboard/admin/statistics",
    icon: null,
  },
];

const Survey = () => {
  const [selectedExams, setSelectedExams] = useState({
    exam1: "",
    exam2: "",
    exam3: "",
    exam4: "",
    exam5: "",
    exam6: "",
  });

  const examSuggestions = [
    {
      id: 1,
      professor: "George Mahalu",
      subject: "Metode Numerice",
      dates: ["2024-12-01", "2024-12-03", "2024-12-05"],
    },
    {
      id: 2,
      professor: "Aurelian Rotaru",
      subject: "Fizica",
      dates: ["2024-12-07", "2024-12-09", "2024-12-11"],
    },
    {
      id: 3,
      professor: "Marius Prelipicianu",
      subject: "Metode Numerice",
      dates: ["2024-12-10", "2024-12-12", "2024-12-14"],
    },
    {
      id: 4,
      professor: "Ion Petrescu",
      subject: "Chimie Organică",
      dates: ["2024-12-15", "2024-12-17", "2024-12-19"],
    },
    {
      id: 5,
      professor: "Cristina Vasilescu",
      subject: "Biologie Moleculară",
      dates: ["2024-12-18", "2024-12-20", "2024-12-22"],
    },
    {
      id: 6,
      professor: "Radu Ionescu",
      subject: "Tehnologii de Programare",
      dates: ["2024-12-21", "2024-12-23", "2024-12-25"],
    },
  ];

  const handleChange = (e, examId) => {
    setSelectedExams({ ...selectedExams, [examId]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Chestionar trimis cu succes!");
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
                <BreadcrumbPage>Chestionar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <div className="grid gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
                Chestionar pentru Stabilirea Datei Examenului
              </h1>
              <form
                onSubmit={handleSubmit}
                className="grid gap-4 sm:grid-cols-2"
              >
                {examSuggestions.map((exam) => (
                  <div
                    key={exam.id}
                    className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md"
                  >
                    <div className="mb-4">
                      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        {exam.subject}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Profesor: {exam.professor}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor={`exam${exam.id}`}
                        className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                      >
                        Alege data examenului:
                      </label>
                      <select
                        id={`exam${exam.id}`}
                        value={selectedExams[`exam${exam.id}`]}
                        onChange={(e) => handleChange(e, `exam${exam.id}`)}
                        className="mt-1 block w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Alege o dată...</option>
                        {exam.dates.map((date, index) => (
                          <option key={index} value={date}>
                            {date}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  className="col-span-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Trimite Răspunsul
                </button>
              </form>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Survey;
