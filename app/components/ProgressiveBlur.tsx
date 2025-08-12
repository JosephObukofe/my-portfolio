"use client";

import { motion } from "framer-motion";

// Define the angles for different blur directions
const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
} as const;

// Define the props for the component
interface ProgressiveBlurProps {
  direction?: keyof typeof GRADIENT_ANGLES;
  blurLayers?: number;
  blurIntensity?: number;
  className?: string;
}

export default function ProgressiveBlur({
  direction = "bottom",
  blurLayers = 8,
  blurIntensity = 0.25,
  className = "",
}: ProgressiveBlurProps) {
  const layers = Math.max(blurLayers, 2);
  const segmentSize = 1 / (blurLayers + 1);

  return (
    <div className={`relative pointer-events-none ${className}`}>
      {Array.from({ length: layers }).map((_, index) => {
        const angle = GRADIENT_ANGLES[direction];

        // Create gradient stops for the mask
        const gradientStops = [
          index * segmentSize,
          (index + 1) * segmentSize,
          (index + 2) * segmentSize,
          (index + 3) * segmentSize,
        ].map((pos, posIndex) => {
          // Only show the mask in the middle two positions
          const opacity = posIndex === 1 || posIndex === 2 ? 1 : 0;
          return `rgba(255, 255, 255, ${opacity}) ${pos * 100}%`;
        });

        const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(
          ", "
        )})`;

        return (
          <motion.div
            key={index}
            className="absolute inset-0 pointer-events-none rounded-[inherit]"
            style={{
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${index * blurIntensity}px)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}
