// app/learning/recap/page.tsx
import { WeeklyRecapList } from "@/app/components/ui/week-list";
import { getWeekRecapsData } from "@/utils/recapdata";
import {
  getHeadingClass,
  getParagraphClass,
  getSectionClass,
  getAllowanceClass,
  getPageAllowanceClass,
} from "@/utils/typography";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weekly Recaps",
  description: "Mildly creative, chaotically inquisitive",

  alternates: {
    canonical: "/learning/recap",
  },

  openGraph: {
    title: "Weekly Recaps - Obukofe Joseph",
    description: "Mildly creative, chaotically inquisitive",
    url: "https://obukofejoseph.com/learning/recap",
    siteName: "Obukofe Joseph",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/thumbnails/recaps.png",
        width: 1200,
        height: 630,
        alt: "Obukofe Joseph - Mildly creative, chaotically inquisitive",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Weekly Recaps - Obukofe Joseph",
    description: "Mildly creative, chaotically inquisitive",
    creator: "@obukofejoe",
    images: [
      {
        url: "/images/thumbnails/recaps.png",
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
      name: "Weekly Recaps",
      description: "Mildly creative, chaotically inquisitive",
      url: "https://obukofejoseph.com/learning/recap",
      author: {
        "@type": "Person",
        name: "Obukofe Joseph",
        alternateName: "Obukofe Joe",
        url: "https://obukofejoseph.com",
        image: "https://obukofejoseph.com/images/thumbnails/recaps.png",
        sameAs: ["https://twitter.com/obukofejoe"],
      },
    }),
  },
};

export default async function RecapPage() {
  const weekRecaps = await getWeekRecapsData();

  return (
    <section
      className={getSectionClass({
        includeMarginTop: false,
        includeMarginBottom: false,
      })}
    >
      <div className={getPageAllowanceClass({ axis: "py" })}></div>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        Weekly Recaps
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        This is my personal ritual of reflecting, and making sense of the week's
        learning journey.
      </p>

      <p className={getParagraphClass({ responsive: true, muted: true })}>
        This space helps me stay grounded in the process, celebrate small wins,
        and spot the bigger themes in my learning. It's also a way to crystalize
        ideas by writing them out, which is usually a long never-ending list of
        new concepts, lessons from failed experiments, or links I don't want to
        lose track of.
      </p>

      <p className={getParagraphClass({ responsive: true, muted: true })}>
        Most of all, it keeps me honest and consistent — by learning in public,
        but at my own pace.
      </p>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <WeeklyRecapList recaps={weekRecaps} />
    </section>
  );
}
