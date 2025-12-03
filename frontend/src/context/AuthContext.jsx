import { createContext, useEffect, useState } from "react";
import { getStoredToken, storeToken, clearToken } from "../utils/storage";
import axiosClient from "../api/axiosClient";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    accessToken: getStoredToken(),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth.accessToken) return;

      try {
        const res = await axiosClient.get("/user/me");
        setAuth((prev) => ({ ...prev, user: res.data }));
      } catch {
        clearToken();
      }
    };

    fetchProfile();
  }, []);

  const login = (token) => {
    storeToken(token);
    setAuth({ ...auth, accessToken: token });
  };

  const logout = () => {
    clearToken();
    setAuth({ user: null, accessToken: null });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
