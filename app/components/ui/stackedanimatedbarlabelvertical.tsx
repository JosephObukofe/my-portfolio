"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { getBarChartLabelClass } from "@/utils/typography";
import { useTheme } from "next-themes";
import clsx from "clsx";

type StackedAnimatedBarLabelProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  value?: number | string;
  payload?: any;
  dataKey?: string;
  isVertical?: boolean;
};

export function StackedAnimatedBarLabel({
  x,
  y,
  width,
  height,
  value,
  payload,
  dataKey,
  isVertical = true,
}: StackedAnimatedBarLabelProps) {
  const [hovered, setHovered] = React.useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Don't show labels for baseline bars, gaps, etc.
  if (
    dataKey?.includes("_baseline") ||
    dataKey?.includes("_floating_gap") ||
    dataKey?.includes("__gap__")
  ) {
    return null;
  }

  // Determine stack type
  const getStackType = (): "positive" | "negative" | null => {
    if (dataKey?.includes("_change_positive")) return "positive";
    if (dataKey?.includes("_change_negative")) return "negative";
    return null;
  };

  const stackType = getStackType();

  // Debug logging
  console.log("StackedAnimatedBarLabel called:", {
    dataKey,
    stackType,
    value,
    hasPayload: !!payload,
  });

  // Only show labels for change stacks
  if (!stackType || !payload) {
    console.log("Filtered out - no stackType or payload");
    return null;
  }

  // Calculate percentage + arrow
  const getLabelContent = () => {
    const baseKey = dataKey
      ?.replace("_change_positive", "")
      .replace("_change_negative", "");
    const baselineKey = baseKey + "_baseline";

    const baselineValue = payload[baselineKey] || 0;
    const changeValue = (value as number) || 0;

    if (!changeValue || changeValue === 0) {
      return "-";
    }

    // Debug logging to help troubleshoot
    console.log("Debug label data:", {
      dataKey,
      baseKey,
      baselineKey,
      baselineValue,
      changeValue,
      payload: Object.keys(payload || {}),
    });

    const percentage =
      baselineValue > 0 ? Math.round((changeValue / baselineValue) * 100) : 0;
    const arrow = stackType === "positive" ? "↑" : "↓";

    return `${percentage}% ${arrow}`;
  };

  // Get stack-matched colors
  const getLabelColor = () => {
    switch (stackType) {
      case "positive":
        return isDark ? "#4ade80" : "#22c55e";
      case "negative":
        return isDark ? "#f87171" : "#ef4444";
      default:
        return isDark ? "#ffffff" : "#0f172a";
    }
  };

  const labelX = isVertical ? x! + width! / 2 : x! + width! + 12;
  const labelY = isVertical ? y! - 8 : y! + height! / 2;
  const labelContent = getLabelContent();
  const labelColor = getLabelColor();

  // For debugging - show a simple label if calculation fails
  const displayContent =
    labelContent === "-" ? `${stackType} ${value}` : labelContent;

  console.log("Final label content:", displayContent);

  // Always render something for debugging (remove the "-" filter temporarily)
  // if (labelContent === "-") {
  //   return (
  //     <rect
  //       x={x}
  //       y={y}
  //       width={width}
  //       height={height}
  //       fill="transparent"
  //     />
  //   );
  // }

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
      />
      <motion.text
        x={labelX}
        y={labelY}
        textAnchor={isVertical ? "middle" : "start"}
        alignmentBaseline="middle"
        className={clsx(getBarChartLabelClass())}
        fill={labelColor}
        initial={{ opacity: 0, y: -4 }}
        animate={
          hovered ? { opacity: 1, y: isVertical ? -8 : 0 } : { opacity: 0 }
        }
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {displayContent}
      </motion.text>
    </>
  );
}
