// components/LayoutShell.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { TransitionLink } from "@/app/components/PageTransition";
import DigitalTime from "./DigitalTime";
import Logo from "./Logo";
import { getButtonClass } from "@/utils/typography";
import { Copyright } from "./ui/Copyright";
import HomepageQuote from "./HomePageQuote";
import { useMenu } from "./MenuProvider";
import { usePageTransition } from "./PageTransitionProvider";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { toggleMenu, isMenuOpen, isMenuClosing } = useMenu(); // Add isMenuClosing here
  const isHomepage = pathname === "/";
  const { transitionStage } = usePageTransition();
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
  // Replace your existing homepage animation useEffect with this:
  useEffect(() => {
    // Check if homepage loading is active
    const loadingElement = document.getElementById("homepage-loading-active");
    const isLoadingActive =
      loadingElement?.getAttribute("data-loading") === "true";

    if (isHomepage && isLoadingActive) {
      // Loading animation is active - don't start LayoutShell animations
      setIsPageLoaded(false);
      setShowQuote(false);
      setShowTopElements(false);
      setShowBottomElements(false);
      return;
    }

    // Your existing homepage animation logic...
    if (isHomepage) {
      if (transitionStage !== "idle") {
        setIsPageLoaded(false);
        setShowQuote(false);
        setShowTopElements(false);
        setShowBottomElements(false);
        return;
      }

      setIsPageLoaded(false);
      setShowQuote(false);
      setShowTopElements(false);
      setShowBottomElements(false);

      const timeouts = [
        setTimeout(() => setIsPageLoaded(true), 50),
        setTimeout(() => setShowQuote(true), 150),
        setTimeout(() => {
          setShowTopElements(true);
          setShowBottomElements(true);
        }, 700),
      ];

      return () => {
        timeouts.forEach((timeout) => clearTimeout(timeout));
      };
    } else {
      setIsPageLoaded(true);
      setShowQuote(true);
      setShowTopElements(true);
      setShowBottomElements(true);
    }
  }, [isHomepage, pathname, transitionStage]);

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
  const fadeInClass = "transition-all duration-500 ease-in-out";

  // Updated to consider isMenuClosing
  const getQuoteOpacity = (shouldShow: boolean) =>
    shouldShow && !isMenuOpen && !isMenuClosing
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-4";

  // Updated visibility function to consider isMenuClosing
  const getElementVisibility = (
    shouldShow: boolean,
    hideWhenMenuOpen = false,
    hideOnMobileHomepage = false
  ) => {
    // Hide when menu is open OR closing (this keeps content hidden during exit)
    if (hideWhenMenuOpen && (isMenuOpen || isMenuClosing)) return "opacity-0";

    // Hide on mobile homepage (if specified) - show on desktop, hide on mobile
    if (hideOnMobileHomepage && isHomepage) {
      return shouldShow && !isMenuClosing
        ? "opacity-0 lg:opacity-100"
        : "opacity-0";
    }

    // Normal visibility - but respect the closing state
    return shouldShow && !isMenuClosing ? "opacity-100" : "opacity-0";
  };

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

      {/* TOP LEFT - Logo (Desktop: Always show, Mobile: Hide on homepage only) */}
      <TransitionLink
        href="/"
        className={`
          fixed top-8 left-8 z-50 cursor-pointer
          ${fadeInClass}
          ${getElementVisibility(showTopElements, true, true)}
        `}
      >
        <div className="text-[#212121] dark:text-[#FDFFF5] transition-opacity hover:opacity-70">
          <Logo />
        </div>
      </TransitionLink>

      {/* TOP RIGHT - Menu Button (Always visible - the hero of mobile homepage!) */}
      <div
        className={`
        fixed top-8 right-8 z-[60] flex items-center gap-4
        ${fadeInClass}
        ${getElementVisibility(showTopElements, false, false)}
      `}
      >
        <button
          onClick={toggleMenu}
          className={`${getButtonClass({
            muted: isMenuOpen,
            bold: false,
            font: "satoshi",
          })} sm:hover:!text-foreground`}
        >
          Menu
        </button>
      </div>

      {/* BOTTOM LEFT - Copyright (Desktop: Always show, Mobile: Hide on homepage only) */}
      <div
        className={`
          fixed bottom-8 left-8 z-50 hidden lg:block
          ${fadeInClass}
          ${getElementVisibility(showBottomElements, true, true)} 
        `}
      >
        <Copyright variant="muted" />
      </div>

      {/* BOTTOM RIGHT - Date/Time (Desktop: Always show, Mobile: Hide on homepage only) */}
      <div
        className={`
        fixed bottom-8 right-8 z-50 hidden lg:block
        ${fadeInClass}
        ${getElementVisibility(showBottomElements, true, true)}
      `}
      >
        <DigitalTime />
      </div>

      {/* CENTER - Homepage Quote (Fades when menu opens, always visible when menu closed) */}
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

      {/* Mobile Footer - Hide on mobile homepage, show on other pages */}
      <footer
        className={`
          ${isHomepage ? "fixed bottom-0 left-0 right-0" : ""} 
          flex justify-between items-center px-8 pb-8 lg:hidden
          ${isHomepage ? "flex-shrink-0" : ""}
          ${fadeInClass}
          ${getElementVisibility(showBottomElements, true, true)}
        `}
      >
        <Copyright variant="muted" />
        <DigitalTime />
      </footer>
    </div>
  );
}
