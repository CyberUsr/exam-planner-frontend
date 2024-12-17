"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createStudent } from "../services/studentiService";
import { getAllGrupe } from "../services/grupeService";

export default function AddStudent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email] = useState(searchParams.get("email") || "");
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({
    grupa: "",
    anul: "",
    nume: "",
    prenume: "",
    specializare: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getAllGrupe();
        setGroups(data);
      } catch (err) {
        console.error("Error fetching groups:", err);
      }
    };

    fetchGroups();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await createStudent({
        id_student: email,
        ...formData,
        anul: parseInt(formData.anul, 10),
      });
      alert("Profile completed successfully! Redirecting to login...");
      router.push("/login");
    } catch (err) {
      console.error("Error creating student:", err);
      setError("Failed to create student profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">
        Complete Your Profile
      </h1>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-3 py-2 bg-gray-100 border rounded"
          />
        </div>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="prenume"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="nume"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label>Year</label>
          <input
            type="number"
            name="anul"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label>Group</label>
          <select
            name="grupa"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select a group</option>
            {groups.map((group) => (
              <option key={group.id} value={group.groupName}>
                {group.groupName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Specialization</label>
          <input
            type="text"
            name="specializare"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
