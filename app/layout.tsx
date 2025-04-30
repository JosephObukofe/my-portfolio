import './global.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Footer } from '@/app/components/ui/footer'
import { baseUrl } from './sitemap'
import { ThemeProvider } from 'next-themes'
import { PageTransition } from './components/PageTransition'
import { CyclingAvatar } from './components/CyclingAvatar'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { Header } from '@/app/components/Header'
import DigitalTime from '@/app/components/DigitalTime'
import Link from 'next/link'

// Configure Space Grotesk
const spaceGrotesk = localFont({
  src: [
    {
      path: './fonts/SpaceGrotesk-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/SpaceGrotesk-Medium.woff2',
      weight: '500',
      style: 'normal',
    }
  ],
  variable: '--font-space-grotesk',
  display: 'swap',
})

// Configure JetBrains Mono
const jetbrainsMono = localFont({
  src: './fonts/JetBrainsMono-Regular.woff2',
  variable: '--font-jetbrains',
  display: 'swap',
})

// Configure Satoshi
const satoshi = localFont({
  src: './fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  display: 'swap',
  // Optional: Define specific weights if needed for variable font
  // weight: '100 900' 
})

// Configure Borna
const borna = localFont({
  src: './fonts/borna-medium-webfont.woff2',
  variable: '--font-borna',
  display: 'swap',
  weight: '500', // Assuming medium maps to 500
  style: 'normal',
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Next.js Portfolio Starter',
    template: '%s | Next.js Portfolio Starter',
  },
  description: 'This is my portfolio.',
  openGraph: {
    title: 'My Portfolio',
    description: 'This is my portfolio.',
    url: baseUrl,
    siteName: 'My Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
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
        {/* Fixed name and role */}
        <Link href="/" className="fixed top-8 left-8 z-50 cursor-pointer">
          <div>
            <h1 className="text-[1.1rem] font-semibold font-borna">Obukofe Joseph</h1> 
            <p className="text-[0.90rem] text-muted-foreground">Data Scientist</p>
          </div>
        </Link>

        <div className="fixed bottom-8 left-8 z-50">
          <p className="text-sm text-muted-foreground">
            Designed & Built by{" "}
              <a 
                href="https://twitter.com/jojochuu" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="underline hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors"
              >
                Obukofe Joseph
              </a>
                {" ❤️"}
          </p>
        </div>

        {/* Digital Time - bottom right */}
        <div className="fixed bottom-8 right-8 z-50">
          <DigitalTime />
        </div>

        <div className="max-w-2xl mx-4 mt-8 lg:mx-auto">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="flex-auto min-w-0 flex flex-col px-4 md:px-6">
              <Header />
              <PageTransition>
                <div className="flex-auto min-w-0 flex flex-col">
                  {children}
                  <Analytics />
                  <SpeedInsights />
                </div>
              </PageTransition>
            </main>
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
