"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { getBarChartLabelClass } from "@/utils/typography";
import { useTheme } from "next-themes";
import clsx from "clsx";

type AnimatedBarLabelProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  value?: number | string;
  payload?: any; // Access to the data row
  dataKey?: string; // Which stack this label belongs to
  isVertical?: boolean;
  stackType?: "baseline" | "positive" | "negative"; // For stacked charts
};

export function AnimatedBarLabel({
  x,
  y,
  width,
  height,
  value,
  payload,
  dataKey,
  isVertical = false,
  stackType,
}: AnimatedBarLabelProps) {
  const [hovered, setHovered] = React.useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Don't show labels for baseline bars in stacked charts
  if (stackType === "baseline") {
    return null;
  }

  // Calculate label content and color for stacked charts
  const getLabelContent = () => {
    if (!stackType || !payload) {
      return value; // Default behavior for regular bar charts
    }

    // For stacked charts, calculate percentage and direction
    const baselineKey =
      dataKey?.replace("_change_positive", "").replace("_change_negative", "") +
      "_baseline";
    const changeKey = dataKey
      ?.replace("_change_positive", "")
      .replace("_change_negative", "");

    const baselineValue = payload[baselineKey] || 0;
    const changeValue =
      stackType === "positive"
        ? payload[changeKey + "_change_positive"]
        : payload[changeKey + "_change_negative"];

    if (!changeValue || changeValue === 0) {
      return "-";
    }

    const percentage =
      baselineValue > 0 ? Math.round((changeValue / baselineValue) * 100) : 0;
    const arrow = stackType === "positive" ? "↑" : "↓";

    return `${percentage}% ${arrow}`;
  };

  // Get label color based on stack type
  const getLabelColor = () => {
    if (!stackType) {
      return isDark ? "#fff" : "#0f172a"; // Default color
    }

    switch (stackType) {
      case "positive":
        return isDark ? "#4ade80" : "#22c55e"; // Green
      case "negative":
        return isDark ? "#f87171" : "#ef4444"; // Red
      default:
        return isDark ? "#6b7280" : "#9ca3af"; // Gray
    }
  };

  const labelX = isVertical ? x! + width! / 2 : x! + width! + 12;
  const labelY = isVertical ? y! - 8 : y! + height! / 2;
  const labelContent = getLabelContent();
  const labelColor = getLabelColor();

  // Don't render if no content (like for zero changes)
  if (labelContent === "-" && stackType) {
    return (
      <rect x={x} y={y} width={width} height={height} fill="transparent" />
    );
  }

  return (
    <>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="transparent"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: "pointer" }}
      />
      <motion.text
        x={labelX}
        y={labelY}
        textAnchor={isVertical ? "middle" : "start"}
        alignmentBaseline="middle"
        initial={{ opacity: 0, x: isVertical ? 0 : -8, y: isVertical ? 8 : 0 }}
        animate={
          hovered
            ? { opacity: 1, x: isVertical ? 0 : 0, y: isVertical ? 0 : 0 }
            : { opacity: 0, x: isVertical ? 0 : -8, y: isVertical ? 8 : 0 }
        }
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={clsx(getBarChartLabelClass())}
        fill={labelColor}
        style={{
          fontWeight: stackType ? "600" : "400", // Bolder for stack labels
          fontSize: stackType ? "0.875rem" : undefined, // Slightly larger for stack labels
        }}
      >
        {labelContent}
      </motion.text>
    </>
  );
}
