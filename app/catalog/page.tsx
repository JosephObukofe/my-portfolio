import { catalogImages } from "@/lib/catalogimages";
import { CatalogParallaxGallery } from "@/app/components/ParallaxGallery";
import {
  getHeadingClass,
  getParagraphClass,
  getTextClass,
  getSectionClass,
  getPageAllowanceClass,
  getAllowanceClass,
} from "@/utils/typography";
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
    <>
      <section
        className={getSectionClass({
          includeMarginTop: false,
          includeMarginBottom: true,
        })}
      >
        <div className={getPageAllowanceClass({ axis: "py" })}></div>
        <CatalogParallaxGallery images={catalogImages} />
      </section>
    </>
  );
}
