import Link from "next/link";
import Navbar from "./Navbar";

export default function Dashboard() {
  const professors = ["Profesor A", "Profesor B", "Profesor C"];
  const weeks = ["Săptămâna 1", "Săptămâna 2", "Săptămâna 3"];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="p-6 sm:p-10 grid gap-8">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Dropdown for Selectează Profesor */}
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
              {professors.map((professor, index) => (
                <option key={index} value={professor}>
                  {professor}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown for Alege Săptămâna */}
          <div className="w-full lg:w-1/2">
            <label
              htmlFor="week"
              className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2"
            >
              Alege săptămâna
            </label>
            <select
              id="week"
              className="block w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400"
            >
              <option disabled selected>
                Alege o săptămână
              </option>
              {weeks.map((week, index) => (
                <option key={index} value={week}>
                  {week}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Exam Table */}
        <section className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
            Tabelul cu orele și examenele
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  <th className="p-3 border border-gray-300 dark:border-gray-600">
                    Ora
                  </th>
                  {["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"].map(
                    (day) => (
                      <th
                        key={day}
                        className="p-3 border border-gray-300 dark:border-gray-600"
                      >
                        {day}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 11 }, (_, i) => (
                  <tr key={i} className="even:bg-gray-100 dark:even:bg-gray-700">
                    <td className="p-3 border border-gray-300 dark:border-gray-600">
                      {`${8 + i}-${10 + i}`}
                    </td>
                    {Array.from({ length: 6 }, (_, j) => (
                      <td
                        key={j}
                        className="p-3 border border-gray-300 dark:border-gray-600"
                      >
                        <div className="w-full h-6 bg-gray-200 dark:bg-gray-600 rounded-md"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Schedule Exam Button */}
        <div className="flex justify-center mt-8">
          <Link
            href="/exam-schedule"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Programează examen
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
