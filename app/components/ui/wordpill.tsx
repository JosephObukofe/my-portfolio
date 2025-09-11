import React from "react";

interface WordPillProps {
  text: string;
  className?: string;
}

export default function WordPill({ text, className }: WordPillProps) {
  return (
    <span
      className={`
        text-[0.55rem] sm:text-[0.65rem] inline-block rounded-full border border-current bg-transparent
        px-1.5 py-0.5 font-satoshi tracking-relaxed
        transition-all duration-200 ease-out
        ${className}
      `}
    >
      {text}
    </span>
  );
}
