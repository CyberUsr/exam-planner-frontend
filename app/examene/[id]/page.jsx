"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getExamById,
  updateExam,
  deleteExam,
  getAllProfesori,
} from "../../api/services/exameneService";
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

export default function UpdateExam({ params }) {
  const { id } = params;
  const router = useRouter();

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
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch professors and exam details
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch professors list
        const professorsData = await getAllProfesori();
        setProfessorsList(professorsData);

        // Fetch exam details
        if (id) {
          const examData = await getExamById(id);

          // Safely extract first professor and assistant
          const firstProfessor =
            examData.professors && examData.professors.length > 0
              ? examData.professors[0].id_profesor
              : "";
          const firstAssistant =
            examData.assistants && examData.assistants.length > 0
              ? examData.assistants[0].id_profesor
              : "";

          // Parse date and time
          const examDate = new Date(examData.data);
          const formattedDate = examDate.toISOString().split("T")[0];
          const formattedTime = examDate
            .toTimeString()
            .split(" ")[0]
            .slice(0, 5);

          setFormData({
            nume_materie: examData.nume_materie || "",
            data: formattedDate,
            ora: formattedTime,
            tip_evaluare: examData.tip_evaluare || "",
            actualizatDe: "teacher",
            professors: firstProfessor,
            assistants: firstAssistant,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setToastMessage(`Failed to load exam details: ${error.message}`);
        setShowToast(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, ora, professors, assistants, ...rest } = formData;

      // Combine date and time
      const combinedDateTime = new Date(`${data}T${ora}`);

      const formattedData = {
        ...rest,
        data: combinedDateTime.toISOString(),
        professors: professors ? [professors] : [],
        assistants: assistants ? [assistants] : [],
        actualizatLa: new Date().toISOString(),
      };

      await updateExam(id, formattedData);

      setToastMessage("Exam updated successfully!");
      setShowToast(true);

      setTimeout(() => {
        router.push("/dashboard/professor/manage-exams");
      }, 3000);
    } catch (error) {
      console.error("Failed to update exam:", error);
      setToastMessage(`Failed to update exam: ${error.message}`);
      setShowToast(true);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteExam(id);
      setToastMessage("Exam deleted successfully!");
      setShowToast(true);

      setTimeout(() => {
        router.push("/dashboard/professor/manage-exams");
      }, 3000);
    } catch (error) {
      console.error("Failed to delete exam:", error);
      setToastMessage(`Failed to delete exam: ${error.message}`);
      setShowToast(true);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
                <BreadcrumbPage>Update Exam</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            Update Exam
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

            {/* Action Buttons */}
            <div className="flex justify-between space-x-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
              >
                Update Exam
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:outline-none"
              >
                Delete Exam
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
          <div className="ps-4 text-sm font-normal">{toastMessage}</div>
        </div>
      )}
    </SidebarProvider>
  );
}
