import axios from "axios";

const API_URL = "http://localhost:3003/studenti"; // Base URL for the Studenti API

// Fetch all students
export const getAllStudenti = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(
      "Error in getAllStudenti:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Fetch a single student by ID
export const getStudentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error in getStudentById:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Create a new student
export const createStudent = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in createStudent:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update a student by ID
export const updateStudent = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in updateStudent:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Delete a student by ID
export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error in deleteStudent:",
      error.response?.data || error.message
    );
    throw error;
  }
};
