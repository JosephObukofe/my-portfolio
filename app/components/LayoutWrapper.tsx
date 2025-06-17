"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import DigitalTime from "./DigitalTime";
import { ThemeToggleDot } from "./ui/theme-switch-button";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMenu = pathname === "/menu";

  // Debounce the mount to prevent race condition
  const [showClock, setShowClock] = useState(!isMenu);

  useEffect(() => {
    if (!isMenu) {
      const timeout = setTimeout(() => setShowClock(true), 50); // adjust as needed
      return () => clearTimeout(timeout);
    } else {
      setShowClock(false);
    }
  }, [isMenu]);

  return (
    <>
      {children}

      <div className="fixed bottom-8 right-8 z-50 text-sm sm:text-base">
        {isMenu ? <ThemeToggleDot /> : showClock && <DigitalTime />}
      </div>
    </>
  );
}
