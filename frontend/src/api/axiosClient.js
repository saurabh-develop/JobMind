import axios from "axios";
import { API_BASE_URL } from "../config/api.config";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

// Attach access token to every request
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Auto refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        accessToken = data.accessToken;
        original.headers.Authorization = `Bearer ${accessToken}`;

        return api(original);
      } catch (refreshError) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  },
);

export default api;
