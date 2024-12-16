import axios from "axios";

const API_BASE_URL = "http://localhost:3003/materii"; // Match backend URL

// Fetch all subjects (materii)
export const getAllMaterii = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch materii:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch subjects.");
  }
};

// Create a new subject (materie)
export const createMaterie = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to create materie:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Delete a subject (materie)
export const deleteMaterie = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to delete materie:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update a subject (materie)
export const updateMaterie = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to update materie:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Find materie by ID method
export const findMaterieById = async (id_materie) => {
  try {
    console.log('Finding subject with ID:', id_materie);
    console.log('Full URL:', `${API_BASE_URL}/${id_materie}`);
    
    const response = await axios.get(`${API_BASE_URL}/${id_materie}`);
    return response.data;
  } catch (error) {
    console.error('Full error details:', error);
    console.error('Error response:', error.response);
    
    throw new Error(
      error.response?.data?.message ||
      `Failed to find subject with ID ${id_materie}. 
      Status: ${error.response?.status}. 
      Error: ${error.message}`
    );
  }
};