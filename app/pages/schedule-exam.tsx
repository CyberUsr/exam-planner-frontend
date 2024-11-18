/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";

export default function ScheduleExam() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col">
      {/* Header */}
      <header className="p-6 bg-blue-600 dark:bg-blue-800 text-white shadow-md">
        <h1 className="text-2xl font-semibold">Programează un examen</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <form className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="subject">
              Materie
            </label>
            <input
              type="text"
              id="subject"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              placeholder="Introdu materia"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="date">
              Data
            </label>
            <input
              type="date"
              id="date"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="time">
              Ora
            </label>
            <input
              type="time"
              id="time"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Programează examen
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-gray-200 dark:bg-gray-800 text-center text-sm">
        © 2024 Exam Planner. All rights reserved.
      </footer>
    </div>
  );
}
