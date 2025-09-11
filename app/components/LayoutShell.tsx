"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import DigitalTime from "./DigitalTime";
import Logo from "./Logo";
import { getButtonClass } from "@/utils/typography";
import { Copyright } from "./ui/Copyright";
import HomepageQuote from "./HomePageQuote";
import { useMenu } from "./MenuProvider";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { toggleMenu, isMenuOpen } = useMenu(); // 👈 Get menu state
  const isHomepage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  // Animation states for homepage load sequence
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [showTopElements, setShowTopElements] = useState(false);
  const [showBottomElements, setShowBottomElements] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only activate frosted effect when scrolled a bit
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Homepage animation sequence
  useEffect(() => {
    if (isHomepage) {
      // Reset all states when entering homepage
      setIsPageLoaded(false);
      setShowQuote(false);
      setShowTopElements(false);
      setShowBottomElements(false);

      // Start the animation sequence - much snappier timing
      const timeouts = [
        // Step 1: Page loads with background (immediate)
        setTimeout(() => setIsPageLoaded(true), 50),

        // Step 2: Quote fades in (after 300ms)
        setTimeout(() => setShowQuote(true), 300),

        // Step 3: Top elements fade in (after 600ms)
        setTimeout(() => setShowTopElements(true), 600),

        // Step 4: Bottom elements fade in (after 900ms)
        setTimeout(() => setShowBottomElements(true), 900),
      ];

      // Cleanup timeouts on unmount or route change
      return () => {
        timeouts.forEach((timeout) => clearTimeout(timeout));
      };
    } else {
      // For non-homepage routes, show everything immediately
      setIsPageLoaded(true);
      setShowQuote(true);
      setShowTopElements(true);
      setShowBottomElements(true);
    }
  }, [isHomepage, pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      // Lock the document
      document.documentElement.style.position = "fixed";
      document.documentElement.style.top = `-${scrollY}px`;
      document.documentElement.style.left = `-${scrollX}px`;
      document.documentElement.style.width = "100%";
      document.documentElement.style.overflow = "hidden";

      // Store scroll positions for restoration
      document.documentElement.dataset.scrollY = scrollY.toString();
      document.documentElement.dataset.scrollX = scrollX.toString();
    } else {
      // Get stored scroll positions
      const scrollY = parseInt(document.documentElement.dataset.scrollY || "0");
      const scrollX = parseInt(document.documentElement.dataset.scrollX || "0");

      // Remove lock styles first
      document.documentElement.style.position = "";
      document.documentElement.style.top = "";
      document.documentElement.style.left = "";
      document.documentElement.style.width = "";
      document.documentElement.style.overflow = "";

      // Multiple restoration attempts with increasing delays
      const restoreScroll = () => {
        window.scrollTo(scrollX, scrollY);
      };

      // Immediate restoration
      restoreScroll();

      // Backup restorations in case the first doesn't work
      requestAnimationFrame(restoreScroll);
      setTimeout(restoreScroll, 0);
      setTimeout(restoreScroll, 10);
      setTimeout(restoreScroll, 50);
    }

    return () => {
      // Cleanup on unmount
      document.documentElement.style.position = "";
      document.documentElement.style.top = "";
      document.documentElement.style.left = "";
      document.documentElement.style.width = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Animation classes for smooth transitions
  const fadeInClass = "transition-all duration-500 ease-out";
  const getQuoteOpacity = (shouldShow: boolean) =>
    shouldShow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
  const getCornerElementOpacity = (
    shouldShow: boolean,
    hideWhenMenuOpen = false
  ) =>
    shouldShow && (!hideWhenMenuOpen || !isMenuOpen)
      ? "opacity-100"
      : "opacity-0"; // 👈 Hide when menu is open

  return (
    <div
      className={`
        ${isHomepage ? "h-screen overflow-hidden" : "min-h-screen"} 
        flex flex-col
        ${fadeInClass}
        ${isPageLoaded ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* Mobile Frosted Glass Backdrop - Only on mobile, clean and simple */}
      <div
        className={`
          fixed inset-x-0 top-0 h-20 z-40 transition-all duration-300 ease-out
          lg:hidden
          ${
            isScrolled || isMenuOpen
              ? "bg-background/70 backdrop-blur-sm"
              : "bg-transparent"
          }
        `}
      />

      {/* TOP LEFT - Logo (Desktop: Fixed Corner, Mobile: Fixed Top) */}
      <Link
        href="/"
        className={`
          fixed top-8 left-8 z-50 cursor-pointer
          ${fadeInClass}
          ${getCornerElementOpacity(showTopElements, true)}
        `}
      >
        <div className="text-[#212121] dark:text-[#FDFFF5] transition-opacity hover:opacity-70">
          <Logo />
        </div>
      </Link>

      {/* TOP RIGHT - Menu Button (Desktop: Fixed Corner, Mobile: Fixed Top) */}
      <div
        className={`
        fixed top-8 right-8 z-[60] flex items-center gap-4
        ${fadeInClass}
        ${getCornerElementOpacity(showTopElements)}
      `}
      >
        <button
          onClick={toggleMenu}
          className={`${getButtonClass({
            muted: isMenuOpen, // Put this back
            bold: false,
            font: "satoshi",
          })} sm:hover:!text-foreground`} // Use !important to override muted state on hover
        >
          Menu
        </button>
      </div>

      {/* BOTTOM LEFT - Copyright (Desktop: Fixed Corner, Mobile: Footer) - 👈 Fades when menu opens */}
      <div
        className={`
          fixed bottom-8 left-8 z-50 hidden lg:block
          ${fadeInClass}
          ${getCornerElementOpacity(showBottomElements, true)} 
        `}
      >
        <Copyright variant="muted" />
      </div>

      {/* BOTTOM RIGHT - Date/Time (Desktop: Fixed Corner, Mobile: Footer) - 👈 Fades when menu opens */}
      <div
        className={`
          fixed bottom-8 right-8 z-50 hidden lg:block
          ${fadeInClass}
          ${getCornerElementOpacity(showBottomElements, true)}
        `}
      >
        <div className="text-sm">
          <DigitalTime />
        </div>
      </div>

      {/* CENTER - Homepage Quote (Visually centered, accounting for footer weight) - 👈 Fades when menu opens */}
      {isHomepage && (
        <div
          className={`
            fixed left-1/2 transform -translate-x-1/2 z-50
            ${fadeInClass}
            ${getQuoteOpacity(showQuote && !isMenuOpen)} 
          `}
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
                ? "pt-20 pb-16 lg:pt-24 lg:pb-24 flex-1 flex flex-col justify-center lg:justify-start"
                : "pt-20 pb-6 lg:pt-24 lg:pb-24"
            }
          `}
          >
            <div className="flex-auto min-w-0 flex flex-col">{children}</div>
          </div>
        </div>
      </main>

      {/* Mobile Footer - Different positioning for homepage - 👈 Fades when menu opens */}
      <footer
        className={`
          ${isHomepage ? "fixed bottom-0 left-0 right-0" : ""} 
          flex justify-between items-center px-8 pb-8 lg:hidden
          ${isHomepage ? "flex-shrink-0" : ""}
          ${fadeInClass}
          ${getCornerElementOpacity(showBottomElements, true)}
        `}
      >
        <Copyright variant="muted" />
        <div className="text-sm">
          <DigitalTime />
        </div>
      </footer>
    </div>
  );
}
