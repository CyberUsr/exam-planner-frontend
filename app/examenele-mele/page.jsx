import Navbar from "../components/Navbar";

export default function ExameneleMele() {
  const specializari = [
    "Calculatoare",
    "Automatica",
    "Electronica Aplicata",
    "Sisteme Medicale",
  ];
  const aniStudiu = ["1", "2", "3", "4"];
  const grupe = ["Grupa 3132", "Grupa 3133", "Grupa 3134"];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="p-6 sm:p-10 grid gap-8">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Dropdown pentru Selectare Specializare */}
          <div className="w-full lg:w-1/3">
            <label
              htmlFor="specializare"
              className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2"
            >
              Selectează specializarea
            </label>
            <select
              id="specializare"
              className="block w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400"
            >
              <option disabled selected>
                Alege o specializare
              </option>
              {specializari.map((specializare, index) => (
                <option key={index} value={specializare}>
                  {specializare}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown pentru Selectare An */}
          <div className="w-full lg:w-1/3">
            <label
              htmlFor="an"
              className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2"
            >
              Selectează anul de studiu
            </label>
            <select
              id="an"
              className="block w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400"
            >
              <option disabled selected>
                Alege anul
              </option>
              {aniStudiu.map((an, index) => (
                <option key={index} value={an}>
                  Anul {an}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown pentru Selectare Grupa */}
          <div className="w-full lg:w-1/3">
            <label
              htmlFor="grupa"
              className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2"
            >
              Selectează grupa
            </label>
            <select
              id="grupa"
              className="block w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400"
            >
              <option disabled selected>
                Alege grupa
              </option>
              {grupe.map((grupa, index) => (
                <option key={index} value={grupa}>
                  {grupa}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Exam Table */}
        <section className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
            Examenele mele
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Selectează filtrele pentru a vedea examenele disponibile.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="p-6 bg-gray-200 dark:bg-gray-800 text-center text-sm text-gray-700 dark:text-gray-300">
        © 2024 Exam Planner. All rights reserved.
      </footer>
    </div>
  );
}
