"use client";

import Link from "next/link";
import { ThemeToggleDot } from "./ui/theme-switch-button";
import { getButtonClass } from "@/utils/typography";

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

export default function MenuOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 bg-background text-foreground transition-colors duration-300">
      {/* Top-right: Close button */}
      <div className="absolute top-6 right-6">
        <button onClick={onClose} className={getButtonClass()}>
          Menu
        </button>
      </div>

      {/* Bottom-left: Nav links + Socials */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-6 text-sm">
        <nav className="flex flex-col gap-2 text-base">
          {menuItems.map((item) => (
            <Link
              href={`/${item.toLowerCase()}`}
              key={item}
              className={getButtonClass()}
              onClick={onClose}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap gap-4 text-xs pt-4 text-gray-400">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={getButtonClass()}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 right-6">
        <ThemeToggleDot />
      </div>
    </div>
  );
}
