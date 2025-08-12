// app/menu/page.tsx - Menu page with active state detection
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggleDot } from "../components/ui/theme-switch-button";
import { getButtonClass } from "@/utils/typography";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const menuItems = ["About", "Learning", "Catalog"];
const socialLinks = [
  { name: "X", href: "https://read.cv/jojochuu" },
  {
    name: "Linkedin",
    href: "https://linkedin.com/in/obukofeuririoghenejoseph",
  },
  { name: "Github", href: "https://github.com/obukofejoe" },
  { name: "Email", href: "mailto:obukofeuririoghenejoseph@gmail.com" },
];

// Container variants - orchestrates the overall timing INCLUDING theme toggle
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5, // 0.5 seconds between each group
      delayChildren: 0.05,
    },
  },
};

// Group 1: Navigation items - gentle bounce entrance
const navGroupVariants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.6,
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
};

// Individual navigation items - subtle entrance
const navItemVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 28,
      duration: 0.3,
    },
  },
};

// Group 2: Social links - gentle rise
const socialGroupVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 26,
      mass: 0.5,
      duration: 0.35,
      when: "beforeChildren",
      staggerChildren: 0.04,
    },
  },
};

// Individual social links - gentle appearance
const socialItemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 450,
      damping: 30,
      duration: 0.25,
    },
  },
};

// Group 3: Theme toggle - matching the same bouncy animation as other elements
const themeToggleVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4, // Slightly longer for a more gentle feel
      ease: "easeOut", // Smooth easing instead of spring physics
      delay: 1.4, // Keep the same timing in the sequence
    },
  },
};

// Enhanced hover variants with active state support
const menuItemHoverVariants = {
  rest: { opacity: 0.5 },
  hover: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  active: {
    opacity: 1, // Always full opacity for active items
  },
};

// Variants for the full stop indicator
const fullStopVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25,
      duration: 0.3,
      delay: 0.1, // Slight delay for elegant entrance
    },
  },
};

const socialLinkHoverVariants = {
  rest: { opacity: 0.5 },
  hover: { opacity: 1 },
};

