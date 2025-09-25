"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WordPair {
  first: {
    text: string;
    className: string;
  };
  second: {
    text: string;
    className: string;
  };
}

interface TypographyLoadingAnimationProps {
  onComplete?: () => void;
  duration?: number;
}

const TypographyLoadingAnimation: React.FC<TypographyLoadingAnimationProps> = ({
  onComplete,
  duration = 8000,
}) => {
  const wordPairs: WordPair[] = [
    {
      first: { text: "Minimalist", className: "minimalist-word" },
      second: { text: "mind", className: "mind-word" },
    },
    {
      first: { text: "Maximalist", className: "maximalist-word" },
      second: { text: "curiosity", className: "curiosity-word" },
    },
    {
      first: { text: "Mildly", className: "mildly-word" },
      second: { text: "creative", className: "creative-word" },
    },
    {
      first: { text: "Chaotically", className: "chaotically-word" },
      second: { text: "inquisitive", className: "inquisitive-word" },
    },
  ];

  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showPair, setShowPair] = useState(true);

  // Container variants - matches your menu system exactly
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        mass: 0.6,
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.08, // Same stagger as your menu
      },
    },
    exit: {
      opacity: 0,
      y: 7.5,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeIn",
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  // Individual word variants - matches your menu items exactly
  const wordVariants = {
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
      y: 7.5,
      scale: 1,
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    },
  };

  // Screen fade variants for completion
  const screenVariants = {
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    completing: {
      opacity: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    if (onComplete && duration) {
      const completionTimer = setTimeout(() => {
        setIsCompleting(true);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }, duration);

      return () => clearTimeout(completionTimer);
    }
  }, [onComplete, duration]);

  useEffect(() => {
    if (isCompleting) return;

    const animationSequence = async () => {
      // Show current pair
      setShowPair(true);

      // Keep visible for display time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Hide pair
      setShowPair(false);

      // Wait for exit animation
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Move to next pair
      setCurrentPairIndex((prev) => (prev + 1) % wordPairs.length);
    };

    // Start first animation after initial delay
    const initialTimer = setTimeout(() => {
      animationSequence();
    }, 500);

    // Set up continuous loop
    const interval = setInterval(() => {
      if (!isCompleting) {
        animationSequence();
      }
    }, 3200); // Total cycle time

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [currentPairIndex, isCompleting, wordPairs.length]);

  const currentPair = wordPairs[currentPairIndex];

  return (
    <motion.div
      className="typography-loading-screen"
      variants={screenVariants}
      initial="visible"
      animate={isCompleting ? "completing" : "visible"}
    >
      <main className="loading-main">
        <div className="loading-typography-container">
          <AnimatePresence mode="wait">
            {showPair && (
              <motion.div
                key={currentPairIndex}
                className="word-pair-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.span
                  variants={wordVariants}
                  className={`word-animation ${currentPair.first.className}`}
                >
                  {currentPair.first.text}
                </motion.span>

                <motion.span
                  variants={wordVariants}
                  className={`word-animation ${currentPair.second.className}`}
                >
                  {currentPair.second.text}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <style jsx>{`
        .typography-loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            #f8fafc 0%,
            #f1f5f9 50%,
            #e2e8f0 100%
          );
          z-index: 9999;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .loading-main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .loading-typography-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
        }

        .word-pair-container {
          display: flex;
          flex-direction: row;
          align-items: baseline;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .word-animation {
          display: inline-block;
        }

        /* Typography system */
        .minimalist-word {
          font-family: "Satoshi", sans-serif;
          font-weight: 400;
          font-size: 3.5rem;
          letter-spacing: -0.05em;
          font-style: italic;
          text-transform: lowercase;
          color: #1f2937;
        }

        .mind-word {
          font-family: "Space Grotesk", sans-serif;
          font-weight: 700;
          font-size: 3.5rem;
          letter-spacing: 0.02em;
          color: #1f2937;
        }

        .maximalist-word {
          font-family: "Space Grotesk", sans-serif;
          font-weight: 700;
          font-size: 3.5rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: #1f2937;
        }

        .curiosity-word {
          font-family: "Satoshi", sans-serif;
          font-weight: 400;
          font-size: 3.5rem;
          letter-spacing: -0.05em;
          font-style: italic;
          color: #1f2937;
        }

        .mildly-word {
          font-family: "Satoshi", sans-serif;
          font-weight: 400;
          font-size: 3.2rem;
          letter-spacing: -0.05em;
          font-style: italic;
          text-transform: lowercase;
          color: #1f2937;
        }

        .creative-word {
          font-family: "Space Grotesk", sans-serif;
          font-weight: 700;
          font-size: 3.2rem;
          letter-spacing: 0.02em;
          color: #1f2937;
        }

        .chaotically-word {
          font-family: "Space Grotesk", sans-serif;
          font-weight: 700;
          font-size: 3.2rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: #1f2937;
        }

        .inquisitive-word {
          font-family: "Satoshi", sans-serif;
          font-weight: 400;
          font-size: 3.2rem;
          letter-spacing: -0.05em;
          font-style: italic;
          color: #1f2937;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .minimalist-word,
          .maximalist-word {
            font-size: 2.5rem;
          }

          .mind-word,
          .curiosity-word,
          .creative-word,
          .inquisitive-word {
            font-size: 2.2rem;
          }

          .mildly-word,
          .chaotically-word {
            font-size: 2rem;
          }

          .word-pair-container {
            gap: 0.75rem;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .minimalist-word,
          .maximalist-word {
            font-size: 2rem;
          }

          .mind-word,
          .curiosity-word,
          .creative-word,
          .inquisitive-word {
            font-size: 1.8rem;
          }

          .mildly-word,
          .chaotically-word {
            font-size: 1.6rem;
          }

          .word-pair-container {
            gap: 0.5rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default TypographyLoadingAnimation;
