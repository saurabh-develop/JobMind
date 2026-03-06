import { createContext, useState, useEffect } from "react";
import { refreshApi, getMeApi } from "../api/auth.api";
import { setAccessToken } from "../api/axiosClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const initializeAuth = async () => {
    try {
      const { data } = await refreshApi();
      setAccessToken(data.accessToken);

      const me = await getMeApi();
      setUser(me.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
