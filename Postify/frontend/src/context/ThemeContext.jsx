import { createContext, useContext, useEffect, useRef, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const transitionTimerRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
      document.documentElement.classList.remove("theme-transition");
    };
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    root.classList.add("theme-transition");
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    transitionTimerRef.current = window.setTimeout(() => {
      root.classList.remove("theme-transition");
      transitionTimerRef.current = null;
    }, 300);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);