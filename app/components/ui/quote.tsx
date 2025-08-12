"use client";

import React from "react";
import { motion } from "framer-motion";
import { getParagraphClass } from "@/utils/typography";

interface QuoteProps {
  quote?: string;
  className?: string;
  author?: string;
}

export default function Quote({
  quote = "Per aspera ad astra",
  author = "Latin proverb, cf. Virgil's Aeneid and Seneca's Hercules.",
  className = "",
}: QuoteProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[60vh] px-4 ${className}`}
    >
      {/* Large Quote Mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="text-[120px] sm:text-[140px] md:text-[160px] lg:text-[180px] leading-none font-serif text-foreground/20 select-none">
          "
        </div>
      </motion.div>

      {/* Quote Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-relaxed tracking-wide">
          {quote}
        </h1>
      </motion.div>

      {/* Quote Author */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        <p className={getParagraphClass({ responsive: true, muted: true })}>
          {author}
        </p>
      </motion.div>
    </div>
  );
}
