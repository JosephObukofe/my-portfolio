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
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This week, I’ve been stress-testing both probabilistic and
          non-probabilistic classifiers to find the “most likely” scenarios
          where they generally tend to suck (with a deeper focus on correctly
          predicting instances belonging to minority classes in a multi-class
          classification setup), and as an attempt to fulfill an unbiased
          requirement, all pre-trained classifiers used in this diagnostic
          experiment were out-of-the-box models.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For more context, an out-of-box classifier is one simply initialized
          and trained on an independent set of data with the sole goal of
          minimizing the preset loss function - so no intricate hyperparameter
          tuning step, no edge case loss function to selectively adjust model
          weights, no decision boundary shift, no cost-sensitive learning – just
          vanilla algorithmic behavior till the end with a random seed to
          eliminate classifier stochasticity. Why? Out-of-box models are
          somewhat predictable and they clearly show the true and inherent
          expressiveness of each classifier. In this case, I am treating them as
          honesty tests to understand exactly how they behave given a consistent
          set of data.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This is more or less a comparative behavioral study of classifiers,
          looking not just at how well they predict, but how confidently wrong
          they can be, and whether those mistakes are consistent across
          conditions.
        </p>
        <h1 className={getHeadingClass(1)}>Synthetic Data Generation</h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h1 className={getHeadingClass(1)}>Classifier Selection Criteria</h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The aim was to have a well-mixed spread of linear, non-linear,{" "}
          <UnderlineLink href="https://obukofejoey.notion.site/Generative-Classifiers-21677c2a65138081a59cc0e178f509a1?source=copy_link">
            generative
          </UnderlineLink>{" "}
          ,
          <UnderlineLink href="https://obukofejoey.notion.site/Discriminative-Classifiers-1f077c2a651380fdbdd0e152e6a5f51f?source=copy_link">
            discriminative
          </UnderlineLink>{" "}
          , ensemble, and meta-learning classifiers with varying inductive
          biases, model expressiveness, and decision surface complexities.
        </p>
        <h2 className={getHeadingClass(2)}>Inductive Bias</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For context, an inductive bias for any given model is the reason why
          they work (or learn) in the first place. It is more or less everything
          that a learning algorithm assumes about the target function it is
          aiming to learn, before ever gaining contact with the training data
          (sort of like a “preloaded” belief). The inductive bias for a
          Linear/Logistic Regression is that the relationship between the inputs
          and outputs is linearly separable. In the case of SVMs, it affirms
          that the best separating boundary is the one that maximizes the margin
          between classes, and for neural nets, it denotes that the function you
          aim to learn is a combination of layered and localized “mini”
          transformations (a mix of linear functions and non-linear
          activations). It also lays a foundational path for understanding
          overfitting and underfitting, so if for any reason any model is
          strongly reinforcing its preloaded beliefs, then it may be overfitting
          to the learning set, and if it loosely affirms it, then it may be
          underfitting to the same learning set.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Because we are working with out-of-box classifiers, we can sort of
          predict where they would most likely mess up based on what their
          inductive biases tell us. For the Logistic Regression classifier that
          assumes linear (straight line) decision boundaries, it’d definitely
          mess up with complex class separation, so I basically have zero
          expectations for this guy in that facet. The Polynomial Regression
          classifier may do a better job since it provides more flexibility and
          assumes a non-linear (curved) decision boundaries against different
          classes. SVMs assume clear margin separations and since the synthetic
          dataset we are working with has a lot of overlapping and
          not-well-separated decision boundaries, I also have low hopes for this
          classifier as well. Depending on the base learners and setup, some
          ensemble classifiers blend predictive biases together and tend to
          overcompensate, which is why they can be prone to overfitting issues,
          especially if not regularized, but given the complexity of the data, I
          expect them to do fairly well over the other base classifiers.
        </p>
        <h2 className={getHeadingClass(2)}>Decision Surface Complexity</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The same can be said for the decision surface complexity. To start
          with, a decision surface (or decision boundary) is the invisible line
          (or surface in higher dimensions) that a classifier draws in a feature
          space to separate the different classes. In 2D, it is referred to as a
          “line”, in 3D it is a “plane”, and in nD, it is a “hyperplane”. As
          opposed to the Logistic Regression classifier that uses a single
          straight line to linearly separate classes, SVMs with RBF kernel use
          extremely complex (squiggly) lines to affirm class distinction. Given
          the complex nature of the data as regards complex decision boundaries,
          I would more or less trust the SVC more than the Logistic Regression
          in a test of overall correctness.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To reaffirm, for any possibly unknown reason where a least expressive
          classifier may be better calibrated than a more expressive one (in
          terms of model capacity and complexity), I am keeping an open mind to
          accept that possibility and not aiming to fanboy any classifier or
          pass down any form of “complexity bias” to the computed calibration
          score, which, again, is the core reason for working with out-of-box
          classifiers in the first place, given the aim of this experiment — to
          find out exactly where each classifier messes up.
        </p>
        <h2 className={getHeadingClass(2)}>...</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          More specifically, I included a mix of:
        </p>
        <h3 className={getHeadingClass(3)}>
          Logistic Regression Classifier (OvR)
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Logistic Regression (Linear Regression with a sigmoid layer) assumes
          classes are linearly separable, and while I don’t exactly expect much
          given its extremely simplistic and rigid assumption of linearity, I
          intend to use this as my baseline model. In essence, I wanted to
          evaluate just how badly any classifier could get and then gauge the
          predictive performances of subsequent classifiers. As an attempt not
          to hurt this poor guy’s feelings and just to give it a fair shot, I
          opted not to apply any regularization, as the goal of this experiment
          isn’t to penalize complexity but to let each model operate in its
          natural, unmodified form and observe how it performs.
        </p>
        <h3 className={getHeadingClass(3)}>
          Polynomial Logistic Regression Classifier
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Like the Logistic Regression, the Polynomial regression equally
          assumes linearly separable classes, but it fits a linear function with
          more expressive (monomial) features to a non-linear set. The
          expressive features make up for the rigid assumption of linearity made
          by the Logistic Regression. You can find more info in my notes on
          polynomial regression{" "}
          <UnderlineLink href="https://obukofejoey.notion.site/Polynomial-Regression-1f077c2a651380ebaa2fc3f513e19acc?source=copy_link">
            here
          </UnderlineLink>
          .
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          I was torn in deciding which degree to use for this classifier —
          either a quadratic or a cubic one, as Polynomial Regression
          classifiers are notoriously renowned for exploding the feature space
          with an increasing number of degrees, and validly so, while I was
          worried about overfitting issues, I also wasn’t exactly aiming to
          implement any form of conservative benchmarking in this experiment.
          Plus, my feature space (35 features) was fairly small compared to most
          real-life datasets, so for my final decision, I opted for a Polynomial
          Regression with a cubic degree.
        </p>
        <h3 className={getHeadingClass(3)}>Naive Bayes Classifier</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Like the other classifiers that comes with strongly simplifying
          assumptions, this guy is no different, and it assumes that all
          features are conditionally independent given the class, which is
          rarely the case in real-world data but it decently works in most
          cases.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In the context of this experiment, I am particularly interested in
          seeing how well the Naive Bayes classifier fares in both the
          imbalanced and non-linear decision surface facets specifically. While
          not explicitly mentioned, feature interdependence and interaction
          effects are likely to be observed in the data, as they are a major
          factor in the formation of decision boundaries, due to the combined
          effects of n_redundant and n_repeated parameters, which introduce
          correlated and duplicated features respectively, and this is a direct
          pitfall of the Naive Bayes classifier that assumes feature
          independence.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Given the case of the imbalanced class distribution, the Naive Bayes
          classifier can handle it only up to a point, as it relies heavily on
          the class prior, and given the most dominant class (40% in my case),
          it’d most likely default to that class automatically. For the
          likelihood computation, they may be noisy and likely not distinctive
          enough due to the complex decision surface and significant class
          overlap. That said, it doesn’t inherently prioritize minority class
          recall, so I might end up with a high accuracy and a lower per-class
          discrimination metric like the AUC-ROC score in this case, meaning I’d
          get misclassified data points especially for the minority classes, as
          ones that didn’t cleanly fall into its independent, per-feature
          likelihood profiles.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          While also being fairly simple to implement, my major expectation
          about this classifier’s pitfall is how overconfident it can get, and
          this is majorly due to how it determines the likelihood as a product
          of possibly codependent features under the assumption that they are
          independent. It’s even worse especially in my case where I have a
          significant number of redundant features defined by n_redundant, and
          Naive Bayes being Naive Bayes would assume they independently
          contribute the same signal (the same likelihood) and artificially
          inflate the uncertainty by the likelihood multiplication. Based on
          this, I should expect possibly overconfident predictions from this
          classifier.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Since we are dealing with continuous features (after scaling), I
          implemented the Gaussian Naive Bayes (GaussianNB) variant as an
          out-of-the-box model that explicitly deals with continuous variables.
        </p>
        <h3 className={getHeadingClass(3)}>
          Gaussian Mixture Model (GMM) Classifier
        </h3>
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
          Support Vector Classifier (Polynomial Kernel)
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>
          Support Vector Classifier (Gaussian RBF Kernel)
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>Decision Tree Classifier</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>Random Forest Classifier</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>
          Gradient Boosted Trees (XGBoost Classifier)
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h3 className={getHeadingClass(3)}>Stacked Ensemble Classifier</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Evaluation Metrics</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The selection criteria of the evaluation metrics for the experimental
          classifiers were mostly based on investigating global correctness,
          ranking ability, and ambiguity. Aside from the on-paper behavior of
          out-of-box classifiers, given our synthetic data, I needed to
          understand how well they would fare, especially in discriminating
          between minority classes.
        </p>
        <h3 className={getHeadingClass(3)}>Macro Accuracy</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Macro accuracy calculates the unweighted average of the individual
          accuracies for each class. It gives each class an equal vote,
          regardless of how many samples belong to it. It is based on the macro
          averaging strategy that ensures equal weights per class. For more
          info, check out my notes on Macro Averaging{" "}
          <UnderlineLink href="https://obukofejoey.notion.site/Macro-Averaging-1f077c2a651380059e1ac5cba6e3df65?source=copy_link">
            here
          </UnderlineLink>
          .
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          While I was keen on evaluating how well each classifier does in
          correctly predicting the positive instances out of all instances
          (which is what the accuracy metric evaluates), I was also particularly
          worried about the majority class dominating the accuracy score, which
          was why I opted for the macro averaging strategy for accuracy to
          assign equally proportional weights to all classes.
        </p>
        <h3 className={getHeadingClass(3)}>Weighted Accuracy</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          While macro accuracy compensates for class imbalance by assigning
          equal weights, this accounts for the natural skew of the data and uses
          it to assign according weights to each class. This is done by the aid
          of the support value, which is the number of instances per class. For
          more info, check out my notes on Weighted Averaging{" "}
          <UnderlineLink href="https://obukofejoey.notion.site/Weighted-Averaging-1f077c2a65138094ae1fc7c3f2b18e2d?source=copy_link">
            here
          </UnderlineLink>
          .
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          I opted for this to fully understand the overall correctness without
          artificially leveling the playing ground like I did with the macro
          averaging strategy. So given the global accuracy evaluation metric for
          binary classification tasks, this is more or less the same thing but
          for a multi-class setup.
        </p>
        <h3 className={getHeadingClass(3)}>Top-k Accuracy</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          I employed the top-k accuracy metric as a softer evaluation for
          classifier confidence, and I needed to test classifier ambiguity and
          possible class confusion (if any). Here, before the actual calibration
          measures, I wanted to sort of see the early warning signs that a
          classifier is either confidently dumb or doubtfully right (uncertain
          but still managing to land the correct class somewhere in its top
          guesses).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where general accuracy (also known as Top-1 accuracy) denotes and
          measures if the classifier was absolutely right (total correctness
          across all classes), top-k accuracy measures if the classifier’s
          predictions were at least in the specified class limit denoted by k.
          In more intuitive terms, it measures how often the correct class is at
          least considered as one of the top plausible answers. Now, while it
          might seem counterintuitive in our stress-testing experiment that
          values pure correctness (either of the positive class or not), I am
          also interested in seeing edge cases of possible confidence
          misalignment from the get-go, so it is more or less an early warning
          sign of a possibly miscalibrated classifier. For example, if a
          classifier has a low top-1 but high top-k score, then we can
          hypothesize that such a classifier is possibly miscalibrated (right
          intuition but wrong representation). If it has a low top-1 and top-2
          score, then we can be sure that the classifier is confused even after
          giving it two tries.
        </p>
        <h3 className={getHeadingClass(3)}>Macro AUC-ROC</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          AUC-ROC measures how well a classifier can rank positive instances
          higher than negative ones, so a classifier that ranks positive
          instances much higher than negative ones (there’s a clear class
          distinction), then it’d have a higher AUC-ROC score and vice versa.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Given a multi-class classification setup like in my case, the macro
          AUC-ROC metric incorporates the macro averaging strategy by computing
          the unweighted mean AUC-ROC score across all classes (using a
          One-vs-Rest approach).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          I incorporated this evaluation metric to assess the ranking ability of
          the experimental classifiers, especially in the presence of
          overlapping class boundaries as defined in the synthetic
          classification data. Because I had a mix of both probabilistic and
          non-probabilistic classifiers, I was particularly curious to see how
          each category handled confidence estimation. For more context,
          probabilistic classifiers like the Logistic Regression and the Naive
          Bayes classifiers naturally output probability distributions over
          classes, which inherently makes them more compatible with ROC
          analysis, plus the confidence estimates are much more interpretable as
          they are between 0 and 1. However, with the case of non-probabilistic
          classifiers like SVCs with hinge loss and Decision Tree classifiers,
          they output margin distances or decision scores, and while the AUC-ROC
          score still applies, it’s often less interpretable and boils down to
          how well the raw confidence signals preserve the relative class
          ordering.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In that sense, I added the AUC-ROC metric as more of a ranking stress
          test metric, especially for classifiers that may have high accuracy
          scores (high correctness), but may be pessimistic or optimistic about
          it – they could either predict instances close to or equal to the base
          rate (indicating low confidence or poor separation between classes) or
          closer to the tails (high confidence scores that aren’t always
          justified) as characterized by the AUC-ROC score.
        </p>
        <h3 className={getHeadingClass(3)}>Per-Class AUC-ROC</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In an imbalanced setting like mine, some classes are extremely
          underrepresented, and I needed a fine-grained metric to see where each
          classifier really fails. This was particularly important because a
          single underperforming rare class can disproportionately affect the
          entire weighted average behind the scenes.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          It also offered a more holistic view of each classifier’s ranking
          performance, especially for the minority classes.
        </p>
        <h3 className={getHeadingClass(3)}>Expected Calibration Error (ECE)</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In determining the ECE score, the main idea is to group predictions
          into confidence bins (e.g., 0–0.1, 0.1–0.2, …, 0.9–1.0), then, for
          each bin, we’d compare the average predicted confidence to the true
          accuracy. If a classifier outputs a higher confidence prediction
          (higher than the true accuracy of the said bin), then it is
          overconfident in that bin and alternatively, if it predicts a
          confidence score lower than the true accuracy of the bin, it is
          underconfident in that bin. ECE then averages the absolute differences
          between confidence and accuracy across all bins, weighted by the
          number of samples per bin.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Given my mixed classifier lineup, this is my core diagnostic tool, and
          I incorporated this to properly evaluate which classifiers give sharp
          but misleading probabilities and those that are overly conservative.
          That said, I expect miscalibration issues to pop up especially in the
          underrepresented classes.
        </p>
        <h3 className={getHeadingClass(3)}>Maximum Calibration Error (MCE)</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where ECE gives the weighted global average, this guy shows the
          worst-case calibration error across all bins. I am using this metric
          to complement the ECE to properly investigate cases where my
          experimental classifiers are dangerously wrong somewhere (either
          extremely overconfident in one region or underconfident in another).
        </p>
        <h3 className={getHeadingClass(3)}>Brier Score (MSE)</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The Brier score is a proper scoring rule that measures the mean
          squared error between predicted probabilities and the actual class
          labels. As a loss function, it is differentiable and convex, which
          basically makes it compatible with gradient-based optimization methods
          like gradient descent.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In my case, I’m using it as a consolidated measure of both calibration
          and sharpness, and since it is more sensitive to calibration errors
          than classification ones, an accurate but miscalibrated classifier
          would be penalized with this metric. A typical classifier that may
          fall victim to this is either the stacked ensemble which tends to
          overfit and become overconfident or the Naive Bayes classifier that
          outputs extreme probabilities due to its strong independence
          assumptions. Together with the ECE and MCE, this would also be used in
          assessing post-calibration gains.
        </p>
        <h3 className={getHeadingClass(3)}>
          Normalized Negative Entropy (NNE)
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This isn’t a calibration metric per se, and as opposed to the Brier
          Score, which is a composition of calibration and sharpness measures,
          this is a confidence-centric metric derived from the entropy of the
          predicted probability distribution for each sample.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Entropy measures uncertainty, and the negative of it (sometimes
          referred to as confidence or certainty) captures how peaked the
          probability distribution is regardless of correctness. For
          interpretability, the score is usually normalized to be between 0
          (uniformly uncertain) and 1 (fully confident in one class).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          I implemented this to complement the ECE and MCE scores to indicate
          whether the classifiers were confidently bad or cautiously correct.
        </p>
        <h1 className={getHeadingClass(1)}>Experiment Overview</h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h1 className={getHeadingClass(1)}>Experiment Setup</h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Model Training</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Model Training</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Model Training</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Model Training</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Model Training</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Model Training</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Model Training</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Model Training</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Model Training</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Model Training</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Model Training</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Model Training</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Model Training</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Model Training</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Model Training</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Model Training</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h2 className={getHeadingClass(2)}>Model Training</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
      </section>
    </>
  ),
};

export default recap;