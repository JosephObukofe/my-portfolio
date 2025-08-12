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
  CartesianGrid,
} from "recharts";
import { useInView } from "react-intersection-observer";
import { getChartTextClass } from "@/utils/typography";
import { AnimatedBarLabel } from "./animatedbarlabelvertical";

type StackedVerticalBarChartProps = {
  data: any[];
  xKey: string;
  yKeys: string[]; // keys for the baseline values
  changeKeys: string[]; // keys for the change values (can be positive or negative)
  height?: number;
  strokeColors?: string[];
  strokeOpacity?: number;
  fillMuted?: boolean;
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
}: StackedVerticalBarChartProps) {
  const { resolvedTheme } = useTheme();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [patternIds, setPatternIds] = React.useState<{
    baseline: string[];
    positive: string[];
    negative: string[];
  }>({
    baseline: [],
    positive: [],
    negative: [],
  });

  // Process data to create baseline and change stacks
  const processedData = React.useMemo(() => {
    return data.map((item, itemIndex) => {
      const newItem = { ...item };

      // Process each yKey to create baseline and change stacks
      yKeys.forEach((key, idx) => {
        const baselineValue = item[key] || 0;
        const changeValue = changeKeys[idx] ? item[changeKeys[idx]] || 0 : 0;

        // Always show baseline as positive (absolute value for display)
        newItem[`${key}_baseline`] = Math.abs(baselineValue);

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
  }, [data, yKeys, changeKeys]);

  // Create all keys for rendering (baseline, positive changes, negative changes, gaps)
  const allKeys = yKeys.flatMap((key, idx) => {
    const keys = [
      `${key}_baseline`, // Baseline bar (always at bottom)
      `${key}_change_positive`, // Positive changes (green, on top)
      `${key}_change_negative`, // Negative changes (red, on top)
    ];

    // Add gap if not the last item
    if (idx !== yKeys.length - 1) {
      keys.push(`__gap__${key}`);
    }

    return keys;
  });

  // Color definitions
  const colorMap = {
    baseline: resolvedTheme === "dark" ? "#6b7280" : "#9ca3af", // Gray for baseline
    positive: resolvedTheme === "dark" ? "#4ade80" : "#22c55e", // Green for positive changes
    negative: resolvedTheme === "dark" ? "#f87171" : "#ef4444", // Red for negative changes
  };

  React.useEffect(() => {
    if (resolvedTheme) {
      const newPatternIds = {
        baseline: yKeys.map(
          () =>
            `pattern-baseline-${resolvedTheme}-${Math.random()
              .toString(36)
              .slice(2, 6)}`
        ),
        positive: yKeys.map(
          () =>
            `pattern-positive-${resolvedTheme}-${Math.random()
              .toString(36)
              .slice(2, 6)}`
        ),
        negative: yKeys.map(
          () =>
            `pattern-negative-${resolvedTheme}-${Math.random()
              .toString(36)
              .slice(2, 6)}`
        ),
      };
      setPatternIds(newPatternIds);
    }
  }, [resolvedTheme, yKeys]);

  if (!resolvedTheme || !inView || patternIds.baseline.length === 0) {
    return (
      <div ref={ref} className="w-full max-w-3xl mx-auto" style={{ height }} />
    );
  }

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto h-[300px] sm:h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={processedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <defs>
            {/* Baseline patterns */}
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
                  stroke={strokeColors?.[idx] ?? colorMap.baseline}
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

          <Tooltip />

          {allKeys.map((key, idx) => {
            // Handle gap bars
            if (key.includes("__gap__")) {
              return (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="stack"
                  fill="transparent"
                  animationDuration={800}
                  animationBegin={100 + idx * 100}
                  animationEasing="ease-out"
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

            return (
              <Bar
                key={key}
                dataKey={key}
                stackId="stack"
                fill={fillColor}
                animationDuration={800}
                animationBegin={100 + originalIdx * 100}
                animationEasing="ease-out"
                radius={isTopStack && isLastKey ? [4, 4, 0, 0] : 0}
                label={
                  isTopStack && isLastKey
                    ? (props) => (
                        <AnimatedBarLabel {...props} isVertical={true} />
                      )
                    : undefined
                }
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
