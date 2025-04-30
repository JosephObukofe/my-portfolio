// No longer a client component

import { BlogPosts } from 'app/components/posts'
// TextScramble import removed
import SocialLinks from './components/SocialLinks'
import { Icons } from './components/Icons'
// import { CyclingAvatar } from './components/CyclingAvatar' // Removed, HeroSection handles its own avatar
import { HeroSection } from '@/app/components/HeroSection'; // Use path alias
import { Inter } from 'next/font/google'
import { Hand, Code } from 'lucide-react'; 

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

// Titles array and logic removed

export default function Page() {
  // State and effect logic removed

  return (
    <section className="space-y-12">
      {/* Use the new HeroSection Client Component */}
      <HeroSection />

      {/* About Section */}
      <div className="space-y-4">
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Welcome to my digital mind map of thoughts, learning bits, notes and weekly reflections.
        </p>
      </div>

      {/* Current Roadmap Section */}
      <div className="space-y-4">
        <h2 className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200">
          Current Roadmap
        </h2>
        <ul className="space-y-3">
          <li className="font-satoshi text-[0.90rem] text-neutral-600 dark:text-neutral-400 flex items-center hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
            <Icons.NeuralNetwork className="text-orange-600 dark:text-orange-500" />
            Diving deeper into Deep Learning & Neural Nets
          </li>
          <li className="font-satoshi text-[0.90rem] text-neutral-600 dark:text-neutral-400 flex items-center hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
            <Icons.Building className="text-orange-600 dark:text-orange-500" />
            Building hands-on Machine Learning projects
          </li>
          <li className="font-satoshi text-[0.90rem] text-neutral-600 dark:text-neutral-400 flex items-center hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
            <Icons.MLOps className="text-orange-600 dark:text-orange-500" />
            Getting models into production using MLOps
          </li>
          <li className="font-satoshi text-[0.90rem] text-neutral-600 dark:text-neutral-400 flex items-center hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
            <Icons.Writing className="text-orange-600 dark:text-orange-500" />
            Sharing what I learn through technical writing
          </li>
          <li className="font-satoshi text-[0.90rem] text-neutral-600 dark:text-neutral-400 flex items-center hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
            <Icons.Learning className="text-orange-600 dark:text-orange-500" />
            Learning American Sign Language (ASL)
          </li>
          <li className="font-satoshi text-[0.90rem] text-neutral-600 dark:text-neutral-400 flex items-center hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
            <Code className="w-4 h-4 mr-2 text-orange-600 dark:text-orange-500" />
            Picking up Rust for faster, safer code
          </li>
        </ul>
      </div>

      {/* Social Links Section */}
      <div className="space-y-4">
        <h2 className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200">
          Socials
        </h2>
        <SocialLinks />
      </div>
    </section>
  )
}
