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
    throw error;
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

// Find a subject (materie) by ID
export const findMaterieById = async (id_materie) => {
  console.log("id_materie passed:", id_materie);
  if (!id_materie || typeof id_materie !== "string") {
    throw new Error(
      `Invalid id_materie: ${JSON.stringify(id_materie)}. It must be a string.`
    );
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/find-by-id`, {
      params: { id_materie },
    });

    if (!response.data) {
      throw new Error(`Materie with ID "${id_materie}" not found`);
    }

    return response.data;
  } catch (error) {
    console.error(
      `Failed to find materie by ID "${id_materie}":`,
      error.response?.data || error.message
    );
    throw error;
  }
};
