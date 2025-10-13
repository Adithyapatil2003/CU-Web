"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo, // Keeping useMemo for BASE_URL calculation
  useEffect,
} from "react";
import { useQueryClient } from "@tanstack/react-query"; // Keeping useQueryClient for cache clearing/invalidation
import toast from "react-hot-toast";
// Removed: import axios, { type AxiosInstance } from "axios"; // Replaced with fetch

// --- TYPES (Simplified/Manual) ---

interface User {
  _id: string;
  name: string | null;
  email: string;
  phone: string | null;
  company: string | null;
  position: string | null;
  profileImage: string | null;
  role: "admin" | "user";
  permissions: string[];
}

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  company?: string | null;
  position?: string | null;
}

interface UpdateProfileInput {
  name?: string;
  phone?: string | null;
  company?: string | null;
  position?: string | null;
  profileImage?: string | null;
}

// Define the shape of the context value
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  userRole: "admin" | "user";
  isAdmin: boolean;
  isTapOnnUser: boolean;
  // actions
  login: (
    credentials: LoginInput,
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    userData: RegisterInput,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (
    profileData: UpdateProfileInput,
  ) => Promise<{ success: boolean; error?: string }>;
  hasPermission: (permission: string) => boolean;
  // Removed: api: AxiosInstance; // Expose the configured Axios instance
}

