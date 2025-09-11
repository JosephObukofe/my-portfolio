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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Tooltip as CustomTooltip } from "./tooltip";

// Simple tooltip component for mobile - matches AreaPlot exactly
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
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px", // full pill shape
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

type RadarPlotProps = {
  data: any[];
  dataKey: string; // The key for the metric values
  angleKey: string; // The key for the category names (angles)
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  fillMuted?: boolean;
  showGradient?: boolean; // Optional gradient fill
  showDots?: boolean; // Optional data point dots
  suffix?: string; // Tooltip suffix
  metricName?: string; // Custom metric name for tooltip
  gridLevels?: number; // Number of concentric grid circles
  showRadiusAxis?: boolean; // Show/hide radius axis labels
  showAngleAxis?: boolean; // Show/hide angle axis labels
  maxValue?: number; // Maximum value for the radar scale (creates fixed domain)
  minValue?: number; // Minimum value for the radar scale (defaults to 0)
};

export function RadarPlotChart({
  data,
  dataKey,
  angleKey,
  height = 400,
  strokeColor,
  strokeWidth = 1,
  strokeOpacity = 0.3,
  fillMuted = true,
  showGradient = false,
  showDots = false,
  suffix = "",
  metricName,
  gridLevels = 5,
  showRadiusAxis = true,
  showAngleAxis = true,
  maxValue,
  minValue = 0,
}: RadarPlotProps) {
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

  // Mobile detection - exactly matching AreaPlot
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

  // ✅ STABILITY FIX: Use stable pattern IDs (not random) - exactly matching AreaPlot
  React.useEffect(() => {
    if (resolvedTheme && mounted) {
      const stablePatternId = `stable-radar-pattern-${resolvedTheme}-${dataKey}`;
      const stableGradientId = `stable-radar-gradient-${resolvedTheme}-${dataKey}`;
      setPatternId(stablePatternId);
      setGradientId(stableGradientId);
    }
  }, [resolvedTheme, mounted, dataKey]);

  // Show loading state until everything is ready - exactly matching AreaPlot
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

  // ✅ RADAR SCALE CALCULATION: Calculate proper domain and grid divisions aligned with data
  const calculateRadarScale = () => {
    // If maxValue is provided, use it; otherwise calculate from data
    let calculatedMax = maxValue;

    if (!calculatedMax) {
      const dataValues = data
        .map((item) => item[dataKey])
        .filter((val) => typeof val === "number");
      const dataMax = Math.max(...dataValues);

      // Create a nice round number above the data max
      const magnitude = Math.pow(10, Math.floor(Math.log10(dataMax)));
      calculatedMax = Math.ceil(dataMax / magnitude) * magnitude;

      // Ensure we have at least some padding above the data
      if (calculatedMax === dataMax) {
        calculatedMax = dataMax * 1.2;
      }
    }

    // Calculate even divisions
    const range = calculatedMax - minValue;
    const step = range / gridLevels;

    // Create grid tick values (these will be the actual scale values)
    const gridTicks: number[] = [];
    for (let i = 0; i <= gridLevels; i++) {
      gridTicks.push(minValue + step * i);
    }

    // ✅ CORRECT: Calculate polar radius values as PERCENTAGES (0-100) for visual positioning
    // while keeping actual scale values for domain
    const polarRadiusValues: number[] = [];
    for (let i = 1; i <= gridLevels; i++) {
      polarRadiusValues.push((i / gridLevels) * 100); // Visual positioning as percentages
    }

    return {
      domain: [minValue, calculatedMax],
      gridTicks,
      polarRadiusValues, // Now these correspond to actual scale values
      step,
    };
  };

  const { domain, gridTicks, polarRadiusValues, step } = calculateRadarScale();

  // Determine fill based on options - exactly matching AreaPlot logic
  const getFillColor = () => {
    if (showGradient) return `url(#${gradientId})`;
    if (fillMuted) return `url(#${patternId})`;
    return dynamicStrokeColor;
  };

  // Get fill opacity for solid radar fills
  const getFillOpacity = () => {
    if (showGradient) return 1;
    if (fillMuted) return 1;
    return 0.3; // Semi-transparent solid fill for clean radar look
  };

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto h-[250px] sm:h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={data}
          margin={{ top: 40, right: 80, bottom: 40, left: 80 }} // Increased margins for scale labels
        >
          <defs>
            {/* Pattern fill for consistency with area charts - exactly matching AreaPlot */}
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

                {/* Gradient for the mask that will fade the pattern - exactly matching AreaPlot */}
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

                {/* Mask that uses the gradient - exactly matching AreaPlot */}
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

            {/* Optional gradient fill - exactly matching AreaPlot */}
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

          {/* ✅ FIXED: Polar grid with values that correspond to actual domain scale */}
          <PolarGrid
            stroke={dynamicStrokeColor}
            strokeOpacity={strokeOpacity * 1.5} // Make grid more visible
            strokeWidth={strokeWidth * 0.8}
            gridType="polygon"
            polarRadius={polarRadiusValues} // Now uses actual scale values instead of percentages
            strokeDasharray="2 2" // Optional: dashed grid lines like reference image
          />

          {/* Angle axis (category labels around the circumference) */}
          {showAngleAxis && (
            <PolarAngleAxis
              dataKey={angleKey}
              tick={{
                className: getChartTextClass(),
                fontSize: isMobile ? 10 : 12, // Responsive font size
              }}
              tickFormatter={(value) => {
                // Truncate long labels on mobile
                if (isMobile && typeof value === "string" && value.length > 8) {
                  return value.substring(0, 8) + "...";
                }
                return value;
              }}
            />
          )}

          {/* Radius axis (value labels) with fixed domain - positioned outside */}
          {showRadiusAxis && (
            <PolarRadiusAxis
              angle={45} // Position at 45 degrees (top-right) for better visibility
              domain={domain} // Use calculated fixed domain
              tick={{
                className: getChartTextClass(),
                fontSize: isMobile ? 8 : 10, // Smaller for radius labels
              }}
              tickCount={gridLevels + 1} // Include both min and max
              axisLine={false}
              tickFormatter={(value) => {
                // Format numbers nicely with proper decimal places
                if (typeof value === "number") {
                  // If it's a whole number or the step is >= 1, show as integer
                  if (value % 1 === 0 || step >= 1) {
                    return value.toLocaleString();
                  }
                  // Otherwise show with appropriate decimal places
                  return value.toFixed(1);
                }
                return value;
              }}
            />
          )}

          {/* Conditional Tooltip - Simple for mobile, Structured for desktop - exactly matching AreaPlot */}
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
              strokeWidth: strokeWidth,
              strokeOpacity: strokeOpacity,
              strokeDasharray: "3 3",
            }}
          />

          <Radar
            dataKey={dataKey}
            stroke={dynamicStrokeColor}
            strokeWidth={strokeWidth}
            fill={getFillColor()}
            fillOpacity={getFillOpacity()}
            mask={fillMuted ? `url(#${patternId}-mask)` : undefined} // Only apply mask for pattern fills
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
            // Exactly matching AreaPlot animation settings
            animationDuration={800}
            animationBegin={200}
            animationEasing="ease-out"
            isAnimationActive={inView}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
