import axiosClient from "./axiosClient";

const authApi = {
  signup: (data) => axiosClient.post("/auth/signup", data),
  login: (data) => axiosClient.post("/auth/login", data),
  getMe: () => axiosClient.get("/auth/me"),
  refreshToken: (refreshToken) =>
    axiosClient.post("/auth/refresh", { refreshToken }),
  logout: () => axiosClient.post("/auth/logout"),
};

export default authApi;
