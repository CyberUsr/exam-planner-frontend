import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center p-8 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
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
      <main className="p-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Quick Stats */}
        <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Exams Scheduled</h2>
          <p className="text-4xl font-bold">5</p>
          <p className="text-sm text-gray-500">Next in 2 days</p>
        </section>

        <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Assignments Due</h2>
          <p className="text-4xl font-bold">3</p>
          <p className="text-sm text-gray-500">Due in 1 week</p>
        </section>

        <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Study Hours Logged</h2>
          <p className="text-4xl font-bold">12</p>
          <p className="text-sm text-gray-500">This Week</p>
        </section>

        {/* Links */}
        <section className="col-span-full grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="#"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <h3 className="text-lg font-medium mb-2">View Exam Schedule</h3>
            <p className="text-sm text-gray-500">Check upcoming exams and schedules</p>
          </a>
          <a
            href="#"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <h3 className="text-lg font-medium mb-2">Add New Exam</h3>
            <p className="text-sm text-gray-500">Plan and add new exams to your schedule</p>
          </a>
          <a
            href="#"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <h3 className="text-lg font-medium mb-2">Track Study Time</h3>
            <p className="text-sm text-gray-500">Log and manage study hours</p>
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-gray-200 dark:bg-gray-800 text-center text-sm">
        © 2024 Exam Planner. All rights reserved.
      </footer>
    </div>
  );
}
