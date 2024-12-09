/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { getAllCereri, createCerere } from "../services/cereriService";
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
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const studentNav = [
  { title: "Examene", url: "/dashboard/student/exams" },
  { title: "Cereri", url: "/dashboard/student/cereri" },
  { title: "Settings", url: "/dashboard/student/settings" },
];

export default function StudentCereriPage() {
  const [materii, setMaterii] = useState([]);
  const [newCerere, setNewCerere] = useState({
    id_user: "", // Student ID (will be populated dynamically)
    id_materie: "",
    data: "",
    ora: "",
  });
  const [error, setError] = useState(null);

  const fetchMaterii = async () => {
    try {
      const data = await getAllMaterii(); // Fetch Materii based on user's group
      setMaterii(data);
    } catch (err) {
      console.error("Error fetching Materii:", err);
    }
  };

  const handleCreateCerere = async (e) => {
    e.preventDefault();
    try {
      await createCerere(newCerere);
      setNewCerere({ id_user: "", id_materie: "", data: "", ora: "" });
      alert("Cerere created successfully!");
    } catch (err) {
      console.error("Error creating cerere:", err);
      setError("Failed to create cerere.");
    }
  };

  useEffect(() => {
    fetchMaterii();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar
        navMain={studentNav}
        user={{ name: "Student", email: "student@example.com" }}
      />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 bg-white dark:bg-gray-800 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Cereri</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="p-6 bg-gray-100 dark:bg-gray-900">
          <div className="grid gap-6">
            <form
              onSubmit={handleCreateCerere}
              className="bg-white rounded-lg p-6 shadow"
            >
              <h2 className="text-lg font-semibold mb-4">Create Cerere</h2>
              {error && <p className="text-red-500">{error}</p>}
              <div className="grid gap-4">
                <select
                  name="id_materie"
                  value={newCerere.id_materie}
                  onChange={(e) =>
                    setNewCerere({ ...newCerere, id_materie: e.target.value })
                  }
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Materie</option>
                  {materii.map((materie) => (
                    <option key={materie.id_materie} value={materie.id_materie}>
                      {materie.nume_materie}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  name="data"
                  value={newCerere.data}
                  onChange={(e) =>
                    setNewCerere({ ...newCerere, data: e.target.value })
                  }
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  type="time"
                  name="ora"
                  value={newCerere.ora}
                  onChange={(e) =>
                    setNewCerere({ ...newCerere, ora: e.target.value })
                  }
                  required
                  className="w-full p-2 border rounded"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Submit Cerere
                </button>
              </div>
            </form>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
