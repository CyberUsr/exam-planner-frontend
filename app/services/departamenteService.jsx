import axios from "axios";

const API_URL = "http://localhost:3003/departamente"; // Adjust to your API URL

// Fetch all departments
export const getAllDepartamente = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch departments:", error);
    throw error;
  }
};

// Fetch a specific department by ID
export const getDepartamentById = async (idDepartament) => {
  try {
    const response = await axios.get(`${API_URL}/${idDepartament}`);
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch department with ID ${idDepartament}:`,
      error
    );
    throw error;
  }
};
