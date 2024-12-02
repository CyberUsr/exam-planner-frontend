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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Manage Teachers
            </h1>
          </header>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher) => (
              <Card key={teacher.id_profesor}>
                <CardHeader>
                  <CardTitle>{`${teacher.firstName} ${teacher.lastName}`}</CardTitle>
                  <CardDescription>
                    Department ID: {teacher.idDepartament}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Email: {teacher.emailAddress}</p>
                  <p>Phone: {teacher.phoneNumber}</p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">
                    ID: {teacher.id_profesor}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
