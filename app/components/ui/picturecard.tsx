import React from "react";
import WordPill from "./wordpill";

interface PictureCardProps {
  imageSrc: string;
  category: string;
  title: string;
  author: string;
  year: string;
  className?: string;
}

export default function PictureCard({
  imageSrc,
  category,
  title,
  author,
  year,
  className,
}: PictureCardProps) {
  // Progressive blur layers
  const createProgressiveBlur = () => {
    const layers = 6;
    const segmentSize = 1 / (layers + 1);

    return Array.from({ length: layers }).map((_, index) => {
      const gradientStops = [
        index * segmentSize,
        (index + 1) * segmentSize,
        (index + 2) * segmentSize,
        (index + 3) * segmentSize,
      ].map(
        (pos, posIndex) =>
          `rgba(0, 0, 0, ${posIndex === 1 || posIndex === 2 ? 0.8 : 0}) ${
            pos * 100
          }%`
      );

      const gradient = `linear-gradient(180deg, ${gradientStops.join(", ")})`;

      return (
        <div
          key={index}
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage: gradient,
            WebkitMaskImage: gradient,
            backdropFilter: `blur(${index * 0.8}px)`,
          }}
        />
      );
    });
  };

  return (
    <div
      className={`
        relative w-full h-[40rem] overflow-hidden cursor-pointer
        ${className}
      `}
      data-cursor-catalog
    >
      {/* Background Image */}
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Progressive Blur Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-3/4">
        {createProgressiveBlur()}
      </div>

      {/* Content Layout */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
        {/* Bottom Row */}
        <div className="flex justify-between items-end">
          {/* Bottom Left - Category */}
          <div className="flex justify-start">
            <WordPill text={category} />
          </div>

          {/* Bottom Right - Title & Author, Year */}
          <div className="text-right">
            <p className="text-[0.75rem] sm:text-[0.85rem] font-satoshi mb-1.5">
              {title}
            </p>
            <p className="text-[0.65rem] sm:text-[0.75rem] font-satoshi">
              {author}, {year}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
