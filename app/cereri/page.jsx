/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import {
  getAllCereri,
  deleteCerere,
  createCerere,
} from "../services/cereriService";
import { getAllExameneSali } from "../services/exameneSaliService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const adminNav = [
  {
    title: "Cereri",
    url: "/dashboard/admin/cereri",
    icon: null,
  },
  {
    title: "Exam Calendar",
    url: "/dashboard/admin/exams",
    icon: null,
  },
];

export default function CereriPage() {
  const [cereri, setCereri] = useState([]);
  const [exameneSali, setExameneSali] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCerere, setNewCerere] = useState({
    id_user: "",
    id_examene_sali: "",
    data: "",
    ora: "",
  });
  const [cerereToDelete, setCerereToDelete] = useState(null);

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

  const fetchExameneSali = async () => {
    try {
      const data = await getAllExameneSali();
      setExameneSali(data);
    } catch (err) {
      console.error("Error fetching Examene Sali:", err);
      setError("Failed to load Examene Sali.");
    }
  };

  const handleDelete = async () => {
    if (cerereToDelete) {
      try {
        await deleteCerere(cerereToDelete);
        setCerereToDelete(null);
        fetchCereri();
      } catch (err) {
        console.error("Error deleting cerere:", err);
        setError("Failed to delete cerere.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCerere((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const formattedCerere = {
        ...newCerere,
        data: new Date(`${newCerere.data}T${newCerere.ora}`).toISOString(),
        ora: new Date(`${newCerere.data}T${newCerere.ora}`).toISOString(),
      };

      await createCerere(formattedCerere);
      setNewCerere({
        id_user: "",
        id_examene_sali: "",
        data: "",
        ora: "",
      });
      fetchCereri();
    } catch (err) {
      console.error("Error creating cerere:", err);
      setError("Failed to create cerere.");
    }
  };

  useEffect(() => {
    fetchCereri();
    fetchExameneSali();
  }, []);

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
                <BreadcrumbPage>Cereri</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <div className="grid gap-6">
            {/* Form Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Create New Cerere</h2>
              {error && <p className="text-red-500">{error}</p>}
              <form
                onSubmit={handleCreate}
                className="grid md:grid-cols-4 gap-4"
              >
                <input
                  type="text"
                  name="id_user"
                  value={newCerere.id_user}
                  onChange={handleInputChange}
                  placeholder="User ID"
                  required
                  className="border p-2 rounded col-span-2"
                />
                <select
                  name="id_examene_sali"
                  value={newCerere.id_examene_sali}
                  onChange={handleInputChange}
                  required
                  className="border p-2 rounded col-span-2"
                >
                  <option value="" disabled>
                    Select Examen Sala
                  </option>
                  {exameneSali.map((examenSala) => (
                    <option
                      key={examenSala.id_examene_sali}
                      value={examenSala.id_examene_sali}
                    >
                      {`${examenSala.examene?.nume_materie} - ${examenSala.sala?.nume}`}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  name="data"
                  value={newCerere.data}
                  onChange={handleInputChange}
                  required
                  className="border p-2 rounded"
                />
                <input
                  type="time"
                  name="ora"
                  value={newCerere.ora}
                  onChange={handleInputChange}
                  required
                  className="border p-2 rounded"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded col-span-4"
                >
                  Create Cerere
                </button>
              </form>
            </div>

            {/* Table Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Existing Cereri</h2>
              <table className="table-auto w-full border">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">User ID</th>
                    <th className="border px-4 py-2">Examen Sala ID</th>
                    <th className="border px-4 py-2">Data</th>
                    <th className="border px-4 py-2">Ora</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cereri.map((cerere) => (
                    <tr
                      key={cerere.id_cerere}
                      className="even:bg-gray-100 dark:even:bg-gray-700"
                    >
                      <td className="border px-4 py-2">{cerere.id_cerere}</td>
                      <td className="border px-4 py-2">{cerere.id_user}</td>
                      <td className="border px-4 py-2">
                        {cerere.id_examene_sali}
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(cerere.data).toLocaleDateString()}
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(cerere.ora).toLocaleTimeString()}
                      </td>
                      <td className="border px-4 py-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="bg-red-500 text-white px-4 py-2 rounded"
                              onClick={() =>
                                setCerereToDelete(cerere.id_cerere)
                              }
                            >
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDelete}>
                                Confirm
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
