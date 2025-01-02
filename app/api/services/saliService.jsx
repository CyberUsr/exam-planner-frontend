import axios from "axios";

const API_URL = "http://localhost:3003/sali"; // Base URL for the Sali API

// Fetch all sali
export const getAllSali = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching sali:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch sali. Please try again later.");
  }
};

// Fetch sali by building name (added functionality)
export const getSaliByBuilding = async (buildingName) => {
  try {
    const response = await axios.get(
      `http://localhost:3003/sali?buildingName=${buildingName}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching sali for building "${buildingName}":`,
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch sali for the specified building.");
  }
};

// Fetch a sala by ID
export const getSalaById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching sala with ID ${id}:`,
      error.response?.data || error.message
    );
    throw new Error(`Failed to fetch sala with ID ${id}.`);
  }
};

// Create a new sala
export const createSala = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating sala:",
      error.response?.data || error.message
    );
    throw new Error("Failed to create sala. Please try again.");
  }
};

// Update a sala by ID
export const updateSala = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(
      `Error updating sala with ID ${id}:`,
      error.response?.data || error.message
    );
    throw new Error(`Failed to update sala with ID ${id}.`);
  }
};

// Delete a sala by ID
export const deleteSala = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting sala with ID ${id}:`,
      error.response?.data || error.message
    );
    throw new Error(`Failed to delete sala with ID ${id}.`);
  }
};
