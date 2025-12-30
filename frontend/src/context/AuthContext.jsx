import { createContext, useEffect, useState } from "react";
import { loginApi, logoutApi, meApi } from "../api/auth.api";
import { setAccessToken, clearAuth } from "../utils/helpers";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (data) => {
    const res = await loginApi(data);
    setAccessToken(res.accessToken);
    setUser.apply(res.user);
  };

  const logout = async () => {
    await logoutApi();
    clearAuth();
    setUser(null);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await meApi();
        setUser(data.user);
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
