import axios from "axios";

const API_URL = "http://localhost:3003/profesori"; // Base URL for the Profesori API

// Fetch all professors
export const getAllProfesori = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error in getAllProfesori:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Fetch a single professor by ID
export const getProfesorById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error in getProfesorById:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Create a new professor
export const createProfesor = async (data) => {
  try {
    const response = await axios.post(`${API_URL}`, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in createProfesor:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update a professor by ID
export const updateProfesor = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in updateProfesor:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Delete a professor by ID
export const deleteProfesor = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error in deleteProfesor:",
      error.response?.data || error.message
    );
    throw error;
  }
};
