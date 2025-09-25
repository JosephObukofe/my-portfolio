"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PerformanceInfo } from "app/components/ui/performance-info";
import DigitalTime from "./DigitalTime";

// ==================================
// 🎯 PERFORMANCE DATA TYPES
// ==================================
type GradeType =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D"
  | "F";

const overlayVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeIn",
      delay: 0.2,
    },
  },
};

// Container orchestrates the stagger timing
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

// Individual content animations
const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

// ==================================
// 🔧 GLOBAL STATE MANAGEMENT
// ==================================
declare global {
  var dashboardState:
    | {
        isOpen: boolean;
        listeners: Set<() => void>;
      }
    | undefined;
}

if (typeof window !== "undefined" && !globalThis.dashboardState) {
  globalThis.dashboardState = {
    isOpen: false,
    listeners: new Set(),
  };
}

function useDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const state = globalThis.dashboardState!;
    const updateState = () => setIsOpen(state.isOpen);

    setIsOpen(state.isOpen);
    state.listeners.add(updateState);

    return () => {
      state.listeners.delete(updateState);
    };
  }, []);

  const toggle = () => {
    if (typeof window === "undefined") return;

    const state = globalThis.dashboardState!;
    state.isOpen = !state.isOpen;
    state.listeners.forEach((listener) => listener());
  };

  const close = () => {
    if (typeof window === "undefined") return;

    const state = globalThis.dashboardState!;
    state.isOpen = false;
    state.listeners.forEach((listener) => listener());
  };

  return { isOpen, toggle, close };
}

export function ClickableTime({
  className = "",
  showSeconds = false,
  format24Hour = true,
}: {
  className?: string;
  showSeconds?: boolean;
  format24Hour?: boolean;
}) {
  const { toggle } = useDashboard();

  return (
    <button
      onClick={toggle}
      className={`hover:opacity-70 transition-opacity duration-200 cursor-pointer ${className}`}
      style={{
        WebkitTapHighlightColor: "transparent",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "manipulation",
      }}
    >
      <DigitalTime showSeconds={showSeconds} format24Hour={format24Hour} />
    </button>
  );
}

// ==================================
// 🎭 DASHBOARD OVERLAY COMPONENT
// ==================================
export function DashboardOverlay() {
  const { isOpen, close } = useDashboard();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, close]);

  const uptimeData = [
    { day: 1, uptime: 99.95 },
    { day: 2, uptime: 99.98 },
    { day: 3, uptime: 99.97 },
    { day: 4, uptime: 99.99 },
    { day: 5, uptime: 99.96 },
    { day: 6, uptime: 99.97 },
    { day: 7, uptime: 99.98 },
    { day: 8, uptime: 99.94 },
    { day: 9, uptime: 99.99 },
    { day: 10, uptime: 99.97 },
    { day: 11, uptime: 99.98 },
    { day: 12, uptime: 99.96 },
    { day: 13, uptime: 99.97 },
    { day: 14, uptime: 99.99 },
    { day: 15, uptime: 99.95 },
    { day: 16, uptime: 99.98 },
    { day: 17, uptime: 99.97 },
    { day: 18, uptime: 99.96 },
    { day: 19, uptime: 99.99 },
    { day: 20, uptime: 99.97 },
    { day: 21, uptime: 99.98 },
    { day: 22, uptime: 99.95 },
    { day: 23, uptime: 99.97 },
    { day: 24, uptime: 99.96 },
    { day: 25, uptime: 99.99 },
    { day: 26, uptime: 99.97 },
    { day: 27, uptime: 99.98 },
    { day: 28, uptime: 99.96 },
    { day: 29, uptime: 99.97 },
    { day: 30, uptime: 99.97 },
  ];

  // Performance metrics data structured for PerformanceInfo component
  const performanceSections = [
    {
      title: "Uptime Info",
      items: [
        {
          label: "Uptime",
          value: "99.97",
          unit: "%",
          grade: "A+" as GradeType,
          chartData: uptimeData, // Add chart data here
        },
        {
          label: "Downtime",
          value: "1h 12m",
        },
      ],
    },
    {
      title: "Core Web Vitals",
      items: [
        {
          label: "LCP",
          value: "1.8",
          unit: "s",
          grade: "B+" as GradeType,
        },
        {
          label: "FID",
          value: "22",
          unit: "ms",
        },
        {
          label: "CLS",
          value: "0.04",
        },
      ],
    },
    {
      title: "Accessibility",
      items: [
        {
          label: "WCAG Compliance",
          value: "92% AA",
          grade: "A-" as GradeType,
        },
        {
          label: "ASD",
          value: "3m 42s",
          grade: "A" as GradeType,
        },
        {
          label: "CHR",
          value: "87",
          unit: "%",
          grade: "B-" as GradeType,
        },
        {
          label: "CO₂ Avoided",
          value: "0.42",
          unit: "kg",
          grade: "A+" as GradeType,
        },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background cursor-pointer flex items-center justify-center p-8"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
        >
          <motion.div
            className="w-full max-w-6xl cursor-default relative flex justify-center"
            onClick={(e) => e.stopPropagation()}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Main Dashboard Content */}
            <motion.div
              variants={contentVariants}
              className="w-full max-w-[700px]"
            >
              <PerformanceInfo sections={performanceSections} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