export default function MenuPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize previousPath synchronously from searchParams or sessionStorage
  const [previousPath, setPreviousPath] = useState<string>(() => {
    // Try to get the value immediately on mount
    const fromParam = searchParams.get("from");
    if (fromParam) return fromParam;

    // Check sessionStorage synchronously
    if (typeof window !== "undefined") {
      const storedPath = sessionStorage.getItem("previousPath");
      if (storedPath && storedPath !== "/menu") return storedPath;
    }

    return "/"; // Default to home
  });

  // Still check referrer as a fallback after mount
  useEffect(() => {
    // Only check referrer if we don't already have a path
    if (
      previousPath === "/" &&
      typeof document !== "undefined" &&
      document.referrer
    ) {
      try {
        const referrerUrl = new URL(document.referrer);
        if (referrerUrl.origin === window.location.origin) {
          const path = referrerUrl.pathname;
          if (path !== "/menu" && path !== "/") {
            setPreviousPath(path);
          }
        }
      } catch (e) {
        console.error("Could not parse referrer:", e);
      }
    }
  }, []);

  // Check if user is on home page
  const isOnHomePage = previousPath === "/";

  // Function to check if a menu item is active
  const isActiveItem = (item: string) => {
    // Special handling for Home
    if (item === "Home") {
      return previousPath === "/";
    }

    const itemPath = `/${item.toLowerCase()}`;
    // Check for exact match or if current path starts with the item path
    // This handles both /about and /about/subpage scenarios
    return previousPath === itemPath || previousPath.startsWith(`${itemPath}/`);
  };

  // Handle clicking outside the menu content areas
  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Only close if clicking the background itself, not menu content
    if (e.target === e.currentTarget) {
      router.back();
    }
  };

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [router]);

  return (
    <div
      className="fixed inset-0 z-40 bg-background text-foreground transition-colors duration-500 ease-in-out cursor-pointer"
      onClick={handleBackgroundClick}
    >
      {/* Main content container - orchestrates the sequential animation */}
      <motion.div
        className="absolute bottom-8 left-8 flex flex-col gap-6 text-sm cursor-default"
        onClick={(e) => e.stopPropagation()}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Group 1: Navigation Links */}
        <motion.nav
          className="flex flex-col gap-2 text-base"
          variants={navGroupVariants}
        >
          {/* Home link - always in DOM, controlled by CSS */}
          <motion.div
            variants={navItemVariants}
            className="relative flex items-center"
            style={{
              display: isOnHomePage ? "none" : "flex",
            }}
          >
            <motion.div initial="rest" whileHover="hover" animate="rest">
              <Link
                href="/"
                className="group lowercase font-satoshi tracking-tighter flex items-center text-[40px] leading-[48px] sm:text-[48px] sm:leading-[60px] md:text-[56px] md:leading-[72px] lg:text-[64px] lg:leading-[84px]"
                style={{
                  WebkitTapHighlightColor: "transparent",
                  WebkitUserSelect: "none",
                  userSelect: "none",
                  touchAction: "manipulation",
                }}
              >
                <motion.span
                  variants={menuItemHoverVariants}
                  className="inline-flex items-baseline"
                >
                  Home
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Other menu items */}
          {menuItems.map((item) => {
            const isActive = isActiveItem(item);

            return (
              <motion.div
                key={item}
                variants={navItemVariants}
                className="relative flex items-center"
              >
                <motion.div
                  initial={isActive ? "active" : "rest"}
                  whileHover="hover"
                  animate={isActive ? "active" : "rest"}
                >
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="group lowercase font-satoshi tracking-tighter flex items-center text-[40px] leading-[48px] sm:text-[48px] sm:leading-[60px] md:text-[56px] md:leading-[72px] lg:text-[64px] lg:leading-[84px]"
                    style={{
                      WebkitTapHighlightColor: "transparent",
                      WebkitUserSelect: "none",
                      userSelect: "none",
                      touchAction: "manipulation",
                    }}
                  >
                    <motion.span
                      variants={menuItemHoverVariants}
                      className="inline-flex items-baseline"
                    >
                      {item}
                      {/* Full stop indicator for active page */}
                      {isActive && (
                        <motion.span
                          variants={fullStopVariants}
                          initial="hidden"
                          animate="visible"
                          className="inline-block ml-1"
                          style={{
                            // Making the full stop slightly bigger - about 110% of the text size
                            fontSize: "1.1em",
                            // Adjusting the baseline to align nicely with the text
                            lineHeight: "0.8",
                            // Ensuring it's properly positioned
                            verticalAlign: "baseline",
                          }}
                        >
                          .
                        </motion.span>
                      )}
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.nav>

        {/* Group 2: Social Links */}
        <motion.div
          className="flex flex-wrap gap-4 text-xs pt-4"
          variants={socialGroupVariants}
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={socialItemVariants}
              className={getButtonClass({
                bold: true,
                muted: false,
                font: "satoshi",
              })}
              style={{
                WebkitTapHighlightColor: "transparent",
                WebkitUserSelect: "none",
                userSelect: "none",
                touchAction: "manipulation",
              }}
            >
              <motion.span
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={socialLinkHoverVariants}
                transition={{ duration: 0.3 }}
              >
                {link.name}
              </motion.span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Group 3: Theme Toggle - bouncy entrance following social links */}
      <motion.div
        className="absolute bottom-8 right-8 cursor-default"
        onClick={(e) => e.stopPropagation()}
        variants={themeToggleVariants}
        initial="hidden"
        animate="visible"
        style={{
          WebkitTapHighlightColor: "transparent",
          WebkitUserSelect: "none",
          userSelect: "none",
          touchAction: "manipulation",
        }}
      >
        <ThemeToggleDot />
      </motion.div>
    </div>
  );
}
