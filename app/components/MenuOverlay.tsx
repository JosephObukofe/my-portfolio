"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggleDot } from "./ui/theme-switch-button";
import { getButtonClass } from "@/utils/typography";

const menuItems = ["About", "Learning", "Catalog"];
const socialLinks = [
  { name: "Read.cv", href: "https://read.cv/jojochuu" },
  { name: "Github", href: "https://github.com/obukofejoe" },
  {
    name: "Linkedin",
    href: "https://linkedin.com/in/obukofeuririoghenejoseph",
  },
  { name: "Email", href: "mailto:obukofeuririoghenejoseph@gmail.com" },
];

// Animation variants for the overlay background
const overlayVariants = {
  hidden: {
    opacity: 0,
    backdropFilter: "blur(0px)",
  },
  visible: {
    opacity: 1,
    backdropFilter: "blur(12px)",
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// Animation variants for menu items container
const contentVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: 0.2,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

// Animation variants for individual menu items
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      mass: 0.8,
    },
  },
};

// Animation variants for menu item hover
const menuItemHoverVariants = {
  rest: {
    opacity: 0.7,
    scale: 1,
    x: 0,
  },
  hover: {
    opacity: 1,
    scale: 1.02,
    x: 8,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

// Animation variants for social links
const socialVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const socialItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25,
    },
  },
};

// Animation variants for close button
const closeButtonVariants = {
  hidden: {
    opacity: 0,
    rotate: -90,
    scale: 0.8,
  },
  visible: {
    opacity: 0.6,
    rotate: 0,
    scale: 1,
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  hover: {
    opacity: 1,
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

// Animation variants for theme toggle - NOW ANIMATES AFTER SOCIAL LINKS
const themeToggleVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: 180,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      delay: 1.3, // ✅ Properly timed to animate after social links complete their spring animations
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function MenuOverlay({ onClose }: { onClose: () => void }) {
  // Handle clicking outside the menu content
  const handleOverlayClick = (e: React.MouseEvent) => {
    // Only close if clicking the overlay itself, not its children
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 cursor-pointer"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          // Fallback for browsers that don't support backdrop-filter
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={handleOverlayClick}
      >
        {/* Glass effect overlay - this creates the frosted glass look */}
        <div
          className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-black/5 dark:from-white/5 dark:via-black/10 dark:to-black/20"
          style={{
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          }}
        />

        {/* Close button - positioned to not interfere with content clicks */}
        <motion.div
          className="absolute top-6 right-6 cursor-pointer"
          variants={closeButtonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          onClick={onClose}
        >
          <span className={`${getButtonClass()} transition-all duration-200`}>
            Menu
          </span>
        </motion.div>

        {/* Main menu content */}
        <motion.div
          className="absolute bottom-6 left-6 cursor-default"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking menu content
        >
          {/* Navigation Links */}
          <motion.nav className="flex flex-col gap-2 text-base mb-6">
            {menuItems.map((item, index) => (
              <motion.div
                key={item}
                variants={itemVariants}
                initial="rest"
                animate="visible"
                whileHover="hover"
                className="relative"
              >
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="group uppercase font-grotesk tracking-tight flex items-center cursor-pointer text-[40px] leading-[48px] sm:text-[48px] sm:leading-[60px] md:text-[56px] md:leading-[72px] lg:text-[64px] lg:leading-[84px]"
                  onClick={onClose}
                >
                  <motion.span
                    variants={menuItemHoverVariants}
                    className="transition-all duration-300"
                  >
                    {item}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Social Links */}
          <motion.div
            className="flex flex-wrap gap-4 text-xs pt-4"
            variants={socialVariants}
            initial="hidden"
            animate="visible"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={socialItemVariants}
                whileHover="hover"
                className={`${getButtonClass({
                  bold: true,
                  muted: true,
                })} cursor-pointer transition-all duration-200`}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Theme Toggle */}
        <motion.div
          className="absolute bottom-6 right-6 cursor-default"
          variants={themeToggleVariants}
          initial="hidden"
          animate="visible"
          onClick={(e) => e.stopPropagation()}
        >
          <ThemeToggleDot />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
