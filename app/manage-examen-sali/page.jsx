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

export default function ExameneSaliManager() {
  const [exameneSali, setExameneSali] = useState([]);
  const [examene, setExamene] = useState([]);
  const [sali, setSali] = useState([]);
  const [formData, setFormData] = useState({
    id_examene_sali: "",
    id_examene: "",
    id_sala: "",
  });

  // Fetch all data
  const fetchData = async () => {
    try {
      const [exameneSaliData, exameneData, saliData] = await Promise.all([
        getAllExameneSali(),
        getAllExamene(),
        getAllSali(),
      ]);

      console.log("ExameneSali Data:", exameneSaliData);
      console.log("Examene Data:", exameneData);
      console.log("Sali Data:", saliData);

      setExameneSali(exameneSaliData);
      setExamene(exameneData);
      setSali(saliData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id_examene_sali) {
        await updateExameneSali(formData.id_examene_sali, formData);
        alert("Record updated successfully!");
      } else {
        await createExameneSali(formData);
        alert("Record created successfully!");
      }
      setFormData({ id_examene_sali: "", id_examene: "", id_sala: "" });
      fetchData();
    } catch (error) {
      console.error("Error saving ExameneSali record:", error);
    }
  };

  const handleDelete = async (id_examene_sali) => {
    try {
      await deleteExameneSali(id_examene_sali);
      alert("Record deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("Error deleting ExameneSali record:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Examene Sali</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <select
          name="id_examene"
          value={formData.id_examene}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
        >
          <option value="" disabled>
            Select Examene
          </option>
          {examene.length > 0 ? (
            examene.map((exam) => (
              <option key={exam.id_examene} value={exam.id_examene}>
                {exam.nume_materie}
              </option>
            ))
          ) : (
            <option disabled>Loading...</option>
          )}
        </select>
        <select
          name="id_sala"
          value={formData.id_sala}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
        >
          <option value="" disabled>
            Select Sala
          </option>
          {sali.length > 0 ? (
            sali.map((sala) => (
              <option key={sala.id_sala} value={sala.id_sala}>
                {sala.nume} ({sala.buildingName})
              </option>
            ))
          ) : (
            <option disabled>Loading...</option>
          )}
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {formData.id_examene_sali ? "Update Record" : "Create Record"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full bg-white border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID Examene Sali</th>
            <th className="border p-2">Examene</th>
            <th className="border p-2">Sala</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exameneSali.map((record) => (
            <tr key={record.id_examene_sali} className="even:bg-gray-100">
              <td className="border p-2">{record.id_examene_sali}</td>
              <td className="border p-2">
                {examene.find((e) => e.id_examene === record.id_examene)
                  ?.nume_materie || "N/A"}
              </td>
              <td className="border p-2">
                {sali.find((s) => s.id_sala === record.id_sala)?.nume || "N/A"}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => setFormData(record)}
                  className="mr-2 px-2 py-1 bg-green-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(record.id_examene_sali)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
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
