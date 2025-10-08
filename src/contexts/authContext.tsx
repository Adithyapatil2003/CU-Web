"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import React from "react";
import { api } from "@/trpc/server";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  permissions: string[];
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
}

interface UpdateProfileData {
  name?: string;
  email?: string;
  // Add other updatable fields as needed
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  userRole: "admin" | "user" | "guest";
  isAdmin: boolean;
  isTapOnnUser: boolean;

  login: (
    credentials: LoginCredentials,
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    userData: RegisterData,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (
    profileData: UpdateProfileData,
  ) => Promise<{ success: boolean; error?: string }>;
  hasPermission: (permission: string) => boolean;

  api: TPrpcClient;
}

const initialContextValue: AuthContextValue = {
  user: null,
  loading: true,
  isAuthenticated: false,
  userRole: "guest",
  isAdmin: false,
  isTapOnnUser: false,

  login: async () => ({ success: false, error: "Provider not initialized" }),
  register: async () => ({ success: false, error: "Provider not initialized" }),
  logout: () => {},
  updateProfile: async () => ({
    success: false,
    error: "Provider not initialized",
  }),
  hasPermission: () => false,

  api: api,
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const queryClient = useQueryClient();

  const NEXT_PUBLIC_DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  const DEMO_MODE = NEXT_PUBLIC_DEMO_MODE;

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("taponn-token");
      localStorage.removeItem("mock-user");
    }
    setUser(null);
    queryClient.clear();
    toast.success("Logged out successfully");
  }, [queryClient]);

  useEffect(() => {
    let token: string | null = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("taponn-token");
    }

    if (!token) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const data = await api.auth.me.query();

        const me = (data as any)?.user ?? (data as any)?.data ?? data;

        if (me && me.email) {
          setUser(me as User);
        } else {
          logout();
        }
      } catch (error) {
        console.error("tRPC Auth check failed:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [logout]);

  const login = useCallback(
    async (
      credentials: LoginCredentials,
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        const data = await api.auth.login.mutate(credentials);

        const token: string | undefined = (data as any)?.token;
        const serverUser: User | undefined =
          (data as any)?.user ?? (data as any)?.data ?? data;

        if (!token || !serverUser || !serverUser.email) {
          throw new Error("Invalid login response: missing token or user data");
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("taponn-token", token);
        }
        setUser(serverUser);

        toast.success("Welcome back!");
        return { success: true };
      } catch (error) {
        const message =
          (error as Error).message ||
          "Login failed due to network or server error.";
        toast.error(message);
        return { success: false, error: message };
      }
    },
    [],
  );

  const register = useCallback(
    async (
      userData: RegisterData,
    ): Promise<{ success: boolean; error?: string }> => {
      if (DEMO_MODE) {
        const isAdmin = userData.email?.toLowerCase().includes("admin");
        const demoUser: User = {
          _id: `demo-user-${Date.now()}`,
          name: userData.name,
          email: userData.email,
          role: isAdmin ? "admin" : "user",
          permissions: isAdmin
            ? ["qr_generate", "card_manage", "user_manage", "analytics"]
            : ["profile_view", "card_purchase"],
        };
        const demoToken = "demo-token-" + Date.now();

        if (typeof window !== "undefined") {
          localStorage.setItem("taponn-token", demoToken);
          localStorage.setItem("mock-user", JSON.stringify(demoUser));
        }
        setUser(demoUser);
        toast.success("Account created successfully! (Demo Mode)");
        return { success: true };
      }

      try {
        const data = await api.auth.register.mutate(userData);
        const token: string | undefined = (data as any)?.token;
        const serverUser: User | undefined =
          (data as any)?.user ?? (data as any)?.data ?? data;

        if (!token || !serverUser || !serverUser.email) {
          throw new Error(
            "Invalid register response: missing token or user data",
          );
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("taponn-token", token);
        }
        setUser(serverUser);
        toast.success("Account created successfully!");
        return { success: true };
      } catch (error) {
        const message =
          (error as Error).message ||
          "Registration failed due to network or server error.";
        toast.error(message);
        return { success: false, error: message };
      }
    },
    [DEMO_MODE],
  );

  const updateProfile = useCallback(
    async (
      profileData: UpdateProfileData,
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        const data = await api.auth.updateDetails.mutate(profileData);
        const nextUser: User | undefined =
          (data as any)?.user ?? (data as any)?.data ?? data;

        if (nextUser && nextUser.email) {
          setUser(nextUser);
          toast.success("Profile updated successfully!");
          return { success: true };
        }
        throw new Error("Update returned invalid user data.");
      } catch (error) {
        const message = (error as Error).message || "Profile update failed";
        toast.error(message);
        return { success: false, error: message };
      }
    },
    [],
  );

  const hasPermission = useCallback(
    (permission: string): boolean => {
      return Boolean(user?.permissions?.includes(permission));
    },
    [user],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      userRole: user?.role || "guest",
      isAdmin: user?.role === "admin",
      isTapOnnUser: Boolean(user),

      login,
      register,
      logout,
      updateProfile,
      hasPermission,

      api: api,
    }),
    [user, loading, login, register, logout, updateProfile, hasPermission],
  );

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
