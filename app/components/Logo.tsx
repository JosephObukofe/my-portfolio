"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

export default function Logo({ className }: { className?: string }) {
  const dotRef = useRef<SVGPathElement | null>(null);
  const underscoreRef = useRef<SVGPathElement | null>(null);
  const jRef = useRef<SVGPathElement | null>(null);
  const oRef = useRef<SVGPathElement | null>(null);
  const blinkTl = useRef<gsap.core.Tween | null>(null);
  const [supportsHover, setSupportsHover] = useState(false);

  const originalDotPath =
    "M19.8347 15.6C19.8347 14.544 20.6747 13.728 21.7067 13.728C22.7387 13.728 23.5787 14.544 23.5787 15.6C23.5787 16.656 22.7387 17.472 21.7067 17.472C20.6747 17.472 19.8347 16.656 19.8347 15.6Z";

  // ✅ DETECT HOVER CAPABILITY
  useEffect(() => {
    // Check if device supports hover (desktop/laptop with mouse)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setSupportsHover(mediaQuery.matches);

    // Listen for changes (e.g., external mouse connected to tablet)
    const handleChange = (e: MediaQueryListEvent) => {
      setSupportsHover(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    return () => {
      blinkTl.current?.kill();
      gsap.killTweensOf(dotRef.current);
    };
  }, []);

  // ✅ ONLY CREATE HOVER HANDLERS IF DEVICE SUPPORTS HOVER
  const handleMouseEnter = supportsHover
    ? () => {
        if (!dotRef.current || !underscoreRef.current) return;
        gsap.killTweensOf(dotRef.current);
        gsap.to(dotRef.current, {
          duration: 0.3,
          morphSVG: underscoreRef.current,
          ease: "power2.inOut",
          onComplete: () => {
            blinkTl.current = gsap.to(dotRef.current!, {
              opacity: 0,
              duration: 0.6,
              repeat: -1,
              yoyo: true,
              ease: "steps(1)",
            });
          },
        });
      }
    : undefined;

  const handleMouseLeave = supportsHover
    ? () => {
        if (!dotRef.current) return;
        blinkTl.current?.kill();
        blinkTl.current = null;
        gsap.killTweensOf(dotRef.current);
        gsap.set(dotRef.current, { opacity: 1 });
        gsap.to(dotRef.current, {
          duration: 0.3,
          morphSVG: originalDotPath,
          ease: "power2.inOut",
        });
      }
    : undefined;

  return (
    <svg
      viewBox="0 0 38 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        w-7 h-auto sm:w-8 md:w-9 lg:w-10
        ${className || ""}
      `.trim()}
      style={{
        cursor: supportsHover ? "pointer" : "default",
        // ✅ Remove mobile tap highlight effects
        WebkitTapHighlightColor: "transparent",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "manipulation",
      }}
    >
      <g id="Group 1">
        <path
          id="underscore"
          ref={underscoreRef}
          d="M20 17.064V15H31.376V17.064H20Z"
          fill="currentColor"
          style={{ opacity: 0 }}
        />
        <path id="dot" ref={dotRef} d={originalDotPath} fill="currentColor" />
        <path
          id="j"
          ref={jRef}
          d="M13.9939 1.776C13.9939 0.768001 14.8099 0 15.8179 0C16.8259 0 17.6419 0.768001 17.6419 1.776C17.6419 2.784 16.8259 3.552 15.8179 3.552C14.8099 3.552 13.9939 2.784 13.9939 1.776ZM16.9459 5.376V19.92C16.9459 21.12 16.1299 21.936 14.9779 21.936H11.9539V19.968H14.0179C14.4499 19.968 14.6899 19.728 14.6899 19.248V5.376H16.9459Z"
          fill="currentColor"
        />
        <path
          id="o"
          ref={oRef}
          d="M0 11.256C0 7.608 2.592 5.04 6.048 5.04C9.504 5.04 12.096 7.608 12.096 11.256C12.096 14.904 9.504 17.472 6.048 17.472C2.592 17.472 0 14.904 0 11.256ZM2.256 11.256C2.256 13.848 3.792 15.408 6.048 15.408C8.304 15.408 9.84 13.848 9.84 11.256C9.84 8.664 8.304 7.104 6.048 7.104C3.792 7.104 2.256 8.664 2.256 11.256Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
