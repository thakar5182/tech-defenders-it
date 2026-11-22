"use client";
import React, { createContext, useContext, useEffect } from "react";

type Theme = "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.classList.remove("light");
      root.classList.add("dark");
      root.style.colorScheme = "dark";
      try {
        localStorage.removeItem("td_theme");
      } catch {}
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "dark", toggleTheme: () => {}, setTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
