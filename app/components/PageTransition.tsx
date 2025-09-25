"use client";

import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
} from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { getTextClass } from "@/utils/typography";
import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  createContext,
  useContext,
  useCallback,
} from "react";

type CounterPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left"
  | "center"
  | "top-center"
  | "bottom-center";
type TransitionSpeed = "fast" | "normal" | "slow";

interface TransitionConfig {
  counterPosition?: CounterPosition;
  speed?: TransitionSpeed;
  enablePreload?: boolean;
  enableKeyboardNav?: boolean;
  enableEscapeCancel?: boolean;
}

interface TransitionContextType {
  startTransition: (href: string, config?: TransitionConfig) => void;
  cancelTransition: () => void;
  isTransitioning: boolean;
  transitionStage: "idle" | "menuExit" | "loading" | "entering";
  config: TransitionConfig;
}

const defaultConfig: TransitionConfig = {
  counterPosition: "bottom-right",
  speed: "normal",
  enablePreload: true,
  enableKeyboardNav: true,
  enableEscapeCancel: true,
};

const speedConfigs = {
  fast: {
    menuExit: 300,
    loading: 200,
    entering: 150,
    complete: 600,
  },
  normal: {
    menuExit: 400,
    loading: 300,
    entering: 200,
    complete: 800,
  },
  slow: {
    menuExit: 500,
    loading: 400,
    entering: 300,
    complete: 1000,
  },
};

const TransitionContext = createContext<TransitionContextType | null>(null);

export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  if (!context)
    throw new Error("usePageTransition must be used within PageTransition");
  return context;
};

