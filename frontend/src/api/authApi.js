import axiosClient from "./axiosClient";
const authApi = {
  signup: (data) => axiosClient.post("/auth/signup", data),
  login: (data) => axiosClient.post("/auth/login", data),
  getMe: () => axiosClient.get("/auth/me"),
  verifyOtp: ({ userId, otp }) =>
    axiosClient.post("/auth/verify-otp", { userId, otp }),
  resendOtp: (userId) => axiosClient.post("/auth/resend-otp", { userId }),
  refreshToken: (refreshToken) =>
    axiosClient.post("/auth/refresh", { refreshToken }),
  logout: () => axiosClient.post("/auth/logout"),
};

export default authApi;
