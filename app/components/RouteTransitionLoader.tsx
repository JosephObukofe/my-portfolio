"use client";

import React, { useState, useEffect } from "react";

interface RouteTransitionLoaderProps {
  onComplete?: () => void;
  duration?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const RouteTransitionLoader: React.FC<RouteTransitionLoaderProps> = ({
  onComplete,
  duration = 1200,
  position = "bottom-right",
}) => {
  const [progress, setProgress] = useState(0);
  const [blurIntensity, setBlurIntensity] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const normalizedProgress = Math.min(elapsed / duration, 1);

      // Smooth easing function
      const easedProgress = easeOutQuart(normalizedProgress);

      // Update progress (0 to 100)
      setProgress(Math.round(easedProgress * 100));

      // Update blur intensity (0 to 15px) - slightly more blur
      setBlurIntensity(easedProgress * 15);

      // Update opacity (0 to 0.98) - more opaque
      setOpacity(easedProgress * 0.98);

      if (normalizedProgress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Complete immediately when done
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 100);
      }
    };

    // Start immediately
    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [duration, onComplete]);

  const easeOutQuart = (t: number): number => {
    return 1 - Math.pow(1 - t, 4);
  };

  const getPositionStyles = () => {
    const baseStyles = {
      position: "fixed" as const,
      zIndex: 15,
    };

    switch (position) {
      case "top-left":
        return { ...baseStyles, top: "2rem", left: "2rem" };
      case "top-right":
        return { ...baseStyles, top: "2rem", right: "2rem" };
      case "bottom-left":
        return { ...baseStyles, bottom: "2rem", left: "2rem" };
      case "bottom-right":
      default:
        return { ...baseStyles, bottom: "2rem", right: "2rem" };
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Enhanced frosted overlay */}
      <div
        className="enhanced-frosted-overlay"
        style={{
          backdropFilter: `blur(${blurIntensity}px) saturate(1.2)`,
          opacity: opacity,
        }}
      />

      {/* Progress counter */}
      <div className="enhanced-progress-counter" style={getPositionStyles()}>
        <span className="progress-number">{progress}</span>
        <span className="progress-percentage">%</span>
      </div>

      <style jsx>{`
        .enhanced-frosted-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(248, 250, 252, 0.85);
          backdrop-filter: blur(0px);
          z-index: 9999;
          transition: none;

          /* Enhanced texture */
          background-image: radial-gradient(
              circle at 20% 30%,
              rgba(255, 255, 255, 0.3) 0%,
              transparent 40%
            ),
            radial-gradient(
              circle at 80% 70%,
              rgba(241, 245, 249, 0.25) 0%,
              transparent 45%
            ),
            radial-gradient(
              circle at 40% 80%,
              rgba(226, 232, 240, 0.35) 0%,
              transparent 35%
            ),
            linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.1) 25%,
              transparent 25%
            ),
            linear-gradient(
              -45deg,
              rgba(255, 255, 255, 0.1) 25%,
              transparent 25%
            );
          background-size: 150px 150px, 120px 120px, 180px 180px, 20px 20px,
            20px 20px;
          background-position: 0 0, 30px 30px, 60px 60px, 0 0, 10px 10px;
        }

        .enhanced-frosted-overlay::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .enhanced-progress-counter {
          display: flex;
          align-items: baseline;
          gap: 0.1rem;
          font-family: "Space Grotesk", monospace;
          color: #1f2937;
          user-select: none;
          opacity: ${opacity > 0.2 ? 1 : 0};
          transition: opacity 0.3s ease-out;
          transform: translateZ(0);
          backdrop-filter: blur(2px);
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .progress-number {
          font-weight: 600;
          font-size: 2rem;
          line-height: 1;
          letter-spacing: -0.05em;
          font-variant-numeric: tabular-nums;
          min-width: 3.5rem;
          text-align: right;
        }

        .progress-percentage {
          font-weight: 400;
          font-size: 0.875rem;
          line-height: 1;
          color: #64748b;
          margin-top: 0.25rem;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .enhanced-progress-counter {
            padding: 0.375rem 0.5rem;
          }

          .progress-number {
            font-size: 1.5rem;
            min-width: 2.5rem;
          }

          .progress-percentage {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </>
  );
};

export default RouteTransitionLoader;
