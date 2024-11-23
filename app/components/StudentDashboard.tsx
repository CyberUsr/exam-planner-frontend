"use client";

import React from "react";
import Link from "next/link";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <span>Welcome, Student</span>
      </header>

      {/* Sidebar */}
      <div className="flex flex-col md:flex-row">
        <nav className="bg-white dark:bg-gray-800 w-full md:w-1/4 p-4 space-y-4">
          <Link
            href="/dashboard/student/exams"
            className="block px-4 py-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-gray-200 rounded"
          >
            Exam Schedule
          </Link>
          <Link
            href="/dashboard/student/requests"
            className="block px-4 py-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-gray-200 rounded"
          >
            Pending Requests
          </Link>
          <Link
            href="/dashboard/student/notifications"
            className="block px-4 py-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-gray-200 rounded"
          >
            Notifications
          </Link>
        </nav>

        {/* Content */}
        <main className="flex-1 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Your Upcoming Exams</h2>
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
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
