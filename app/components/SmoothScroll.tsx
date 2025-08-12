"use client";

import { useEffect, useRef } from "react";

export default function SmoothScroll() {
  // We'll use refs to store values that persist between animation frames
  // but don't trigger re-renders when they change
  const requestRef = useRef<number>();
  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    // Respect user's motion preferences - this is crucial for accessibility
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return; // Exit early if user prefers reduced motion
    }

    // Initialize our tracking variables with current scroll position
    targetScrollY.current = window.pageYOffset;
    currentScrollY.current = window.pageYOffset;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // This stops the browser's default scrolling

      // Calculate where we want to scroll to based on wheel movement
      targetScrollY.current += e.deltaY;

      // Make sure we don't scroll beyond the page boundaries
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      targetScrollY.current = Math.max(
        0,
        Math.min(targetScrollY.current, maxScroll)
      );

      // Start our smooth animation if it's not already running
      if (!isScrolling.current) {
        isScrolling.current = true;
        animate();
      }
    };

    const animate = () => {
      // This is the heart of our smooth scrolling effect
      // We gradually move currentScrollY towards targetScrollY
      const difference = targetScrollY.current - currentScrollY.current;

      // Easing factor - smaller numbers = more smoothness, but also more lag
      // 0.08 gives you that subtle drag feeling without being sluggish
      const easingFactor = 0.08;

      currentScrollY.current += difference * easingFactor;

      // Actually move the page to our calculated position
      window.scrollTo(0, currentScrollY.current);

      // Continue animating if we haven't reached our target yet
      if (Math.abs(difference) > 0.5) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        // We're close enough - snap to the final position and stop animating
        window.scrollTo(0, targetScrollY.current);
        currentScrollY.current = targetScrollY.current;
        isScrolling.current = false;
      }
    };

    // Listen for wheel events on the entire window
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup function to remove event listeners and cancel animations
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return null;
}
