import { RecapModule } from "@/app/learning/recap/recap";
import { RecapContent } from "@/app/components/RecapComponent";
import {
  getSectionClass,
  getParagraphClass,
  getHeadingClass,
  getAllowanceClass,
  getPageAllowanceClass,
} from "@/utils/typography";
import { WeekInfo } from "@/app/components/ui/week-info";
import { UnderlineLink } from "@/app/components/ui/underline-link";

const recap: RecapModule = {
  metadata: {
    weekNumber: 9,
    title: "Week 9",
    date: "2025-03-02",
    description: "...",
    focusAreas: ["General"],
    status: "Planned",
    thumbnail: "/images/thumbnails/09.png",
  },
  content: () => (
    <>
      <section
        className={getSectionClass({
          includeMarginTop: true,
          includeMarginBottom: true,
        })}
      >
        <div className={getPageAllowanceClass({ axis: "py" })}></div>
        <WeekInfo
          week={9}
          date="Feb 24 – Mar 2"
          status="Planned"
          description="..."
          focusAreas={["..."]}
          resources={[
            { label: "...", url: "" },
            { label: "...", url: "" },
          ]}
        />
        <div className={getAllowanceClass()}></div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Nothing to see here (yet).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          It’s currently empty, but I’m working on it. Check back later.
        </p>
      </section>
    </>
  ),
};

export default function Week9Page() {
  return <RecapContent content={recap.content()} />;
}

export const recapMetadata = recap.metadata;

export const metadata = {
  title: recap.metadata.title,
  description: recap.metadata.description,

  alternates: {
    canonical: `/learning/recap/week-${recap.metadata.weekNumber}`,
  },

  openGraph: {
    title: recap.metadata.title,
    description: recap.metadata.description,
    url: `https://obukofejoseph.com/learning/recap/week-${recap.metadata.weekNumber}`,
    siteName: "Obukofe Joseph",
    locale: "en_US",
    type: "article",
    images: [
      {
        url: "/images/thumbnails/09.png",
        width: 1200,
        height: 630,
        alt: "Week 9 Recap",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: recap.metadata.title,
    description: recap.metadata.description,
    creator: "@obukofejoe",
    images: [
      {
        url: "/images/thumbnails/09.png",
        width: 1200,
        height: 630,
        alt: "Week 9 Recap",
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
      name: "Week 9 Recap",
      description: "...",
      url: `https://obukofejoseph.com/learning/recap/week-${recap.metadata.weekNumber}`,
      author: {
        "@type": "Person",
        name: "Obukofe Joseph",
        alternateName: "Obukofe Joe",
        url: "https://obukofejoseph.com",
        image: "https://obukofejoseph.com/images/thumbnails/09.png",
        sameAs: ["https://twitter.com/obukofejoe"],
      },
    }),
  },
};
