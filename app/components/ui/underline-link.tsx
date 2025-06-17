import Link from "next/link";
import React from "react";

export function UnderlineLink({
  children,
  href,
  target,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  target?: string;
  className?: string;
}) {
  const isExternal = href.startsWith("http");

  const linkClasses = `relative inline-block font-semibold w-fit group ${className}`;

  const underline = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        className="
          absolute bottom-0.5 left-0 h-[1px] w-full bg-current
          transform scale-x-100
          origin-left
          transition-transform duration-500 ease-in-out
          group-hover:origin-right group-hover:scale-x-0
        "
      />
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target={target || "_blank"}
        rel="noopener noreferrer"
        className={linkClasses}
      >
        {underline}
      </a>
    );
  }

  return (
    <Link href={href} target={target} className={linkClasses}>
      {underline}
    </Link>
  );
}
