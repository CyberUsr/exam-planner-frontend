/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { getAllProfesori } from "../services/profesoriService";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getAllProfesori();
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            Manage Teachers
          </h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher) => (
              <div
                key={teacher.id_profesor}
                className="p-4 border rounded-md bg-white dark:bg-gray-800"
              >
                <h2 className="text-xl font-bold">{`${teacher.firstName} ${teacher.lastName}`}</h2>
                <p>Email: {teacher.emailAddress}</p>
                <p>Phone: {teacher.phoneNumber}</p>
                <p>Department ID: {teacher.idDepartament}</p>
              </div>
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
