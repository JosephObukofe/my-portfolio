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
  isVertical?: boolean; // still supports vertical if reused elsewhere
};

export function AnimatedBarLabel({
  x,
  y,
  width,
  height,
  value,
  isVertical = false, // defaulting to horizontal here
}: AnimatedBarLabelProps) {
  const [hovered, setHovered] = React.useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const labelX = isVertical ? x! + width! / 2 : x! + width! + 12;
  const labelY = isVertical ? y! - 8 : y! + height! / 2;

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
        initial={{ opacity: 0, x: -8 }}
        animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={clsx(getBarChartLabelClass())}
        fill={isDark ? "#fff" : "#0f172a"}
      >
        {value}
      </motion.text>
    </>
  );
}
