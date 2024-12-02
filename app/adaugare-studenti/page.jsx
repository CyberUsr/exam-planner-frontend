/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createStudent } from "../services/studentiService";
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

const secretariatNav = [
  {
    title: "Manage Students",
    url: "/dashboard/secretariat/manage-students",
    icon: null,
  },
  {
    title: "Create Student",
    url: "/dashboard/secretariat/create-student",
    icon: null,
  },
];

export default function CreateStudent() {
  const [formData, setFormData] = useState({
    id_student: "",
    grupa: "",
    anul: "",
    nume: "",
    prenume: "",
    specializare: "",
  });

  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert `anul` to an integer
      const formattedData = {
        ...formData,
        anul: parseInt(formData.anul, 10),
      };

      await createStudent(formattedData);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        router.push("/dashboard/secretariat/manage-students");
      }, 3000);
    } catch (error) {
      console.error("Failed to create student:", error);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar navMain={secretariatNav} />
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
                <BreadcrumbPage>Create Student</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            Create a New Student
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="id_student"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Student ID
              </label>
              <input
                type="text"
                id="id_student"
                name="id_student"
                value={formData.id_student}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="grupa"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Group
              </label>
              <input
                type="text"
                id="grupa"
                name="grupa"
                value={formData.grupa}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="anul"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Year
              </label>
              <input
                type="number"
                id="anul"
                name="anul"
                value={formData.anul}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="nume"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Last Name
              </label>
              <input
                type="text"
                id="nume"
                name="nume"
                value={formData.nume}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="prenume"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                First Name
              </label>
              <input
                type="text"
                id="prenume"
                name="prenume"
                value={formData.prenume}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="specializare"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Specialization
              </label>
              <input
                type="text"
                id="specializare"
                name="specializare"
                value={formData.specializare}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
              >
                Create Student
              </button>
            </div>
          </form>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
