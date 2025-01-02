/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createExam, getAllProfesori } from "../../../api/services/exameneService";
import { getAllMaterii } from "../../../api/services/materiiService";
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    id_materie: "",
    data: "",
    ora: "",
    tip_evaluare: "",
    professors: "",
    assistants: "",
  });

  const [numeMaterie, setNumeMaterie] = useState(""); // Store the subject name
  const [professorsList, setProfessorsList] = useState([]);
  const [materii, setMaterii] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Populate formData and numeMaterie from query parameters
  useEffect(() => {
    const idMaterie = searchParams.get("id_materie");
    const data = searchParams.get("data");
    const ora = searchParams.get("ora");

    if (idMaterie && data && ora) {
      setFormData((prev) => ({
        ...prev,
        id_materie: idMaterie,
        data: data.split("T")[0], // Extract date from ISO string
        ora: ora.split("T")[1]?.substring(0, 5), // Extract time from ISO string
      }));
    }
  }, [searchParams]);

  // Fetch professors and subjects
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

        // Set numeMaterie if id_materie is present
        const idMaterie = searchParams.get("id_materie");
        if (idMaterie) {
          const selectedMaterie = materiiData.find(
            (materie) => materie.id_materie === idMaterie
          );
          if (selectedMaterie) {
            setNumeMaterie(selectedMaterie.nume_materie);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

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
      const { id_materie, data, ora, tip_evaluare, professors, assistants } =
        formData;

      const examData = {
        id_materie,
        nume_materie: numeMaterie, // Include the subject name
        data,
        ora,
        tip_evaluare,
        professors,
        assistants,
      };

      console.log("Submitting Exam Data:", examData);

      await createExam(examData);

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

      router.push("/dashboard/professor/manage-exams");
    } catch (error) {
      console.error("Error scheduling exam:", error);
      setError("Failed to schedule the exam. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
                Subject
              </label>
              <input
                type="text"
                id="id_materie"
                name="id_materie"
                value={numeMaterie}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              />
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
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
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
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Additional Fields */}
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
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
              }`}
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
