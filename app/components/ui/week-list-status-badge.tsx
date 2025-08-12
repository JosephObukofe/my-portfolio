"use client";

import * as React from "react";
import { useTheme } from "next-themes";

type StatusType = "Completed" | "Ongoing" | "Draft" | "Skipped" | "Planned";

const statusColors: Record<StatusType, { light: string; dark: string }> = {
  Completed: { light: "#22C55E", dark: "#4ADE80" },
  Ongoing: { light: "#3B82F6", dark: "#60A5FA" },
  Draft: { light: "#F97316", dark: "#FB923C" },
  Skipped: { light: "#A1A1AA", dark: "#D4D4D8" },
  Planned: { light: "#8B5CF6", dark: "#A78BFA" },
};

export function WeekListStatusBadge({ status }: { status: StatusType }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[0.75rem] sm:text-[0.85rem] font-satoshi text-neutral-800 dark:text-neutral-200">
        <span className="inline-block rounded-full w-[0.3rem] h-[0.3rem] sm:w-[0.5rem] sm:h-[0.5rem] bg-gray-400" />
        <span>{status}</span>
      </span>
    );
  }

  const isDark = resolvedTheme === "dark";
  const dotColor = statusColors[status][isDark ? "dark" : "light"];

  return (
    <span className="inline-flex items-center gap-1.5 text-[0.75rem] sm:text-[0.85rem] font-satoshi text-neutral-800 dark:text-neutral-200">
      <span
        className="inline-block rounded-full w-[0.3rem] h-[0.3rem] sm:w-[0.5rem] sm:h-[0.5rem] flex-shrink-0"
        style={{
          backgroundColor: dotColor,
        }}
      />
      <span>{status}</span>
    </span>
  );
}
