"use client";
import { notFound } from 'next/navigation';
import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { CodeBlock, CodeBlockCode } from '@/app/components/ui/code-block';
import { useTheme } from 'next-themes';


function ArrowLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-baseline gap-1 font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-100 dark:hover:text-neutral-50 transition-colors duration-200"
    >
      {children}
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[0.75em] w-[0.75em] self-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        <path
          d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    </a>
  )
}


export default function RecapPage({ params }: { params: { slug: string } }) {
  const { resolvedTheme } = useTheme();
  const codeTheme = resolvedTheme === 'dark' ? 'one-dark-pro' : 'github-light';

  const weekContent: Record<string, { title: string; content: React.ReactNode }> = {
    'week-1': {
      title: 'Week 1 Recap',
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Introduction to Next.js</h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            This week you learned about:
          </p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Next.js routing</li>
            <li>Dynamic pages</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Key Takeaway</h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            Dynamic routes are powerful!
          </p>
          <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">LaTeX Example</h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            Here is an inline equation: <InlineMath math={"a^2 + b^2 = c^2"} />
          </p>
          <BlockMath math={"\\int_0^\\infty x^2 dx"} />
          <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Code Example</h3>
          <CodeBlock code={`export default function HelloWorld() {\n  return <h1>Hello, world!</h1>;\n}`}>
            <CodeBlockCode code={`export default function HelloWorld() {\n  return <h1>Hello, world!</h1>;\n}`} language="tsx" theme={codeTheme} />
          </CodeBlock>
        </>
      )
    },
    'week-2': {
      title: 'Week 2 Recap',
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Data Fetching & Server Components</h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">This week you learned about:</p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Data fetching strategies</li>
            <li>Server components</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Key Takeaway</h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Server components help optimize performance.</p>
        </>
      )
    },
    'week-3': {
      title: 'Week 3 Recap',
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Deployment & Optimization</h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">This week you learned about:</p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Key Takeaway</h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Optimizing your app ensures a better user experience.</p>
        </>
      )
    },
    'week-4': {
      title: 'Week 4 Recap',
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Deployment & Optimization</h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">This week you learned about:</p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Key Takeaway</h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Optimizing your app ensures a better user experience.</p>
        </>
      )
    },
    'week-5': {
      title: 'Week 5 Recap',
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Deployment & Optimization</h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">This week you learned about:</p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Key Takeaway</h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Optimizing your app ensures a better user experience.</p>
        </>
      )
    },
    'week-6': {
      title: 'Week 6 Recap',
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Deployment & Optimization</h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">This week you learned about:</p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Key Takeaway</h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Optimizing your app ensures a better user experience.</p>
        </>
      )
    },
    'week-7': {
      title: 'Week 7 Recap',
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Deployment & Optimization</h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">This week you learned about:</p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Key Takeaway</h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Optimizing your app ensures a better user experience.</p>
        </>
      )
    },
    'week-8': {
      title: 'Week 8 Recap',
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Deployment & Optimization</h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">This week you learned about:</p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Key Takeaway</h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Optimizing your app ensures a better user experience.</p>
        </>
      )
    },
    'week-9': {
      title: 'Week 9 Recap',
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Deployment & Optimization</h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">This week you learned about:</p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Key Takeaway</h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Optimizing your app ensures a better user experience.</p>
        </>
      )
    },
    'week-10': {
      title: 'Week 10 Recap',
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Deployment & Optimization</h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">This week you learned about:</p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Key Takeaway</h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Optimizing your app ensures a better user experience.</p>
        </>
      )
    },
    'week-11': {
      title: 'Week 11 Recap',
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Deployment & Optimization</h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">This week you learned about:</p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Key Takeaway</h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Optimizing your app ensures a better user experience.</p>
        </>
      )
    },
    'week-12': {
      title: 'Week 12 Recap',
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Deployment & Optimization</h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">This week you learned about:</p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Key Takeaway</h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Optimizing your app ensures a better user experience.</p>
        </>
      )
    },
    'week-13': {
      title: 'Week 13 Recap',
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Deployment & Optimization</h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">This week you learned about:</p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Key Takeaway</h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Optimizing your app ensures a better user experience.</p>
        </>
      )
    },
    'week-14': {
      title: 'Week 14 Recap',
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Deployment & Optimization</h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">This week you learned about:</p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Key Takeaway</h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Optimizing your app ensures a better user experience.</p>
        </>
      )
    },
    'week-15': {
      title: 'Week 15 Recap',
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Deployment & Optimization</h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">This week you learned about:</p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Key Takeaway</h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Optimizing your app ensures a better user experience.</p>
        </>
      )
    },
    'week-16': {
      title: 'Week 16 Recap',
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Deployment & Optimization</h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">This week you learned about:</p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Key Takeaway</h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Optimizing your app ensures a better user experience.</p>
        </>
      )
    },
    'week-17': {
      title: 'Week 17 Recap',
      content: (
        <>
          <section className="space-y-6 mb-32"> 
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">This week was an intense deep dive into classification strategies in machine learning — we covered <b>binary</b>, <b>multiclass</b>, and <b>multilabel</b> classification, along with the <b>activation functions</b> and <b>loss functions</b> that make these models tick. I also had a ton of uni work, plus an assignment on R to complete. It was a wild ride, but here’s the breakdown of what I learned this week :)</p>
            <hr className="my-6 border-t border-neutral-200 dark:border-neutral-800" />
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Binary vs Multiclass vs Multilabel Classification</h3>
            <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
              <li>Binary classification: Only two possible outcomes (e.g., spam or not spam)</li>
              <li>Multiclass classification: One prediction from more than two mutually exclusive classes (e.g., digit recognition: <InlineMath math={"0-9"} />)</li>
              <li>Multilabel classification: One input can have multiple labels (e.g., an image labeled both “cat” and “outdoor”).</li>
            </ul>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Activation Functions</h3>
            <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
              <li>Sigmoid function: Used in binary and multilabel tasks. Squashes output between <InlineMath math={"0"} /> and <InlineMath math={"1"} /> good for individual class probabilities, mathematically explained as:</li>
              <BlockMath math={"\\sigma(x) = \\frac{1}{1 + e^{-x}}"} />
              <p>Where <InlineMath math={"x"} /> is a single model logit. See <ArrowLink href="https://obukofejoey.notion.site/Sigmoid-1de77c2a651380858580d4d9d6622a5c?pvs=4">Sigmoid</ArrowLink></p>
              <li>Softmax function: Used in multiclass classification. Outputs a probability distribution across all classes, summing to <InlineMath math={"1"} /> mathematically explained as:</li>
              <BlockMath math={"\\text{Softmax}(z) = \\frac{e^{z_i}}{\\sum_{j=1}^K e^{z_j}}"} />
              <p>Where <InlineMath math={"z"} /> is a vector of logits expressed as <InlineMath math={"z = [z_1, z_2,…, z_k]"} /> and <InlineMath math={"K"} /> is the number of classes. See <ArrowLink href="https://obukofejoey.notion.site/Softmax-1dc77c2a651380e0883bf939d92090fa?pvs=4">Softmax</ArrowLink></p>
            </ul>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Loss Functions</h3>
            <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
              <li>Binary Cross-Entropy (a.k.a. Log Loss): Used in binary and multilabel classification setups with the sigmoid activation function, compares predicted probabilities <InlineMath math={"\\hat{y} \\in [0, 1]"} /> with the actual labels <InlineMath math={"y \\in \\{0, 1\\}"} /> for each class. Mathematically explained as:</li>
              <BlockMath math={"\\text{BCE} = - \\left( y \\cdot \\log(\\hat{y}) + (1 - y) \\cdot \\log(1 - \\hat{y}) \\right)"} />
              <li>Categorical Cross-Entropy: Used in multiclass classification with the softmax activation function. Compares the predicted probability distribution <InlineMath math={"\\hat{y}"} /> to the one-hot encoded true label <InlineMath math={"y"} /> represented as a vector of <InlineMath math={"1"} /> and <InlineMath math={"0"} /> <InlineMath math={"\\rightarrow [0, 1, 0,...n]"} /> for <InlineMath math={"C"} /> number of classes. Mathematically explained as:</li>
              <BlockMath math={"\\text{CCE} = - \\sum_{i=1}^{C} y_i \\cdot \\log(\\hat{y}_i) = -\\log(\\hat{y}_{\\text{true class}}) "} />
              <p>Where <InlineMath math={"C"} /> is the number of classes.</p>
            </ul>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">One-vs-Rest (OvR) and One-vs-One (OvO)</h3>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Strategies to adapt binary classifiers (like logistic regression and SVMs) to handle multiclass problems.</p>
            <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
              <li>OvR: Trains one classifier per class vs all others. <ArrowLink href="https://obukofejoey.notion.site/OvR-1dc77c2a65138024b8edcaa23eb37561?pvs=4">OvR</ArrowLink></li>
              <li>OvO: Trains one classifier for every pair of classes (can get heavy with many classes). <ArrowLink href="https://obukofejoey.notion.site/OvO-1dc77c2a65138009944dde36bedfce14?pvs=4">OvO</ArrowLink></li>
            </ul>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Logistic Regression & Multiclass</h3>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">By default, logistic regression uses <b>OvR</b> for multiclass, but you can also use the <b>multinomial</b> option (with softmax) for better multiclass predictions. For more info, check out my notes on <ArrowLink href="https://obukofejoey.notion.site/Softmax-Regression-1dc77c2a65138041be32d6483c87c4f9?pvs=4">Softmax Regression</ArrowLink></p>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Hierarchical Classification</h3>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Super useful for high-cardinality multiclass problems with class taxonomy. Think of classifying first into broad categories (e.g., “fashion”), then into sub-categories (e.g., “shoes”, “shirts”). Uses Local Classifier per Node (LCN), Local Classifier per Parent Node (LCPN), or global classifiers, as well as implementing hierarchical loss functions to penalize mistakes based on how far off the prediction path was from the truth. See <ArrowLink href="https://obukofejoey.notion.site/Hierarchical-Classification-1dd77c2a651380d2b0abc18166801550?pvs=4">Hierarchical Classification</ArrowLink></p>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">Loss Landscapes & Optimization</h3>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Visualizations that show how a model’s loss changes across weight space. Important for understanding how optimization algorithms navigate to find the “valley” where loss is minimized.</p>
            <hr className="my-6 border-t border-neutral-200 dark:border-neutral-800" />
            <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">What I loved about this week</h2>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">I really enjoyed connecting the dots between activation functions and loss functions. It’s so satisfying to see how <b>logits → probabilities → losses → gradients</b> all form a complete training loop.</p>
            <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">What's next?</h2>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">Next week, I’m thinking of diving into Optimizers (Adam, SGD, RMSprop) and Regularization (L1, L2, Dropout). During the course of my learning, I also plan to deep dive into Gradient Descent, down to the low level details of it, as well as non-convex functions to understand why they are equally important.</p>
            <div className="py-5"></div>
          </section>
        </>
      )
    },
  };

  const recap = weekContent[params.slug];

  if (!recap) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <h1 className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200">
        {recap.title}
      </h1>
      <div className="space-y-4">
        {recap.content}
      </div>
    </section>
  );
}
