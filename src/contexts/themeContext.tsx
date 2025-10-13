"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FC,
  type ReactNode,
  useCallback,
  useMemo,
} from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  theme: "dark" | "light";
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      // Return a default theme (e.g., false for light) during SSR
      return false;
    }

    const saved = localStorage.getItem("taponn-theme");
    if (saved) {
      return saved === "dark";
    }

    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    return false;
  });

  useEffect(() => {
    const themePreference: "dark" | "light" = isDark ? "dark" : "light";

    localStorage.setItem("taponn-theme", themePreference);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prevIsDark) => !prevIsDark);
  }, []);

  const value = useMemo<ThemeContextType>(
    () => ({
      isDark,
      toggleTheme,
      theme: isDark ? "dark" : ("light" as const),
    }),
    [isDark, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
