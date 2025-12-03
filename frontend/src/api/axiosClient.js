import axios from "axios";
import { getStoredToken } from "../utils/storage";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

axiosClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
