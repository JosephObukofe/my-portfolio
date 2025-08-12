import "./global.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";
import { ThemeProvider } from "next-themes";
import { PageTransition } from "./components/PageTransition";
import { spaceGrotesk, jetbrainsMono, satoshi, borna } from "@/lib/typography";
import LayoutShell from "./components/LayoutShell";
import SmoothScroll from "./components/SmoothScroll";

export const metadata: Metadata = {
  // ... your existing metadata
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        spaceGrotesk.variable,
        jetbrainsMono.variable,
        satoshi.variable,
        borna.variable
      )}
      suppressHydrationWarning
    >
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScroll />
          <LayoutShell>
            <PageTransition>{children}</PageTransition>
            <Analytics />
            <SpeedInsights />
          </LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