export function TransitionLink({
  href,
  children,
  className,
  onClick,
  speed,
  counterPosition,
  target,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  speed?: TransitionSpeed;
  counterPosition?: CounterPosition;
  target?: string;
  [key: string]: any;
}) {
  const { startTransition, config } = usePageTransition();
  const router = useRouter();
  const pathname = usePathname();
  const [isPrefetched, setIsPrefetched] = useState(false);

  const isExternal = href.startsWith("http");

  const getAutoSpeed = (): TransitionSpeed => {
    if (speed) return speed;

    const currentPath = pathname.split("/")[1];
    const targetPath = href.split("/")[1];

    return currentPath === targetPath ? "fast" : "normal";
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isExternal) return; // external links should behave normally

    e.preventDefault();

    if (pathname === href) return;

    if (onClick) onClick(e);

    startTransition(href, {
      speed: getAutoSpeed(),
      counterPosition: counterPosition || config.counterPosition,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isExternal) return; // let external links handle defaults

    if (!config.enableKeyboardNav) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e as any);
    }
  };

  const handleMouseEnter = () => {
    if (isExternal) return;

    if (config.enablePreload && !isPrefetched && pathname !== href) {
      router.prefetch(href);
      setIsPrefetched(true);
    }
  };

  if (isExternal) {
    return (
      <a
        href={href}
        target={target || "_blank"}
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      className={className}
      role="link"
      tabIndex={0}
      aria-current={pathname === href ? "page" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

export function PageTransition({
  children,
  config: userConfig = {},
}: {
  children: React.ReactNode;
  config?: TransitionConfig;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const config = { ...defaultConfig, ...userConfig };

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStage, setTransitionStage] = useState<
    "idle" | "menuExit" | "loading" | "entering"
  >("idle");
  const [targetHref, setTargetHref] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentConfig, setCurrentConfig] = useState<TransitionConfig>(config);

  // Track whether this is browser navigation or regular link navigation
  const [isBrowserNavigation, setIsBrowserNavigation] = useState(false);

  const [frozenContent, setFrozenContent] = useState<React.ReactNode>(null);
  const contentRef = useRef<React.ReactNode>(children);

  const loadingTimeoutRef = useRef<NodeJS.Timeout>();
  const transitionTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const hasNavigated = useRef(false);

  const [allowImmediateContent, setAllowImmediateContent] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 🛡️ ULTRA-ROBUST SCROLL TO TOP WITH COMPREHENSIVE PROTECTION
  // This handles all edge cases that cause intermittent page jumps
  const scrollToTop = useCallback(() => {
    if (typeof window === "undefined") return;

    console.log("🚀 Starting ultra-robust scroll to top...");

    // Lock scroll position immediately to prevent any jumps during setup
    const lockScroll = () => {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    };

    // Unlock scroll position
    const unlockScroll = () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };

    // Lock scroll during the critical period
    lockScroll();

    // Aggressive scroll-to-top function
    const performScroll = () => {
      const originalBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";

      // Multiple scroll methods
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Force with additional methods
      if (window.pageYOffset !== 0) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }

      document.documentElement.style.scrollBehavior = originalBehavior;
    };

    // Multi-stage approach to handle all async content
    const stages = [
      { delay: 0, name: "Immediate" },
      { delay: 50, name: "Quick settle" },
      { delay: 150, name: "Content settle" },
      { delay: 300, name: "Font settle" },
      { delay: 500, name: "Image settle" },
    ];

    let stageIndex = 0;

    const executeStage = () => {
      const stage = stages[stageIndex];
      if (!stage) {
        unlockScroll();
        console.log("✅ Ultra-robust scroll completed!");
        return;
      }

      setTimeout(() => {
        console.log(`📏 Stage ${stageIndex + 1}: ${stage.name}`);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            performScroll();

            // Check if we're actually at the top
            if (window.pageYOffset === 0) {
              unlockScroll();
              console.log("✅ Scroll successful at stage:", stage.name);
              return;
            }

            // Continue to next stage if not at top
            stageIndex++;
            executeStage();
          });
        });
      }, stage.delay);
    };

    // Start the staged approach
    executeStage();

    // Fallback: force unlock after maximum time
    setTimeout(() => {
      unlockScroll();
      performScroll();
      console.log("🔧 Fallback scroll unlock executed");
    }, 2000);
  }, []);

  // 🔧 SET UP SCROLL RESTORATION ONCE ON MOUNT
  // We disable browser scroll restoration and handle it ourselves
  useEffect(() => {
    if (typeof window !== "undefined" && "history" in window) {
      // Disable browser scroll restoration so we have full control
      history.scrollRestoration = "manual";
      console.log("🔧 Scroll restoration set to manual");
    }

    // Cleanup: restore browser default when component unmounts
    return () => {
      if (typeof window !== "undefined" && "history" in window) {
        history.scrollRestoration = "auto";
        console.log("🧹 Scroll restoration restored to auto");
      }
    };
  }, []);

  useEffect(() => {
    contentRef.current = children;
    if (transitionStage === "idle" && !isTransitioning) {
      setFrozenContent(null);
    }
  }, [children, transitionStage, isTransitioning]);

  const cancelTransition = useCallback(() => {
    if (!isTransitioning) return;

    transitionTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    transitionTimeoutsRef.current = [];

    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    setIsTransitioning(false);
    setTransitionStage("idle");
    setTargetHref(null);
    setLoadingProgress(0);
    setFrozenContent(null);
    setIsBrowserNavigation(false);
    hasNavigated.current = false;
  }, [isTransitioning]);

  // Start transition function - this is for REGULAR link navigation
  const startTransition = useCallback(
    (href: string, transitionConfig?: TransitionConfig) => {
      // Prevent double-clicks and same-page navigation
      if (isTransitioning || pathname === href) return;

      console.log("🎬 Starting transition to:", href);

      // This is a regular transition (NOT browser navigation)
      setIsBrowserNavigation(false);

      // Merge configs
      const finalConfig = { ...currentConfig, ...transitionConfig };
      setCurrentConfig(finalConfig);

      // Get speed settings
      const speeds = speedConfigs[finalConfig.speed || "normal"];

      // Freeze content immediately
      setFrozenContent(contentRef.current);
      hasNavigated.current = false;

      setIsTransitioning(true);
      setTargetHref(href);
      setTransitionStage("menuExit");
      setLoadingProgress(0);

      // Clear any existing timeouts
      transitionTimeoutsRef.current = [];

      // Stage 1: Blur overlay appears
      const timeout1 = setTimeout(() => {
        setTransitionStage("loading");
        startLoadingProgress(finalConfig.speed);
      }, speeds.menuExit);
      transitionTimeoutsRef.current.push(timeout1);

      // Navigate after blur starts
      const timeout2 = setTimeout(() => {
        router.push(href);
        hasNavigated.current = true;
      }, speeds.menuExit + 50);
      transitionTimeoutsRef.current.push(timeout2);
    },
    [isTransitioning, pathname, router, currentConfig]
  );

  // Loading progress simulation with speed adjustment
  const startLoadingProgress = (speed?: TransitionSpeed) => {
    let progress = 0;
    const multiplier = speed === "fast" ? 1.5 : speed === "slow" ? 0.7 : 1;

    const updateProgress = () => {
      if (progress < 20) {
        progress += (Math.random() * 5 + 2) * multiplier;
      } else if (progress < 60) {
        progress += (Math.random() * 3 + 1) * multiplier;
      } else if (progress < 85) {
        progress += (Math.random() * 2 + 0.5) * multiplier;
      } else if (progress < 95) {
        progress += (Math.random() * 1 + 0.2) * multiplier;
      }

      progress = Math.min(progress, 95);
      setLoadingProgress(progress);

      if (progress < 95) {
        loadingTimeoutRef.current = setTimeout(
          updateProgress,
          (50 + Math.random() * 100) / multiplier
        );
      }
    };

    updateProgress();
  };

  // Escape key to cancel transition
  useEffect(() => {
    if (!config.enableEscapeCancel || !isTransitioning) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cancelTransition();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isTransitioning, config.enableEscapeCancel, cancelTransition]);

  // 🎯 DETECT WHEN NAVIGATION COMPLETES AND SCROLL TO TOP
  // This is where the magic happens - simple, reliable, no conflicts!
  useEffect(() => {
    if (
      isTransitioning &&
      hasNavigated.current &&
      targetHref &&
      pathname === new URL(targetHref, window.location.origin).pathname
    ) {
      console.log("🎯 Navigation completed, finishing transition...");

      const speeds = speedConfigs[currentConfig.speed || "normal"];

      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }

      const finishLoading = () => {
        setLoadingProgress(100);

        const timeout3 = setTimeout(() => {
          setTransitionStage("entering");
        }, speeds.entering * 2);
        transitionTimeoutsRef.current.push(timeout3);

        const timeout4 = setTimeout(() => {
          setTransitionStage("idle");
          setIsTransitioning(false);
          setTargetHref(null);
          setLoadingProgress(0);
          setFrozenContent(null);
          hasNavigated.current = false;
          transitionTimeoutsRef.current = [];

          // 🚀 SCROLL TO TOP - This happens right when transition completes!
          // Simple, reliable, no complex timing or observers needed
          scrollToTop();

          setIsBrowserNavigation(false);
        }, speeds.complete);
        transitionTimeoutsRef.current.push(timeout4);
      };

      const finishTimeout = setTimeout(
        finishLoading,
        100 + Math.random() * 200
      );
      transitionTimeoutsRef.current.push(finishTimeout);
    }
  }, [pathname, isTransitioning, targetHref, currentConfig, scrollToTop]);

  // 🎯 HANDLE BROWSER NAVIGATION (BACK/FORWARD BUTTONS)
  useLayoutEffect(() => {
    // Skip on initial mount
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    // If pathname changed and we're not managing a transition, this is browser navigation
    if (!isTransitioning) {
      console.log("🔄 Browser navigation detected via useLayoutEffect");

      // This IS browser navigation - set the flag
      setIsBrowserNavigation(true);

      // IMMEDIATELY prevent content from showing
      setAllowImmediateContent(false);

      // Freeze current content before React can paint the new content
      setFrozenContent(contentRef.current);

      // Start transition
      setIsTransitioning(true);
      setTransitionStage("menuExit");
      setLoadingProgress(0);
      setTargetHref(pathname);
      hasNavigated.current = false;

      // Clear existing timeouts
      transitionTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      transitionTimeoutsRef.current = [];

      // Very fast timing since navigation already happened
      const browserSpeeds = {
        menuExit: 250,
        loading: 300,
        entering: 180,
        complete: 600,
      };

      // Stage 1: Quick overlay
      const timeout1 = setTimeout(() => {
        setTransitionStage("loading");
      }, browserSpeeds.menuExit);
      transitionTimeoutsRef.current.push(timeout1);

      // Stage 2: Complete loading
      const timeout2 = setTimeout(() => {
        setLoadingProgress(100);
      }, browserSpeeds.menuExit + browserSpeeds.loading);
      transitionTimeoutsRef.current.push(timeout2);

      // Stage 3: Enter
      const timeout3 = setTimeout(() => {
        setTransitionStage("entering");
      }, browserSpeeds.menuExit + browserSpeeds.loading + 50);
      transitionTimeoutsRef.current.push(timeout3);

      // Stage 4: Complete and allow content
      const timeout4 = setTimeout(() => {
        setTransitionStage("idle");
        setIsTransitioning(false);
        setTargetHref(null);
        setLoadingProgress(0);
        setFrozenContent(null);
        setAllowImmediateContent(true);
        transitionTimeoutsRef.current = [];

        // 🚀 SCROLL TO TOP FOR BROWSER NAVIGATION TOO!
        // Now browser navigation ALSO scrolls to top - consistent behavior!
        scrollToTop();

        setIsBrowserNavigation(false);
      }, browserSpeeds.complete);
      transitionTimeoutsRef.current.push(timeout4);
    }
  }, [pathname, scrollToTop]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      transitionTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  const displayContent = (() => {
    // If we have frozen content, always show it
    if (frozenContent) return frozenContent;

    // If we're not allowing immediate content (browser navigation detected),
    // keep showing the previous content until transition completes
    if (!allowImmediateContent) return contentRef.current;

    // Otherwise show current content
    return children;
  })();

  return (
    <TransitionContext.Provider
      value={{
        startTransition,
        cancelTransition,
        isTransitioning,
        transitionStage,
        config: currentConfig,
      }}
    >
      {/* Main content */}
      <div
        className={!allowImmediateContent ? "opacity-0" : "opacity-100"}
        style={{
          transition: allowImmediateContent ? "opacity 0.1s ease-out" : "none",
        }}
      >
        {displayContent}
      </div>

      {/* Transition overlay */}
      <LoadingTransitionOverlay
        loadingProgress={loadingProgress}
        isTransitioning={isTransitioning}
        transitionStage={transitionStage}
        config={currentConfig}
        isBrowserNavigation={isBrowserNavigation}
      />
    </TransitionContext.Provider>
  );
}

