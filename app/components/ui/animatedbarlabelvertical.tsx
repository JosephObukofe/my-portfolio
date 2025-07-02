"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { getBarChartLabelClass } from "@/utils/typography";

type AnimatedBarLabelProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  value?: number | string;
  isVertical?: boolean;
};

export function AnimatedBarLabel({
  x,
  y,
  width,
  height,
  value,
  isVertical = true,
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
        className={clsx(getBarChartLabelClass())}
        fill={isDark ? "#ffffff" : "#0f172a"}
        initial={{ opacity: 0, y: -4 }}
        animate={
          hovered ? { opacity: 1, y: isVertical ? -8 : 0 } : { opacity: 0 }
        }
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {value}
      </motion.text>
    </>
  );
}
