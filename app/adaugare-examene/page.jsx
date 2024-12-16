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
  
        // Log full details of subjects
        console.log('All Subjects:', materiiData);
        console.log('Subjects Count:', materiiData.length);
        
        setProfessorsList(professorsData);
        setMaterii(materiiData);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load initial data. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const materiiData = await getAllMaterii();
        
        // Log all available subjects
        console.log('Available subjects:', materiiData);
        
        setMaterii(materiiData);
      } catch (err) {
        console.error("Error loading subjects:", err);
        setError("Failed to load subjects. Please refresh the page.");
      }
    };
  
    fetchData();
  }, []);

  const validateMaterie = async (id_materie) => {
    try {
      // Add console logging
      console.log(`Validating materie with ID: ${id_materie}`);
  
      if (!id_materie) {
        throw new Error("Subject ID is required.");
      }
  
      const materie = await findMaterieById(id_materie);
  
      // Add a more detailed log
      console.log('Materie validation result:', materie);
  
      if (!materie) {
        throw new Error(`Subject with ID "${id_materie}" does not exist.`);
      }
  
      return materie;
    } catch (error) {
      console.error('Materie validation error:', error);
      // Rethrow the error to be caught in the calling function
      throw error;
    }
  };
   // Get materie name by id
   const getMaterieNameById = (idMaterie) => {
    if (!idMaterie) return "Loading...";
    const materie = materii.find((m) => m.id_materie === idMaterie);
    return materie ? materie.nume_materie : "Unknown";
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
  
      // Validate the subject by ID
      const validatedMaterie = await validateMaterie(id_materie);
  
      const nume_materie=getMaterieNameById(id_materie);
      // Construct payload
      const examData = {
        nume_materie,
        data,
        ora,
        tip_evaluare,
        professors,
        assistants,
      };
  
      // Log the data being sent
      console.log('Submitting Exam Data:', examData);
  
      // Call the createExam service
      const response = await createExam(examData);
  
      // Log and display success message
      console.log("Exam created successfully:", response);
      setToastMessage("Exam scheduled successfully!");
      setShowToast(true);
  
      // Optionally reset form
      setFormData({
        id_materie: "",
        data: "",
        ora: "",
        tip_evaluare: "",
        professors: "",
        assistants: "",
      });
  
      // Redirect if necessary
      router.push("/dashboard/professor/manage-exams");
    } catch (error) {
      console.error("Error scheduling exam:", error);
      setError(error.message || "Failed to schedule the exam. Please try again.");
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