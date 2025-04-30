import React from 'react';
// Import custom Icons component
import { Icons } from '@/app/components/Icons'; 
// Removed Heroicons import
// import { BookOpenIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import Link from 'next/link'; // Import Link
import { cn } from '@/lib/utils'; // Import cn for combining classes

export default function LearningPage() {
  return (
    <section className="space-y-6">
      {/* Page Heading */}
      <h1 className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200">
        My Learning Journey
      </h1>

      {/* Introduction or Placeholder */}
      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        Documenting my ongoing learning process, resources, and weekly reflections.
      </p>

      {/* Reverted to ul, removed list-disc, added icons */}
      <div className="font-satoshi text-[0.90rem]">
        <p className="mb-2">
          <Link 
            href="/learning/materials"
            className="relative font-semibold group w-fit"
          >
            Learning Materials (Resources, Notes, etc.)
            <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-current transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </p>
        <p>
          <Link 
            href="/learning/recap"
            className="relative font-semibold group w-fit"
          >
            Weekly Learning Recap
            <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-current transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </p>
      </div>

      {/* You can add more content or components here later */}

    </section>
  );
} 