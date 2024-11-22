"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Updated import for `app` directory
import { createExam } from "../services/exameneService";

export default function ScheduleExam() {
  const [formData, setFormData] = useState({
    nume_materie: "",
    data: "",
    ora: "",
    tip_evaluare: "",
    actualizatDe: "teacher", // Replace with logged-in teacher's name or ID
  });
  const [showToast, setShowToast] = useState(false);
  const router = useRouter(); // Using `next/navigation` for app directory

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, ora, ...rest } = formData;

      // Send ISO-formatted date and time
      const formattedData = {
        ...rest,
        data: new Date(`${data}T${ora}`).toISOString(), // Combine date and time
        ora: new Date(`${data}T${ora}`).toISOString(),
      };

      await createExam(formattedData);

      // Show the toast for a few seconds, then redirect
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.back(); // Navigate back to the previous page
      }, 3000);
    } catch (error) {
      console.error("Failed to schedule exam:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-6 relative">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Schedule an Exam
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Fill out the details below to schedule an exam.
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nume_materie"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              id="nume_materie"
              name="nume_materie"
              value={formData.nume_materie}
              onChange={handleChange}
              required
              placeholder="Enter the subject"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="data"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Date
            </label>
            <input
              type="date"
              id="data"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Time */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="ora"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Time
            </label>
            <input
              type="time"
              id="ora"
              name="ora"
              value={formData.ora}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Exam Type */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="tip_evaluare"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Exam Type
            </label>
            <select
              id="tip_evaluare"
              name="tip_evaluare"
              value={formData.tip_evaluare}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="" disabled>
                Select an exam type
              </option>
              <option value="Final">Final</option>
              <option value="Partial">Partial</option>
              <option value="Test">Test</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
            >
              Schedule Exam
            </button>
          </div>
        </form>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div
          id="toast-simple"
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800"
          role="alert"
        >
          <svg
            className="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
            />
          </svg>
          <div className="ps-4 text-sm font-normal">
            Exam scheduled successfully! Redirecting...
          </div>
        </div>
      )}
    </div>
  );
}
