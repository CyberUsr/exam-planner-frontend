/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { getAllStudenti } from "../services/studentiService";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudenti();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar navMain={[]} />
      <SidebarInset>
        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            Manage Students
          </h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
              <div
                key={student.id_student}
                className="p-4 border rounded-md bg-white dark:bg-gray-800"
              >
                <h2 className="text-xl font-bold">{`${student.prenume} ${student.nume}`}</h2>
                <p>Group: {student.grupa}</p>
                <p>Year: {student.anul}</p>
                <p>Specialization: {student.specializare}</p>
              </div>
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
