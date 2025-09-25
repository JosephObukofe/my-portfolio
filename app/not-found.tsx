"use client";

import {
  getHeadingClass,
  getParagraphClass,
  getSectionClass,
  getAllowanceClass,
  getPageAllowanceClass,
} from "@/utils/typography";
import { TransitionLink } from "@/app/components/PageTransition";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Learning", href: "/learning" },
  { name: "Catalog", href: "/catalog" },
];

const linkGroupVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const linkItemVariants = {
  hidden: { opacity: 0, y: 5 },
  show: { opacity: 1, y: 0 },
};

export default function NotFound() {
  return (
    <section
      className={getSectionClass({
        includeMarginTop: false,
        includeMarginBottom: true,
      })}
    >
      <div className={getPageAllowanceClass({ axis: "py" })}></div>
      <h1
        className={`${getHeadingClass(1, {
          responsive: true,
        })} text-[30px] sm:text-[40px] leading-relaxed`}
      >
        : (
      </h1>
      <h2 className={getHeadingClass(2, { responsive: true })}>
        Sorry, wrong turn
      </h2>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        You've reached a page that doesn't exist, kinda like my sleep schedule
      </p>
      <motion.div
        className={`grid grid-cols-4 gap-4 pt-4 ${getParagraphClass({
          responsive: true,
        })}`}
        variants={linkGroupVariants}
        initial="hidden"
        animate="show"
      >
        {quickLinks.map((link) => (
          <motion.div key={link.name} variants={linkItemVariants}>
            <TransitionLink
              href={link.href}
              className="block w-full hover:opacity-70 transition-opacity inline-flex items-center gap-1"
            >
              <span>{link.name}</span>
              <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
            </TransitionLink>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
