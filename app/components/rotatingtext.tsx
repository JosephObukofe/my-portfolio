"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const titles = [
  { text: "Data Scientist" },
  { text: "Machine Learning Engineer" },
  { text: "Gamer (most times)" },
  { text: "Anime Nerd ;-)" },
]

export default function RotatingText() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-6 relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "absolute text-[0.85rem] font-[500] text-neutral-500 dark:text-neutral-400",
            "font-satoshi"
          )}
        >
          {titles[currentIndex].text}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
