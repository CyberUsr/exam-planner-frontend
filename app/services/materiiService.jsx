import axios from "axios";

const API_BASE_URL = "http://localhost:3003/materii"; // Match backend URL

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

export const deleteMaterie = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const updateMaterie = async (id, data) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, data);
  return response.data;
};
