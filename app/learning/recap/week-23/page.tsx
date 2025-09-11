import { RecapModule } from "@/app/learning/recap/recap";
import { RecapContent } from "@/app/components/RecapComponent";
import {
  getTextClass,
  getHeadingClass,
  getParagraphClass,
  getListClass,
  getMathBlockClass,
  getDividerClass,
  getInlineCodeClass,
  getSectionClass,
  getAllowanceClass,
  getPageAllowanceClass,
  getTableAllowanceClass,
  getChartAllowanceClass,
  getChartTextClass,
} from "@/utils/typography";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { WeekInfo } from "@/app/components/ui/week-info";
import { UnderlineLink } from "@/app/components/ui/underline-link";
import { InlineMath, BlockMath } from "react-katex";
import { InlineCode } from "@/app/components/ui/inline-code";

const recap: RecapModule = {
  metadata: {
    weekNumber: 23,
    title: "Week 23",
    date: "2025-06-08",
    description: "Imbalance Learning",
    focusAreas: ["ML"],
    status: "Ongoing",
    thumbnail: "/images/thumbnails/23.png",
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
          week={23}
          date="Jun 2 – Jun 8"
          status="Ongoing"
          description="Imbalance Learning"
          focusAreas={["ML"]}
          resources={[
            { label: "...", url: "https://dvc.org/doc" },
            { label: "...", url: "https://doc.rust-lang.org/book/" },
          ]}
        />
        <div className={getAllowanceClass()}></div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h1 className={getHeadingClass(1, { responsive: true })}>
          The Multiplicative Complexity Factors
        </h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Multi-Class Exponential Complexity
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Given our case of <InlineMath math={"10"} /> classes rather than a
          simple binary classification case, we face <InlineMath math={"45"} />{" "}
          pairwise decision boundaries (
          <InlineMath math={"10"} /> choose <InlineMath math={"2"} />) that must
          be learned simultaneously. Here, each binary sub-problem inherits the
          complete complexity of overlap, noise, and imbalance, creating
          exponential rather than linear difficulty scaling.
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Extreme Class Imbalance
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Our <InlineMath math={"183:1"} /> imbalance ratio creates a long-tail
          distribution where Class <InlineMath math={"0"} /> dominates with{" "}
          <InlineMath math={"55,000"} /> samples <InlineMath math={"(55\\%)"} />{" "}
          while Class <InlineMath math={"9"} /> struggles with only{" "}
          <InlineMath math={"300"} /> samples <InlineMath math={"(0.3\\%)"} />.
          This represents scenarios where rare events carry disproportionate
          importance despite minimal representation.
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Curse of Dimensionality
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Given that we are operating in a 45D feature space, our minority
          classes face severe sample sparsity: Class <InlineMath math={"9"} />{" "}
          has only <InlineMath math={"6.7"} /> samples per dimension compared to
          Class <InlineMath math={"0"} />
          's <InlineMath math={"1,222"} /> samples per dimension. This 183X
          difference means minority classes become isolated points in
          high-dimensional spaces.
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          High Signal-to-Noise Ratio
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          With only <InlineMath math={"15"} /> of <InlineMath math={"45"} />{" "}
          features <InlineMath math={"(33\\%)"} /> containing genuine signal,
          our calibrated experimental classifiers must distinguish meaningful
          patterns from <InlineMath math={"67\\%"} /> noise. Majority classes
          can easily rely on statistical dominance to overcome this challenge,
          but minority classes with limited samples would struggle to separate
          signal from noise.
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Feature Redundancy
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          <InlineMath math={"23"} /> of <InlineMath math={"45"} /> features{" "}
          <InlineMath math={"(51\\%)"} /> provide no new information, as{" "}
          <InlineMath math={"15"} /> redundant features are linear combinations
          of informative features, while <InlineMath math={"8"} /> are exact
          duplicates. This creates false evidence inflation where models could
          interpret correlated noise as independent confirmation, leading to
          systematic overconfidence.
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Class Overlap
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Our reduced class separation (<InlineCode>class_sep=0.4</InlineCode>{" "}
          vs. default <InlineCode>1.0</InlineCode>) creates extensive
          overlapping decision boundaries where true class membership becomes
          fundamentally ambiguous.
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Label Contamination
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The <InlineMath math={"2\\%"} /> label noise appears minimal globally
          but the issues it creates locally are detrimental. While Class{" "}
          <InlineMath math={"0"} /> can absorb <InlineMath math={"1,100"} />{" "}
          mislabeled samples, Class <InlineMath math={"9"} />
          's <InlineMath math={"6"} /> noisy samples represent{" "}
          <InlineMath math={"8\\%"} /> contamination per cluster, and this could
          potentially mess up entire sub-patterns within already sparse minority
          classes.
        </p>
        <div className={getAllowanceClass()}></div>
        <h1 className={getHeadingClass(1, { responsive: true })}>
          The Core Problem
        </h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The core issue isn’t exactly from each individual complexity being
          imposed in isolation, but rather based on their combined interactions.
          In the previous week, we termed these interactions “multiplicative”
          and the most notable interaction in our case is the severe class
          imbalance. More specifically, we are dealing with a severe case of
          class imbalance in a multi-modal intra-class setting, with overlapping
          boundaries, and this leads to the minority classes being trapped in
          overlap regions shared, or in our case, dominated by the majority
          class examples, rendering them virtually unlearnable through standard
          approaches. With our <InlineMath math={"4"} /> clusters per class
          creating <InlineMath math={"40"} /> sub-learning problems, some
          minority class clusters become especially isolated in overlap zones
          where they are outnumbered by majority class samples in the same
          feature space region, contaminated by label noise, as well as
          signal-deprived where redundant features create false pattern
          confirmation.
        </p>
        <div className={getAllowanceClass()}></div>
        <h1 className={getHeadingClass(1, { responsive: true })}>
          The SMOTE Issue
        </h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Now while class imbalance (in most cases) is mitigated by simply
          over-sampling or under-sampling methods, our case is much more
          complex. Firstly, our classes are severely imbalanced with a 183:1
          ratio coupled with the multi-class exponential complexity factor where
          we are dealing with <InlineMath math={"10"} /> classes. This ratio
          denotes that traditional techniques designed for moderate imbalance
          (typically <InlineMath math={"10:1"} /> or less) break down completely
          when faced with extreme long-tail distributions.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Secondly, there are intra-class clusters within each class,
          specifically <InlineMath math={"4"} /> clusters per class creating{" "}
          <InlineMath math={"40"} /> distinct sub-patterns that must be learned
          independently. Standard SMOTE treat each class as homogeneous, missing
          the critical sub-structure that determines actual learnability.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Standard SMOTE especially fails in this facet for a number of reasons,
          the most notable one being the hybridization of the intra-class
          clusters. SMOTE, by design, generates synthetic samples by linearly
          interpolating between minority class samples, and while in our case it
          seems like the perfect solution, recall that we are dealing with a
          multi-modal scenario, so rather than SMOTE generating homogeneous
          examples per class, it’ll create sort of hybrid examples, ones that
          fall between unrelated clusters within the same class. In this case,
          we’re left with even more redundant and unrelated features, further
          contributing to our feature redundancy issue.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In the light of amplifying redundancy, our current dataset is made up
          of <InlineMath math={"51\\%"} /> redundant features, and SMOTE being
          SMOTE (that blindly interpolates minority class examples) would
          operate on corrupted similarity measures, leading to synthetic sample
          generation based on noise correlations rather than genuine class
          patterns.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Also, in overlap regions where minority classes overlap with majority
          classes, SMOTE generates additional minority samples in areas already
          dominated by majority examples. Rather than improving separability,
          this amplifies decision boundary confusion.
        </p>
        <div className={getAllowanceClass()}></div>
        <h1 className={getHeadingClass(1, { responsive: true })}>
          The Four-Faceted Approach
        </h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          By recognizing these multiplicative complexity interactions, we employ
          a four-staged approach that addresses different aspects of the
          imbalance case across the four distinct and important levels of data,
          training, decision and architecture.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          At the data level, we are focusing on data-level complexity awareness,
          and the problem in this stage is the fact that our dataset is severely
          imbalanced to start with, and naively oversampling the minority class
          would totally ignore the remaining overlap and intra-class cluster
          complexities. Here, we would employ cluster and overlap-aware
          techniques such as FSDR-SMOTE that avoids generating noisy or
          overlapping synthetic samples with the intuition that not all samples
          are equally informative, or Borderline-SMOTE which works on the
          intuition that some minority samples are in “safe zones” (surrounded
          by other minority samples), and interpolating between them is more or
          less redundant given the context of class rarity and imbalance,
          further requiring the need to focus on borderline minority samples
          (ones that are more likely to be misclassified), and ADASYN which
          works on the intuition that not all minority samples are “hard” to
          learn, and adapts the number of synthetic samples generated based on
          the local learning difficulty.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          At the training level, we aim to address the problem that majority
          classes largely dominates the gradient during learning (gradient
          optimization). In this case, we would tweak loss functions to weigh
          minority class errors proportionally to their importance (rarity), and
          to do so, we would apply explicit class weighting, custom cost
          matrices and classifier-specific scale weight optimizations. The need
          for this stage is to ensure that gradient updates are also influenced
          by minority class errors, rather than the dominating majority class
          ones.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          At the decision level, we address the fact that the default{" "}
          <InlineMath math={"0.5"} /> class thresholds optimised for balanced
          data fails severely in our imbalanced case, and we aim to learn
          optimal decision boundaries for imbalanced probability distributions.
          This requires the need for threshold-aware techniques like the{" "}
          <InlineCode>TunedThresholdClassifierCV</InlineCode> that trains a base
          classifier, performs cross-validation to find the best decision
          threshold that optimizes a given scoring metric, and then wraps it
          into a new classifier that uses this tuned threshold at inference
          time, or per-class threshold optimization strategies. The major need
          for this stage is to tackle the overlapping boundary complexity and
          optimize for true business needs given our already calibrated
          probabilities, as opposed to using the arbitrary{" "}
          <InlineMath math={"0.5"} /> threshold.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          At the final level, we address the possible limitations of single
          classifiers being unable to handle the complex imbalance situation,
          and we would bake imbalance-handling directly into the learning
          strategy, by employing specialized ensemble architectures specifically
          designed for imbalanced data. As a heads-up, additional classifiers
          would be introduced to our currentfiltered set of calibrated
          classifiers such as the BalancedRandomForest, and the Self-Paced
          Ensemble.
        </p>
        <div className={getAllowanceClass()}></div>
        <h1 className={getHeadingClass(1, { responsive: true })}>
          Success Criteria
        </h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This experiment aims to target a <InlineMath math={"10-15\\%"} />{" "}
          improvement in macro F1 score while achieving{" "}
          <InlineMath math={"70\\%"} /> recall for minority classes{" "}
          <InlineMath math={"7-9"} />. The F1 metric was chosen as it affirms
          the equal business importance assumption, where minority classes are
          equally or more important than majority classes despite their rarity.
          The macro variant was considered over the weighted one as each class
          would contribute equally to the final score due to the macro averaging
          step regardless of the varying class support, to prevent the dominance
          of majority classes.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The <InlineMath math={"70\\%"} /> recall target for minority classes{" "}
          <InlineMath math={"7-9"} /> referred to per-class recall, as each
          individual class must achieve this threshold, with the reason being
          attributed to individual class accountability. A macro recall could
          average <InlineMath math={"70\\%"} /> while Class{" "}
          <InlineMath math={"9"} /> achieves only <InlineMath math={"20\\%"} />{" "}
          (hidden by better performance in Classes <InlineMath math={"7-8"} />
          ). The per-class specification basically ensures that there’s no class
          left behind in the evaluation stage.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          While the success criteria focused on two key metrics, other
          supplementary ones were considered, and they explored other key facets
          of the calibrated classifiers’ prediction capabilities such as class
          discrimination, global classification quality at any fixed decision
          threshold, and balanced recognition of classes. It is also important
          to note that all accuracy measures were instantly rejected during the
          experiment as they were insufficient and could easily be gamed by the
          dominating majority class.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Given the context of supplementary metrics, the macro PR-AUC metric
          was considered, due to its threshold-independent nature, and the fact
          that no single threshold matters (since we are optimizing thresholds
          at the decision level). Also, we are keen to understand how well the
          experimental classifiers preserve and discriminate between classes,
          especially the minority ones.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The per-class precision was also suggested to complement the primary
          per-class recall success metric. This ensures that while the
          classifiers are being scrutinized for minority class detection
          capabilities, it’s not done by guesswork or systematic bias. In
          simpler terms, the recall score tells us how many actual minority
          instances were correctly identified, while the precision score ensures
          that these detections are credible and not overwhelmed by false
          alarms.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Now while the majority class statistically dominates the minority
          ones, it is very likely that during the course of this experiment,
          we’d be attention-deficit in the facet of the majority classes and
          overly focused on the minority ones. I especially want to avoid
          situations where optimizing for minority class detection isn’t
          achieved at the cost of severely misclassifying majority classes. To
          guard against this, additional supplementary metrics were considered,
          and these are the geometric mean (G-mean) and the Matthew’s
          Correlation Coefficient (MCC). These metrics explicitly balance
          performance across classes: G-Mean by capturing the trade-off between
          sensitivity and specificity, and MCC by summarizing all confusion
          matrix quadrants into a single, robust correlation measure. Together,
          they both ensure that gains in minority detection are not misleadingly
          achieved by degrading overall balance and majority class recognition.
        </p>
        <div className={getAllowanceClass()}></div>
        <h1 className={getHeadingClass(1, { responsive: true })}>
          Experimental Strategy
        </h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Data Level Complexity Reduction
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Baseline Implementation
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          With the basis of making data-level improvements at this initial
          stage, our core philosophy is to fix the data before training, as
          garbage in, garbage out. To this effect, we would establish a baseline
          + a basic resampling procedure where we train our calibrated
          classifiers on the original imbalanced data, perform a fairly simple
          baseline minority interpolation using a random oversampling procedure,
          which would then serve as our simple duplication baseline technique.
          We would then observe the predicted failure modes and evaluate
          data-level improvements (or drop as the case may be). As part of the
          expected outcomes, we could see cluster hybridization unfold at this
          stage.
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Advanced Implementation
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Given that this forms our baseline, we would then move up to more
          context-aware sampling procedures that focus on key parts of the
          issue, such as Vanilla SMOTE with varying <InlineMath math={"k"} />{" "}
          neighbors, BorderlineSMOTE, FSDR-SMOTE, ADASYN, and Safe-Level SMOTE,
          and then select the best resampling approach per classifier. Here, the
          expected outcome is to end up with better training distributions, ones
          that essentially level the playing field in terms of strata
          distribution for subsequent stages, and also giving the classifiers
          the best possible training signal in regions that particularly matter
          the most.
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Evaluation Framework
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Distribution Quality Metrics
        </h2>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Sample Distribution Analysis
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Originally, our dataset indicates a <InlineMath math={"183:1"} />{" "}
          imbalance ratio, with the majority classes severely (and unfairly)
          dominating over the minority ones, and while random oversampling ticks
          all the boxes of arriving at a perfect numerical balance of say a
          perfect <InlineMath math={"50:50"} /> ratio (
          <InlineMath math={"183:183"} /> in our case), we are more concerned
          about ratio stability, and this cascades down to the experimental
          splits like the training and test sets. If for any reason we end up
          with a <InlineMath math={"183:180"} /> ratio, it means our techniques
          (not just the baseline one) are conservative, and if we end up with
          say a <InlineMath math={"183:200"} /> ratio, then they are
          “over-eager”. We essentially want to make sure that either of these
          cases are not occurring in the splits.
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Class Entropy
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Entropy (given the context of class representativeness) measures how
          much information you gain when you learn which class a certain sample
          belongs to. It is more or less a measure of the “surprise factor”, and
          the extent of information gain is dependent on the expectation of the
          randomly picked class. So a high entropy (or high information gain) is
          indicated by high unpredictability, while a low entropy (low
          information gain) is indicated by high predictability. It is
          mathematically defined as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\mathbb{H}(\\hat{p}) = - \\sum_{k=1}^{K} \\hat{p}_k \\log(\\hat{p}_k)"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math={"\\mathbb{H}"} /> is Shannon Entropy and{" "}
          <InlineMath math={"\\hat{p}_k"} /> is the probability of class{" "}
          <InlineMath math={"k"} />. Given our dataset, the total Shannon
          entropy is given as <InlineMath math={"2.049592"} />, and the maximum
          entropy (for a uniform distribution where each class’s probability is{" "}
          <InlineMath math={"0.1"} />
          ), is given as <InlineMath math={"3.321928"} />. The entropy
          efficiency would then be <InlineMath math={"0.6170"} />.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This further indicates that our dataset is{" "}
          <InlineMath math={"61.70\\%"} /> efficient in giving the full
          information, and learning a sample’s class gives you a somewhat
          moderate information (not bad but not perfect either), as the dominant
          Class <InlineMath math={"0"} /> reduces the surprise factor. Still,
          there’s a potential room for improvement of about{" "}
          <InlineMath math={"1.272"} /> points, and our aim is a gentle increase
          from <InlineMath math={"2.05"} /> to <InlineMath math={"3.32"} />, as
          we want to ensure that the resampling method successfully addresses
          the extreme tail classes.
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Gini Impurity
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Gini Impurity on the other hand measures the probability of a mistake,
          rather than a surprise. It tells us the probability that you’ll make a
          mistake if you randomly guessed a sample’s class based on the overall
          distribution. So a low gini impurity indicates a low error rate, as
          you’d mostly get one single answer in potentially numerous guess, and
          a high gini impurity highlights a high error rate, further indicating
          many possible answers. Lowkey, it gives us the same information as
          entropy (the extent of randomness), but while entropy affirms sample
          presence in a given class (information quality), gini impurity ensures
          that the chosen sample is well mixed (mixing quality). It is
          mathematically explained as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={"\\mathbb{G}(\\hat{p}) = 1 - \\sum_{k=1}^{K} \\hat{p}_k^2"}
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math={"\\mathbb{G}"} /> is Gini Impurity and{" "}
          <InlineMath math={"\\hat{p}_k"} /> is the probability of class{" "}
          <InlineMath math={"k"} />. Our dataset shows a total gini impurity of{" "}
          <InlineMath math={"0.643558"} />, and the maximum possible gini
          impurity (assuming a uniform distribution) is{" "}
          <InlineMath math={"0.9"} />. So the gini impurity efficiency is then{" "}
          <InlineMath math={"0.7151"} />.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This further indicates that the current distribution has a mixing
          efficiency of about <InlineMath math={"71.51\\%"} />, highlighting a
          moderate mixing potential, as you’d be{" "}
          <InlineMath math={"71.51\\%"} /> error-prone if you randomly selected
          a sample (with a guessed reference in mind). Although, there’s a
          potential room for improvement of about <InlineMath math={"0.256"} />{" "}
          points to achieve true mixing efficiency, as we want our resampling
          technique to not just create samples in underrepresented classes, but
          they should be realistic patterns.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Red flags to watch out when using both metrics is that entropy
          shouldn’t spike while gini impurity stalls or vice versa, and both of
          them shouldn’t plateau early as this indicates that the current
          resampling technique is possibly insufficient for the extreme class
          ratios.
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Synthetic Sample Quality Metrics
        </h2>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Distance to Real Samples
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Cluster Preservation
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Cluster preservation assesses whether synthetically generated samples
          keep their original cluster geometry and local statistics in
          accordance with the original structure of the true data. Currently, we
          have <InlineMath math={"40"} /> natural neighbourhoods, and we want to
          ensure that our resampling methods fill holes inside those
          neighbourhoods, not create fake high-density ones or merge separate
          neighbourhoods together. To this effect, we want to assess how much
          the cluster moves, to what extent the cluster shape itself changes,
          how much the internal spread is preserved, how well different clusters
          are separated from each other, how much clusters may change their
          identity (from cluster <InlineMath math={"1"} /> to{" "}
          <InlineMath math={"3"} /> after resampling), if different clusters
          merged into a composite one and if artificially dense ones were
          created.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For interpretability, we’d refer to the original dataset in
          superscripts as “real” and the synthetically generated samples + the
          original samples as “syn”.
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Centroid Shift
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For each class <InlineMath math={"c"} /> and cluster{" "}
          <InlineMath math={"k_c"} />, we’d compute the centroid shift, which is
          a measure of how much the cluster centre moves, mathematically defined
          as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\Delta\\mu_{c,k} = \\|\\mu_{c,k}^{\\text{real}} - \\mu_{c,k}^{\\text{syn}}\\|_2"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math={"\\mu^{\\text{real}}"} /> is the mean of real
          points and <InlineMath math={"\\mu^{\\text{syn}}"} /> is the mean
          after adding synthetic samples.{" "}
          <InlineMath math={"\\Delta\\mu_{c,k}"} /> indicates the distance
          between real vs synthetic samples, and larger distances denote larger
          centroid shifts which is an unfavorable deviation, compromising
          cluster preservation, as we want to end up with well preserved
          clusters.
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Covariance Change
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          We’d also compute the covariance change which is essentially a measure
          of how much the cluster shape changes before and after resampling. For
          context, the covariance of the cluster is a measure of how spread out
          the data points are in different directions, and more importantly, how
          those directions relate to one another. In much simpler terms, this
          essentially means the shape of the cluster. Usually, we’d implement a
          divergence measure and the choice in this case would be the LogDet. It
          is perfect for our use case as it respects the geometry of the
          covariance matrices (cluster shapes, as they are mostly spherical with
          elongated orientations), stable in high dimensions (45D in our case),
          and fair to both small and large clusters. Mathematically, the LogDet
          divergence is explained by:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{tr}(\\Sigma^{\\text{real}} (\\Sigma^{\\text{syn}})^{-1}\\big) - \\text{logdet}(\\Sigma^{\\text{real}} (\\Sigma^{\\text{syn}})^{-1}\\big) - d"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math={"\\Sigma^{\\text{real}}"} /> and{" "}
          <InlineMath math={"\\Sigma^{\\text{syn}}"} /> are the covariance
          matrices of the original and resampled cluster ellipsoids
          respectively, and <InlineMath math={"d"} /> refers to the number of
          dimensions. Lower values indicate smaller covariance changes,
          indicating that the cluster ellipsoids didn’t warp that much, which in
          our case is mostly desirable.
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Intra-Cluster Distance Change
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In addition to the covariance change, we’d also assess the
          intra-cluster distance change. This makes sure that the internal
          spread of points within the cluster remains consistent (even after
          resampling). This is to preserve the intra-cluster integrity and
          enforce cluster preservation by making sure that points aren’t too
          spread out and aren’t too compacted as well. We can measure this
          characteristic by computing the relative distance between real and
          synthetic points as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\Delta d_{c,k}^{\\text{intra}} = \\frac{d_{c,k}^{\\text{intra, syn}} - d_{c,k}^{\\text{intra, real}}}{d_{c,k}^{\\text{intra, real}}}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math={"d_{c,k}^{\\text{intra, real}}"} /> is the
          average intra-cluster distance before resampling, given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "d_{c,k}^{\\text{intra, real}} = \\frac{1}{N_{c,k}^{\\text{real}}} \\sum_{i=1}^{N_{c,k}^{\\text{real}}} \\|\\mathbf{x}i - \\mu{c,k}^{\\text{real}}\\|_2"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          And <InlineMath math={"d_{c,k}^{\\text{intra, syn}}"} /> is the
          average intra-cluster distance, which is the same expression above,
          but after resampling.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Values near <InlineMath math={"0"} /> indicate that the spread is
          preserved. Large negative values mean the points are collapsing into
          dense smaller clusters, and large positive ones mean the synthetic
          points are diffusing outwards.
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Inter-Cluster Gap Preservation
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This ensures that while points are well represented within clusters,
          the clusters themselves are well separated (and distinguishable) from
          each other. It also prevents cases where clusters merge into a
          composite one, or samples overlap each other, making predictions more
          difficult.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For each cluster pair <InlineMath math={"(k, k_i)"} /> within the same
          class <InlineMath math={"c"} />, we’d compute the centroid-to-centroid
          distance between each cluster in the pair, where for the clusters with
          real samples:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "g_{c,k,k’}^{\\text{real}} = \\|\\mu_{c,k}^{\\text{real}} - \\mu_{c,k’}^{\\text{real}}\\|_2"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          And for the clusters with real + synthetic samples:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "g_{c,k,k’}^{\\text{syn}} = \\|\\mu_{c,k}^{\\text{syn}} - \\mu_{c,k’}^{\\text{syn}}\\|_2"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Then the relative gap change is computed by:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\Delta g_{c,k,k’} = \\frac{g_{c,k,k’}^{\\text{syn}} - g_{c,k,k’}^{\\text{real}}}{g_{c,k,k’}^{\\text{real}}}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Negative large values indicate that the clusters are moving towards
          each other, further indicating a merging risk.
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Cluster Purity
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          While we’ve established a number of geometric checks, a subtle but
          systematic detail that our assessments might miss out on is in label
          contamination, even within clusters. In this context, we want to
          ensure that after resampling, the samples within each neighborhood are
          semantically preserved, that is, they are not accidentally in the
          wrong class, even though they may look geometrically accurate and seem
          to be in the right neighborhood. So the purity of a cluster in this
          case, is the fraction of points that belong to the majority class, and
          it is mathematically explained as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={"\\text{p}_{c,k} = \\frac{1}{N_A} \\max_j |A \\cap B_j|"}
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math={"\\text{p}_{c,k}"} /> is the purity of cluster{" "}
          <InlineMath math={"k"} /> within class <InlineMath math={"c"} />,{" "}
          <InlineMath math={"A"} /> is the set of samples that belong to a
          particular cluster, <InlineMath math={"B_j"} /> is the set of samples
          belonging to class <InlineMath math={"j"} /> (and since we are dealing
          with <InlineMath math={"10"} /> classes, then{" "}
          <InlineMath math={"j \\in {0,\\cdots,9}"} />
          ), and <InlineMath math={"N_A"} /> is the total number of samples in
          the cluster of context. The main intuition is to look across all
          classes and pick the largest overlap, which is essentially the
          majority class in the given cluster. If the purity of a given cluster
          is closer to <InlineMath math={"0"} /> than it is to{" "}
          <InlineMath math={"1"} />, then it is an indication of label
          contamination, further denoting the synthetically generated samples
          are in the wrong neighborhoods.
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Cluster Merge Ratio
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The cluster merge ratio or discrete merge indicator counts how many
          originally distinct clusters for class <InlineMath math={"c"} /> are
          indistinguishable after resampling. In a more practical sense, if we
          counted how many clusters existed per class before and after
          resampling, and there’s a drop, it means a merge has happened. It is
          mathematically defined as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{CMR}_c = 1 - \\frac{K_c^{\\text{syn}}}{K_c^{\\text{real}}}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math={"K_c^{\\text{real}}"} /> indicates the number
          of clusters you started with for class <InlineMath math={"c"} />, and{" "}
          <InlineMath math={"K_c^{\\text{syn}}"} /> denotes the number of
          distinct clusters that survived separation after oversampling. The
          main intuition is that if all clusters remain distinct and
          distinguishable, then:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "K_c^{\\text{syn}} = K_c^{\\text{real}} \\quad \\text{CMR}_c = 0"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          If two clusters merged into one, then:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "K_c^{\\text{syn}} < K_c^{\\text{real}} \\quad \\text{CMR}_c > 0"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          If everything collapses into a single mass, then:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={"\\text{CMR}_c = 1 - \\frac{1}{K_c^{\\text{real}}}"}
          />
        </div>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Dimensional Adequacy Metrics
        </h2>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Samples Per Cluster
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Samples Per Dimension
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Cluster Preservation Score (CPS)
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Now, the main goal is to end up with a near-perfect cluster
          preservation, and if we were to put it in numerical terms, then we
          should be aiming to attain a score close to <InlineMath math={"1"} />{" "}
          (indicating perfect preservation). Deviations from this composite
          metric, which are the sub-scores explained above should reduce the
          score gradually, so in this case, we are sort of penalizing bad
          behavior at every step (if any). To this effect, we’d transform each
          sub-score (let’s call them <InlineMath math={"S_i"} />) into a
          penalty-transformed metric, so if a cluster is well preserved, then
          the penalty is small and <InlineMath math={"S_i"} /> should plateau to
          <InlineMath math={"1"} />, otherwise, it should decay towards{" "}
          <InlineMath math={"0"} /> when the penalty is larger and the cluster
          is distorted in some way.
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Centroid Shift Penalty
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Currently, we are dealing with unbounded (and possibly unscaled)
          distances between real vs synthetic cluster centroids, as explained
          by:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\Delta\\mu_{c,k} = \\|\\mu_{c,k}^{\\text{real}} - \\mu_{c,k}^{\\text{syn}}\\|_2"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          We want to understand by how much did the centroid move, and duly
          penalize it if it significantly did, so the centroid shift penalty{" "}
          <InlineMath math={"S_1"} /> would then be:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"S_1 = \\exp(-\\alpha \\Delta \\mu_{c,k})"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math={"\\Delta \\mu_{c,k}"} /> is the distance
          between real vs synthetic cluster centroids measured using the
          Euclidean norm, and <InlineMath math={"\\alpha"} /> is the scaling
          parameter, which controls how harshly centroid shifts are penalized.
          The exponential terms serves two major functions: acts as a decay term
          that stringently penalizes large shifts, so the score drops faster to
          zero in such cases, and a bounding term that transforms the unbounded
          distance into a value between <InlineMath math={"0"} /> and{" "}
          <InlineMath math={"1"} />.
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Covariance Penalty
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Now we are focused on covariance preservation, more simply, the shape,
          orientation and elongation of our clusters after resampling. If
          covariance changes drastically, it is an indication of significant
          cluster geometry distortion, so <InlineMath math={"S_2"} /> in this
          case penalizes covariance drift between real vs. resampled clusters.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To recap, we are dealing with a divergence (distance) measure between
          the two covariance matrices (before and after resampling) explained
          as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "D_{\\Sigma} = D(\\Sigma^{\\text{real}}{c,k}, \\Sigma^{\\text{post}}{c,k})"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          And we opted for the LogDet divergence which was a softer and
          scale-aware choice. The penalty function would then be:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"S_2 = \\exp(-\\beta D_{\\Sigma})"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math={"\\beta"} /> is the scaling parameter (similar
          to the role of <InlineMath math={"\\alpha"} /> in the centroid shift).
          If <InlineMath math={"D_{\\Sigma} = 0"} />, then we are dealing with a
          perfectly preserved covariance, and <InlineMath math={"S_2"} /> would
          then be <InlineMath math={"1"} />, indicating a perfect cluster
          preservation.
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Intra-Cluster Distance Change Penalty
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Here, we are focusing on the natural spread of samples in a cluster,
          and penalizing too much spread or too little spread, that is, if the
          cluster’s radius (average distance of points to centroid) change much.
          The penalty <InlineMath math={"S_3"} /> is explained by:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "S_3 = \\max \\{0,\\, 1 - |\\Delta d_{c,k}^{\\text{intra}}|\\}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Unlike centroid and covariance penalties, this one isn’t exponential,
          but linear. This is because spread changes are less catastrophic and
          more tolerable. The clamp at <InlineMath math={"0"} /> ensures that we
          don’t assign negative values to extreme spread changes, so{" "}
          <InlineMath math={"1"} /> indicates perfect preservation and{" "}
          <InlineMath math={"0"} /> indicates that the cluster completely
          collapses on itself.
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Inter-Cluster Gap Preservation Penalty
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Given the established fact that each class has multiple clusters, the
          natural gaps between them are what keeps the clusters defined and
          intact. In this case, we want to end up with wider separations, and
          thus, the penalty per gap would be in context of the relative gap
          change given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={"s_{c,k,k’} = \\max\\{0,\\, 1 - |\\Delta g_{c,k,k’}|\\}"}
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Since we are dealing with a pairwise comparison, we’d take the
          worst-case gap preservation across all clusters k’ in the same class,
          leading to the penalty:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"S_4 = \\min_{k’ \\neq k} s_{c,k,k’}"} />
        </div>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Cluster Purity Penalty
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This serves as a check against class leakage into clusters, and it
          measures how much a cluster is “owned” by its true class after
          resampling, as a cluster that was originally “pure” (only members of
          its class) might now get contaminated by synthetic points belonging to
          another class. The cluster purity penalty <InlineMath math={"S_5"} />{" "}
          is represented as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"S_5 = \\frac{1}{N_A} \\max_j |A \\cap B_j|"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This returns a score between <InlineMath math={"0"} /> and{" "}
          <InlineMath math={"1"} /> and if the synthetic cluster is mostly
          composed of the same class as the real one, it’d edge closer to{" "}
          <InlineMath math={"1"} /> indicating high purity, and if it is
          noisy/mixed, it’ll drop closer to <InlineMath math={"0"} /> indicating
          low purity.
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Cluster Merge Ratio Penalty
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This rewards clusters that don’t merge or split too heavily, with an
          according score of <InlineMath math={"1"} />. If synthetic clusters
          merge too aggressively (many-to-one), then CMR grows, and the penalty
          reduces the total score. The penalty <InlineMath math={"S_6"} /> is
          defined by:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"S_6 = \\max\\{0,\\,1 - \\text{CMR}_{c,k}\\}"} />
        </div>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Weighted Composite CPS by Cluster
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Given all the highlighted sub-scores, we’d aggregate them into a
          single interpretable score between <InlineMath math={"0"} /> and{" "}
          <InlineMath math={"1"} /> as the weighted sum of all penalties,
          computed per cluster <InlineMath math={"(c,k)"} /> given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{CPS}_{c,k} = \\sum{i=1}^{6} w_i S_i, \\quad w_i \\ge 0, \\quad \\sum_i w_i = 1"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Or simply,
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{CPS}_{c,k} = w_1 S_1 + w_2 S_2 + w_3 S_3 + w_4 S_4 + w_5 S_5 + w_6 S_6"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          On the weight allocation strategy, we’d adopt an identity-first
          philosophy and allocate less (non-zero) weights to penalties that
          attest to cluster geometric fidelity. This is based on the fact that
          small changes in cluster geometry often don’t break classifier logic,
          especially if cluster identity remains intact. More importantly, label
          correctness inside local neighborhoods usually matters more than exact
          shapes, as models learn boundaries rather that geometry (form),
          further meaning that if labels are wrong in neighborhoods, performance
          collapses (an effect of semantic errors). Also, we weigh cluster merge
          ratio as importantly, as merging clusters could destroy the
          granularity of the manifold (which can be especially bad for
          multi-modal minority classes like in our case).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Here, cluster identity is attributed to the purity, CMR, and gap
          preservation sub-scores (as gap shrinkage often precedes merges and
          label leakage, so it’s an early warning). Thus, the level of
          importance we’d attribute to the sub-scores is:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"S_5 > S_6 > S_4 > S_3 > S_1 > S_2"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Given that we are assessing cluster-level CPS, a score{" "}
          <InlineMath math={"\\geq 0.75"} /> is acceptable, a score between{" "}
          <InlineMath math={"0.6"} /> and <InlineMath math={"0.75"} /> is an
          early warning sign for caution, and a score below{" "}
          <InlineMath math={"0.6"} /> indicates possible cluster collapse.
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Weighted Composite CPS by Class
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Here, we compute a weighted summary per class, showing how well its
          overall structure was preserved given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{CPS}_{c} = \\frac{\\sum{k} n_{c,k}\\text{CPS}_{c,k}}{\\sum{k} n_{c,k}}"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math={"n_{c,k}"} /> is the size of the cluster.
          Computing this score would be done after the CPS per clusters have
          been evaluated.
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Baseline Implementation
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          With good data established, we would then optimize how the calibrated
          classifiers learn from it. Basically, we want them to care more about
          the minority classes, given the already existing statistical dominance
          of the majority ones. To this effect, we would adopt the same baseline
          approach, more specifically baseline + built-in CSL techniques.
          Typical built-in CSL techniques we would adopt are Class Weight
          Balancing (<InlineCode>class_weight=“balanced”</InlineCode>) across
          applicable classifiers, XGBoost’s Scale Pos Weight (by{" "}
          <InlineCode>scale_pos_weight</InlineCode> optimization) and LightGBM’s
          native <InlineCode>is_unbalanced=True</InlineCode> parameter. As an
          initial baseline evaluation, we would then measure possible
          training-level gains or losses.
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Advanced Implementation
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Evaluation Framework
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Decision Level Threshold Optimization
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Baseline Implementation
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Advanced Implementation
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Evaluation Framework
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Architecture Level Augmentation
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Baseline Implementation
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Advanced Implementation
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Evaluation Framework
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>

        <h3 className={getHeadingClass(3, { responsive: true })}>Macro F1</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Weighted F1
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Macro Precision
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Macro Recall
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Per-Class Performance Assessment
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Class Imbalance Assessment
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Geometric Mean
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Matthews Correlation Coefficient (MCC)
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Macro AUC-ROC
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Macro PR-AUC
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h1 className={getHeadingClass(1, { responsive: true })}>
          Imbalance Complexity Assessment
        </h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Dataset Analysis
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Imbalance Ratio
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Gini Coefficient
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Class Entropy
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Samples Per Class
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Samples Per Dimension
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Samples Per Cluster
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Problem Severity
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h2 className={getHeadingClass(2, { responsive: true })}>
          Failure Modes
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Majority Bias Classes
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Confused Class Pairs
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
        <h3 className={getHeadingClass(3, { responsive: true })}>
          Ignored Classes
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass()}></div>
      </section>
    </>
  ),
};

