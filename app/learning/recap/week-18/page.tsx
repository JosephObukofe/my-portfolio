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
    status: "Ongoing",
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
          status="Ongoing"
          description="...."
          focusAreas={["..."]}
          resources={[
            { label: "...", url: "https://dvc.org/doc" },
            { label: "...", url: "https://doc.rust-lang.org/book/" },
          ]}
        />
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          For a long time, I thought of evaluation metrics for classifiers as a
          kind of checklist, that is boxes to tick without fully grasping their
          nuances. For instance, I always saw precision and recall as just
          essential checks for imbalanced datasets, while the F1 score being a
          convenient combination of the two, without really questioning why they
          mattered.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          This week, I finally got to understand the <q>why</q> behind these
          metrics, how they interact, and what they reveal about a classifier's
          performance. I also better understood the trade-off between precision
          and recall, how decision thresholds directly affects this balance, as
          well as how this relationship is visualized and represented through
          Precision-Recall (PR) curves, ROC curves and AUC-ROC scores.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          For context, precision measures the classifier's confidence in its
          positive predictions, that is how often it is right when it says
          something is of the positive class. Recall, on the other hand,
          reflects how much the classifier values sensitivity (True Positive
          Rate, TPR) over selectivity, capturing how well it identifies all
          actual positives, even if it means being a bit more liberal with
          positive predictions.
        </p>
        <hr className="my-6 border-t border-neutral-200 dark:border-neutral-800" />
        <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          The Precision-Recall Tradeoff
        </h3>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Lowering the decision threshold (from <InlineMath>0.5</InlineMath> to
          let's say <InlineMath>0.3</InlineMath>) means that the classifier
          would capture more positive instances (increased recall) but it would
          most likely misclassify negative instances as positive ones (more
          false positives = reduced precision).
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          On the other hand, increasing the decision threshold (to maybe{" "}
          <InlineMath>0.7</InlineMath>) means that the classifier would predict
          fewer instances as positive (increased precision), but it would miss
          out on the actual positive instances (reduced recall). This messy
          tradeoff is the <b>Precision-Recall Tradeoff</b>, and it underscores a
          critical part of model tuning, which is basically finding the right
          threshold.
        </p>
        <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          Precision-Recall Curve (PR-Curve)
        </h3>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          I learned about the characteristics of the PR-curve, plotting
          precision on the <InlineMath>y</InlineMath>-axis and recall on the{" "}
          <InlineMath>x</InlineMath>-axis, with varying thresholds from{" "}
          <InlineMath>0</InlineMath> to <InlineMath>1</InlineMath>. It answers
          the question of{" "}
          <q>
            If I want to increase the recall, how much precision am I
            sacrificing?
          </q>{" "}
          and vice versa.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          A flat precision at high recall (the closer the curve hugs the top
          right corner) = an amazing classifier. A purely random classifier on
          the other hand would give a horizontal line from{" "}
          <InlineMath>(0,0)</InlineMath> to <InlineMath>(1,1)</InlineMath>.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          As opposed to maximizing either precision or recall by using{" "}
          <InlineCode>np.argmax()</InlineCode> (the first index of the maximum
          value) to find the threshold that maxes out either metric, to find the
          sweet spot (optimize for both high precision and recall), then
          maximising the F1 score is the most ideal solution; which is denoted
          as the harmonic mean of precision and recall. So if either precision
          or recall is low, the F1 score will also be low, thereby punishing
          extreme values. It is mathematically explained as:
        </p>
        <BlockMath
          math={
            "\\text{F1} = 2 \\cdot \\frac{(\\text{Precision} \\times \\text{Recall})}{(\\text{Precision} + \\text{Recall})}"
          }
          className="my-4"
        />
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          In code, the main intuition is to find the threshold where the F1
          score is the highest, further explained{" "}
          <ArrowLink
            href="https://gist.github.com/JosephObukofe/44a7ee2917470b24836fb1f249a59f77"
            target="_blank"
          >
            here
          </ArrowLink>
        </p>
        <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          Receiver Operator Characteristic Curve (ROC Curve)
        </h3>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          I like to think of the ROC curve as a visualization of the PR tradeoff
          but solely from the recall end of it (also known as the True Positive
          Rate). Because recall is also attributed to false positives, the graph
          considers that too, thus it is a plot that visualizes the relationship
          between the true positive rate (recall) and the false positive rate.
          The FPR is a measure of how often the classifier incorrectly
          classifies a negative class as a positive one (raising a false alarm)
          = <InlineMath math={"1 - \\text{TNR}"} />. The TPR is plotted on the{" "}
          <InlineMath>y</InlineMath>-axis, the FPR on the{" "}
          <InlineMath>x</InlineMath>-axis and every point on the graph is a
          different decision threshold (thus a threshold-independent plot).
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          I found out that the ROC curve is just a way of understanding how well
          the classifier can distinguish between classes, but it doesn't
          explicitly focus on which, so it best works with balanced datasets. In
          the case of highly imbalanced datasets, because the ROC curve doesn't
          delve in any specific class, it fails to properly capture rare
          positive instances, so in such situations, the PR curve is more
          preferable, as it better captures such (basically a measure of{" "}
          <b>how well</b> the classifier is able to predict them and{" "}
          <b>how many</b> it was able to predict)
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Visually, a classifier's performance is identified by how close the
          curve edges to the top left corner of the ROC graph, as the closer the
          curve gets, the better the classifier (a high TPR and a low FPR = a
          more discriminative model). But numerically, it is best explained by
          the area under the ROC curve (AUC-ROC score).
        </p>
        <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          AUC-ROC Score
        </h3>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Compared to accuracy that measures the overall correctness (which is
          often misleading especially in imbalanced datasets), the AUC score is
          a numerical measure from the ROC curve, and it defines how well the
          classifier can separate (rank) positive classes from negative ones.
          Also, while accuracy only uses a single (and often the default)
          threshold, AUC is threshold-independent and considers all the possible
          thresholds, thereby affirming a stronger "confidence" in delineating
          classes.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          I also learned that classifiers with high accuracy and low AUC scores
          tend to be overconfident about the majority class, but weak in
          actually separating the positive classes from the negative ones. In
          imbalanced datasets, the classifier may be exploiting the strata
          imbalance, meaning the model isn't actually learning the patterns but
          riding on the advantageous extent of the majority class.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          To better address this, you could stratify the train-test splits to
          preserve the class ratios (preventing strata information leakage to
          the test set), then during training, oversample the minority class
          with synthetic data (SMOTE), adjust decision thresholds to maximize
          the AUC score, optionally use class weights to place more importance
          on the class of interest, or use a different model that ranks better
          out of the box.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          In well-balanced datasets however, it may be due to the classifier
          latching on to (overfitting) specific features that are probably more
          predictive than others but poor rankers, poorly scaled features
          (features with inconsistent scales), inconsistent feature importances
          or label noise.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          In these cases, use L1 or L2 regularizations to reduce overfitting,
          apply dimensionality reduction techniques and assess feature
          importances to drop noisy or redundant features.
        </p>
        <hr className="my-6 border-t border-neutral-200 dark:border-neutral-800" />
        <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          What I loved about this week
        </h2>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          It was really refreshing to step back from the usual "accuracy-first"
          mindset and better understand the subtle trade-offs that come with
          different evaluation metrics that I'd always taken at face value. I'm
          beginning to see metrics as dials I can tune based on the stakes of
          the problem, rather than rigid checkboxes to tick.
        </p>
        <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          What's next?
        </h2>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Next, I want to dive deeper into the practical side of these metrics,
          by exploring precision, recall, AUC, and loss functions in real-world
          scenarios, as well as model calibration to improve the alignment
          between probabilistic outputs and decision thresholds.
        </p>
        <div className="py-5"></div>
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
