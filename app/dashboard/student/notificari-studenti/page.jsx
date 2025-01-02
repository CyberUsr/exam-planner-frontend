"use client";

import { useState } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

const studentNav = [
  { title: "My Exams", url: "/dashboard/student/exams" },
  { title: "Notifications", url: "/dashboard/student/notifications" },
];

const hardcodedNotifications = [
  {
    id: 1,
    message: "Your cerere has been approved.",
    category: "Cereri",
    timestamp: "2024-12-09 10:00 AM",
  },
  {
    id: 2,
    message: "Reminder: Your exam is tomorrow at 9:00 AM.",
    category: "Exams",
    timestamp: "2024-12-09 11:00 AM",
  },
  {
    id: 3,
    message: "Notification about new materials uploaded.",
    category: "Updates",
    timestamp: "2024-12-08 08:30 AM",
  },
];

export default function StudentNotificationsPage() {
  const [filter, setFilter] = useState("All");

  const filteredNotifications =
    filter === "All"
      ? hardcodedNotifications
      : hardcodedNotifications.filter((n) => n.category === filter);

  return (
    <SidebarProvider>
      <AppSidebar
        navMain={studentNav}
        user={{
          name: "Student",
          email: "student@example.com",
        }}
      />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 bg-white dark:bg-gray-800 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-xl font-bold">Notifications</h1>
        </header>
        <main className="p-6 bg-gray-100 dark:bg-gray-900">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Student Notifications</h2>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="All">All</option>
              <option value="Cereri">Cereri</option>
              <option value="Exams">Exams</option>
              <option value="Updates">Updates</option>
            </select>
          </div>
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                <p className="text-gray-800 dark:text-gray-200">
                  {notification.message}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {notification.timestamp}
                </p>
              </div>
            ))}
            {filteredNotifications.length === 0 && (
              <p className="text-gray-500">No notifications found.</p>
            )}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
