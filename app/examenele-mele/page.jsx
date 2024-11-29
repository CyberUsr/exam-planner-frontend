"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getAllGrupe } from "../services/grupeService";
import { getAllExamene } from "../services/exameneService";
import Link from "next/link";
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

export default function ExameneleMele() {
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
        let data = await getAllGrupe();

        // Remove duplicates based on groupName
        data = data.filter(
          (grupe, index, self) =>
            index === self.findIndex((g) => g.groupName === grupe.groupName)
        );

        setGrupe(data);

        const uniqueSpecializari = [
          ...new Set(data.map((g) => g.specializationShortName)),
        ];
        setSpecializari(uniqueSpecializari);
      } catch (error) {
        console.error("Failed to fetch Grupe:", error);
      }
    };

    const fetchExams = async () => {
      try {
        const data = await getAllExamene();
        setExams(data);
      } catch (error) {
        console.error("Failed to fetch exams:", error);
      }
    };

    fetchGrupe();
    fetchExams();
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

  const getExamsForSlot = (day, timeSlot) => {
    return exams.filter((exam) => {
      const examDate = new Date(exam.data);
      const examDay = examDate.getDay();
      const examTime = `${examDate.getHours()}-${examDate.getHours() + 2}`;

      return examDay === weekdayMap[day] && examTime === timeSlot;
    });
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
                {/* Dropdown for Specializare */}
                <div>
                  <label
                    htmlFor="specializare"
                    className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2"
                  >
                    Selectează specializarea
                  </label>
                  <select
                    id="specializare"
                    value={selectedSpecializare}
                    onChange={(e) => setSelectedSpecializare(e.target.value)}
                    className="block w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="" disabled>
                      Alege o specializare
                    </option>
                    {specializari.map((specializare, index) => (
                      <option key={index} value={specializare}>
                        {specializare}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dropdown for An */}
                <div>
                  <label
                    htmlFor="an"
                    className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2"
                  >
                    Selectează anul de studiu
                  </label>
                  <select
                    id="an"
                    value={selectedAn}
                    onChange={(e) => setSelectedAn(e.target.value)}
                    disabled={!aniStudiu.length}
                    className="block w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="" disabled>
                      Alege anul
                    </option>
                    {aniStudiu.map((an, index) => (
                      <option key={index} value={an}>
                        Anul {an}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dropdown for Grupa */}
                <div>
                  <label
                    htmlFor="grupa"
                    className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2"
                  >
                    Selectează grupa
                  </label>
                  <select
                    id="grupa"
                    value={selectedGrupa}
                    onChange={(e) => setSelectedGrupa(e.target.value)}
                    disabled={!filteredGrupe.length}
                    className="block w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="" disabled>
                      Alege grupa
                    </option>
                    {filteredGrupe.map((grupa) => (
                      <option key={grupa.id} value={grupa.id}>
                        {grupa.groupName || `Grupa ${grupa.id}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Weekly Calendar */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
                Calendar săptămânal
              </h2>
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  <table className="w-full text-center border-collapse text-sm sm:text-base">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        <th className="p-3 border border-gray-300 dark:border-gray-600">
                          Ora
                        </th>
                        {Object.keys(weekdayMap).map((day) => (
                          <th
                            key={day}
                            className="p-3 border border-gray-300 dark:border-gray-600"
                          >
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 11 }, (_, i) => {
                        const timeSlot = `${8 + i}-${10 + i}`;
                        return (
                          <tr
                            key={i}
                            className="even:bg-gray-100 dark:even:bg-gray-700"
                          >
                            <td className="p-3 border border-gray-300 dark:border-gray-600">
                              {timeSlot}
                            </td>
                            {Object.keys(weekdayMap).map((day) => (
                              <td
                                key={day}
                                className="p-3 border border-gray-300 dark:border-gray-600"
                              >
                                {getExamsForSlot(day, timeSlot).map((exam) => (
                                  <Link
                                    key={exam.id_examene}
                                    href={`/examene/${exam.id_examene}`}
                                    className="block p-2 bg-blue-500 text-white rounded mb-2"
                                  >
                                    {exam.nume_materie}
                                  </Link>
                                ))}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
