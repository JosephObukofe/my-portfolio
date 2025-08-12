"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function InlineCode({ className, children, ...props }: InlineCodeProps) {
  return (
    <code
      className={cn(
        "font-mono",
        "text-[0.65rem] sm:text-[0.75rem]",
        "px-1.5 py-[1px] sm:px-2 sm:py-[2px]",
        "text-[#E03E3E] bg-[#F1F1F0]",
        "dark:text-[#FF7262] dark:bg-[#2F2F2F]",
        "rounded-md",
        "transition-colors duration-200",
        "font-medium",
        "whitespace-nowrap inline-block",
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
}
