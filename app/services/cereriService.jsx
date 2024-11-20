import axios from "axios";

const API_URL = "http://localhost:3003/cereri"; // Base URL for the Cereri API

export const getAllCereri = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const getCerereById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCerere = async (data) => {
  const response = await axios.post(`${API_URL}`, data);
  return response.data;
};

export const updateCerere = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteCerere = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
