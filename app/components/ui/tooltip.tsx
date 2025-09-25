"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { getTooltipClass, getTooltipTextClass } from "@/utils/typography";

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatter?: (value: any, name: string) => string;
  coordinate?: { x: number; y: number };
  suffix?: string;
  labelFormatter?: (label: string) => string;
  metricName?: string; // Custom metric name
}

export function Tooltip({
  active,
  payload,
  label,
  formatter,
  coordinate,
  suffix,
  labelFormatter,
  metricName,
}: TooltipProps) {
  const { className, style } = getTooltipClass();
  const { resolvedTheme } = useTheme();
  const shouldRender = active && payload && payload.length > 0;
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  // Theme-aware green colors
  const greenColor = resolvedTheme === "dark" ? "#4ADE80" : "#22C55E";

  React.useEffect(() => {
    if (coordinate && active) {
      setPos(coordinate);
    }
  }, [coordinate?.x, coordinate?.y, active]);

  if (!shouldRender || !coordinate) return null;

  // Format the label (date, time, etc.) with proper type checking
  const formattedLabel =
    label && labelFormatter ? labelFormatter(label) : label;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="tooltip-wrapper"
        initial={{ opacity: 0, scale: 0.95, x: coordinate.x, y: coordinate.y }}
        animate={{ opacity: 1, scale: 1, x: pos.x, y: pos.y }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          x: { type: "spring", stiffness: 150, damping: 25 },
          y: { type: "spring", stiffness: 150, damping: 25 },
          opacity: { duration: 0.15 },
          scale: { duration: 0.15 },
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
            padding: "0.625rem 1rem", // Slightly reduced top/bottom padding
            borderRadius: "0.75rem",
            backgroundColor: style?.backgroundColor ?? "#1f2937",
            minWidth: "fit-content",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {/* Month/Label Header */}
          {formattedLabel && (
            <div
              className="text-[0.65rem] sm:text-[0.75rem] font-grotesk font-semibold mb-2 text-left" // Reduced from mb-3 to mb-2
              style={{ color: style?.color }}
            >
              {formattedLabel}
            </div>
          )}

          {/* Structured Metric Display */}
          {payload.length > 0 && (
            <div className="flex gap-3">
              {/* Vertical hash bar spanning both rows */}
              <div className="flex flex-col justify-center">
                <div
                  className="w-1 h-7 relative overflow-hidden rounded-sm" // Reduced from h-8 to h-7
                  style={{ backgroundColor: "transparent" }}
                >
                  {/* Green hash pattern matching area chart */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `repeating-linear-gradient(
                        135deg,
                        transparent,
                        transparent 2px,
                        ${greenColor} 4px,
                        ${greenColor} 2px
                      )`,
                    }}
                  />
                </div>
              </div>

              {/* Content rows */}
              <div className="space-y-1 flex-1">
                {" "}
                {/* Reduced from space-y-1.5 to space-y-1 */}
                {/* Metric Row */}
                <div className="flex items-center justify-between gap-6">
                  <span
                    className="text-[0.65rem] sm:text-[0.75rem] font-grotesk opacity-60"
                    style={{ color: style?.color }}
                  >
                    Metric
                  </span>
                  <span
                    className="text-[0.65rem] sm:text-[0.75rem] font-grotesk font-medium"
                    style={{ color: style?.color }}
                  >
                    {metricName || payload[0].name || payload[0].dataKey}
                  </span>
                </div>
                {/* Value Row */}
                <div className="flex items-center justify-between gap-6">
                  <span
                    className="text-[0.65rem] sm:text-[0.75rem] font-grotesk opacity-60"
                    style={{ color: style?.color }}
                  >
                    Value
                  </span>
                  <span
                    className="text-[0.65rem] sm:text-[0.75rem] font-grotesk font-medium"
                    style={{ color: style?.color }}
                  >
                    {formatter
                      ? formatter(
                          payload[0].value,
                          payload[0].name || payload[0].dataKey
                        )
                      : `${payload[0].value.toLocaleString()}${
                          suffix ? ` ${suffix}` : ""
                        }`}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
