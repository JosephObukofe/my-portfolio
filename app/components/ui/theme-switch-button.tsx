"use client";

import * as React from "react";
import { useTheme } from "next-themes";

interface ThemeToggleDotProps {
  className?: string;
}

export function ThemeToggleDot({ className = "" }: ThemeToggleDotProps) {
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(savedTheme as "light" | "dark");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = React.useCallback(() => {
    if (!theme) return;
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className={`group relative flex h-6 w-6 items-center justify-center rounded-full transition-opacity hover:opacity-80 ${className}`}
    >
      {theme !== null && (
        <div
          className={`
            h-4 w-4 rounded-full transition-colors duration-300 ease-in-out
            ${theme === "light" ? "bg-black" : "bg-white"}
          `}
        />
      )}
    </button>
  );
}
