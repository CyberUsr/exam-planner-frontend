/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";

export default function ScheduleExam() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex items-center justify-center p-4">
      
      {/* Centered Form Container */}
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
        <header className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100">
            Programează un examen
          </h1>
        </header>

        <form className="space-y-6">
          {/* Materii Dropdown */}
          <div>
            <label
              className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-100"
              htmlFor="subject"
            >
              Materie
            </label>
            <select
              id="subject"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled selected>
                Selectează materia
              </option>
              <option value="PCLP">PCLP</option>
              <option value="MS">MS</option>
              <option value="GAC">GAC</option>
              <option value="PACME">PACME</option>
              <option value="DEEA">DEEA</option>
            </select>
          </div>

           {/* Materii Dropdown */}
           <div>
            <label
              className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-100"
              htmlFor="subject"
            >
              Grupa
            </label>
            <select
              id="subject"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled selected>
                Selectează grupa
              </option>
              <option value="3141">3141</option>
              <option value="3142">3142</option>
              <option value="3143">3143</option>
            
            </select>
          </div>

          {/* Date Field */}
          <div>
            <label
              className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-100"
              htmlFor="date"
            >
              Data
            </label>
            <input
              type="date"
              id="date"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Time Field */}
          <div>
            <label
              className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-100"
              htmlFor="time"
            >
              Ora
            </label>
            <input
              type="time"
              id="time"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Programează examen
            </button>
          </div>
        </form>

        <footer className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2024 Exam Planner. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
