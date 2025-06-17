"use client";
import { RecapModule } from "@/utils/loader";
import {
  getHeadingClass,
  getParagraphClass,
  getListClass,
  getMathBlockClass,
  getDividerClass,
  getSectionClass,
  getAllowanceClass,
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
    slug: "week-22",
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
      <section
        className={getSectionClass({
          includeMarginTop: true,
          includeMarginBottom: true,
        })}
      >
        <h1 className={getHeadingClass(1)}>...</h1>
        <h1 className={getHeadingClass(1)}>Synthetic Data Generation</h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h1 className={getHeadingClass(1)}>Classifier Selection Criteria</h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>...</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>Logistic Regression (OvR)</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>Polynomial Logistic Regression</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>Naive Bayes</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>
          Support Vector Classifier (Linear Kernel)
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>
          Support Vector Classifier (RBF Kernel)
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>Decision Tree</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>Random Forest</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Evaluation Metrics</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>Macro Accuracy</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>Weighted Accuracy</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>Top-k Accuracy</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>Macro AUC-ROC Score</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>Per-Class AUC-ROC Score</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>Expected Calibration Error (ECE)</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>Maximum Calibration Error (MCE)</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>Brier Score (MSE)</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>
          Normalized Negative Entropy (NNE)
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
      </section>
    </>
  ),
};

export default recap;
