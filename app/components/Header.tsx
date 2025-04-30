'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Navigation } from '@/app/components/Navigation'; // Assuming correct path
import { ThemeSwitch } from '@/app/components/ui/theme-switch-button'; // Import ThemeToggle
import Image from 'next/image'; // Add Image import
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";

// Define the full navigation structure here
const navItems = {
  '/': { name: 'Home' },
  '/about': { name: 'About' },
  '/learning': { name: 'Learning' },
  '/projects': { name: 'Projects' },
  '/blog': { name: 'Blog' },
  // Updated name for Learning Materials
  '/learning/materials': { name: 'Materials' },
  '/learning/recap': { name: 'Weekly Recap' },
  // Add mappings for blog post slugs if needed, or handle dynamically
};

interface BreadcrumbItemType {
  label: React.ReactNode;
  href: string;
  isCurrentPage?: boolean;
}

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Prepare tabs for Navigation component (excluding Home AND sub-pages)
  const navigationTabs = Object.entries(navItems)
    // Filter out Home ('/') and any paths deeper than one level
    .filter(([path]) => path !== '/' && path.split('/').filter(Boolean).length === 1)
    .map(([path, { name }]) => ({ id: path, label: name }));

  // Prepare items for Breadcrumb component
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbItems: BreadcrumbItemType[] = [
    // Use CyclingAvatar (small) for Home link
    ...(!isHomePage 
      ? [{
          label: (
            // Replace CyclingAvatar with static Image
            <div className="relative w-4 h-4 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-white">
              <Image
                src="/avatars/my-notion-face-transparent (2).png" // Static image path
                alt="Home Avatar"
                fill
                sizes="16px"
                className="object-cover"
              />
            </div>
          ),
          href: "/",
          isCurrentPage: false
        }] 
      : []),
  ];

  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLastSegment = index === pathSegments.length - 1;
    let label = navItems[currentPath]?.name; // Try to find label in navItems
    
    // Fallback for dynamic segments (like blog posts)
    if (!label) {
      // Simple capitalization, might need more logic for specific routes like /blog/[slug]
      label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    }

    breadcrumbItems.push({ 
      label: label,
      href: currentPath,
      isCurrentPage: isLastSegment 
    });
  });

  return (
    // Change items-start to items-center
    <div className="flex justify-between items-center mb-8">
      {/* Container for Nav/Breadcrumbs */}
      <div className="space-y-3 flex-grow"> {/* Added flex-grow to allow breadcrumbs/nav to take space */}
        {!isHomePage && breadcrumbItems.length > 0 && ( // Render even if only Home icon is present
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={item.href}>
                  <BreadcrumbItem>
                    {item.isCurrentPage ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        {/* Removed flex items-center as icon/span handles it */}
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />} 
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
        {/* Conditionally render Navigation ONLY on the home page */}
        {isHomePage && <Navigation tabs={navigationTabs} />}
      </div>
      {/* Keep consistent margin for toggle */}
      <div className="fixed top-8 right-8 z-50">
          <ThemeSwitch />
      </div>
    </div>
  );
} 