"use client"

import Image from 'next/image'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils'

const avatarPaths = [
  '/avatars/my-notion-face-transparent.png',
  '/avatars/my-notion-face-transparent (1).png',
  '/avatars/my-notion-face-transparent (2).png',
  '/avatars/my-notion-face-transparent (3).png'
];

interface CyclingAvatarProps {
  className?: string;
}

export function CyclingAvatar({ className }: CyclingAvatarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % avatarPaths.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, []);

  return (
    <div className={cn("relative flex-shrink-0", className)}>
      <div className="relative w-full h-full rounded-full border-2 border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-white">
        <AnimatePresence mode="wait"> {/* Ensures one fades out before next fades in */}
          <motion.div
            key={currentIndex} // Important for AnimatePresence to detect changes
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }} // Adjust duration as needed
            className="absolute inset-0" // Make motion div cover the area
          >
            <Image
              src={avatarPaths[currentIndex]} // Use dynamic source
              alt="Profile Avatar"
              fill
              priority={currentIndex === 0} // Only prioritize the first image
              sizes="(max-width: 768px) 80px, 80px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
} 