"use client";

import React, { useEffect, useState } from "react";
import {
  getAllMaterii,
  createMaterie,
  deleteMaterie,
  updateMaterie,
} from "../services/materiiService";
import { getAllGrupe } from "../services/grupeService";
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

const navMain = [
  { title: "Adaugare Examene", url: "/dashboard/admin/adaugare-examene" },
];

export default function ManageMaterii() {
  const [materii, setMaterii] = useState([]);
  const [grupe, setGrupe] = useState([]);
  const [specializari, setSpecializari] = useState([]);
  const [aniStudiu, setAniStudiu] = useState([]);
  const [filteredGrupe, setFilteredGrupe] = useState([]);
  const [formData, setFormData] = useState({
    nume_materie: "",
    specializationShortName: "",
    studyYear: "",
    groupName: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch all necessary data
  const fetchInitialData = async () => {
    try {
      const materiiData = await getAllMaterii();
      const grupeData = await getAllGrupe();

      setMaterii(materiiData);

      // Process unique specializations and years
      const uniqueSpecializari = [
        ...new Set(grupeData.map((g) => g.specializationShortName)),
      ];
      setSpecializari(uniqueSpecializari);

      setGrupe(grupeData);
    } catch (error) {
      console.error("Failed to fetch initial data:", error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Filter years based on selected specialization
  useEffect(() => {
    if (formData.specializationShortName) {
      const years = grupe
        .filter(
          (g) => g.specializationShortName === formData.specializationShortName
        )
        .map((g) => g.studyYear);
      setAniStudiu([...new Set(years)]);
    } else {
      setAniStudiu([]);
      setFilteredGrupe([]);
    }
  }, [formData.specializationShortName]);

  // Filter groups based on selected specialization and year
  useEffect(() => {
    if (formData.specializationShortName && formData.studyYear) {
      const groups = grupe.filter(
        (g) =>
          g.specializationShortName === formData.specializationShortName &&
          g.studyYear === formData.studyYear
      );
      setFilteredGrupe(groups);
    } else {
      setFilteredGrupe([]);
    }
  }, [formData.studyYear]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateMaterie(editId, formData);
        setIsEditing(false);
        setEditId(null);
      } else {
        await createMaterie(formData);
      }
      fetchInitialData();
      setFormData({
        nume_materie: "",
        specializationShortName: "",
        studyYear: "",
        groupName: "",
      });
    } catch (error) {
      console.error("Failed to save materie:", error);
    }
  };

  const handleEdit = (materie) => {
    setIsEditing(true);
    setEditId(materie.id_materie);
    setFormData({
      nume_materie: materie.nume_materie,
      specializationShortName: materie.specializationShortName,
      studyYear: materie.studyYear,
      groupName: materie.groupName,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteMaterie(id);
      fetchInitialData();
    } catch (error) {
      console.error("Failed to delete materie:", error);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar
        navMain={navMain}
        user={{ name: "Admin", email: "admin@example.com" }}
      />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 bg-white dark:bg-gray-800 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Manage Materii</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="p-6 bg-gray-100 dark:bg-gray-900">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Manage Materii
          </h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4"
          >
            <div className="grid grid-cols-4 gap-4">
              <input
                type="text"
                name="nume_materie"
                value={formData.nume_materie}
                onChange={handleInputChange}
                placeholder="Nume Materie"
                className="w-full px-4 py-2 border rounded"
              />
              <select
                name="specializationShortName"
                value={formData.specializationShortName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="">Select Specializare</option>
                {specializari.map((specializare, index) => (
                  <option key={index} value={specializare}>
                    {specializare}
                  </option>
                ))}
              </select>
              <select
                name="studyYear"
                value={formData.studyYear}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
                disabled={!aniStudiu.length}
              >
                <option value="">Select Anul</option>
                {aniStudiu.map((year, index) => (
                  <option key={index} value={year}>
                    Year {year}
                  </option>
                ))}
              </select>
              <select
                name="groupName"
                value={formData.groupName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
                disabled={!filteredGrupe.length}
              >
                <option value="">Select Grupa</option>
                {filteredGrupe.map((grupa, index) => (
                  <option key={index} value={grupa.groupName}>
                    {grupa.groupName || `Group ${index + 1}`}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
            >
              {isEditing ? "Update Materie" : "Add Materie"}
            </button>
          </form>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2">Nume Materie</th>
                  <th className="px-4 py-2">Specializare</th>
                  <th className="px-4 py-2">Anul</th>
                  <th className="px-4 py-2">Grupa</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {materii.map((materie) => (
                  <tr key={materie.id_materie}>
                    <td className="px-4 py-2">{materie.nume_materie}</td>
                    <td className="px-4 py-2">
                      {materie.specializationShortName}
                    </td>
                    <td className="px-4 py-2">{materie.studyYear}</td>
                    <td className="px-4 py-2">{materie.groupName}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(materie)}
                        className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(materie.id_materie)}
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
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
