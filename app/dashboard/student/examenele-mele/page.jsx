"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { getAllGrupe } from "../../../api/services/grupeService";
import { getAllExamene } from "../../../api/services/exameneService";
import Link from "next/link";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
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
  const [exams, setExams] = useState([]);
  const [specialization, setSpecialization] = useState("Specialization");
  const [group, setGroup] = useState("Group");
  const [year, setYear] = useState("Year");

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
        setGrupe(data);
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

  const getExamsForSlot = (day, timeSlot) => {
    return exams.filter((exam) => {
      const examDate = new Date(exam.data);
      const examDay = examDate.getDay();
      const examTime = `${examDate.getHours()}-${examDate.getHours() + 2}`;

      return examDay === weekdayMap[day] && examTime === timeSlot;
    });
  };

  const exportToCSV = () => {
    const rows = exams.map((exam) => ({
      Subject: exam.nume_materie,
      Date: new Date(exam.data).toLocaleDateString("ro-RO"),
      Time: new Date(exam.ora).toLocaleTimeString("ro-RO"),
      Specialization: specialization,
      Group: group,
      Year: year,
    }));

    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Subject,Date,Time,Specialization,Group,Year"]
        .concat(rows.map((row) => Object.values(row).join(",")))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "exams.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Exam Schedule", 14, 20);
    doc.setFontSize(12);
    doc.text(`Specialization: ${specialization}`, 14, 30);
    doc.text(`Group: ${group}`, 14, 40);
    doc.text(`Year: ${year}`, 14, 50);

    const tableData = [];

    for (const day in weekdayMap) {
      Array.from({ length: 11 }, (_, i) => {
        const timeSlot = `${8 + i}-${10 + i}`;
        const examsForSlot = getExamsForSlot(day, timeSlot);
        if (examsForSlot.length) {
          examsForSlot.forEach((exam) => {
            tableData.push([
              day,
              timeSlot,
              exam.nume_materie,
              new Date(exam.data).toLocaleDateString("ro-RO"),
            ]);
          });
        }
      });
    }

    autoTable(doc, {
      startY: 60,
      head: [["Day", "Time", "Subject", "Date"]],
      body: tableData,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [241, 241, 241] },
    });

    doc.save("exams.pdf");
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

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
            Calendar săptămânal
          </h2>
          <div className="mb-4 flex justify-end space-x-4">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow"
            >
              Export CSV
            </button>
            <button
              onClick={exportToPDF}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow"
            >
              Export PDF
            </button>
          </div>
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
      </SidebarInset>
    </SidebarProvider>
  );
}
