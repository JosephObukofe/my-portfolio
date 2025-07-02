"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTooltipClass } from "@/utils/typography";

interface TooltipProps {
  active?: boolean;
  label?: string | number;
  payload?: any[];
  showLabel?: boolean;
  formatter?: (value: any) => string;
  coordinate?: { x: number; y: number }; // from Recharts
}

export function Tooltip({
  active,
  payload,
  label,
  showLabel = false,
  formatter,
  coordinate,
}: TooltipProps) {
  const { className, style } = getTooltipClass();

  const shouldRender = active && payload && payload.length > 0;
  const value =
    shouldRender && formatter
      ? formatter(payload[0].value)
      : payload?.[0]?.value;

  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (coordinate && active) {
      setPos(coordinate);
    }
  }, [coordinate?.x, coordinate?.y, active]);

  if (!shouldRender || !coordinate) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="tooltip-wrapper"
        initial={{
          opacity: 0,
          x: coordinate.x,
          y: coordinate.y,
        }}
        animate={{
          opacity: 1,
          x: pos.x,
          y: pos.y,
        }}
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
        <div className={className} style={style}>
          {showLabel && label && (
            <span className="mr-2 opacity-70">{label}</span>
          )}
          <span>{value}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
