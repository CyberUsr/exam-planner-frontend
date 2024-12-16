"use client";

import { useEffect, useState } from "react";
import { getAllExams } from "../services/exameneService";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const teacherNav = [
  { title: "Manage Cereri", url: "/dashboard/teacher/cereri" },
  { title: "Pending Exams", url: "/dashboard/teacher/pending-exams" },
  { title: "Notifications", url: "/dashboard/teacher/notifications" },
];

export default function PendingExamsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendingExams = async () => {
    setLoading(true);
    try {
      const data = await getAllExams(); // Assume getAllExams fetches all exams
      const pendingExams = data.filter((exam) => exam.status === "Pending");
      setExams(pendingExams);
    } catch (err) {
      console.error("Error fetching exams:", err);
      setError("Failed to load exams.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingExams();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar
        navMain={teacherNav}
        user={{
          name: "Teacher",
          email: "teacher@example.com",
        }}
      />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 bg-white dark:bg-gray-800 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Pending Exams</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="p-6 bg-gray-100 dark:bg-gray-900">
          <h1 className="text-xl font-bold mb-4">Pending Exams</h1>
          {error && <p className="text-red-500">{error}</p>}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="table-auto w-full border">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="border px-4 py-2">Exam ID</th>
                  <th className="border px-4 py-2">Subject</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr key={exam.id_exam}>
                    <td className="border px-4 py-2">{exam.id_exam}</td>
                    <td className="border px-4 py-2">{exam.subject}</td>
                    <td className="border px-4 py-2">
                      {new Date(exam.date).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">{exam.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
