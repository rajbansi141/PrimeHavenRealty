import { createContext, useContext, useEffect, useState } from "react";
import { meRequest } from "../utils/api.js";

const AuthContext = createContext(undefined);

const STORAGE_KEY = "primehaven-token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(STORAGE_KEY);
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    meRequest(token)
      .then((u) => setUser(u))
      .catch(() => {
        setToken(null);
        window.localStorage.removeItem(STORAGE_KEY);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const login = (newToken, u) => {
    setToken(newToken);
    setUser(u);
    window.localStorage.setItem(STORAGE_KEY, newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

