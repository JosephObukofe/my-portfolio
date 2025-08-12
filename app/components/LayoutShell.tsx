"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ThemeToggleDot } from "./ui/theme-switch-button";
import DigitalTime from "./DigitalTime";
import Logo from "./Logo";
import { getButtonClass } from "@/utils/typography";
import { Copyright } from "./ui/Copyright";
import HomepageQuote from "./HomePageQuote";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isMenu = pathname === "/menu";
  const isHomepage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (pathname !== "/menu") {
      sessionStorage.setItem("previousPath", pathname);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      // Only activate frosted effect when scrolled a bit
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = () => {
    if (isMenu) {
      const prev = sessionStorage.getItem("previousPath");
      if (prev && prev !== "/menu") {
        router.push(prev);
      } else {
        router.push("/");
      }
      sessionStorage.removeItem("previousPath");
    } else {
      router.push("/menu");
    }
  };

  return (
    <div
      className={`
      ${isHomepage ? "h-screen overflow-hidden" : "min-h-screen"} 
      flex flex-col
    `}
    >
      {/* Mobile Frosted Glass Backdrop - Only on mobile, clean and simple */}
      <div
        className={`
          fixed inset-x-0 top-0 h-20 z-40 transition-all duration-300 ease-out
          lg:hidden
          ${isScrolled ? "bg-background/70 backdrop-blur-sm" : "bg-transparent"}
        `}
      />

      {/* TOP LEFT - Logo (Desktop: Fixed Corner, Mobile: Fixed Top) */}
      {!isMenu && (
        <Link href="/" className="fixed top-8 left-8 z-50 cursor-pointer">
          <div className="text-[#212121] dark:text-[#FDFFF5] transition-opacity hover:opacity-70">
            <Logo />
          </div>
        </Link>
      )}

      {/* TOP RIGHT - Menu Button (Desktop: Fixed Corner, Mobile: Fixed Top) */}
      <div className="fixed top-8 right-8 z-50 flex items-center gap-4">
        <button
          onClick={handleMenuClick}
          className={`${getButtonClass({
            muted: isMenu,
            bold: false,
            font: "satoshi",
          })} transition-all hover:scale-105`}
          aria-pressed={isMenu}
        >
          Menu
        </button>
      </div>

      {/* BOTTOM LEFT - Copyright (Desktop: Fixed Corner, Mobile: Footer) */}
      {!isMenu && (
        <div className="fixed bottom-8 left-8 z-50 hidden lg:block">
          <Copyright variant="muted" />
        </div>
      )}

      {/* BOTTOM RIGHT - Date/Time (Desktop: Fixed Corner, Mobile: Footer) */}
      {!isMenu && (
        <div className="fixed bottom-8 right-8 z-50 hidden lg:block">
          <div className="text-sm">
            <DigitalTime />
          </div>
        </div>
      )}

      {/* CENTER - Homepage Quote (Visually centered, accounting for footer weight) */}
      {isHomepage && !isMenu && (
        <div
          className="fixed left-1/2 transform -translate-x-1/2 z-50"
          style={{ top: "45%", transform: "translateX(-50%) translateY(-50%)" }}
        >
          <HomepageQuote />
        </div>
      )}

      {/* Main Content Area - Different behavior for homepage vs content pages */}
      <main
        className={`flex-1 max-w-2xl mx-4 lg:mx-auto ${
          isHomepage ? "min-h-0" : ""
        }`}
      >
        <div className="flex-auto min-w-0 flex flex-col px-4 md:px-6">
          <div
            className={`
            ${
              isHomepage
                ? "pt-20 pb-2 lg:pt-24 lg:pb-24 flex-1 flex flex-col justify-center lg:justify-start"
                : "pt-20 pb-6 lg:pt-24 lg:pb-24"
            }
          `}
          >
            <div className="flex-auto min-w-0 flex flex-col">{children}</div>
          </div>
        </div>
      </main>

      {/* Mobile Footer - Different positioning for homepage */}
      {!isMenu && (
        <footer
          className={`
          flex justify-between items-center px-8 pb-8 lg:hidden
          ${isHomepage ? "flex-shrink-0" : ""}
        `}
        >
          <Copyright variant="muted" />
          <div className="text-sm">
            <DigitalTime />
          </div>
        </footer>
      )}

      {/* Theme toggle for menu page */}
      {isMenu && (
        <footer className="flex justify-end px-8 pb-8">
          <ThemeToggleDot />
        </footer>
      )}
    </div>
  );
}
