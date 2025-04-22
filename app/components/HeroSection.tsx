// No longer needs to be a client component

// Removed useState, useEffect
// Removed TextScramble
import { CyclingAvatar } from './CyclingAvatar'; // Assuming CyclingAvatar is in the same dir
// Removed Inter import
// import { Inter } from 'next/font/google';

// Removed titles array

export function HeroSection() {
  // Removed state and effect logic

  return (
    <div className="flex flex-col items-start mb-0">
      <CyclingAvatar className="w-20 h-20" />
      <h1 className={`text-3xl tracking-tighter font-satoshi font-semibold mt-6`}>
        Hi there! 👋🏼
      </h1>
    </div>
  );
} 