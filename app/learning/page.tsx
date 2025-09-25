import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UnderlineLink } from "@/app/components/ui/underline-link";
import { TransitionLink } from "@/app/components/PageTransition";
import {
  getHeadingClass,
  getParagraphClass,
  getSectionClass,
  getAllowanceClass,
  getPageAllowanceClass,
} from "@/utils/typography";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning",
  description: "Mildly creative, chaotically inquisitive",

  alternates: {
    canonical: "/learning",
  },

  openGraph: {
    title: "Learning - Obukofe Joseph",
    description: "Mildly creative, chaotically inquisitive",
    url: "https://obukofejoseph.com/learning",
    siteName: "Obukofe Joseph",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/thumbnails/learning.png",
        width: 1200,
        height: 630,
        alt: "Obukofe Joseph - Mildly creative, chaotically inquisitive",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Learning - Obukofe Joseph",
    description: "Mildly creative, chaotically inquisitive",
    creator: "@obukofejoe",
    images: [
      {
        url: "/images/thumbnails/learning.png",
        width: 1200,
        height: 630,
        alt: "Obukofe Joseph - Mildly creative, chaotically inquisitive",
        type: "image/png",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    "max-snippet": 200,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": 200,
    },
  },

  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Learning",
      description: "Mildly creative, chaotically inquisitive",
      url: "https://obukofejoseph.com/learning",
      author: {
        "@type": "Person",
        name: "Obukofe Joseph",
        alternateName: "Obukofe Joe",
        url: "https://obukofejoseph.com",
        image: "https://obukofejoseph.com/images/thumbnails/learning.png",
        sameAs: ["https://twitter.com/obukofejoe"],
      },
    }),
  },
};

export default function LearningPage() {
  return (
    <section
      className={getSectionClass({
        includeMarginTop: false,
        includeMarginBottom: false,
      })}
    >
      <div className={getPageAllowanceClass({ axis: "py" })}></div>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        <TransitionLink href="/learning/materials">
          <UnderlineLink>Learning Materials</UnderlineLink>
        </TransitionLink>
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        I’ve always had this terrible habit of hoarding resource links that I
        feel would be important, all because I might need them someday. There’s
        this subtle anxiety behind it, that if I let it go, I’d miss out on
        something important. Instead of hoarding, I’m learning to intentionally
        curate based on what I want to learn at any given time and by how much
        (depth).
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        I believe that focusing on this depth, especially in the fundamentals of
        anything you want to learn, helps to clear out the noise and gives you a
        bit of added confidence. Painfully slower, yes, but it sticks. In my
        case, I use this section as a central repo for any resource that sticks
        around long enough to be useful more than once.
      </p>
      <p className={getAllowanceClass({ axis: "py" })}></p>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        <TransitionLink href="/learning/recap">
          <UnderlineLink>Weekly Recaps</UnderlineLink>
        </TransitionLink>
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        These are my mini research-style retrospectives, and I use them to
        reflect on what I explored, and particularly where I got stuck. This
        section, in many ways, is more or less what the point of this entire
        site is really, which is a weekly-logged reflection and record of my
        learning journey. It also helps me pause and track how far I’ve come.
      </p>
    </section>
  );
}
