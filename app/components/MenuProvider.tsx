// components/MenuProvider.tsx
"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface MenuContextType {
  isMenuOpen: boolean;
  isMenuClosing: boolean; // Add this new state
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false); // Add this state

  const openMenu = () => {
    setIsMenuClosing(false); // Clear any closing state when opening
    setIsMenuOpen(true);
  };

  const closeMenu = useCallback(() => {
    setIsMenuClosing(true); // Set closing state immediately
    setIsMenuOpen(false); // Close the menu

    // Clear the closing state after the overlay animation finishes
    // Home page: 0.4s overlay exit, Other pages: 0.6s delay + 0.4s = 1.0s total
    // Use 450ms to give a tiny buffer for the home page timing
    setTimeout(() => {
      setIsMenuClosing(false);
    }, 450); // 0.45 seconds - matches your home page overlay exit
  }, []);

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu(); // Use the enhanced closeMenu function
    } else {
      openMenu();
    }
  };

  return (
    <MenuContext.Provider
      value={{
        isMenuOpen,
        isMenuClosing, // Add this to the context value
        openMenu,
        closeMenu,
        toggleMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
