"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { catalogImages } from "@/lib/catalogimages";

interface CatalogParallaxGalleryProps {
  images?: string[];
  className?: string;
}

// Clean skeleton component
const ImageSkeleton = ({ height = "400px" }: { height?: string }) => {
  useEffect(() => {
    if (!document.getElementById("shimmer-styles")) {
      const style = document.createElement("style");
      style.id = "shimmer-styles";
      style.textContent = `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .shimmer-effect {
          animation: shimmer 1.5s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div
      className="w-full bg-gray-100 relative overflow-hidden"
      style={{ height }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent shimmer-effect"
        style={{ transform: "translateX(-100%)" }}
      />
    </div>
  );
};

const CatalogParallaxGallery = ({
  images = catalogImages,
  className = "",
}: CatalogParallaxGalleryProps) => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;

  // 🎢 DRAMATIC PARALLAX: Big speed difference for noticeable effect
  const y1 = useTransform(
    scrollYProgress,
    [0, 1],
    [-height * 0.2, height * 1.2]
  ); // Normal speed
  const y2 = useTransform(
    scrollYProgress,
    [0, 1],
    [-height * 0.1, height * 0.6]
  ); // Much slower!

  const getColumnImages = (columnIndex: number) => {
    const leftColumn = images.filter((_, index) => index % 2 === 0);
    const rightColumn = images.filter((_, index) => index % 2 === 1);
    return columnIndex === 0 ? leftColumn : rightColumn;
  };

  // Simple preloading for local images
  useEffect(() => {
    const preloadImages = () => {
      images.forEach((src, index) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages((prev) => {
            const newSet = new Set(prev);
            newSet.add(index);
            return newSet;
          });
        };
        img.src = src;
      });
    };

    preloadImages();
  }, [images]);

  // Window dimensions tracking
  useEffect(() => {
    const resize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  if (!images || images.length === 0) {
    return (
      <div className="w-full">
        <div className="flex h-96 items-center justify-center bg-red-50 border border-red-300 text-red-600 text-xl rounded-lg">
          ❌ No images found! Check your catalogImages array.
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={gallery}
        className="relative flex gap-6 px-6 py-8"
        style={{
          height: "300vh", // Extended height for long parallax effect
          overflow: "visible",
        }}
      >
        {/* 🎯 PERFECTLY ALIGNED: Both columns start at exact same position */}
        <Column
          images={getColumnImages(0)}
          y={y1}
          initialOffset={0} // Same start position
          loadedImages={loadedImages}
          startIndex={0}
        />
        <Column
          images={getColumnImages(1)}
          y={y2}
          initialOffset={0} // Same start position
          loadedImages={loadedImages}
          startIndex={1}
        />
      </div>
    </div>
  );
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
  initialOffset: number;
  loadedImages: Set<number>;
  startIndex: number;
};

const Column = ({
  images,
  y,
  initialOffset,
  loadedImages,
  startIndex,
}: ColumnProps) => {
  const [imageLoadStates, setImageLoadStates] = useState<
    Record<number, boolean>
  >({});

  const handleImageLoad = (localIndex: number) => {
    setImageLoadStates((prev) => ({ ...prev, [localIndex]: true }));
  };

  return (
    <motion.div
      style={{
        y, // Parallax transform
        gap: "24px", // Consistent spacing
      }}
      className="relative flex flex-col w-1/2 min-w-[300px]"
      initial={{ y: initialOffset }}
    >
      {images.map((src, localIndex) => {
        const globalIndex = startIndex + localIndex * 2;
        const isLoaded = imageLoadStates[localIndex];
        const isCriticalImage = globalIndex < 2; // First image in each column

        return (
          <motion.div
            key={localIndex}
            className="relative w-full cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Clean loading skeleton */}
            {!isLoaded && (
              <ImageSkeleton
                height={
                  isCriticalImage ? "400px" : `${Math.random() * 200 + 300}px`
                }
              />
            )}

            {/* Main image */}
            <img
              src={src}
              alt={`Catalog item ${globalIndex + 1}`}
              className={`w-full h-auto object-cover block transition-opacity duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundColor: "transparent",
                // 🎯 PERFECT ALIGNMENT: First images have same height
                height: localIndex === 0 ? "400px" : "auto",
                objectFit: localIndex === 0 ? "cover" : "cover",
              }}
              loading={isCriticalImage ? "eager" : "lazy"}
              decoding="async"
              onLoad={() => handleImageLoad(localIndex)}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";

                const placeholder = document.createElement("div");
                placeholder.className =
                  "flex flex-col items-center justify-center h-48 bg-red-50 text-red-600 text-center p-4 border border-red-200 rounded";
                placeholder.innerHTML = `
                  <div>
                    <p class="font-bold mb-2">❌ Image Not Found</p>
                    <p class="text-sm">${src.split("/").pop()}</p>
                  </div>
                `;
                target.parentElement?.appendChild(placeholder);
              }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default CatalogParallaxGallery;
export { CatalogParallaxGallery };
