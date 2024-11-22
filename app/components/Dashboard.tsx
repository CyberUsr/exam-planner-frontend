"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { getAllProfesori } from "../services/profesoriService";
import { getAllExamene } from "../services/exameneService";

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

export default function Dashboard() {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const weeks = ["Săptămâna 1", "Săptămâna 2", "Săptămâna 3"];
  const [selectedWeek, setSelectedWeek] = useState<string>("Săptămâna 1");

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const data = await getAllProfesori();
        setProfessors(data);
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

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <Navbar />

      <main className="p-4 sm:p-6 md:p-10 grid gap-8">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Select Professor */}
          <div className="w-full lg:w-1/2">
            <label
              htmlFor="professor"
              className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2"
            >
              Selectează profesor
            </label>
            <select
              id="professor"
              className="block w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400"
            >
              <option disabled selected>
                Alege un profesor
              </option>
              {professors.map((professor) => (
                <option
                  key={professor.id_profesor}
                  value={professor.id_profesor}
                >
                  {`${professor.nume} ${professor.prenume}`}
                </option>
              ))}
            </select>
          </div>

          {/* Select Week */}
          <div className="w-full lg:w-1/2">
            <label
              htmlFor="week"
              className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2"
            >
              Alege săptămâna
            </label>
            <select
              id="week"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="block w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400"
            >
              {weeks.map((week, index) => (
                <option key={index} value={week}>
                  {week}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Weekly Calendar */}
        <section className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
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
        </section>

        {/* Add Exam Button */}
        <div className="flex justify-center mt-8">
          <Link
            href="/adaugare-examene"
            className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Adaugă examen
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 bg-gray-200 dark:bg-gray-800 text-center text-sm text-gray-700 dark:text-gray-300">
        © 2024 Exam Planner. All rights reserved.
      </footer>
    </div>
  );
}
