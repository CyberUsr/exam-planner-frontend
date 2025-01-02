import axios from "axios";

const AUTH_API_URL = "http://localhost:3003/auth"; // Base URL for the Auth API

// Function to register a new user
export const registerUser = async (email, password) => {
  const response = await axios.post(`${AUTH_API_URL}/register`, {
    email,
    password,
  });
  return response.data; // Returns message and user data
};

// Function to log in a user
export const loginUser = async (email, password) => {
  const response = await axios.post(`${AUTH_API_URL}/login`, {
    email,
    password,
  });
  return response.data; // Returns token and user data
};

// Function to access a protected route
export const getProtectedResource = async (token) => {
  const response = await axios.get(`${AUTH_API_URL}/protected`, {
    headers: {
      Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
    },
  });
  return response.data;
};
