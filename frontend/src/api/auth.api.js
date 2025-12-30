import axiosClient from "./axiosClient";

export const registerApi = (payload) => {
  axiosClient.post("/auth/register", payload);
};

export const verifyOtpApi = (payload) => {
  axiosClient.post("/auth/verify-otp", payload);
};

export const loginApi = (payload) => {
  const res = axiosClient.post("/auth/login", payload);
  return res.data;
};

export const logoutApi = () => {
  axiosClient.post("/auth/logout");
};

export const meApi = () => {
  axiosClient.get("/auth/me");
};
