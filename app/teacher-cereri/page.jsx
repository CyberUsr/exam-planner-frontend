"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { getAllCereri, updateCerere } from "../services/cereriService";
import { getAllMaterii } from "../services/materiiService";
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
    title: "Manage Cereri",
    url: "/dashboard/teacher/cereri",
  },
  {
    title: "Exam Calendar",
    url: "/dashboard/teacher/exams",
  },
  {
    title: "Statistics",
    url: "/dashboard/teacher/statistics",
  },
];

export default function TeacherCereriPage() {
  const [cereri, setCereri] = useState([]);
  const [materii, setMaterii] = useState([]); // Cache for all materii
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch all cereri
  const fetchCereri = async () => {
    try {
      const data = await getAllCereri();
      setCereri(data);
    } catch (err) {
      console.error("Error fetching cereri:", err);
      setError("Failed to load cereri.");
    }
  };

  // Fetch all materii and cache them
  const fetchMaterii = async () => {
    try {
      const data = await getAllMaterii();
      setMaterii(data);
    } catch (err) {
      console.error("Error fetching materii:", err);
      setError("Failed to load materii.");
    }
  };

  // Handle approve action
  const handleApprove = async (cerere) => {
    try {
      await updateCerere(cerere.id_cerere, { status: "Approved" });
      alert("Cerere approved successfully");

      // Redirect to Schedule Exam with cerere data
      router.push(
        `/adaugare-examene?id_cerere=${cerere.id_cerere}&id_materie=${cerere.id_materie}&data=${cerere.data}&ora=${cerere.ora}`
      );
    } catch (err) {
      console.error("Error approving cerere:", err);
      setError("Failed to approve cerere.");
    }
  };

  // Handle reject action
  const handleReject = async (cerere) => {
    try {
      await updateCerere(cerere.id_cerere, { status: "Rejected" });
      alert("Cerere rejected successfully");
      fetchCereri(); // Refresh the list
    } catch (err) {
      console.error("Error rejecting cerere:", err);
      setError("Failed to reject cerere.");
    }
  };

  // Handle comment action
  const handleComment = async (cerere) => {
    try {
      const comment = prompt("Enter your comment:");
      if (comment) {
        await updateCerere(cerere.id_cerere, { comment });
        alert("Comment added successfully");
        fetchCereri(); // Refresh the list
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to add comment.");
    }
  };

  useEffect(() => {
    fetchCereri();
    fetchMaterii();
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
        <header className="flex h-16 shrink-0 items-center gap-2 bg-white dark:bg-gray-800 px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Manage Cereri</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <div className="grid gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Manage Cereri</h2>
              {error && <p className="text-red-500">{error}</p>}
              <table className="table-auto w-full border">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    <th className="border px-4 py-2">Materie</th>
                    <th className="border px-4 py-2">Data</th>
                    <th className="border px-4 py-2">Ora</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cereri.map((cerere) => (
                    <tr
                      key={cerere.id_cerere}
                      className="even:bg-gray-100 dark:even:bg-gray-700"
                    >
                      <td className="border px-4 py-2">
                        {materii.find((m) => m.id_materie === cerere.id_materie)
                          ?.nume_materie || "Unknown"}
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(cerere.data).toLocaleDateString()}
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(cerere.ora).toLocaleTimeString()}
                      </td>
                      <td className="border px-4 py-2">
                        {cerere.status || "Pending"}
                      </td>
                      <td className="border px-4 py-2 flex gap-2">
                        <button
                          onClick={() => handleApprove(cerere)}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                          Approve & Schedule
                        </button>
                        <button
                          onClick={() => handleReject(cerere)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleComment(cerere)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Comment
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
