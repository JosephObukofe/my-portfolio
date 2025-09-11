"use client";

import * as React from "react";
import { useInView } from "react-intersection-observer";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  getChartTextClass,
  getParagraphClass,
  getTooltipClass,
} from "@/utils/typography";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Tooltip as CustomTooltip } from "./tooltip";

// Simple tooltip component for mobile
const SimpleTooltip = ({
  active,
  payload,
  formatter,
  coordinate,
  suffix,
}: {
  active?: boolean;
  payload?: any[];
  formatter?: (value: any) => string;
  coordinate?: { x: number; y: number };
  suffix?: string;
}) => {
  const { className, style } = getTooltipClass();
  const shouldRender = active && payload && payload.length > 0;
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (coordinate && active) {
      setPos(coordinate);
    }
  }, [coordinate?.x, coordinate?.y, active]);

  if (!shouldRender || !coordinate) return null;

  const currentValue = payload[0]?.value;
  const formattedValue = formatter ? formatter(currentValue) : currentValue;
  const displayValue = `${formattedValue}${suffix ? ` ${suffix}` : ""}`;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="simple-tooltip"
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
          zIndex: 10,
        }}
      >
        <div
          className={className}
          style={{
            ...style,
            padding: "0.25rem 0.65rem",
            borderRadius: "9999px",
            backgroundColor: style?.backgroundColor ?? "#1f2937",
            minWidth: "fit-content",
            textAlign: "center",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {displayValue}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

type AreaPlotProps = {
  data: any[];
  xKey: string;
  yKey: string;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  fillMuted?: boolean;
  showGradient?: boolean; // Optional gradient fill
  showDots?: boolean; // Optional data point dots
  curveType?: "monotone" | "basis" | "linear"; // Curve type options
  suffix?: string; // Tooltip suffix
  metricName?: string; // Custom metric name for tooltip
};

export function AreaPlotChart({
  data,
  xKey,
  yKey,
  height = 400,
  strokeColor,
  strokeWidth = 1,
  strokeOpacity = 0.3,
  fillMuted = true,
  showGradient = false,
  showDots = false,
  curveType = "monotone",
  suffix = "",
  metricName,
}: AreaPlotProps) {
  const { resolvedTheme } = useTheme();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [patternId, setPatternId] = React.useState<string>("");
  const [gradientId, setGradientId] = React.useState<string>("");
  const [mounted, setMounted] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  // Ensure component is mounted before rendering
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Mobile detection
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkIsMobile();

    // Add resize listener
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // ✅ STABILITY FIX: Use stable pattern IDs (not random)
  React.useEffect(() => {
    if (resolvedTheme && mounted) {
      const stablePatternId = `stable-area-pattern-${resolvedTheme}-${yKey}`;
      const stableGradientId = `stable-area-gradient-${resolvedTheme}-${yKey}`;
      setPatternId(stablePatternId);
      setGradientId(stableGradientId);
    }
  }, [resolvedTheme, mounted, yKey]);

  // Show loading state until everything is ready
  if (!mounted || !resolvedTheme || !inView || !patternId) {
    return (
      <div
        ref={ref}
        className="w-full max-w-3xl mx-auto flex items-center justify-center"
        style={{ height }}
      >
        <div className={getParagraphClass({ responsive: true, muted: true })}>
          Loading chart...
        </div>
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";
  const dynamicStrokeColor = strokeColor ?? (isDark ? "#ffffff" : "#0f172a");

  // Determine fill based on options
  const getFillColor = () => {
    if (showGradient) return `url(#${gradientId})`;
    if (fillMuted) return `url(#${patternId})`;
    return dynamicStrokeColor;
  };

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto h-[250px] sm:h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            {/* Pattern fill for consistency with bar charts */}
            {fillMuted && (
              <>
                <pattern
                  id={patternId}
                  patternUnits="userSpaceOnUse"
                  width={6}
                  height={6}
                  patternTransform="rotate(45)"
                >
                  <line
                    x1="0"
                    y="0"
                    x2="0"
                    y2="6"
                    stroke={dynamicStrokeColor}
                    strokeWidth={2}
                    strokeOpacity={strokeOpacity}
                    shapeRendering="crispEdges"
                  />
                </pattern>

                {/* ADD THIS: Gradient for the mask that will fade the pattern */}
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

                {/* ADD THIS: Mask that uses the gradient */}
                <mask id={`${patternId}-mask`}>
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill={`url(#${patternId}-fade)`}
                  />
                </mask>
              </>
            )}

            {/* Optional gradient fill */}
            {showGradient && (
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={dynamicStrokeColor}
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor={dynamicStrokeColor}
                  stopOpacity={0.1}
                />
              </linearGradient>
            )}
          </defs>

          <XAxis
            dataKey={xKey}
            axisLine={false}
            tickLine={false}
            tickMargin={20}
            padding={{ left: 18, right: 18 }}
            tick={{ className: getChartTextClass() }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ className: getChartTextClass() }}
          />

          {/* Conditional Tooltip - Simple for mobile, Structured for desktop */}
          <Tooltip
            content={
              isMobile ? (
                <SimpleTooltip suffix={suffix} />
              ) : (
                <CustomTooltip suffix={suffix} metricName={metricName} />
              )
            }
            cursor={{
              stroke: dynamicStrokeColor,
              strokeWidth: 1,
              strokeOpacity: 0.3,
              strokeDasharray: "3 3",
            }}
          />

          <Area
            type={curveType}
            dataKey={yKey}
            stroke={dynamicStrokeColor}
            strokeWidth={strokeWidth}
            fill={getFillColor()}
            fillOpacity={1}
            mask={fillMuted ? `url(#${patternId}-mask)` : undefined} // ADD THIS: Apply the mask
            dot={
              showDots
                ? {
                    fill: dynamicStrokeColor,
                    strokeWidth: 2,
                    r: 3,
                    fillOpacity: 0.8,
                  }
                : false
            }
            activeDot={
              showDots
                ? {
                    r: 5,
                    fill: dynamicStrokeColor,
                    stroke: isDark ? "#000000" : "#ffffff",
                    strokeWidth: 2,
                    fillOpacity: 1,
                  }
                : {
                    r: 4,
                    fill: dynamicStrokeColor,
                    stroke: isDark ? "#000000" : "#ffffff",
                    strokeWidth: 2,
                  }
            }
            animationDuration={800}
            animationBegin={200} // Consistent with bar charts
            animationEasing="ease-out"
            isAnimationActive={inView}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
