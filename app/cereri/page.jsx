"use client";
import { useEffect, useState } from "react";
import {
  getAllCereri,
  deleteCerere,
  createCerere,
} from "../services/cereriService";

export default function CereriPage() {
  const [cereri, setCereri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCerere, setNewCerere] = useState({
    id_user: "",
    id_examene_sali: "",
    data: "",
    ora: "",
  });

  // Fetch all cereri
  const fetchCereri = async () => {
    try {
      const data = await getAllCereri();
      setCereri(data);
    } catch (error) {
      console.error("Error fetching cereri:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete cerere
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this cerere?")) {
      try {
        await deleteCerere(id);
        alert("Cerere deleted successfully");
        fetchCereri(); // Refresh the list
      } catch (error) {
        console.error("Error deleting cerere:", error);
      }
    }
  };

  // Handle input change for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCerere((prev) => ({ ...prev, [name]: value }));
  };

  // Handle create cerere
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createCerere(newCerere);
      alert("Cerere created successfully");
      setNewCerere({
        id_user: "",
        id_examene_sali: "",
        data: "",
        ora: "",
      }); // Reset form
      fetchCereri(); // Refresh the list
    } catch (error) {
      console.error("Error creating cerere:", error);
    }
  };

  useEffect(() => {
    fetchCereri();
  }, []);

  if (loading) {
    return <p>Loading cereri...</p>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Cereri</h1>

      {/* Create Cerere Form */}
      <form onSubmit={handleCreate} className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create New Cerere</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="id_user"
            value={newCerere.id_user}
            onChange={handleInputChange}
            placeholder="User ID"
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="id_examene_sali"
            value={newCerere.id_examene_sali}
            onChange={handleInputChange}
            placeholder="Examen Sala ID"
            required
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="data"
            value={newCerere.data}
            onChange={handleInputChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="time"
            name="ora"
            value={newCerere.ora}
            onChange={handleInputChange}
            required
            className="border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Create Cerere
        </button>
      </form>

      {/* Display Cereri */}
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">User ID</th>
            <th className="border px-4 py-2">Examen Sala ID</th>
            <th className="border px-4 py-2">Data</th>
            <th className="border px-4 py-2">Ora</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cereri.map((cerere) => (
            <tr key={cerere.id_cerere}>
              <td className="border px-4 py-2">{cerere.id_cerere}</td>
              <td className="border px-4 py-2">{cerere.id_user}</td>
              <td className="border px-4 py-2">{cerere.id_examene_sali}</td>
              <td className="border px-4 py-2">
                {new Date(cerere.data).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">
                {new Date(cerere.ora).toLocaleTimeString()}
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(cerere.id_cerere)}
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
