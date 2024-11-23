"use client";

import React from "react";
import Link from "next/link";

const ProfessorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Professor Dashboard</h1>
        <span>Welcome, Professor</span>
      </header>

      {/* Sidebar */}
      <div className="flex flex-col md:flex-row">
        <nav className="bg-white dark:bg-gray-800 w-full md:w-1/4 p-4 space-y-4">
          <Link
            href="/dashboard/professor/courses"
            className="block px-4 py-2 text-green-600 hover:bg-green-100 dark:hover:bg-gray-700 dark:text-gray-200 rounded"
          >
            My Courses
          </Link>
          <Link
            href="/dashboard/professor/manage-exams"
            className="block px-4 py-2 text-green-600 hover:bg-green-100 dark:hover:bg-gray-700 dark:text-gray-200 rounded"
          >
            Manage Exams
          </Link>
          <Link
            href="/dashboard/professor/notifications"
            className="block px-4 py-2 text-green-600 hover:bg-green-100 dark:hover:bg-gray-700 dark:text-gray-200 rounded"
          >
            Notifications
          </Link>
        </nav>

        {/* Content */}
        <main className="flex-1 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
            <ul>
              <li className="mb-3">
                <strong>Numerical Methods</strong> - Year 3, Group 1
              </li>
              <li className="mb-3">
                <strong>Physics</strong> - Year 2, Group 2
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfessorDashboard;
