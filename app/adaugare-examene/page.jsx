"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createExam, getAllProfesori } from "../services/exameneService";
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

const professorNav = [
  {
    title: "Manage Exams",
    url: "/dashboard/professor/manage-exams",
    icon: null,
  },
  {
    title: "Schedule Exam",
    url: "/dashboard/professor/schedule-exam",
    icon: null,
  },
  {
    title: "Manage Cereri",
    url: "/dashboard/professor/manage-cereri",
    icon: null,
  },
];

export default function ScheduleExam() {
  const [formData, setFormData] = useState({
    nume_materie: "",
    data: "",
    ora: "",
    tip_evaluare: "",
    actualizatDe: "teacher",
    professors: "",
    assistants: "",
  });
  const [professorsList, setProfessorsList] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const data = await getAllProfesori();
        setProfessorsList(data);
      } catch (error) {
        console.error("Error fetching professors:", error);
      }
    };

    fetchProfessors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, ora, professors, assistants, ...rest } = formData;
      const formattedData = {
        ...rest,
        data: new Date(`${data}T${ora}`).toISOString(),
        professors: [professors],
        assistants: [assistants],
      };

      await createExam(formattedData);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        router.push("/dashboard/professor/manage-exams");
      }, 3000);
    } catch (error) {
      console.error("Failed to schedule exam:", error);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar
        navMain={professorNav}
        user={{
          name: "Professor",
          email: "professor@example.com",
          avatar: "/avatars/professor.jpg",
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
                <BreadcrumbPage>Schedule Exam</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            Schedule an Exam
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject */}
            <div>
              <label
                htmlFor="nume_materie"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Subject
              </label>
              <input
                type="text"
                id="nume_materie"
                name="nume_materie"
                value={formData.nume_materie}
                onChange={handleChange}
                required
                placeholder="Enter the subject"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="data"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Date
              </label>
              <input
                type="date"
                id="data"
                name="data"
                value={formData.data}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Time */}
            <div>
              <label
                htmlFor="ora"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Time
              </label>
              <input
                type="time"
                id="ora"
                name="ora"
                value={formData.ora}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Exam Type */}
            <div>
              <label
                htmlFor="tip_evaluare"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Exam Type
              </label>
              <select
                id="tip_evaluare"
                name="tip_evaluare"
                value={formData.tip_evaluare}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="" disabled>
                  Select an exam type
                </option>
                <option value="Final">Final</option>
                <option value="Partial">Partial</option>
                <option value="Test">Test</option>
              </select>
            </div>

            {/* Professors */}
            <div>
              <label
                htmlFor="professors"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Select Professor
              </label>
              <select
                id="professors"
                name="professors"
                value={formData.professors}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Choose a professor</option>
                {professorsList.map((prof) => (
                  <option key={prof.id_profesor} value={prof.id_profesor}>
                    {prof.firstName} {prof.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Assistants */}
            <div>
              <label
                htmlFor="assistants"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Select Assistant
              </label>
              <select
                id="assistants"
                name="assistants"
                value={formData.assistants}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Choose an assistant</option>
                {professorsList.map((prof) => (
                  <option key={prof.id_profesor} value={prof.id_profesor}>
                    {prof.firstName} {prof.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
              >
                Schedule Exam
              </button>
            </div>
          </form>
        </main>
      </SidebarInset>

      {/* Toast Notification */}
      {showToast && (
        <div
          id="toast-simple"
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800"
          role="alert"
        >
          <svg
            className="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
            />
          </svg>
          <div className="ps-4 text-sm font-normal">
            Exam scheduled successfully! Redirecting...
          </div>
        </div>
      )}
    </SidebarProvider>
  );
}
