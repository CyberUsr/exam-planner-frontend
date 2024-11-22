"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getExamById,
  updateExam,
  deleteExam,
} from "../../services/exameneService";

export default function ExamDetails({ params }) {
  const { id } = params; // Access the dynamic route parameter
  const router = useRouter();
  const [formData, setFormData] = useState({
    nume_materie: "",
    data: "",
    ora: "",
    tip_evaluare: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!id) return; // Ensure ID is available

    const fetchExam = async () => {
      try {
        const data = await getExamById(id); // Fetch exam by ID
        setFormData({
          nume_materie: data.nume_materie,
          data: data.data.split("T")[0], // Extract date
          ora: data.data.split("T")[1]?.slice(0, 5), // Extract time
          tip_evaluare: data.tip_evaluare,
        });
      } catch (error) {
        console.error("Error fetching exam:", error);
        setToastMessage("Failed to load exam details.");
        setShowToast(true);
      }
    };

    fetchExam();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        nume_materie: formData.nume_materie,
        data: new Date(`${formData.data}T${formData.ora}`).toISOString(),
        tip_evaluare: formData.tip_evaluare,
      };

      console.log("Sending updated data to backend:", updatedData); // Log payload

      const response = await updateExam(id, updatedData);
      console.log("Update response:", response);

      setToastMessage("Exam updated successfully!");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.push("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Error updating exam:", error);
      setToastMessage("Failed to update exam.");
      setShowToast(true);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteExam(id);
      setToastMessage("Exam deleted successfully!");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.push("/dashboard"); // Redirect to exam list
      }, 3000);
    } catch (error) {
      console.error("Error deleting exam:", error);
      setToastMessage("Failed to delete exam.");
      setShowToast(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-6 relative">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Update Exam
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Modify the details below to update or delete the exam.
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-6">
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
              <option value="Final">Final</option>
              <option value="Partial">Partial</option>
              <option value="Test">Test</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-1/2 px-4 py-3 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:outline-none mr-2"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="w-1/2 px-4 py-3 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:outline-none"
            >
              Delete
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
          <div className="ps-4 text-sm font-normal">{toastMessage}</div>
        </div>
      )}
    </div>
  );
}
