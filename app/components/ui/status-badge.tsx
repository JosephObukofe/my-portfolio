"use client";

import * as React from "react";
import { useTheme } from "next-themes";

type StatusType = "Completed" | "Ongoing" | "Draft" | "Skipped" | "Planned";

const statusColors: Record<
  StatusType,
  {
    light: string;
    dark: string;
    lightBackground: string;
    darkBackground: string;
  }
> = {
  Completed: {
    light: "#22C55E",
    dark: "#4ADE80",
    lightBackground: "rgba(34, 197, 94, 0.12)",
    darkBackground: "rgba(74, 222, 128, 0.15)",
  },
  Ongoing: {
    light: "#3B82F6",
    dark: "#60A5FA",
    lightBackground: "rgba(59, 130, 246, 0.12)",
    darkBackground: "rgba(96, 165, 250, 0.15)",
  },
  Draft: {
    light: "#F97316",
    dark: "#FB923C",
    lightBackground: "rgba(249, 115, 22, 0.12)",
    darkBackground: "rgba(251, 146, 60, 0.15)",
  },
  Skipped: {
    light: "#A1A1AA",
    dark: "#D4D4D8",
    lightBackground: "rgba(161, 161, 170, 0.12)",
    darkBackground: "rgba(212, 212, 216, 0.15)",
  },
  Planned: {
    light: "#8B5CF6",
    dark: "#A78BFA",
    lightBackground: "rgba(139, 92, 246, 0.12)",
    darkBackground: "rgba(167, 139, 250, 0.15)",
  },
};

export function StatusBadge({ status }: { status: StatusType }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <span className="inline-flex items-center gap-1.5 pl-2 pr-2.5 py-0.5 rounded-full text-[0.65rem] sm:text-[0.725rem] font-grotesk text-neutral-800 dark:text-neutral-200 bg-gray-100 dark:bg-gray-800">
        <span className="inline-block rounded-full w-[0.3rem] h-[0.3rem] sm:w-[0.5rem] sm:h-[0.5rem] bg-gray-400" />
        <span>{status}</span>
      </span>
    );
  }

  const isDark = resolvedTheme === "dark";
  const dotColor = statusColors[status][isDark ? "dark" : "light"];
  const backgroundColor =
    statusColors[status][isDark ? "darkBackground" : "lightBackground"];

  return (
    <span
      className="inline-flex items-center gap-1.5 pl-2 pr-2.5 py-0.5 rounded-full text-[0.75rem] sm:text-[0.85rem] font-grotesk text-neutral-800 dark:text-neutral-200 transition-colors duration-200"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <span
        className="inline-block rounded-full w-[0.3rem] h-[0.3rem] sm:w-[0.4rem] sm:h-[0.4rem] flex-shrink-0"
        style={{
          backgroundColor: dotColor,
        }}
      />
      <span>{status}</span>
    </span>
  );
}
