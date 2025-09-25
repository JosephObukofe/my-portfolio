"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CustomCursorProps {
  className?: string;
}

// 🎯 Spring configuration - these numbers create the perfect feel!
const SPRING_CONFIG = {
  mass: 0.1, // Lower = snappier (like a light ping pong ball)
  damping: 10, // Controls the "bounce" - higher = less bouncy
  stiffness: 131, // How quickly it tries to reach the target - higher = faster
};

export default function CustomCursor({ className = "" }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false); // Start hidden
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasInitialPosition, setHasInitialPosition] = useState(false); // Track if we have initial position
  const styleRef = useRef<HTMLStyleElement | null>(null);

  // 🌟 Motion values and springs - this is where the magic happens!
  // These track the cursor position with physics-based smoothing
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs add the smooth, bouncy movement to our cursor
  const springX = useSpring(mouseX, SPRING_CONFIG);
  const springY = useSpring(mouseY, SPRING_CONFIG);

  // Handle mounting and desktop detection (keeping your existing logic!)
  useEffect(() => {
    setIsMounted(true);

    const checkIsDesktop = () => {
      return (
        typeof window !== "undefined" &&
        window.innerWidth > 768 &&
        !("ontouchstart" in window) &&
        !navigator.maxTouchPoints
      );
    };

    setIsDesktop(checkIsDesktop());

    // Add resize listener to handle window size changes
    const handleResize = () => {
      setIsDesktop(checkIsDesktop());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🚀 Main cursor functionality with spring physics integration
  useEffect(() => {
    if (!isMounted || !isDesktop) return;

    // 🎯 NEW: Spring-powered position update!
    // Instead of directly manipulating the DOM, we update motion values
    // The springs automatically smooth out the movement with physics
    const updateCursorPosition = (e: MouseEvent) => {
      // Update motion values - springs will handle the smooth animation
      mouseX.set(e.clientX - 8); // -8 to center the cursor (since it's 16px/4 = 4, but we want center)
      mouseY.set(e.clientY - 8);

      // 🆕 FIX: Show cursor only after we have the initial position
      if (!hasInitialPosition) {
        setHasInitialPosition(true);
        setIsVisible(true);
      }
    };

    const handleMouseEnter = () => {
      // Only show if we have initial position
      if (hasInitialPosition) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Check if hovering over interactive elements (your existing logic!)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover], [onclick]'
      );
      setIsHovering(!!isInteractive);
    };

    // 🆕 FIX: Get initial mouse position instead of setting visibility immediately
    // This prevents the cursor from showing at (0,0) before first mouse movement
    const getInitialMousePosition = (e: MouseEvent) => {
      mouseX.jump(e.clientX - 8); // Instantly positions at mouse location
      mouseY.jump(e.clientY - 8);
      springX.jump(e.clientX - 8); // Also position springs to prevent animation
      springY.jump(e.clientY - 8);
      setHasInitialPosition(true);
      setIsVisible(true);

      // Remove this one-time listener
      document.removeEventListener("mousemove", getInitialMousePosition);
      // Add the regular mousemove listener
      document.addEventListener("mousemove", updateCursorPosition, {
        passive: true,
      });
    };

    // 🎯 Start with initial position detection instead of regular mousemove
    document.addEventListener("mousemove", getInitialMousePosition, {
      passive: true,
    });

    document.addEventListener("mouseenter", handleMouseEnter, {
      passive: true,
    });
    document.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
    });
    document.addEventListener("mousedown", handleMouseDown, { passive: true });
    document.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    // 🆕 FIX: Don't hide default cursor - let both show
    // Comment out or remove this line:
    // document.body.style.cursor = "none";

    // 🆕 FIX: Updated style injection - removed cursor hiding
    if (!styleRef.current) {
      const style = document.createElement("style");
      style.textContent = `
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .custom-cursor {
            display: none !important;
          }
        }

        /* Hide custom cursor on mobile/touch devices */
        @media (max-width: 768px) {
          .custom-cursor {
            display: none !important;
          }
        }

        @media (hover: none) {
          .custom-cursor {
            display: none !important;
          }
        }
      `;
      document.head.appendChild(style);
      styleRef.current = style;
    }

    return () => {
      // Cleanup (your existing logic!)
      document.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mousemove", getInitialMousePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);

      // 🆕 FIX: Don't restore cursor since we're not hiding it
      // document.body.style.cursor = "auto";

      // Remove the custom style
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [isMounted, isDesktop, mouseX, mouseY, hasInitialPosition]); // Added hasInitialPosition to dependencies

  // Don't render anything until mounted and confirmed desktop
  if (!isMounted || !isDesktop) return null;

  return (
    <motion.div
      className={`
        custom-cursor
        fixed top-0 left-0 pointer-events-none z-[9999]
        will-change-transform
        ${isVisible && hasInitialPosition ? "opacity-100" : "opacity-0"}
        ${className}
      `}
      style={{
        // 🌟 SPRING MAGIC: Use the spring values for position!
        // This replaces the direct transform manipulation
        x: springX,
        y: springY,
        // Keep your existing opacity transition
        transition: isVisible
          ? "opacity 0.1s ease-out"
          : "opacity 0.15s ease-out",
      }}
    >
      <div
        className={`
          w-4 h-4 rounded-full bg-foreground
          will-change-transform
          ${isHovering ? "scale-150" : "scale-100"}
          ${isClicking ? "scale-75" : ""}
        `}
        style={{
          // Keep your existing scaling transitions!
          transition: "transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)",
        }}
      />
    </motion.div>
  );
}
