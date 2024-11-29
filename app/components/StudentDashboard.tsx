"use client";

import React from "react";
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

const studentNav = [
  {
    title: "Exam Schedule",
    url: "/dashboard/student/exams",
    icon: null,
  },
  {
    title: "Pending Requests",
    url: "/dashboard/student/requests",
    icon: null,
  },
  {
    title: "Notifications",
    url: "/dashboard/student/notifications",
    icon: null,
  },
];

const StudentDashboard = () => {
  return (
    <SidebarProvider>
      <AppSidebar
        navMain={studentNav}
        user={{
          name: "Student",
          email: "student@example.com",
          avatar: "/avatars/student.jpg",
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
                <BreadcrumbPage>Student</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <div className="grid gap-6">
            {/* Content Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Your Upcoming Exams
              </h2>
              <ul>
                <li className="mb-3">
                  <strong>Numerical Methods</strong> - 2024-12-01 at 10:00 AM
                </li>
                <li className="mb-3">
                  <strong>Physics</strong> - 2024-12-07 at 2:00 PM
                </li>
                <li className="mb-3">
                  <strong>Programming Technologies</strong> - 2024-12-21 at 1:00
                  PM
                </li>
              </ul>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default StudentDashboard;
