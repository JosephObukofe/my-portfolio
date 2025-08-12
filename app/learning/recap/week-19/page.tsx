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
    weekNumber: 19,
    title: "Week 19",
    date: "2025-05-11",
    description: "...",
    focusAreas: ["ML"],
    status: "Ongoing",
    thumbnail: "/public/images/thumbnails/19.png",
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
          week={19}
          date="May 5 – May 11"
          status="Ongoing"
          description="...."
          focusAreas={["..."]}
          resources={[
            { label: "...", url: "https://dvc.org/doc" },
            { label: "...", url: "https://doc.rust-lang.org/book/" },
          ]}
        />
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Absolutely crunched it this week. Went full throttle into decoding
          multi-class model evaluation strategies, multi-class evaluation
          optimization with binarizers, interpretations of the AUC-ROC score in
          binary, multi-class and multi-label contexts. While at it, I threw in
          a quick refresher into linear and non-linear models.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Also, zero uni pressure this week, so I've officially kicked off my
          Rust learning journey which I am absolutely stoked about.
        </p>
        <hr className="my-6 border-t border-neutral-200 dark:border-neutral-800" />
        <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          Multi-Output Classification
        </h2>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          As opposed to binary and multi-class classifications that predicts a
          single output for every instance <InlineMath>(y_i) </InlineMath>, in
          the case of a multi-output classification, for every instance{" "}
          <InlineMath>(x_1)</InlineMath>, the classifier predicts multiple
          outputs <InlineMath>(y_1, y_2,…y_n)</InlineMath> stacked into a single
          target matrix <InlineMath>y</InlineMath> (for{" "}
          <InlineMath>n</InlineMath> number of outputs), and each output
          (column) could be a binary or a multi-class label.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Meta estimators used for multi-output classification tasks like the{" "}
          <InlineCode>MultiOutputClassifier</InlineCode> wraps around a base
          classifier that is capable of handling multi-class, either natively
          (out of the box) or augmented using multi-class strategies like the
          OvR (One vs Rest) and multinomial softmax. Under the hood, these
          meta-estimators essentially clone the base classifier for each output,
          creating a separate model per target column.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Model evaluations follow suit per associated pair of feature{" "}
          <InlineMath>\rightarrow</InlineMath> target, so metrics like support,
          accuracy and precision are evaluated for each label independently and
          then averaged across classes. This structure helps capture the
          multi-dimensional nature of the problem, providing more granular
          insights into model performance.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Given the aim of the task, to make the synthetically generated dataset
          (being a key to properly understanding how multi-class and
          multi-output classifications work), more robust and effectively mirror
          real-world scenarios, I prioritized a larger class diversity (to
          better capture the multi-class nature of the task), increased data
          complexity, by adjusting the <InlineCode>n_informative</InlineCode>{" "}
          and <InlineCode>n_redundant</InlineCode> parameters to include a mix
          of both noisy and informative features, but with a larger
          noise-to-signal ratio. I also accounted for naturally occurring
          inter-class clusters/subgroups, as real-world data often has
          irregular, overlapping, and non-linear decision boundaries. This was
          achieved by tuning <InlineCode>n_clusters_per_class</InlineCode> to
          spread samples from a given class across multiple{" "}
          <InlineMath>(n)</InlineMath> clusters, and tightened the class
          separation to make the classes more intertwined and less separable by
          reducing <InlineCode>class_sep</InlineCode>.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Additionally, I balanced the class weights to reduce skew, forcing the
          resulting classifiers to learn about the minority classes more
          effectively.
        </p>
        <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          Label Binarization
        </h3>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          I initially found it odd that Random Forest classifiers don't strictly
          follow the feature and target matrix specification rule of 2D{" "}
          <InlineMath>\rightarrow</InlineMath>{" "}
          <InlineCode>rows, columns</InlineCode> and 1D{" "}
          <InlineMath>\rightarrow</InlineMath> <InlineCode>rows,</InlineCode> -
          defined as a column vector. Asides from optimizing the model
          evaluation step by using binary matrices (see{" "}
          <UnderlineLink href="https://obukofejoey.notion.site/Binary-Matrix-1ef77c2a6513806bbd96e02bbdd98ba8?pvs=4">
            Binary Matrix
          </UnderlineLink>{" "}
          and{" "}
          <UnderlineLink href="https://gist.github.com/JosephObukofe/d16839d7c4dcd5dc2deed2107060b94f">
            Label Binarization
          </UnderlineLink>
          ) to represent the different classes in a multi-class setup, I tested
          using these sparse binary matrices directly as a training component.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          For some reason and understandably, Random Forest treated it as a
          multi-label classification setup and in such case, it essentially
          trained a separate tree (or an ensemble) classifier for each column
          (label) in the defined binary matrix, and then each tree tried to
          predict the presence <InlineMath>(1)</InlineMath> or absence{" "}
          <InlineMath>(0)</InlineMath> of the given characteristic/feature
          represented by the matrix.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Given this approach to multi-label classification, it is important to
          consider how evaluation metrics like the AUC-ROC score handles this
          structure
        </p>
        <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          AUC-ROC Score Attribute Specifications
        </h3>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          This approach (for a multi-class classification problem) is somewhat
          analogous to the OvR strategy, and since Random Forest in this case is
          already acting like a collection of independent binary classifiers,
          the <InlineCode>roc_auc_score</InlineCode> function didn't need to
          explicitly know it was handling a multiclass problem, because it just
          treated each column as a separate binary problem (which is the case in
          the current context). So the <InlineCode>multi_class</InlineCode>{" "}
          attribute wasn't explicitly set as <InlineCode>"ovr"</InlineCode>.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          However, it is important to note that this only applies if the Random
          Forest classifier is dealing with <InlineMath>y</InlineMath> as a 2D
          binary array, otherwise if <InlineMath>y</InlineMath> is a 1D array
          (like most target variables in classification problems),{" "}
          <InlineCode>roc_auc_score</InlineCode> requires to specify a{" "}
          <InlineCode>multi_class</InlineCode> strategy.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Also by default (in both cases of a multi-class and multi-label
          situations), the <InlineCode>roc_auc_score</InlineCode> functions
          assumes a macro-averaging strategy, so basically the AUC is calculated
          for each label (column in our case) independently and then averaged
          across classes (as an unweighted mean).
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          The need for the macro-averaging strategy was to serve as sort of a
          pass-through: assigning equal weights to each class to prevent strata
          dominance (the majority class overpowering the minority ones) and to
          simply focus more on the ranking abilities of different models in a
          multi-class setting.
        </p>
        <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          Predicted Probabilities vs Predicted Classes
        </h3>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          I also noticed that the <InlineCode>roc_auc_score</InlineCode>{" "}
          function can work with both predicted probabilities and predicted
          classes. However, for a more fine-grained comparison, it's generally
          better to stick with <InlineCode>predict_proba</InlineCode>, as it
          retains the ranking information critical for calculating AUC. Using
          the raw predicted classes discards this ranking, potentially
          underestimating model performance.
        </p>
        <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          Logistic Regression vs Random Forest (Decision Boundary Visualization)
        </h3>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          In order to visualize a high-dimensional feature space projected down
          to 2D (in our case), I implemented PCA for dimensionality reduction -
          a technique that squishes a high-dimensional space to a lower one,
          while still retaining the most variance. The aim of this was to show
          the decision regions for each classifier, as well as to highlight
          overlaps at where the classifier's may be struggling. See full code{" "}
          <ArrowLink
            href="https://gist.github.com/JosephObukofe/69c9c67a61f2ae3b859ae7520747d633"
            target="_blank"
          >
            here
          </ArrowLink>
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Given our use of both linear and non-linear models,{" "}
          <InlineCode>LogisticRegression</InlineCode> and{" "}
          <InlineCode>RandomForestClassifier</InlineCode> respectively, the
          decision boundaries of both classifiers tends to differ significantly
          in shape and complexity, with the{" "}
          <InlineCode>RandomForestClassifier</InlineCode> showing jagged and an
          almost pixelated boundary, suggesting possible overfitting. This was
          because of it's unpruned nature as it was plainly initialized without
          any tuned hyperparameter. It also showed small isolated "islands" of a
          minority class, as opposed to the absence of this with the{" "}
          <InlineCode>LogisticRegression</InlineCode> classifier.
        </p>
        <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          Logistic Regression vs Random Forest (Multi-Class AUC-ROC Score)
        </h3>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Expectedly, Random Forest tends to rank better out of the box because
          of its ensemble nature, which allows it to capture more complex
          decision boundaries compared to the linear decision surface of
          Logistic Regression. However, this comes at the cost of
          interpretability and potential overfitting issues, which makes it a
          trade-off depending on the use case. See full code{" "}
          <ArrowLink
            href="https://gist.github.com/JosephObukofe/faaf8fefd6e6edb26ffd0a91a86c3b7f"
            target="_blank"
          >
            here
          </ArrowLink>
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          A noticeable drop from the macro to the weighted AUC-ROC score popped
          up, which may be a likely side effect of class imbalance. Further
          investigations would need to be conducted to better assess the cause
          of it.
        </p>
        <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          Logistic Regression vs Random Forest (Per-Class AUC-ROC Score)
        </h3>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Like most evaluation metrics that are naturally suited for binary
          classification, the AUC-ROC score measures how well a model ranks
          positive instances above negative ones. However, in our case, we've
          taken a more complex approach by calculating a weighted AUC-ROC score
          across multiple classes in our multi-class setup, which can obscure
          the performance of individual classes. For a start, strata imbalance
          was hypothesized to be the leading cause of the lower
          (weighted-averaged) overall score, but without more context, it's hard
          to pinpoint the exact culprit.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          To dig deeper, we can evaluate the per-class AUC-ROC, which allows us
          to identify which specific classes are dragging down the overall
          score. This was particularly important because a single
          underperforming rare class can disproportionately affect the entire
          weighted average behind the scenes. To this effect, the target{" "}
          <InlineMath>y</InlineMath> was binarized into a matrix of{" "}
          <InlineMath>n</InlineMath> columns for <InlineMath>n</InlineMath>{" "}
          number of classes, and then the AUC score was calculated for each
          class{" "}
          <ArrowLink
            href="https://gist.github.com/JosephObukofe/965dee4039b9c478dcfa9893d2fe5d53"
            target="_blank"
          >
            here
          </ArrowLink>
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          In the code above, I needed to replicate the multi-label handling
          approach typically used by{" "}
          <InlineCode>RandomForestClassifier</InlineCode> in multi-class
          settings. I did this by wrapping{" "}
          <InlineCode>LogisticRegression</InlineCode> in a{" "}
          <InlineCode>MultiOutputClassifier</InlineCode>, essentially forcing it
          into a per-class, binary-esque setup where each column is treated as a
          separate binary target (<InlineMath>1</InlineMath> for presence,{" "}
          <InlineMath>0</InlineMath> for absence). This way, the{" "}
          <InlineCode>roc_auc_score</InlineCode> function could be applied
          independently to each class, providing a more granular view of model
          performance.
        </p>
        <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          Linear vs Non-Linear Models
        </h3>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          As a refresher, I dialed back to the foundational forms of machine
          learning algorithms. I needed to understand the nuances of the
          distinctions at a much lower level, especially when honing in on
          models across the requirements of training speed, complexity,
          interpretability, overfitting risks and scalability.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Linear models basically assume that the relationship with the
          dependent and independent variables is represented as a straight line
          or a hyperplane in a higher dimension. So basically linear models make
          predictions by computing a weighted sum of the inputs plus a bias term
          that allows the model to shift the decision boundary away from the
          origin, providing better flexibility in fitting the data given as:
        </p>
        <BlockMath math={"y = w_1 x_1 + w_2 x_2 + \\cdots + w_n x_n + b"} />
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Where <InlineMath>w_i</InlineMath> are the weights,{" "}
          <InlineMath>x_i</InlineMath> are the inputs, and{" "}
          <InlineMath>b</InlineMath> is the bias term. See{" "}
          <ArrowLink
            href="https://obukofejoey.notion.site/Weights-1e377c2a651380538be0fabb9d9b58d9?pvs=4"
            target="_blank"
          >
            Weights
          </ArrowLink>{" "}
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          The decision boundary is a straight line, so it captures only linear
          relationship, thus it is super fast to train, less prone to
          overfitting (may severely underfit in other use cases), and easy to
          scale and interpret (as the relationship is a linear representation).
          Typical examples of linear models are Linear Regression, Logistic
          Regression (for binary classification{" "}
          <InlineMath>\rightarrow</InlineMath> which is basically a linear
          regression with a sigmoid activation for returning probabilistic
          values) and SVMs with a linear kernel. See{" "}
          <ArrowLink
            href="https://obukofejoey.notion.site/Sigmoid-1de77c2a651380858580d4d9d6622a5c?pvs=4"
            target="_blank"
          >
            Sigmoid
          </ArrowLink>
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Non-linear models on the other hand capture non-linear relationships,
          meaning that the relationship between the input and the targets can
          not be represented as a straight line as in the case of linear models.
          These guys basically introduce non-linear transformations to model
          complex relationships. It is mathematically explained as:
        </p>
        <BlockMath math={"y = f(x) + b"} />
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Where <InlineMath>f(x)</InlineMath> is a non-linear function and{" "}
          <InlineMath>b</InlineMath> is the bias term.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          The decision boundaries in this case is often curved and irregular,
          thus making it harder to interpret, slower to train, harder to scale
          in most cases and increases the risks of overfitting. Examples are
          non-linear splitting decision trees, SVMs with non-linear kernels,
          Neural Networks with non-linear activation functions etc.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          The trade-offs between linear and non-linear models are usually
          between interpretability and predictive power, with non-linear models
          often requiring regularization and careful tuning to avoid
          overfitting.
        </p>
        <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          Rust Fundamentals
        </h2>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Learning Rust felt like stepping into a whole new world of systems
          programming, and while it's quite different from Python, it's already
          making sense. Here's what I've covered so far:
        </p>
        <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          Setup and Installation
        </h3>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Installed Rust using the <InlineCode>rustup</InlineCode> installer,
          which conveniently sets up both the Rust compiler (
          <InlineCode>rustc</InlineCode>) and the Cargo package manager. Got
          familiar with <InlineCode>rustup</InlineCode> as a CLI tool for
          managing Rust versions and components, which makes it super
          straightforward to switch between different builds.
        </p>
        <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          Cargo Dependency Management and Build Tool
        </h3>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Explored Cargo, the default package manager and build tool for Rust,
          which handles everything from dependency resolution to building and
          testing projects. It sort of reminds me of{" "}
          <InlineCode>pip</InlineCode> but a really maxed out version of it.
          Learned to create new projects with <InlineCode>cargo new</InlineCode>
          , build with <InlineCode>cargo build</InlineCode>, run with{" "}
          <InlineCode>cargo run</InlineCode>, and format with{" "}
          <InlineCode>cargo fmt</InlineCode> for the idiomatic Rust style.
        </p>
        <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          First Rust Program
        </h3>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Wrote my first Rust program with the{" "}
          <InlineCode>fn main(){}</InlineCode> setup. Rust's{" "}
          <InlineCode>main</InlineCode> function is the entry point of every
          Rust program and a good place to start exploring.
        </p>
        <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          Anatomy of a Rust Program
        </h3>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Learned the core structure of a Rust program, including the{" "}
          <InlineCode>main(){}</InlineCode> function, statement vs. expression
          function, statement vs. expression syntax, and how Rust's strict type
          system ensures memory safety without a garbage collector.
        </p>
        <hr className="my-6 border-t border-neutral-200 dark:border-neutral-800" />
        <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          What I loved about this week
        </h2>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          I loved the sheer depth this week brought, from understanding how
          classifiers handle multi-class and multi-label behaviors, to trying to
          wrap my head around multi-class AUC-ROC score interpretations. Also,
          finally kicking my Rust journey was a solid win. I got to write my
          first lines of Rust code, getting my first
          <InlineCode>cargo build</InlineCode> to run and starting to understand
          what Rust is felt really good.
        </p>
        <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
          What's next?
        </h2>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          Next week, I plan to deep dive in on model calibration, why it's
          important, how to detect calibration issues (model miscalibrations),
          calibration post-processing techniques like Platt Scaling and Isotonic
          Regression, how to evaluate calibration quality and figuring out how
          to weave it all into my current multi-class pipeline.
        </p>
        <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
          I'm really hyped to see how these dynamic parts all fit in into a more
          cohesive form.
        </p>
        <hr className="my-6 border-t border-neutral-200 dark:border-neutral-800" />
        <div className="py-5"></div>
      </section>
    </>
  ),
};

export default function Week19Page() {
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
        url: "/images/thumbnails/19.png",
        width: 1200,
        height: 630,
        alt: "Week 19 Recap",
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
        url: "/images/thumbnails/19.png",
        width: 1200,
        height: 630,
        alt: "Week 19 Recap",
      },
    ],
  },
};
