"use client";


import Link from "next/link";
import Navbar from "./Navbar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useEffect, useState } from "react";
import { getAllProfesori } from "../services/profesoriService";
import { getAllExamene } from "../services/exameneService";
import { ChevronsUpDown, Check } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

interface Professor {
  id_profesor: string;
  nume: string;
  prenume: string;
}

interface Exam {
  id_examene: string;
  nume_materie: string;
  data: string; // ISO string date
  ora: string; // ISO string date
  tip_evaluare: string;
  actualizatDe: string;
}
import React from "react";
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

const ProfessorDashboard = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [filteredProfessors, setFilteredProfessors] = useState<Professor[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedProfessor, setSelectedProfessor] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>(""); // For searching professors
  const weeks = ["Săptămâna 1", "Săptămâna 2", "Săptămâna 3"];
  const [selectedWeek, setSelectedWeek] = useState<string>("Săptămâna 1");

  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleString()
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const data = await getAllProfesori();
        setProfessors(data);
        setFilteredProfessors(data); // Initialize filtered list
      } catch (error) {
        console.error("Error fetching professors:", error);
      }
    };

    const fetchExams = async () => {
      try {
        const data = await getAllExamene();
        setExams(data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchProfessors();
    fetchExams();
  }, []);

  const weekdayMap = {
    luni: 1,
    marți: 2,
    miercuri: 3,
    joi: 4,
    vineri: 5,
    sâmbătă: 6,
  } as const;

  const getExamsForSlot = (day: keyof typeof weekdayMap, timeSlot: string) => {
    return exams.filter((exam) => {
      const examDate = new Date(exam.data);
      const examDay = examDate.getDay();
      const examTime = `${examDate.getHours()}-${examDate.getHours() + 2}`;

      return examDay === weekdayMap[day] && examTime === timeSlot;
    });
  };
  const exportCalendarAsPDF = async () => {
    const calendarElement = document.getElementById("calendar"); // Make sure to set this ID in your calendar container

    if (!calendarElement) return;

    try {
      const canvas = await html2canvas(calendarElement, {
        scale: 2, // Improves the quality of the canvas
        useCORS: true, // Handles external resources
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("landscape", "mm", "a4");
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      let yOffset = 10; // Space for title and date
      pdf.text("Calendar Saptamanal", 10, yOffset);
      pdf.text(`Exportat la: ${new Date().toLocaleString()}`, 10, yOffset + 10);

      if (pdfHeight > pdf.internal.pageSize.getHeight() - 30) {
        pdf.addPage();
      }
      pdf.addImage(imgData, "PNG", 0, yOffset + 20, pdfWidth, pdfHeight);

      pdf.save("calendar-saptamanal.pdf");
    } catch (error) {
      console.error("Failed to export calendar as PDF:", error);
    }
  };
  const exportCalendarAsCSV = () => {
    const csvHeader = ["Data", "Ora", "Materie", "Tip Evaluare"].join(",");
    const csvRows = exams.map((exam) => {
      const date = new Date(exam.data).toLocaleDateString();
      const time = new Date(exam.data).toLocaleTimeString();
      return [date, time, exam.nume_materie, exam.tip_evaluare].join(",");
    });

    const csvContent = [csvHeader, ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "calendar-saptamanal.csv";
    link.click();

    URL.revokeObjectURL(url);
  };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 flex flex-col lg:flex-row justify-between items-center gap-4">
  {/* Left Section: Dashboard Title */}
  <div className="flex items-center gap-4 w-full lg:w-auto">
    <h1 className="text-2xl font-bold">Professor Dashboard</h1>
  </div>

  {/* Center Section: Week Selector (Optional Example) */}
  <div className="w-full lg:w-auto lg:ml-auto">
    <label htmlFor="week" className="block text-sm font-medium text-white mb-2">
      Select Week
    </label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded="true"
          className="w-full max-w-sm justify-between bg-white text-green-600"
        >
          {selectedWeek || "Select a week..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-sm p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No weeks found.</CommandEmpty>
            {weeks.map((week, index) => (
              <CommandItem
                key={index}
                onSelect={() => setSelectedWeek(week)}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${
                    selectedWeek === week ? "opacity-100" : "opacity-0"
                  }`}
                />
                {week}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>

 {/* Add current date and time */}
 <div className="text-right lg:text-left">
    <span className="text-sm">
      Welcome, <strong>Professor</strong>
    </span>
    <br />
          <span className="text-xs">
            {`Current Date & Time: ${currentTime}`}
          </span>
  </div>
</header>

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
                <BreadcrumbPage>Professor</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

      {/* Sidebar */}
      <div className="flex flex-col md:flex-row">
        <nav className="bg-white dark:bg-gray-800 w-full md:w-1/4 p-4 space-y-4">
        <Link
            href="/adaugare-examene"
            className="block px-4 py-2 text-green-600 hover:bg-green-100 dark:hover:bg-gray-700 dark:text-gray-200 rounded"
            >
            Adaugă examen
          </Link>
          <Link
            href="/manage-examen-sali"
            className="block px-4 py-2 text-green-600 hover:bg-green-100 dark:hover:bg-gray-700 dark:text-gray-200 rounded"
            >
            Manage Examen Sali
          </Link>
          <Link
            href="/teacher-cereri"
            className="block px-4 py-2 text-green-600 hover:bg-green-100 dark:hover:bg-gray-700 dark:text-gray-200 rounded"
            >
            Manage Cereri
          </Link>
          <Link
            href="/dashboard/student/notifications"
            className="block px-4 py-2 text-green-600 hover:bg-green-100 dark:hover:bg-gray-700 dark:text-gray-200 rounded"
            >
           
            Notifications
          </Link>
          <button
            onClick={exportCalendarAsPDF}
            className="block px-4 py-2 text-green-600 hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-gray-200 rounded"
          >
            Export Calendar as PDF
          </button>
          <button
            onClick={exportCalendarAsCSV}
            className="block px-4 py-2 text-green-600 hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-gray-200 rounded"
          >
            Export Calendar as CSV
          </button>
          
        </nav>

        {/* Content */}
        <main className="flex-1 p-4">
        <section
         id="calendar" 
        className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
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
                            {getExamsForSlot(
                              day as keyof typeof weekdayMap,
                              timeSlot
                            ).map((exam) => (
                              <Link
                                key={exam.id_examene}
                                href={`/examene/${exam.id_examene}`}
                                className="block p-2 bg-green-500 text-white rounded mb-2"
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
        {/* Main Content */}
        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <div className="grid gap-6">
            {/* Content Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Professor Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Use the sidebar to navigate to your tools and features.
              </p>
            </div>
          </div>
        </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProfessorDashboard;
