"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { getTextClass } from "@/utils/typography";

export default function Page() {
  // Loading states
  const [loadingState, setLoadingState] = useState<
    "first-visit-loading" | "ready"
  >("first-visit-loading");

  // Counter animation states
  const [displayCounter, setDisplayCounter] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  // Anti-flash system (copied from PageTransition)
  const [frozenContent, setFrozenContent] = useState<React.ReactNode>(null);
  const [allowImmediateContent, setAllowImmediateContent] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const contentRef = useRef<React.ReactNode>(null);

  // Spring animation for counter
  const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 0.8,
  };

  const animatedProgress = useSpring(0, springConfig);
  const roundedCounter = useTransform(animatedProgress, (value) =>
    Math.round(value)
  );

  // Update display counter when spring changes
  useEffect(() => {
    const unsubscribe = roundedCounter.on("change", setDisplayCounter);
    return unsubscribe;
  }, [roundedCounter]);

  // Anti-flash system: Immediately prevent content flash on mount
  useLayoutEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);

      // IMMEDIATELY prevent content from showing
      setAllowImmediateContent(false);

      // Freeze any existing content
      setFrozenContent(contentRef.current);

      const checkFirstVisit = () => {
        try {
          const hasVisitedBefore = localStorage.getItem("hasVisitedSite");

          if (hasVisitedBefore === "true") {
            // Returning visitor - allow content immediately
            setLoadingState("ready");
            setAllowImmediateContent(true);
            setFrozenContent(null);
          } else {
            // First visit - keep loading state and frozen content
            setLoadingState("first-visit-loading");
            // Don't allow content until loading completes
          }
        } catch (error) {
          // Fallback: allow content
          setLoadingState("ready");
          setAllowImmediateContent(true);
          setFrozenContent(null);
        }
      };

      // Check immediately
      checkFirstVisit();
    }
  }, [isInitialMount]);

  // Hybrid loading progress tracking
  useEffect(() => {
    if (loadingState !== "first-visit-loading") return;

    let currentProgress = 0;
    let fadeOutTimer: NodeJS.Timeout;
    let isRealLoadingComplete = false;
    let isMinimumTimeComplete = false;

    const MINIMUM_LOADING_TIME = 3500;

    const updateProgress = (newProgress: number) => {
      currentProgress = Math.max(currentProgress, newProgress);
      animatedProgress.set(currentProgress);
    };

    const checkIfShouldComplete = () => {
      if (isRealLoadingComplete && isMinimumTimeComplete) {
        updateProgress(100);

        setTimeout(() => {
          setIsCompleting(true);

          fadeOutTimer = setTimeout(() => {
            localStorage.setItem("hasVisitedSite", "true");
            setLoadingState("ready");
            setIsCompleting(false);

            // Allow content to show after loading completes
            setAllowImmediateContent(true);
            setFrozenContent(null);
          }, 1000);
        }, 300);
      }
    };

    // Start with immediate progress
    updateProgress(10);

    // Real loading tracking
    const trackRealLoading = () => {
      const handleReadyStateChange = () => {
        if (document.readyState === "interactive") {
          updateProgress(30);
        } else if (document.readyState === "complete") {
          updateProgress(50);
        }
      };

      document.addEventListener("readystatechange", handleReadyStateChange);

      const trackFontLoading = async () => {
        try {
          if ("fonts" in document) {
            const fontPromise = Promise.race([
              document.fonts.ready,
              new Promise((resolve) => setTimeout(resolve, 1500)),
            ]);

            await fontPromise;
            updateProgress(65);
          } else {
            setTimeout(() => updateProgress(65), 800);
          }
        } catch (error) {
          updateProgress(65);
        }
      };

      trackFontLoading();

      const handleWindowLoad = () => {
        updateProgress(80);
      };

      if (document.readyState === "complete") {
        handleWindowLoad();
      } else {
        window.addEventListener("load", handleWindowLoad);
      }

      const markRealLoadingComplete = () => {
        updateProgress(90);
        isRealLoadingComplete = true;
        checkIfShouldComplete();
      };

      setTimeout(markRealLoadingComplete, 2000);
      window.addEventListener("load", () => {
        setTimeout(markRealLoadingComplete, 200);
      });

      return () => {
        document.removeEventListener(
          "readystatechange",
          handleReadyStateChange
        );
        window.removeEventListener("load", handleWindowLoad);
      };
    };

    // Minimum time tracking
    const trackMinimumTime = () => {
      const progressSteps = [
        { time: 200, progress: 15 },
        { time: 500, progress: 25 },
        { time: 800, progress: 40 },
        { time: 1200, progress: 55 },
        { time: 1600, progress: 70 },
        { time: 2000, progress: 85 },
        { time: 2800, progress: 92 },
      ];

      progressSteps.forEach(({ time, progress }) => {
        setTimeout(() => {
          if (currentProgress < progress) {
            updateProgress(progress);
          }
        }, time);
      });

      setTimeout(() => {
        isMinimumTimeComplete = true;
        checkIfShouldComplete();
      }, MINIMUM_LOADING_TIME);
    };

    const cleanupRealLoading = trackRealLoading();
    trackMinimumTime();

    return () => {
      if (fadeOutTimer) clearTimeout(fadeOutTimer);
      if (cleanupRealLoading) cleanupRealLoading();
    };
  }, [loadingState, animatedProgress]);

  // Determine what to render based on loading state
  const isCurrentlyLoading = loadingState === "first-visit-loading";

  if (isCurrentlyLoading) {
    // Show loading animation for first-time visitors
    const counterVariants = {
      hidden: {
        opacity: 0,
        scale: 0.7,
        y: 30,
        rotate: -5,
      },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        rotate: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200,
          mass: 0.6,
          duration: 0.8,
        },
      },
      exit: {
        opacity: 0,
        scale: 0.8,
        y: 5,
        rotate: 3,
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.7,
          duration: 0.5,
        },
      },
    };

    const screenVariants = {
      visible: {
        opacity: 1,
        transition: {
          duration: 0.3,
        },
      },
      completing: {
        opacity: 0,
        transition: {
          duration: 1,
          ease: "easeOut",
        },
      },
    };

    return (
      <motion.div
        className="fixed inset-0 z-[9999] text-foreground pointer-events-none bg-background"
        variants={screenVariants}
        initial="visible"
        animate={isCompleting ? "completing" : "visible"}
        style={{
          backgroundColor: "hsl(var(--background))",
        }}
      >
        <motion.div
          className="absolute bottom-8 right-8"
          variants={counterVariants}
          initial="hidden"
          animate={isCompleting ? "exit" : "visible"}
          exit="exit"
        >
          <div className={getTextClass({ muted: false, responsive: true })}>
            {displayCounter.toString().padStart(2, "0")}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Regular homepage with anti-flash protection
  const displayContent = (() => {
    if (frozenContent) return frozenContent;
    if (!allowImmediateContent) return null;
    return null;
  })();

  return (
    <>
      {/* Signal to LayoutShell that loading is happening */}
      {isCurrentlyLoading && (
        <div
          id="homepage-loading-active"
          style={{ display: "none" }}
          data-loading="true"
        />
      )}

      <div
        className={!allowImmediateContent ? "opacity-0" : "opacity-100"}
        style={{
          transition: allowImmediateContent ? "opacity 0.1s ease-out" : "none",
        }}
      >
        {displayContent}
      </div>
    </>
  );
}
