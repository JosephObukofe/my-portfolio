"use client";

import React, { useState, useEffect } from "react";

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

interface AnimationState {
  currentPairIndex: number;
  showFirst: boolean;
  showSecond: boolean;
  showPair: boolean;
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

  const [animState, setAnimState] = useState<AnimationState>({
    currentPairIndex: 0,
    showFirst: false,
    showSecond: false,
    showPair: true,
  });

  const [isCompleting, setIsCompleting] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    // Set up completion timer if onComplete is provided
    if (onComplete && duration) {
      const completionTimer = setTimeout(() => {
        setIsCompleting(true);
        setTimeout(() => {
          onComplete();
        }, 1000); // Fade out time
      }, duration);

      return () => clearTimeout(completionTimer);
    }
  }, [onComplete, duration]);

  useEffect(() => {
    if (isCompleting) return; // Stop animation if completing

    const animateSequence = async () => {
      // Show the pair container
      setAnimState((prev) => ({ ...prev, showPair: true }));

      // Small delay before starting
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Show first word with slow appear
      setAnimState((prev) => ({ ...prev, showFirst: true }));

      // Wait for first word animation to complete, then show second
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setAnimState((prev) => ({ ...prev, showSecond: true }));

      // Keep both visible for a moment
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Fade out both words
      setAnimState((prev) => ({
        ...prev,
        showPair: false,
        showFirst: false,
        showSecond: false,
      }));

      // Wait for fade out to complete
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Move to next pair and increment cycle count
      setAnimState((prev) => ({
        ...prev,
        currentPairIndex: (prev.currentPairIndex + 1) % wordPairs.length,
      }));

      setCycleCount((prev) => prev + 1);
    };

    animateSequence();

    // Set up interval for continuous loop (only if not completing)
    const interval = setInterval(() => {
      if (!isCompleting) {
        animateSequence();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [animState.currentPairIndex, isCompleting, wordPairs.length]);

  const currentPair = wordPairs[animState.currentPairIndex];

  return (
    <div
      className={`typography-loading-screen ${
        isCompleting ? "completing" : ""
      }`}
    >
      {/* Header */}
      <header className="loading-header">
        <div className="brand">oj.</div>
      </header>

      {/* Main typography animation */}
      <main className="loading-main">
        <div className="loading-typography-container">
          <div
            className={`word-pair-container ${
              animState.showPair ? "visible" : "hidden"
            }`}
          >
            <span
              className={`word-animation ${currentPair.first.className} ${
                animState.showFirst ? "word-visible" : "word-hidden"
              }`}
            >
              {currentPair.first.text}
            </span>

            <span
              className={`word-animation ${currentPair.second.className} ${
                animState.showSecond ? "word-visible" : "word-hidden"
              }`}
            >
              {currentPair.second.text}
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="loading-footer">
        <div className="year">© 2025</div>
      </footer>

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
          transition: opacity 1s ease-out;
        }

        .typography-loading-screen.completing {
          opacity: 0;
        }

        .loading-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          display: flex;
          justify-content: flex-start;
          z-index: 10;
        }

        .brand {
          font-family: "Space Grotesk", sans-serif;
          font-weight: 600;
          font-size: 1.5rem;
          color: #1f2937;
          letter-spacing: -0.02em;
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
          font-family: "Satoshi", sans-serif;
        }

        .word-pair-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .word-pair-container.visible {
          opacity: 1;
        }

        .word-pair-container.hidden {
          opacity: 0;
        }

        .word-animation {
          display: block;
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: center;
        }

        .word-hidden {
          opacity: 0;
          transform: scale(0.95) translateY(8px);
          filter: blur(1px);
        }

        .word-visible {
          opacity: 1;
          transform: scale(1) translateY(0);
          filter: blur(0);
        }

        /* Your brilliant typography system */
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

        .loading-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          display: flex;
          justify-content: center;
        }

        .year {
          font-family: "Satoshi", sans-serif;
          font-weight: 400;
          font-size: 0.875rem;
          color: #94a3b8;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .loading-header,
          .loading-footer {
            padding: 1.5rem;
          }

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
            gap: 0.5rem;
          }

          .loading-main {
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .loading-header,
          .loading-footer {
            padding: 1rem;
          }

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

          .brand {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TypographyLoadingAnimation;
