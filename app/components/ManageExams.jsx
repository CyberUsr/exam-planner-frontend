"use client";

import { useEffect, useState } from "react";
import {
  getAllExameneSali,
  createExameneSali,
  updateExameneSali,
  deleteExameneSali,
} from "../services/exameneSaliService";
import { getAllExamene } from "../services/exameneService";
import { getAllSali } from "../services/saliService";

export default function ManageExams() {
  const [exameneSali, setExameneSali] = useState([]);
  const [examene, setExamene] = useState([]);
  const [sali, setSali] = useState([]);
  const [formData, setFormData] = useState({
    id_examene_sali: "",
    id_examene: "",
    id_sala: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const [exameneSaliData, exameneData, saliData] = await Promise.all([
        getAllExameneSali(),
        getAllExamene(),
        getAllSali(),
      ]);
      setExameneSali(exameneSaliData);
      setExamene(exameneData);
      setSali(saliData);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id_examene_sali) {
      await updateExameneSali(formData.id_examene_sali, formData);
    } else {
      await createExameneSali(formData);
    }
    setFormData({ id_examene_sali: "", id_examene: "", id_sala: "" });
  };

  const handleDelete = async (id) => {
    await deleteExameneSali(id);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6">Manage Exams</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="id_examene"
          value={formData.id_examene}
          onChange={(e) =>
            setFormData({ ...formData, id_examene: e.target.value })
          }
          className="block w-full p-3 border rounded"
        >
          <option value="">Select Exam</option>
          {examene.map((exam) => (
            <option key={exam.id_examene} value={exam.id_examene}>
              {exam.nume_materie}
            </option>
          ))}
        </select>
        <select
          name="id_sala"
          value={formData.id_sala}
          onChange={(e) =>
            setFormData({ ...formData, id_sala: e.target.value })
          }
          className="block w-full p-3 border rounded"
        >
          <option value="">Select Sala</option>
          {sali.map((sala) => (
            <option key={sala.id_sala} value={sala.id_sala}>
              {sala.nume}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded"
        >
          {formData.id_examene_sali ? "Update Exam" : "Add Exam"}
        </button>
      </form>
      <table className="w-full mt-6 bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Exam</th>
            <th className="p-3 text-left">Sala</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exameneSali.map((record) => (
            <tr key={record.id_examene_sali}>
              <td className="p-3">{record.id_examene}</td>
              <td className="p-3">{record.id_sala}</td>
              <td className="p-3">
                <button
                  onClick={() => setFormData(record)}
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(record.id_examene_sali)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
