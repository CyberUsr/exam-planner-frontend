import axios from "axios";

const API_URL = "http://localhost:3003/schedule"; // Base URL for the Schedule API

// Fetch all schedules
export const getAllSchedules = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching schedules:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch schedules. Please try again later.");
  }
};

// Fetch schedules for a specific group
export const getSchedulesForGroup = async (groupId) => {
  try {
    const response = await axios.get(`${API_URL}/group/${groupId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching schedules for group "${groupId}":`,
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch schedules for the specified group.");
  }
};

// Fetch schedules for a specific teacher
export const getSchedulesForTeacher = async (teacherId) => {
  try {
    const response = await axios.get(`${API_URL}/teacher/${teacherId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching schedules for teacher "${teacherId}":`,
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch schedules for the specified teacher.");
  }
};

// Create a new schedule
export const createSchedule = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating schedule:",
      error.response?.data || error.message
    );
    throw new Error("Failed to create schedule. Please try again.");
  }
};

// Update a schedule by ID
export const updateSchedule = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(
      `Error updating schedule with ID ${id}:`,
      error.response?.data || error.message
    );
    throw new Error(`Failed to update schedule with ID ${id}.`);
  }
};

// Delete a schedule by ID
export const deleteSchedule = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting schedule with ID ${id}:`,
      error.response?.data || error.message
    );
    throw new Error(`Failed to delete schedule with ID ${id}.`);
  }
};
