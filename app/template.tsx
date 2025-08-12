"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Brief loading state on route change
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={`page-template ${isLoading ? "page-loading" : "page-loaded"}`}
    >
      {children}

      <style jsx>{`
        .page-template {
          min-height: 100vh;
          transition: opacity 0.2s ease-out;
        }

        .page-loading {
          opacity: 0.3;
          pointer-events: none;
        }

        .page-loaded {
          opacity: 1;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
