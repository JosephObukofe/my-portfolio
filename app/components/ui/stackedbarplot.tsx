"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useInView } from "react-intersection-observer";
import { getChartTextClass, getParagraphClass } from "@/utils/typography";

type StackedVerticalBarChartProps = {
  data: any[];
  xKey: string;
  yKeys: string[]; // keys for the baseline values
  changeKeys: string[]; // keys for the change values (can be positive or negative)
  height?: number;
  strokeColors?: string[];
  strokeOpacity?: number;
  fillMuted?: boolean;
  gapPercent?: number; // Visual gap as percentage of max baseline (e.g., 0.1 = 10% consistent gap)
};

export function StackedVerticalBarChart({
  data,
  xKey,
  yKeys,
  changeKeys,
  height = 500,
  strokeColors,
  strokeOpacity = 0.9,
  fillMuted = true,
  gapPercent = 0.08, // Default 8% consistent visual gap
}: StackedVerticalBarChartProps) {
  const { resolvedTheme } = useTheme();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [patternIds, setPatternIds] = React.useState<{
    baseline: string[];
    positive: string[];
    negative: string[];
  }>({
    baseline: [],
    positive: [],
    negative: [],
  });
  const [mounted, setMounted] = React.useState(false);

  // Ensure component is mounted before rendering
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Process data to create baseline and change stacks with consistent visual gap
  const processedData = React.useMemo(() => {
    // Calculate consistent gap value based on the maximum baseline in the dataset
    // This ensures all bars have the same visual gap regardless of their individual values
    const allBaselineValues = data.flatMap((item) =>
      yKeys.map((key) => Math.abs(item[key] || 0))
    );
    const maxBaseline = Math.max(...allBaselineValues);
    const consistentGap = maxBaseline * gapPercent; // Same gap for all bars

    return data.map((item, itemIndex) => {
      const newItem = { ...item };

      // Process each yKey to create baseline and change stacks
      yKeys.forEach((key, idx) => {
        const baselineValue = item[key] || 0;
        const changeValue = changeKeys[idx] ? item[changeKeys[idx]] || 0 : 0;

        // Always show baseline as positive (absolute value for display)
        newItem[`${key}_baseline`] = Math.abs(baselineValue);

        // Add consistent gap for all bars (same visual spacing everywhere)
        if (changeValue !== 0) {
          newItem[`${key}_floating_gap`] = consistentGap; // Same gap value for ALL bars
        } else {
          newItem[`${key}_floating_gap`] = 0; // No gap if no change
        }

        // For positive changes, add to the stack
        if (changeValue > 0) {
          newItem[`${key}_change_positive`] = Math.abs(changeValue);
          newItem[`${key}_change_negative`] = 0;
        }
        // For negative changes, still stack on top but use red color
        else if (changeValue < 0) {
          newItem[`${key}_change_positive`] = 0;
          newItem[`${key}_change_negative`] = Math.abs(changeValue);
        }
        // For zero changes
        else {
          newItem[`${key}_change_positive`] = 0;
          newItem[`${key}_change_negative`] = 0;
        }

        // Add gap if not the last item (optional - you can remove this if you don't want gaps)
        if (idx !== yKeys.length - 1) {
          newItem[`__gap__${key}`] = 4;
        }
      });

      return newItem;
    });
  }, [data, yKeys, changeKeys, gapPercent]);

  // Create all keys for rendering (baseline, floating gap, positive changes, negative changes, gaps)
  const allKeys = yKeys.flatMap((key, idx) => {
    const keys = [
      `${key}_baseline`, // Baseline bar (always at bottom)
      `${key}_floating_gap`, // Floating gap (transparent spacer)
      `${key}_change_positive`, // Positive changes (green, floating on top)
      `${key}_change_negative`, // Negative changes (red, floating on top)
    ];

    // Add gap if not the last item
    if (idx !== yKeys.length - 1) {
      keys.push(`__gap__${key}`);
    }

    return keys;
  });

  // Same color system as BarPlotChart
  const dynamicStrokeColor =
    strokeColors?.[0] ?? (resolvedTheme === "dark" ? "#ffffff" : "#0f172a");

  // Color definitions
  const colorMap = {
    baseline: dynamicStrokeColor, // Same as standard bar chart
    positive: resolvedTheme === "dark" ? "#4ade80" : "#22c55e", // Green for positive changes
    negative: resolvedTheme === "dark" ? "#f87171" : "#ef4444", // Red for negative changes
  };

  // ✅ STABILITY FIX: Use STABLE pattern IDs (not random)
  React.useEffect(() => {
    if (resolvedTheme && mounted) {
      const stablePatternIds = {
        baseline: yKeys.map(
          (key, idx) => `stable-baseline-${resolvedTheme}-${key}-${idx}`
        ),
        positive: yKeys.map(
          (key, idx) => `stable-positive-${resolvedTheme}-${key}-${idx}`
        ),
        negative: yKeys.map(
          (key, idx) => `stable-negative-${resolvedTheme}-${key}-${idx}`
        ),
      };
      setPatternIds(stablePatternIds);
    }
  }, [resolvedTheme, mounted, yKeys.join(",")]); // Stable dependencies

  // Show loading state until everything is ready
  if (
    !mounted ||
    !resolvedTheme ||
    !inView ||
    patternIds.baseline.length === 0
  ) {
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

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto h-[300px] sm:h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={processedData}>
          <defs>
            {/* Baseline patterns - same as standard bar chart */}
            {yKeys.map((key, idx) => (
              <pattern
                key={patternIds.baseline[idx]}
                id={patternIds.baseline[idx]}
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
                  stroke={colorMap.baseline}
                  strokeWidth={2}
                  strokeOpacity={strokeOpacity}
                  shapeRendering="crispEdges"
                />
              </pattern>
            ))}

            {/* Positive change patterns */}
            {yKeys.map((key, idx) => (
              <pattern
                key={patternIds.positive[idx]}
                id={patternIds.positive[idx]}
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
                  stroke={colorMap.positive}
                  strokeWidth={2}
                  strokeOpacity={strokeOpacity}
                  shapeRendering="crispEdges"
                />
              </pattern>
            ))}

            {/* Negative change patterns */}
            {yKeys.map((key, idx) => (
              <pattern
                key={patternIds.negative[idx]}
                id={patternIds.negative[idx]}
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
                  stroke={colorMap.negative}
                  strokeWidth={2}
                  strokeOpacity={strokeOpacity}
                  shapeRendering="crispEdges"
                />
              </pattern>
            ))}
          </defs>

          <XAxis
            dataKey={xKey}
            axisLine={false}
            tickLine={false}
            tick={{ className: getChartTextClass() }}
            tickMargin={18}
            padding={{ left: 6, right: 6 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ className: getChartTextClass() }}
          />

          {allKeys.map((key, idx) => {
            // ✅ STABILITY FIX: Handle gap bars with stable keys and stackId
            if (key.includes("__gap__")) {
              return (
                <Bar
                  key={`${key}-stable-${idx}`}
                  dataKey={key}
                  stackId="main-stack" // Consistent stackId
                  fill="transparent"
                  animationDuration={600}
                  animationBegin={200 + idx * 50}
                  animationEasing="ease-out"
                  isAnimationActive={inView}
                />
              );
            }

            // ✅ STABILITY FIX: Handle floating gap with stable keys and stackId
            if (key.includes("_floating_gap")) {
              return (
                <Bar
                  key={`${key}-stable-${idx}`}
                  dataKey={key}
                  stackId="main-stack" // Consistent stackId
                  fill="transparent"
                  animationDuration={600}
                  animationBegin={900} // Animate with baseline completion
                  animationEasing="ease-out"
                  isAnimationActive={inView}
                />
              );
            }

            // Determine the type and base key
            let barType: "baseline" | "positive" | "negative";
            let baseKey: string;
            let originalIdx: number;

            if (key.includes("_baseline")) {
              barType = "baseline";
              baseKey = key.replace("_baseline", "");
              originalIdx = yKeys.findIndex((k) => k === baseKey);
            } else if (key.includes("_change_positive")) {
              barType = "positive";
              baseKey = key.replace("_change_positive", "");
              originalIdx = yKeys.findIndex((k) => k === baseKey);
            } else {
              barType = "negative";
              baseKey = key.replace("_change_negative", "");
              originalIdx = yKeys.findIndex((k) => k === baseKey);
            }

            // Determine if this is the last stack (for styling)
            const isTopStack = barType !== "baseline";
            const isLastKey = originalIdx === yKeys.length - 1;

            // Determine fill
            let fillColor: string;
            if (fillMuted) {
              fillColor = `url(#${patternIds[barType][originalIdx]})`;
            } else {
              fillColor = colorMap[barType];
            }

            // Sequential animation timing
            let animationBegin: number;
            let animationDuration: number;

            if (barType === "baseline") {
              // Baseline bars animate first - staggered by metric
              animationBegin = 200 + originalIdx * 150; // Start a bit later, stagger by 150ms per metric
              animationDuration = 800; // Smooth, substantial animation
            } else {
              // Change stacks animate after baseline is done - staggered by metric
              animationBegin = 1000 + originalIdx * 100; // Start after baseline, shorter stagger
              animationDuration = 600; // Slightly faster for the floating effect
            }

            // ✅ STABILITY FIX: Main bars with stable keys and stackId
            return (
              <Bar
                key={`${key}-stable-${idx}`} // Stable, unique key
                dataKey={key}
                stackId="main-stack" // Consistent stackId across ALL bars
                fill={fillColor}
                animationDuration={animationDuration}
                animationBegin={animationBegin}
                animationEasing="ease-out"
                isAnimationActive={inView}
                radius={isTopStack && isLastKey ? [4, 4, 0, 0] : 0}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
