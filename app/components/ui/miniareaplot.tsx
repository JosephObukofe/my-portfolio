"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

// Mini tooltip for the compact chart
const MiniTooltip = ({
  active,
  payload,
  coordinate,
}: {
  active?: boolean;
  payload?: any[];
  coordinate?: { x: number; y: number };
}) => {
  const { resolvedTheme } = useTheme();
  const shouldRender = active && payload && payload.length > 0;
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (coordinate && active) {
      setPos(coordinate);
    }
  }, [coordinate?.x, coordinate?.y, active]);

  if (!shouldRender || !coordinate) return null;

  const isDark = resolvedTheme === "dark";
  const bgColor = isDark ? "#1f2937" : "#ffffff";
  const textColor = isDark ? "#ffffff" : "#000000";
  const borderColor = isDark ? "#374151" : "#e5e7eb";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="mini-tooltip"
        initial={{ opacity: 0, x: coordinate.x, y: coordinate.y }}
        animate={{ opacity: 1, x: pos.x, y: pos.y }}
        exit={{ opacity: 0 }}
        transition={{
          x: { type: "spring", stiffness: 150, damping: 25 },
          y: { type: "spring", stiffness: 150, damping: 25 },
          opacity: { duration: 0.15 },
        }}
        style={{
          position: "absolute",
          transform: "translate(-50%, -120%)",
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        <div
          style={{
            padding: "0.25rem 0.5rem",
            borderRadius: "6px",
            backgroundColor: bgColor,
            color: textColor,
            border: `1px solid ${borderColor}`,
            fontSize: "0.7rem",
            fontWeight: 500,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        >
          {payload[0]?.value}%
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Mini area chart component
export function MiniAreaChart({
  data,
  height = 24,
}: {
  data: any[];
  height?: number;
}) {
  const { resolvedTheme } = useTheme();
  const [patternId, setPatternId] = React.useState<string>("");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (resolvedTheme && mounted) {
      const stablePatternId = `mini-uptime-pattern-${resolvedTheme}`;
      setPatternId(stablePatternId);
    }
  }, [resolvedTheme, mounted]);

  if (!mounted || !resolvedTheme || !patternId) {
    return (
      <div
        className="bg-muted/20 rounded animate-pulse"
        style={{ height, width: "100%" }}
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const strokeColor = isDark ? "#ffffff" : "#0f172a";

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
        >
          <defs>
            {/* Hash pattern for consistency */}
            <pattern
              id={patternId}
              patternUnits="userSpaceOnUse"
              width={4}
              height={4}
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y="0"
                x2="0"
                y2="4"
                stroke={strokeColor}
                strokeWidth={1.5}
                strokeOpacity={0.3}
                shapeRendering="crispEdges"
              />
            </pattern>

            {/* Fade gradient for the pattern */}
            <linearGradient
              id={`${patternId}-fade`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="white" stopOpacity={1} />
              <stop offset="70%" stopColor="white" stopOpacity={1} />
              <stop offset="100%" stopColor="white" stopOpacity={0.2} />
            </linearGradient>

            {/* Mask for the pattern */}
            <mask id={`${patternId}-mask`}>
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill={`url(#${patternId}-fade)`}
              />
            </mask>
          </defs>

          <Tooltip
            content={<MiniTooltip />}
            cursor={{
              stroke: strokeColor,
              strokeWidth: 1,
              strokeOpacity: 0.3,
              strokeDasharray: "2 2",
            }}
          />

          <Area
            type="monotone"
            dataKey="uptime"
            stroke={strokeColor}
            strokeWidth={1}
            fill={`url(#${patternId})`}
            fillOpacity={1}
            mask={`url(#${patternId}-mask)`}
            dot={false}
            activeDot={{
              r: 2,
              fill: strokeColor,
              stroke: isDark ? "#000000" : "#ffffff",
              strokeWidth: 1,
            }}
            animationDuration={600}
            animationBegin={100}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
