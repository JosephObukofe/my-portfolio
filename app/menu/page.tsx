"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggleDot } from "../components/ui/theme-switch-button";
import { getButtonClass } from "@/utils/typography";
import NavItem from "../components/NavItem";

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

// Variants for text hover effect
const menuItemVariants = {
  rest: { opacity: 0.5 },
  hover: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const socialLinkVariants = {
  rest: { opacity: 0.5 },
  hover: { opacity: 1 },
};

export default function MenuPage() {
  return (
    <div className="fixed inset-0 z-40 bg-background text-foreground transition-colors duration-500 ease-in-out">
      <div className="absolute bottom-6 left-6 flex flex-col gap-6 text-sm">
        {/* Nav Links */}
        <nav className="flex flex-col gap-2 text-base">
          {menuItems.map((item) => (
            <motion.div
              key={item}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="relative flex items-center"
            >
              <Link
                href={`/${item.toLowerCase()}`}
                className="group text-[64px] leading-[84px] uppercase font-grotesk tracking-tight flex items-center"
              >
                <motion.span variants={menuItemVariants}>{item}</motion.span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Social Links */}
        <div className="flex flex-wrap gap-4 text-xs pt-4">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={socialLinkVariants}
              transition={{ duration: 0.3 }}
              className={getButtonClass({ bold: true, muted: true })}
            >
              {link.name}
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