// Initialize context with undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // --- Environment Variables and API Setup (Base URL only) ---

  const isDevServer =
    typeof window !== "undefined" &&
    (window.location.port === "3000" || window.location.port === "3001");

  // Calculate BASE_URL once
  const BASE_URL = useMemo(() => {
    const apiBaseUrl = isDevServer
      ? "/api"
      : process.env.NEXT_PUBLIC_API_URL || "/api";

    // Ensure the BASE_URL doesn't end with a slash
    return apiBaseUrl.endsWith("/") ? apiBaseUrl.slice(0, -1) : apiBaseUrl;
  }, [isDevServer]);

  const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  // Stable logout function
  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("taponn-token");
    }
    // Removed: delete api.defaults.headers.common["Authorization"];
    setUser(null);
    queryClient.clear();
    toast.success("Logged out successfully");
  }, [queryClient]);

  // --- Custom Fetch Wrapper (Axios replacement) ---
  const fetchWrapper = useCallback(
    async (
      endpoint: string,
      method: string = "GET",
      data?: any,
      skipAuthCheck: boolean = false, // Use for /auth/login and /auth/register
    ) => {
      const url = `${BASE_URL}/${endpoint.startsWith("/") ? endpoint.slice(1) : endpoint}`;
      const token = localStorage.getItem("taponn-token");

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (token && !skipAuthCheck) {
        // Attach token for all non-login/register requests
        headers["Authorization"] = token.startsWith("Bearer ")
          ? token
          : `Bearer ${token}`;
      }

      const config: RequestInit = {
        method,
        headers,
        cache: "no-store", // Important for fresh data in Next.js environments
      };

      if (data && method !== "GET" && method !== "HEAD") {
        config.body = JSON.stringify(data);
      }

      // 1. Execute fetch
      const response = await fetch(url, config);

      // --- Unified Error Handling for non-2xx responses ---
      if (!response.ok) {
        // 1a. Handle 401 globally (Interceptor replacement)
        if (response.status === 401) {
          // Check if it's the login/register endpoint. If not, log out.
          if (!url.includes("/auth/login") && !url.includes("/auth/register")) {
            console.log("401 error detected, logging out");
            logout();
          }
        }

        let errorData: any = {};
        let rawText: string | null = null;

        // Fix: Use response.text() first to safely read the body and prevent
        // runtime errors if the response is empty or non-JSON.
        try {
          rawText = await response.text();
          errorData = JSON.parse(rawText);
        } catch (e) {
          // Parsing failed (body was not valid JSON, or empty)
        }

        // Throw the most descriptive error message
        const message =
          errorData.message ||
          rawText ||
          response.statusText ||
          `Request failed with status ${response.status}`;

        throw new Error(message);
      }

      // 4. Return JSON body (or null if 204 No Content)
      if (response.status === 204) {
        return null;
      }

      return response.json();
    },
    [BASE_URL, logout], // Dependencies: stable BASE_URL and stable logout
  );

  // --- Initial Auth Check (Imperative Effect) ---

  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window === "undefined") {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("taponn-token");
      if (!token) {
        console.log("No token found in localStorage");
        setLoading(false);
        return;
      }

      try {
        console.log("Checking authentication with token.");

        // Use fetchWrapper, expecting { user: User | null } or User
        const data = await fetchWrapper("auth/me");

        // Normalize the response structure
        const me: User | null = data?.user ?? data ?? null;

        if (me && me.email) {
          // Basic check for a valid user object
          setUser(me);
          console.log("User authenticated:", me.email);
        } else {
          console.log("No valid user data returned, clearing token.");
          logout();
        }
      } catch (error) {
        console.error("Auth check error (fetch failed):", error);
        // logout is handled by fetchWrapper on 401, but we ensure it's logged out on any fetch error.
        logout();
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [logout, fetchWrapper]);

  // --- Actions (Using Fetch Wrapper) ---

  const login = async (credentials: LoginInput) => {
    try {
      // skipAuthCheck is true for login
      const response = await fetchWrapper(
        "auth/login",
        "POST",
        credentials,
        true,
      );

      const token = response?.token;
      const serverUser = response?.user;

      if (!token || !serverUser) {
        throw new Error("Invalid login response: missing token or user");
      }

      // Store token and set user
      localStorage.setItem("taponn-token", token);

      setUser(serverUser);
      queryClient.clear(); // Clear old queries that might be stale/unauthorized

      toast.success("Welcome back!");
      return { success: true };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Login failed. Please check your credentials.";

      console.error("Login Error:", error);

      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (userData: RegisterInput) => {
    try {
      if (typeof window === "undefined")
        throw new Error("Registration failed: Not in browser environment.");

      // Handle Demo Mode and Offline Fallback (logic retained)
      if (DEMO_MODE || !navigator.onLine) {
        const isAdmin =
          userData.email?.toLowerCase().includes("admin") ||
          userData.email?.toLowerCase().includes("taponn");
        const demoUser: User = {
          _id: `${isAdmin ? "admin-user" : "demo-user"}-${Date.now()}`,
          name: userData.name,
          email: userData.email,
          role: isAdmin ? "admin" : "user",
          permissions: isAdmin
            ? ["qr_generate", "card_manage", "user_manage", "analytics"]
            : ["profile_view", "card_purchase"],
          phone: userData.phone ?? null,
          company: userData.company ?? null,
          position: userData.position ?? null,
          profileImage: null,
        };
        const demoToken = "demo-token-" + Date.now();
        localStorage.setItem("taponn-token", demoToken);
        setUser(demoUser);
        toast.success("Account created successfully! (Demo Mode)");
        return { success: true };
      }

      // Execute fetch call (skipAuthCheck is true for register)
      const response = await fetchWrapper(
        "auth/register",
        "POST",
        userData,
        true,
      );

      const { token, user: serverUser } = response;

      if (!token || !serverUser) {
        throw new Error("Invalid register response: missing token or user");
      }

      localStorage.setItem("taponn-token", token);

      setUser(serverUser);
      queryClient.clear(); // Clear old queries

      toast.success("Account created successfully!");
      return { success: true };
    } catch (error) {
      // Check for Network/Server error demo fallback
      const message =
        error instanceof Error ? error.message : "Registration failed.";

      const isNetworkOrServerError =
        error instanceof Error &&
        (error.message.includes("Failed to fetch") || // Catch native network errors
          error.message.includes("50")); // Catch status codes 5xx from wrapper message

      if (isNetworkOrServerError) {
        const isAdmin =
          userData.email?.toLowerCase().includes("admin") ||
          userData.email?.toLowerCase().includes("taponn");
        const demoUser: User = {
          _id: `${isAdmin ? "admin-user" : "demo-user"}-${Date.now()}`,
          name: userData.name,
          email: userData.email,
          role: isAdmin ? "admin" : "user",
          permissions: isAdmin
            ? ["qr_generate", "card_manage", "user_manage", "analytics"]
            : ["profile_view", "card_purchase"],
          phone: userData.phone ?? null,
          company: userData.company ?? null,
          position: userData.position ?? null,
          profileImage: null,
        };
        const demoToken = "demo-token-" + Date.now();
        localStorage.setItem("taponn-token", demoToken);
        setUser(demoUser);
        toast.success(
          "Account created successfully! (Demo Mode - Backend Offline)",
        );
        return { success: true };
      }

      console.error("Registration Error:", error);
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const updateProfile = async (profileData: UpdateProfileInput) => {
    try {
      const nextUser = await fetchWrapper(
        "/auth/update-details",
        "PUT",
        profileData,
      );
      // Assuming the response returns the updated user object directly or wrapped in 'user'
      const updatedUser: User | null = nextUser?.user ?? nextUser ?? null;

      if (updatedUser) {
        setUser(updatedUser);
      }

      toast.success("Profile updated successfully!");
      return { success: true };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Profile update failed";

      console.error("Update Profile Error:", error);
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const hasPermission = (permission: string) => {
    return Boolean(user?.permissions?.includes(permission));
  };

  const value: AuthContextType = {
    // state
    user,
    loading,
    isAuthenticated: Boolean(user),
    userRole: user?.role || "user",
    isAdmin: user?.role === "admin",
    isTapOnnUser: Boolean(user),

    // actions
    login,
    register,
    logout,
    updateProfile,
    hasPermission,
    // Removed: api,
  };

  // We wrap the children with the provider only when the initial user check is complete.
  if (loading) {
    // Return a minimal loading state (you should replace this with a proper spinner component)
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Loading authentication...
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
