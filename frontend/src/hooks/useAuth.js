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
        localStorage.setItem("user", JSON.stringify(res.data.user));
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
    async (name, email, password) => {
      setLoading(true);
      try {
        const res = await authApi.signup({ name, email, password });
        storage.saveAccessToken(res.data.accessToken);
        storage.saveRefreshToken(res.data.refreshToken);

        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        return {
          success: true,
          userId: res.data.userId,
        };
      } catch (err) {
        return {
          success: false,
          message: err.response?.data?.message || "Signup failed",
        };
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const logout = useCallback(() => {
    storage.clearAuth();
    localStorage.removeItem("user");
    setUser(null);
  }, [setUser]);

  const restoreSession = useCallback(async () => {
    const token = storage.getAccessToken();
    if (!token) return;

    setLoading(true);

    try {
      const res = await authApi.getMe();
      setUser(res.data.user);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }, [setUser, setLoading, logout]);

  const loginWithTokens = useCallback(
    (user, accessToken, refreshToken) => {
      storage.saveAccessToken(accessToken);
      storage.saveRefreshToken(refreshToken);
      setUser(user);
    },
    [setUser]
  );

  return {
    user,
    loading,
    login,
    signup,
    logout,
    restoreSession,
    isAuthenticated: Boolean(user),
    loginWithTokens,
  };
}

export default useAuth;
