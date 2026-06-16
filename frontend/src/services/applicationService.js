import axios from "axios";

const API = "http://localhost:8000/api/applications";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getApplications = async () => {
  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const createApplication = async (data) => {
  const response = await axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const deleteApplication = async (id) => {
  const response = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateApplication = async (id, data) => {
  const response = await axios.put(`${API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};
