/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getAllExamene } from "../../../api/services/exameneService"; // Import the exams fetching function
import { getAllMaterii } from "../../../api/services/materiiService";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

const studentNav = [
  {
    title: "Examenele Mele",
    url: "/dashboard/student/examenele-mele",
    icon: null,
  },
  {
    title: "Examene pe Dificultate",
    url: "/dashboard/student/examene-dificultate",
    icon: null,
  },
  {
    title: "Cereri",
    url: "/dashboard/student/cereri",
    icon: null,
  },
  {
    title: "Setari",
    url: "/dashboard/student/settings",
    icon: null,
  },
];

export default function ExameneDificultate() {
  const [exams, setExams] = useState([]);
  const [groupedExams, setGroupedExams] = useState({});
  const [materii, setMaterii] = useState([]); // Store all materii data

  const getMaterieNameById = (idMaterie) => {
    if (!idMaterie) return "Loading...";
    const materie = materii.find((m) => m.id_materie === idMaterie);
    return materie ? materie.nume_materie : "Unknown";
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

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const data = await getAllExamene();

        // Group exams by difficulty
        const grouped = data.reduce((acc, exam) => {
          const difficulty = exam.difficulty || "Unknown"; // Use "Unknown" if difficulty is not set
          if (!acc[difficulty]) {
            acc[difficulty] = [];
          }
          acc[difficulty].push(exam);
          return acc;
        }, {});

        setExams(data);
        setGroupedExams(grouped);
      } catch (error) {
        console.error("Failed to fetch exams:", error);
      }
    };

    fetchExams();
    fetchMaterii();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar
        navMain={studentNav}
        user={{
          name: "Student",
          email: "student@example.com",
          avatar: "/avatars/student.jpg",
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
                <BreadcrumbPage>Examene pe Dificultate</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <div className="grid gap-6">
            {/* Exams by Difficulty */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-center mb-6">
                Examene pe Dificultate
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(groupedExams).map((difficulty) => (
                  <div
                    key={difficulty}
                    className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-bold text-center mb-4">
                      {difficulty}
                    </h3>
                    <ul className="space-y-2">
                      {groupedExams[difficulty].map((exam) => (
                        <li
                          key={exam.id_examene}
                          className="p-2 bg-blue-500 text-white rounded shadow"
                        >
                          <p className="font-semibold">{getMaterieNameById(exam.id_materie)}</p>
                          <p>
                            Date:{" "}
                            {new Date(exam.data).toLocaleDateString("ro-RO")}
                          </p>
                          <p>
                            Time:{" "}
                            {new Date(exam.ora).toLocaleTimeString("ro-RO")}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
