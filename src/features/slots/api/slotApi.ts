import axios from "axios";

const API_BASE = "https://localhost:7009/api";  //can put in the environment variable.

export const fetchAllSlots = async () => {
  const response = await axios.get(`${API_BASE}/slots`);
  return response.data.data; 
};

export const bookSlot = async (slotId: string) => {
  const response = await axios.post(`${API_BASE}/slots/${slotId}/book`);
  return response.data;
};

export const cancelBooking = async (slotId: string) => {
  const response = await axios.post(`${API_BASE}/slots/${slotId}/cancel`);
  return response.data;
};

export const fetchAvailableSlots = async () => {
  const response = await axios.get(`${API_BASE}/slots/available`);
  return response.data.data; // adjust if your backend uses different structure
};

export const createSlot = async (payload: {
  startTime: string;
  maxBookings: number;
}) => {
  const response = await axios.post(`${API_BASE}/slots`, payload);
  return response.data;
};
