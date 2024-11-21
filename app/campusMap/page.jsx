/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { getSaliByBuilding } from "../services/saliService";

export default function CampusMap() {
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const buildingToRoomsMap = {
    A: "Building A",
    B: "Building B",
    C: "Building C",
    D: "Building D",
    E: "Building E",
    F: "Building F",
    G: "Building G",
    H: "Building H",
    N: "Building N",
  };

  const handleMouseEnter = async (buildingCode, event) => {
    setHoveredBuilding(buildingToRoomsMap[buildingCode]);
    setTooltipPosition({ top: event.clientY, left: event.clientX });

    try {
      const fetchedRooms = await getSaliByBuilding(buildingCode);
      setRooms(fetchedRooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRooms([]); // Clear rooms on error
    }
  };

  const handleMouseLeave = () => {
    setHoveredBuilding(null);
    setRooms([]);
  };

  return (
    <div className="relative">
      {/* Campus Map */}
      <img
        src="/img/harta_campus_3D-2.jpg" // Ensure the image is in the "public/img" folder
        alt="Campus Map"
        className="w-full object-contain"
      />

      {/* Interactive Divs for Buildings */}
      {/* Position these divs based on the actual map */}
      <div
        className="absolute top-[50%] left-[50%] w-[5%] h-[5%] bg-transparent cursor-pointer"
        onMouseEnter={(e) => handleMouseEnter("A", e)}
        onMouseLeave={handleMouseLeave}
      ></div>
      <div
        className="absolute top-[40%] left-[30%] w-[5%] h-[5%] bg-transparent cursor-pointer"
        onMouseEnter={(e) => handleMouseEnter("B", e)}
        onMouseLeave={handleMouseLeave}
      ></div>
      <div
        className="absolute top-[60%] left-[20%] w-[5%] h-[5%] bg-transparent cursor-pointer"
        onMouseEnter={(e) => handleMouseEnter("C", e)}
        onMouseLeave={handleMouseLeave}
      ></div>
      <div
        className="absolute top-[45%] left-[40%] w-[5%] h-[5%] bg-transparent cursor-pointer"
        onMouseEnter={(e) => handleMouseEnter("D", e)}
        onMouseLeave={handleMouseLeave}
      ></div>
      <div
        className="absolute top-[70%] left-[50%] w-[5%] h-[5%] bg-transparent cursor-pointer"
        onMouseEnter={(e) => handleMouseEnter("E", e)}
        onMouseLeave={handleMouseLeave}
      ></div>
      {/* Repeat for F, G, H, and N */}

      {/* Tooltip */}
      {hoveredBuilding && (
        <div
          className="absolute bg-white text-black p-4 shadow-lg rounded z-10"
          style={{
            top: `${tooltipPosition.top + 10}px`,
            left: `${tooltipPosition.left + 10}px`,
          }}
        >
          <h4 className="font-bold">{hoveredBuilding}</h4>
          <ul>
            {rooms.length > 0 ? (
              rooms.map((room) => <li key={room.id_sala}>{room.nume}</li>)
            ) : (
              <li>Loading rooms...</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
