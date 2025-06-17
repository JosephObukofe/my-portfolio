"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

type NavItemProps = {
  label: string;
  href: string;
};

export default function NavItem({ label, href }: NavItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <div
        className="relative font-mono text-xl cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="inline-block">{label}</span>
        <motion.span
          className="inline-block"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          style={{
            marginLeft: "2px",
            visibility: hovered ? "visible" : "hidden",
          }}
        >
          _
        </motion.span>
      </div>
    </Link>
  );
}
