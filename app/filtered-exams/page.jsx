"use client";

import React, { useState, useEffect } from "react";
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
import { getAllProfesori } from "../services/exameneService";

const secretariatNav = [
  {
    title: "All Exams",
    url: "/dashboard/secretariat/exams",
    icon: null,
  },
  {
    title: "Manage Rooms",
    url: "/dashboard/secretariat/rooms",
    icon: null,
  },
  {
    title: "Statistics",
    url: "/dashboard/secretariat/statistics",
    icon: null,
  },
];

const SecretariatExamsPage = () => {
  const [filters, setFilters] = useState({
    sala: "",
    profesor: "",
    asistent: "",
  });
  const [assistantsList, setAssistantsList] = useState([]);
  const [professorsList, setProfessorsList] = useState([]);

  const exams = [
    {
      id: 1,
      sala: "Sala A",
      profesor: "George Mahalu",
      asistent: "Maria Popescu",
      materie: "Metode Numerice",
      data: "2024-12-01",
      ora: "10:00",
    },
    {
      id: 2,
      sala: "Sala B",
      profesor: "Aurelian Rotaru",
      asistent: "Vasile Ionescu",
      materie: "Fizica",
      data: "2024-12-03",
      ora: "14:00",
    },
    // Add more sample data...
  ];

  // Fetch professors and assistants
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProfesori();
        setProfessorsList(data);
        setAssistantsList(data); // Assuming assistants are fetched similarly
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredExams = exams.filter(
    (exam) =>
      (filters.sala === "" || exam.sala === filters.sala) &&
      (filters.profesor === "" || exam.profesor === filters.profesor) &&
      (filters.asistent === "" || exam.asistent === filters.asistent)
  );

  return (
    <SidebarProvider>
      <AppSidebar
        navMain={secretariatNav}
        user={{
          name: "Secretariat",
          email: "secretariat@example.com",
          avatar: "/avatars/secretariat.jpg",
        }}
      />
      <SidebarInset>
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
                <BreadcrumbPage>All Exams</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="p-6 bg-gray-100 dark:bg-gray-900">
          <div className="grid gap-6">
            {/* Filters Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Filters
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="sala"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Sala
                  </label>
                  <select
                    id="sala"
                    name="sala"
                    value={filters.sala}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All</option>
                    <option value="Sala A">Sala A</option>
                    <option value="Sala B">Sala B</option>
                    <option value="Sala C">Sala C</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="profesor"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Profesor
                  </label>
                  <select
                    id="profesor"
                    name="profesor"
                    value={filters.profesor}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All</option>
                    {professorsList.map((prof) => (
                      <option key={prof.id_profesor} value={prof.nume}>
                        {prof.firstName} {prof.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="asistent"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Asistent
                  </label>
                  <select
                    id="asistent"
                    name="asistent"
                    value={filters.asistent}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All</option>
                    {assistantsList.map((asist) => (
                      <option key={asist.id_profesor} value={asist.nume}>
                        {asist.firstName} {asist.lastName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Exam Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Exam List
              </h2>
              <table className="table-auto w-full border">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Sala</th>
                    <th className="border px-4 py-2">Profesor</th>
                    <th className="border px-4 py-2">Asistent</th>
                    <th className="border px-4 py-2">Materie</th>
                    <th className="border px-4 py-2">Data</th>
                    <th className="border px-4 py-2">Ora</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExams.map((exam) => (
                    <tr
                      key={exam.id}
                      className="even:bg-gray-100 dark:even:bg-gray-700"
                    >
                      <td className="border px-4 py-2">{exam.id}</td>
                      <td className="border px-4 py-2">{exam.sala}</td>
                      <td className="border px-4 py-2">{exam.profesor}</td>
                      <td className="border px-4 py-2">{exam.asistent}</td>
                      <td className="border px-4 py-2">{exam.materie}</td>
                      <td className="border px-4 py-2">{exam.data}</td>
                      <td className="border px-4 py-2">{exam.ora}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SecretariatExamsPage;
