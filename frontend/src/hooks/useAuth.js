import { useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import authApi from "../api/authApi";
import storage from "../utils/storage";

export function useAuth() {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  const login = useCallback(
    async (email, password) => {
      setLoading(true);

      try {
        const res = await authApi.login({ email, password });

        storage.saveAccessToken(res.data.accessToken);
        storage.saveRefreshToken(res.data.refreshToken);

        setUser(res.data.user);

        return { success: true };
      } catch (err) {
        return {
          success: false,
          message: err.response?.data?.message || "Login failed",
        };
      } finally {
        setLoading(false);
      }
    },
    [setUser, setLoading]
  );

  const signup = useCallback(
    async (data) => {
      setLoading(true);

      try {
        const res = await authApi.signup(data);

        storage.saveAccessToken(res.data.accessToken);
        storage.saveRefreshToken(res.data.refreshToken);

        setUser(res.data.user);

        return { success: true };
      } catch (err) {
        return {
          success: false,
          message: err.response?.data?.message || "Signup failed",
        };
      } finally {
        setLoading(false);
      }
    },
    [setUser, setLoading]
  );

  const logout = useCallback(() => {
    storage.clearAuth();
    setUser(null);
  }, [setUser]);

  const restoreSession = useCallback(async () => {
    const token = storage.getAccessToken();
    if (!token) return;

    setLoading(true);

    try {
      const res = await authApi.getMe();
      setUser(res.data.user);
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  }, [setUser, setLoading, logout]);

  return {
    user,
    loading,
    login,
    signup,
    logout,
    restoreSession,
    isAuthenticated: Boolean(user),
  };
}

export default useAuth;
