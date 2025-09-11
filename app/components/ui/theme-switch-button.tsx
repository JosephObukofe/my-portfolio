"use client";

import * as React from "react";
import { useTheme } from "next-themes";

interface ThemeToggleDotProps {
  className?: string;
}

export function ThemeToggleDot({ className = "" }: ThemeToggleDotProps) {
  const { theme, setTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = React.useState(false);

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
    if (!theme || isTransitioning) return;

    setIsTransitioning(true);

    // Add a very fast transition class for coordinated switching
    document.documentElement.classList.add("theme-switching");

    // Switch theme immediately
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Remove transition class very quickly for snappy feel
    setTimeout(() => {
      document.documentElement.classList.remove("theme-switching");
      setIsTransitioning(false);
    }, 150);
  }, [theme, isTransitioning]);

  return (
    <>
      {/* Fast, coordinated theme switching */}
      <style jsx global>{`
        .theme-switching * {
          transition: background-color 100ms ease-out, color 100ms ease-out,
            border-color 100ms ease-out !important;
        }
      `}</style>

      <button
        onClick={toggleTheme}
        disabled={isTransitioning}
        aria-label="Toggle Theme"
        className={`
          group relative flex h-6 w-6 items-center justify-center rounded-full 
          transition-opacity hover:opacity-80
          ${isTransitioning ? "cursor-wait" : "cursor-pointer"}
          ${className}
        `}
      >
        {theme !== null && (
          <div
            className={`
              h-4 w-4 rounded-full transition-colors duration-200 ease-in-out
              ${theme === "light" ? "bg-black" : "bg-white"}
              ${isTransitioning ? "animate-pulse" : ""}
            `}
          />
        )}
      </button>
    </>
  );
}
