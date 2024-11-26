"use client";

import React from "react";
import Link from "next/link";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-red-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <span>Welcome, Admin</span>
      </header>

      {/* Sidebar */}
      <div className="flex flex-col md:flex-row">
        <nav className="bg-white dark:bg-gray-800 w-full md:w-1/4 p-4 space-y-4">
          <Link
            href="/dashboard/admin/users"
            className="block px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-gray-700 dark:text-gray-200 rounded"
          >
            Manage Users
          </Link>
          <Link
            href="/dashboard/admin/analytics"
            className="block px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-gray-700 dark:text-gray-200 rounded"
          >
            System Analytics
          </Link>
        </nav>

        {/* Content */}
        <main className="flex-1 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">System Overview</h2>
            <ul>
              <li className="mb-3">Total Users: 1,230</li>
              <li className="mb-3">Pending Requests: 12</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
