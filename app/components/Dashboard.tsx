/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { getAllProfesori } from "../api/services/profesoriService";
import {
  getAllExamene,
  exportExamsGroupedByDay,
} from "../api/services/exameneService";
import { jsPDF } from "jspdf";
import Papa from "papaparse";
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

interface GroupedExam {
  subject: string;
  time: string;
  professors: string[];
  assistants: string[];
  rooms: { roomName: string; building: string }[];
}

export default function DashboardPage() {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [filteredProfessors, setFilteredProfessors] = useState<Professor[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedProfessor, setSelectedProfessor] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedWeek, setSelectedWeek] = useState<string>("Săptămâna 1");
  const weeks = ["Săptămâna 1", "Săptămâna 2", "Săptămâna 3"];

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const data = await getAllProfesori();
        setProfessors(data);
        setFilteredProfessors(data);
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

  const getExamsForSlot = (
    day: keyof typeof weekdayMap,
    timeSlot: string
  ): Exam[] => {
    return exams.filter((exam) => {
      const examDate = new Date(exam.data);
      const examDay = examDate.getDay();
      const examTime = `${examDate.getHours()}-${examDate.getHours() + 2}`;
      return examDay === weekdayMap[day] && examTime === timeSlot;
    });
  };

  const handleExportAsPDF = async () => {
    try {
      const groupedExams: Record<string, GroupedExam[]> =
        await exportExamsGroupedByDay();
      const doc = new jsPDF();
      doc.setFontSize(12);
      doc.text("Exams Grouped by Day", 10, 10);

      Object.keys(groupedExams).forEach((date, index) => {
        doc.text(`Date: ${date}`, 10, 20 + index * 10);
        groupedExams[date].forEach((exam, examIndex) => {
          doc.text(
            `- ${exam.subject} (${
              exam.time
            }) - Professors: ${exam.professors.join(", ")}`,
            10,
            30 + index * 10 + examIndex * 5
          );
        });
      });

      doc.save("exams_grouped_by_day.pdf");
    } catch (error) {
      console.error("Failed to export as PDF:", error);
    }
  };

  const handleExportAsCSV = async () => {
    try {
      const groupedExams: Record<string, GroupedExam[]> =
        await exportExamsGroupedByDay();
      const rows: Record<string, string>[] = [];

      Object.keys(groupedExams).forEach((date) => {
        groupedExams[date].forEach((exam) => {
          rows.push({
            Date: date,
            Subject: exam.subject,
            Time: exam.time,
            Professors: exam.professors.join(", "),
            Assistants: exam.assistants.join(", "),
            Rooms: exam.rooms.map((room) => room.roomName).join(", "),
          });
        });
      });

      const csv = Papa.unparse(rows);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "exams_grouped_by_day.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to export as CSV:", error);
    }
  };

  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
          <main className="p-4 sm:p-6 md:p-10 grid gap-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Calendar săptămânal</h2>
              <div className="flex gap-4">
                <button
                  onClick={handleExportAsPDF}
                  className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                >
                  Export as PDF
                </button>
                <button
                  onClick={handleExportAsCSV}
                  className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
                >
                  Export as CSV
                </button>
              </div>
            </div>

            <section className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
              <div className="overflow-x-auto">
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
            </section>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
