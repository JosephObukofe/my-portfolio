"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({
  onLoadingComplete,
}: LoadingScreenProps) {
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [showFirstWord, setShowFirstWord] = useState(false);
  const [showSecondWord, setShowSecondWord] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [allComplete, setAllComplete] = useState(false);

  // Word pairs with their styling
  const wordPairs = [
    {
      first: { text: "Minimalist", italic: true },
      second: { text: "mind", bold: true },
    },
    {
      first: { text: "Maximalist", bold: true },
      second: { text: "curiosity", italic: true },
    },
    {
      first: { text: "Mildly", italic: true },
      second: { text: "creative", bold: true },
    },
    {
      first: { text: "Chaotically", bold: true },
      second: { text: "inquisitive", italic: true },
    },
  ];

  // Animation variants
  const springVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 28,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 28,
        duration: 0.25,
      },
    },
  };

  useEffect(() => {
    if (currentPairIndex >= wordPairs.length) {
      // All pairs complete, start final exit
      setAllComplete(true);
      setTimeout(() => {
        onLoadingComplete();
      }, 1000);
      return;
    }

    // Reset states for new pair
    setShowFirstWord(false);
    setShowSecondWord(false);
    setIsExiting(false);

    // Animation sequence for current pair
    const sequence = async () => {
      // Show first word
      setTimeout(() => {
        setShowFirstWord(true);
      }, 200);

      // Show second word
      setTimeout(() => {
        setShowSecondWord(true);
      }, 800);

      // Hold both words for a moment
      setTimeout(() => {
        setIsExiting(true);
      }, 1800);

      // Move to next pair
      setTimeout(() => {
        setCurrentPairIndex((prev) => prev + 1);
      }, 2200);
    };

    sequence();
  }, [currentPairIndex, onLoadingComplete]);

  if (allComplete) {
    return (
      <motion.div
        className="fixed inset-0 z-[200] bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </motion.div>
    );
  }

  // Safety check - if currentPairIndex is out of bounds, use the last pair
  const currentPair =
    wordPairs[currentPairIndex] || wordPairs[wordPairs.length - 1];

  // If still no currentPair, return early to prevent crash
  if (!currentPair) {
    console.error("LoadingScreen: No word pairs available");
    onLoadingComplete();
    return null;
  }

  return (
    <div className="fixed inset-0 z-[200] bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Subtle background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.05, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Main content area */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        {/* Word animation container */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center h-20">
            <div className="text-5xl md:text-6xl font-light tracking-wide text-neutral-800 dark:text-neutral-200">
              <AnimatePresence mode="wait">
                {!isExiting && (
                  <motion.div
                    key={`pair-${currentPairIndex}`}
                    className="flex items-baseline"
                    variants={springVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <motion.span
                      className={
                        currentPair.first.italic
                          ? "italic"
                          : currentPair.first.bold
                          ? "font-bold"
                          : ""
                      }
                      variants={springVariants}
                      initial="hidden"
                      animate={showFirstWord ? "visible" : "hidden"}
                    >
                      {currentPair.first.text}
                    </motion.span>

                    <motion.span
                      className={`ml-3 ${
                        currentPair.second.italic
                          ? "italic"
                          : currentPair.second.bold
                          ? "font-bold"
                          : ""
                      }`}
                      variants={springVariants}
                      initial="hidden"
                      animate={showSecondWord ? "visible" : "hidden"}
                    >
                      {currentPair.second.text}
                    </motion.span>
                  </motion.div>
                )}

                {/* Exit animation */}
                {isExiting && (
                  <motion.div
                    key={`exit-pair-${currentPairIndex}`}
                    className="flex items-baseline"
                    variants={springVariants}
                    initial="visible"
                    animate="exit"
                  >
                    <span
                      className={
                        currentPair.first.italic
                          ? "italic"
                          : currentPair.first.bold
                          ? "font-bold"
                          : ""
                      }
                    >
                      {currentPair.first.text}
                    </span>
                    <span
                      className={`ml-3 ${
                        currentPair.second.italic
                          ? "italic"
                          : currentPair.second.bold
                          ? "font-bold"
                          : ""
                      }`}
                    >
                      {currentPair.second.text}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex space-x-3 mt-8">
          {wordPairs.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentPairIndex
                  ? "bg-white/80 shadow-lg shadow-white/50"
                  : index < currentPairIndex
                  ? "bg-white/60"
                  : "bg-white/20"
              }`}
              animate={{
                scale: index === currentPairIndex ? 1.2 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            />
          ))}
        </div>

        {/* Subtle loading text */}
        <motion.p
          className="text-sm text-white/60 mt-6 tracking-wider"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading your experience...
        </motion.p>
      </div>
    </div>
  );
}
