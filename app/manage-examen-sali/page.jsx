"use client";

import { useEffect, useState } from "react";
import {
  getAllExameneSali,
  createExameneSali,
  updateExameneSali,
  deleteExameneSali,
} from "../services/exameneSaliService";
import { getAllExamene } from "../services/exameneService";
import { getAllSali } from "../services/saliService";
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
    title: "Manage Examene Sali",
    url: "/dashboard/admin/examene-sali",
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

export default function ExameneSaliManager() {
  const [exameneSali, setExameneSali] = useState([]);
  const [examene, setExamene] = useState([]);
  const [sali, setSali] = useState([]);
  const [formData, setFormData] = useState({
    id_examene_sali: "",
    id_examene: "",
    id_sala: "",
  });

  const fetchData = async () => {
    try {
      const [exameneSaliData, exameneData, saliData] = await Promise.all([
        getAllExameneSali(),
        getAllExamene(),
        getAllSali(),
      ]);
      setExameneSali(exameneSaliData);
      setExamene(exameneData);
      setSali(saliData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id_examene_sali) {
        await updateExameneSali(formData.id_examene_sali, formData);
        alert("Record updated successfully!");
      } else {
        await createExameneSali(formData);
        alert("Record created successfully!");
      }
      setFormData({ id_examene_sali: "", id_examene: "", id_sala: "" });
      fetchData();
    } catch (error) {
      console.error("Error saving ExameneSali record:", error);
    }
  };

  const handleDelete = async (id_examene_sali) => {
    try {
      await deleteExameneSali(id_examene_sali);
      alert("Record deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("Error deleting ExameneSali record:", error);
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
                <BreadcrumbPage>Manage Examene Sali</BreadcrumbPage>
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
                {formData.id_examene_sali
                  ? "Edit Examene Sala"
                  : "Add New Record"}
              </h2>
              <form
                onSubmit={handleSubmit}
                className="grid sm:grid-cols-2 gap-4"
              >
                <select
                  name="id_examene"
                  value={formData.id_examene}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded"
                >
                  <option value="" disabled>
                    Select Examene
                  </option>
                  {examene.map((exam) => (
                    <option key={exam.id_examene} value={exam.id_examene}>
                      {exam.nume_materie}
                    </option>
                  ))}
                </select>
                <select
                  name="id_sala"
                  value={formData.id_sala}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded"
                >
                  <option value="" disabled>
                    Select Sala
                  </option>
                  {sali.map((sala) => (
                    <option key={sala.id_sala} value={sala.id_sala}>
                      {sala.nume} ({sala.buildingName})
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded col-span-full"
                >
                  {formData.id_examene_sali ? "Update Record" : "Create Record"}
                </button>
              </form>
            </div>

            {/* Table Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Existing Records</h2>
              <table className="table-auto w-full border">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Examene</th>
                    <th className="border px-4 py-2">Sala</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exameneSali.map((record) => (
                    <tr
                      key={record.id_examene_sali}
                      className="even:bg-gray-100 dark:even:bg-gray-700"
                    >
                      <td className="border px-4 py-2">
                        {record.id_examene_sali}
                      </td>
                      <td className="border px-4 py-2">
                        {examene.find((e) => e.id_examene === record.id_examene)
                          ?.nume_materie || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {sali.find((s) => s.id_sala === record.id_sala)?.nume ||
                          "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => setFormData(record)}
                          className="mr-2 px-2 py-1 bg-green-500 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(record.id_examene_sali)}
                          className="px-2 py-1 bg-red-500 text-white rounded"
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
