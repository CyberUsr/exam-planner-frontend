/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getExamById,
  updateExam,
  deleteExam,
} from "../../services/exameneService";
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

export default function ExamDetails({ params }) {
  const { id } = params;
  const router = useRouter();
  const [formData, setFormData] = useState({
    nume_materie: "",
    data: "",
    ora: "",
    tip_evaluare: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchExam = async () => {
      try {
        const data = await getExamById(id);
        setFormData({
          nume_materie: data.nume_materie,
          data: data.data.split("T")[0],
          ora: data.data.split("T")[1]?.slice(0, 5),
          tip_evaluare: data.tip_evaluare,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setToastMessage("Failed to load exam details.");
        setShowToast(true);
      }
    };

    fetchExam();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        nume_materie: formData.nume_materie,
        data: new Date(`${formData.data}T${formData.ora}`).toISOString(),
        tip_evaluare: formData.tip_evaluare,
      };

      await updateExam(id, updatedData);
      setToastMessage("Exam updated successfully!");
      setShowToast(true);
      setTimeout(() => {
        router.push("/dashboard/professor/manage-exams");
      }, 3000);
    } catch (error) {
      setToastMessage("Failed to update exam.");
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
      setToastMessage("Failed to delete exam.");
      setShowToast(true);
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
                <BreadcrumbPage>Exam Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            Update Exam
          </h1>
          <form onSubmit={handleUpdate} className="space-y-6">
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Final">Final</option>
                <option value="Partial">Partial</option>
                <option value="Test">Test</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                type="submit"
                className="w-1/2 px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="w-1/2 px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </form>
        </main>
      </SidebarInset>

      {/* Toast Notification */}
      {showToast && (
        <div
          id="toast-simple"
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center w-full max-w-xs p-4 space-x-4 bg-white dark:bg-gray-800"
          role="alert"
        >
          <div className="text-sm font-normal text-gray-500">
            {toastMessage}
          </div>
        </div>
      )}
    </SidebarProvider>
  );
}
