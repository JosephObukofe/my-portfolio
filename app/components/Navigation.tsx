"use client"

import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Tabs } from '@/app/components/ui/vercel-tabs'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Navigation({ tabs }: { tabs: { id: string, label: string }[] }) {
  let pathname = usePathname()
  const router = useRouter()

  const activeTabIndex = tabs.findIndex(tab => tab.id === pathname);

  const handleTabChange = (tabId: string) => {
    router.push(tabId)
  }

  return (
    <aside className="tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="w-fit">
            <Tabs 
              tabs={tabs}
              activeTab={pathname}
              onTabChange={handleTabChange}
              className="font-space-grotesk font-[500]"
            />
          </div>
        </nav>
      </div>
    </aside>
  )
} 