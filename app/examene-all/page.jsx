/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { filterExams } from "../services/exameneService"; // Import the filterExams function
import { getAllGrupe } from "../services/grupeService"; // Import grupe fetching function
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
    title: "Examene All",
    url: "/dashboard/student/examene-all",
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

export default function ExameneAll() {
  const [grupe, setGrupe] = useState([]);
  const [specializari, setSpecializari] = useState([]);
  const [aniStudiu, setAniStudiu] = useState([]);
  const [filteredGrupe, setFilteredGrupe] = useState([]);
  const [selectedSpecializare, setSelectedSpecializare] = useState("");
  const [selectedAn, setSelectedAn] = useState("");
  const [selectedGrupa, setSelectedGrupa] = useState("");
  const [exams, setExams] = useState([]);

  const weekdayMap = {
    luni: 1,
    marți: 2,
    miercuri: 3,
    joi: 4,
    vineri: 5,
    sâmbătă: 6,
  };

  useEffect(() => {
    const fetchGrupe = async () => {
      try {
        const data = await getAllGrupe();

        // Remove duplicates based on groupName
        const uniqueData = data.filter(
          (grupe, index, self) =>
            index === self.findIndex((g) => g.groupName === grupe.groupName)
        );

        setGrupe(uniqueData);

        const uniqueSpecializari = [
          ...new Set(uniqueData.map((g) => g.specializationShortName)),
        ];
        setSpecializari(uniqueSpecializari);
      } catch (error) {
        console.error("Failed to fetch Grupe:", error);
      }
    };

    fetchGrupe();
  }, []);

  useEffect(() => {
    if (selectedSpecializare) {
      const years = grupe
        .filter((g) => g.specializationShortName === selectedSpecializare)
        .map((g) => g.studyYear);
      setAniStudiu([...new Set(years)]);
    } else {
      setAniStudiu([]);
      setFilteredGrupe([]);
    }
  }, [selectedSpecializare]);

  useEffect(() => {
    if (selectedAn) {
      const groups = grupe.filter(
        (g) =>
          g.specializationShortName === selectedSpecializare &&
          g.studyYear === selectedAn
      );
      setFilteredGrupe(groups);
    } else {
      setFilteredGrupe([]);
    }
  }, [selectedAn]);

  const handleSearch = async () => {
    if (!selectedSpecializare || !selectedAn || !selectedGrupa) {
      alert("Please select specialization, year, and group!");
      return;
    }
    try {
      const data = await filterExams(
        selectedSpecializare,
        selectedAn,
        selectedGrupa
      );
      setExams(data);
    } catch (error) {
      console.error("Failed to fetch exams:", error);
    }
  };

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
                <BreadcrumbPage>Examenele Mele</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <div className="grid gap-6">
            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="specializare" className="block text-sm mb-2">
                    Specializare
                  </label>
                  <select
                    id="specializare"
                    value={selectedSpecializare}
                    onChange={(e) => setSelectedSpecializare(e.target.value)}
                    className="block w-full px-4 py-3 text-sm border rounded-lg"
                  >
                    <option value="" disabled>
                      Select Specializare
                    </option>
                    {specializari.map((specializare, index) => (
                      <option key={index} value={specializare}>
                        {specializare}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="year" className="block text-sm mb-2">
                    Year
                  </label>
                  <select
                    id="year"
                    value={selectedAn}
                    onChange={(e) => setSelectedAn(e.target.value)}
                    disabled={!aniStudiu.length}
                    className="block w-full px-4 py-3 text-sm border rounded-lg"
                  >
                    <option value="" disabled>
                      Select Year
                    </option>
                    {aniStudiu.map((an, index) => (
                      <option key={index} value={an}>
                        Year {an}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="group" className="block text-sm mb-2">
                    Group
                  </label>
                  <select
                    id="group"
                    value={selectedGrupa}
                    onChange={(e) => setSelectedGrupa(e.target.value)}
                    disabled={!filteredGrupe.length}
                    className="block w-full px-4 py-3 text-sm border rounded-lg"
                  >
                    <option value="" disabled>
                      Select Group
                    </option>
                    {filteredGrupe.map((grupa) => (
                      <option key={grupa.id} value={grupa.id}>
                        {grupa.groupName || `Group ${grupa.id}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleSearch}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
              >
                Search
              </button>
            </div>

            {/* Exam Results */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-center mb-6">
                Exam Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exams.map((exam) => (
                  <div
                    key={exam.id_examene}
                    className="p-4 bg-gray-100 rounded-lg shadow"
                  >
                    <h3 className="text-lg font-bold">{exam.nume_materie}</h3>
                    <p>Date: {new Date(exam.data).toLocaleDateString()}</p>
                    <p>Time: {new Date(exam.ora).toLocaleTimeString()}</p>
                    <p>Type: {exam.tip_evaluare}</p>
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
