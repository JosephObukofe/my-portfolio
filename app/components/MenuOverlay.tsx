// components/MenuOverlay.tsx
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggleDot } from "./ui/theme-switch-button";
import { getButtonClass } from "@/utils/typography";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMenu } from "./MenuProvider";
import { usePageTransition } from "./PageTransitionProvider";

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
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1, // Animate out in reverse order
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
      stiffness: 400,
      damping: 40,
      mass: 0.6,
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: 7.5,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeIn",
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
  exit: {
    opacity: 0,
    y: 7.5,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: "easeIn",
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
  exit: {
    opacity: 0,
    y: 7.5,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: "easeIn",
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
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 5,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

// Group 3: Theme toggle - matching the same bouncy animation as other elements
const themeToggleVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 450,
      damping: 30,
      duration: 0.4,
      delay: 1.4,
    },
  },
  exit: {
    opacity: 0,
    y: 5,
    scale: 0.81,
    transition: {
      duration: 0.2,
      ease: "easeIn",
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
      delay: 0.1,
    },
  },
};

const socialLinkHoverVariants = {
  rest: { opacity: 0.5 },
  hover: { opacity: 1 },
};

export default function MenuOverlay() {
  const { isMenuOpen, closeMenu } = useMenu();
  const { startTransition, transitionStage } = usePageTransition();
  const router = useRouter();
  const pathname = usePathname(); // Get current pathname directly

  // Function to check if a menu item is active
  const isActiveItem = (item: string) => {
    // Special handling for Home
    if (item === "Home") {
      return pathname === "/";
    }

    const itemPath = `/${item.toLowerCase()}`;
    // Check for exact match or if current path starts with the item path
    return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
  };

  // Check if user is on home page
  const isOnHomePage = pathname === "/";

  const overlayVariants = isOnHomePage
    ? {
        // Home page variants - NO blur at all
        hidden: {
          opacity: 0,
          backdropFilter: "blur(0px)",
        },
        visible: {
          opacity: 1,
          backdropFilter: "blur(0px)", // Keep it at 0px for home page
          transition: {
            duration: 0.4,
            ease: "easeOut",
          },
        },
        exit: {
          opacity: 0,
          backdropFilter: "blur(0px)", // Still 0px on exit
          transition: {
            duration: 0.4, // Match the entry duration
            ease: "easeOut", // Match the entry easing
          },
        },
      }
    : {
        // Other pages variants - WITH blur effect
        hidden: {
          opacity: 0,
          backdropFilter: "blur(0px)",
        },
        visible: {
          opacity: 1,
          backdropFilter: "blur(8px)", // Nice blur for other pages
          transition: {
            duration: 0.4,
            ease: "easeOut",
          },
        },
        exit: {
          opacity: 0,
          backdropFilter: "blur(0px)",
          transition: {
            duration: 0.4, // Match the entry duration
            ease: "easeOut", // Match the entry easing
            delay: 0.6,
          },
        },
      };

  // Handle clicking outside the menu content areas
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeMenu();
    }
  };

  useEffect(() => {
    if (transitionStage === "menuExit") {
      closeMenu();
    }
  }, [transitionStage, closeMenu]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, closeMenu]);

  // Handle menu item click
  const handleMenuClick = (href: string) => {
    // Start the transition sequence instead of immediate navigation
    startTransition(href);
    // Keep menu open during transition - it will close as part of the sequence
    // closeMenu(); // Remove this line
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          data-menu-overlay
          className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm text-foreground cursor-pointer"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackgroundClick}
        >
          {/* Main content container - orchestrates the sequential animation */}
          <motion.div
            className="absolute bottom-8 left-8 flex flex-col gap-6 text-sm cursor-default"
            onClick={(e) => e.stopPropagation()}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
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
                  <button
                    onClick={() => handleMenuClick("/")}
                    className="group lowercase font-satoshi tracking-tighter flex items-center text-[40px] leading-[48px] sm:text-[48px] sm:leading-[60px] md:text-[56px] md:leading-[72px] lg:text-[64px] lg:leading-[84px] cursor-pointer"
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
                  </button>
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
                      <button
                        onClick={() =>
                          handleMenuClick(`/${item.toLowerCase()}`)
                        }
                        className="group lowercase font-satoshi tracking-tighter flex items-center text-[40px] leading-[48px] sm:text-[48px] sm:leading-[60px] md:text-[56px] md:leading-[72px] lg:text-[64px] lg:leading-[84px] cursor-pointer"
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
                              className="inline-block ml-[0.5]"
                              style={{
                                fontSize: "1.1em",
                                lineHeight: "0.8",
                                verticalAlign: "baseline",
                              }}
                            >
                              .
                            </motion.span>
                          )}
                        </motion.span>
                      </button>
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
                    bold: false,
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

          {/* Group 3: Theme Toggle */}
          <motion.div
            className="absolute bottom-8 right-8 cursor-default"
            onClick={(e) => e.stopPropagation()}
            variants={themeToggleVariants}
            initial="hidden"
            animate={transitionStage === "idle" ? "visible" : "exit"}
            exit="exit"
            style={{
              WebkitTapHighlightColor: "transparent",
              WebkitUserSelect: "none",
              userSelect: "none",
              touchAction: "manipulation",
            }}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <ThemeToggleDot />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
