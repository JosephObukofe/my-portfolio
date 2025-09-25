"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DigitalTime from "./DigitalTime";
import { PerformanceInfo } from "app/components/ui/performance-info";

// Sample performance data
const performanceData = {
  sections: [
    {
      title: "Uptime Info",
      items: [
        {
          label: "Uptime",
          value: "99.97%",
          grade: "A+" as const,
        },
        {
          label: "Downtime",
          value: "1h 12m",
        },
      ],
    },
    {
      title: "Vitals",
      items: [
        {
          label: "LCP",
          value: "1.8",
          unit: "s",
          grade: "B+" as const,
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
      title: "Performance",
      items: [
        {
          label: "CO₂ Avoided",
          value: "0.42",
          unit: "kg",
          grade: "A+" as const,
        },
        {
          label: "Accessibility",
          value: "92% WCAG AA",
          grade: "A-" as const,
        },
        {
          label: "ASD",
          value: "3m 42s",
          grade: "A" as const,
        },
        {
          label: "CHR",
          value: "87%",
          grade: "B-" as const,
        },
      ],
    },
  ],
  reportLink: "#",
};

// Animation variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.6, ease: "easeIn", delay: 0.4 },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1,
      delayChildren: 0.05,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 30,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: 15,
    scale: 0.98,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

const footerVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 28,
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.96,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

// Global dashboard state - shared across all components
declare global {
  var dashboardState:
    | {
        isOpen: boolean;
        listeners: Set<() => void>;
      }
    | undefined;
}

// Initialize global state if it doesn't exist
if (typeof window !== "undefined" && !globalThis.dashboardState) {
  globalThis.dashboardState = {
    isOpen: false,
    listeners: new Set<() => void>(),
  };
}

function useDashboardState() {
  const [isOpen, setIsOpen] = useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const state = globalThis.dashboardState!;
    const updateState = () => setIsOpen(state.isOpen);

    // Set initial state
    setIsOpen(state.isOpen);

    // Subscribe to changes
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

// Clickable time component
export function ClickableTime({
  showSeconds = false,
  format24Hour = true,
}: {
  showSeconds?: boolean;
  format24Hour?: boolean;
}) {
  const { toggle } = useDashboardState();

  return (
    <button
      onClick={toggle}
      className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
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

// Dashboard overlay component
export function DashboardOverlay() {
  const { isOpen, close } = useDashboardState();

  // Handle clicking outside
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-background cursor-pointer flex items-center justify-center p-4 sm:p-6 lg:p-8"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackgroundClick}
        >
          <motion.div
            className="w-full max-w-5xl cursor-default flex flex-col gap-8 max-h-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Content */}
            <motion.div variants={contentVariants} className="flex-1 min-h-0">
              <PerformanceInfo
                sections={performanceData.sections}
                reportLink={performanceData.reportLink}
              />
            </motion.div>

            {/* Footer */}
            <motion.div
              variants={footerVariants}
              className="flex items-center justify-center pt-4 border-t border-border/20"
            >
              <p className="text-xs font-satoshi text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()} at{" "}
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
