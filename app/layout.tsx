// layout.tsx - Fixed provider hierarchy
import "./global.css";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";
import { ThemeProvider } from "next-themes";
import { PageTransitionProvider } from "./components/PageTransitionProvider";
import { PageTransition } from "./components/PageTransition";
import {
  spaceGrotesk,
  jetbrainsMono,
  satoshi,
  borna,
  laBelleAurore,
} from "@/lib/typography";
import LayoutShell from "./components/LayoutShell";
import { MenuProvider } from "./components/MenuProvider";
import MenuOverlay from "./components/MenuOverlay";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";

// Dashboard components
import { DashboardOverlay } from "./components/DashboardOverlay";

// Keep all your existing metadata exactly the same
export const metadata: Metadata = {
  title: {
    default: "Obukofe Joseph",
    template: "%s",
  },
  description: "Minimalist mind, maximalist curiosity",

  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Obukofe Joseph",
    description: "Minimalist mind, maximalist curiosity",
    url: "https://obukofejoseph.com/",
    siteName: "Obukofe Joseph",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/thumbnails/home.png",
        width: 1200,
        height: 630,
        alt: "Obukofe Joseph - Minimalist mind, maximalist curiosity",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Obukofe Joseph",
    description: "Minimalist mind, maximalist curiosity",
    creator: "@obukofejoe",
    images: [
      {
        url: "/images/thumbnails/home.png",
        width: 1200,
        height: 630,
        alt: "Obukofe Joseph - Minimalist mind, maximalist curiosity",
        type: "image/png",
      },
    ],
  },

  authors: [
    {
      name: "Obukofe Joseph",
      url: "https://obukofejoseph.com",
    },
  ],

  icons: {
    icon: [
      { url: "/images/favicon.svg", type: "image/svg+xml" },
      { url: "/images/favicon.ico" },
    ],
    other: [
      {
        rel: "icon",
        url: "/images/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/images/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
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

  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Obukofe Joseph",
      alternateName: "Obukofe Joe",
      url: "https://obukofejoseph.com",
      image: "https://obukofejoseph.com/images/thumbnails/home.png",
      sameAs: ["https://twitter.com/obukofejoe"],
    }),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCFFFC" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },
  ],
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
        borna.variable,
        laBelleAurore.variable
      )}
      suppressHydrationWarning
    >
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PageTransitionProvider>
            <MenuProvider>
              <Cursor />
              <SmoothScroll />
              <PageTransition>
                {" "}
                {/* ← Moved here to wrap LayoutShell */}
                <LayoutShell>
                  {children} {/* ← Children moved up one level */}
                  <Analytics />
                  <SpeedInsights />
                </LayoutShell>
              </PageTransition>
              <MenuOverlay />
            </MenuProvider>
          </PageTransitionProvider>
          <DashboardOverlay />
        </ThemeProvider>
      </body>
    </html>
  );
}
