"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
  plan: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null, token: null, loading: true,
  login: async () => ({ ok: false }),
  signup: async () => ({ ok: false }),
  logout: () => {},
});

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("curriculumos_token");
    if (saved) {
      setToken(saved);
      fetch(`${BACKEND}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${saved}` },
      })
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          if (data?.id) setUser(data);
          else { localStorage.removeItem("curriculumos_token"); setToken(null); }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  async function login(email: string, password: string) {
    try {
      const r = await fetch(`${BACKEND}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!r.ok) {
        const e = await r.json().catch(() => ({}));
        return { ok: false, error: e.detail || "Invalid email or password" };
      }
      const d = await r.json();
      localStorage.setItem("curriculumos_token", d.access_token);
      setToken(d.access_token);
      setUser(d.user);
      return { ok: true };
    } catch {
      return { ok: false, error: "Cannot reach server. Make sure the backend is running." };
    }
  }

  async function signup(email: string, password: string, name: string) {
    try {
      const r = await fetch(`${BACKEND}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      if (!r.ok) {
        const e = await r.json().catch(() => ({}));
        return { ok: false, error: e.detail || "Registration failed" };
      }
      const d = await r.json();
      localStorage.setItem("curriculumos_token", d.access_token);
      setToken(d.access_token);
      setUser(d.user);
      return { ok: true };
    } catch {
      return { ok: false, error: "Cannot reach server. Make sure the backend is running." };
    }
  }

  function logout() {
    localStorage.removeItem("curriculumos_token");
    setToken(null);
    setUser(null);
    router.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
