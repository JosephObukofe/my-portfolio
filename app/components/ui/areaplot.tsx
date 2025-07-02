"use client";

import * as React from "react";
import { useInView } from "react-intersection-observer";
import { useTheme } from "next-themes";
import { getChartTextClass } from "@/utils/typography";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Tooltip as CustomTooltip } from "./tooltip";

type AreaPlotProps = {
  data: any[];
  xKey: string;
  yKey: string;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  fillMuted?: boolean;
};

export function AreaPlotChart({
  data,
  xKey,
  yKey,
  height = 350,
  strokeColor,
  strokeWidth = 1,
  strokeOpacity = 0.2,
  fillMuted = true,
}: AreaPlotProps) {
  const { resolvedTheme } = useTheme();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [patternId, setPatternId] = React.useState<string>("");

  React.useEffect(() => {
    if (resolvedTheme) {
      const uniqueId = `area-pattern-${resolvedTheme}-${Math.random()
        .toString(36)
        .substring(2, 8)}`;
      setPatternId(uniqueId);
    }
  }, [resolvedTheme]);

  if (!resolvedTheme || !inView || !patternId) {
    return (
      <div ref={ref} className="w-full max-w-3xl mx-auto" style={{ height }} />
    );
  }

  const isDark = resolvedTheme === "dark";
  const dynamicStrokeColor = strokeColor ?? (isDark ? "#ffffff" : "#0f172a");

  const patternFill = `url(#${patternId})`;

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} key={patternId}>
          {fillMuted && (
            <defs>
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
            </defs>
          )}

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

          <Tooltip
            content={<CustomTooltip showLabel={false} />}
            cursor={{
              stroke: dynamicStrokeColor,
              strokeWidth: 0.5,
              strokeOpacity: 0.5,
              strokeDasharray: "3 3",
            }}
          />

          <Area
            type="monotone"
            dataKey={yKey}
            stroke={dynamicStrokeColor}
            strokeWidth={strokeWidth}
            fill={fillMuted ? patternFill : dynamicStrokeColor}
            fillOpacity={1}
            dot={false}
            activeDot={false}
            animationDuration={800}
            animationBegin={100}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
