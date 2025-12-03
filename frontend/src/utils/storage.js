export const storeToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const getStoredToken = () => {
  return localStorage.getItem("accessToken");
};

export const clearToken = () => {
  localStorage.removeItem("accessToken");
};
