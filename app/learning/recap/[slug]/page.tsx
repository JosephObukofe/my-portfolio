"use client";
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
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
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
import { BarPlotChart } from "@/app/components/ui/barplot";
import { HorizontalBarPlotChart } from "@/app/components/ui/horizontalbarplot";
import { LinePlotChart } from "@/app/components/ui/lineplot";
import { AreaPlotChart } from "@/app/components/ui/areaplot";
import { MultiLinePlotChart } from "@/app/components/ui/multilineplot";
import { StackedBarPlotChart } from "@/app/components/ui/stackedbarplot";

const data = [
  { week: "Week 1", hours: 12 },
  { week: "Week 2", hours: 9 },
  { week: "Week 3", hours: 15 },
  { week: "Week 4", hours: 7 },
];

const lineChartData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 200 },
  { month: "Mar", users: 150 },
  { month: "Apr", users: 250 },
  { month: "May", users: 300 },
  { month: "Jun", users: 280 },
  { month: "Jul", users: 350 },
  { month: "Aug", users: 420 },
  { month: "Sep", users: 390 },
  { month: "Oct", users: 450 },
  { month: "Nov", users: 480 },
  { month: "Dec", users: 500 },
];

const multiLineChartData = [
  {
    date: "Jan",
    series1: 40,
    series2: 32,
    series3: 18,
    series4: 50,
    series5: 28,
    series6: 60,
  },
  {
    date: "Feb",
    series1: 55,
    series2: 45,
    series3: 23,
    series4: 48,
    series5: 32,
    series6: 58,
  },
  {
    date: "Mar",
    series1: 48,
    series2: 38,
    series3: 35,
    series4: 52,
    series5: 40,
    series6: 61,
  },
  {
    date: "Apr",
    series1: 60,
    series2: 52,
    series3: 40,
    series4: 55,
    series5: 43,
    series6: 65,
  },
  {
    date: "May",
    series1: 70,
    series2: 65,
    series3: 45,
    series4: 62,
    series5: 49,
    series6: 72,
  },
  {
    date: "Jun",
    series1: 68,
    series2: 58,
    series3: 50,
    series4: 70,
    series5: 51,
    series6: 80,
  },
  {
    date: "Jul",
    series1: 75,
    series2: 60,
    series3: 48,
    series4: 78,
    series5: 55,
    series6: 85,
  },
  {
    date: "Aug",
    series1: 80,
    series2: 67,
    series3: 52,
    series4: 82,
    series5: 60,
    series6: 90,
  },
];

const yKeys = [
  "series1",
  "series2",
  "series3",
  "series4",
  "series5",
  "series6",
];

const stackedBarData = [
  {
    month: "Jan",
    productA: 40,
    productB: 24,
    productC: 18,
  },
  {
    month: "Feb",
    productA: 35,
    productB: 28,
    productC: 22,
  },
  {
    month: "Mar",
    productA: 50,
    productB: 20,
    productC: 30,
  },
  {
    month: "Apr",
    productA: 45,
    productB: 32,
    productC: 26,
  },
  {
    month: "May",
    productA: 60,
    productB: 34,
    productC: 29,
  },
  {
    month: "Jun",
    productA: 55,
    productB: 27,
    productC: 33,
  },
];

export function ArrowLink({
  children,
  href,
  target = "_self",
}: {
  children: React.ReactNode;
  href: string;
  target?: string;
}) {
  return (
    <a
      href={href}
      target={target}
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
  );
}

const items = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex.t@company.com",
    location: "San Francisco, US",
    status: "Active",
    balance: "$1,250.00",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.c@company.com",
    location: "Singapore",
    status: "Active",
    balance: "$600.00",
  },
  {
    id: "3",
    name: "James Wilson",
    email: "j.wilson@company.com",
    location: "London, UK",
    status: "Inactive",
    balance: "$650.00",
  },
  {
    id: "4",
    name: "Maria Garcia",
    email: "m.garcia@company.com",
    location: "Madrid, Spain",
    status: "Active",
    balance: "$0.00",
  },
  {
    id: "5",
    name: "David Kim",
    email: "d.kim@company.com",
    location: "Seoul, KR",
    status: "Active",
    balance: "-$1,000.00",
  },
];