function LoadingTransitionOverlay({
  loadingProgress,
  isTransitioning,
  transitionStage,
  config,
  isBrowserNavigation,
}: {
  loadingProgress: number;
  isTransitioning: boolean;
  transitionStage: string;
  config: TransitionConfig;
  isBrowserNavigation: boolean;
}) {
  // Spring animation for counter
  const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 0.8,
  };

  const animatedProgress = useSpring(0, springConfig);
  const [displayCounter, setDisplayCounter] = useState(0);

  const roundedCounter = useTransform(animatedProgress, (value) =>
    Math.round(value)
  );

  useEffect(() => {
    const unsubscribe = roundedCounter.on("change", setDisplayCounter);
    return unsubscribe;
  }, [roundedCounter]);

  useEffect(() => {
    if (transitionStage === "loading") {
      animatedProgress.set(loadingProgress);
    }
  }, [loadingProgress, transitionStage, animatedProgress]);

  useEffect(() => {
    if (transitionStage === "menuExit") {
      animatedProgress.set(0);
    }
  }, [transitionStage, animatedProgress]);

  const speeds = speedConfigs[config.speed || "normal"];

  const overlayVariants = {
    hidden: {
      opacity: 0,
      backdropFilter: "blur(0px)",
    },
    menuExit: {
      opacity: 1,
      backdropFilter: "blur(12px)",
      transition: { duration: speeds.menuExit / 1000, ease: "easeOut" },
    },
    loading: {
      opacity: 1,
      backdropFilter: "blur(0px)",
      transition: { duration: speeds.loading / 1000, ease: "easeInOut" },
    },
    entering: {
      opacity: 1,
      backdropFilter: "blur(12px)",
      transition: { duration: speeds.entering / 1000, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: { duration: speeds.menuExit / 1000, ease: "easeIn" },
    },
  };

  // Counter variants
  const counterVariants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      y: config.counterPosition?.includes("top") ? -30 : 30,
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
      y: config.counterPosition?.includes("top") ? -5 : 5,
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

  const getOverlayState = () => {
    switch (transitionStage) {
      case "menuExit":
        return "menuExit";
      case "loading":
        return "loading";
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
          <AnimatePresence>
            {/* Only show counter if it's NOT browser navigation */}
            {transitionStage === "loading" && !isBrowserNavigation && (
              <motion.div
                className="absolute bottom-8 right-8"
                variants={counterVariants}
                initial="hidden"
                animate="visible"
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

export function useTransitionRouter() {
  const { startTransition, cancelTransition } = usePageTransition();
  const router = useRouter();

  return {
    push: (href: string, config?: TransitionConfig) =>
      startTransition(href, config),
    cancel: () => cancelTransition(),
    prefetch: (href: string) => router.prefetch(href),
  };
}
