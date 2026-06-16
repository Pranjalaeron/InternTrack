import axios from "axios";

const API = "https://interntrack-vmff.onrender.com/api/auth";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getProfile = async () => {
  const response = await axios.get(`${API}/profile`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};
export const updateProfile = async (data) => {
  const response = await axios.put(`${API}/profile`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};