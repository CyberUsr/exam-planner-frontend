"use client";

import React from "react";
import Link from "next/link";

const SecretariatDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-yellow-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Secretariat Dashboard</h1>
        <span>Welcome, Secretariat</span>
      </header>

      {/* Sidebar */}
      <div className="flex flex-col md:flex-row">
        <nav className="bg-white dark:bg-gray-800 w-full md:w-1/4 p-4 space-y-4">
          <Link
            href="/dashboard/secretariat/requests"
            className="block px-4 py-2 text-yellow-600 hover:bg-yellow-100 dark:hover:bg-gray-700 dark:text-gray-200 rounded"
          >
            Manage Requests
          </Link>
          <Link
            href="/dashboard/secretariat/calendar"
            className="block px-4 py-2 text-yellow-600 hover:bg-yellow-100 dark:hover:bg-gray-700 dark:text-gray-200 rounded"
          >
            Exam Calendar
          </Link>
        </nav>

        {/* Content */}
        <main className="flex-1 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
            <ul>
              <li className="mb-3">
                <strong>Numerical Methods</strong> - Request for reschedule.
              </li>
              <li className="mb-3">
                <strong>Physics</strong> - Additional exam slots requested.
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SecretariatDashboard;
