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

const ProfessorDashboard = () => {
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
                <BreadcrumbPage>Professor</BreadcrumbPage>
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
                Professor Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Use the sidebar to navigate to your tools and features.
              </p>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProfessorDashboard;
