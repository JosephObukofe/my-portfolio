"use client";

import * as React from "react";
import { useInView } from "react-intersection-observer";
import { useTheme } from "next-themes";
import { getChartTextClass } from "@/utils/typography";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Tooltip as CustomTooltip } from "./tooltip";

type LinePlotProps = {
  data: any[];
  xKey: string;
  yKey: string;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
};

export function LinePlotChart({
  data,
  xKey,
  yKey,
  height = 400,
  strokeColor,
  strokeWidth = 1,
}: LinePlotProps) {
  const { resolvedTheme } = useTheme();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [chartKey, setChartKey] = React.useState<string>("");

  React.useEffect(() => {
    if (resolvedTheme) {
      const uniqueId = `line-chart-${resolvedTheme}-${Math.random()
        .toString(36)
        .substring(2, 8)}`;
      setChartKey(uniqueId);
    }
  }, [resolvedTheme]);

  if (!resolvedTheme || !inView || !chartKey) {
    return (
      <div ref={ref} className="w-full max-w-3xl mx-auto" style={{ height }} />
    );
  }

  const isDark = resolvedTheme === "dark";
  const dynamicStrokeColor = strokeColor ?? (isDark ? "#ffffff" : "#0f172a");

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} key={chartKey}>
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

          <Line
            type="monotone"
            dataKey={yKey}
            stroke={dynamicStrokeColor}
            strokeWidth={strokeWidth}
            dot={false}
            activeDot={false}
            animationDuration={800}
            animationBegin={100}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
