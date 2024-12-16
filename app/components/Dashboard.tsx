/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { getAllMaterii } from "../services/materiiService";
import { getAllExamene } from "../services/exameneService";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";

interface Materie {
  id_materie: string;
  nume_materie: string;
}

interface Exam {
  id_examene: string;
  id_materie: string;
  data: string; // ISO string date
  ora: string; // ISO string date
  tip_evaluare: string;
  actualizatDe: string;
}

export default function DashboardPage() {
  const [materii, setMaterii] = useState<Materie[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);

  const weekdayMap = {
    luni: 1,
    marți: 2,
    miercuri: 3,
    joi: 4,
    vineri: 5,
    sâmbătă: 6,
  } as const;

  useEffect(() => {
    const fetchMaterii = async () => {
      try {
        const data = await getAllMaterii();
        setMaterii(data);
      } catch (error) {
        console.error("Error fetching materii:", error);
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

    fetchMaterii();
    fetchExams();
  }, []);

  const getMaterieNameById = (idMaterie: string): string => {
    const materie = materii.find((m) => m.id_materie === idMaterie);
    return materie ? materie.nume_materie : "Unknown Materie";
  };

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

  const handleExportAsCSV = () => {
    const rows: { Day: string; Time: string; Subject: string; Date: string }[] =
      [];

    for (const day in weekdayMap) {
      Array.from({ length: 11 }, (_, i) => {
        const timeSlot = `${8 + i}-${10 + i}`;
        const examsForSlot = getExamsForSlot(
          day as keyof typeof weekdayMap,
          timeSlot
        );
        if (examsForSlot.length) {
          examsForSlot.forEach((exam) => {
            rows.push({
              Day: day,
              Time: timeSlot,
              Subject: getMaterieNameById(exam.id_materie),
              Date: new Date(exam.data).toLocaleDateString("ro-RO"),
            });
          });
        }
      });
    }

    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "exams_schedule.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportAsPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Exam Schedule", 14, 20);

    const tableData: [string, string, string, string][] = [];

    for (const day in weekdayMap) {
      Array.from({ length: 11 }, (_, i) => {
        const timeSlot = `${8 + i}-${10 + i}`;
        const examsForSlot = getExamsForSlot(
          day as keyof typeof weekdayMap,
          timeSlot
        );
        if (examsForSlot.length) {
          examsForSlot.forEach((exam) => {
            tableData.push([
              day,
              timeSlot,
              getMaterieNameById(exam.id_materie),
              new Date(exam.data).toLocaleDateString("ro-RO"),
            ]);
          });
        }
      });
    }

    autoTable(doc, {
      startY: 30,
      head: [["Day", "Time", "Subject", "Date"]],
      body: tableData,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [241, 241, 241] },
    });

    doc.save("exams_schedule.pdf");
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
                                  {getMaterieNameById(exam.id_materie)}
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
