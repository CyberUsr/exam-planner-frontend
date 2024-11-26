"use client";

import { useEffect, useState } from "react";
import {
  getAllCereri,
  deleteCerere,
  createCerere,
} from "../services/cereriService";
import { getAllExameneSali } from "../services/exameneSaliService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function CereriPage() {
  const [cereri, setCereri] = useState([]);
  const [exameneSali, setExameneSali] = useState([]); // State for Examene Sali dropdown
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCerere, setNewCerere] = useState({
    id_user: "",
    id_examene_sali: "",
    data: "",
    ora: "",
  });
  const [cerereToDelete, setCerereToDelete] = useState(null); // State for selected cerere to delete

  const fetchCereri = async () => {
    setLoading(true);
    try {
      const data = await getAllCereri();
      setCereri(data);
    } catch (err) {
      console.error("Error fetching cereri:", err);
      setError("Failed to load cereri.");
    } finally {
      setLoading(false);
    }
  };

  const fetchExameneSali = async () => {
    try {
      const data = await getAllExameneSali();
      setExameneSali(data);
    } catch (err) {
      console.error("Error fetching Examene Sali:", err);
      setError("Failed to load Examene Sali.");
    }
  };

  const handleDelete = async () => {
    if (cerereToDelete) {
      try {
        await deleteCerere(cerereToDelete);
        //alert("Cerere deleted successfully");
        setCerereToDelete(null);
        fetchCereri();
      } catch (err) {
        console.error("Error deleting cerere:", err);
        setError("Failed to delete cerere.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCerere((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const formattedCerere = {
        ...newCerere,
        data: new Date(`${newCerere.data}T${newCerere.ora}`).toISOString(),
        ora: new Date(`${newCerere.data}T${newCerere.ora}`).toISOString(),
      };

      await createCerere(formattedCerere);
      alert("Cerere created successfully");
      setNewCerere({
        id_user: "",
        id_examene_sali: "",
        data: "",
        ora: "",
      });
      fetchCereri();
    } catch (err) {
      console.error("Error creating cerere:", err);
      setError("Failed to create cerere. Check console for details.");
    }
  };

  useEffect(() => {
    fetchCereri();
    fetchExameneSali(); // Fetch Examene Sali for dropdown
  }, []);

  if (loading) {
    return <p>Loading cereri...</p>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Cereri</h1>
      {error && <p className="text-red-500">{error}</p>}

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
          <select
            name="id_examene_sali"
            value={newCerere.id_examene_sali}
            onChange={handleInputChange}
            required
            className="border p-2 rounded"
          >
            <option value="" disabled>
              Select Examen Sala
            </option>
            {exameneSali.map((examenSala) => (
              <option
                key={examenSala.id_examene_sali}
                value={examenSala.id_examene_sali}
              >
                {`${examenSala.examene?.nume_materie} - ${examenSala.sala?.nume}`}
              </option>
            ))}
          </select>
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => setCerereToDelete(cerere.id_cerere)}
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the selected cerere.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
