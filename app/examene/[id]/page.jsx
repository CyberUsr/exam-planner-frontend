/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getExamById,
  updateExam,
  deleteExam,
} from "../../../services/exameneService";

export default function ExamDetails({ params }) {
  const { id } = params; // Access the dynamic route parameter
  const router = useRouter();
  const [exam, setExam] = useState(null);
  const [formData, setFormData] = useState({
    nume_materie: "",
    data: "",
    ora: "",
    tip_evaluare: "",
  });

  useEffect(() => {
    if (!id) return; // Ensure ID is available

    const fetchExam = async () => {
      try {
        const data = await getExamById(id);
        setExam(data);
        setFormData({
          nume_materie: data.nume_materie,
          data: data.data.split("T")[0], // Extract date
          ora: data.data.split("T")[1]?.slice(0, 5), // Extract time
          tip_evaluare: data.tip_evaluare,
        });
      } catch (error) {
        console.error("Error fetching exam:", error);
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
      await updateExam(id, {
        ...formData,
        data: new Date(`${formData.data}T${formData.ora}`).toISOString(),
      });
      alert("Exam updated successfully!");
      router.push("/examene");
    } catch (error) {
      console.error("Error updating exam:", error);
      alert("Failed to update exam.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteExam(id);
      alert("Exam deleted successfully!");
      router.push("/examene");
    } catch (error) {
      console.error("Error deleting exam:", error);
      alert("Failed to delete exam.");
    }
  };

  //if (!exam) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleUpdate}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
      >
        <h1 className="text-xl font-bold">Update Exam</h1>
        <input
          type="text"
          name="nume_materie"
          value={formData.nume_materie}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
          placeholder="Subject"
        />
        <input
          type="date"
          name="data"
          value={formData.data}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
        />
        <input
          type="time"
          name="ora"
          value={formData.ora}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
        />
        <select
          name="tip_evaluare"
          value={formData.tip_evaluare}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
        >
          <option value="Final">Final</option>
          <option value="Partial">Partial</option>
          <option value="Test">Test</option>
        </select>
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