function Component() {
  return (
    <div className="bg-background">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell className="text-right">{item.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-transparent">
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Basic table
      </p>
    </div>
  );
}

export { Component };

export default function RecapPage({ params }: { params: { slug: string } }) {
  const { resolvedTheme } = useTheme();
  const codeTheme = resolvedTheme === "dark" ? "one-dark-pro" : "github-light";

  const weekContent: Record<
    string,
    { title: string; content: React.ReactNode }
  > = {
    "week-1": {
      title: "Week 1 Recap",
      content: (
        <>
          <h1 className={styles.h1}>Introduction to Next.js</h1>
          <p className={styles.body}>This week you learned about:</p>
          <ul className={styles.list}>
            <li>Next.js routing</li>
            <li>Dynamic pages</li>
          </ul>
          <h2 className={styles.h2}>Key Takeaway</h2>
          <p className={styles.body}>Dynamic routes are powerful!</p>
          <h2 className={styles.h2}>LaTeX Example</h2>
          <p className={styles.body}>
            Here is an inline equation: <InlineMath math={"a^2 + b^2 = c^2"} />
          </p>
          <BlockMath math={"\\int_0^\\infty x^2 dx"} />
          <h2 className={styles.h2}>Code Example</h2>
          <CodeBlock
            code={`export default function HelloWorld() {\n  return <h1>Hello, world!</h1>;\n}`}
          >
            <CodeBlockCode
              code={`export default function HelloWorld() {\n  return <h1>Hello, world!</h1>;\n}`}
              language="tsx"
              theme={codeTheme}
            />
          </CodeBlock>
        </>
      ),
    },
    "week-2": {
      title: "Week 2 Recap",
      content: (
        <>
          <h1 className={styles.h1}>Data Fetching & Server Components</h1>
          <p className={styles.body}>This week you learned about:</p>
          <ul className={styles.list}>
            <li>Data fetching strategies</li>
            <li>Server components</li>
          </ul>
          <h2 className={styles.h2}>Key Takeaway</h2>
          <p className={styles.body}>
            Server components help optimize performance.
          </p>
        </>
      ),
    },
    "week-3": {
      title: "Week 3 Recap",
      content: (
        <>
          <h1 className={styles.h1}>Deployment & Optimization</h1>
          <p className={styles.body}>This week you learned about:</p>
          <ul className={styles.list}>
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h2 className={styles.h2}>Key Takeaway</h2>
          <p className={styles.body}>
            Optimizing your app ensures a better user experience.
          </p>
        </>
      ),
    },
    "week-4": {
      title: "Week 4 Recap",
      content: (
        <>
          <h1 className={styles.h1}>Deployment & Optimization</h1>
          <p className={styles.body}>This week you learned about:</p>
          <ul className={styles.list}>
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h2 className={styles.h2}>Key Takeaway</h2>
          <p className={styles.body}>
            Optimizing your app ensures a better user experience.
          </p>
        </>
      ),
    },
    "week-5": {
      title: "Week 5 Recap",
      content: (
        <>
          <h1 className={styles.h1}>Deployment & Optimization</h1>
          <p className={styles.body}>This week you learned about:</p>
          <ul className={styles.list}>
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h2 className={styles.h2}>Key Takeaway</h2>
          <p className={styles.body}>
            Optimizing your app ensures a better user experience.
          </p>
        </>
      ),
    },
    "week-6": {
      title: "Week 6 Recap",
      content: (
        <>
          <h1 className={styles.h1}>Deployment & Optimization</h1>
          <p className={styles.body}>This week you learned about:</p>
          <ul className={styles.list}>
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h2 className={styles.h2}>Key Takeaway</h2>
          <p className={styles.body}>
            Optimizing your app ensures a better user experience.
          </p>
        </>
      ),
    },
    "week-7": {
      title: "Week 7 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            This week you learned about:
          </p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Key Takeaway
          </h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            Optimizing your app ensures a better user experience.
          </p>
        </>
      ),
    },
    "week-8": {
      title: "Week 8 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            This week you learned about:
          </p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Key Takeaway
          </h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            Optimizing your app ensures a better user experience.
          </p>
        </>
      ),
    },
    "week-9": {
      title: "Week 9 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            This week you learned about:
          </p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Key Takeaway
          </h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            Optimizing your app ensures a better user experience.
          </p>
        </>
      ),
    },
    "week-10": {
      title: "Week 10 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            This week you learned about:
          </p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Key Takeaway
          </h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            Optimizing your app ensures a better user experience.
          </p>
        </>
      ),
    },
    "week-11": {
      title: "Week 11 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            This week you learned about:
          </p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Key Takeaway
          </h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            Optimizing your app ensures a better user experience.
          </p>
        </>
      ),
    },
    "week-12": {
      title: "Week 12 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            This week you learned about:
          </p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Key Takeaway
          </h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            Optimizing your app ensures a better user experience.
          </p>
        </>
      ),
    },
    "week-13": {
      title: "Week 13 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            This week you learned about:
          </p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Key Takeaway
          </h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            Optimizing your app ensures a better user experience.
          </p>
        </>
      ),
    },
    "week-14": {
      title: "Week 14 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            This week you learned about:
          </p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Key Takeaway
          </h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            Optimizing your app ensures a better user experience.
          </p>
        </>
      ),
    },
    "week-15": {
      title: "Week 15 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            This week you learned about:
          </p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Key Takeaway
          </h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            Optimizing your app ensures a better user experience.
          </p>
        </>
      ),
    },
    "week-16": {
      title: "Week 16 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            This week you learned about:
          </p>
          <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
            <li>Deploying Next.js apps</li>
            <li>Performance optimization</li>
          </ul>
          <h3 className="text-[1rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Key Takeaway
          </h3>
          <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
            Optimizing your app ensures a better user experience.
          </p>
        </>
      ),
    },
    "week-17": {
      title: "Week 17 Recap",
      content: (
        <>
          <section className="space-y-6 mb-32">
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              This week was an intense deep dive into a recap on classification
              strategies in machine learning — I covered <b>binary</b>,{" "}
              <b>multiclass</b>, and <b>multilabel</b> classification facets,
              along with a quick skim on <b>activation functions</b> and{" "}
              <b>loss functions</b> that make these models tick. I also had a
              ton of uni work, plus an assignment on R to complete (based on
              hypothesis testing). It was a wild ride, but here's the breakdown
              of what I learned this week : )
            </p>
            <hr className="my-6 border-t border-neutral-200 dark:border-neutral-800" />
            <h3 className="text-[1rem] font-semibold font-grotesk text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              Binary vs Multiclass vs Multilabel Classification
            </h3>
            <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
              <li>
                Binary classification: Only two possible outcomes (e.g., spam or
                not spam).
              </li>
              <li>
                Multiclass classification: One prediction from more than two
                mutually exclusive classes (e.g., digit recognition:{" "}
                <InlineMath math={"0-9"} />)
              </li>
              <li>
                Multilabel classification: One input can have multiple labels
                (e.g., an image labeled both "cat" and "outdoor").
              </li>
            </ul>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              Activation Functions
            </h3>
            <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
              <li>
                Sigmoid function: Used in binary and multilabel tasks. Squashes
                output between <InlineMath math={"0"} /> and{" "}
                <InlineMath math={"1"} /> good for individual class
                probabilities, mathematically explained as:
              </li>
              <BlockMath math={"\\sigma(x) = \\frac{1}{1 + e^{-x}}"} />
              <p>
                Where <InlineMath math={"x"} /> is a single model logit. See{" "}
                <ArrowLink
                  href="https://obukofejoey.notion.site/Sigmoid-1de77c2a651380858580d4d9d6622a5c?pvs=4"
                  target="_blank"
                >
                  Sigmoid
                </ArrowLink>
              </p>
              <li>
                Softmax function: Used in multiclass classification. Outputs a
                probability distribution across all classes, summing to{" "}
                <InlineMath math={"1"} /> mathematically explained as:
              </li>
              <BlockMath
                math={
                  "\\text{Softmax}(z) = \\frac{e^{z_i}}{\\sum_{j=1}^K e^{z_j}}"
                }
              />
              <p>
                Where <InlineMath math={"z"} /> is a vector of logits expressed
                as <InlineMath math={"z = [z_1, z_2,…, z_k]"} /> and{" "}
                <InlineMath math={"K"} /> is the number of classes. See{" "}
                <ArrowLink
                  href="https://obukofejoey.notion.site/Softmax-1dc77c2a651380e0883bf939d92090fa?pvs=4"
                  target="_blank"
                >
                  Softmax
                </ArrowLink>
              </p>
            </ul>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              Loss Functions
            </h3>
            <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
              <li>
                Binary Cross-Entropy (a.k.a. Log Loss): Used in binary and
                multilabel classification setups with the sigmoid activation
                function, compares predicted probabilities{" "}
                <InlineMath math={"\\hat{y} \\in [0, 1]"} /> with the actual
                labels <InlineMath math={"y \\in \\{0, 1\\}"} /> for each class.
                Mathematically explained as:
              </li>
              <BlockMath
                math={
                  "\\text{BCE} = - \\left( y \\cdot \\log(\\hat{y}) + (1 - y) \\cdot \\log(1 - \\hat{y}) \\right)"
                }
              />
              <li>
                Categorical Cross-Entropy: Used in multiclass classification
                with the softmax activation function. Compares the predicted
                probability distribution <InlineMath math={"\\hat{y}"} /> to the
                one-hot encoded true label <InlineMath math={"y"} /> represented
                as a vector of <InlineMath math={"1"} /> and{" "}
                <InlineMath math={"0"} />{" "}
                <InlineMath math={"\\rightarrow [0, 1, 0,...n]"} /> for{" "}
                <InlineMath math={"C"} /> number of classes. Mathematically
                explained as:
              </li>
              <BlockMath
                math={
                  "\\text{CCE} = - \\sum_{i=1}^{C} y_i \\cdot \\log(\\hat{y}_i) = -\\log(\\hat{y}_{\\text{true class}}) "
                }
              />
            </ul>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              One-vs-Rest (OvR) and One-vs-One (OvO)
            </h3>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Strategies to adapt binary classifiers (like logistic regression
              and SVMs) to handle multiclass problems.
            </p>
            <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
              <li>
                OvR: Trains one classifier per class vs all others.{" "}
                <ArrowLink
                  href="https://obukofejoey.notion.site/OvR-1dc77c2a65138024b8edcaa23eb37561?pvs=4"
                  target="_blank"
                >
                  OvR
                </ArrowLink>
              </li>
              <li>
                OvO: Trains one classifier for every pair of classes (can get
                heavy with many classes).{" "}
                <ArrowLink
                  href="https://obukofejoey.notion.site/OvO-1dc77c2a65138009944dde36bedfce14?pvs=4"
                  target="_blank"
                >
                  OvO
                </ArrowLink>
              </li>
            </ul>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              Logistic Regression & Multiclass
            </h3>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              By default, logistic regression uses <b>OvR</b> for multiclass,
              but you can also use the <b>multinomial</b> option (with softmax)
              for better multiclass predictions. For more info, check out my
              notes on{" "}
              <ArrowLink
                href="https://obukofejoey.notion.site/Softmax-Regression-1dc77c2a65138041be32d6483c87c4f9?pvs=4"
                target="_blank"
              >
                Softmax Regression
              </ArrowLink>
            </p>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              Hierarchical Classification
            </h3>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Super useful for high-cardinality multiclass problems with class
              taxonomy. Think of classifying first into broad categories (e.g.,
              "fashion"), then into sub-categories (e.g., "shoes", "shirts").
              Uses Local Classifier per Node (LCN), Local Classifier per Parent
              Node (LCPN), or global classifiers, as well as implementing
              hierarchical loss functions to penalize mistakes based on how far
              off the prediction path was from the truth. See{" "}
              <ArrowLink href="https://obukofejoey.notion.site/Hierarchical-Classification-1dd77c2a651380d2b0abc18166801550?pvs=4">
                Hierarchical Classification
              </ArrowLink>
            </p>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              Loss Landscapes & Optimization
            </h3>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Visualizations that show how a model's loss changes across weight
              space. Important for understanding how optimization algorithms
              navigate to find the "valley" where loss is minimized.
            </p>
            <hr className="my-6 border-t border-neutral-200 dark:border-neutral-800" />
            <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              What I loved about this week
            </h2>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              I really enjoyed connecting the dots between activation functions
              and loss functions. It's so satisfying to see how{" "}
              <b>logits → probabilities → losses → gradients</b> all form a
              complete training loop.
            </p>
            <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              What's next?
            </h2>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Next week, I'm thinking of diving into Optimizers (Adam, SGD,
              RMSprop) and Regularization (L1, L2, Dropout). During the course
              of my learning, I also plan to deep dive into Gradient Descent,
              down to the low level details of it, as well as non-convex
              optimization functions to understand why they are equally
              important.
            </p>
            <div className="py-5"></div>
          </section>
        </>
      ),
    },
    "week-18": {
      title: "Week 18 Recap",
      content: (
        <>
          <section className="space-y-6 mb-32">
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              For a long time, I thought of evaluation metrics for classifiers
              as a kind of checklist, that is boxes to tick without fully
              grasping their nuances. For instance, I always saw precision and
              recall as just essential checks for imbalanced datasets, while the
              F1 score being a convenient combination of the two, without really
              questioning why they mattered.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              This week, I finally got to understand the <q>why</q> behind these
              metrics, how they interact, and what they reveal about a
              classifier's performance. I also better understood the trade-off
              between precision and recall, how decision thresholds directly
              affects this balance, as well as how this relationship is
              visualized and represented through Precision-Recall (PR) curves,
              ROC curves and AUC-ROC scores.
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
              Lowering the decision threshold (from <InlineMath>0.5</InlineMath>{" "}
              to let's say <InlineMath>0.3</InlineMath>) means that the
              classifier would capture more positive instances (increased
              recall) but it would most likely misclassify negative instances as
              positive ones (more false positives = reduced precision).
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              On the other hand, increasing the decision threshold (to maybe{" "}
              <InlineMath>0.7</InlineMath>) means that the classifier would
              predict fewer instances as positive (increased precision), but it
              would miss out on the actual positive instances (reduced recall).
              This messy tradeoff is the <b>Precision-Recall Tradeoff</b>, and
              it underscores a critical part of model tuning, which is basically
              finding the right threshold.
            </p>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              Precision-Recall Curve (PR-Curve)
            </h3>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              I learned about the characteristics of the PR-curve, plotting
              precision on the <InlineMath>y</InlineMath>-axis and recall on the{" "}
              <InlineMath>x</InlineMath>-axis, with varying thresholds from{" "}
              <InlineMath>0</InlineMath> to <InlineMath>1</InlineMath>. It
              answers the question of{" "}
              <q>
                If I want to increase the recall, how much precision am I
                sacrificing?
              </q>{" "}
              and vice versa.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              A flat precision at high recall (the closer the curve hugs the top
              right corner) = an amazing classifier. A purely random classifier
              on the other hand would give a horizontal line from{" "}
              <InlineMath>(0,0)</InlineMath> to <InlineMath>(1,1)</InlineMath>.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              As opposed to maximizing either precision or recall by using{" "}
              <InlineCode>np.argmax()</InlineCode> (the first index of the
              maximum value) to find the threshold that maxes out either metric,
              to find the sweet spot (optimize for both high precision and
              recall), then maximising the F1 score is the most ideal solution;
              which is denoted as the harmonic mean of precision and recall. So
              if either precision or recall is low, the F1 score will also be
              low, thereby punishing extreme values. It is mathematically
              explained as:
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
              I like to think of the ROC curve as a visualization of the PR
              tradeoff but solely from the recall end of it (also known as the
              True Positive Rate). Because recall is also attributed to false
              positives, the graph considers that too, thus it is a plot that
              visualizes the relationship between the true positive rate
              (recall) and the false positive rate. The FPR is a measure of how
              often the classifier incorrectly classifies a negative class as a
              positive one (raising a false alarm) ={" "}
              <InlineMath math={"1 - \\text{TNR}"} />. The TPR is plotted on the{" "}
              <InlineMath>y</InlineMath>-axis, the FPR on the{" "}
              <InlineMath>x</InlineMath>-axis and every point on the graph is a
              different decision threshold (thus a threshold-independent plot).
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              I found out that the ROC curve is just a way of understanding how
              well the classifier can distinguish between classes, but it
              doesn't explicitly focus on which, so it best works with balanced
              datasets. In the case of highly imbalanced datasets, because the
              ROC curve doesn't delve in any specific class, it fails to
              properly capture rare positive instances, so in such situations,
              the PR curve is more preferable, as it better captures such
              (basically a measure of <b>how well</b> the classifier is able to
              predict them and <b>how many</b> it was able to predict)
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Visually, a classifier's performance is identified by how close
              the curve edges to the top left corner of the ROC graph, as the
              closer the curve gets, the better the classifier (a high TPR and a
              low FPR = a more discriminative model). But numerically, it is
              best explained by the area under the ROC curve (AUC-ROC score).
            </p>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              AUC-ROC Score
            </h3>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Compared to accuracy that measures the overall correctness (which
              is often misleading especially in imbalanced datasets), the AUC
              score is a numerical measure from the ROC curve, and it defines
              how well the classifier can separate (rank) positive classes from
              negative ones. Also, while accuracy only uses a single (and often
              the default) threshold, AUC is threshold-independent and considers
              all the possible thresholds, thereby affirming a stronger
              "confidence" in delineating classes.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              I also learned that classifiers with high accuracy and low AUC
              scores tend to be overconfident about the majority class, but weak
              in actually separating the positive classes from the negative
              ones. In imbalanced datasets, the classifier may be exploiting the
              strata imbalance, meaning the model isn't actually learning the
              patterns but riding on the advantageous extent of the majority
              class.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              To better address this, you could stratify the train-test splits
              to preserve the class ratios (preventing strata information
              leakage to the test set), then during training, oversample the
              minority class with synthetic data (SMOTE), adjust decision
              thresholds to maximize the AUC score, optionally use class weights
              to place more importance on the class of interest, or use a
              different model that ranks better out of the box.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              In well-balanced datasets however, it may be due to the classifier
              latching on to (overfitting) specific features that are probably
              more predictive than others but poor rankers, poorly scaled
              features (features with inconsistent scales), inconsistent feature
              importances or label noise.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              In these cases, use L1 or L2 regularizations to reduce
              overfitting, apply dimensionality reduction techniques and assess
              feature importances to drop noisy or redundant features.
            </p>
            <hr className="my-6 border-t border-neutral-200 dark:border-neutral-800" />
            <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              What I loved about this week
            </h2>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              It was really refreshing to step back from the usual
              "accuracy-first" mindset and better understand the subtle
              trade-offs that come with different evaluation metrics that I'd
              always taken at face value. I'm beginning to see metrics as dials
              I can tune based on the stakes of the problem, rather than rigid
              checkboxes to tick.
            </p>
            <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              What's next?
            </h2>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Next, I want to dive deeper into the practical side of these
              metrics, by exploring precision, recall, AUC, and loss functions
              in real-world scenarios, as well as model calibration to improve
              the alignment between probabilistic outputs and decision
              thresholds.
            </p>
            <div className="py-5"></div>
          </section>
        </>
      ),
    },
    "week-19": {
      title: "Week 19 Recap",
      content: (
        <>
          <section className="space-y-6 mb-32">
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Absolutely crunched it this week. Went full throttle into decoding
              multi-class model evaluation strategies, multi-class evaluation
              optimization with binarizers, interpretations of the AUC-ROC score
              in binary, multi-class and multi-label contexts. While at it, I
              threw in a quick refresher into linear and non-linear models.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Also, zero uni pressure this week, so I've officially kicked off
              my Rust learning journey which I am absolutely stoked about.
            </p>
            <hr className="my-6 border-t border-neutral-200 dark:border-neutral-800" />
            <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              Multi-Output Classification
            </h2>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              As opposed to binary and multi-class classifications that predicts
              a single output for every instance <InlineMath>(y_i) </InlineMath>
              , in the case of a multi-output classification, for every instance{" "}
              <InlineMath>(x_1)</InlineMath>, the classifier predicts multiple
              outputs <InlineMath>(y_1, y_2,…y_n)</InlineMath> stacked into a
              single target matrix <InlineMath>y</InlineMath> (for{" "}
              <InlineMath>n</InlineMath> number of outputs), and each output
              (column) could be a binary or a multi-class label.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Meta estimators used for multi-output classification tasks like
              the <InlineCode>MultiOutputClassifier</InlineCode> wraps around a
              base classifier that is capable of handling multi-class, either
              natively (out of the box) or augmented using multi-class
              strategies like the OvR (One vs Rest) and multinomial softmax.
              Under the hood, these meta-estimators essentially clone the base
              classifier for each output, creating a separate model per target
              column.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Model evaluations follow suit per associated pair of feature{" "}
              <InlineMath>\rightarrow</InlineMath> target, so metrics like
              support, accuracy and precision are evaluated for each label
              independently and then averaged across classes. This structure
              helps capture the multi-dimensional nature of the problem,
              providing more granular insights into model performance.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Given the aim of the task, to make the synthetically generated
              dataset (being a key to properly understanding how multi-class and
              multi-output classifications work), more robust and effectively
              mirror real-world scenarios, I prioritized a larger class
              diversity (to better capture the multi-class nature of the task),
              increased data complexity, by adjusting the{" "}
              <InlineCode>n_informative</InlineCode> and{" "}
              <InlineCode>n_redundant</InlineCode> parameters to include a mix
              of both noisy and informative features, but with a larger
              noise-to-signal ratio. I also accounted for naturally occurring
              inter-class clusters/subgroups, as real-world data often has
              irregular, overlapping, and non-linear decision boundaries. This
              was achieved by tuning{" "}
              <InlineCode>n_clusters_per_class</InlineCode> to spread samples
              from a given class across multiple <InlineMath>(n)</InlineMath>{" "}
              clusters, and tightened the class separation to make the classes
              more intertwined and less separable by reducing{" "}
              <InlineCode>class_sep</InlineCode>.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Additionally, I balanced the class weights to reduce skew, forcing
              the resulting classifiers to learn about the minority classes more
              effectively.
            </p>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              Label Binarization
            </h3>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              I initially found it odd that Random Forest classifiers don't
              strictly follow the feature and target matrix specification rule
              of 2D <InlineMath>\rightarrow</InlineMath>{" "}
              <InlineCode>rows, columns</InlineCode> and 1D{" "}
              <InlineMath>\rightarrow</InlineMath>{" "}
              <InlineCode>rows,</InlineCode> - defined as a column vector.
              Asides from optimizing the model evaluation step by using binary
              matrices (see{" "}
              <UnderlineLink href="https://obukofejoey.notion.site/Binary-Matrix-1ef77c2a6513806bbd96e02bbdd98ba8?pvs=4">
                Binary Matrix
              </UnderlineLink>{" "}
              and{" "}
              <UnderlineLink href="https://gist.github.com/JosephObukofe/d16839d7c4dcd5dc2deed2107060b94f">
                Label Binarization
              </UnderlineLink>
              ) to represent the different classes in a multi-class setup, I
              tested using these sparse binary matrices directly as a training
              component.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              For some reason and understandably, Random Forest treated it as a
              multi-label classification setup and in such case, it essentially
              trained a separate tree (or an ensemble) classifier for each
              column (label) in the defined binary matrix, and then each tree
              tried to predict the presence <InlineMath>(1)</InlineMath> or
              absence <InlineMath>(0)</InlineMath> of the given
              characteristic/feature represented by the matrix.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Given this approach to multi-label classification, it is important
              to consider how evaluation metrics like the AUC-ROC score handles
              this structure
            </p>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              AUC-ROC Score Attribute Specifications
            </h3>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              This approach (for a multi-class classification problem) is
              somewhat analogous to the OvR strategy, and since Random Forest in
              this case is already acting like a collection of independent
              binary classifiers, the <InlineCode>roc_auc_score</InlineCode>{" "}
              function didn't need to explicitly know it was handling a
              multiclass problem, because it just treated each column as a
              separate binary problem (which is the case in the current
              context). So the <InlineCode>multi_class</InlineCode> attribute
              wasn't explicitly set as <InlineCode>"ovr"</InlineCode>.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              However, it is important to note that this only applies if the
              Random Forest classifier is dealing with{" "}
              <InlineMath>y</InlineMath> as a 2D binary array, otherwise if{" "}
              <InlineMath>y</InlineMath> is a 1D array (like most target
              variables in classification problems),{" "}
              <InlineCode>roc_auc_score</InlineCode> requires to specify a{" "}
              <InlineCode>multi_class</InlineCode> strategy.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Also by default (in both cases of a multi-class and multi-label
              situations), the <InlineCode>roc_auc_score</InlineCode> functions
              assumes a macro-averaging strategy, so basically the AUC is
              calculated for each label (column in our case) independently and
              then averaged across classes (as an unweighted mean).
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              The need for the macro-averaging strategy was to serve as sort of
              a pass-through: assigning equal weights to each class to prevent
              strata dominance (the majority class overpowering the minority
              ones) and to simply focus more on the ranking abilities of
              different models in a multi-class setting.
            </p>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              Predicted Probabilities vs Predicted Classes
            </h3>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              I also noticed that the <InlineCode>roc_auc_score</InlineCode>{" "}
              function can work with both predicted probabilities and predicted
              classes. However, for a more fine-grained comparison, it's
              generally better to stick with{" "}
              <InlineCode>predict_proba</InlineCode>, as it retains the ranking
              information critical for calculating AUC. Using the raw predicted
              classes discards this ranking, potentially underestimating model
              performance.
            </p>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              Logistic Regression vs Random Forest (Decision Boundary
              Visualization)
            </h3>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              In order to visualize a high-dimensional feature space projected
              down to 2D (in our case), I implemented PCA for dimensionality
              reduction - a technique that squishes a high-dimensional space to
              a lower one, while still retaining the most variance. The aim of
              this was to show the decision regions for each classifier, as well
              as to highlight overlaps at where the classifier's may be
              struggling. See full code{" "}
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
              decision boundaries of both classifiers tends to differ
              significantly in shape and complexity, with the{" "}
              <InlineCode>RandomForestClassifier</InlineCode> showing jagged and
              an almost pixelated boundary, suggesting possible overfitting.
              This was because of it's unpruned nature as it was plainly
              initialized without any tuned hyperparameter. It also showed small
              isolated "islands" of a minority class, as opposed to the absence
              of this with the <InlineCode>LogisticRegression</InlineCode>{" "}
              classifier.
            </p>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              Logistic Regression vs Random Forest (Multi-Class AUC-ROC Score)
            </h3>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Expectedly, Random Forest tends to rank better out of the box
              because of its ensemble nature, which allows it to capture more
              complex decision boundaries compared to the linear decision
              surface of Logistic Regression. However, this comes at the cost of
              interpretability and potential overfitting issues, which makes it
              a trade-off depending on the use case. See full code{" "}
              <ArrowLink
                href="https://gist.github.com/JosephObukofe/faaf8fefd6e6edb26ffd0a91a86c3b7f"
                target="_blank"
              >
                here
              </ArrowLink>
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              A noticeable drop from the macro to the weighted AUC-ROC score
              popped up, which may be a likely side effect of class imbalance.
              Further investigations would need to be conducted to better assess
              the cause of it.
            </p>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              Logistic Regression vs Random Forest (Per-Class AUC-ROC Score)
            </h3>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Like most evaluation metrics that are naturally suited for binary
              classification, the AUC-ROC score measures how well a model ranks
              positive instances above negative ones. However, in our case,
              we've taken a more complex approach by calculating a weighted
              AUC-ROC score across multiple classes in our multi-class setup,
              which can obscure the performance of individual classes. For a
              start, strata imbalance was hypothesized to be the leading cause
              of the lower (weighted-averaged) overall score, but without more
              context, it's hard to pinpoint the exact culprit.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              To dig deeper, we can evaluate the per-class AUC-ROC, which allows
              us to identify which specific classes are dragging down the
              overall score. This was particularly important because a single
              underperforming rare class can disproportionately affect the
              entire weighted average behind the scenes. To this effect, the
              target <InlineMath>y</InlineMath> was binarized into a matrix of{" "}
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
              <InlineCode>MultiOutputClassifier</InlineCode>, essentially
              forcing it into a per-class, binary-esque setup where each column
              is treated as a separate binary target (<InlineMath>1</InlineMath>{" "}
              for presence, <InlineMath>0</InlineMath> for absence). This way,
              the <InlineCode>roc_auc_score</InlineCode> function could be
              applied independently to each class, providing a more granular
              view of model performance.
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
              dependent and independent variables is represented as a straight
              line or a hyperplane in a higher dimension. So basically linear
              models make predictions by computing a weighted sum of the inputs
              plus a bias term that allows the model to shift the decision
              boundary away from the origin, providing better flexibility in
              fitting the data given as:
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
              The decision boundary is a straight line, so it captures only
              linear relationship, thus it is super fast to train, less prone to
              overfitting (may severely underfit in other use cases), and easy
              to scale and interpret (as the relationship is a linear
              representation). Typical examples of linear models are Linear
              Regression, Logistic Regression (for binary classification{" "}
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
              Non-linear models on the other hand capture non-linear
              relationships, meaning that the relationship between the input and
              the targets can not be represented as a straight line as in the
              case of linear models. These guys basically introduce non-linear
              transformations to model complex relationships. It is
              mathematically explained as:
            </p>
            <BlockMath math={"y = f(x) + b"} />
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Where <InlineMath>f(x)</InlineMath> is a non-linear function and{" "}
              <InlineMath>b</InlineMath> is the bias term.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              The decision boundaries in this case is often curved and
              irregular, thus making it harder to interpret, slower to train,
              harder to scale in most cases and increases the risks of
              overfitting. Examples are non-linear splitting decision trees,
              SVMs with non-linear kernels, Neural Networks with non-linear
              activation functions etc.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              The trade-offs between linear and non-linear models are usually
              between interpretability and predictive power, with non-linear
              models often requiring regularization and careful tuning to avoid
              overfitting.
            </p>
            <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              Rust Fundamentals
            </h2>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Learning Rust felt like stepping into a whole new world of systems
              programming, and while it's quite different from Python, it's
              already making sense. Here's what I've covered so far:
            </p>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              Setup and Installation
            </h3>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Installed Rust using the <InlineCode>rustup</InlineCode>{" "}
              installer, which conveniently sets up both the Rust compiler (
              <InlineCode>rustc</InlineCode>) and the Cargo package manager. Got
              familiar with <InlineCode>rustup</InlineCode> as a CLI tool for
              managing Rust versions and components, which makes it super
              straightforward to switch between different builds.
            </p>
            <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              Cargo Dependency Management and Build Tool
            </h3>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Explored Cargo, the default package manager and build tool for
              Rust, which handles everything from dependency resolution to
              building and testing projects. It sort of reminds me of{" "}
              <InlineCode>pip</InlineCode> but a really maxed out version of it.
              Learned to create new projects with{" "}
              <InlineCode>cargo new</InlineCode>, build with{" "}
              <InlineCode>cargo build</InlineCode>, run with{" "}
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
              <InlineCode>main(){}</InlineCode> function, statement vs.
              expression function, statement vs. expression syntax, and how
              Rust's strict type system ensures memory safety without a garbage
              collector.
            </p>
            <hr className="my-6 border-t border-neutral-200 dark:border-neutral-800" />
            <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              What I loved about this week
            </h2>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              I loved the sheer depth this week brought, from understanding how
              classifiers handle multi-class and multi-label behaviors, to
              trying to wrap my head around multi-class AUC-ROC score
              interpretations. Also, finally kicking my Rust journey was a solid
              win. I got to write my first lines of Rust code, getting my first
              <InlineCode>cargo build</InlineCode> to run and starting to
              understand what Rust is felt really good.
            </p>
            <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
              What's next?
            </h2>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              Next week, I plan to deep dive in on model calibration, why it's
              important, how to detect calibration issues (model
              miscalibrations), calibration post-processing techniques like
              Platt Scaling and Isotonic Regression, how to evaluate calibration
              quality and figuring out how to weave it all into my current
              multi-class pipeline.
            </p>
            <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
              I'm really hyped to see how these dynamic parts all fit in into a
              more cohesive form.
            </p>
            <hr className="my-6 border-t border-neutral-200 dark:border-neutral-800" />
            <div className="flex flex-wrap gap-2">
              {[
                "Dimensionality Reduction",
                "Model Calibration",
                "Classification",
                "Multi-Output Classification",
                "Multi-Class Classification",
                "Multi-Label Classification",
                "AUC-ROC Score",
                "Label Binarization",
                "Random Forest",
                "Logistic Regression",
                "Dependency Management",
                "Rust",
                "Cargo",
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
    },
    "week-20": {
      title: "Week 20 Recap",
      content: (
        <>
          <section className="space-y-6 mb-32">
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              This week was a deep dive into the rabbit hole of model
              calibration, and it was so refreshing to realize how classifiers
              cannot be just wrong, but also confidently wrong.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              I finally wrapped my head around the rift between Mean Squared
              Error and Cross-Entropy in the classification sense, and it turns
              out that they play different roles in classification tasks,
              especially how MSE is mainly used in regression. I can say that
              I'm now a bit better in the understanding and interpreting
              calibration metrics such as the ECE, MCE, and the Brier Score.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Unfortunately, I ghosted Rust this week, but I'm planning to
              prioritize it in the coming one.
            </p>
            <hr className={getDividerClass()} />
            <h1 className={getHeadingClass(1)}>Model Calibration</h1>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              To calibrate a model is to simply align its predicted
              probabilities with the true underlying likelihoods of the outcomes
              it's trying to predict.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Formally, a perfectly calibrated classifier satisfies this
              condition:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "P(Y = 1 \\mid \\hat{P}(X) = p) = p \\quad \\text{for all } p \\in [0,1]"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Where <InlineMath math={"\\hat{P}(X)"} /> is the predicted
              probability (confidence score) for the positive class, and{" "}
              <InlineMath math={"P(Y = 1 \\mid \\hat{P}(X) = p)"} /> is the
              actual observed frequency of the positive class among all samples
              where the model predicted probability <InlineMath math={"p"} />.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              What this conditional probability equation is saying is basically
              to collect only the samples where the model predicted a certain
              probability <InlineMath math={"p"} />, then measure the proportion
              of those samples where the actual label is{" "}
              <InlineMath math={"1"} /> (i.e., the event occurred). That
              observed frequency should match the predicted probability{" "}
              <InlineMath math={"p"} />.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              In practice however, it is important to understand that no model
              achieves perfect calibration, but the main aim is to make sure
              that the classifier means what it says, and it does so a lot of
              times.
            </p>
            <h2 className={getHeadingClass(2)}>MSE vs Cross-Entropy</h2>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              At it's core, MSE measures the disparity or the difference between
              the model's predictions and the actual truth values. It is
              mathematically explained as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "\\text{MSE} = \\frac1N \\sum_{i=1}^N (\\hat{y}_i - y_i)^2 = \\mathbb{E}[(\\hat{y}  - Y)^2]"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              The <InlineMath math={"\\mathbb{E}"} /> term refers to the{" "}
              <b>expectation operator</b> which represents the average value of
              the expression inside it over all possible instances (
              <InlineMath math={"N"} /> in this case). It's really just a
              convenient way of representing the mean/average.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Given the context of classification, you could safely substitute{" "}
              <InlineMath math={"\\hat{y}"} /> representing the model's
              predicted values (logits) with <InlineMath math={"\\hat{p}"} />{" "}
              which represents the classifier's predicted probabilities. The
              ground truth <InlineMath math={"y"} /> stays the same, so it can
              be represented as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "\\text{MSE} = \\frac1N \\sum_{i=1}^N (\\hat{p}_i - y_i)^2 = \\mathbb{E}[(\\hat{p}  - Y)^2]"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              This is formally known as the <b>Brier Score</b>, but we'd get to
              that in a bit.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              The core principle behind this classification-esque form of MSE
              sounds a lot like the purpose of model calibration, which is to
              align the model's probabilistic predictions to the true empirical
              likelihoods, but there's a tiny caveat — MSE is a symmetrically
              quadratic loss function.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Unlike cross-entropy which is an asymmetric, non-quadratic loss
              that grows exponentially when the predicted probability is
              confidently wrong, MSE grows quadratically and penalizes errors in
              a symmetric fashion. That means it increases as the predicted
              probability deviates from the true likelihood, regardless of
              direction, and is minimized only when the predicted probability
              matches the actual empirical frequency. It's a proper scoring rule
              in that sense, but less punishing of confident errors than
              cross-entropy.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              For example, if a classifier predicts{" "}
              <InlineMath math={"\\hat{p}"} /> as <InlineMath>0.8</InlineMath>,
              and the true label <InlineMath>y</InlineMath> is 1, then the error
              is:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath math={"(0.8 - 1)^2 = 0.04"} />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              This is small because the model is confident in the only
              direction, but if the model predicts{" "}
              <InlineMath math={"\\hat{p}"} /> as <InlineMath>0.2</InlineMath>,
              then the error is:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath math={"(0.2 - 1)^2 = 0.64"} />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              The error is much worse, and much worse quadratically, therefore
              punished more heavily.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Cross-Entropy loss, on the other hand, works a bit differently,
              and in the case of core classification tasks (where it's mostly
              used), it affirms that not only wrong and confident predictions
              are punished, but wrong and confident predictions in the wrong
              direction are punished much more severely. For context,
              considering a binary cross-entropy loss (BCE) defined as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "\\text{BCE} = - \\left( y_i \\cdot \\log(\\hat{y_i}) + (1 - y_i) \\cdot \\log(1 - \\hat{y_i}) \\right)"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Predicting a <InlineMath math={"\\hat{p}"} /> value of{" "}
              <InlineMath>0.9</InlineMath> with a truth value{" "}
              <InlineMath>y = 1</InlineMath> would be:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath math={"-\\log(0.9) = 0.045"} />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              The loss in this case is much smaller because the classifier
              predicts a value which is closer to the positive class. But if it
              confidently predicted a value of <InlineMath>0.03</InlineMath>,
              then the loss would be:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath math={"-\\log(0.03) = 1.522"} />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              The loss is much larger because the classifier is confident in the
              wrong direction.
            </p>
            <h2 className={getHeadingClass(2)}>Global Average (Base Rate)</h2>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              As much as the measure of disparity explains the calibration
              extent, dealing within a classification scenario requires a
              default expectation for probabilistic values, and this where base
              rate or the global average comes in. I like to think of it as the
              proportion of instances that belong to the positive class without
              considering any additional context (context regarding to features
              in the feature space). Like a really dumb classifier trying its
              best to make a prediction (without considering the covariates).
              For more info, view my notes on{" "}
              <UnderlineLink href="https://obukofejoey.notion.site/Base-Rate-1f077c2a6513806a87e0e6d47e5e80be?source=copy_link">
                Base Rate
              </UnderlineLink>
              .
            </p>
            <h2 className={getHeadingClass(2)}>
              Decomposing the MSE Loss Function - The Main Intuition
            </h2>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              By itself, the MSE explains how much a model's predictions deviate
              from the truth values, but they don't explain why and quantify how
              "confident" the classifier is at making those specific
              predictions. To understand that, we have to decompose the original
              MSE loss, kind of like breaking it down further, and it's
              decomposed form is formally known as the{" "}
              <b>Expected Quadratic Loss</b>. It is mathematically explained as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "\\mathbb{E}[(\\hat{p} - Y)^2] = \\mathbb{E}[(\\hat{p} - \\pi(\\hat{p}))^2] - \\mathbb{E}[(\\pi(\\hat{p}) - \\bar{\\pi})^2] + \\bar{\\pi} (1 - \\bar{\\pi})"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              <InlineMath math={"\\mathbb{E}[(\\hat{p} - \\pi(\\hat{p}))^2]"} />{" "}
              is the <b>calibration term</b> which is the core calibration
              measure.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              <InlineMath
                math={"- \\mathbb{E}[(\\pi(\\hat{p}) - \\bar{\\pi})^2]"}
              />{" "}
              represents the <b>sharpness term</b> (also known as resolution)
              which captures how much the model's predictions differ from the
              base rate <InlineMath math={"(\\bar{\\pi})"} />.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              <InlineMath math={"\\bar{\\pi} (1 - \\bar{\\pi})"} /> indicates
              the
              <b> irreducible loss</b> denoting the noise in the data (one that
              can never be explained or eliminated by the classifier).
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              For a perfectly calibrated model, the calibration term is equal to{" "}
              <InlineMath>0</InlineMath> because the predicted probabilities
              perfectly match the empirical likelihoods (lower is better).
              Sharpness on the other hand captures the usefulness of the model,
              and this further depends on how well the model involves covariates
              as components to its learning. If it doesn't involve any, it'll
              predict the base rate <InlineMath math={"(\\bar{\\pi})"} /> for
              every instance and the sharpness score would be small, indicating
              a bland model (higher sharpness scores are better). For reference,
              covariates are simply the input features used for model training.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Alternatively, sharpness is large when the model's predictions are
              confidently far from the base rate.
            </p>
            <h2 className={getHeadingClass(2)}>
              Overconfident and Underconfident Models
            </h2>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              The main issue, however, is that there is a significant trade-off
              between calibration and sharpness, so maximizing one means
              sacrificing the other. Predicting the base rate{" "}
              <InlineMath math={"(\\bar{\\pi})"} /> for every instance affirms a
              100% match between the predictions and the true likelihoods, as
              the classifier is sure to always represent the ratio of the true
              positive outcomes over all other outcomes, leading to a perfectly
              calibrated model (denoted by a low calibration score), but it
              lacks significant sharpness. For any classifier to predict the
              base rate given any instance, it is most likely not taking any
              covariates into consideration and probably just playing it safe,
              thereby leading to an under-confident model. Visualizing the
              probabilities, under-confident models predict probabilities far
              away from the tails (<InlineMath>0</InlineMath> and{" "}
              <InlineMath>1</InlineMath>) and mostly clustered towards the
              center or around the base rate.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Most times, it doesn't always mean it's a bad classifier — it's
              just that it is hesitant in situations where it is a good decision
              guide. Assuming the base rate{" "}
              <InlineMath math={"(\\bar{\\pi})"} /> is{" "}
              <InlineMath>0.6</InlineMath>, think of an under confident model as
              one that predicts <InlineMath math={"\\hat{p} = 0.6"} /> for let's
              say a <InlineMath>100</InlineMath> samples, but{" "}
              <InlineMath>85</InlineMath> of them are actually of the positive
              class. What the classifier is saying is that it is only{" "}
              <InlineMath>60\%</InlineMath> sure, but in reality, it should be{" "}
              <InlineMath>85\%</InlineMath> sure, thereby downplaying its
              predictive capabilities by only expressing{" "}
              <InlineMath>60\%</InlineMath> certainty. In some cases, it's
              actually desirable, where an under-confident model would sort of
              not make aggressive and over-confident decisions (especially if
              they are wrong) but recommend second opinions, with the
              possibilities of them being right.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Unlike under-confident classifiers that predict conservative
              probabilistic values close to or equal to the base rate,
              over-confident classifiers predict extreme probabilities (closer
              to the tails of either <InlineMath>0</InlineMath> or{" "}
              <InlineMath>1</InlineMath>). For <InlineMath>100</InlineMath>{" "}
              samples, an over-confident classifier may assign a probabilistic
              confidence score of <InlineMath math={"\\hat{p} = 0.95"} /> for
              all <InlineMath>100</InlineMath> samples, but in reality, only{" "}
              <InlineMath>70</InlineMath> of them belong to the positive class.
              So it's kind of like the classifier affirming that it's{" "}
              <InlineMath>95\%</InlineMath> right, but in actuality, it's only
              right <InlineMath>70\%</InlineMath> of the time.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Over-confident classifiers are often characterized by a large
              sharpness score (as predictions are significantly far from the
              base rate), meaning the model isn't trying to play it safe and it
              aggressively makes predictions, but a "good" classifier is
              dependent on how small the calibration error is. For classifiers
              with high sharpness and high calibration error scores, it'd most
              likely make wrong and confident predictions, spiking the MSE score
              up. But for classifiers with high sharpness and low calibration
              error scores (indicating a well-calibrated model), it'd assign
              confident and accurate scores to instances, lowering the MSE score
              down.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Like the nuanced applications of under-confident models,
              over-confident models aren't inherently bad classifiers as well
              (context is classifiers with high sharpness and not-so-good
              calibration error scores — poorly calibrated classifiers). For
              example, if the classification task mostly relies on ranking
              samples by confidence rather than needing perfectly calibrated
              probabilities, then such classifiers are much more preferable.
              Because the sharpness is high, the predictions are spread apart
              (like aggressively predicting either <InlineMath>0.95</InlineMath>{" "}
              or <InlineMath>0.05</InlineMath>), meaning the ranking is more
              clear and substantial. The closest example I can think of is in
              recommendation systems, where items are sorted solely based on
              relevancy.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              It's super easy to misinterpret the MSE score without digging
              deeper, like two models could have the exact same MSE, but under
              the hood, one's under confident and the other is way too sure of
              itself. On the surface, they look equally "bad" (or "good"), but
              the reasons behind their errors are totally different. So, while
              the total score might match, one model might be missing the mark
              because it's too cautious (under confident), and the other because
              it's confidently wrong (over confident). So same score, totally
              different behaviors.
            </p>
            <h2 className={getHeadingClass(2)}>
              Confidence vs Performance: Calibration, Sharpness, Accuracy & AUC
            </h2>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Calibration can be thought of as "trustworthiness," which is a
              measure of how well the model probabilities align with reality,
              and this is represented by the state of the decision thresholds. I
              like to think of decision thresholds as how much of an advantage
              the classifier has to effectively make meaningful predictions
              across different classes. Sharpness, on the other hand, can be
              envisioned as "confidence," which is a measure of how far the
              predictions are from the hedging bets (conservative predictions
              explained by the base rate). A classifier with high sharpness
              means that it makes more confident predictions, which means better
              separation between classes, which further means a better AUC-ROC
              score as it focuses on the relative rankings between classes. Even
              if the model is not calibrated, a sharp model that gets the
              rankings right (e.g., positive samples have{" "}
              <InlineMath math={"\\hat{p} = 0.9"} /> and negative samples have{" "}
              <InlineMath math={"\\hat{p} = 0.1"} />) will score high in
              AUC-ROC. This rule only applies if the classifier gets its
              predictions right — that is, it is both confident and correct;
              otherwise, it'll tank the AUC-ROC score.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Usually, it's understandable to think that the same intuition
              applies for calibration <InlineMath>\rightarrow</InlineMath>{" "}
              accuracy relationships, but it's far trickier. A well-calibrated
              model doesn't directly optimize for accuracy, but it leads to
              better decision thresholds, which can be termed as a "significant
              predictive advantage" over poorly calibrated models. Weirdly
              enough, perfectly calibrated models can have mediocre accuracy,
              especially when they always predict the base rate. In such cases,
              the model is conservative, doesn't distinguish between any class
              at all, and is non-representative of the measure of accuracy,
              which is a threshold-dependent correctness score (more sensitive
              to model calibration).
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              To properly optimize for high accuracy (and high AUC-ROC score),
              the classifier must be well calibrated and confident (have a high
              sharpness score).
            </p>
            <h3 className={getHeadingClass(3)}>
              Calibration Curve (Reliability Diagram)
            </h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              To understand how calibrated a classifier is, we'd need to
              investigate the disparity between the predicted probabilities and
              the actual outcomes. One way to do that is by plotting a
              calibration curve (also known as the reliability diagram). It
              works by first binning the predictions (from{" "}
              <InlineMath math="0.0 - 0.1" /> to <InlineMath math="0.1 - 0.2" />{" "}
              up to <InlineMath math="1.0" />) and then plotting the average
              predicted probability (on the <InlineMath>x</InlineMath>-axis) vs.
              the true proportion of positives (on the{" "}
              <InlineMath>y</InlineMath>-axis).
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Before getting to the low-level details of how this curve is
              interpreted, a quick heads-up would help to sort of crystallize
              the main idea later on.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Sharpness is about how strong the model's opinions are, regardless
              of whether it is correct or not. Calibration, on the other hand,
              is about how correct the opinion is. So the reliability diagram
              doesn't directly show sharpness (how confident the model is), but
              it intuitively shows how "confidently miscalibrated" a classifier
              is relative to reality. If the curve exhibits a straight diagonal
              line from <InlineMath math="(0,0)" /> to{" "}
              <InlineMath math="(1,1)" />, then it's perfectly calibrated. If
              the curve floats above the diagonal line, the model is
              under-confident in how it is calibrated (less confident than it
              should be), and if the curve dangles below the diagonal line, then
              it is over-confident (more confident than it should be).
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              For a more concrete example, I tested this using two
              out-of-the-box models trained on a skewed multi-class dataset. In
              my recent experiments, both classifiers struggled to predict
              samples from the minority classes, which was perfect for this
              case, and let's just say I was humbled by the results. I totally
              expected the <InlineCode>LogisticRegression</InlineCode>{" "}
              classifier to be better calibrated out-of-the-box because it
              directly optimizes the cross-entropy loss, which is inherently a
              proper scoring rule for probability estimations, so you'd always
              almost get well-calibrated scores, but for some reason, the{" "}
              <InlineCode>RandomForestClassifier</InlineCode> seemed to be
              better calibrated based on the calibration curve.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              The <InlineCode>LogisticRegression</InlineCode> classifier
              struggled especially with the extreme minority class, where it was
              a tad underconfident at some point, then it spiked up (way above
              the diagonal line), before diving straight down into the
              overconfidence zone. This chaotic behavior is an indicator of how
              badly the classifier is doing — second-guessing for some
              predictions and being oddly and (mostly incorrectly) confident
              about others. For the{" "}
              <InlineCode>RandomForestClassifier</InlineCode>, however, it
              didn't really do too badly with the minority classes as it gently
              rode above the diagonal line, meaning it is underconfident but not
              to an extreme degree. This behavior was consistent across all
              minority classes, indicating that the classifier is doing a pretty
              good job given the context of consistency. Full code{" "}
              <UnderlineLink href="https://gist.github.com/JosephObukofe/46fb39736eff4f028a68090d36dea0aa">
                here
              </UnderlineLink>
              .
            </p>
            <h2 className={getHeadingClass(2)}>
              Calibration Evaluation Metrics
            </h2>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              While calibration plots are great for visualizing the calibrated
              properties of classifiers and showing where miscalibration occurs,
              a much better (and often simpler) way is to distill the main idea
              into a quantitive measure that explains the calibration extent,
              that is, "by how much" is the said classifier calibrated. Another
              merit of calibration evaluation metrics is that they can be reused
              as modular components in both training-time optimization and
              post-adopt ML systems, such as in model training (as a component
              in loss function minimization, although mostly nuanced) and
              monitoring model drifts in production.
            </p>
            <h3 className={getHeadingClass(3)}>
              Expected Calibration Error (ECE)
            </h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Theoretically, the Expected Calibration Error (ECE) is formally
              defined as the weighted average of the absolute difference between
              the average confidence and the true accuracy per bin, but in
              simpler terms, it's basically the combination of the per-bin
              errors. It is mathematically defined as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "\\text{ECE} = \\sum_{m=1}^{M} \\frac{|b_m|}{n} \\cdot \\left| \\text{acc}(b_m) - \\text{conf}(b_m) \\right|"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Where the accuracy per bin <InlineMath math="(\text{acc}(b_m))" />{" "}
              is given as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "\\text{acc}(b_m) = \\frac{1}{|b_m|} \\sum_{i \\in b_m} \\mathbf{1}(\\hat{y}_i = y_i)"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              For context, <InlineMath math="\mathbf{1}" /> is the indicator
              function that returns <InlineMath>1</InlineMath> if the condition
              is true and <InlineMath>0</InlineMath> otherwise.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              And the confidence per bin{" "}
              <InlineMath math="(\text{conf}(b_m))" /> is given as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "\\text{conf}(b_m) = \\frac{1}{|b_m|} \\sum_{i \\in b_m} \\hat{p}_i"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Determining the ECE starts by firstly binning the predicted
              probabilities, similar to the way the classifier's predictions on
              the <InlineMath>x</InlineMath>-axis of the calibration curve were
              defined (here). Each bin will then contain a subset of predictions
              whose confidence (predicted probability) falls into that bin's
              range. Next is to determine the average confidence per bin{" "}
              <InlineMath math="(\text{conf}(b_m))" />. Assuming the{" "}
              <InlineMath math="(\text{conf}(b_m))" /> for a given bin is, let's
              say, <InlineMath>0.805</InlineMath>, what it essentially means is
              that for that bin <InlineMath>(b_m)</InlineMath>, the classifier
              was <InlineMath>80.5\%</InlineMath> confident in its predictions.
              On the other hand, the accuracy per bin{" "}
              <InlineMath math="(\text{acc}(b_m))" /> is simply the fraction of
              correct predictions for that bin.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Say we thresholded our decision boundary to be{" "}
              <InlineMath>0.5</InlineMath> and our classifier predicted all
              instances (<InlineMath>5</InlineMath> in this case) within the bin
              to be of the positive class, but in actuality, only{" "}
              <InlineMath>3</InlineMath> of them were, the accuracy of the bin{" "}
              <InlineMath>(b_m)</InlineMath> would be{" "}
              <InlineMath>0.6</InlineMath>. What this means is that the model
              was actually correct only <InlineMath>60\%</InlineMath> of the
              time. By now, you should already be able to take a guess on how
              over-confident the model was in predicting instances in bin{" "}
              <InlineMath>(b_m)</InlineMath>. If our confidence score was less
              than the true accuracy measure, we would conclude that our
              classifier was under-confident in predicting instances in the bin.
              View code implementation{" "}
              <UnderlineLink href="https://gist.github.com/JosephObukofe/50a04e1ffdd1318f328da8489a54499a">
                here
              </UnderlineLink>
              .
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              One of the key limitations of the ECE score is that, because it's
              a single summary statistic that averages out all the per-bin
              errors, outlier bins with significantly worse calibration can be
              obscured if other bins are well-calibrated. The overall ECE score
              might still look decent, even though parts of the model's
              prediction spectrum are problematic. This issue is even more
              pronounced when a bin has very few samples. The high calibration
              error in such bins contributes very little to the final ECE due to
              the low weight assigned to that bin (based on bin size). In
              essence, ECE is sensitive to bin granularity and sample
              distribution.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              A more intuitive workaround is to use an adaptive variant of ECE
              (like Adaptive ECE), which creates bins that are equal in size in
              terms of sample count rather than fixed-width intervals. This
              helps mitigate the issue of sparse bins and gives a more balanced
              view of calibration across the dataset. For bin-specific
              evaluations however, it's often better to use calibration curves,
              as they visually highlight where the model is under-confident or
              over-confident across the probability spectrum. This makes it
              super easy to diagnose specific ranges where the model's
              uncertainty estimates are unreliable.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Another notable limitation is that ECE can't be used as a loss
              function during training because it's not differentiable. That
              means it can't be directly optimized via gradient-based methods.
            </p>
            <h3 className={getHeadingClass(3)}>
              Maximum Calibration Error (MCE)
            </h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Unlike the less discriminative behavior of ECE, which averages
              calibration errors across all bins, the Maximum Calibration Error
              (MCE) zeroes in on the single most problematic bin, that is, the
              one with the largest calibration gap, whether the model is
              severely under-confident or over-confident in that region. It
              measures the maximum absolute difference between predicted
              confidence and actual accuracy across all confidence bins,
              mathematically explained as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "\\text{MCE} = \\max_{m \\in \\{1,, M\\}} \\left| \\text{acc}(b_m) - \\text{conf}(b_m) \\right|"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              The determination of the MCE score follows the same step as the
              one for ECE, but in case of ECE where the weighted average is
              computed for all bins, MCE computes the maximum absolute
              calibration gap{" "}
              <InlineMath math="\rightarrow \left| \text{acc}(b_m) - \text{conf}(b_m) \right|" />{" "}
              (for the single most problematic bin). View code implementation{" "}
              <UnderlineLink href="https://gist.github.com/JosephObukofe/70312dc92f1603b7661393ab31e13418">
                here
              </UnderlineLink>
              .
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Like the ECE, MCE is also susceptible to larger bin numbers (and
              alternatively, small numbers of predictions per bin). This is
              because the more bins you use, the more likely you are to see
              outlier bins with high error values. It also doesn't reflect the
              overall calibration error but it's mainly used alongside the ECE
              to investigate and determine problematic bins. Similar to the ECE,
              it's also non-differentiable, so you can't use it as a loss
              function either.
            </p>
            <h3 className={getHeadingClass(3)}>Brier Score (MSE)</h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Recall the classification-esque form of the MSE we discussed
              earlier (here), where we replaced the{" "}
              <InlineMath math="\hat{y}" /> with <InlineMath math="\hat{p}" />{" "}
              to represent probabilistic values (the pre-decomposed MSE), that
              is the Brier Score. More formally, it measures the mean squared
              error between predicted probabilities and the actual outcomes, For
              a binary classification task, the Brier Score is mathematically
              defined as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "\\text{Brier Score} = \\frac{1}{N} \\sum_{i=1}^{N} (\\hat{p}_i - y_i)^2"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Where <InlineMath math="\hat{p}" /> is the predicted probability
              of the positive class and <InlineMath math="y" /> is the true
              label (<InlineMath>0</InlineMath> or <InlineMath>1</InlineMath>).
              For a multi-class scenario, it can be extended to:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "\\text{Brier Score} = \\frac{1}{N} \\sum_{i=1}^{N} \\sum_{k=1}^{K} (\\hat{p}_{i,k} - y_{i,k})^2"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Where <InlineMath math="\hat{p}_{i, k}" /> is the predicted
              probability for class <InlineMath>k</InlineMath> and{" "}
              <InlineMath math="y_{i, k}" /> resolves to{" "}
              <InlineMath>1</InlineMath> if true class is{" "}
              <InlineMath>k</InlineMath>, else <InlineMath>0</InlineMath>. It is
              implemented in code{" "}
              <UnderlineLink href="https://gist.github.com/JosephObukofe/e91d167c875b7a026d83f0e6e21317b0">
                here
              </UnderlineLink>
              .
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Because it is essentially a pre-decomposed form of the MSE, both
              calibration and sharpness measures are naturally accounted for.
              Unlike MCE and ECE measures that only reward lower calibration
              errors (lower is better), the Brier Score is a more holistic
              measure that rewards both correctness and confidence in a single
              quantitative value (lower is better, where the best possible score
              is <InlineMath>0</InlineMath>, indicating perfect calibration and
              sharpness).
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              It is also important to know that predicting conservative
              probabilities (the base rate, say <InlineMath>0.5</InlineMath>)
              tanks the Brier Score, as such a classifier is far from confident.
              Alternatively, if it confidently misclassifies an instance
              (predicting <InlineMath>0.99</InlineMath> for the wrong class),
              correctness drops, which also further hurts the score.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Thankfully, the Brier Score is differentiable, so it can be used
              as a loss function in training probabilistic classifiers, but this
              is usually a nuanced approach (as it is explicitly optimizing for
              calibrated probabilities). For core classification tasks, however,
              it is better to just stick with Cross-Entropy as a formal measure
              of confidently accurate predictions.
            </p>
            <h3 className={getHeadingClass(3)}>Brier Score vs Accuracy</h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              While the Brier Score is good, it doesn't tell much on its own
              without additional context. Sure, it merges the measures of
              calibration and sharpness into a single consolidated metric, but a
              classifier with a lower Brier Score might look good on paper,
              suggesting the model is well-calibrated and confident in its
              predictions. However, that alone doesn't reveal the full strength
              of the classifier. The key question remains — if these predictions
              are actually correct. The measure of accuracy answers this.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Combining the Brier Score with accuracy offers a more holistic
              view of the classifier's performance. Accuracy can be explained as
              a quality-agnostic measure, meaning it doesn't care about the
              quality (or the confidence) of predictions, but it shines in
              simply determining whether the predicted class is correct. For the
              Brier Score, even if your classifier predicts the correct class,
              it might get penalized if the confidence is too low or too high.
              So while Brier Score tells us how well the predictions match the
              actual likelihoods and the quality of those predictions, it
              doesn't account for the direction. This is where accuracy shines,
              and by limiting the accuracy measure to focus on the positive
              class, we can holistically understand how accurate and calibrated
              the classifier is in predicting instances of the positive class.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              In the code{" "}
              <UnderlineLink href="https://gist.github.com/JosephObukofe/93b1d51090720627797a8c1a5d6ff301">
                here
              </UnderlineLink>
              , the{" "}
              <code className={getInlineCodeClass()}>
                RandomForestClassifier
              </code>{" "}
              dominates both accuracy and the Brier Score measure, indicating
              that it correctly predicts more positive instances than the{" "}
              <InlineCode>LogisticRegression</InlineCode>, and the quality of
              its predictions are significantly better. For additional context,
              the code dealt in a multi-class scenario, but the main idea still
              applies. The only difference is that accuracy focuses on{" "}
              <InlineCode>np.argmax</InlineCode> (the class with the highest
              probability estimate, particularly from a softmax), and Brier
              Score penalizes miscalibrated estimates (and under or over
              confidence), even if <InlineCode>np.argmax</InlineCode> is
              correct. Since we have checked for calibration (where the{" "}
              <InlineCode>RandomForestClassifier</InlineCode> slightly
              overshoots the diagonal, but was still significantly better than
              the <InlineCode>LogisticRegression</InlineCode> at assigning
              probabilistic values that match the true empirical likelihoods),
              next is to investigate the true confidence level using
              confidence-based metrics (like ECE, MCE, or negative prediction
              entropy).
            </p>
            <h2 className={getHeadingClass(2)}>Sharpness Evaluation Metrics</h2>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Measuring sharpness is less about comparing predictions to actual
              labels and more about analyzing the spread or concentration of the
              predicted probabilities themselves. Intuitively, we can easily
              detect this measure by analyzing how "spread out" our predictions
              are. If they are clustered around the extremes (
              <InlineMath>0</InlineMath> and <InlineMath>1</InlineMath>), we can
              conclude that we are dealing with a very sharp classifier.
              Alternatively, if the classifier's predictions all float around
              the base rate, it is a less sharp one.
            </p>
            <h3 className={getHeadingClass(3)}>
              Distribution of Predicted Probabilities
            </h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              We can visualize this distribution by plotting a histogram of all
              the predicted probabilities. A classifier with high sharpness
              would show most probabilities clustered near{" "}
              <InlineMath>0</InlineMath> and <InlineMath>1</InlineMath> and a
              less sharp one would have a much flatter histogram with many
              values near <InlineMath>0.5</InlineMath>.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              This is mainly used as a visualization pairing with the
              calibration curve, as it tells you how confident the classifier
              really is.
            </p>
            <h3 className={getHeadingClass(3)}>
              Variance of Predicted Probabilities
            </h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              As a more quantitative measure, it's far easier to interpret the
              sharpness of a classifier as the variance of its probabilistic
              predictions. To complement the histogram, a high variance means
              the distribution is peaked (a sharp classifier), while a low
              variance means the distribution is flatter (more uncertain, thus a
              less sharp classifier).
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              For a binary classification task, we compute the variance
              (sharpness) of the predicted probabilities (of the positive class)
              across all samples as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "- \\mathbb{E}[(\\pi(\\hat{p}) - \\bar{\\pi})^2] = {s^2}(\\hat{p}) = \\frac{1}{N} \\sum_{i=1}^{N} (\\hat{p}_i - \\bar{p})^2"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Where <InlineMath math="\hat{p}_i" /> is the predicted probability
              of the positive class for sample <InlineMath math="i" /> and{" "}
              <InlineMath math="\bar{p}" /> is the mean predicted probability
              across all samples, given as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath math={"\\bar{p} = \\frac{1}{N} \\sum_{i=1}^{N} p_i"} />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              The main intuition (for a binary task) is that if the{" "}
              <InlineMath math="p_i" />
              's are mostly close to <InlineMath math="0.5" />, the variance
              will be low, which suggests that the classifier isn't making
              strong commitments. But if the <InlineMath math="p_i" />
              's are concentrated around <InlineMath math="0" /> or{" "}
              <InlineMath math="1" />, the variance increases, indicating a
              sharper (more confident) model.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              For a multi-class setting, predicted probabilities are now vectors
              over <InlineMath math="K" /> classes. To generalize the variance
              as a measure of sharpness, we can look at the average variance
              across the predicted probability vectors:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "- \\mathbb{E}[(\\pi(\\hat{p}_i) - \\bar{\\pi})^2] = {s^2}(\\hat{p}_i) = \\frac{1}{K} \\sum_{k=1}^{K} (\\hat{p}_{i,k} - \\bar{p}_i)^2 \\quad"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Where{" "}
              <InlineMath math="\hat{p}_i = [\hat{p}_{i,1}, \hat{p}_{i,2}, \dots, \hat{p}_{i,K}]" />{" "}
              is the probability vector for sample <InlineMath math="i" /> and
              the variance is computed over the components (i.e., over classes)
              with the mean predicted probability{" "}
              <InlineMath math="\hat{p}_i" />, given as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "\\bar{p}_i = \\frac{1}{K} \\sum_{k=1}^{K} \\hat{p}_{i,k}"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              For each sample, the sharper the distribution (i.e., closer to a
              one-hot vector), the higher the variance within the vector.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              A sharp classifier tends to assign a very high probability to one
              class and near-zero to others, yielding high variance per
              prediction vector. A flatter probability vector indicates
              uncertainty, thus lower variance and lower sharpness.
            </p>
            <h3 className={getHeadingClass(3)}>Negative Entropy</h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              The entropy of a model's predictions refers to its uncertainty, so
              in simple terms, high entropy means high uncertainty. If a
              classifier is very unsure (very uncertain) about its predictions,
              it spreads the probability across multiple classes, but if it is
              very sure, it spikes one class's probability (way more than the
              others), and lowers the rest.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              For binary classification tasks, entropy is explained as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "\\mathbb{H}(\\hat{p}) = - \\hat{p} \\log \\hat{p} - (1 - \\hat{p}) \\log (1 - \\hat{p})"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
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
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              In practice, entropy is calculated per sample on the probability
              distribution across all classes, so it's a measure of how
              uncertain the model is about that specific prediction. Where{" "}
              <InlineMath math="\hat{p}_k" /> is an <InlineMath math="(N, K)" />{" "}
              array with <InlineMath math="N" /> predictions and{" "}
              <InlineMath math="K" /> classes, the output is of shape{" "}
              <InlineMath math="(N, )" />, meaning one entropy score per
              prediction.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Negative entropy, on the other hand, reverses this intuition by
              simply flipping the sign, so a high negative entropy indicates a
              low entropy, further indicating low uncertainty and then high
              confidence. The same logic applies to lower negative entropy,
              which indicates high entropy, and then a high uncertainty, further
              denoting low confidence.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
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
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
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
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              The main idea is that we can directly translate negative entropy
              to confidence (higher is better), highlighting the model's
              sharpness. View implementation{" "}
              <UnderlineLink href="https://gist.github.com/JosephObukofe/425a56c95274e2c9e2a1e00a4a50b484">
                here
              </UnderlineLink>
              .
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              For a more intuitive interpretation, it's a good idea to always
              normalize the negative entropy so the value only exists between{" "}
              <InlineMath math="0" /> and <InlineMath math="1" />, where{" "}
              <InlineMath math="0" /> is the maximum entropy/minimum negative
              entropy (meaning the model is totally uncertain and may be
              stochastic in making predictions), and <InlineMath math="1" />{" "}
              means minimum entropy (indicating the model is completely
              confident). It is mathematically explained as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "\\frac{-\\mathbb{H}(\\hat{p}) + \\mathbb{H}_{\\text{max}}}{\\mathbb{H}_{\\text{max}}}"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Where <InlineMath math="\mathbb{H}_{\text{max}} = \log{(K)}" />
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              For reference, <InlineMath math="\log{(K)}" /> is the worst-case
              entropy which represents absolute uncertainty. View implementation{" "}
              <UnderlineLink href="https://gist.github.com/JosephObukofe/0d90909325fcb1e17251442c23ea2ef4">
                here
              </UnderlineLink>
              .
            </p>
            <h3 className={getHeadingClass(3)}>Negative Entropy vs Accuracy</h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              When accuracy is paired with the Brier Score, it tells us how
              "correct" each prediction is, as well as the quality of the said
              prediction. Quality on other hand can be decoupled to how well the
              predictions match the actual likelihoods and how "confident" the
              model was in making the said predictions.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              On the other hand, pairing accuracy with the negative entropy
              tells us how often the classifier is correct when it is confident,
              (or as its confidence grows). By plotting the per sample accuracy
              against the per sample negative entropy, a good classifier should
              yield an upward slope, indicating that low confidence means low
              accuracy, and high confidence means high accuracy, not the other
              way around.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              I tested this idea{" "}
              <UnderlineLink href="https://gist.github.com/JosephObukofe/0294daa28a0cb86b6bf371679dafda97">
                here
              </UnderlineLink>{" "}
              by plotting the correctness-per-prediction against the
              confidence-per-prediction (represented as the negative
              uncertainty) for the two classifiers -{" "}
              <InlineCode className={getInlineCodeClass()}>
                LogisticRegression
              </InlineCode>{" "}
              and{" "}
              <InlineCode className={getInlineCodeClass()}>
                RandomForestClassifier
              </InlineCode>{" "}
              as bar plots. The correctness (accuracy in this case) refers to
              binary accuracy per prediction and it is <InlineMath math="1" />{" "}
              if the predicted class is correct, that is if{" "}
              <InlineCode>np.argmax(p)</InlineCode>{" "}
              <InlineMath math="\rightarrow" /> <InlineCode>y_test</InlineCode>,
              and <InlineMath math="0" /> if otherwise. Each prediction bar was
              then represented as quantile bins grouped by similar model
              confidence levels, so essentially, the leftmost bin represents the
              one with the lowest confidence and the rightmost one is the one
              with the highest confidence. For a "good" classifier, the accuracy
              increases from bin to bin as you move from left to right, which
              was exactly the case for both classifiers (with the exception of a
              few bins showing an alternative result). It also indicated that I
              could trust both classifiers to a large extent, when they make
              confident predictions, although my choice leaned more to the{" "}
              <InlineCode>RandomForestClassifier</InlineCode>, as it had a
              better accuracy score overall (the bins were longer than that of
              the <InlineCode>LogisticRegression</InlineCode> classifier,
              indicating better correctness).
            </p>
            <hr className={getDividerClass()} />
            <h1 className={getHeadingClass(1)}>What I loved about this week</h1>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              For a really long time, I never fully understood what model
              calibration meant, more so, how to detect it and affirm that a
              classifier is mis-calibrated. This week, however, I got to
              understand the tiny, nuanced bits about it all, especially how it
              directly translates to the "confidence" and "correctness" of
              classifiers. It was also refreshing to see MSE in a different
              light, especially in the classification facet of ML and how it's
              decoupled form adds more context to the different forms of errors
              aside from the regular predicted <InlineMath math="\rightarrow" />{" "}
              actual disparity. I also got to see how over-confident and
              under-confident classifiers make predictions.
            </p>
            <h1 className={getHeadingClass(1)}>What's next?</h1>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Next, I want to explore calibration functions in detail as well to
              comprehensively understand where and how model calibration fits in
              building an ML system, especially as a post-adoption step after
              model training.
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
    },
    "week-21": {
      title: "Week 21 Recap",
      content: (
        <>
          <section
            className={getSectionClass({
              includeMarginTop: false,
              includeMarginBottom: true,
            })}
          >
            <h1 className={getHeadingClass(1)}>Model Calibration</h1>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              To affirm trustworthiness when making critical decisions in
              real-world systems, classification algorithms must not only be
              accurate, but also indicate when they are likely to be wrong —
              which is where the measure of “confidence” comes in. An
              algorithm’s prediction’s representativeness of the true empirical
              likelihoods is indicated by its calibrated confidence measure, and
              this is (and should be) used alongside the actual predictions to
              ensure the model is “aware” and means what it says when it does.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              It is also really important to note that model calibration is
              model-agnostic and a post-hoc step, so it’s essentially performed
              on a hold-out set, after the classifier has been trained and
              evaluated, and most calibration methods (if not all) adopt this
              approach. The main aim, however, is to align the trained
              classifier’s predictions with the true likelihoods.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Calibration is only important — and should be prioritized — if
              decisions are made based on probabilities and not just predicted
              classes. In simpler terms, calibration matters when the model
              outputs are not only represented as probabilistic estimates but
              also treated as such. For example, a patient with a 75% chance of
              developing cancer, or a transaction with a 60% chance of being
              fraudulent. These estimates inherently and subconsciously reflect
              the state of the real world, and in such cases, relying on a
              miscalibrated model to make these hefty decisions would be
              disastrous.
            </p>
            <h2 className={getHeadingClass(2)}>
              Parametric vs Non-Parametric Algorithms
            </h2>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Just a quick detour before we get to the main stuff — a parametric
              algorithm is one that has a fixed functional form, and the
              learnable components are just the model parameters. Typical
              examples of parametric functions are the Linear Regression that
              fits the data with a straight line defined by{" "}
              <InlineMath math={"y"} /> and <InlineMath math={"x"} /> and the
              Logistic Regression that fits the data with a logistic curve,
              defined by the sigmoid function on <InlineMath math={"y"} /> given
              as <InlineMath math={"\\sigma(y)"} />. The learnable bits of these
              guys are the slope/steepness <InlineMath math={"w"} /> and the
              bias term <InlineMath math={"b"} />, but the main essence of the
              algorithms are the rigid and pre-defined forms.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              The good thing about them is that they are super fast to fit, and
              really interpretable (you basically know the formula of the model
              already), but they make rigid assumptions so the data has to
              linear-ish to an extent for them to really shine. That said, they
              are mostly prone to underfitting, especially if the patterns are
              complex and hard to decipher.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Non-parametric algorithms don’t have a fixed functional form and
              do not commit to one, and they generally tend to just eyeball the
              patterns from the data directly. So you can’t simply represent
              them in a written form, and if you probably can, it is highly
              data-specific and can vary across different data sets to a very
              large extent. For example, the kNN algorithm — where it measures
              the relative (Euclidean or Manhattan) distance between instances
              and cluster centroids, and the Decision Tree algorithms that use a
              splitting criteria rather than a fixed formula. The main intuition
              is that they both infer the mathematical assumptions about the
              data as well as the model parameters to best “fit” the data. The
              awesome thing about these guys is that they are highly flexible
              and can fit datasets with weirdly shaped patterns, but the
              not-so-good thing about them is they take a considerable amount of
              time to make out these patterns, and when they do, they are highly
              prone to overfit it.
            </p>
            <h2 className={getHeadingClass(2)}>Piecewise Functions</h2>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              I like to think of piecewise functions as an extension of the
              “functional” part of parametric and non-parametric algorithms,
              where it consists of different expressions for varying inputs. So
              you’re essentially “piecing” together different expressions to
              respond to different inputs. In a much simpler sense, it’s saying{" "}
              <i>
                “from here to here, use this, then from here to there, use that”
              </i>
              . The good thing about these functions is that they solve the
              problems of aiming to fit complex data while staying interpretable
              at the same time, since each “piece” is a local rule about the
              overall function. Decision Trees implement this intuition where a
              tree has its own localized (and often interpretable) rule, and the
              decisions made by each tree are passed to the next with a
              different and pieced localized rule (criterion expression).
            </p>
            <h2 className={getHeadingClass(2)}>
              Criteria for Modern Calibration Functions
            </h2>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Given any calibration function, it must satisfy the following
              criteria:
            </p>
            <h3 className={getHeadingClass(3)}>
              Minimize a Proper Scoring Rule
            </h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              A strictly proper scoring rule is essentially a loss function,
              which in this case should be minimized to reflect the true state
              of the probability distribution. By implementing such, the
              calibration function is sure to converge to the true conditional
              probabilities, which is the whole point of model calibration. In
              other words, when you use a strictly proper scoring rule, you’re
              encouraging the model not just to predict the right class, but to
              be honest about how confident it is.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              A typical proper scoring rule is the Brier Score, as it behaves a
              lot like a calibration-focused loss function by penalizing
              probability estimates that are off.
            </p>
            <h3 className={getHeadingClass(3)}>Monotonic</h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              A monotonic function preserves the ranking of predictions, and
              these rankings are defined by the strength of the probabilistic
              estimates, so if the classifier says class A has a higher
              probability estimate than class B (A ranking relatively higher
              than B), then the calibration function must not flip the order. In
              essence, the AUC-ROC score must not change (as it quantitatively
              explains the relative rankings of the model predictions, with a
              higher score indicating more clear class distinctions).
            </p>
            <h3 className={getHeadingClass(3)}>Flexible (Non-Parametric)</h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Most times, miscalibration may not always be represented
              parametrically (in a fixed functional form), as the classifier may
              have a mix of both over-confident and under-confident traits all
              bundled up together in a messy way. To essentially “fit” to these
              messy patterns, it is the requirement of the calibration function
              to be nonparametric.
            </p>
            <h3 className={getHeadingClass(3)}>Trained on Independent Data</h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              It is always a good idea to leave out a hold-out set, completely
              different from training and test sets (and even validation sets),
              specifically for model calibration. Because calibration functions
              are sort of isolated learners that shouldn’t be used on the same
              training set (already used by the actual classifier that needs to
              be calibrated), as you might risk the function “over-correcting”
              the classifier, making it way more overconfident or even
              underconfident than before.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              For simplicity, focusing on binary classification tasks, our goal
              is to produce a calibrated probability <InlineMath math={"q_i"} />{" "}
              (or <InlineMath math={"p"} />) for a given instance{" "}
              <InlineMath math={"x_i"} />, by implementing a calibration
              function <InlineMath math={"f(x)"} /> that takes in the predicted
              probability <InlineMath math={"p_i"} /> of{" "}
              <InlineMath math={"y_1 = 1"} /> (belonging to the positive class){" "}
              <InlineMath math={"\\rightarrow f(p_i)"} />, further derived from
              the classifier’s non-probabilistic output{" "}
              <InlineMath math={"z_i \\in \\mathbb{R}"} />, by using a sigmoid
              function (sigmoid), given as <InlineMath math={"\\sigma(z_i)"} />.
            </p>
            <h3 className={getHeadingClass(3)}>Histogram Binning</h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              This calibration method starts by splitting the classifier’s
              predicted probabilities <InlineMath math={"p_i"} /> into{" "}
              <InlineMath math={"M"} /> mutually exclusive and often quantile
              (equal sample-distributed) bins. For each bin{" "}
              <InlineMath math={"bm"} />, we then compute the number of samples,
              the empirical accuracy (also known as the calibrated score{" "}
              <InlineMath math={"\\theta_m"} />) and the average predicted
              probability (confidence). As a refresher, these guys are what are
              used to construct the reliability diagram explained in the
              previous week (here), where the confidence per bin{" "}
              <InlineMath math={"(\\text{conf}(bm))"} /> is on the{" "}
              <InlineMath math={"x"} />
              -axis and the empirical accuracy{" "}
              <InlineMath math={"(\\text{acc}(bm))"} /> is on the
              <InlineMath math={"y"} />
              -axis.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Once we define all these parameters for all bins{" "}
              <InlineMath math={"(1...M)"} />, we then replace{" "}
              <InlineMath math={"\\hat{p}"} /> with the calibrated score
              assigned to the bin where <InlineMath math={"\\hat{p}"} /> is
              originally located at. Basically, if{" "}
              <InlineMath math={"\\hat{p}_i"} /> is located at{" "}
              <InlineMath math={"b_2"} />, then{" "}
              <InlineMath math={"\\hat{q}_i = \\theta_2"} /> for{" "}
              <InlineMath math={"\\hat{p}_i"} />. At inference, this intuition
              also applies where for{" "}
              <InlineMath math={"\\hat{p}_{text{inf}}"} /> located at{" "}
              <InlineMath math={"b_2"} />, then{" "}
              <InlineMath math={"\\hat{q}_{text{inf}} = \\theta_2"} />. The
              predictions <InlineMath math={"\\theta_i"} /> are chosen to
              minimize the bin-wise squared loss given as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath math={"................."} />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Where ...
            </p>
            <h3 className={getHeadingClass(3)}>
              Bayesian Binning into Quantiles
            </h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              ...
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              ...
            </p>
            <h3 className={getHeadingClass(3)}>Isotonic Regression</h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              The isotonic regression calibration function maps uncalibrated
              predicted probabilities (which might be overly optimistic or
              pessimistic) to the true probability distribution by learning and
              fitting a purely monotonically increasing non-parametric function
              to the set of data points (<InlineMath math={"\\hat{p}"} /> and{" "}
              <InlineMath math={"y"} />
              ). Because it is a non-decreasing monotonic function, it can be
              termed as a “stepwise” calibration technique. More importantly, it
              completely avoids the relative rankings of predictions and only
              tackles the confidence estimates, and it does so by minimizing the
              square loss (for each instance <InlineMath math={"x_i"} />) given
              as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath math={"................."} />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Where ...
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              By minimizing this scoring rule, only the confidence estimates are
              modified.
            </p>
            <h3 className={getHeadingClass(3)}>Platt Scaling</h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              This is a parametric approach to calibration as opposed to the
              other non-parametric options, and it fits a sigmoid function on
              the model’s predictions to map them to better-calibrated
              probabilities. But here’s the catch, it doesn’t exactly align
              probability to probability; it transforms the model’s raw score
              (logit) by fitting its own logistic function to it. So rather than
              using a classifier’s predicted confidence scores (probabilities),
              you take the pre-sigmoid forms and use them as single input
              (scalar) features to Platt’s sigmoid function — more or less
              swapping the original sigmoid with one much suited for
              calibration.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Practically speaking, given the sigmoid function for a binary
              classifier as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath math={"\\hat{y}_i = \\sigma(wx_i + b)"} />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Platt’s sigmoid is explained as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath math={"\\hat{q}_i = \\sigma(az_i + b)"} />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Where <InlineMath math={"a"} /> and <InlineMath math={"b"} /> are
              its learnable parameters{" "}
              <InlineMath math={"a,b \\in \\mathbb{R}"} />, with{" "}
              <InlineMath math={"a"} /> corresponding to the scalar scale factor
              (how steep the curve is) like the gradient term{" "}
              <InlineMath math={"(w)"} /> in the regular logistic equation that
              defines the steepness, and <InlineMath math={"b"} /> referring to
              the general bias term (present in both variations). The model’s
              raw output values (logits) are explained by the{" "}
              <InlineMath math={"z_i"} /> term.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
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
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
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
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              The main intuition is fitting a sigmoid transformation over raw
              scores to squash them into well-calibrated probabilities.
            </p>
            <h2 className={getHeadingClass(2)}>Multiclass Extensions</h2>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Platt scaling, like any other parametric calibration function, is
              inherently binary, which means it doesn’t natively handle
              multi-class probability vectors out of the box.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              In a multi-class setting, the model output is a vector of
              probabilities (from a softmax layer), one for each class, and
              simply applying Platt scaling directly to this vector doesn’t
              really make sense, as there’s no single logit to calibrate, but
              rather a whole set of interdependent scores. As a result,
              extending Platt scaling to multiclass problems requires a
              workaround.
            </p>
            <h3 className={getHeadingClass(3)}>Platt Scaling + OvR</h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              One common way of extending these calibration functions to a
              multi-class classification setting is by treating it as a{" "}
              <InlineMath math={"K"} />
              One-vs-Rest classification problem. So for{" "}
              <InlineMath math={"K"} /> classes,{" "}
              <InlineMath math={"k = 1,…,K"} />, <InlineMath math={"K"} />{" "}
              separate binary calibration functions are initialized and fitted
              to a hold-out set, and each one solely focuses on labels{" "}
              <InlineMath math={"y_i = 1"} /> (probabilistic estimates of
              belonging to the positive class) if the instance truly belongs to
              class <InlineMath math={"k"} />, else <InlineMath math={"0"} />.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              More intuitively, assuming we have raw logits{" "}
              <InlineMath math={"z_i"} /> (from a softmax function or
              pre-softmax scores for Platt Scaling), given as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={"z_i = [z_i^{(1)}, z_i^{(2)}, \\ldots, z_i^{(K)}]"}
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              To calibrate with Platt Scaling, for each class{" "}
              <InlineMath math={"k"} />, you’d essentially fit:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={"\\hat{q}_i^{(k)} = \\sigma(a_k \\cdot z_i^{(k)} + b_k)"}
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              To then normalize them (get a valid probability distribution that
              sums to <InlineMath math={"1"} />
              ), we’d implement a softmax transformation defined as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "\\tilde{q}_i^{(k)} = \\frac{\\hat{q}i^{(k)}}{\\sum{j=1}^{K} \\hat{q}_i^{(j)}}"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              This then gives us a much more interpretable multi-class
              calibration probability distribution.
            </p>
            <h3 className={getHeadingClass(3)}>Temperature Scaling</h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              In binary calibration tasks, we implemented the sigmoid function
              (specifically Platt’s sigmoid) to output a well-calibrated
              probability distribution, and intuitively, we could sort of
              implement the same logic and apply a “Platt softmax” for
              multi-class cases, but softmax has a weird way of amplifying
              confidences, making the classifier’s prediction seem more
              overconfident than it actually is.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              To better understand this behavior, let’s say a classifier outputs
              a vector of logits{" "}
              <InlineMath math={"z_i = [z_1, z_2, ldots, z_K]"} /> for a{" "}
              <InlineMath math={"K"} />
              -class classification problem. Softmax does what it does best and
              normalizes them such that each element in the vector corresponds
              to a certain class, and the higher the probability, the more
              “confident” the classifier is about that class it represents. In
              essence, the higher the logit, the bigger its exponential.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              The problem is, due to this normalization, each class’ probability
              is affected by all other class logits due to something called{" "}
              <b>relative difference</b>. Assuming the classifier outputs these
              logit scores for the three classes <InlineMath math={"z_1"} />,{" "}
              <InlineMath math={"z_2"} />
              , and <InlineMath math={"z_K"} />:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath math={"z_i = [3.0, 2.8, 2.7]"} />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Noticeably, the relative difference between them is very small
              <InlineMath math={"(\\approx 0.2)"} />, but applying a softmax
              transformation would yield:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath math={"\\hat{p}_i \\approx [0.390, 0.319, 0.289]"} />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Now the model is about <InlineMath math={"40\\%"} /> confident in
              the first class, while the others are tapered off more
              significantly (
              <InlineMath math={"32\\%"} /> and <InlineMath math={"29\\%"} />
              ), even though the differences in the original logits were tiny.
              This behavior is even more prominent if the logits have a
              significantly higher relative difference, that is, one class has a
              way higher score than the others, like in this logit{" "}
              <InlineMath math={"z_i"} />:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath math={"z_i = [8.0, 2.0, 1.0]"} />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              The transformed vector then yields:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath math={"\\hat{p}_i \\approx [0.997, 0.002, 0.001]"} />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              This behavior is known as <b>exaggerated uncertainty</b>, and the
              reason is due to the exponential function. Exponential functions
              are notorious for growing really fast, so when you apply the
              softmax normalization, small differences in logits turn into big
              confidence gaps. Plus, softmax is a weird squashing function that
              tries to assign as much probability mass as possible to the
              largest logit, making it inherently “sharp”. It’s kind of similar
              to the main intuition in PCA, where it compresses representational
              complexity into a small orthogonal space and they both answer the
              question of{" "}
              <i>“what is the most important out of this information”</i> and
              emphasize what they find is important.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              To better understand this behavior, you could plot the relative
              logit difference against the softmax transformed logits like I did
              (here). Notice how sharp the curve …
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              To even make matters worse, the cross entropy loss function (CCE
              for multi-class) reinforces this behavior and further encourages
              the model to assign a <InlineMath math={"100\\%"} /> confidence to
              the “correct” class, by pushing{" "}
              <InlineMath math={"\\hat{p}_i \\rightarrow 1"} />. This occurs
              during model training where the softmax “learns” to minimize the
              cross entropy loss by transforming the widened logit gap.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Given the context and aim of model calibration, however, this
              behavior is a big no-no as overconfident predictions have a large
              tendency to be misaligned. This is where temperature scaling is
              implemented — to smoothen the sharpness of softmax. Like every
              other calibration function, it doesn’t change the predicted labels
              nor swap the rankings; it just affects the prediction’s confidence
              scores.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              At it’s core, temperature scaling introduces a scalar parameter
              known as the temperature <InlineMath math={"(T)"} /> to the
              original softmax function given as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "\\hat{q}_i^{(k)}= \\frac{\\exp(z_i^{(k)} / T)}{\\sum{j=1}^{K} \\exp(z_i^{(j)} / T)}"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Where <InlineMath math={"T > 0"} />. If{" "}
              <InlineMath math={"T > 1"} />, it makes the output distribution
              more smoother (less confident), and if{" "}
              <InlineMath math={"T < 1"} />, the distribution would be more
              sharper (more confident). Expectedly,{" "}
              <InlineMath math={"T = 1"} /> is the same as your regular softmax,
              so <InlineMath math={"T"} /> in this case is the learnable bit of
              the calibration function. <InlineMath math={"z_i^{(k)}"} /> is the
              logit for class <InlineMath math={"k"} /> for example
              <InlineMath math={"i"} /> and{" "}
              <InlineMath math={"\\hat{q}_i^{k}"} /> is the calibrated class
              probability.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Given the overconfident classifier’s predictions as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath math={"z_i = [8.0, 2.0, 1.0]"} />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              If we used a <InlineMath math={"T"} /> value of{" "}
              <InlineMath math={"5"} />, each logit is then divided by{" "}
              <InlineMath math={"T"} /> and it becomes:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath math={"z_i = [1.6, 0.4, 0.2]"} />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Then the new softmax becomes:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath math={"\\hat{q}_i \\approx [0.65, 1.94, 1.59]"} />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Same ranking, but a more reasonable confidence spread (smaller
              relative logit difference).
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Essentially, this satisfies the parametricity criteria because the
              softmax function (with <InlineMath math={"T"} />) is a fixed
              functional form (you can write it down on a piece of paper, plus
              it hardly changes)
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              The process of training <InlineMath math={"T"} /> starts by using
              a trained non-probabilistic model to get the logits{" "}
              <InlineMath math={"z_i"} /> on a held-out set, then applying the
              modified softmax transformation with <InlineMath math={"T"} />. We
              then define the cross-entropy loss between these probabilities and
              the true labels:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "\\text{CCE} = - \\sum_{i=1}^{C} y_i \\cdot \\log(\\hat{q}_i)"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Lastly, we optimize <InlineMath math={"T"} /> using gradient
              descent to minimize this loss. Most importantly, only{" "}
              <InlineMath math={"T"} /> is updated at this point, while the
              model’s actual weights are frozen.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Alternatively, for more nuanced use-cases, temperature scaling can
              be reversed to make the model more “sharp” (more confident than it
              actually is). This is done by maximizing the sharpness of the
              softmax distribution via low temperature values, that is, by
              setting the temperature parameter <InlineMath math={"T < 1"} />.
              Lower temperatures exaggerate the differences between class
              logits, causing the softmax output to become more peaked around
              the highest logit.
            </p>
            <h3 className={getHeadingClass(3)}>Vector Scaling</h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              This is a more expressive extension of temperature scaling, and it
              provides added flexibility over the mostly rigid scalar values
              used by the temperature scaling method. Plus, temperature scaling
              mostly shines when each class is equally miscalibrated (denoted by
              the scalar operation on the logit vector), but it sucks when the
              predictions are both pessimistic and optimistic, that is, the
              classifier is overly sure of some classes and less confident about
              others.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              To tackle this, the vector scaling method is implemented. It
              basically calibrates each class’ logit independently, as opposed
              to the one for all technique — not My Hero Academia intended ; ).
              Mathematically explained as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath math={"\\hat{p}_i = \\text{softmax}(az_i + b)"} />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Where <InlineMath math={"a, a \\in \\mathbb{R}^K"} /> is a vector
              of learnable scaling parameters, and{" "}
              <InlineMath math={"b, b \\in \\mathbb{R}^K"} /> is a vector of
              learnable bias terms. So each class <InlineMath math={"k"} /> gets
              its own transformation given as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={"z_i^{(k)} \\mapsto a_k \\cdot z_i^{(k)} + b_k"}
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Noticeably, the formula looks weirder at every chance you look at
              it — it is using a softmax transformation for steepness and bias
              (which are typically transformed using a sigmoid function), and it
              appears to be a linear transformation of <InlineMath math={"x"} />
              . This is an intentional behavior, however, to affirm stability.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              As opposed to its explicit definition, vector scaling does not
              necessarily use different temperature values to tweak each logit
              in a logit vector one-by-one, and manually doing this would
              introduce nonlinearity. Still, it is a known valid method defined
              as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "\\hat{p}_i^{(k)} = \\frac{\\exp\\left(z_i^{(k)} / T_k\\right)}{\\sum_j \\exp\\left(z_i^{(j)} / T_j\\right)}"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Here, each logit is scaled by its own temperature, but the catch
              is that it is highly unstable and difficult to learn each logit’s{" "}
              <InlineMath math={"T"} /> value independently.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              What vector scaling actually does in practice is to pass
              affine-transformed logits to the softmax function. For more
              context, an affine transformation is a linear transformation
              followed by a translation, explained as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath math={"f(x) = Ax + b"} />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Where <InlineMath math={"A, A \\in \\mathbb{R}^{m \\times n}"} />{" "}
              is a matrix that represents the linear component, and it is
              responsible for scaling and rotation (by horizontal and vertical
              shearing), and <InlineMath math={"b, b \\in \\mathbb{R}^m"} /> is
              a vector that represents the translation component responsible for
              shifting. Basically, the vertices in <InlineMath math={"A"} /> and{" "}
              <InlineMath math={"b"} />
              are some sort of dials that transforms the input vector{" "}
              <InlineMath math={"x, x \\in \\mathbb{R}^n"} />.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
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
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              For vector scaling, <InlineMath math={"A"} /> is represented as a
              diagonal matrix that transforms <InlineMath math={"x"} /> by only
              scaling in the <InlineMath math={"x"} />,{" "}
              <InlineMath math={"y"} /> and <InlineMath math={"z"} /> direction
              (no shearing), and it is given as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "A = \\begin{bmatrix} a_1 & 0 & 0 \\\\ 0 & a_2 & 0 \\\\ 0 & 0 & a_3 \\end{bmatrix}"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Then the bias vector <InlineMath math={"b"} />:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "b = \\begin{bmatrix} b_1 \\\\ b_2 \\\\ b_3 \\end{bmatrix}"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
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
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              This affine-transformed logit is then passed through the softmax
              function that squashes it into a probability distribution. The
              learnable bits in this case are the diagonal entries in the matrix{" "}
              <InlineMath math={"A"} /> and the bias terms in the vector{" "}
              <InlineMath math={"b"} /> (one bias per class). They are then
              trained by freezing the base classifier’s weights, and optimizing{" "}
              <InlineMath math={"A"} /> and <InlineMath math={"b"} /> to
              minimize the cross entropy loss on a held-out calibration set.
            </p>
            <h3 className={getHeadingClass(3)}>Matrix Scaling</h3>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Where vector scaling adds class-wise flexibility with scale and
              bias for each class, matrix scaling goes fully expressive by
              replacing the diagonal matrix <InlineMath math={"A"} /> with a
              full-entry weight matrix <InlineMath math={"W"} /> with learnable
              capabilities for all members. Also, logits aren’t just scaled
              independently across classes, but there’s a sense of inter-class
              correlation where each logit’s calibrated value can depend on all
              original logits (as defined by the weight matrix{" "}
              <InlineMath math={"W"} />
              ).
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
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
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              In the case of vector scaling, we shrunk the transformation to
              only focus on the steepness terms{" "}
              <InlineMath math={"(a_1, a_2, a_3)"} /> in the form of:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "A = \\begin{bmatrix} a_1 & 0 & 0 \\\\ 0 & a_2 & 0 \\\\ 0 & 0 & a_3 \\end{bmatrix} \\begin{bmatrix} z_1 \\\\ z_2 \\\\ z_3 \\end{bmatrix}"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              But for matrix scaling, we’d apply individual weight terms per
              member given as:
            </p>
            <div className={getMathBlockClass()}>
              <BlockMath
                math={
                  "Wz_i + b = \\begin{bmatrix} w_{11} & w_{12} & w_{13} \\\\ w_{21} & w_{22} & w_{23} \\\\ w_{31} & w_{32} & w_{33} \\end{bmatrix} \\begin{bmatrix} z_1 \\\\ z_2 \\\\ z_3 \\end{bmatrix}"
                }
              />
            </div>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              In this case, each calibrated logit is a weighted sum of all
              original logits + its bias. this sums up to{" "}
              <InlineMath math={"K^2 + K"} /> parameters, which is very high
              compared to vector scaling which only consists of{" "}
              <InlineMath math={"2K"} /> parameters.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              Because we're tackling each logit independently, it allows for a
              more explicit calibration, and it shines in cases where the
              classifier is both over-confident and under-confident in its class
              predictions. The downside is that the number of parameters
              explodes with <InlineMath math={"K^2 + K"} />, especially when{" "}
              <InlineMath math={"K"} /> is large, leading to severe overfitting
              issues. Due to this large number of parameters, it is also very
              computationally expensive to implement.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              That said, it feels like the final boss of parametric calibration
              functions, especially where each independent logit has a well
              defined and referenced functional representation.
            </p>
            <p
              className={getParagraphClass({ responsive: true, muted: false })}
            >
              ...
            </p>
            <div>
              <Component />
            </div>

            <div>
              <BarPlotChart data={data} xKey="week" yKey="hours" />
            </div>
            <div>
              <HorizontalBarPlotChart data={data} xKey="week" yKey="hours" />
            </div>
            <div>
              <StackedBarPlotChart
                data={stackedBarData}
                xKey="month"
                yKeys={["productA", "productB", "productC"]}
              />
            </div>
            <div>
              <LinePlotChart data={lineChartData} xKey="month" yKey="users" />
            </div>
            <div>
              <AreaPlotChart data={lineChartData} xKey="month" yKey="users" />
            </div>
            <div>
              <MultiLinePlotChart
                data={multiLineChartData}
                xKey="date"
                yKeys={yKeys}
              />
            </div>

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
    },
    "week-22": {
      title: "Week 22 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
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
        </>
      ),
    },
    "week-23": {
      title: "Week 23 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
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
        </>
      ),
    },
    "week-24": {
      title: "Week 24 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
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
        </>
      ),
    },
    "week-25": {
      title: "Week 25 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
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
        </>
      ),
    },
    "week-26": {
      title: "Week 26 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
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
        </>
      ),
    },
    "week-27": {
      title: "Week 27 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
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
        </>
      ),
    },
    "week-28": {
      title: "Week 28 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
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
        </>
      ),
    },
    "week-29": {
      title: "Week 29 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
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
        </>
      ),
    },
    "week-30": {
      title: "Week 30 Recap",
      content: (
        <>
          <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
            Deployment & Optimization
          </h2>
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
        </>
      ),
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
      <div className="space-y-4">{recap.content}</div>
    </section>
  );
}
