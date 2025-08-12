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
    weekNumber: 14,
    title: "Week 14",
    date: "2025-04-06",
    description: "...",
    focusAreas: ["General"],
    status: "Ongoing",
    thumbnail: "/public/images/thumbnails/14.png",
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
          week={14}
          date="Mar 31 – Apr 6"
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

export default function Week14Page() {
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
        url: "/images/thumbnails/14.png",
        width: 1200,
        height: 630,
        alt: "Week 14 Recap",
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
        url: "/images/thumbnails/14.png",
        width: 1200,
        height: 630,
        alt: "Week 14 Recap",
      },
    ],
  },
};
