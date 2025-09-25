"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "./LoadingScreen";

interface ClientHomeWrapperProps {
  children: React.ReactNode;
}

export default function ClientHomeWrapper({
  children,
}: ClientHomeWrapperProps) {
  const [showLoading, setShowLoading] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const [hasSeenLoading, setHasSeenLoading] = useState(true);

  useEffect(() => {
    const hasVisitedHome = sessionStorage.getItem("hasVisitedHome");

    if (!hasVisitedHome) {
      setShowLoading(true);
      setHasSeenLoading(false);
      setContentReady(false);
      sessionStorage.setItem("hasVisitedHome", "true");
    } else {
      setContentReady(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setTimeout(() => {
      setContentReady(true);
    }, 300);
  };

  if (hasSeenLoading) {
    return <>{children}</>;
  }

  return (
    <>
      {showLoading && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: contentReady ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
