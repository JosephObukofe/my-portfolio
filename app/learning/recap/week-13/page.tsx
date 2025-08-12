import { RecapModule } from "@/app/learning/recap/recap";
import { RecapContent } from "@/app/components/RecapComponent";
import {
  getSectionClass,
  getParagraphClass,
  getHeadingClass,
} from "@/utils/typography";
import { WeekInfo } from "@/app/components/ui/week-info";
import { UnderlineLink } from "@/app/components/ui/underline-link";

const recap: RecapModule = {
  metadata: {
    weekNumber: 13,
    title: "Week 13",
    date: "2025-03-30",
    description: "...",
    focusAreas: ["General"],
    status: "Ongoing",
    thumbnail: "/public/images/thumbnails/13.png",
    resources: [
      {
        label: "...",
        type: "Blog",
        url: "https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html",
      },
      {
        label: "...",
        type: "Video",
        url: "https://www.youtube.com/watch?v=xyz",
      },
    ],
  },
  content: () => (
    <>
      <section
        className={getSectionClass({
          includeMarginTop: true,
          includeMarginBottom: true,
        })}
      >
        <WeekInfo
          week={13}
          date="Mar 24 – Mar 30"
          status="Ongoing"
          description="..."
          focusAreas={["..."]}
          resources={[
            { label: "...", url: "https://dvc.org/doc" },
            { label: "...", url: "https://doc.rust-lang.org/book/" },
          ]}
        />
      </section>
    </>
  ),
};

export default function Week13Page() {
  return <RecapContent content={recap.content()} />;
}

export const recapMetadata = recap.metadata;

export const metadata = {
  title: recap.metadata.title,
  description: recap.metadata.description,
  openGraph: {
    title: recap.metadata.title,
    description: recap.metadata.description,
    images: [
      {
        url: "/images/thumbnails/13.png",
        width: 1200,
        height: 630,
        alt: "Week 13 Recap",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: recap.metadata.title,
    description: recap.metadata.description,
    images: [
      {
        url: "/images/thumbnails/13.png",
        width: 1200,
        height: 630,
        alt: "Week 13 Recap",
      },
    ],
  },
};
