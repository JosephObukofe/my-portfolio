import React from "react";

export function UnderlineLink({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block w-fit group ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        className="
          absolute bottom-0.5 left-0 h-[1px] w-full bg-current
          [@media(hover:none)]:scale-x-100
          [@media(hover:hover)]:transform 
          [@media(hover:hover)]:scale-x-100
          [@media(hover:hover)]:origin-left
          [@media(hover:hover)]:transition-transform 
          [@media(hover:hover)]:duration-500 
          [@media(hover:hover)]:ease-in-out
          [@media(hover:hover)]:group-hover:origin-right 
          [@media(hover:hover)]:group-hover:scale-x-0
        "
      />
    </span>
  );
}
