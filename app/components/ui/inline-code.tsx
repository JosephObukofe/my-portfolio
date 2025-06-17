"use client";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";
import React from "react";

interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
  size?: "base" | "sm" | "md" | "lg" | "xl";
  font?: string;
  color?: string;
  bgColor?: string;
  bordered?: boolean;
}

export function InlineCode({
  className,
  size = "base",
  font = "font-mono",
  color,
  bgColor,
  bordered = true,
  ...props
}: InlineCodeProps) {
  const {
    fontSize,
    padding,
    color: defaultColor,
    bgColor: defaultBg,
    border,
    rounded,
  } = typography.inlineCode;

  return (
    <code
      className={cn(
        font,
        fontSize.base,
        fontSize[size],
        padding.base,
        padding[size],
        color || defaultColor,
        bgColor || defaultBg,
        bordered && border,
        rounded,
        className
      )}
      {...props}
    />
  );
}