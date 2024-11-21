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
