"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { TransitionLink } from "@/app/components/PageTransition";
import { StatusBadge } from "./status-badge";
import { motion, AnimatePresence } from "framer-motion";

type StatusType = "Completed" | "Ongoing" | "Draft" | "Skipped" | "Planned";

type WeekRecap = {
  week: number;
  dates: string;
  slug: string;
  status: StatusType;
  description: string;
};

type WeeklyRecapListProps = {
  recaps: WeekRecap[];
  startFromWeek?: number;
  endAtWeek?: number;
};

export function WeeklyRecapList({
  recaps,
  startFromWeek = 20,
  endAtWeek = 43,
}: WeeklyRecapListProps) {
  // 🎯 Filter recaps to only show from startFromWeek onwards
  const filteredRecaps = React.useMemo(() => {
    return recaps
      .filter((recap) => recap.week >= startFromWeek)
      .sort((a, b) => a.week - b.week); // Ensure ascending order by week number
  }, [recaps, startFromWeek]);

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredRecaps.length / itemsPerPage);

  // Calculate current page data using filtered recaps
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWeeks = filteredRecaps.slice(startIndex, endIndex);

  // Calculate week range for display
  const firstWeekOnPage = currentWeeks.length > 0 ? currentWeeks[0].week : 0;
  const lastWeekOnPage =
    currentWeeks.length > 0 ? currentWeeks[currentWeeks.length - 1].week : 0;
  const totalWeeks =
    filteredRecaps.length > 0
      ? Math.max(...filteredRecaps.map((r) => r.week))
      : 0;

  // Reset pagination when startFromWeek changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [startFromWeek]);

  // 🎯 3-Dash Window Calculation
  const getPageWindow = () => {
    if (totalPages <= 3) {
      // If we have 3 or fewer pages, show them all
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage === 1) {
      // At the beginning: [1, 2, 3]
      return [1, 2, 3];
    } else if (currentPage === totalPages) {
      // At the end: [n-2, n-1, n]
      return [totalPages - 2, totalPages - 1, totalPages];
    } else {
      // In the middle: [current-1, current, current+1]
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  };

  const pageWindow = getPageWindow();

  // Pagination handlers with mobile blur fix
  const goToPreviousPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    e.currentTarget.blur(); // Remove focus highlight on mobile
  };

  const goToNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    e.currentTarget.blur(); // Remove focus highlight on mobile
  };

  const goToPage = (page: number, e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(page);
    e.currentTarget.blur(); // Remove focus highlight on mobile
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 400,
        duration: 0.6,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 400,
        duration: 0.3,
      },
    },
  };

  // Handle empty state - now shows different message based on filtering
  if (!recaps || recaps.length === 0) {
    return (
      <div className="space-y-6">
        <motion.div
          className="text-[0.75rem] sm:text-[0.85rem] font-satoshi text-muted-foreground text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          No weekly recaps available yet.
        </motion.div>
      </div>
    );
  }

  if (filteredRecaps.length === 0) {
    const rangeText = endAtWeek
      ? `from week ${startFromWeek} to week ${endAtWeek}`
      : `from week ${startFromWeek} onwards`;

    return (
      <div className="space-y-6">
        <motion.div
          className="text-[0.75rem] sm:text-[0.85rem] font-satoshi text-muted-foreground text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          No weekly recaps available {rangeText}.
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="grid grid-cols-[3rem_4.5rem_1fr] gap-x-3 sm:gap-x-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="text-[0.75rem] sm:text-[0.85rem] font-satoshi text-muted-foreground">
          Week
        </div>
        <div className="text-[0.75rem] sm:text-[0.85rem] font-satoshi text-muted-foreground">
          Status
        </div>
        <div className="text-[0.75rem] sm:text-[0.85rem] font-satoshi text-muted-foreground text-right ml-6 sm:ml-8">
          Description
        </div>
      </motion.div>

      {/* Week Rows */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          className="space-y-4 min-h-[320px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {currentWeeks.map((week, index) => (
            <motion.div
              key={week.slug}
              variants={itemVariants}
              className="grid grid-cols-[3rem_4.5rem_1fr] gap-x-3 sm:gap-x-4 items-center group -mx-2 px-2 py-2 rounded-lg"
            >
              {/* Week Column */}
              <div className="text-[0.75rem] sm:text-[0.85rem] font-satoshi text-neutral-800 dark:text-neutral-200">
                {week.week}
              </div>

              {/* Status Column */}
              <div className="flex items-center">
                <StatusBadge status={week.status} />
              </div>

              {/* Description Column - Right Aligned with Link */}
              <div className="flex justify-end ml-6 sm:ml-8">
                <TransitionLink
                  href={`/learning/recap/${week.slug}`}
                  className="inline-flex items-center gap-2 text-[0.75rem] sm:text-[0.85rem] font-satoshi text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors duration-150 text-right"
                >
                  <span>{week.description}</span>
                  <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
                </TransitionLink>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* 🌟 3-Dash Windowed Pagination */}
      <motion.div
        className="flex items-center justify-center gap-4 pt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300, delay: 0.8 }}
      >
        {/* Previous Button */}
        <motion.button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`
            p-2 rounded-lg transition-colors duration-150 touch-manipulation focus:outline-none
            ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
            }
          `}
          whileHover={currentPage > 1 ? { scale: 1.05, x: -1 } : {}}
          whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </motion.button>

        {/* 3-Dash Window Indicators */}
        <div className="flex items-center space-x-3">
          {pageWindow.map((pageNum, index) => {
            const isActive = pageNum === currentPage;

            return (
              <motion.button
                key={`${pageNum}-${index}`}
                onClick={(e) => goToPage(pageNum, e)}
                className="relative focus:outline-none group touch-manipulation"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                layout // Smooth position changes when window slides
              >
                {/* Background dash */}
                <div className="w-8 h-[1px] bg-gray-300 dark:bg-neutral-600 rounded-full" />

                {/* Active dash with smooth animation */}
                <motion.div
                  className="absolute inset-0 w-8 h-[1px] bg-neutral-800 dark:bg-neutral-200 rounded-full"
                  initial={false}
                  animate={{
                    scaleX: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                  style={{ originX: 0.5 }}
                />

                {/* Hover preview */}
                <motion.div
                  className="absolute inset-0 w-8 h-[1px] bg-neutral-500 dark:bg-neutral-400 rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{
                    scaleX: isActive ? 0 : 0.7,
                    opacity: isActive ? 0 : 0.5,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{ originX: 0.5 }}
                />

                {/* Page number tooltip on hover (optional - remove if too cluttered) */}
                <motion.div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-800 text-xs px-2 py-1 rounded opacity-0 pointer-events-none font-satoshi"
                  whileHover={{ opacity: 1, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {pageNum}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-800 dark:bg-neutral-200 rotate-45 -mt-1" />
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`
            p-2 rounded-lg transition-colors duration-150 touch-manipulation focus:outline-none
            ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
            }
          `}
          whileHover={currentPage < totalPages ? { scale: 1.05, x: 1 } : {}}
          whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </div>
  );
}
