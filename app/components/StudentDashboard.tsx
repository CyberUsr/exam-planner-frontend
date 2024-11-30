"use client";

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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const studentNav = [
  {
    title: "Exam Schedule",
    url: "/dashboard/student/exams",
    icon: null,
  },
  {
    title: "Pending Requests",
    url: "/dashboard/student/requests",
    icon: null,
  },
  {
    title: "Notifications",
    url: "/dashboard/student/notifications",
    icon: null,
  },
];

const StudentDashboard = () => {
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
                <BreadcrumbPage>Student</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1 bg-gray-100 dark:bg-gray-900">
          <div className="grid gap-6">
            {/* Content Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Your Upcoming Exams
              </h2>
              <ul>
                <li className="mb-3">
                  <strong>Numerical Methods</strong> - 2024-12-01 at 10:00 AM
                </li>
                <li className="mb-3">
                  <strong>Physics</strong> - 2024-12-07 at 2:00 PM
                </li>
                <li className="mb-3">
                  <strong>Programming Technologies</strong> - 2024-12-21 at 1:00
                  PM
                </li>
              </ul>
            </div>
          </div>
        </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default StudentDashboard;
