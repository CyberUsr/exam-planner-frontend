"use client";

import { useEffect, useState } from "react";
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
    icon: null,
  },
  {
    title: "Exam Calendar",
    url: "/dashboard/teacher/exams",
    icon: null,
  },
  {
    title: "Statistici",
    url: "/dashboard/teacher/statistics",
    icon: null,
  },
];

export default function TeacherCereriPage() {
  const [cereri, setCereri] = useState([]);
  const [, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState(""); // State for adding comments
  const [selectedCerereId, setSelectedCerereId] = useState(null); // To track selected cerere for comment
  const [materii, setMaterii] = useState([]); // Store all materii data

  // Fetch all cereri
  const fetchCereri = async () => {
    setLoading(true);
    try {
      const data = await getAllCereri();
      setCereri(data);
    } catch (err) {
      console.error("Error fetching cereri:", err);
      setError("Failed to load cereri.");
    } finally {
      setLoading(false);
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

  // Get materie name by id
  const getMaterieNameById = (idMaterie) => {
    if (!idMaterie) return "Loading...";
    const materie = materii.find((m) => m.id_materie === idMaterie);
    return materie ? materie.nume_materie : "Unknown";
  };

  const handleApprove = async (id) => {
    try {
      await updateCerere(id, { status: "Approved" });
      alert("Cerere approved successfully");
      fetchCereri();
    } catch (err) {
      console.error("Error approving cerere:", err);
      setError("Failed to approve cerere.");
    }
  };

  const handleReject = async (id) => {
    try {
      await updateCerere(id, { status: "Rejected" });
      alert("Cerere rejected successfully");
      fetchCereri();
    } catch (err) {
      console.error("Error rejecting cerere:", err);
      setError("Failed to reject cerere.");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await updateCerere(selectedCerereId, { comment });
      alert("Comment added successfully");
      setComment("");
      setSelectedCerereId(null);
      fetchCereri();
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
                <BreadcrumbPage>Manage Cereri</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <div className="grid gap-6">
            {/* Table Section */}
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
                    <th className="border px-4 py-2">Comment</th>
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
                        {getMaterieNameById(cerere.id_materie)}
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
                      <td className="border px-4 py-2">
                        {cerere.comment || "No comment"}
                      </td>
                      <td className="border px-4 py-2 flex space-x-2">
                        <button
                          onClick={() => handleApprove(cerere.id_cerere)}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(cerere.id_cerere)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => setSelectedCerereId(cerere.id_cerere)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Add Comment
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

      {/* Comment Modal */}
      {selectedCerereId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-1/3">
            <h2 className="text-xl font-bold mb-4">Add Comment</h2>
            <form onSubmit={handleAddComment}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add your comment here..."
                required
                className="w-full border p-2 rounded mb-4"
              ></textarea>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCerereId(null);
                    setComment("");
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SidebarProvider>
  );
}
