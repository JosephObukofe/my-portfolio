"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTooltipClass, getTooltipTextClass } from "@/utils/typography";

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  formatter?: (value: any) => string;
  coordinate?: { x: number; y: number };
  suffix?: string;
}

export function Tooltip({
  active,
  payload,
  formatter,
  coordinate,
  suffix,
}: TooltipProps) {
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
        key="tooltip-wrapper"
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
          className={`${className} ${getTooltipTextClass()}`}
          style={{
            ...style,
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px", // full pill shape
            backgroundColor: style?.backgroundColor ?? "#1f2937", // fallback if your utility doesn't apply
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
}