export default function Week23Page() {
  return <RecapContent content={recap.content()} />;
}

export const recapMetadata = recap.metadata;

export const metadata = {
  title: recap.metadata.title,
  description: recap.metadata.description,

  alternates: {
    canonical: `/learning/recap/week-${recap.metadata.weekNumber}`,
  },

  openGraph: {
    title: recap.metadata.title,
    description: recap.metadata.description,
    url: `https://obukofejoseph.com/learning/recap/week-${recap.metadata.weekNumber}`,
    siteName: "Obukofe Joseph",
    locale: "en_US",
    type: "article",
    images: [
      {
        url: "/images/thumbnails/23.png",
        width: 1200,
        height: 630,
        alt: "Week 23 Recap",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: recap.metadata.title,
    description: recap.metadata.description,
    creator: "@obukofejoe",
    images: [
      {
        url: "/images/thumbnails/23.png",
        width: 1200,
        height: 630,
        alt: "Week 23 Recap",
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
      name: "Week 23 Recap",
      description: "Imbalance Learning",
      url: `https://obukofejoseph.com/learning/recap/week-${recap.metadata.weekNumber}`,
      author: {
        "@type": "Person",
        name: "Obukofe Joseph",
        alternateName: "Obukofe Joe",
        url: "https://obukofejoseph.com",
        image: "https://obukofejoseph.com/images/thumbnails/23.png",
        sameAs: ["https://twitter.com/obukofejoe"],
      },
    }),
  },
};
