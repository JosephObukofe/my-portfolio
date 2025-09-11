import { RecapModule } from "@/app/learning/recap/recap";
import { RecapContent } from "@/app/components/RecapComponent";
import {
  getHeadingClass,
  getParagraphClass,
  getListClass,
  getMathBlockClass,
  getDividerClass,
  getInlineCodeClass,
  getSectionClass,
  getAllowanceClass,
  getChartTextClass,
} from "@/utils/typography";
import { WeekInfo } from "@/app/components/ui/week-info";
import { InlineMath, BlockMath } from "react-katex";
import { InlineCode } from "@/app/components/ui/inline-code";
import { UnderlineLink } from "@/app/components/ui/underline-link";

const recap: RecapModule = {
  metadata: {
    weekNumber: 18,
    title: "Week 18 – ...",
    date: "2025-05-04",
    description: "Set up airflow and started segmentation.",
    focusAreas: ["ML"],
    status: "Planned",
    thumbnail: "/public/images/thumbnails/18.png",
    resources: [
      {
        label: "Airflow DAG Concepts",
        type: "Blog",
        url: "https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html",
      },
      {
        label: "Mini-batch Training Overview",
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
          week={18}
          date="Apr 28 – May 4"
          status="Planned"
          description="...."
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

export default function Week18Page() {
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
        url: "/images/thumbnails/18.png",
        width: 1200,
        height: 630,
        alt: "Week 18 Recap",
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
        url: "/images/thumbnails/18.png",
        width: 1200,
        height: 630,
        alt: "Week 18 Recap",
      },
    ],
  },
};
