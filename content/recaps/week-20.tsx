"use client";
import { RecapModule } from "@/utils/loader";
import {
  getHeadingClass,
  getParagraphClass,
  getListClass,
  getMathBlockClass,
  getDividerClass,
  getSectionClass,
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
    slug: "week-20",
    weekNumber: 20,
    title: "Week 20 – Model Calibration",
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
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This week was a deep dive into the rabbit hole of model calibration,
          and it was so refreshing to realize how classifiers cannot be just
          wrong, but also confidently wrong.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          I finally wrapped my head around the rift between Mean Squared Error
          and Cross-Entropy in the classification sense, and it turns out that
          they play different roles in classification tasks, especially how MSE
          is mainly used in regression. I can say that I'm now a bit better in
          the understanding and interpreting calibration metrics such as the
          ECE, MCE, and the Brier Score.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Unfortunately, I ghosted Rust this week, but I'm planning to
          prioritize it in the coming one.
        </p>
        <hr className={getDividerClass()} />
        <h1 className={getHeadingClass(1)}>Model Calibration</h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To calibrate a model is to simply align its predicted probabilities
          with the true underlying likelihoods of the outcomes it's trying to
          predict.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Formally, a perfectly calibrated classifier satisfies this condition:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "P(Y = 1 \\mid \\hat{P}(X) = p) = p \\quad \\text{for all } p \\in [0,1]"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math={"\\hat{P}(X)"} /> is the predicted probability
          (confidence score) for the positive class, and{" "}
          <InlineMath math={"P(Y = 1 \\mid \\hat{P}(X) = p)"} /> is the actual
          observed frequency of the positive class among all samples where the
          model predicted probability <InlineMath math={"p"} />.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          What this conditional probability equation is saying is basically to
          collect only the samples where the model predicted a certain
          probability <InlineMath math={"p"} />, then measure the proportion of
          those samples where the actual label is <InlineMath math={"1"} />{" "}
          (i.e., the event occurred). That observed frequency should match the
          predicted probability <InlineMath math={"p"} />.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In practice however, it is important to understand that no model
          achieves perfect calibration, but the main aim is to make sure that
          the classifier means what it says, and it does so a lot of times.
        </p>
        <h2 className={getHeadingClass(2)}>MSE vs Cross-Entropy</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          At it's core, MSE measures the disparity or the difference between the
          model's predictions and the actual truth values. It is mathematically
          explained as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{MSE} = \\frac1N \\sum_{i=1}^N (\\hat{y}_i - y_i)^2 = \\mathbb{E}[(\\hat{y}  - Y)^2]"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The <InlineMath math={"\\mathbb{E}"} /> term refers to the{" "}
          <b>expectation operator</b> which represents the average value of the
          expression inside it over all possible instances (
          <InlineMath math={"N"} /> in this case). It's really just a convenient
          way of representing the mean/average.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Given the context of classification, you could safely substitute{" "}
          <InlineMath math={"\\hat{y}"} /> representing the model's predicted
          values (logits) with <InlineMath math={"\\hat{p}"} /> which represents
          the classifier's predicted probabilities. The ground truth{" "}
          <InlineMath math={"y"} /> stays the same, so it can be represented as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{MSE} = \\frac1N \\sum_{i=1}^N (\\hat{p}_i - y_i)^2 = \\mathbb{E}[(\\hat{p}  - Y)^2]"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This is formally known as the <b>Brier Score</b>, but we'd get to that
          in a bit.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The core principle behind this classification-esque form of MSE sounds
          a lot like the purpose of model calibration, which is to align the
          model's probabilistic predictions to the true empirical likelihoods,
          but there's a tiny caveat — MSE is a symmetrically quadratic loss
          function.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Unlike cross-entropy which is an asymmetric, non-quadratic loss that
          grows exponentially when the predicted probability is confidently
          wrong, MSE grows quadratically and penalizes errors in a symmetric
          fashion. That means it increases as the predicted probability deviates
          from the true likelihood, regardless of direction, and is minimized
          only when the predicted probability matches the actual empirical
          frequency. It's a proper scoring rule in that sense, but less
          punishing of confident errors than cross-entropy.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For example, if a classifier predicts <InlineMath math={"\\hat{p}"} />{" "}
          as <InlineMath>0.8</InlineMath>, and the true label{" "}
          <InlineMath>y</InlineMath> is 1, then the error is:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"(0.8 - 1)^2 = 0.04"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This is small because the model is confident in the only direction,
          but if the model predicts <InlineMath math={"\\hat{p}"} /> as{" "}
          <InlineMath>0.2</InlineMath>, then the error is:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"(0.2 - 1)^2 = 0.64"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The error is much worse, and much worse quadratically, therefore
          punished more heavily.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Cross-Entropy loss, on the other hand, works a bit differently, and in
          the case of core classification tasks (where it's mostly used), it
          affirms that not only wrong and confident predictions are punished,
          but wrong and confident predictions in the wrong direction are
          punished much more severely. For context, considering a binary
          cross-entropy loss (BCE) defined as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{BCE} = - \\left( y_i \\cdot \\log(\\hat{y_i}) + (1 - y_i) \\cdot \\log(1 - \\hat{y_i}) \\right)"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Predicting a <InlineMath math={"\\hat{p}"} /> value of{" "}
          <InlineMath>0.9</InlineMath> with a truth value{" "}
          <InlineMath>y = 1</InlineMath> would be:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"-\\log(0.9) = 0.045"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The loss in this case is much smaller because the classifier predicts
          a value which is closer to the positive class. But if it confidently
          predicted a value of <InlineMath>0.03</InlineMath>, then the loss
          would be:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"-\\log(0.03) = 1.522"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The loss is much larger because the classifier is confident in the
          wrong direction.
        </p>
        <h2 className={getHeadingClass(2)}>Global Average (Base Rate)</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          As much as the measure of disparity explains the calibration extent,
          dealing within a classification scenario requires a default
          expectation for probabilistic values, and this where base rate or the
          global average comes in. I like to think of it as the proportion of
          instances that belong to the positive class without considering any
          additional context (context regarding to features in the feature
          space). Like a really dumb classifier trying its best to make a
          prediction (without considering the covariates). For more info, view
          my notes on{" "}
          <UnderlineLink href="https://obukofejoey.notion.site/Base-Rate-1f077c2a6513806a87e0e6d47e5e80be?source=copy_link">
            Base Rate
          </UnderlineLink>
          .
        </p>
        <h2 className={getHeadingClass(2)}>
          Decomposing the MSE Loss Function - The Main Intuition
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          By itself, the MSE explains how much a model's predictions deviate
          from the truth values, but they don't explain why and quantify how
          "confident" the classifier is at making those specific predictions. To
          understand that, we have to decompose the original MSE loss, kind of
          like breaking it down further, and it's decomposed form is formally
          known as the <b>Expected Quadratic Loss</b>. It is mathematically
          explained as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\mathbb{E}[(\\hat{p} - Y)^2] = \\mathbb{E}[(\\hat{p} - \\pi(\\hat{p}))^2] - \\mathbb{E}[(\\pi(\\hat{p}) - \\bar{\\pi})^2] + \\bar{\\pi} (1 - \\bar{\\pi})"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          <InlineMath math={"\\mathbb{E}[(\\hat{p} - \\pi(\\hat{p}))^2]"} /> is
          the <b>calibration term</b> which is the core calibration measure.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          <InlineMath
            math={"- \\mathbb{E}[(\\pi(\\hat{p}) - \\bar{\\pi})^2]"}
          />{" "}
          represents the <b>sharpness term</b> (also known as resolution) which
          captures how much the model's predictions differ from the base rate{" "}
          <InlineMath math={"(\\bar{\\pi})"} />.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          <InlineMath math={"\\bar{\\pi} (1 - \\bar{\\pi})"} /> indicates the
          <b> irreducible loss</b> denoting the noise in the data (one that can
          never be explained or eliminated by the classifier).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For a perfectly calibrated model, the calibration term is equal to{" "}
          <InlineMath>0</InlineMath> because the predicted probabilities
          perfectly match the empirical likelihoods (lower is better). Sharpness
          on the other hand captures the usefulness of the model, and this
          further depends on how well the model involves covariates as
          components to its learning. If it doesn't involve any, it'll predict
          the base rate <InlineMath math={"(\\bar{\\pi})"} /> for every instance
          and the sharpness score would be small, indicating a bland model
          (higher sharpness scores are better). For reference, covariates are
          simply the input features used for model training.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Alternatively, sharpness is large when the model's predictions are
          confidently far from the base rate.
        </p>
        <h2 className={getHeadingClass(2)}>
          Overconfident and Underconfident Models
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The main issue, however, is that there is a significant trade-off
          between calibration and sharpness, so maximizing one means sacrificing
          the other. Predicting the base rate{" "}
          <InlineMath math={"(\\bar{\\pi})"} /> for every instance affirms a
          100% match between the predictions and the true likelihoods, as the
          classifier is sure to always represent the ratio of the true positive
          outcomes over all other outcomes, leading to a perfectly calibrated
          model (denoted by a low calibration score), but it lacks significant
          sharpness. For any classifier to predict the base rate given any
          instance, it is most likely not taking any covariates into
          consideration and probably just playing it safe, thereby leading to an
          under-confident model. Visualizing the probabilities, under-confident
          models predict probabilities far away from the tails (
          <InlineMath>0</InlineMath> and <InlineMath>1</InlineMath>) and mostly
          clustered towards the center or around the base rate.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Most times, it doesn't always mean it's a bad classifier — it's just
          that it is hesitant in situations where it is a good decision guide.
          Assuming the base rate <InlineMath math={"(\\bar{\\pi})"} /> is{" "}
          <InlineMath>0.6</InlineMath>, think of an under confident model as one
          that predicts <InlineMath math={"\\hat{p} = 0.6"} /> for let's say a{" "}
          <InlineMath>100</InlineMath> samples, but <InlineMath>85</InlineMath>{" "}
          of them are actually of the positive class. What the classifier is
          saying is that it is only <InlineMath>60\%</InlineMath> sure, but in
          reality, it should be <InlineMath>85\%</InlineMath> sure, thereby
          downplaying its predictive capabilities by only expressing{" "}
          <InlineMath>60\%</InlineMath> certainty. In some cases, it's actually
          desirable, where an under-confident model would sort of not make
          aggressive and over-confident decisions (especially if they are wrong)
          but recommend second opinions, with the possibilities of them being
          right.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Unlike under-confident classifiers that predict conservative
          probabilistic values close to or equal to the base rate,
          over-confident classifiers predict extreme probabilities (closer to
          the tails of either <InlineMath>0</InlineMath> or{" "}
          <InlineMath>1</InlineMath>). For <InlineMath>100</InlineMath> samples,
          an over-confident classifier may assign a probabilistic confidence
          score of <InlineMath math={"\\hat{p} = 0.95"} /> for all{" "}
          <InlineMath>100</InlineMath> samples, but in reality, only{" "}
          <InlineMath>70</InlineMath> of them belong to the positive class. So
          it's kind of like the classifier affirming that it's{" "}
          <InlineMath>95\%</InlineMath> right, but in actuality, it's only right{" "}
          <InlineMath>70\%</InlineMath> of the time.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Over-confident classifiers are often characterized by a large
          sharpness score (as predictions are significantly far from the base
          rate), meaning the model isn't trying to play it safe and it
          aggressively makes predictions, but a "good" classifier is dependent
          on how small the calibration error is. For classifiers with high
          sharpness and high calibration error scores, it'd most likely make
          wrong and confident predictions, spiking the MSE score up. But for
          classifiers with high sharpness and low calibration error scores
          (indicating a well-calibrated model), it'd assign confident and
          accurate scores to instances, lowering the MSE score down.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Like the nuanced applications of under-confident models,
          over-confident models aren't inherently bad classifiers as well
          (context is classifiers with high sharpness and not-so-good
          calibration error scores — poorly calibrated classifiers). For
          example, if the classification task mostly relies on ranking samples
          by confidence rather than needing perfectly calibrated probabilities,
          then such classifiers are much more preferable. Because the sharpness
          is high, the predictions are spread apart (like aggressively
          predicting either <InlineMath>0.95</InlineMath> or{" "}
          <InlineMath>0.05</InlineMath>), meaning the ranking is more clear and
          substantial. The closest example I can think of is in recommendation
          systems, where items are sorted solely based on relevancy.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          It's super easy to misinterpret the MSE score without digging deeper,
          like two models could have the exact same MSE, but under the hood,
          one's under confident and the other is way too sure of itself. On the
          surface, they look equally "bad" (or "good"), but the reasons behind
          their errors are totally different. So, while the total score might
          match, one model might be missing the mark because it's too cautious
          (under confident), and the other because it's confidently wrong (over
          confident). So same score, totally different behaviors.
        </p>
        <h2 className={getHeadingClass(2)}>
          Confidence vs Performance: Calibration, Sharpness, Accuracy & AUC
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Calibration can be thought of as "trustworthiness," which is a measure
          of how well the model probabilities align with reality, and this is
          represented by the state of the decision thresholds. I like to think
          of decision thresholds as how much of an advantage the classifier has
          to effectively make meaningful predictions across different classes.
          Sharpness, on the other hand, can be envisioned as "confidence," which
          is a measure of how far the predictions are from the hedging bets
          (conservative predictions explained by the base rate). A classifier
          with high sharpness means that it makes more confident predictions,
          which means better separation between classes, which further means a
          better AUC-ROC score as it focuses on the relative rankings between
          classes. Even if the model is not calibrated, a sharp model that gets
          the rankings right (e.g., positive samples have{" "}
          <InlineMath math={"\\hat{p} = 0.9"} /> and negative samples have{" "}
          <InlineMath math={"\\hat{p} = 0.1"} />) will score high in AUC-ROC.
          This rule only applies if the classifier gets its predictions right —
          that is, it is both confident and correct; otherwise, it'll tank the
          AUC-ROC score.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Usually, it's understandable to think that the same intuition applies
          for calibration <InlineMath>\rightarrow</InlineMath> accuracy
          relationships, but it's far trickier. A well-calibrated model doesn't
          directly optimize for accuracy, but it leads to better decision
          thresholds, which can be termed as a "significant predictive
          advantage" over poorly calibrated models. Weirdly enough, perfectly
          calibrated models can have mediocre accuracy, especially when they
          always predict the base rate. In such cases, the model is
          conservative, doesn't distinguish between any class at all, and is
          non-representative of the measure of accuracy, which is a
          threshold-dependent correctness score (more sensitive to model
          calibration).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To properly optimize for high accuracy (and high AUC-ROC score), the
          classifier must be well calibrated and confident (have a high
          sharpness score).
        </p>
        <h3 className={getHeadingClass(3)}>
          Calibration Curve (Reliability Diagram)
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To understand how calibrated a classifier is, we'd need to investigate
          the disparity between the predicted probabilities and the actual
          outcomes. One way to do that is by plotting a calibration curve (also
          known as the reliability diagram). It works by first binning the
          predictions (from <InlineMath math="0.0 - 0.1" /> to{" "}
          <InlineMath math="0.1 - 0.2" /> up to <InlineMath math="1.0" />) and
          then plotting the average predicted probability (on the{" "}
          <InlineMath>x</InlineMath>-axis) vs. the true proportion of positives
          (on the <InlineMath>y</InlineMath>-axis).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Before getting to the low-level details of how this curve is
          interpreted, a quick heads-up would help to sort of crystallize the
          main idea later on.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Sharpness is about how strong the model's opinions are, regardless of
          whether it is correct or not. Calibration, on the other hand, is about
          how correct the opinion is. So the reliability diagram doesn't
          directly show sharpness (how confident the model is), but it
          intuitively shows how "confidently miscalibrated" a classifier is
          relative to reality. If the curve exhibits a straight diagonal line
          from <InlineMath math="(0,0)" /> to <InlineMath math="(1,1)" />, then
          it's perfectly calibrated. If the curve floats above the diagonal
          line, the model is under-confident in how it is calibrated (less
          confident than it should be), and if the curve dangles below the
          diagonal line, then it is over-confident (more confident than it
          should be).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For a more concrete example, I tested this using two out-of-the-box
          models trained on a skewed multi-class dataset. In my recent
          experiments, both classifiers struggled to predict samples from the
          minority classes, which was perfect for this case, and let's just say
          I was humbled by the results. I totally expected the{" "}
          <InlineCode>LogisticRegression</InlineCode> classifier to be better
          calibrated out-of-the-box because it directly optimizes the
          cross-entropy loss, which is inherently a proper scoring rule for
          probability estimations, so you'd always almost get well-calibrated
          scores, but for some reason, the{" "}
          <InlineCode>RandomForestClassifier</InlineCode> seemed to be better
          calibrated based on the calibration curve.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The <InlineCode>LogisticRegression</InlineCode> classifier struggled
          especially with the extreme minority class, where it was a tad
          underconfident at some point, then it spiked up (way above the
          diagonal line), before diving straight down into the overconfidence
          zone. This chaotic behavior is an indicator of how badly the
          classifier is doing — second-guessing for some predictions and being
          oddly and (mostly incorrectly) confident about others. For the{" "}
          <InlineCode>RandomForestClassifier</InlineCode>, however, it didn't
          really do too badly with the minority classes as it gently rode above
          the diagonal line, meaning it is underconfident but not to an extreme
          degree. This behavior was consistent across all minority classes,
          indicating that the classifier is doing a pretty good job given the
          context of consistency. Full code{" "}
          <UnderlineLink href="https://gist.github.com/JosephObukofe/46fb39736eff4f028a68090d36dea0aa">
            here
          </UnderlineLink>
          .
        </p>
        <h2 className={getHeadingClass(2)}>Calibration Evaluation Metrics</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          While calibration plots are great for visualizing the calibrated
          properties of classifiers and showing where miscalibration occurs, a
          much better (and often simpler) way is to distill the main idea into a
          quantitive measure that explains the calibration extent, that is, "by
          how much" is the said classifier calibrated. Another merit of
          calibration evaluation metrics is that they can be reused as modular
          components in both training-time optimization and post-adopt ML
          systems, such as in model training (as a component in loss function
          minimization, although mostly nuanced) and monitoring model drifts in
          production.
        </p>
        <h3 className={getHeadingClass(3)}>Expected Calibration Error (ECE)</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Theoretically, the Expected Calibration Error (ECE) is formally
          defined as the weighted average of the absolute difference between the
          average confidence and the true accuracy per bin, but in simpler
          terms, it's basically the combination of the per-bin errors. It is
          mathematically defined as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{ECE} = \\sum_{m=1}^{M} \\frac{|b_m|}{n} \\cdot \\left| \\text{acc}(b_m) - \\text{conf}(b_m) \\right|"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where the accuracy per bin <InlineMath math="(\text{acc}(b_m))" /> is
          given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{acc}(b_m) = \\frac{1}{|b_m|} \\sum_{i \\in b_m} \\mathbf{1}(\\hat{y}_i = y_i)"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For context, <InlineMath math="\mathbf{1}" /> is the indicator
          function that returns <InlineMath>1</InlineMath> if the condition is
          true and <InlineMath>0</InlineMath> otherwise.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          And the confidence per bin <InlineMath math="(\text{conf}(b_m))" /> is
          given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{conf}(b_m) = \\frac{1}{|b_m|} \\sum_{i \\in b_m} \\hat{p}_i"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Determining the ECE starts by firstly binning the predicted
          probabilities, similar to the way the classifier's predictions on the{" "}
          <InlineMath>x</InlineMath>-axis of the calibration curve were defined
          (here). Each bin will then contain a subset of predictions whose
          confidence (predicted probability) falls into that bin's range. Next
          is to determine the average confidence per bin{" "}
          <InlineMath math="(\text{conf}(b_m))" />. Assuming the{" "}
          <InlineMath math="(\text{conf}(b_m))" /> for a given bin is, let's
          say, <InlineMath>0.805</InlineMath>, what it essentially means is that
          for that bin <InlineMath>(b_m)</InlineMath>, the classifier was{" "}
          <InlineMath>80.5\%</InlineMath> confident in its predictions. On the
          other hand, the accuracy per bin{" "}
          <InlineMath math="(\text{acc}(b_m))" /> is simply the fraction of
          correct predictions for that bin.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Say we thresholded our decision boundary to be{" "}
          <InlineMath>0.5</InlineMath> and our classifier predicted all
          instances (<InlineMath>5</InlineMath> in this case) within the bin to
          be of the positive class, but in actuality, only{" "}
          <InlineMath>3</InlineMath> of them were, the accuracy of the bin{" "}
          <InlineMath>(b_m)</InlineMath> would be <InlineMath>0.6</InlineMath>.
          What this means is that the model was actually correct only{" "}
          <InlineMath>60\%</InlineMath> of the time. By now, you should already
          be able to take a guess on how over-confident the model was in
          predicting instances in bin <InlineMath>(b_m)</InlineMath>. If our
          confidence score was less than the true accuracy measure, we would
          conclude that our classifier was under-confident in predicting
          instances in the bin. View code implementation{" "}
          <UnderlineLink href="https://gist.github.com/JosephObukofe/50a04e1ffdd1318f328da8489a54499a">
            here
          </UnderlineLink>
          .
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          One of the key limitations of the ECE score is that, because it's a
          single summary statistic that averages out all the per-bin errors,
          outlier bins with significantly worse calibration can be obscured if
          other bins are well-calibrated. The overall ECE score might still look
          decent, even though parts of the model's prediction spectrum are
          problematic. This issue is even more pronounced when a bin has very
          few samples. The high calibration error in such bins contributes very
          little to the final ECE due to the low weight assigned to that bin
          (based on bin size). In essence, ECE is sensitive to bin granularity
          and sample distribution.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          A more intuitive workaround is to use an adaptive variant of ECE (like
          Adaptive ECE), which creates bins that are equal in size in terms of
          sample count rather than fixed-width intervals. This helps mitigate
          the issue of sparse bins and gives a more balanced view of calibration
          across the dataset. For bin-specific evaluations however, it's often
          better to use calibration curves, as they visually highlight where the
          model is under-confident or over-confident across the probability
          spectrum. This makes it super easy to diagnose specific ranges where
          the model's uncertainty estimates are unreliable.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Another notable limitation is that ECE can't be used as a loss
          function during training because it's not differentiable. That means
          it can't be directly optimized via gradient-based methods.
        </p>
        <h3 className={getHeadingClass(3)}>Maximum Calibration Error (MCE)</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Unlike the less discriminative behavior of ECE, which averages
          calibration errors across all bins, the Maximum Calibration Error
          (MCE) zeroes in on the single most problematic bin, that is, the one
          with the largest calibration gap, whether the model is severely
          under-confident or over-confident in that region. It measures the
          maximum absolute difference between predicted confidence and actual
          accuracy across all confidence bins, mathematically explained as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{MCE} = \\max_{m \\in \\{1,, M\\}} \\left| \\text{acc}(b_m) - \\text{conf}(b_m) \\right|"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The determination of the MCE score follows the same step as the one
          for ECE, but in case of ECE where the weighted average is computed for
          all bins, MCE computes the maximum absolute calibration gap{" "}
          <InlineMath math="\rightarrow \left| \text{acc}(b_m) - \text{conf}(b_m) \right|" />{" "}
          (for the single most problematic bin). View code implementation{" "}
          <UnderlineLink href="https://gist.github.com/JosephObukofe/70312dc92f1603b7661393ab31e13418">
            here
          </UnderlineLink>
          .
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Like the ECE, MCE is also susceptible to larger bin numbers (and
          alternatively, small numbers of predictions per bin). This is because
          the more bins you use, the more likely you are to see outlier bins
          with high error values. It also doesn't reflect the overall
          calibration error but it's mainly used alongside the ECE to
          investigate and determine problematic bins. Similar to the ECE, it's
          also non-differentiable, so you can't use it as a loss function
          either.
        </p>
        <h3 className={getHeadingClass(3)}>Brier Score (MSE)</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Recall the classification-esque form of the MSE we discussed earlier
          (here), where we replaced the <InlineMath math="\hat{y}" /> with{" "}
          <InlineMath math="\hat{p}" /> to represent probabilistic values (the
          pre-decomposed MSE), that is the Brier Score. More formally, it
          measures the mean squared error between predicted probabilities and
          the actual outcomes, For a binary classification task, the Brier Score
          is mathematically defined as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{Brier Score} = \\frac{1}{N} \\sum_{i=1}^{N} (\\hat{p}_i - y_i)^2"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math="\hat{p}" /> is the predicted probability of
          the positive class and <InlineMath math="y" /> is the true label (
          <InlineMath>0</InlineMath> or <InlineMath>1</InlineMath>). For a
          multi-class scenario, it can be extended to:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{Brier Score} = \\frac{1}{N} \\sum_{i=1}^{N} \\sum_{k=1}^{K} (\\hat{p}_{i,k} - y_{i,k})^2"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math="\hat{p}_{i, k}" /> is the predicted
          probability for class <InlineMath>k</InlineMath> and{" "}
          <InlineMath math="y_{i, k}" /> resolves to <InlineMath>1</InlineMath>{" "}
          if true class is <InlineMath>k</InlineMath>, else{" "}
          <InlineMath>0</InlineMath>. It is implemented in code{" "}
          <UnderlineLink href="https://gist.github.com/JosephObukofe/e91d167c875b7a026d83f0e6e21317b0">
            here
          </UnderlineLink>
          .
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Because it is essentially a pre-decomposed form of the MSE, both
          calibration and sharpness measures are naturally accounted for. Unlike
          MCE and ECE measures that only reward lower calibration errors (lower
          is better), the Brier Score is a more holistic measure that rewards
          both correctness and confidence in a single quantitative value (lower
          is better, where the best possible score is <InlineMath>0</InlineMath>
          , indicating perfect calibration and sharpness).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          It is also important to know that predicting conservative
          probabilities (the base rate, say <InlineMath>0.5</InlineMath>) tanks
          the Brier Score, as such a classifier is far from confident.
          Alternatively, if it confidently misclassifies an instance (predicting{" "}
          <InlineMath>0.99</InlineMath> for the wrong class), correctness drops,
          which also further hurts the score.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Thankfully, the Brier Score is differentiable, so it can be used as a
          loss function in training probabilistic classifiers, but this is
          usually a nuanced approach (as it is explicitly optimizing for
          calibrated probabilities). For core classification tasks, however, it
          is better to just stick with Cross-Entropy as a formal measure of
          confidently accurate predictions.
        </p>
        <h3 className={getHeadingClass(3)}>Brier Score vs Accuracy</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          While the Brier Score is good, it doesn't tell much on its own without
          additional context. Sure, it merges the measures of calibration and
          sharpness into a single consolidated metric, but a classifier with a
          lower Brier Score might look good on paper, suggesting the model is
          well-calibrated and confident in its predictions. However, that alone
          doesn't reveal the full strength of the classifier. The key question
          remains — if these predictions are actually correct. The measure of
          accuracy answers this.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Combining the Brier Score with accuracy offers a more holistic view of
          the classifier's performance. Accuracy can be explained as a
          quality-agnostic measure, meaning it doesn't care about the quality
          (or the confidence) of predictions, but it shines in simply
          determining whether the predicted class is correct. For the Brier
          Score, even if your classifier predicts the correct class, it might
          get penalized if the confidence is too low or too high. So while Brier
          Score tells us how well the predictions match the actual likelihoods
          and the quality of those predictions, it doesn't account for the
          direction. This is where accuracy shines, and by limiting the accuracy
          measure to focus on the positive class, we can holistically understand
          how accurate and calibrated the classifier is in predicting instances
          of the positive class.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In the code{" "}
          <UnderlineLink href="https://gist.github.com/JosephObukofe/93b1d51090720627797a8c1a5d6ff301">
            here
          </UnderlineLink>
          , the <InlineCode>RandomForestClassifier</InlineCode> dominates both
          accuracy and the Brier Score measure, indicating that it correctly
          predicts more positive instances than the{" "}
          <InlineCode>LogisticRegression</InlineCode>, and the quality of its
          predictions are significantly better. For additional context, the code
          dealt in a multi-class scenario, but the main idea still applies. The
          only difference is that accuracy focuses on{" "}
          <InlineCode>np.argmax</InlineCode> (the class with the highest
          probability estimate, particularly from a softmax), and Brier Score
          penalizes miscalibrated estimates (and under or over confidence), even
          if <InlineCode>np.argmax</InlineCode> is correct. Since we have
          checked for calibration (where the{" "}
          <InlineCode>RandomForestClassifier</InlineCode> slightly overshoots
          the diagonal, but was still significantly better than the{" "}
          <InlineCode>LogisticRegression</InlineCode> at assigning probabilistic
          values that match the true empirical likelihoods), next is to
          investigate the true confidence level using confidence-based metrics
          (like ECE, MCE, or negative prediction entropy).
        </p>
        <h2 className={getHeadingClass(2)}>Sharpness Evaluation Metrics</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Measuring sharpness is less about comparing predictions to actual
          labels and more about analyzing the spread or concentration of the
          predicted probabilities themselves. Intuitively, we can easily detect
          this measure by analyzing how "spread out" our predictions are. If
          they are clustered around the extremes (<InlineMath>0</InlineMath> and{" "}
          <InlineMath>1</InlineMath>), we can conclude that we are dealing with
          a very sharp classifier. Alternatively, if the classifier's
          predictions all float around the base rate, it is a less sharp one.
        </p>
        <h3 className={getHeadingClass(3)}>
          Distribution of Predicted Probabilities
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          We can visualize this distribution by plotting a histogram of all the
          predicted probabilities. A classifier with high sharpness would show
          most probabilities clustered near <InlineMath>0</InlineMath> and{" "}
          <InlineMath>1</InlineMath> and a less sharp one would have a much
          flatter histogram with many values near <InlineMath>0.5</InlineMath>.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This is mainly used as a visualization pairing with the calibration
          curve, as it tells you how confident the classifier really is.
        </p>
        <h3 className={getHeadingClass(3)}>
          Variance of Predicted Probabilities
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          As a more quantitative measure, it's far easier to interpret the
          sharpness of a classifier as the variance of its probabilistic
          predictions. To complement the histogram, a high variance means the
          distribution is peaked (a sharp classifier), while a low variance
          means the distribution is flatter (more uncertain, thus a less sharp
          classifier).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For a binary classification task, we compute the variance (sharpness)
          of the predicted probabilities (of the positive class) across all
          samples as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "- \\mathbb{E}[(\\pi(\\hat{p}) - \\bar{\\pi})^2] = {s^2}(\\hat{p}) = \\frac{1}{N} \\sum_{i=1}^{N} (\\hat{p}_i - \\bar{p})^2"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math="\hat{p}_i" /> is the predicted probability of
          the positive class for sample <InlineMath math="i" /> and{" "}
          <InlineMath math="\bar{p}" /> is the mean predicted probability across
          all samples, given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"\\bar{p} = \\frac{1}{N} \\sum_{i=1}^{N} p_i"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The main intuition (for a binary task) is that if the{" "}
          <InlineMath math="p_i" />
          's are mostly close to <InlineMath math="0.5" />, the variance will be
          low, which suggests that the classifier isn't making strong
          commitments. But if the <InlineMath math="p_i" />
          's are concentrated around <InlineMath math="0" /> or{" "}
          <InlineMath math="1" />, the variance increases, indicating a sharper
          (more confident) model.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For a multi-class setting, predicted probabilities are now vectors
          over <InlineMath math="K" /> classes. To generalize the variance as a
          measure of sharpness, we can look at the average variance across the
          predicted probability vectors:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "- \\mathbb{E}[(\\pi(\\hat{p}_i) - \\bar{\\pi})^2] = {s^2}(\\hat{p}_i) = \\frac{1}{K} \\sum_{k=1}^{K} (\\hat{p}_{i,k} - \\bar{p}_i)^2 \\quad"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where{" "}
          <InlineMath math="\hat{p}_i = [\hat{p}_{i,1}, \hat{p}_{i,2}, \dots, \hat{p}_{i,K}]" />{" "}
          is the probability vector for sample <InlineMath math="i" /> and the
          variance is computed over the components (i.e., over classes) with the
          mean predicted probability <InlineMath math="\hat{p}_i" />, given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={"\\bar{p}_i = \\frac{1}{K} \\sum_{k=1}^{K} \\hat{p}_{i,k}"}
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For each sample, the sharper the distribution (i.e., closer to a
          one-hot vector), the higher the variance within the vector.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          A sharp classifier tends to assign a very high probability to one
          class and near-zero to others, yielding high variance per prediction
          vector. A flatter probability vector indicates uncertainty, thus lower
          variance and lower sharpness.
        </p>
        <h3 className={getHeadingClass(3)}>Negative Entropy</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The entropy of a model's predictions refers to its uncertainty, so in
          simple terms, high entropy means high uncertainty. If a classifier is
          very unsure (very uncertain) about its predictions, it spreads the
          probability across multiple classes, but if it is very sure, it spikes
          one class's probability (way more than the others), and lowers the
          rest.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For binary classification tasks, entropy is explained as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\mathbb{H}(\\hat{p}) = - \\hat{p} \\log \\hat{p} - (1 - \\hat{p}) \\log (1 - \\hat{p})"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For multi-class classification tasks, with{" "}
          <InlineMath math="\hat{p}" /> over <InlineMath math="K" /> classes
          (from a softmax), entropy is explained as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\mathbb{H}(\\hat{p}) = - \\sum_{k=1}^{K} \\hat{p}_k \\log(\\hat{p}_k)"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In practice, entropy is calculated per sample on the probability
          distribution across all classes, so it's a measure of how uncertain
          the model is about that specific prediction. Where{" "}
          <InlineMath math="\hat{p}_k" /> is an <InlineMath math="(N, K)" />{" "}
          array with <InlineMath math="N" /> predictions and{" "}
          <InlineMath math="K" /> classes, the output is of shape{" "}
          <InlineMath math="(N, )" />, meaning one entropy score per prediction.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Negative entropy, on the other hand, reverses this intuition by simply
          flipping the sign, so a high negative entropy indicates a low entropy,
          further indicating low uncertainty and then high confidence. The same
          logic applies to lower negative entropy, which indicates high entropy,
          and then a high uncertainty, further denoting low confidence.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For binary classifications tasks, sharpness (with respect to the
          negative entropy) is explained as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "- \\mathbb{E}[(\\pi(\\hat{p}) - \\bar{\\pi})^2] = - \\mathbb{H}(\\hat{p}) = \\hat{p} \\log \\hat{p} + (1 - \\hat{p}) \\log (1 - \\hat{p})"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For multi-class classification tasks, with{" "}
          <InlineMath math="\hat{p}" /> over <InlineMath math="K" /> classes
          (from a softmax), sharpness (negative entropy) is explained as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "- \\mathbb{E}[(\\pi(\\hat{p}) - \\bar{\\pi})^2] = - \\mathbb{H}(\\hat{p}) = \\sum_{k=1}^{K} \\hat{p}_k \\log(\\hat{p}_k)"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The main idea is that we can directly translate negative entropy to
          confidence (higher is better), highlighting the model's sharpness.
          View implementation{" "}
          <UnderlineLink href="https://gist.github.com/JosephObukofe/425a56c95274e2c9e2a1e00a4a50b484">
            here
          </UnderlineLink>
          .
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For a more intuitive interpretation, it's a good idea to always
          normalize the negative entropy so the value only exists between{" "}
          <InlineMath math="0" /> and <InlineMath math="1" />, where{" "}
          <InlineMath math="0" /> is the maximum entropy/minimum negative
          entropy (meaning the model is totally uncertain and may be stochastic
          in making predictions), and <InlineMath math="1" /> means minimum
          entropy (indicating the model is completely confident). It is
          mathematically explained as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\frac{-\\mathbb{H}(\\hat{p}) + \\mathbb{H}_{\\text{max}}}{\\mathbb{H}_{\\text{max}}}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math="\mathbb{H}_{\text{max}} = \log{(K)}" />
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For reference, <InlineMath math="\log{(K)}" /> is the worst-case
          entropy which represents absolute uncertainty. View implementation{" "}
          <UnderlineLink href="https://gist.github.com/JosephObukofe/0d90909325fcb1e17251442c23ea2ef4">
            here
          </UnderlineLink>
          .
        </p>
        <h3 className={getHeadingClass(3)}>Negative Entropy vs Accuracy</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          When accuracy is paired with the Brier Score, it tells us how
          "correct" each prediction is, as well as the quality of the said
          prediction. Quality on other hand can be decoupled to how well the
          predictions match the actual likelihoods and how "confident" the model
          was in making the said predictions.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          On the other hand, pairing accuracy with the negative entropy tells us
          how often the classifier is correct when it is confident, (or as its
          confidence grows). By plotting the per sample accuracy against the per
          sample negative entropy, a good classifier should yield an upward
          slope, indicating that low confidence means low accuracy, and high
          confidence means high accuracy, not the other way around.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          I tested this idea{" "}
          <UnderlineLink href="https://gist.github.com/JosephObukofe/0294daa28a0cb86b6bf371679dafda97">
            here
          </UnderlineLink>{" "}
          by plotting the correctness-per-prediction against the
          confidence-per-prediction (represented as the negative uncertainty)
          for the two classifiers - <InlineCode>LogisticRegression</InlineCode>{" "}
          and <InlineCode>RandomForestClassifier</InlineCode> as bar plots. The
          correctness (accuracy in this case) refers to binary accuracy per
          prediction and it is <InlineMath math="1" /> if the predicted class is
          correct, that is if <InlineCode>np.argmax(p)</InlineCode>{" "}
          <InlineMath math="\rightarrow" /> <InlineCode>y_test</InlineCode>, and{" "}
          <InlineMath math="0" /> if otherwise. Each prediction bar was then
          represented as quantile bins grouped by similar model confidence
          levels, so essentially, the leftmost bin represents the one with the
          lowest confidence and the rightmost one is the one with the highest
          confidence. For a "good" classifier, the accuracy increases from bin
          to bin as you move from left to right, which was exactly the case for
          both classifiers (with the exception of a few bins showing an
          alternative result). It also indicated that I could trust both
          classifiers to a large extent, when they make confident predictions,
          although my choice leaned more to the{" "}
          <InlineCode>RandomForestClassifier</InlineCode>, as it had a better
          accuracy score overall (the bins were longer than that of the{" "}
          <InlineCode>LogisticRegression</InlineCode> classifier, indicating
          better correctness).
        </p>
        <hr className={getDividerClass()} />
        <h1 className={getHeadingClass(1)}>What I loved about this week</h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For a really long time, I never fully understood what model
          calibration meant, more so, how to detect it and affirm that a
          classifier is mis-calibrated. This week, however, I got to understand
          the tiny, nuanced bits about it all, especially how it directly
          translates to the "confidence" and "correctness" of classifiers. It
          was also refreshing to see MSE in a different light, especially in the
          classification facet of ML and how it's decoupled form adds more
          context to the different forms of errors aside from the regular
          predicted <InlineMath math="\rightarrow" /> actual disparity. I also
          got to see how over-confident and under-confident classifiers make
          predictions.
        </p>
        <h1 className={getHeadingClass(1)}>What's next?</h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Next, I want to explore calibration functions in detail as well to
          comprehensively understand where and how model calibration fits in
          building an ML system, especially as a post-adoption step after model
          training.
        </p>
        <hr className={getDividerClass()} />
        <div className="flex flex-wrap gap-2">
          {[
            "Model Calibration",
            "MSE",
            "Cross-Entropy",
            "Base Rate",
            "Accuracy",
            "Confidence",
            "AUC-ROC",
            "Variance",
            "Entropy",
            "Sharpness",
          ].map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-sm bg-gray-100 border-gray-300"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="py-5"></div>
      </section>
    </>
  ),
};

export default recap;
