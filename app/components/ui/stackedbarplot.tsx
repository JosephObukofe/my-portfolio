"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { getChartTextClass } from "@/utils/typography";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useInView } from "react-intersection-observer";
import { AnimatedBarLabel } from "./animatedbarlabelvertical";
import {
  getStackedBarPlotInnerStacks,
  getGapKeys,
  convertToPercentageStack,
} from "@/utils/typography";

type StackedBarPlotProps = {
  data: any[];
  xKey: string;
  yKeys: string[];
  height?: number;
  strokeColors?: string[];
  strokeOpacity?: number;
  fillMuted?: boolean;
};

export function StackedBarPlotChart({
  data,
  xKey,
  yKeys,
  height = 400,
  strokeColors,
  strokeOpacity = 0.9,
  fillMuted = true,
}: StackedBarPlotProps) {
  const { resolvedTheme } = useTheme();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [patternIds, setPatternIds] = React.useState<string[]>([]);

  const spacedData = getStackedBarPlotInnerStacks(data, yKeys, 4);
  const gapKeys = getGapKeys(yKeys);
  const allKeys = yKeys.flatMap((key, idx) =>
    idx !== yKeys.length - 1 ? [key, `__gap__${key}`] : [key]
  );

  const colorMap: Record<string, string> = {
    baseline: resolvedTheme === "dark" ? "#ffffff" : "#0f172a",
    increase: resolvedTheme === "dark" ? "#4ade80" : "#22c55e",
    decrease: resolvedTheme === "dark" ? "#f87171" : "#ef4444",
  };

  React.useEffect(() => {
    if (resolvedTheme) {
      const ids = yKeys.map(
        () =>
          `pattern-${resolvedTheme}-${Math.random().toString(36).slice(2, 6)}`
      );
      setPatternIds(ids);
    }
  }, [resolvedTheme, yKeys]);

  if (!resolvedTheme || !inView || patternIds.length === 0) {
    return (
      <div ref={ref} className="w-full max-w-3xl mx-auto" style={{ height }} />
    );
  }

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={spacedData}>
          <defs>
            {yKeys.map((key, idx) => (
              <pattern
                key={patternIds[idx]}
                id={patternIds[idx]}
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
                  stroke={strokeColors?.[idx] ?? colorMap[key] ?? "#999999"}
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
            const isGap = gapKeys.includes(key);
            const baseKey = yKeys.find((k) => key.includes(k))!;
            const originalIdx = yKeys.findIndex((k) => k === baseKey);

            const fillColor = isGap
              ? "transparent"
              : colorMap[baseKey] ??
                (fillMuted
                  ? `url(#${patternIds[originalIdx]})`
                  : strokeColors?.[originalIdx] ??
                    colorMap[baseKey] ??
                    "#999999");

            return (
              <Bar
                key={key}
                dataKey={key}
                stackId="stack"
                fill={fillColor}
                animationDuration={800}
                animationBegin={100 + originalIdx * 100}
                animationEasing="ease-out"
                radius={
                  !isGap && originalIdx === yKeys.length - 1 ? [4, 4, 0, 0] : 0
                }
                label={
                  !isGap && originalIdx === yKeys.length - 1
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
