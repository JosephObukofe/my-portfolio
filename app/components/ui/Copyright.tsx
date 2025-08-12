"use client";

import React from "react";

interface CopyrightProps {
  year?: number;
  className?: string;
  variant?: "default" | "muted" | "minimal";
}

export function Copyright({
  year = new Date().getFullYear(),
  className = "",
  variant = "default",
}: CopyrightProps) {
  const baseClasses = "inline-flex items-center";

  const variants = {
    default: "text-foreground",
    muted: "text-muted-foreground",
    minimal: "text-muted-foreground opacity-60",
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}>
      <span className="font-satoshi text-[0.75rem] sm:text-[0.85rem] leading-none">
        ©
      </span>
      <span className="font-grotesk ml-1 text-[0.75rem] sm:text-[0.85rem] leading-none">
        {year}
      </span>
    </div>
  );
}
