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
  getDateClass,
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
    slug: "week-21",
    weekNumber: 21,
    title: "Week 21 – Model Calibration",
    date: "2025-06-06",
    description: "Set up airflow and started segmentation.",
    focusAreas: ["ML"],
    status: "Completed",
    timeInvested: "8h 30m",
    tags: ["airflow", "segmentation", "ml-training"],
    thumbnail: "/images/recaps/week-21-thumb.png",
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
        <p className={getDateClass({ responsive: true, muted: true })}>
          [Month][Date],[Year]
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <h1 className={getHeadingClass(1)}>Model Calibration</h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To affirm trustworthiness when making critical decisions in real-world
          systems, classification algorithms must not only be accurate, but also
          indicate when they are likely to be wrong — which is where the measure
          of “confidence” comes in. An algorithm’s prediction’s
          representativeness of the true empirical likelihoods is indicated by
          its calibrated confidence measure, and this is (and should be) used
          alongside the actual predictions to ensure the model is “aware” and
          means what it says when it does.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          It is also really important to note that model calibration is
          model-agnostic and a post-hoc step, so it’s essentially performed on a
          hold-out set, after the classifier has been trained and evaluated, and
          most calibration methods (if not all) adopt this approach. The main
          aim, however, is to align the trained classifier’s predictions with
          the true likelihoods.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Calibration is only important — and should be prioritized — if
          decisions are made based on probabilities and not just predicted
          classes. In simpler terms, calibration matters when the model outputs
          are not only represented as probabilistic estimates but also treated
          as such. For example, a patient with a 75% chance of developing
          cancer, or a transaction with a 60% chance of being fraudulent. These
          estimates inherently and subconsciously reflect the state of the real
          world, and in such cases, relying on a miscalibrated model to make
          these hefty decisions would be disastrous.
        </p>
        <h2 className={getHeadingClass(2)}>
          Parametric vs Non-Parametric Algorithms
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Just a quick detour before we get to the main stuff — a parametric
          algorithm is one that has a fixed functional form, and the learnable
          components are just the model parameters. Typical examples of
          parametric functions are the Linear Regression that fits the data with
          a straight line defined by <InlineMath math={"y"} /> and{" "}
          <InlineMath math={"x"} /> and the Logistic Regression that fits the
          data with a logistic curve, defined by the sigmoid function on{" "}
          <InlineMath math={"y"} /> given as <InlineMath math={"\\sigma(y)"} />.
          The learnable bits of these guys are the slope/steepness{" "}
          <InlineMath math={"w"} /> and the bias term <InlineMath math={"b"} />,
          but the main essence of the algorithms are the rigid and pre-defined
          forms.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The good thing about them is that they are super fast to fit, and
          really interpretable (you basically know the formula of the model
          already), but they make rigid assumptions so the data has to
          linear-ish to an extent for them to really shine. That said, they are
          mostly prone to underfitting, especially if the patterns are complex
          and hard to decipher.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Non-parametric algorithms don’t have a fixed functional form and do
          not commit to one, and they generally tend to just eyeball the
          patterns from the data directly. So you can’t simply represent them in
          a written form, and if you probably can, it is highly data-specific
          and can vary across different data sets to a very large extent. For
          example, the kNN algorithm — where it measures the relative (Euclidean
          or Manhattan) distance between instances and cluster centroids, and
          the Decision Tree algorithms that use a splitting criteria rather than
          a fixed formula. The main intuition is that they both infer the
          mathematical assumptions about the data as well as the model
          parameters to best “fit” the data. The awesome thing about these guys
          is that they are highly flexible and can fit datasets with weirdly
          shaped patterns, but the not-so-good thing about them is they take a
          considerable amount of time to make out these patterns, and when they
          do, they are highly prone to overfit it.
        </p>
        <h2 className={getHeadingClass(2)}>Piecewise Functions</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          I like to think of piecewise functions as an extension of the
          “functional” part of parametric and non-parametric algorithms, where
          it consists of different expressions for varying inputs. So you’re
          essentially “piecing” together different expressions to respond to
          different inputs. In a much simpler sense, it’s saying{" "}
          <i>
            “from here to here, use this, then from here to there, use that”
          </i>
          . The good thing about these functions is that they solve the problems
          of aiming to fit complex data while staying interpretable at the same
          time, since each “piece” is a local rule about the overall function.
          Decision Trees implement this intuition where a tree has its own
          localized (and often interpretable) rule, and the decisions made by
          each tree are passed to the next with a different and pieced localized
          rule (criterion expression).
        </p>
        <h2 className={getHeadingClass(2)}>
          Criteria for Modern Calibration Functions
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Given any calibration function, it must satisfy the following
          criteria:
        </p>
        <h3 className={getHeadingClass(3)}>Minimize a Proper Scoring Rule</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          A strictly proper scoring rule is essentially a loss function, which
          in this case should be minimized to reflect the true state of the
          probability distribution. By implementing such, the calibration
          function is sure to converge to the true conditional probabilities,
          which is the whole point of model calibration. In other words, when
          you use a strictly proper scoring rule, you’re encouraging the model
          not just to predict the right class, but to be honest about how
          confident it is.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          A typical proper scoring rule is the Brier Score, as it behaves a lot
          like a calibration-focused loss function by penalizing probability
          estimates that are off.
        </p>
        <h3 className={getHeadingClass(3)}>Monotonic</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          A monotonic function preserves the ranking of predictions, and these
          rankings are defined by the strength of the probabilistic estimates,
          so if the classifier says class A has a higher probability estimate
          than class B (A ranking relatively higher than B), then the
          calibration function must not flip the order. In essence, the AUC-ROC
          score must not change (as it quantitatively explains the relative
          rankings of the model predictions, with a higher score indicating more
          clear class distinctions).
        </p>
        <h3 className={getHeadingClass(3)}>Flexible (Non-Parametric)</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Most times, miscalibration may not always be represented
          parametrically (in a fixed functional form), as the classifier may
          have a mix of both over-confident and under-confident traits all
          bundled up together in a messy way. To essentially “fit” to these
          messy patterns, it is the requirement of the calibration function to
          be nonparametric.
        </p>
        <h3 className={getHeadingClass(3)}>Trained on Independent Data</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          It is always a good idea to leave out a hold-out set, completely
          different from training and test sets (and even validation sets),
          specifically for model calibration. Because calibration functions are
          sort of isolated learners that shouldn’t be used on the same training
          set (already used by the actual classifier that needs to be
          calibrated), as you might risk the function “over-correcting” the
          classifier, making it way more overconfident or even underconfident
          than before.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For simplicity, focusing on binary classification tasks, our goal is
          to produce a calibrated probability <InlineMath math={"q_i"} /> (or{" "}
          <InlineMath math={"p"} />) for a given instance{" "}
          <InlineMath math={"x_i"} />, by implementing a calibration function{" "}
          <InlineMath math={"f(x)"} /> that takes in the predicted probability{" "}
          <InlineMath math={"p_i"} /> of <InlineMath math={"y_1 = 1"} />{" "}
          (belonging to the positive class){" "}
          <InlineMath math={"\\rightarrow f(p_i)"} />, further derived from the
          classifier’s non-probabilistic output{" "}
          <InlineMath math={"z_i \\in \\mathbb{R}"} />, by using a sigmoid
          function (sigmoid), given as <InlineMath math={"\\sigma(z_i)"} />.
        </p>
        <h3 className={getHeadingClass(3)}>Histogram Binning</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This calibration method starts by splitting the classifier’s predicted
          probabilities <InlineMath math={"p_i"} /> into{" "}
          <InlineMath math={"M"} /> mutually exclusive and often quantile (equal
          sample-distributed) bins. For each bin <InlineMath math={"bm"} />, we
          then compute the number of samples, the empirical accuracy (also known
          as the calibrated score <InlineMath math={"\\theta_m"} />) and the
          average predicted probability (confidence). As a refresher, these guys
          are what are used to construct the reliability diagram explained in
          the previous week (here), where the confidence per bin{" "}
          <InlineMath math={"(\\text{conf}(bm))"} /> is on the{" "}
          <InlineMath math={"x"} />
          -axis and the empirical accuracy{" "}
          <InlineMath math={"(\\text{acc}(bm))"} /> is on the
          <InlineMath math={"y"} />
          -axis.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Once we define all these parameters for all bins{" "}
          <InlineMath math={"(1...M)"} />, we then replace{" "}
          <InlineMath math={"\\hat{p}"} /> with the calibrated score assigned to
          the bin where <InlineMath math={"\\hat{p}"} /> is originally located
          at. Basically, if <InlineMath math={"\\hat{p}_i"} /> is located at{" "}
          <InlineMath math={"b_2"} />, then{" "}
          <InlineMath math={"\\hat{q}_i = \\theta_2"} /> for{" "}
          <InlineMath math={"\\hat{p}_i"} />. At inference, this intuition also
          applies where for <InlineMath math={"\\hat{p}_{text{inf}}"} /> located
          at <InlineMath math={"b_2"} />, then{" "}
          <InlineMath math={"\\hat{q}_{text{inf}} = \\theta_2"} />. The
          predictions <InlineMath math={"\\theta_i"} /> are chosen to minimize
          the bin-wise squared loss given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"................."} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where ...
        </p>
        <h3 className={getHeadingClass(3)}>Bayesian Binning into Quantiles</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This is a non-parametric calibration method, and it improves on the
          histogram binning technique for binary classifiers where the model
          sticks to a single, fixed bin layout, which can cause miscalibration
          if that binning doesn’t align well with the actual data distribution.
          In the case of BBQ, it considers multiple binning schemes and uses a
          Bayesian model averaging step to weigh and combine predictions across
          the multiple binning schemes.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          It’s a mouthful, I agree, but for a high-level understanding, it is
          akin to how ensemble classifiers work, where multiple base models each
          have an opinion of the class each sample belongs to, and you have a
          judge (a meta-classifier) that makes the final call based on how
          prevalent each class is, given each base classifier’s opinions, but in
          this case, the “opinion” is essentially a say of how the probability
          space should be carved out, with more prevalent binning schemes having
          more say.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Similar to the aim of histogram binning, we are concerned about
          estimating the true probability of the positive class per bin{" "}
          <InlineMath math="(\theta)" />, but we are taking a more nuanced
          approach in determining <InlineMath math="\theta" /> which can be
          summarized as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"\\theta \\sim \\text{Beta}(\\alpha, \\beta)"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Before we move into the core details of this, let’s dial back to the
          aim of model calibration, which is to understand the true underlying
          probability <InlineMath math="\theta" /> that a classifier’s
          prediction is correct, given the observed outcomes. The situation (per
          bin) is that we have <InlineMath math="n" /> predictions (samples),
          and out of those, <InlineMath math="m" /> are correct (label ={" "}
          <InlineMath math="1" />) and <InlineMath math="n - m" /> are incorrect
          (label = <InlineMath math="0" />
          ). What we are interested in is the true probability{" "}
          <InlineMath math="\theta" /> that a label is <InlineMath math="1" />{" "}
          (i.e. that the classifier is correct) for the said bin.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This is where the Bayesian intuition comes in and according to Bayes’
          theorem:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "P(\\theta \\mid \\text{data}) = \\frac{P(\\text{data} \\mid \\theta) \\cdot P(\\theta)}{P(\\text{data})}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          We are solely focused on{" "}
          <InlineMath math="P(\text{data} \mid \theta)" /> which is a measure of
          how likely the data is under a given <InlineMath math="\theta" />, and
          this is also known as the <b>likelihood</b>.{" "}
          <InlineMath math="P(\theta)" /> is known as the <b>prior</b>, which is
          a measure of what we believe about <InlineMath math="\theta" /> before
          seeing the data (kind of like winging it), and{" "}
          <InlineMath math="P(\theta \mid \text{data})" /> is known as the{" "}
          <b>posterior</b> which is a measure of what we believe about{" "}
          <InlineMath math="P(\theta)" /> after seeing the data.{" "}
          <InlineMath math="P(\text{data})" /> is the <b>evidence</b> (also
          known as the normalization constant).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Given the likelihood, we assume it follows a Binomial distribution
          given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "P(\\text{data} \\mid \\theta) = \\binom{n}{m} \\theta^m (1 - \\theta)^{n - m}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          And the prior over <InlineMath math="P(\theta)" /> to follow a Beta
          distribution given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "P(\\theta) = \\text{Beta}(\\alpha, \\beta) = \\frac{1}{B(\\alpha, \\beta)} \\theta^{\\alpha - 1}(1 - \\theta)^{\\beta - 1}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Holding on to these elements, we’d dial back and understand what
          Binomial and Beta distributions represent before moving on.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          At its core, the Binomial distribution models the number of successes
          in a fixed number of independent yes/no trials (also the called
          Bernoulli trials), each with the same probability of success. More
          intuitively, think of a coin toss where you flip a fair coin{" "}
          <InlineMath math="10" /> times, and you only care about how likely it
          is to get <InlineMath math="7" /> heads. This is a perfect binomial
          scenario, where each coin flip is a Bernoulli trial (where success =
          heads), is independent and has the same probability of success{" "}
          <InlineMath math="(p = 0.5)" />. So the Binomial distribution answers
          the question of what the probability of getting{" "}
          <InlineMath math="k" />
          successes is (e.g., heads) in <InlineMath math="n" /> trials, given
          success probability <InlineMath math="p" />. It is mathematically
          explained as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"P(X = k) = \\binom{n}{k} p^k (1 - p)^{n - k}"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math="X" /> is the total number of successes,{" "}
          <InlineMath math="n" /> is the total number of trials,{" "}
          <InlineMath math="k" /> is the number of successes we care about and{" "}
          <InlineMath math="p" /> is the probability of success per trial. The
          term <InlineMath math="\\binom{n}{k}" /> read as “
          <InlineMath math="n" /> choose <InlineMath math="k" />” counts the
          number of ways to get <InlineMath math="k" /> successes in{" "}
          <InlineMath math="n" /> trials.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To crystallize this, say you flipped a fair coin{" "}
          <InlineMath math="10" /> times and each flip has equal probabilities
          of success, the <InlineMath math="n = 10" /> and{" "}
          <InlineMath math="p = 0.5" />, and you want to know the probability of
          getting exactly <InlineMath math="7" /> heads{" "}
          <InlineMath math="(k)" />, it can be determined as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"P(X = 7) = \\binom{10}{7} (0.5)^7 (0.5)^3"} />
        </div>
        <div className={getMathBlockClass()}>
          <BlockMath math={"= \\binom{10}{7} (0.5)^{10}"} />
        </div>
        <div className={getMathBlockClass()}>
          <BlockMath math={"= 120 \\cdot (0.5)^{10} \\approx 0.117"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In essence, there’s an <InlineMath math="\approx 11.7\%" /> chance of
          getting exactly <InlineMath math="7" /> heads in{" "}
          <InlineMath math="10" /> coin tosses.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Based on this, we can set some criteria for asserting a binomial
          scenario which we loosely define the conditions to be — a fixed number
          of outcomes, binary outcome per trial, independent trial and same
          probability of success per trial. Looking at our current assumption of
          a Binomial distribution in a model calibration setup, specifically a
          bin-based implementation like BBQ where we assumed a Binomial
          distribution for likelihoods per bin, you’d notice that it fully
          adheres to our assumption where we have a fixed number of trials —
          thanks to our bin quantization requirement , each trial (prediction
          per data point) is a binary outcome (either correct{" "}
          <InlineMath math="(1)" /> or incorrect <InlineMath math="(0)" />
          ), each trial is also independent and has the same probability of
          success each time (therefore <InlineMath math="p" /> stays
          consistent).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          As for the Beta distribution, it is a continuous probability
          distribution defined over the interval <InlineMath math="[0, 1]" />,
          but unlike the Binomial distribution that focuses on modeling
          probabilities given the present representation of the data (where the
          true probability of an event is known), this measures probabilities
          based on prior successes and failures (where the true probability of
          an event is not known). It is mathematically defined as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{Beta}(p; \\alpha, \\beta) = \\frac{p^{\\alpha - 1}(1 - p)^{\\beta - 1}}{B(\\alpha, \\beta)}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math="p \in [0, 1]" /> is the probability of success
          we are concerned about (similar to the <InlineMath math="k" /> value
          in the Binomial distribution), <InlineMath math="\alpha > 0" /> and{" "}
          <InlineMath math="\beta > 0" /> are the shape parameters, and{" "}
          <InlineMath math="B(\alpha, \beta)" /> is the Beta function, which
          serves as a normalization constant so that the total area under the
          curve is <InlineMath math="1" />, similar to what the evidence term{" "}
          <InlineMath math="P(\text{data})" /> in Bayes’ theorem represents.
          More intuitively, <InlineMath math="\alpha" /> represents prior
          successes and <InlineMath math="\beta" /> represents prior failures.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Suppose we are doing a Bayesian inference where we observe some data:
          say <InlineMath math="k" /> successes in <InlineMath math="n" />{" "}
          trials (likelihood), and we have a prior belief about the probability
          of success <InlineMath math="p" />, modeled as a Beta distribution:{" "}
          <InlineMath math="p \sim \text{Beta}(\alpha, \beta)" />, in other
          words, we know the prior values, and we want to understand the
          posterior distribution which is what we now believe about p after
          seeing the data. Bayes’ theorem suggests that:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{Posterior} \\propto \\text{Likelihood} \\times \\text{Prior}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In this case, we are combining a Beta Prior with a Binomial
          Likelihood, so:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "P(p \\mid k, n) \\propto p^k (1 - p)^{n - k} \\cdot p^{\\alpha - 1} (1 - p)^{\\beta - 1}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Multiplying these together:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "P(p \\mid k, n) \\propto p^{\\alpha + k - 1}(1 - p)^{\\beta + n - k - 1}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The RHS can be computed as
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"\\text{Beta}(\\alpha + k, \\beta + n - k)"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Which is what we now believe seeing <InlineMath math="n" /> and{" "}
          <InlineMath math="k" /> (likelihood) with <InlineMath math="\alpha" />{" "}
          and <InlineMath math="\beta" /> (prior). Rewriting the LHS:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "p \\mid k, n \\sim \\text{Beta}(\\alpha + k, \\beta + n - k)"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This is now our Beta Posterior which is another Beta distribution. At
          this stage, we can conclude that Beta is a conjugate prior of
          Binomial. For additional context, a conjugate prior is a prior
          distribution that, when combined with a particular likelihood, results
          in a posterior distribution of the same family as the prior.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Back to our original point, the core intuition is that you start with
          some belief about the success rate (Beta Prior), you see some binary
          outcomes (Binomial Likelihood), and then you update your held-on
          beliefs now better and informed by the data (Beta Posterior). BBQ
          assumes that for a given bin, the true probability of success follows
          a Beta distribution, more specifically updated by the Beta posterior.
          Based on how many samples in the quantile bin are correctly classified
          (successes) vs. incorrectly classified (failures), it updates the
          assumed Beta distribution with the corresponding posterior
          distribution.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This further gives it the ability to account for uncertainty in bins
          with fewer samples, because smaller bins with fewer data would yield
          wider posterior distributions help converge to the true accuracy per
          bin.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Since we want a point estimate per bin, we’d compute the mean of the
          posterior given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\mathbb{E}[\\theta] = \\frac{\\alpha + k}{\\alpha + \\beta + n}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This is now our calibrated probability per bin, and it comes from the
          general mean of a Beta distribution{" "}
          <InlineMath math="\text{Beta}(a,b)" /> explained as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"\\mathbb{E}[\\theta] = \\frac{a}{a + b}"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In essence, the larger the bin (the more samples), the less impact the
          prior would have, and the posterior mean converges to{" "}
          <InlineMath math="\frac{k}{n}" /> which is the empirical bin accuracy.
        </p>
        <h3 className={getHeadingClass(3)}>Isotonic Regression</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The isotonic regression calibration function maps uncalibrated
          predicted probabilities (which might be overly optimistic or
          pessimistic) to the true probability distribution by learning and
          fitting a purely monotonically increasing non-parametric function to
          the set of data points (<InlineMath math={"\\hat{p}"} /> and{" "}
          <InlineMath math={"y"} />
          ). Because it is a non-decreasing monotonic function, it can be termed
          as a “stepwise” calibration technique. More importantly, it completely
          avoids the relative rankings of predictions and only tackles the
          confidence estimates, and it does so by minimizing the square loss
          (for each instance <InlineMath math={"x_i"} />) given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"................."} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where ...
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          By minimizing this scoring rule, only the confidence estimates are
          modified.
        </p>
        <h3 className={getHeadingClass(3)}>Platt Scaling</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This is a parametric approach to calibration as opposed to the other
          non-parametric options, and it fits a sigmoid function on the model’s
          predictions to map them to better-calibrated probabilities. But here’s
          the catch, it doesn’t exactly align probability to probability; it
          transforms the model’s raw score (logit) by fitting its own logistic
          function to it. So rather than using a classifier’s predicted
          confidence scores (probabilities), you take the pre-sigmoid forms and
          use them as single input (scalar) features to Platt’s sigmoid function
          — more or less swapping the original sigmoid with one much suited for
          calibration.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Practically speaking, given the sigmoid function for a binary
          classifier as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"\\hat{y}_i = \\sigma(wx_i + b)"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Platt’s sigmoid is explained as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"\\hat{q}_i = \\sigma(az_i + b)"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math={"a"} /> and <InlineMath math={"b"} /> are its
          learnable parameters <InlineMath math={"a,b \\in \\mathbb{R}"} />,
          with <InlineMath math={"a"} /> corresponding to the scalar scale
          factor (how steep the curve is) like the gradient term{" "}
          <InlineMath math={"(w)"} /> in the regular logistic equation that
          defines the steepness, and <InlineMath math={"b"} /> referring to the
          general bias term (present in both variations). The model’s raw output
          values (logits) are explained by the <InlineMath math={"z_i"} /> term.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Both <InlineMath math={"a"} /> and <InlineMath math={"b"} /> are
          optimized using the log loss between{" "}
          <InlineMath math={"\\hat{q}_i"} /> and the true label{" "}
          <InlineMath math={"y_i"} />, explained as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\min_{a, b} -\\sum_{i=1}^n \\left[ y_i \\log(\\sigma(az_i + b)) + (1 - y_i) \\log(1 - \\sigma(az_i + b)) \\right]"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Lowkey, this looks just like the regular binary cross entropy loss
          function, which measures the disparity between the predicted
          probability <InlineMath math={"\\hat{y}"} /> and the true label{" "}
          <InlineMath math={"y"} />, explained as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{BCE} = - \\left(y \\cdot \\log(\\hat{y}) + (1 - y) \\cdot \\log(1 - \\hat{y}) \\right)"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The main intuition is fitting a sigmoid transformation over raw scores
          to squash them into well-calibrated probabilities.
        </p>
        <h2 className={getHeadingClass(2)}>Multiclass Extensions</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Platt scaling, like any other parametric calibration function, is
          inherently binary, which means it doesn’t natively handle multi-class
          probability vectors out of the box.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In a multi-class setting, the model output is a vector of
          probabilities (from a softmax layer), one for each class, and simply
          applying Platt scaling directly to this vector doesn’t really make
          sense, as there’s no single logit to calibrate, but rather a whole set
          of interdependent scores. As a result, extending Platt scaling to
          multiclass problems requires a workaround.
        </p>
        <h3 className={getHeadingClass(3)}>Platt Scaling + OvR</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          One common way of extending these calibration functions to a
          multi-class classification setting is by treating it as a{" "}
          <InlineMath math={"K"} />
          One-vs-Rest classification problem. So for <InlineMath
            math={"K"}
          />{" "}
          classes, <InlineMath math={"k = 1,…,K"} />, <InlineMath math={"K"} />{" "}
          separate binary calibration functions are initialized and fitted to a
          hold-out set, and each one solely focuses on labels{" "}
          <InlineMath math={"y_i = 1"} /> (probabilistic estimates of belonging
          to the positive class) if the instance truly belongs to class{" "}
          <InlineMath math={"k"} />, else <InlineMath math={"0"} />.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          More intuitively, assuming we have raw logits{" "}
          <InlineMath math={"z_i"} /> (from a softmax function or pre-softmax
          scores for Platt Scaling), given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={"z_i = [z_i^{(1)}, z_i^{(2)}, \\ldots, z_i^{(K)}]"}
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To calibrate with Platt Scaling, for each class{" "}
          <InlineMath math={"k"} />, you’d essentially fit:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={"\\hat{q}_i^{(k)} = \\sigma(a_k \\cdot z_i^{(k)} + b_k)"}
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To then normalize them (get a valid probability distribution that sums
          to <InlineMath math={"1"} />
          ), we’d implement a softmax transformation defined as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\tilde{q}_i^{(k)} = \\frac{\\hat{q}i^{(k)}}{\\sum{j=1}^{K} \\hat{q}_i^{(j)}}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This then gives us a much more interpretable multi-class calibration
          probability distribution.
        </p>
        <h3 className={getHeadingClass(3)}>Temperature Scaling</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In binary calibration tasks, we implemented the sigmoid function
          (specifically Platt’s sigmoid) to output a well-calibrated probability
          distribution, and intuitively, we could sort of implement the same
          logic and apply a “Platt softmax” for multi-class cases, but softmax
          has a weird way of amplifying confidences, making the classifier’s
          prediction seem more overconfident than it actually is.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To better understand this behavior, let’s say a classifier outputs a
          vector of logits <InlineMath math={"z_i = [z_1, z_2, ldots, z_K]"} />{" "}
          for a <InlineMath math={"K"} />
          -class classification problem. Softmax does what it does best and
          normalizes them such that each element in the vector corresponds to a
          certain class, and the higher the probability, the more “confident”
          the classifier is about that class it represents. In essence, the
          higher the logit, the bigger its exponential.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The problem is, due to this normalization, each class’ probability is
          affected by all other class logits due to something called{" "}
          <b>relative difference</b>. Assuming the classifier outputs these
          logit scores for the three classes <InlineMath math={"z_1"} />,{" "}
          <InlineMath math={"z_2"} />
          , and <InlineMath math={"z_K"} />:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"z_i = [3.0, 2.8, 2.7]"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Noticeably, the relative difference between them is very small
          <InlineMath math={"(\\approx 0.2)"} />, but applying a softmax
          transformation would yield:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"\\hat{p}_i \\approx [0.390, 0.319, 0.289]"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Now the model is about <InlineMath math={"40\\%"} /> confident in the
          first class, while the others are tapered off more significantly (
          <InlineMath math={"32\\%"} /> and <InlineMath math={"29\\%"} />
          ), even though the differences in the original logits were tiny. This
          behavior is even more prominent if the logits have a significantly
          higher relative difference, that is, one class has a way higher score
          than the others, like in this logit <InlineMath math={"z_i"} />:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"z_i = [8.0, 2.0, 1.0]"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The transformed vector then yields:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"\\hat{p}_i \\approx [0.997, 0.002, 0.001]"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This behavior is known as <b>exaggerated uncertainty</b>, and the
          reason is due to the exponential function. Exponential functions are
          notorious for growing really fast, so when you apply the softmax
          normalization, small differences in logits turn into big confidence
          gaps. Plus, softmax is a weird squashing function that tries to assign
          as much probability mass as possible to the largest logit, making it
          inherently “sharp”. It’s kind of similar to the main intuition in PCA,
          where it compresses representational complexity into a small
          orthogonal space and they both answer the question of{" "}
          <i>“what is the most important out of this information”</i> and
          emphasize what they find is important.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To better understand this behavior, you could plot the relative logit
          difference against the softmax transformed logits like I did (here).
          Notice how sharp the curve …
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To even make matters worse, the cross entropy loss function (CCE for
          multi-class) reinforces this behavior and further encourages the model
          to assign a <InlineMath math={"100\\%"} /> confidence to the “correct”
          class, by pushing <InlineMath math={"\\hat{p}_i \\rightarrow 1"} />.
          This occurs during model training where the softmax “learns” to
          minimize the cross entropy loss by transforming the widened logit gap.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Given the context and aim of model calibration, however, this behavior
          is a big no-no as overconfident predictions have a large tendency to
          be misaligned. This is where temperature scaling is implemented — to
          smoothen the sharpness of softmax. Like every other calibration
          function, it doesn’t change the predicted labels nor swap the
          rankings; it just affects the prediction’s confidence scores.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          At it’s core, temperature scaling introduces a scalar parameter known
          as the temperature <InlineMath math={"(T)"} /> to the original softmax
          function given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\hat{q}_i^{(k)}= \\frac{\\exp(z_i^{(k)} / T)}{\\sum{j=1}^{K} \\exp(z_i^{(j)} / T)}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math={"T > 0"} />. If <InlineMath math={"T > 1"} />,
          it makes the output distribution more smoother (less confident), and
          if <InlineMath math={"T < 1"} />, the distribution would be more
          sharper (more confident). Expectedly, <InlineMath math={"T = 1"} /> is
          the same as your regular softmax, so <InlineMath math={"T"} /> in this
          case is the learnable bit of the calibration function.{" "}
          <InlineMath math={"z_i^{(k)}"} /> is the logit for class{" "}
          <InlineMath math={"k"} /> for example
          <InlineMath math={"i"} /> and <InlineMath math={"\\hat{q}_i^{k}"} />{" "}
          is the calibrated class probability.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Given the overconfident classifier’s predictions as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"z_i = [8.0, 2.0, 1.0]"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          If we used a <InlineMath math={"T"} /> value of{" "}
          <InlineMath math={"5"} />, each logit is then divided by{" "}
          <InlineMath math={"T"} /> and it becomes:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"z_i = [1.6, 0.4, 0.2]"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Then the new softmax becomes:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"\\hat{q}_i \\approx [0.65, 1.94, 1.59]"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Same ranking, but a more reasonable confidence spread (smaller
          relative logit difference).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Essentially, this satisfies the parametricity criteria because the
          softmax function (with <InlineMath math={"T"} />) is a fixed
          functional form (you can write it down on a piece of paper, plus it
          hardly changes)
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The process of training <InlineMath math={"T"} /> starts by using a
          trained non-probabilistic model to get the logits{" "}
          <InlineMath math={"z_i"} /> on a held-out set, then applying the
          modified softmax transformation with <InlineMath math={"T"} />. We
          then define the cross-entropy loss between these probabilities and the
          true labels:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{CCE} = - \\sum_{i=1}^{C} y_i \\cdot \\log(\\hat{q}_i)"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Lastly, we optimize <InlineMath math={"T"} /> using gradient descent
          to minimize this loss. Most importantly, only{" "}
          <InlineMath math={"T"} /> is updated at this point, while the model’s
          actual weights are frozen.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Alternatively, for more nuanced use-cases, temperature scaling can be
          reversed to make the model more “sharp” (more confident than it
          actually is). This is done by maximizing the sharpness of the softmax
          distribution via low temperature values, that is, by setting the
          temperature parameter <InlineMath math={"T < 1"} />. Lower
          temperatures exaggerate the differences between class logits, causing
          the softmax output to become more peaked around the highest logit.
        </p>
        <h3 className={getHeadingClass(3)}>Vector Scaling</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This is a more expressive extension of temperature scaling, and it
          provides added flexibility over the mostly rigid scalar values used by
          the temperature scaling method. Plus, temperature scaling mostly
          shines when each class is equally miscalibrated (denoted by the scalar
          operation on the logit vector), but it sucks when the predictions are
          both pessimistic and optimistic, that is, the classifier is overly
          sure of some classes and less confident about others.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To tackle this, the vector scaling method is implemented. It basically
          calibrates each class’ logit independently, as opposed to the one for
          all technique — not My Hero Academia intended ; ). Mathematically
          explained as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"\\hat{p}_i = \\text{softmax}(az_i + b)"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math={"a, a \\in \\mathbb{R}^K"} /> is a vector of
          learnable scaling parameters, and{" "}
          <InlineMath math={"b, b \\in \\mathbb{R}^K"} /> is a vector of
          learnable bias terms. So each class <InlineMath math={"k"} /> gets its
          own transformation given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"z_i^{(k)} \\mapsto a_k \\cdot z_i^{(k)} + b_k"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Noticeably, the formula looks weirder at every chance you look at it —
          it is using a softmax transformation for steepness and bias (which are
          typically transformed using a sigmoid function), and it appears to be
          a linear transformation of <InlineMath math={"x"} />. This is an
          intentional behavior, however, to affirm stability.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          As opposed to its explicit definition, vector scaling does not
          necessarily use different temperature values to tweak each logit in a
          logit vector one-by-one, and manually doing this would introduce
          nonlinearity. Still, it is a known valid method defined as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\hat{p}_i^{(k)} = \\frac{\\exp\\left(z_i^{(k)} / T_k\\right)}{\\sum_j \\exp\\left(z_i^{(j)} / T_j\\right)}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Here, each logit is scaled by its own temperature, but the catch is
          that it is highly unstable and difficult to learn each logit’s{" "}
          <InlineMath math={"T"} /> value independently.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          What vector scaling actually does in practice is to pass
          affine-transformed logits to the softmax function. For more context,
          an affine transformation is a linear transformation followed by a
          translation, explained as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"f(x) = Ax + b"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math={"A, A \\in \\mathbb{R}^{m \\times n}"} /> is a
          matrix that represents the linear component, and it is responsible for
          scaling and rotation (by horizontal and vertical shearing), and{" "}
          <InlineMath math={"b, b \\in \\mathbb{R}^m"} /> is a vector that
          represents the translation component responsible for shifting.
          Basically, the vertices in <InlineMath math={"A"} /> and{" "}
          <InlineMath math={"b"} />
          are some sort of dials that transforms the input vector{" "}
          <InlineMath math={"x, x \\in \\mathbb{R}^n"} />.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          More concretely, say we are working with the same classifier that
          outputs 3 classes, it gives:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "x = \\begin{bmatrix} z_1, z_2, z_3 \\end{bmatrix} \\in \\mathbb{R}^3"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For vector scaling, <InlineMath math={"A"} /> is represented as a
          diagonal matrix that transforms <InlineMath math={"x"} /> by only
          scaling in the <InlineMath math={"x"} />, <InlineMath math={"y"} />{" "}
          and <InlineMath math={"z"} /> direction (no shearing), and it is given
          as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "A = \\begin{bmatrix} a_1 & 0 & 0 \\\\ 0 & a_2 & 0 \\\\ 0 & 0 & a_3 \\end{bmatrix}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Then the bias vector <InlineMath math={"b"} />:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={"b = \\begin{bmatrix} b_1 \\\\ b_2 \\\\ b_3 \\end{bmatrix}"}
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The affine transformation is then computed as the matrix-vector
          multiplication of <InlineMath math={"A"} /> and{" "}
          <InlineMath math={"x"} /> plus the bias vector given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "Ax + b = \\begin{bmatrix} a_1 & 0 & 0 \\\\ 0 & a_2 & 0 \\\\ 0 & 0 & a_3 \\end{bmatrix} \\begin{bmatrix} z_1 \\\\ z_2 \\\\ z_3 \\end{bmatrix} + \\begin{bmatrix} b_1 \\\\ b_2 \\\\ b_3 \\end{bmatrix} = \\begin{bmatrix} a_1 z_1 + b_1 \\\\ a_2 z_2 + b_2 \\\\ a_3 z_3 + b_3 \\end{bmatrix}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This affine-transformed logit is then passed through the softmax
          function that squashes it into a probability distribution. The
          learnable bits in this case are the diagonal entries in the matrix{" "}
          <InlineMath math={"A"} /> and the bias terms in the vector{" "}
          <InlineMath math={"b"} /> (one bias per class). They are then trained
          by freezing the base classifier’s weights, and optimizing{" "}
          <InlineMath math={"A"} /> and <InlineMath math={"b"} /> to minimize
          the cross entropy loss on a held-out calibration set.
        </p>
        <h3 className={getHeadingClass(3)}>Matrix Scaling</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where vector scaling adds class-wise flexibility with scale and bias
          for each class, matrix scaling goes fully expressive by replacing the
          diagonal matrix <InlineMath math={"A"} /> with a full-entry weight
          matrix <InlineMath math={"W"} /> with learnable capabilities for all
          members. Also, logits aren’t just scaled independently across classes,
          but there’s a sense of inter-class correlation where each logit’s
          calibrated value can depend on all original logits (as defined by the
          weight matrix <InlineMath math={"W"} />
          ).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Say you have a 3-class classifier as before that outputs 3 classes
          given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "x = \\begin{bmatrix} z_1 \\\\ z_2 \\\\ z_3 \\end{bmatrix} \\in \\mathbb{R}^3"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In the case of vector scaling, we shrunk the transformation to only
          focus on the steepness terms <InlineMath math={"(a_1, a_2, a_3)"} />{" "}
          in the form of:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "A = \\begin{bmatrix} a_1 & 0 & 0 \\\\ 0 & a_2 & 0 \\\\ 0 & 0 & a_3 \\end{bmatrix} \\begin{bmatrix} z_1 \\\\ z_2 \\\\ z_3 \\end{bmatrix}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          But for matrix scaling, we’d apply individual weight terms per member
          given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "Wz_i + b = \\begin{bmatrix} w_{11} & w_{12} & w_{13} \\\\ w_{21} & w_{22} & w_{23} \\\\ w_{31} & w_{32} & w_{33} \\end{bmatrix} \\begin{bmatrix} z_1 \\\\ z_2 \\\\ z_3 \\end{bmatrix}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In this case, each calibrated logit is a weighted sum of all original
          logits + its bias. this sums up to <InlineMath math={"K^2 + K"} />{" "}
          parameters, which is very high compared to vector scaling which only
          consists of <InlineMath math={"2K"} /> parameters.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Because we're tackling each logit independently, it allows for a more
          explicit calibration, and it shines in cases where the classifier is
          both over-confident and under-confident in its class predictions. The
          downside is that the number of parameters explodes with{" "}
          <InlineMath math={"K^2 + K"} />, especially when{" "}
          <InlineMath math={"K"} /> is large, leading to severe overfitting
          issues. Due to this large number of parameters, it is also very
          computationally expensive to implement.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          That said, it feels like the final boss of parametric calibration
          functions, especially where each independent logit has a well defined
          and referenced functional representation.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>

        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          This week you learned about:
        </p>
        <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
          <li>Deploying Next.js apps</li>
          <li>Performance optimization</li>
        </ul>
        <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          Key Takeaway
        </h3>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Optimizing your app ensures a better user experience.
        </p>
      </section>
    </>
  ),
};

export default recap;
