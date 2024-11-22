"use client";

import { useEffect, useState } from "react";
import {
  getAllSali,
  createSala,
  updateSala,
  deleteSala,
} from "../services/saliService";

export default function SaliPage() {
  const [sali, setSali] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    id_sala: "",
    nume: "",
    shortName: "",
    buildingName: "",
  });

  const fetchSali = async () => {
    setLoading(true);
    try {
      const data = await getAllSali();
      setSali(data);
    } catch (err) {
      console.error("Error fetching sali:", err);
      setError("Failed to load sali.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSali();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (formData.id_sala) {
        // Update existing sala
        await updateSala(formData.id_sala, formData);
        alert("Sala updated successfully");
      } else {
        // Create new sala
        await createSala(formData);
        alert("Sala created successfully");
      }
      setFormData({ id_sala: "", nume: "", shortName: "", buildingName: "" });
      fetchSali();
    } catch (err) {
      console.error("Error saving sala:", err);
      setError("Failed to save sala. Check console for details.");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this sala?")) {
      try {
        await deleteSala(id);
        alert("Sala deleted successfully");
        fetchSali();
      } catch (err) {
        console.error("Error deleting sala:", err);
        setError("Failed to delete sala.");
      }
    }
  };

  if (loading) {
    return <p>Loading sali...</p>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Manage Sali</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {formData.id_sala ? "Edit Sala" : "Add New Sala"}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="nume"
            value={formData.nume}
            onChange={handleInputChange}
            placeholder="Sala Name"
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="shortName"
            value={formData.shortName}
            onChange={handleInputChange}
            placeholder="Short Name"
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="buildingName"
            value={formData.buildingName}
            onChange={handleInputChange}
            placeholder="Building Name"
            required
            className="border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          {formData.id_sala ? "Update Sala" : "Add Sala"}
        </button>
      </form>

      {/* Table */}
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Short Name</th>
            <th className="border px-4 py-2">Building Name</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sali.map((sala) => (
            <tr key={sala.id_sala}>
              <td className="border px-4 py-2">{sala.id_sala}</td>
              <td className="border px-4 py-2">{sala.nume}</td>
              <td className="border px-4 py-2">{sala.shortName}</td>
              <td className="border px-4 py-2">{sala.buildingName}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setFormData(sala)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(sala.id_sala)}
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
