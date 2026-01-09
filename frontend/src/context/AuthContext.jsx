import { createContext, useEffect, useMemo, useState } from "react";
import { loginApi, logoutApi, meApi } from "../api/auth.api";
import { setAccessToken, clearAuth } from "../utils/helpers";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (data) => {
    try {
      const res = await loginApi(data);
      setAccessToken(res.accessToken);
      setUser(res.user);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      clearAuth();
      setUser(null);
    }
  };

  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       const { data } = meApi();
  //       setUser(data.user);
  //     } catch {
  //       clearAuth();
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   init();
  // }, [user]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      loading,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
