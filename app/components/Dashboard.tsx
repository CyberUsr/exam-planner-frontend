import Link from "next/link";
import Navbar from "./Navbar";

export default function Dashboard() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="p-4 sm:p-8 grid gap-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Selectează profesor
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Alege săptămâna
          </button>
        </div>

        {/* Exam Table */}
        <section className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
            Tabelul cu orele și examenele
          </h2>
          <table className="w-full text-center border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">Ora</th>
                {["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"].map(
                  (day) => (
                    <th
                      key={day}
                      className="p-2 border border-gray-300 dark:border-gray-600"
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
                  <td className="p-2 border border-gray-300 dark:border-gray-600">
                    {`${8 + i}-${10 + i}`}
                  </td>
                  {Array.from({ length: 6 }, (_, j) => (
                    <td
                      key={j}
                      className="p-2 border border-gray-300 dark:border-gray-600"
                    >
                      <div className="w-full h-6 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Schedule Exam Button */}
        <div className="flex justify-center mt-6">
          <Link
            href="/exam-schedule"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Programează examen
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-gray-200 dark:bg-gray-800 text-center text-sm">
        © 2024 Exam Planner. All rights reserved.
      </footer>
    </div>
  );
}
