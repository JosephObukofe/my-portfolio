"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ThemeToggleDot } from "./ui/theme-switch-button";
import DigitalTime from "./DigitalTime";
import Logo from "./Logo";
import { getButtonClass } from "@/utils/typography";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isMenu = pathname === "/menu";

  useEffect(() => {
    if (pathname !== "/menu") {
      sessionStorage.setItem("previousPath", pathname);
    }
  }, [pathname]);

  const handleMenuClick = () => {
    if (isMenu) {
      const prev = sessionStorage.getItem("previousPath");
      if (prev && prev !== "/menu") {
        router.push(prev);
      } else {
        router.push("/");
      }

      sessionStorage.removeItem("previousPath");
    } else {
      router.push("/menu");
    }
  };

  return (
    <>
      {/* Menu Button (clickable toggle) */}
      <div className="fixed top-8 right-8 z-50 flex items-center gap-4">
        <button
          onClick={handleMenuClick}
          className={getButtonClass({ muted: isMenu, bold: false })}
          aria-pressed={isMenu}
        >
          Menu
        </button>
      </div>

      {/* Hide elements on /menu */}
      {!isMenu && (
        <>
          <Link href="/" className="fixed top-8 left-8 z-50 cursor-pointer">
            <div className="text-[#212121] dark:text-[#FDFFF5]">
              <Logo />
            </div>
          </Link>
        </>
      )}

      {children}
    </>
  );
}
