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

const teacherNav = [
  {
    title: "Create Chestionar",
    url: "/dashboard/teacher/create-chestionar",
    icon: null,
  },
  {
    title: "Manage Cereri",
    url: "/dashboard/teacher/cereri",
    icon: null,
  },
  {
    title: "Notifications",
    url: "/dashboard/teacher/notifications",
    icon: null,
  },
];

const CreateChestionar = () => {
  const [chestionarData, setChestionarData] = useState({
    professor: "",
    subject: "",
    dates: ["", "", ""],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChestionarData({ ...chestionarData, [name]: value });
  };

  const handleDateChange = (index, value) => {
    const updatedDates = [...chestionarData.dates];
    updatedDates[index] = value;
    setChestionarData({ ...chestionarData, dates: updatedDates });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Chestionar creat cu succes!");
    console.log("Chestionar Data:", chestionarData);
    setChestionarData({
      professor: "",
      subject: "",
      dates: ["", "", ""],
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar
        navMain={teacherNav}
        user={{
          name: "Teacher",
          email: "teacher@example.com",
          avatar: "/avatars/teacher.jpg",
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
                <BreadcrumbPage>Create Chestionar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <div className="grid gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
                Creează un Chestionar Nou
              </h1>
              <form
                onSubmit={handleSubmit}
                className="grid gap-4 sm:grid-cols-2"
              >
                {/* Subject */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Materie
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={chestionarData.subject}
                    onChange={handleInputChange}
                    placeholder="Ex: Metode Numerice"
                    className="mt-1 block w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Professor */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="professor"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Profesor
                  </label>
                  <input
                    type="text"
                    id="professor"
                    name="professor"
                    value={chestionarData.professor}
                    onChange={handleInputChange}
                    placeholder="Ex: George Mahalu"
                    className="mt-1 block w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Available Dates */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date disponibile
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {chestionarData.dates.map((date, index) => (
                      <input
                        key={index}
                        type="date"
                        value={date}
                        onChange={(e) =>
                          handleDateChange(index, e.target.value)
                        }
                        className="mt-1 block w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Creează Chestionar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default CreateChestionar;
