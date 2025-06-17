import "./global.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";
import { ThemeProvider } from "next-themes";
import { PageTransition } from "./components/PageTransition";
import { CyclingAvatar } from "./components/CyclingAvatar";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Header } from "@/app/components/Header";
import DigitalTime from "@/app/components/DigitalTime";
import { ThemeToggleDot } from "@/app/components/ui/theme-switch-button";
import Link from "next/link";
import { spaceGrotesk, jetbrainsMono, satoshi, borna } from "@/lib/typography";
import Logo from "@/app/components/Logo";
import { getButtonClass } from "@/utils/typography";
import LayoutWrapper from "./components/LayoutWrapper";
import LayoutShell from "./components/LayoutShell";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Obukofe Joseph",
    template: "%s · Obukofe Joseph",
  },
  description: "Minimalist mind, maximalist curiosity.",
  icons: {
    icon: "/images/favicon.svg",
  },
  openGraph: {
    images: [
      {
        url: `Thumbnail.png`,
        width: 1200,
        height: 630,
        alt: "Obukofe Joseph",
        type: "image/png",
      },
    ],
    title: "Obukofe Joseph",
    description: "Minimalist mind, maximalist curiosity.",
    url: baseUrl,
    siteName: "Obukofe Joseph",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    images: [
      {
        url: `Thumbnail.png`,
        width: 1200,
        height: 630,
      },
    ],
    card: "summary_large_image",
    title: "Obukofe Joseph",
    description: "Minimalist mind, maximalist curiosity.",
    creator: "@obukofejoe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
          <LayoutShell>
            <div className="max-w-2xl mx-4 mt-8 lg:mx-auto">
              <main className="flex-auto min-w-0 flex flex-col px-4 md:px-6">
                <Header />
                <PageTransition>
                  <div className="flex-auto min-w-0 flex flex-col">
                    <LayoutWrapper>{children}</LayoutWrapper>
                    <Analytics />
                    <SpeedInsights />
                  </div>
                </PageTransition>
              </main>
            </div>
          </LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
