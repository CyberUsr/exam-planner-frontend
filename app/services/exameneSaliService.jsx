import axios from "axios";

const API_URL = "http://localhost:3003/examenesali"; // Adjust the URL based on your API

// Fetch all ExameneSali records
export const getAllExameneSali = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching ExameneSali records:", error);
    throw error;
  }
};

// Fetch a single ExameneSali record by ID
export const getExameneSaliById = async (id_examene_sali) => {
  try {
    const response = await axios.get(`${API_URL}/${id_examene_sali}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching ExameneSali with ID ${id_examene_sali}:`,
      error
    );
    throw error;
  }
};

// Create a new ExameneSali record
export const createExameneSali = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error creating ExameneSali record:", error);
    throw error;
  }
};

// Update an existing ExameneSali record
export const updateExameneSali = async (id_examene_sali, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id_examene_sali}`, data);
    return response.data;
  } catch (error) {
    console.error(
      `Error updating ExameneSali with ID ${id_examene_sali}:`,
      error
    );
    throw error;
  }
};

// Delete an ExameneSali record
export const deleteExameneSali = async (id_examene_sali) => {
  try {
    const response = await axios.delete(`${API_URL}/${id_examene_sali}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting ExameneSali with ID ${id_examene_sali}:`,
      error
    );
    throw error;
  }
};
