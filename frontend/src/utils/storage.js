const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const get = (key) => {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const remove = (key) => {
  localStorage.removeItem(key);
};

const clearAuth = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const saveAccessToken = (token) => save("accessToken", token);
const saveRefreshToken = (token) => save("refreshToken", token);

const getAccessToken = () => get("accessToken");
const getRefreshToken = () => get("refreshToken");

export const storeToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const getStoredToken = () => {
  return localStorage.getItem("accessToken");
};

export const clearToken = () => {
  localStorage.removeItem("accessToken");
};

export default {
  save,
  get,
  remove,
  clearAuth,
  saveAccessToken,
  saveRefreshToken,
  getAccessToken,
  getRefreshToken,
};
