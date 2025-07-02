"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { getChartTextClass } from "@/utils/typography";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useInView } from "react-intersection-observer";
import { AnimatedBarLabel } from "./animatedbarlabelhorizontal";

type BarPlotProps = {
  data: any[];
  xKey: string;
  yKey: string;
  height?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  fillMuted?: boolean;
};

export function HorizontalBarPlotChart({
  data,
  xKey,
  yKey,
  height = 400,
  strokeColor,
  strokeOpacity = 0.9,
  fillMuted = true,
}: BarPlotProps) {
  const { resolvedTheme } = useTheme();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [patternId, setPatternId] = React.useState<string>("");

  React.useEffect(() => {
    if (resolvedTheme) {
      const uniqueId = `pattern-${resolvedTheme}-${Math.random()
        .toString(36)
        .substr(2, 6)}`;
      setPatternId(uniqueId);
    }
  }, [resolvedTheme]);

  if (!resolvedTheme || !inView || !patternId) {
    return (
      <div ref={ref} className="w-full max-w-3xl mx-auto" style={{ height }} />
    );
  }

  const dynamicStrokeColor =
    strokeColor ?? (resolvedTheme === "dark" ? "#ffffff" : "#0f172a");

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
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

          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ className: getChartTextClass() }}
            tickMargin={18}
            padding={{ left: 18, right: 18 }}
          />
          <YAxis
            type="category"
            dataKey={xKey}
            axisLine={false}
            tickLine={false}
            tick={{ className: getChartTextClass() }}
          />

          <Bar
            dataKey={yKey}
            fill={fillMuted ? `url(#${patternId})` : dynamicStrokeColor}
            animationDuration={800}
            animationBegin={100}
            animationEasing="ease-out"
            radius={[0, 4, 4, 0]}
            label={<AnimatedBarLabel isVertical={false} />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
