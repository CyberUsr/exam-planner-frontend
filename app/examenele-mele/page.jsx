"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllGrupe } from "../services/grupeService";

export default function ExameneleMele() {
  const [grupe, setGrupe] = useState([]);
  const [specializari, setSpecializari] = useState([]);
  const [aniStudiu, setAniStudiu] = useState([]);
  const [filteredGrupe, setFilteredGrupe] = useState([]);

  const [selectedSpecializare, setSelectedSpecializare] = useState("");
  const [selectedAn, setSelectedAn] = useState("");
  const [selectedGrupa, setSelectedGrupa] = useState("");

  const fetchGrupe = async () => {
    try {
      let data = await getAllGrupe();

      // Remove duplicates based on groupName
      data = data.filter(
        (grupe, index, self) =>
          index === self.findIndex((g) => g.groupName === grupe.groupName)
      );

      setGrupe(data);

      const uniqueSpecializari = [
        ...new Set(data.map((g) => g.specializationShortName)),
      ];
      setSpecializari(uniqueSpecializari);
    } catch (error) {
      console.error("Failed to fetch Grupe:", error);
    }
  };

  useEffect(() => {
    fetchGrupe();
  }, []);

  useEffect(() => {
    if (selectedSpecializare) {
      const years = grupe
        .filter((g) => g.specializationShortName === selectedSpecializare)
        .map((g) => g.studyYear);
      setAniStudiu([...new Set(years)]);
    } else {
      setAniStudiu([]);
      setFilteredGrupe([]);
    }
  }, [selectedSpecializare]);

  useEffect(() => {
    if (selectedAn) {
      const groups = grupe.filter(
        (g) =>
          g.specializationShortName === selectedSpecializare &&
          g.studyYear === selectedAn
      );
      setFilteredGrupe(groups);
    } else {
      setFilteredGrupe([]);
    }
  }, [selectedAn]);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <Navbar />

      <main className="p-6 sm:p-10 grid gap-8">
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Dropdown pentru Selectare Specializare */}
          <div className="w-full lg:w-1/3">
            <label
              htmlFor="specializare"
              className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2"
            >
              Selectează specializarea
            </label>
            <select
              id="specializare"
              value={selectedSpecializare}
              onChange={(e) => setSelectedSpecializare(e.target.value)}
              className="block w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                Alege o specializare
              </option>
              {specializari.map((specializare, index) => (
                <option key={index} value={specializare}>
                  {specializare}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown pentru Selectare An */}
          <div className="w-full lg:w-1/3">
            <label
              htmlFor="an"
              className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2"
            >
              Selectează anul de studiu
            </label>
            <select
              id="an"
              value={selectedAn}
              onChange={(e) => setSelectedAn(e.target.value)}
              disabled={!aniStudiu.length}
              className="block w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                Alege anul
              </option>
              {aniStudiu.map((an, index) => (
                <option key={index} value={an}>
                  Anul {an}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown pentru Selectare Grupa */}
          <div className="w-full lg:w-1/3">
            <label
              htmlFor="grupa"
              className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2"
            >
              Selectează grupa
            </label>
            <select
              id="grupa"
              value={selectedGrupa}
              onChange={(e) => setSelectedGrupa(e.target.value)}
              disabled={!filteredGrupe.length}
              className="block w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                Alege grupa
              </option>
              {filteredGrupe.map((grupa) => (
                <option key={grupa.id} value={grupa.id}>
                  {grupa.groupName || `Grupa ${grupa.id}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </main>
    </div>
  );
}
