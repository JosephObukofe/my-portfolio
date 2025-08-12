"use client";

import { useState } from "react";
import { getButtonClass } from "@/utils/typography";
import { useRouter, usePathname } from "next/navigation";

export default function MenuToggleWrapper() {
  const router = useRouter();
  const pathname = usePathname(); // Get current path BEFORE navigating

  const handleMenuClick = () => {
    // Store current path before navigating
    if (typeof window !== "undefined") {
      sessionStorage.setItem("previousPath", pathname);
    }

    // Navigate to menu page with the current path as a query parameter
    router.push(`/menu?from=${encodeURIComponent(pathname)}`);
  };

  return (
    <div className="fixed top-8 right-8 z-50 flex items-center gap-4">
      <button onClick={handleMenuClick} className={getButtonClass()}>
        Menu
      </button>
    </div>
  );
}
