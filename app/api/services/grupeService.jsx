// services/grupeService.js

import axios from "axios";

const API_URL = "http://localhost:3003/grupe"; // Adjust based on your backend endpoint

// Fetch all Grupe
export const getAllGrupe = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Grupe:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch Grupe.");
  }
};

// Fetch Grupe by ID
export const getGrupeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching Grupe with ID ${id}:`,
      error.response?.data || error.message
    );
    throw new Error(`Failed to fetch Grupe with ID ${id}.`);
  }
};

// Create a new Grupe
export const createGrupe = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating Grupe:",
      error.response?.data || error.message
    );
    throw new Error("Failed to create Grupe.");
  }
};

// Update Grupe by ID
export const updateGrupe = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(
      `Error updating Grupe with ID ${id}:`,
      error.response?.data || error.message
    );
    throw new Error(`Failed to update Grupe with ID ${id}.`);
  }
};

// Delete Grupe by ID
export const deleteGrupe = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting Grupe with ID ${id}:`,
      error.response?.data || error.message
    );
    throw new Error(`Failed to delete Grupe with ID ${id}.`);
  }
};
