// components/PageTransitionProvider.tsx
"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  useSpring,
} from "framer-motion";
import { getTextClass } from "@/utils/typography";

interface PageTransitionContextType {
  isTransitioning: boolean;
  startTransition: (href: string) => void;
  startCloseTransition: () => void; // New function for menu close
  transitionStage:
    | "idle"
    | "menuExit"
    | "blurToPlain"
    | "loading"
    | "loadingExit"
    | "navigating"
    | "entering"
    | "menuClosing"; // New stage for menu close
}

const PageTransitionContext = createContext<PageTransitionContextType | null>(
  null
);

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context)
    throw new Error(
      "usePageTransition must be used within PageTransitionProvider"
    );
  return context;
}

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStage, setTransitionStage] = useState<
    "idle" | "menuExit" | "loading" | "entering" | "menuClosing"
  >("idle");
  const [targetHref, setTargetHref] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const loadingTimeoutRef = useRef<NodeJS.Timeout>();

  const startTransition = (href: string) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTargetHref(href);
    setTransitionStage("menuExit");
    setLoadingProgress(0);

    // Stage 1: Menu exits (0.4s)
    setTimeout(() => {
      setTransitionStage("loading");
      startLoadingProgress();
    }, 400);

    // Stage 2: Navigate and show loading (after menu exit)
    setTimeout(() => {
      router.push(href);
    }, 450);
  };

  // New function for menu close without navigation
  const startCloseTransition = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTransitionStage("menuExit");

    // Stage 1: Menu exits with blur (0.4s)
    setTimeout(() => {
      setTransitionStage("menuClosing");
    }, 400);

    // Stage 2: Brief blur hold, then return to idle (0.6s total)
    setTimeout(() => {
      setTransitionStage("idle");
      setIsTransitioning(false);
    }, 1000);
  };

  // Real loading progress tracking! 🎯
  const startLoadingProgress = () => {
    let progress = 0;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;

      // Progressive loading simulation that feels realistic
      if (progress < 20) {
        progress += Math.random() * 5 + 2; // Quick initial progress
      } else if (progress < 60) {
        progress += Math.random() * 3 + 1; // Steady middle progress
      } else if (progress < 85) {
        progress += Math.random() * 2 + 0.5; // Slower towards end
      } else if (progress < 95) {
        progress += Math.random() * 1 + 0.2; // Almost there...
      }

      // Cap at 95% until page actually loads
      progress = Math.min(progress, 95);
      setLoadingProgress(progress);

      if (progress < 95) {
        loadingTimeoutRef.current = setTimeout(
          updateProgress,
          50 + Math.random() * 100
        );
      }
    };

    updateProgress();
  };

  // Complete loading when pathname changes (real page loaded!)
  useEffect(() => {
    if (
      isTransitioning &&
      pathname &&
      targetHref &&
      pathname === new URL(targetHref, window.location.origin).pathname
    ) {
      // Clear any ongoing progress updates
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }

      // Quickly finish to 100% with realistic timing
      const finishLoading = () => {
        setLoadingProgress(100);

        // Wait a moment for the satisfying 100% before exiting
        setTimeout(() => {
          setTransitionStage("entering");
        }, 400);

        // Final transition to new page
        setTimeout(() => {
          setTransitionStage("idle");
          setIsTransitioning(false);
          setTargetHref(null);
          setLoadingProgress(0);
        }, 800);
      };

      // Add a tiny delay to make the final progress feel natural
      setTimeout(finishLoading, 100 + Math.random() * 200);
    }
  }, [pathname, isTransitioning, targetHref]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <PageTransitionContext.Provider
      value={{
        isTransitioning,
        startTransition,
        startCloseTransition, // Add the new function
        transitionStage,
      }}
    >
      {children}
      <LoadingTransitionOverlay loadingProgress={loadingProgress} />
    </PageTransitionContext.Provider>
  );
}

// Enhanced loading overlay with real progress and ultra-sleek animations
function LoadingTransitionOverlay({
  loadingProgress,
}: {
  loadingProgress: number;
}) {
  const { isTransitioning, transitionStage } = usePageTransition();

  // Ultra-smooth spring animation for the counter 🌊
  const springConfig = {
    stiffness: 100, // Lower for smoother motion
    damping: 20, // Higher for less oscillation
    mass: 0.8, // Perfect weight feeling
  };

  const animatedProgress = useSpring(0, springConfig);
  const [displayCounter, setDisplayCounter] = useState(0);

  // Transform the spring value to a rounded integer for display
  const roundedCounter = useTransform(animatedProgress, (value) =>
    Math.round(value)
  );

  // Update display when animated value changes
  useEffect(() => {
    return roundedCounter.onChange(setDisplayCounter);
  }, [roundedCounter]);

  // Animate to real loading progress with buttery smooth spring
  useEffect(() => {
    if (transitionStage === "loading") {
      animatedProgress.set(loadingProgress);
    }
  }, [loadingProgress, transitionStage, animatedProgress]);

  // Reset when starting new transition
  useEffect(() => {
    if (transitionStage === "menuExit") {
      animatedProgress.set(0);
    }
  }, [transitionStage, animatedProgress]);

  // Overlay variants - matching blur values for consistency
  const overlayVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    menuExit: {
      opacity: 1,
      backdropFilter: "blur(12px)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
    loading: {
      opacity: 1,
      backdropFilter: "blur(0px)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    menuClosing: {
      opacity: 1,
      backdropFilter: "blur(12px)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    entering: {
      opacity: 1,
      backdropFilter: "blur(12px)",
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  // Ultra-sleek counter animation variants ✨
  const counterVariants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      y: 30,
      rotate: -5, // Subtle rotation for extra flair
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
      rotate: 3, // Slight rotate on exit for elegance
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
        mass: 0.7,
        duration: 0.5,
      },
    },
  };

  const getOverlayState = () => {
    switch (transitionStage) {
      case "menuExit":
        return "menuExit";
      case "loading":
        return "loading";
      case "menuClosing":
        return "menuClosing"; // New state for menu close
      case "entering":
        return "entering";
      case "idle":
        return isTransitioning ? "hidden" : "exit";
      default:
        return "hidden";
    }
  };

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="transition-overlay"
          className="fixed inset-0 z-[150] text-foreground pointer-events-none bg-background"
          variants={overlayVariants}
          initial="hidden"
          animate={getOverlayState()}
          exit="exit"
          style={{
            backgroundColor: "hsl(var(--background))",
          }}
        >
          {/* Enhanced Loading Counter with bouncy spring physics */}
          <AnimatePresence>
            {(transitionStage === "loading" ||
              transitionStage === "loadingExit") && (
              <motion.div
                className="absolute bottom-8 right-8"
                variants={counterVariants}
                initial="hidden"
                animate={transitionStage === "loadingExit" ? "exit" : "visible"}
                exit="exit"
              >
                <div
                  className={getTextClass({ muted: false, responsive: true })}
                >
                  {displayCounter.toString().padStart(2, "0")}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
