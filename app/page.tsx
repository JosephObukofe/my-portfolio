"use client";

import { useState, useEffect } from "react";
import { BlogPosts } from "app/components/posts";
import SocialLinks from "./components/SocialLinks";
import { Icons } from "./components/Icons";
import TypographyLoadingAnimation from "./components/TypographyLoadingAnimation";

export default function Page() {
  const [showInitialLoading, setShowInitialLoading] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if this is the user's first visit
    const hasVisitedBefore = localStorage.getItem("hasVisitedSite");

    if (!hasVisitedBefore) {
      setIsFirstVisit(true);
      setShowInitialLoading(true);
      localStorage.setItem("hasVisitedSite", "true");
    } else {
      // Not first visit, skip loading animation
      setIsLoading(false);
      setShowInitialLoading(false);
    }
  }, []);

  const handleInitialLoadingComplete = () => {
    setShowInitialLoading(false);
    setIsLoading(false);
  };

  // Show typography loading for first-time visitors
  if (showInitialLoading && isFirstVisit && isLoading) {
    return (
      <TypographyLoadingAnimation
        onComplete={handleInitialLoadingComplete}
        duration={8000}
      />
    );
  }

  return <section></section>;
}
