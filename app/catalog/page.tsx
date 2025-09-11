import PictureCard from "@/app/components/ui/picturecard";
import {
  getHeadingClass,
  getParagraphClass,
  getTextClass,
  getSectionClass,
  getPageAllowanceClass,
  getAllowanceClass,
} from "@/utils/typography";
import Link from "next/link";
import WordPill from "@/app/components/ui/wordpill";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Mildly creative, chaotically inquisitive",

  alternates: {
    canonical: "/catalog",
  },

  openGraph: {
    title: "Catalog - Obukofe Joseph",
    description: "Mildly creative, chaotically inquisitive",
    url: "https://obukofejoseph.com/catalog",
    siteName: "Obukofe Joseph",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/thumbnails/catalog.png",
        width: 1200,
        height: 630,
        alt: "Obukofe Joseph - Mildly creative, chaotically inquisitive",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Catalog - Obukofe Joseph",
    description: "Mildly creative, chaotically inquisitive",
    creator: "@obukofejoe",
    images: [
      {
        url: "/images/thumbnails/catalog.png",
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
      name: "Catalog",
      description: "Mildly creative, chaotically inquisitive",
      url: "https://obukofejoseph.com/catalog",
      author: {
        "@type": "Person",
        name: "Obukofe Joseph",
        alternateName: "Obukofe Joe",
        url: "https://obukofejoseph.com",
        image: "https://obukofejoseph.com/images/thumbnails/catalog.png",
        sameAs: ["https://twitter.com/obukofejoe"],
      },
      mainEntity: {
        "@type": "ImageGallery",
        name: "Curated Visual Collection",
        description:
          "Meticulously collected visual inspirations and meaningful discoveries",
      },
      hasPart: [
        {
          "@type": "Collection",
          name: "Threaded Statements",
          description: "Fashion and style inspirations",
        },
        {
          "@type": "Collection",
          name: "Brutalist Architecture",
          description: "Architectural photography and design",
        },
        {
          "@type": "Collection",
          name: "Chromatic Silence",
          description: "Art and visual compositions",
        },
      ],
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        name: "Obukofe Joseph",
        url: "https://obukofejoseph.com",
      },
    }),
  },
};

export default function CatalogPage() {
  return (
    <section
      className={getSectionClass({
        includeMarginTop: false,
        includeMarginBottom: true,
      })}
    >
      <div className={getPageAllowanceClass({ axis: "py" })}></div>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        Here are some of the stuff I’ve meticulously collected over the years.
      </p>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <p className={getParagraphClass({ responsive: true, muted: false })}>
        Threaded Statements
      </p>
      <div className="flex flex-col gap-4">
        <PictureCard
          imageSrc="/images/catalog/cover/IMG_7573.JPG"
          category="Cover"
          title="Aimé Leon Dore"
          author="Second Spring/Summer"
          year="2024"
        />
      </div>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <p className={getParagraphClass({ responsive: true, muted: false })}>
        Brutalist Architecture
      </p>
      <div className="flex flex-col gap-4">
        <PictureCard
          imageSrc="/images/catalog/cover/IMG_7574.JPG"
          category="Cover"
          title="Angles"
          author="Justina Šeibokas"
          year="1979"
        />
      </div>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <p className={getParagraphClass({ responsive: true, muted: false })}>
        Chromatic Silence
      </p>
      <div className="flex flex-col gap-4">
        <PictureCard
          imageSrc="/images/catalog/cover/John_Martin_Le_Pandemonium_Louvre.JPG"
          category="Cover"
          title="Chromatic Silence"
          author="John Martin"
          year="1840"
        />
      </div>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <p className={getParagraphClass({ responsive: true, muted: false })}>
        The Cosmos
      </p>
      <div className="flex flex-col gap-4">
        <PictureCard
          imageSrc="/images/catalog/cover/IMG_7574.JPG"
          category="Cover"
          title="Angles"
          author="Justina Šeibokas"
          year="1979"
        />
      </div>
      <div className={getAllowanceClass({ axis: "py" })}></div>

      <div className={getAllowanceClass({ axis: "py" })}></div>
    </section>
  );
}
