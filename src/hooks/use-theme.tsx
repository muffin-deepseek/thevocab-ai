
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  // Check for system preference on mount
  useEffect(() => {
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("vocabTheme") as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPreference) {
      setTheme("dark");
    }
  }, []);

  // Update localStorage and apply theme when it changes
  useEffect(() => {
    localStorage.setItem("vocabTheme", theme);
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
