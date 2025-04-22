"use client"

import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      className="fixed top-4 right-4 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <FiSun className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
        ) : (
          <FiMoon className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
        )}
      </motion.div>
    </motion.button>
  )
} 