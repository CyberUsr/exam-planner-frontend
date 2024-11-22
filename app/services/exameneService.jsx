import axios from "axios";

const API_URL = "http://localhost:3003/examene"; // Adjust as per your API URL

// Fetch all exams
export const getAllExamene = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching exams:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch exams.");
  }
};

// Fetch a single exam by ID
export const getExamById = async (id_exam) => {
  try {
    const response = await axios.get(`${API_URL}/${id_exam}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching exam:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch exam.");
  }
};

// Create a new exam
export const createExam = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating exam:",
      error.response?.data || error.message
    );
    throw new Error("Failed to create exam.");
  }
};

// Update an exam
export const updateExam = async (id_exam, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id_exam}`, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating exam:",
      error.response?.data || error.message
    );
    throw new Error("Failed to update exam.");
  }
};

// Delete an exam
export const deleteExam = async (id_exam) => {
  try {
    const response = await axios.delete(`${API_URL}/${id_exam}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting exam:",
      error.response?.data || error.message
    );
    throw new Error("Failed to delete exam.");
  }
};
