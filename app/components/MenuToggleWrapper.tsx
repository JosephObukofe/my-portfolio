"use client";

import { useState } from "react";
import { getButtonClass } from "@/utils/typography";
import MenuOverlay from "./MenuOverlay";

export default function MenuToggleWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-8 right-8 z-50 flex items-center gap-4">
        <button onClick={() => setIsOpen(true)} className={getButtonClass()}>
          Menu
        </button>
      </div>
      {isOpen && <MenuOverlay onClose={() => setIsOpen(false)} />}
    </>
  );
}
