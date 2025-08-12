"use client";

import * as React from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
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
};

export function WeeklyRecapList({ recaps }: WeeklyRecapListProps) {
  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(recaps.length / itemsPerPage);

  // Calculate current page data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWeeks = recaps.slice(startIndex, endIndex);

  // Calculate week range for display
  const firstWeekOnPage = currentWeeks.length > 0 ? currentWeeks[0].week : 0;
  const lastWeekOnPage =
    currentWeeks.length > 0 ? currentWeeks[currentWeeks.length - 1].week : 0;
  const totalWeeks =
    recaps.length > 0 ? Math.max(...recaps.map((r) => r.week)) : 0;

  // Pagination handlers with mobile blur fix
  const goToFirstPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(1);
    e.currentTarget.blur(); // Remove focus highlight on mobile
  };

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

  const goToLastPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(totalPages);
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
        damping: 20,
        stiffness: 300,
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

  if (!recaps || recaps.length === 0) {
    return (
      <div className="space-y-6">
        <motion.div
          className="text-[0.75rem] sm:text-[0.85rem] font-grotesk text-muted-foreground text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          No weekly recaps available yet.
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
        <div className="text-[0.75rem] sm:text-[0.85rem] font-grotesk text-muted-foreground">
          Week
        </div>
        <div className="text-[0.75rem] sm:text-[0.85rem] font-grotesk text-muted-foreground">
          Status
        </div>
        <div className="text-[0.75rem] sm:text-[0.85rem] font-grotesk text-muted-foreground text-right ml-6 sm:ml-8">
          Description
        </div>
      </motion.div>

      {/* Week Rows */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          className="space-y-4"
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
              <div className="text-[0.75rem] sm:text-[0.85rem] font-grotesk text-neutral-800 dark:text-neutral-200">
                {week.week}
              </div>

              {/* Status Column */}
              <div className="flex items-center">
                <StatusBadge status={week.status} />
              </div>

              {/* Description Column - Right Aligned with Link */}
              <div className="flex justify-end ml-6 sm:ml-8">
                <Link
                  href={`/learning/recap/${week.slug}`}
                  className="inline-flex items-center gap-2 text-[0.75rem] sm:text-[0.85rem] font-grotesk text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors duration-150 text-right"
                >
                  <span>{week.description}</span>
                  <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Pagination */}
      <motion.div
        className="flex items-center justify-center gap-2 pt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300, delay: 0.2 }}
      >
        {/* First Page Button */}
        <button
          onClick={goToFirstPage}
          disabled={currentPage === 1}
          className={`
            p-2 rounded-lg transition-colors duration-150 touch-manipulation
            ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
            }
          `}
        >
          <ChevronDoubleLeftIcon className="w-4 h-4" />
        </button>

        {/* Previous Button */}
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`
            p-2 rounded-lg transition-colors duration-150 touch-manipulation
            ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
            }
          `}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>

        {/* Week Range Indicator */}
        <motion.span
          className="text-[0.75rem] sm:text-[0.85rem] font-grotesk text-neutral-800 dark:text-neutral-200 mx-3"
          key={`${firstWeekOnPage}-${lastWeekOnPage}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {currentWeeks.length > 0
            ? `${firstWeekOnPage}${
                firstWeekOnPage !== lastWeekOnPage ? `-${lastWeekOnPage}` : ""
              } of ${totalWeeks}`
            : "0 of 0"}
        </motion.span>

        {/* Next Button */}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`
            p-2 rounded-lg transition-colors duration-150 touch-manipulation
            ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
            }
          `}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>

        {/* Last Page Button */}
        <button
          onClick={goToLastPage}
          disabled={currentPage === totalPages}
          className={`
            p-2 rounded-lg transition-colors duration-150 touch-manipulation
            ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
            }
          `}
        >
          <ChevronDoubleRightIcon className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
