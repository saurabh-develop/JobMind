import api from "./axiosClient";

export const registerApi = (data) => api.post("/auth/register", data);

export const loginApi = (data) => api.post("/auth/login", data);

export const verifyOtpApi = (data) => api.post("/auth/verify-otp", data);

export const getMeApi = () => api.get("/auth/me");

export const logoutApi = () => api.post("/auth/logout");

export const refreshApi = () => api.post("/auth/refresh-token");
