import axios from "axios";

const API_URL = "http://localhost:3003/sali"; // Base URL for the Sali API

// Fetch all sali
export const getAllSali = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching sali:",
      error.response?.data || error.message
    );
    throw error;
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
    throw error;
  }
};

// Create a new sala
export const createSala = async (data) => {
  try {
    const response = await axios.post(`${API_URL}`, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating sala:",
      error.response?.data || error.message
    );
    throw error;
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
    throw error;
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
    throw error;
  }
};
