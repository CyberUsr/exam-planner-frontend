import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-blue-600 dark:bg-blue-800 text-white shadow-md">
        <h1 className="text-2xl font-semibold">Lista cu examenele profesorului</h1>
        <div className="flex items-center gap-4">
          <Image
            src="https://nextjs.org/icons/next.svg"
            alt="Next.js logo"
            width={40}
            height={40}
            className="dark:invert"
          />
          <span className="text-lg font-medium">Welcome, User</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 grid gap-8">
        {/* Filters */}
        <div className="flex gap-4 mb-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Selectează profesor</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Alege săptămâna</button>
        </div>

        {/* Exam Table */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Tabelul cu orele și examenele</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 border border-gray-300 dark:border-gray-600">Ora</th>
                  <th className="p-2 border border-gray-300 dark:border-gray-600">Luni</th>
                  <th className="p-2 border border-gray-300 dark:border-gray-600">Marți</th>
                  <th className="p-2 border border-gray-300 dark:border-gray-600">Miercuri</th>
                  <th className="p-2 border border-gray-300 dark:border-gray-600">Joi</th>
                  <th className="p-2 border border-gray-300 dark:border-gray-600">Vineri</th>
                  <th className="p-2 border border-gray-300 dark:border-gray-600">Sâmbătă</th>
                  <th className="p-2 border border-gray-300 dark:border-gray-600">Duminică</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }, (_, i) => (
                  <tr key={i} className="even:bg-gray-100 dark:even:bg-gray-700">
                    <td className="p-2 border border-gray-300 dark:border-gray-600">
                      {`${9 + i}-${10 + i}`}
                    </td>
                    {Array.from({ length: 7 }, (_, j) => (
                      <td key={j} className="p-2 border border-gray-300 dark:border-gray-600">
                        {/* Placeholder for exam info */}
                        <div className="w-full h-6 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Schedule Exam Button */}
        <div className="flex justify-center mt-6">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
            Programează examen
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-gray-200 dark:bg-gray-800 text-center text-sm">
        © 2024 Exam Planner. All rights reserved.
      </footer>
    </div>
  );
}
