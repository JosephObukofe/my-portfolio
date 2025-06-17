import React from "react";
// Import custom Icons component
import { Icons } from "@/app/components/Icons";
// Removed Heroicons import
// import { BookOpenIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import Link from "next/link"; // Import Link
import { cn } from "@/lib/utils"; // Import cn for combining classes
import { ArrowLink } from "./recap/[slug]/page";

export default function LearningPage() {
  return (
    <section className="space-y-6">
      {/* Page Heading */}
      <h1 className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200">
        My Learning Journey
      </h1>

      {/* Introduction or Placeholder */}
      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        A steady record of what I’m learning, the materials and tools I’m using,
        and thoughts that surface along the way. This whole journey is less
        about checking boxes and more about enjoying the process — exploring
        ideas at my own pace and building something meaningful over time.
      </p>

      {/* Reverted to ul, removed list-disc, added icons */}
      <div className="font-satoshi text-[0.90rem]">
        <p className="mb-2">
          <ArrowLink href="/learning/materials">
            Learning Materials (Resources, Notes, etc.)
          </ArrowLink>
        </p>
        <div className="py-1"></div>
        <p>
          <ArrowLink href="/learning/recap">Weekly Learning Recap</ArrowLink>
        </p>
      </div>

      {/* You can add more content or components here later */}
      <div className="py-5"></div>
    </section>
  );
}
