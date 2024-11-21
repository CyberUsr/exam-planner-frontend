"use client";

import React, { useState } from "react";
import { createExam } from "../services/exameneService";

export default function ScheduleExam() {
  const [formData, setFormData] = useState({
    nume_materie: "",
    data: "",
    ora: "",
    tip_evaluare: "",
    actualizatDe: "teacher", // Replace with logged-in teacher's name or ID
  });

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
      alert("Exam scheduled successfully!");

      // Reset the form
      setFormData({
        nume_materie: "",
        data: "",
        ora: "",
        tip_evaluare: "",
        actualizatDe: "teacher",
      });
    } catch (error) {
      alert("Failed to schedule exam.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
        <header className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Schedule an Exam
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nume_materie" className="block text-sm font-medium">
              Subject
            </label>
            <input
              type="text"
              id="nume_materie"
              name="nume_materie"
              value={formData.nume_materie}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            />
          </div>

          <div>
            <label htmlFor="data" className="block text-sm font-medium">
              Date
            </label>
            <input
              type="date"
              id="data"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            />
          </div>

          <div>
            <label htmlFor="ora" className="block text-sm font-medium">
              Time
            </label>
            <input
              type="time"
              id="ora"
              name="ora"
              value={formData.ora}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            />
          </div>

          <div>
            <label htmlFor="tip_evaluare" className="block text-sm font-medium">
              Exam Type
            </label>
            <select
              id="tip_evaluare"
              name="tip_evaluare"
              value={formData.tip_evaluare}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            >
              <option value="" disabled>
                Select an exam type
              </option>
              <option value="Final">Final</option>
              <option value="Partial">Partial</option>
              <option value="Test">Test</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded"
          >
            Schedule Exam
          </button>
        </form>
      </div>
    </div>
  );
}
