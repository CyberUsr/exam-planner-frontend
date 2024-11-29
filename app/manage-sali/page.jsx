/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import {
  getAllSali,
  createSala,
  updateSala,
  deleteSala,
} from "../services/saliService";
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

const adminNav = [
  {
    title: "Manage Sali",
    url: "/dashboard/admin/sali",
    icon: null,
  },
  {
    title: "Exam Calendar",
    url: "/dashboard/admin/exams",
    icon: null,
  },
  {
    title: "Statistici",
    url: "/dashboard/admin/statistics",
    icon: null,
  },
];

export default function SaliPage() {
  const [sali, setSali] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    id_sala: "",
    nume: "",
    shortName: "",
    buildingName: "",
  });

  const fetchSali = async () => {
    setLoading(true);
    try {
      const data = await getAllSali();
      setSali(data);
    } catch (err) {
      console.error("Error fetching sali:", err);
      setError("Failed to load sali.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSali();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (formData.id_sala) {
        // Update existing sala
        await updateSala(formData.id_sala, formData);
        alert("Sala updated successfully");
      } else {
        // Create new sala
        await createSala(formData);
        alert("Sala created successfully");
      }
      setFormData({ id_sala: "", nume: "", shortName: "", buildingName: "" });
      fetchSali();
    } catch (err) {
      console.error("Error saving sala:", err);
      setError("Failed to save sala. Check console for details.");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this sala?")) {
      try {
        await deleteSala(id);
        alert("Sala deleted successfully");
        fetchSali();
      } catch (err) {
        console.error("Error deleting sala:", err);
        setError("Failed to delete sala.");
      }
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar
        navMain={adminNav}
        user={{
          name: "Admin",
          email: "admin@example.com",
          avatar: "/avatars/admin.jpg",
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
                <BreadcrumbPage>Manage Sali</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <div className="grid gap-6">
            {/* Form Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                {formData.id_sala ? "Edit Sala" : "Add New Sala"}
              </h2>
              {error && <p className="text-red-500">{error}</p>}
              <form
                onSubmit={handleSubmit}
                className="grid gap-4 sm:grid-cols-2"
              >
                <input
                  type="text"
                  name="nume"
                  value={formData.nume}
                  onChange={handleInputChange}
                  placeholder="Sala Name"
                  required
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  name="shortName"
                  value={formData.shortName}
                  onChange={handleInputChange}
                  placeholder="Short Name"
                  required
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  name="buildingName"
                  value={formData.buildingName}
                  onChange={handleInputChange}
                  placeholder="Building Name"
                  required
                  className="border p-2 rounded"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded col-span-full"
                >
                  {formData.id_sala ? "Update Sala" : "Add Sala"}
                </button>
              </form>
            </div>

            {/* Table Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Existing Sali</h2>
              <table className="table-auto w-full border">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Short Name</th>
                    <th className="border px-4 py-2">Building Name</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sali.map((sala) => (
                    <tr
                      key={sala.id_sala}
                      className="even:bg-gray-100 dark:even:bg-gray-700"
                    >
                      <td className="border px-4 py-2">{sala.id_sala}</td>
                      <td className="border px-4 py-2">{sala.nume}</td>
                      <td className="border px-4 py-2">{sala.shortName}</td>
                      <td className="border px-4 py-2">{sala.buildingName}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                          onClick={() => setFormData(sala)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded"
                          onClick={() => handleDelete(sala.id_sala)}
                        >
                          Delete
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
