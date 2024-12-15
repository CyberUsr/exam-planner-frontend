"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createExam, getAllProfesori } from "../services/exameneService";
import { getAllMaterii, findMaterieById } from "../services/materiiService";
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

export default function ScheduleExam() {
  const [formData, setFormData] = useState({
    id_materie: "",
    data: "",
    ora: "",
    tip_evaluare: "",
    professors: "",
    assistants: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [professorsList, setProfessorsList] = useState([]);
  const [materii, setMaterii] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [professorsData, materiiData] = await Promise.all([
          getAllProfesori(),
          getAllMaterii(),
        ]);
        setProfessorsList(professorsData);
        setMaterii(materiiData);
      } catch (err) {
        setError("Failed to load initial data. Please refresh the page.");
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const validateMaterie = async (id_materie) => {
    if (!id_materie) {
      throw new Error("Subject ID is required.");
    }

    const materie = await findMaterieById(id_materie);
    if (!materie) {
      throw new Error(`Subject with ID "${id_materie}" does not exist.`);
    }

    return materie;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { id_materie, data, ora, tip_evaluare, professors, assistants } = formData;

      // Validate required fields
      if (!id_materie || !data || !ora || !tip_evaluare || !professors || !assistants) {
        throw new Error("Please fill in all required fields.");
      }

      // Validate the subject by ID
      await validateMaterie(id_materie);

      // Prepare ISO date-time string
      const isoDateTime = `${data}T${ora}:00.000Z`;

      // Create exam payload
      const payload = {
        id_materie,
        data_ora: isoDateTime,
        tip_evaluare,
        professors: [professors],
        assistants: [assistants],
      };

      // API Call to create exam
      await createExam(payload);

      // Success handling
      setToastMessage("Exam scheduled successfully!");
      setShowToast(true);
      setFormData({
        id_materie: "",
        data: "",
        ora: "",
        tip_evaluare: "",
        professors: "",
        assistants: "",
      });

      // Redirect
      setTimeout(() => {
        router.push("/dashboard/professor/manage-exams");
      }, 2000);
    } catch (error) {
      setError(error.message || "Failed to schedule exam. Please try again.");
      setToastMessage(error.message || "Failed to schedule exam. Please try again.");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !professorsList.length && !materii.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar
        navMain={{
          title: "Manage Exams",
          url: "/dashboard/professor/manage-exams",
        }}
        user={{
          name: "Professor",
          email: "professor@example.com",
          avatar: "/avatars/professor.jpg",
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
                <BreadcrumbPage>Schedule Exam</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            Schedule an Exam
          </h1>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div>
              <label
                htmlFor="id_materie"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Select Subject
              </label>
              <select
                id="id_materie"
                name="id_materie"
                value={formData.id_materie}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Choose a subject</option>
                {materii.map((materie) => (
                  <option key={materie.id_materie} value={materie.id_materie}>
                    {materie.nume_materie}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

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
            </div>

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
                <option value="">Select an exam type</option>
                <option value="Final">Final</option>
                <option value="Partial">Partial</option>
                <option value="Test">Test</option>
              </select>
            </div>
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

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-3 text-lg font-medium text-white rounded-md ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? "Scheduling..." : "Schedule Exam"}
            </button>
          </form>

          {showToast && (
            <div
              className={`fixed bottom-4 right-4 p-4 rounded-lg text-white ${
                error ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {toastMessage}
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
