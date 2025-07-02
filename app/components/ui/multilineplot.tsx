"use client";

import * as React from "react";
import { useInView } from "react-intersection-observer";
import { useTheme } from "next-themes";
import { getChartTextClass } from "@/utils/typography";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

type MultiLinePlotProps = {
  data: any[];
  xKey: string;
  yKeys: string[];
  height?: number;
  strokeColors?: Record<string, string>; // Optional custom colors
  strokeWidth?: number;
};

export function MultiLinePlotChart({
  data,
  xKey,
  yKeys,
  height = 400,
  strokeColors = {},
  strokeWidth = 1,
}: MultiLinePlotProps) {
  const { resolvedTheme } = useTheme();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [chartKey, setChartKey] = React.useState<string>("");

  React.useEffect(() => {
    if (resolvedTheme) {
      const uniqueId = `multiline-${resolvedTheme}-${Math.random()
        .toString(36)
        .substring(2, 8)}`;
      setChartKey(uniqueId);
    }
  }, [resolvedTheme]);

  if (!resolvedTheme || !inView || !chartKey) {
    return (
      <div ref={ref} className="w-full max-w-3xl mx-auto" style={{ height }} />
    );
  }

  const isDark = resolvedTheme === "dark";

  // Base palette
  const baseColors = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#a855f7",
    "#ec4899",
    "#22d3ee",
    "#8b5cf6",
    "#14b8a6",
    "#eab308",
    "#f97316",
    "#0ea5e9",
    "#4ade80",
    "#6366f1",
    "#db2777",
    "#7c3aed",
    "#be123c",
    "#0891b2",
    "#059669",
    "#d946ef",
  ];

  // Lighten/darken for theme if needed
  const themedColor = (hex: string) => (isDark ? lightenHex(hex, 0.3) : hex);

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} key={chartKey}>
          <XAxis
            dataKey={xKey}
            axisLine={false}
            tickLine={false}
            padding={{ left: 18, right: 18 }}
            tick={{ className: getChartTextClass() }}
            tickMargin={20}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ className: getChartTextClass() }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#0f172a" : "#f9fafb",
              borderRadius: "0.5rem",
              border: "none",
              color: isDark ? "#ffffff" : "#0f172a",
              fontFamily: "Space Grotesk",
            }}
            cursor={{
              stroke: isDark ? "#ffffff44" : "#0f172a44",
              strokeDasharray: "3 3",
            }}
          />
          <Legend
            iconType="line"
            wrapperStyle={{
              fontSize: "0.875rem",
              paddingTop: "3rem",
              fontFamily: "Space Grotesk",
              color: isDark ? "#ffffff" : "#0f172a",
            }}
          />

          {yKeys.map((key, idx) => {
            const color =
              strokeColors[key] ??
              themedColor(baseColors[idx % baseColors.length]);
            return (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                strokeWidth={strokeWidth}
                dot={false}
                activeDot={false}
                animationDuration={800}
                animationBegin={100}
                animationEasing="ease-out"
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Utility to lighten a hex color (0–1 scale)
function lightenHex(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.floor(((num >> 16) & 255) + 255 * amount));
  const g = Math.min(255, Math.floor(((num >> 8) & 255) + 255 * amount));
  const b = Math.min(255, Math.floor((num & 255) + 255 * amount));
  return `rgb(${r}, ${g}, ${b})`;
}
