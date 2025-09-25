"use client";

import * as React from "react";
import { useTheme } from "next-themes";

type GradeType =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D"
  | "F";

const gradeColors: Record<
  GradeType,
  {
    light: string;
    dark: string;
    lightBackground: string;
    darkBackground: string;
  }
> = {
  "A+": {
    light: "#22C55E", // green 500
    dark: "#4ADE80",
    lightBackground: "rgba(34, 197, 94, 0.12)",
    darkBackground: "rgba(74, 222, 128, 0.15)",
  },
  A: {
    light: "#16A34A",
    dark: "#22C55E",
    lightBackground: "rgba(22, 163, 74, 0.12)",
    darkBackground: "rgba(34, 197, 94, 0.15)",
  },
  "A-": {
    light: "#15803D",
    dark: "#16A34A",
    lightBackground: "rgba(21, 128, 61, 0.12)",
    darkBackground: "rgba(22, 163, 74, 0.15)",
  },
  "B+": {
    light: "#65A30D",
    dark: "#84CC16",
    lightBackground: "rgba(101, 163, 13, 0.12)",
    darkBackground: "rgba(132, 204, 22, 0.15)",
  },
  B: {
    light: "#CA8A04",
    dark: "#EAB308",
    lightBackground: "rgba(202, 138, 4, 0.12)",
    darkBackground: "rgba(234, 179, 8, 0.15)",
  },
  "B-": {
    light: "#D97706",
    dark: "#F59E0B",
    lightBackground: "rgba(217, 119, 6, 0.12)",
    darkBackground: "rgba(245, 158, 11, 0.15)",
  },
  "C+": {
    light: "#EA580C",
    dark: "#F97316",
    lightBackground: "rgba(234, 88, 12, 0.12)",
    darkBackground: "rgba(249, 115, 22, 0.15)",
  },
  C: {
    light: "#DC2626",
    dark: "#EF4444",
    lightBackground: "rgba(220, 38, 38, 0.12)",
    darkBackground: "rgba(239, 68, 68, 0.15)",
  },
  "C-": {
    light: "#B91C1C",
    dark: "#DC2626",
    lightBackground: "rgba(185, 28, 28, 0.12)",
    darkBackground: "rgba(220, 38, 38, 0.15)",
  },
  D: {
    light: "#991B1B",
    dark: "#B91C1C",
    lightBackground: "rgba(153, 27, 27, 0.12)",
    darkBackground: "rgba(185, 28, 28, 0.15)",
  },
  F: {
    light: "#7F1D1D",
    dark: "#991B1B",
    lightBackground: "rgba(127, 29, 29, 0.12)",
    darkBackground: "rgba(153, 27, 27, 0.15)",
  },
};

export function GradeBadge({ grade }: { grade: GradeType }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span className="inline-flex items-center gap-1.5 pl-2 pr-2.5 py-0.5 rounded-full text-[0.75rem] sm:text-[0.85rem] font-satoshi text-neutral-800 dark:text-neutral-200 bg-gray-100 dark:bg-gray-800">
        <span className="inline-block rounded-full w-[0.35rem] h-[0.35rem] sm:w-[0.45rem] sm:h-[0.45rem] bg-gray-400" />
        <span>{grade}</span>
      </span>
    );
  }

  const isDark = resolvedTheme === "dark";
  const dotColor = gradeColors[grade][isDark ? "dark" : "light"];
  const backgroundColor =
    gradeColors[grade][isDark ? "darkBackground" : "lightBackground"];

  return (
    <span
      className="inline-flex items-center gap-1.5 pl-2 pr-2.5 py-0.5 rounded-full text-[0.75rem] sm:text-[0.85rem] font-satoshi font-medium transition-colors duration-200"
      style={{
        backgroundColor,
      }}
    >
      <span
        className="inline-block rounded-full w-[0.35rem] h-[0.35rem] sm:w-[0.45rem] sm:h-[0.45rem] flex-shrink-0"
        style={{
          backgroundColor: dotColor,
        }}
      />
      <span>{grade}</span>
    </span>
  );
}
