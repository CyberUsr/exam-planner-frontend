/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import {
  getAllExameneSali,
  createExameneSali,
  updateExameneSali,
  deleteExameneSali,
} from "../api/services/exameneSaliService";
import { getAllExamene } from "../api/services/exameneService";
import { getAllSali } from "../api/services/saliService";
import { getAllMaterii } from "../api/services/materiiService";
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

export default function ManageExams() {
  const [exameneSali, setExameneSali] = useState([]);
  const [examene, setExamene] = useState([]);
  const [sali, setSali] = useState([]);
  const [formData, setFormData] = useState({
    id_examene_sali: "",
    id_examene: "",
    id_sala: "",
  });
  const [materii, setMaterii] = useState([]); // Store all materii data


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

  useEffect(() => {
    const fetchData = async () => {
      const [exameneSaliData, exameneData, saliData] = await Promise.all([
        getAllExameneSali(),
        getAllExamene(),
        getAllSali(),
      ]);
      setExameneSali(exameneSaliData);
      setExamene(exameneData);
      setSali(saliData);
    };
    

    fetchData();
    fetchMaterii();
  }, []);

  const getMaterieNameById = (idMaterie) => {
    if (!idMaterie) return "Loading...";
    const materie = materii.find((m) => m.id_materie === idMaterie);
    return materie ? materie.nume_materie : "Unknown";
  };
  const getMaterieNameFromExamen = (idExamen) => {
    if (!idExamen) return "Loading...";
    const examen = examene.find((e) => e.id_examene === idExamen);
    if (!examen) return "Exam Not Found";
  
    const materie = materii.find((m) => m.id_materie === examen.id_materie);
    return materie ? materie.nume_materie : "Materie Not Found";
  };
  
  const getSalaNameById = (idSala) => {
    if (!idSala) return "Loading...";
    const sala =sali.find((s) => s.id_sala === idSala);
    return sala ? sala.nume : "Unknown";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id_examene_sali) {
      await updateExameneSali(formData.id_examene_sali, formData);
    } else {
      await createExameneSali(formData);
    }
    setFormData({ id_examene_sali: "", id_examene: "", id_sala: "" });
  };

  const handleDelete = async (id) => {
    await deleteExameneSali(id);
  };

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
                <BreadcrumbPage>Manage Exams</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            Manage Exams
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-md shadow-md"
          >
            <select
              name="id_examene"
              value={formData.id_examene}
              onChange={(e) =>
                setFormData({ ...formData, id_examene: e.target.value })
              }
              className="block w-full p-3 border rounded-md"
            >
              <option value="">Select Exam</option>
              {examene.map((exam) => (
                <option key={exam.id_examene} value={exam.id_examene}>
                  {getMaterieNameById(exam.id_materie)}
                </option>
              ))}
            </select>
            <select
              name="id_sala"
              value={formData.id_sala}
              onChange={(e) =>
                setFormData({ ...formData, id_sala: e.target.value })
              }
              className="block w-full p-3 border rounded-md"
            >
              <option value="">Select Sala</option>
              {sali.map((sala) => (
                <option key={sala.id_sala} value={sala.id_sala}>
                  {sala.nume}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
            >
              {formData.id_examene_sali ? "Update Exam" : "Add Exam"}
            </button>
          </form>

          <table className="w-full mt-6 bg-white dark:bg-gray-800 border border-gray-200 rounded-md shadow-md">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left">Exam</th>
                <th className="p-3 text-left">Sala</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exameneSali.map((record) => (
                <tr
                  key={record.id_examene_sali}
                  className="even:bg-gray-50 dark:even:bg-gray-800"
                >
                  <td className="p-3">{getMaterieNameFromExamen(record.id_examene)}</td>
                  <td className="p-3">{getSalaNameById(record.id_sala)}</td>
                  <td className="p-3">
                    <button
                      onClick={() => setFormData(record)}
                      className="px-3 py-1 bg-green-500 text-white rounded-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(record.id_examene_sali)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
