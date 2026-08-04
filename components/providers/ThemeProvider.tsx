"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggle: () => {},
  isDark: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Hardcoded to light mode only
  const theme: Theme = "light";
  
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }, []);

  const toggle = () => {
    // No-op to disable dark mode
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle, isDark: false }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
