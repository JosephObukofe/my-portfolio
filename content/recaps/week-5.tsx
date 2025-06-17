"use client";
import { RecapModule } from "@/utils/loader";
import {
  getHeadingClass,
  getParagraphClass,
  getListClass,
  getMathBlockClass,
  getDividerClass,
} from "@/utils/typography";
import { notFound } from "next/navigation";
import React from "react";
import "katex/dist/katex.min.css";
import { Badge } from "@/app/components/ui/badge";
import { InlineMath, BlockMath } from "react-katex";
import { InlineCode } from "@/app/components/ui/inline-code";
import { UnderlineLink } from "@/app/components/ui/underline-link";
import { CodeBlock, CodeBlockCode } from "@/app/components/ui/code-block";
import { useTheme } from "next-themes";
import { styles } from "@/lib/typography";

const recap: RecapModule = {
  metadata: {
    slug: "week-1",
    weekNumber: 1,
    title: "Week 1 – ML Kickoff",
    date: "2025-06-01",
    description: "Set up airflow and started segmentation.",
    focusAreas: ["ML"],
    status: "Completed",
    timeInvested: "8h 30m",
    tags: ["airflow", "segmentation", "ml-training"],
    thumbnail: "/images/recaps/week-1-thumb.png",
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
  content: (
    <>
      <p>✅ Setup Airflow and basic DAGs</p>
      <p>🧠 Learned about mini-batch training</p>
      <InlineMath math={"a^2 + b^2 = c^2"} />
      <CodeBlock code={`console.log("Hello")`}>
        <CodeBlockCode code={`console.log("Hello")`} language="ts" />
      </CodeBlock>
    </>
  ),
};

export default recap;
