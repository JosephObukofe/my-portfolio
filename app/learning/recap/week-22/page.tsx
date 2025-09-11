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
import { InlineMath, BlockMath } from "react-katex";
import { InlineCode } from "@/app/components/ui/inline-code";
import { UnderlineLink } from "@/app/components/ui/underline-link";
import { WeekInfo } from "@/app/components/ui/week-info";
import { BarPlotChart } from "@/app/components/ui/barplot";
import { HorizontalBarPlotChart } from "@/app/components/ui/horizontalbarplot";
import { LinePlotChart } from "@/app/components/ui/lineplot";
import { AreaPlotChart } from "@/app/components/ui/areaplot";
import { RadarPlotChart } from "@/app/components/ui/radarplot";
import { MultiLinePlotChart } from "@/app/components/ui/multilineplot";
import { StackedVerticalBarChart } from "@/app/components/ui/stackedbarplot";
import { StackedHorizontalBarChart } from "@/app/components/ui/horizontalstackedbarplot";

const data = [
  { week: "Week 1", hours: 12 },
  { week: "Week 2", hours: 9 },
  { week: "Week 3", hours: 15 },
  { week: "Week 4", hours: 7 },
];

const classSupport = [
  { class: "Class 0", support: 55000 },
  { class: "Class 1", support: 18000 },
  { class: "Class 2", support: 12000 },
  { class: "Class 3", support: 7000 },
  { class: "Class 4", support: 4000 },
  { class: "Class 5", support: 2000 },
  { class: "Class 6", support: 1200 },
  { class: "Class 7", support: 800 },
  { class: "Class 8", support: 500 },
  { class: "Class 9", support: 300 },
];

const samplesPerDimension = [
  { class: "Class 0", samples: 1222.22 },
  { class: "Class 1", samples: 400.0 },
  { class: "Class 2", samples: 266.67 },
  { class: "Class 3", samples: 155.56 },
  { class: "Class 4", samples: 88.89 },
  { class: "Class 5", samples: 44.44 },
  { class: "Class 6", samples: 26.67 },
  { class: "Class 7", samples: 17.78 },
  { class: "Class 8", samples: 11.11 },
  { class: "Class 9", samples: 6.67 },
];

const samplesPerCluster = [
  { class: "Class 0", samples: 13750 },
  { class: "Class 1", samples: 4500 },
  { class: "Class 2", samples: 3000 },
  { class: "Class 3", samples: 1750 },
  { class: "Class 4", samples: 1000 },
  { class: "Class 5", samples: 500 },
  { class: "Class 6", samples: 300 },
  { class: "Class 7", samples: 200 },
  { class: "Class 8", samples: 125 },
  { class: "Class 9", samples: 75 },
];

const linearClassifierParams = [
  { classifier: "LR (OvR)", parameters: 567 },
  { classifier: "Poly LR", parameters: 2847 },
];

const generativeClassifierParams = [
  { classifier: "GNB", parameters: 125 },
  { classifier: "GMM", parameters: 1394 },
];

const marginClassifierParams = [
  { classifier: "SVC (Lin)", parameters: 432 },
  { classifier: "SVC (Poly)", parameters: 789 },
  { classifier: "SVC (RBF)", parameters: 651 },
];

const treeClassifierParams = [
  { classifier: "Dec Tree", parameters: 287 },
  { classifier: "Rand For", parameters: 18642 },
  { classifier: "XGBoost", parameters: 12394 },
  { classifier: "LightGBM", parameters: 9573 },
  { classifier: "SEns", parameters: 42158 },
];

const classifierTrainingTimeData = [
  {
    id: 1,
    name: "Log Reg (OvR)",
    trainingTimeSeconds: 2.847,
    trainingTimeMs: 2847,
  },
  {
    id: 2,
    name: "Poly Log Reg",
    trainingTimeSeconds: 15.392,
    trainingTimeMs: 15392,
  },
  {
    id: 3,
    name: "GNB",
    trainingTimeSeconds: 0.582,
    trainingTimeMs: 582,
  },
  {
    id: 4,
    name: "GMM",
    trainingTimeSeconds: 8.146,
    trainingTimeMs: 8146,
  },
  {
    id: 5,
    name: "SVC (Linear)",
    trainingTimeSeconds: 42.739,
    trainingTimeMs: 42739,
  },
  {
    id: 6,
    name: "SVC (Polynomial)",
    trainingTimeSeconds: 42.739,
    trainingTimeMs: 42739,
  },
  {
    id: 7,
    name: "SVC (RBF)",
    trainingTimeSeconds: 42.739,
    trainingTimeMs: 42739,
  },
  {
    id: 8,
    name: "Dec Tree",
    trainingTimeSeconds: 42.739,
    trainingTimeMs: 42739,
  },
  {
    id: 9,
    name: "Rand For",
    trainingTimeSeconds: 42.739,
    trainingTimeMs: 42739,
  },
  {
    id: 10,
    name: "XGBoost",
    trainingTimeSeconds: 42.739,
    trainingTimeMs: 42739,
  },
  {
    id: 11,
    name: "LightGBM",
    trainingTimeSeconds: 42.739,
    trainingTimeMs: 42739,
  },
  {
    id: 12,
    name: "StackedEns",
    trainingTimeSeconds: 42.739,
    trainingTimeMs: 42739,
  },
];

const classifierEvaluationPostTrainingData = [
  {
    id: 1,
    name: "Log Reg (OvR)",
    macroAccuracy: 0.92,
    weightedAccuracy: 0.92,
    topkAccuracy: 0.92,
    macroaucroc: 0.92,
  },
  {
    id: 2,
    name: "Poly Log Reg",
    macroAccuracy: 0.92,
    weightedAccuracy: 0.92,
    topkAccuracy: 0.92,
    macroaucroc: 0.92,
  },
  {
    id: 3,
    name: "GNB",
    macroAccuracy: 0.92,
    weightedAccuracy: 0.92,
    topkAccuracy: 0.92,
    macroaucroc: 0.92,
  },
  {
    id: 4,
    name: "GMM",
    macroAccuracy: 0.92,
    weightedAccuracy: 0.92,
    topkAccuracy: 0.92,
    macroaucroc: 0.92,
  },
  {
    id: 5,
    name: "SVC (Linear)",
    macroAccuracy: 0.92,
    weightedAccuracy: 0.92,
    topkAccuracy: 0.92,
    macroaucroc: 0.92,
  },
  {
    id: 6,
    name: "SVC (Polynomial)",
    macroAccuracy: 0.92,
    weightedAccuracy: 0.92,
    topkAccuracy: 0.92,
    macroaucroc: 0.92,
  },
  {
    id: 7,
    name: "SVC (RBF)",
    macroAccuracy: 0.92,
    weightedAccuracy: 0.92,
    topkAccuracy: 0.92,
    macroaucroc: 0.92,
  },
  {
    id: 8,
    name: "Dec Tree",
    macroAccuracy: 0.92,
    weightedAccuracy: 0.92,
    topkAccuracy: 0.92,
    macroaucroc: 0.92,
  },
  {
    id: 9,
    name: "Rand For",
    macroAccuracy: 0.92,
    weightedAccuracy: 0.92,
    topkAccuracy: 0.92,
    macroaucroc: 0.92,
  },
  {
    id: 10,
    name: "XGBoost",
    macroAccuracy: 0.92,
    weightedAccuracy: 0.92,
    topkAccuracy: 0.92,
    macroaucroc: 0.92,
  },
  {
    id: 11,
    name: "LightGBM",
    macroAccuracy: 0.92,
    weightedAccuracy: 0.92,
    topkAccuracy: 0.92,
    macroaucroc: 0.92,
  },
  {
    id: 12,
    name: "StackedEns",
    macroAccuracy: 0.92,
    weightedAccuracy: 0.92,
    topkAccuracy: 0.92,
    macroaucroc: 0.92,
  },
];

const classifierEvaluationPostTrainingPerClassAUCROCData = [
  {
    id: 1,
    name: "Log Reg (OvR)",
    class0: 0.92,
    class1: 0.92,
    class2: 0.92,
    class3: 0.92,
    class4: 0.92,
    class5: 0.92,
    class6: 0.92,
    class7: 0.92,
    class8: 0.92,
    class9: 0.92,
  },
  {
    id: 2,
    name: "Poly Log Reg",
    class0: 0.92,
    class1: 0.92,
    class2: 0.92,
    class3: 0.92,
    class4: 0.92,
    class5: 0.92,
    class6: 0.92,
    class7: 0.92,
    class8: 0.92,
    class9: 0.92,
  },
  {
    id: 3,
    name: "GNB",
    class0: 0.92,
    class1: 0.92,
    class2: 0.92,
    class3: 0.92,
    class4: 0.92,
    class5: 0.92,
    class6: 0.92,
    class7: 0.92,
    class8: 0.92,
    class9: 0.92,
  },
  {
    id: 4,
    name: "GMM",
    class0: 0.92,
    class1: 0.92,
    class2: 0.92,
    class3: 0.92,
    class4: 0.92,
    class5: 0.92,
    class6: 0.92,
    class7: 0.92,
    class8: 0.92,
    class9: 0.92,
  },
  {
    id: 5,
    name: "SVC (Linear)",
    class0: 0.92,
    class1: 0.92,
    class2: 0.92,
    class3: 0.92,
    class4: 0.92,
    class5: 0.92,
    class6: 0.92,
    class7: 0.92,
    class8: 0.92,
    class9: 0.92,
  },
  {
    id: 6,
    name: "SVC (Polynomial)",
    class0: 0.92,
    class1: 0.92,
    class2: 0.92,
    class3: 0.92,
    class4: 0.92,
    class5: 0.92,
    class6: 0.92,
    class7: 0.92,
    class8: 0.92,
    class9: 0.92,
  },
  {
    id: 7,
    name: "SVC (RBF)",
    class0: 0.92,
    class1: 0.92,
    class2: 0.92,
    class3: 0.92,
    class4: 0.92,
    class5: 0.92,
    class6: 0.92,
    class7: 0.92,
    class8: 0.92,
    class9: 0.92,
  },
  {
    id: 8,
    name: "Dec Tree",
    class0: 0.92,
    class1: 0.92,
    class2: 0.92,
    class3: 0.92,
    class4: 0.92,
    class5: 0.92,
    class6: 0.92,
    class7: 0.92,
    class8: 0.92,
    class9: 0.92,
  },
  {
    id: 9,
    name: "Rand For",
    class0: 0.92,
    class1: 0.92,
    class2: 0.92,
    class3: 0.92,
    class4: 0.92,
    class5: 0.92,
    class6: 0.92,
    class7: 0.92,
    class8: 0.92,
    class9: 0.92,
  },
  {
    id: 10,
    name: "XGBoost",
    class0: 0.92,
    class1: 0.92,
    class2: 0.92,
    class3: 0.92,
    class4: 0.92,
    class5: 0.92,
    class6: 0.92,
    class7: 0.92,
    class8: 0.92,
    class9: 0.92,
  },
  {
    id: 11,
    name: "LightGBM",
    class0: 0.92,
    class1: 0.92,
    class2: 0.92,
    class3: 0.92,
    class4: 0.92,
    class5: 0.92,
    class6: 0.92,
    class7: 0.92,
    class8: 0.92,
    class9: 0.92,
  },
  {
    id: 12,
    name: "StackedEns",
    class0: 0.92,
    class1: 0.92,
    class2: 0.92,
    class3: 0.92,
    class4: 0.92,
    class5: 0.92,
    class6: 0.92,
    class7: 0.92,
    class8: 0.92,
    class9: 0.92,
  },
];

const classifierCalibrationPostTrainingData = [
  {
    id: 1,
    name: "Log Reg (OvR)",
    ece: 0.92,
    mce: 0.92,
    brier: 0.92,
    nnemean: 0.92,
    nnestd: 0.92,
  },
  {
    id: 2,
    name: "Poly Log Reg",
    ece: 0.92,
    mce: 0.92,
    brier: 0.92,
    nnemean: 0.92,
    nnestd: 0.92,
  },
  {
    id: 3,
    name: "GNB",
    ece: 0.92,
    mce: 0.92,
    brier: 0.92,
    nnemean: 0.92,
    nnestd: 0.92,
  },
  {
    id: 4,
    name: "GMM",
    ece: 0.92,
    mce: 0.92,
    brier: 0.92,
    nnemean: 0.92,
    nnestd: 0.92,
  },
  {
    id: 5,
    name: "SVC (Linear)",
    ece: 0.92,
    mce: 0.92,
    brier: 0.92,
    nnemean: 0.92,
    nnestd: 0.92,
  },
  {
    id: 6,
    name: "SVC (Polynomial)",
    ece: 0.92,
    mce: 0.92,
    brier: 0.92,
    nnemean: 0.92,
    nnestd: 0.92,
  },
  {
    id: 7,
    name: "SVC (RBF)",
    ece: 0.92,
    mce: 0.92,
    brier: 0.92,
    nnemean: 0.92,
    nnestd: 0.92,
  },
  {
    id: 8,
    name: "Dec Tree",
    ece: 0.92,
    mce: 0.92,
    brier: 0.92,
    nnemean: 0.92,
    nnestd: 0.92,
  },
  {
    id: 9,
    name: "Rand For",
    ece: 0.92,
    mce: 0.92,
    brier: 0.92,
    nnemean: 0.92,
    nnestd: 0.92,
  },
  {
    id: 10,
    name: "XGBoost",
    ece: 0.92,
    mce: 0.92,
    brier: 0.92,
    nnemean: 0.92,
    nnestd: 0.92,
  },
  {
    id: 11,
    name: "LightGBM",
    ece: 0.92,
    mce: 0.92,
    brier: 0.92,
    nnemean: 0.92,
    nnestd: 0.92,
  },
  {
    id: 12,
    name: "StackedEns",
    ece: 0.92,
    mce: 0.92,
    brier: 0.92,
    nnemean: 0.92,
    nnestd: 0.92,
  },
];

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

const salesPerformanceData = [
  {
    month: "Jan",
    baseline_sales: 100000, // Starting sales amount
    sales_change: 15000, // +15k growth
  },
  {
    month: "Feb",
    baseline_sales: 115000, // Previous month's total became baseline
    sales_change: -8000, // -8k decline
  },
  {
    month: "Mar",
    baseline_sales: 107000, // Adjusted baseline
    sales_change: 25000, // +25k growth
  },
  {
    month: "Apr",
    baseline_sales: 132000, // New baseline
    sales_change: -12000, // -12k decline
  },
  {
    month: "May",
    baseline_sales: 120000, // Adjusted baseline
    sales_change: 8000, // +8k growth
  },
  {
    month: "Jun",
    baseline_sales: 128000, // Final baseline
    sales_change: 0, // No change
  },
];

const salesTrendData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
];

const productFeaturesData = [
  { feature: "Performance", rating: 9.2 },
  { feature: "Usability", rating: 8.7 },
  { feature: "Security", rating: 9.5 },
  { feature: "Scalability", rating: 8.1 },
  { feature: "Cost Efficiency", rating: 7.3 },
  { feature: "Support Quality", rating: 8.9 },
  { feature: "Integration", rating: 7.8 },
  { feature: "Documentation", rating: 6.5 },
];

function TableComponent() {
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
    </div>
  );
}

function ClassifierTrainingTimesTable() {
  return (
    <div className="bg-background">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Classifier</TableHead>
            <TableHead>Training Time (s)</TableHead>
            <TableHead>Training Time (ms)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classifierTrainingTimeData.map((item) => (
            <TableRow key={item.id}>
              <TableCell
                className={getParagraphClass({
                  responsive: true,
                  muted: false,
                })}
              >
                {item.name}
              </TableCell>
              <TableCell className="text-center">
                {item.trainingTimeSeconds.toFixed(3)}
              </TableCell>
              <TableCell className="text-center">
                {item.trainingTimeMs.toString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ClassifierEvaluationPostTrainingTable() {
  return (
    <div className="bg-background">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Classifier</TableHead>
            <TableHead>Macro Accuracy</TableHead>
            <TableHead>Weighted Accuracy</TableHead>
            <TableHead>Top-k Accuracy</TableHead>
            <TableHead>Macro AUC-ROC</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classifierEvaluationPostTrainingData.map((item) => (
            <TableRow key={item.id}>
              <TableCell
                className={getParagraphClass({
                  responsive: true,
                  muted: false,
                })}
              >
                {item.name}
              </TableCell>
              <TableCell className="text-center">
                {item.macroAccuracy.toFixed(3)}
              </TableCell>
              <TableCell className="text-center">
                {item.weightedAccuracy.toFixed(3)}
              </TableCell>
              <TableCell className="text-center">
                {item.topkAccuracy.toFixed(3)}
              </TableCell>
              <TableCell className="text-center">
                {item.macroaucroc.toFixed(3)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ClassifierEvaluationPostTrainingPerClassAUCROCTable() {
  return (
    <div className="bg-background">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Classifier</TableHead>
            <TableHead>Class 0</TableHead>
            <TableHead>Class 1</TableHead>
            <TableHead>Class 2</TableHead>
            <TableHead>Class 3</TableHead>
            <TableHead>Class 4</TableHead>
            <TableHead>Class 5</TableHead>
            <TableHead>Class 6</TableHead>
            <TableHead>Class 7</TableHead>
            <TableHead>Class 8</TableHead>
            <TableHead>Class 9</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classifierEvaluationPostTrainingPerClassAUCROCData.map((item) => (
            <TableRow key={item.id}>
              <TableCell
                className={getParagraphClass({
                  responsive: true,
                  muted: false,
                })}
              >
                {item.name}
              </TableCell>
              <TableCell className="text-center">
                {item.class0.toFixed(3)}
              </TableCell>
              <TableCell className="text-center">
                {item.class1.toFixed(3)}
              </TableCell>
              <TableCell className="text-center">
                {item.class2.toFixed(3)}
              </TableCell>
              <TableCell className="text-center">
                {item.class3.toFixed(3)}
              </TableCell>
              <TableCell className="text-center">
                {item.class4.toFixed(3)}
              </TableCell>
              <TableCell className="text-center">
                {item.class5.toFixed(3)}
              </TableCell>
              <TableCell className="text-center">
                {item.class6.toFixed(3)}
              </TableCell>
              <TableCell className="text-center">
                {item.class7.toFixed(3)}
              </TableCell>
              <TableCell className="text-center">
                {item.class8.toFixed(3)}
              </TableCell>
              <TableCell className="text-center">
                {item.class9.toFixed(3)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ClassifierCalibrationPostTrainingTable() {
  return (
    <div className="bg-background">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Classifier</TableHead>
            <TableHead>ECE</TableHead>
            <TableHead>MCE</TableHead>
            <TableHead>Brier</TableHead>
            <TableHead>NNE (mean)</TableHead>
            <TableHead>NNE (std)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classifierCalibrationPostTrainingData.map((item) => (
            <TableRow key={item.id}>
              <TableCell
                className={getParagraphClass({
                  responsive: true,
                  muted: false,
                })}
              >
                {item.name}
              </TableCell>
              <TableCell className="text-center">
                {item.ece.toFixed(3)}
              </TableCell>
              <TableCell className="text-center">
                {item.mce.toFixed(3)}
              </TableCell>
              <TableCell className="text-center">
                {item.brier.toFixed(3)}
              </TableCell>
              <TableCell className="text-center">
                {item.nnemean.toFixed(3)}
              </TableCell>
              <TableCell className="text-center">
                {item.nnestd.toFixed(3)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const recap: RecapModule = {
  metadata: {
    weekNumber: 22,
    title: "Week 22",
    date: "2025-07-09",
    description: "Calibration Experimentation",
    focusAreas: ["ML"],
    status: "Completed",
    thumbnail: "/images/thumbnails/22.png",
  },
  content: () => (
    <>
      <section
        className={getSectionClass({
          includeMarginTop: false,
          includeMarginBottom: true,
        })}
      >
        <div className={getPageAllowanceClass()}></div>
        <WeekInfo
          week={22}
          date="May 19 – May 25"
          status="Completed"
          description="Calibration Experimentation"
          focusAreas={["ML"]}
          resources={[
            {
              label: "Imbalanced Data Classification",
              url: "https://www.sciencedirect.com/science/article/abs/pii/S0950705120307607",
            },
            {
              label: "A Unifying View of Class Overlap",
              url: "https://www.sciencedirect.com/science/article/abs/pii/S1566253522001099",
            },
            {
              label: "Probability Calibration",
              url: "https://scikit-learn.org/stable/modules/calibration.html",
            },
            {
              label: "Imbalanced-Learn Documentation",
              url: "https://imbalanced-learn.org/stable/",
            },
          ]}
        />
        <div className={getAllowanceClass()}></div>
        <div>
          <TableComponent />
        </div>
        <div className={getTableAllowanceClass()}></div>
        <p
          className={`${getTextClass({
            responsive: true,
            muted: true,
          })} text-center`}
        >
          Basic table
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <p
          className={`${getTextClass({
            responsive: true,
            muted: true,
          })} text-center`}
        >
          Bar plot of ...
        </p>
        <div className={getChartAllowanceClass()}></div>
        <div className="flex items-center justify-center">
          <BarPlotChart data={data} xKey="week" yKey="hours" />
        </div>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <div className="flex items-center justify-center">
          <HorizontalBarPlotChart data={data} xKey="week" yKey="hours" />
        </div>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <div className="flex items-center justify-center">
          <StackedVerticalBarChart
            data={salesPerformanceData}
            xKey="month"
            yKeys={["baseline_sales"]}
            changeKeys={["sales_change"]}
            height={400}
            gapPercent={0.03}
          />
        </div>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <div className="flex items-center justify-center">
          <StackedHorizontalBarChart
            data={salesPerformanceData}
            xKey="month" // Category field (months shown on Y-axis)
            yKeys={["baseline_sales"]} // Baseline metrics array
            changeKeys={["sales_change"]} // Change metrics array
            height={400}
            fillMuted={true} // Use pattern fills
            gapPercent={0.03} // 5% gap between baseline and change
          />
        </div>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <div className="flex items-center justify-center">
          <AreaPlotChart
            data={salesTrendData}
            xKey="month"
            yKey="revenue"
            suffix=""
            metricName="Revenue"
          />
        </div>
        <div className={getAllowanceClass({ axis: "py" })}></div>
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
          minimizing the preset loss function — so no intricate hyperparameter
          tuning step, no edge case loss function to selectively adjust model
          weights, no decision boundary shift, no cost-sensitive learning — just
          vanilla algorithmic behavior till the end with a random seed to
          eliminate classifier stochasticity. Why? Out-of-box models are
          somewhat predictable and they clearly show the true and inherent
          expressiveness of each classifier. In this case, I am treating them as
          honesty tests to understand exactly how they behave given a consistent
          set of data.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h1 className={getHeadingClass(1, { responsive: true, muted: true })}>
          Synthetic Data Generation: Parameter Breakdown and Complexity Factors
        </h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Our synthetics dataset was engineered using{" "}
          <InlineCode>sklearn.datasets.make_classification</InlineCode> to
          create a controlled stress test environment that systematically
          introduces multiple interacting complexity factors based on the
          parameters, and these factors can be broadly classified into 4
          distinct and codependent categories which are:
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          <ul
            className={getListClass({
              responsive: true,
              padded: true,
              muted: false,
            })}
          >
            <li>Core Dataset Parameters</li>
            <li>Feature Space Complexity Parameters</li>
            <li>Inter-Class Relationship Complexity Parameters</li>
            <li>Data Quality Parameters</li>
          </ul>
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The dataset generation strategy was initialized with{" "}
          <InlineCode>n_samples=100000</InlineCode>, and this aimed to provide a
          sufficient sample size to support our multi-class classification
          scenario, while also introducing class imbalance to test the limits of
          the experimental classifiers. The complexity impact of this design
          choice was to enable realistic sparse-class scenarios, especially for
          the minority classes (given that our focus points to that).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Next, we introduced multi-class complexity beyond binary
          classification tasks using <InlineCode>n_classes=10</InlineCode>. The
          complexity factor in this case is the Multi-Class Exponential
          Complexity, and in more practical terms, it creates{" "}
          <InlineMath math={"45"} /> pairwise decision boundaries (
          <InlineMath math={"10"} /> choose <InlineMath math={"2"} />
          ), which must all be learned simultaneously. The main pain point here
          is that each binary sub-problem would inherit the full complexity of
          other qualities of the synthetic dataset, which would be highlighted
          in the following sections.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          We then initialized explicit class weights that directly creates the
          class imbalance characteristic by using the weights parameter with an
          array of values ranging from <InlineMath math={"0.55"} /> to{" "}
          <InlineMath math={"0.003"} />, indicating the dominant majority and
          minority classes respectively. The complexity factor here is the
          Extreme Class Imbalance (with a <InlineMath math={"183:1"} /> ratio),
          and the sample distribution (support) of each class can be visualized
          below:
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <p
          className={`${getTextClass({
            responsive: true,
            muted: true,
          })} text-center`}
        >
          Plot of Support per Class
        </p>
        <div className={getChartAllowanceClass()}></div>
        <div className="flex items-center justify-center">
          <HorizontalBarPlotChart
            data={classSupport}
            xKey="class"
            yKey="support"
          />
        </div>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Together, these parameters contribute to the core dataset design which
          comprehensively explains the sample and strata characteristics of the
          dataset.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In order to create a high-dimensional feature space relative to the
          sample sizes of the minority classes, we implemented{" "}
          <InlineCode>n_features=45</InlineCode>. The complexity factor here is
          the Curse of Dimensionality, and this is even more pronounced due to
          the severe class imbalance. By computing and plotting the number of
          samples per dimension, we end up with this plot:
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <p
          className={`${getTextClass({
            responsive: true,
            muted: true,
          })} text-center`}
        >
          Plot of Number of Samples per Dimension per Class
        </p>
        <div className={getChartAllowanceClass()}></div>
        <div className="flex items-center justify-center">
          <HorizontalBarPlotChart
            data={samplesPerDimension}
            xKey="class"
            yKey="samples"
          />
        </div>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Noticeably, Class <InlineMath math={"0"} /> has{" "}
          <InlineMath math={"1,222"} /> samples per dimension which is well
          supported, but moving on to the minority classes, the number of
          samples per dimension drastically drops which leads to a severely
          under-sampled scenario. This further means that in the 45D space, the
          minority classes forms isolated points and generalization in such a
          high dimension is close to impossible.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Next, we defined the actual signal features that carry the
          class-discriminative information by using{" "}
          <InlineCode>n_informative=15</InlineCode>. The complexity factor is
          the Signal-to-Noise Ratio where only about <InlineMath math={"33%"} />{" "}
          features <InlineMath math={"(15/45)"} /> contain genuine class
          information. The impact of class imbalance in this case is that
          majority classes easily fair well and rely on statistical dominance to
          find true signals, but it’s much more difficult for the minority
          classes, especially with limited samples, features and true signal
          features.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          We also created correlated features that add noise without new
          information by using <InlineCode>n_redundant=15</InlineCode>. The
          complexity factor is Feature Redundancy and the need for this was to
          intentionally mislead the experimental classifiers by introducing
          false patterns, making it especially harder for minority classes to
          separate correlation from causation.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To further test redundancy handling, we introduced exact feature
          duplicates by using <InlineCode>n_repeated=8</InlineCode>, and about{" "}
          <InlineMath math={"51\\%"} /> of the feature space{" "}
          <InlineMath math={"(23/45)"} /> contains no new information. The need
          for this design choice was to especially test for overfitting
          potentials.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          As a whole, these parameters form the design of the feature space and
          its associated complexity factors.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The <InlineCode>n_clusters_per_class=4</InlineCode> setting creates a
          multi-model distribution within each class, thereby forming
          intra-class clusters. As a complexity factor, it exponentially blows
          up a <InlineMath math={"10"} />
          -class problem into a <InlineMath math={"10 \\times 4 = 40"} /> one (a{" "}
          <InlineMath math={"40"} /> sub-cluster learning challenge). For
          example, given that Class <InlineMath math={"0"} /> has{" "}
          <InlineMath math={"55,000"} /> total samples, the number of samples
          per intra-class <InlineMath math={"0"} /> cluster would then be{" "}
          <InlineMath math={"13,750 \\ (55,000 / 4)"} />. Other class clusters
          can be visualized using the plot below:
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <p
          className={`${getTextClass({
            responsive: true,
            muted: true,
          })} text-center`}
        >
          Plot of Number of Samples per Cluster per Class
        </p>
        <div className={getChartAllowanceClass()}></div>
        <div className="flex items-center justify-center">
          <HorizontalBarPlotChart
            data={samplesPerCluster}
            xKey="class"
            yKey="samples"
          />
        </div>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The main complexity this design choice brings is the fact that for the
          most dominant minority class, we get approximately{" "}
          <InlineMath math={"75"} /> samples per cluster, and as a general rule
          of thumb, <InlineMath math={"50-200"} /> samples are required per
          cluster for stable pattern recognition. While this seems like a close
          call, the samples are a jumbled up mix of redundant, repeated and
          informative features, so there’s a whole lot of redundancy with a slim
          chance of finding the true signal, coupled with the fact that the
          classifier has to make a single choice out of{" "}
          <InlineMath math={"10"} /> possible outcomes.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To create overlapping decision boundaries, the{" "}
          <InlineCode>class_sep=0.4</InlineCode> was implemented. This design
          forces classes to share the same feature space regions with each
          other, thereby leading to significant class overlap as highlighted as
          a complexity factor. According to research, class overlap can be more
          harmful than class imbalance, as minority class samples are trapped in
          overlapped regions, thereby making them virtually unreachable and
          unlearnable, given the fact that they are surrounded by majority class
          examples.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          These parameters form the inter-class relationship parameters.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Label contamination was also introduced by using{" "}
          <InlineCode>flip_y=0.02</InlineCode>. For more context, label noise
          (also known as annotation noise), is when the label (target) in a
          dataset is incorrect or inconsistent with the true class/value.
          Focusing on the minority class, at first glance, it might not really
          seem as much as only <InlineMath math={"2\\%"} /> of{" "}
          <InlineMath math={"300"} /> total samples are mislabeled, but recall
          that we are dealing with a multi-model distribution per class, so each
          cluster which contains a mix of noisy and true signals could be
          potentially wrangled. The demerits of this is that ground truth could
          be ultimately corrupted, thereby leading to unreliable estimates and
          classifier miscalibrations.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This alone forms the data quality parameter design.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2, { responsive: true, muted: true })}>
          The Multiplicative Interaction Complexity Challenge
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To reiterate, the complexity factors are:
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          <ul
            className={getListClass({
              responsive: true,
              padded: true,
              muted: false,
            })}
          >
            <li>Multi-Class Exponential Complexity </li>
            <li>Extreme Class Imbalance</li>
            <li>Curse of Dimensionality</li>
            <li>High Noise-to-Signal Ratio</li>
            <li>Feature Redundancy</li>
            <li>Class Overlap</li>
            <li>Label Contamination</li>
          </ul>
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The main challenge is that these complexity factors don’t interact
          additively but multiplicatively.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Class Overlap <InlineMath math={"\\times"} /> Class Imbalance{" "}
          <InlineMath math={"\\times"} /> Inter-Class Clustering leads to
          minority classes being trapped in overlap regions shared (or in our
          case, dominated) by majority class examples and become virtually
          unlearnable.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Noise <InlineMath math={"\\times"} /> Sparsity{" "}
          <InlineMath math={"\\times"} /> High Dimensionality leads to massive
          uncertainty. For more context, given the dominant majority class with{" "}
          <InlineMath math={"300"} /> total samples, it is operating in a 45D
          feature space, hence leading to high prediction uncertainty.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Redundancy <InlineMath math={"\\times"} /> Overfitting{" "}
          <InlineMath math={"\\times"} /> Imbalance leads to potential pattern
          memorization instead of pattern learning as{" "}
          <InlineMath math={"51\\%"} /> noise (redundant + repeated features)
          could potentially amplify the risks of overfitting especially in
          minority classes having <InlineMath math={"<100"} /> samples per
          cluster.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Finally, the multi-class classification problem enforces the
          inheritance of these multiplicative complexities where{" "}
          <InlineMath math={"45"} /> pairwise boundaries inherit them all.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2, { responsive: true, muted: true })}>
          Adopting a Calibration-First Strategy: The "Clean Foundation
          Principle"
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          A crucial distinction to understand given our context is that while
          prediction reliability is totally broken, model calibration is very
          much still required and is a prerequisite, as we want our classifiers
          to be trustworthy, that is, when they affirm{" "}
          <InlineMath math={"75\\%"} /> confidence, they are right{" "}
          <InlineMath math={"75\\%"} /> of the time. This forms the basis of
          this experiment as an early step to ensure that we can build effective
          learning techniques on the foundation of trustworthy estimates.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Like the complexity factors, the primary sources (or culprits) of
          unreliable predictions are the dataset generation parameters, and in
          their own very different ways, they tend to result in over-confident
          and under-confident predictions.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Primarily, in our multi-class classification scenario where we have{" "}
          <InlineMath math={"10"} /> classes (or choices to make), the softmax
          normalization artifact often leads to unreliable estimates. Softmax,
          by design, forces probabilities to sum to <InlineMath math={"1"} />{" "}
          across all classes, even when uncertain. The extent of this
          uncertainty increases with a resulting increase in the number of
          classes, and in such cases, classes tend to compete for probability
          mass as the requirement of the softmax layer is to squish everything
          to <InlineMath math={"1"} />. So the system cannot express the fact
          that all classes are equally likely, creating artificial decisiveness.
          In most cases, this forced decision in areas where decisions are
          normally not meant to be made, or if they are to be, then there would
          be a meticulously planned process for such (in overlap regions of the
          feature space for example). This mostly leads to unreliable estimates,
          which can hurt model interpretability.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For the case of the <InlineMath math={"183:1"} /> class imbalance, the
          majority class errors contribute 183x more to the loss function, and
          the model then learns to predict the majority class to minimize the
          loss, thus systematically underestimating the minority class. Say we
          are implementing the cross-entropy (which we actually are in
          practice), given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={
              "\\text{CCE} = - \\sum_{i=1}^{C} y_i \\cdot \\log(\\hat{y}_i)"
            }
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          With <InlineMath math={"55,000"} /> Class <InlineMath math={"0"} />{" "}
          samples vs <InlineMath math={"300"} /> Class <InlineMath math={"9"} />{" "}
          samples, Class <InlineMath math={"0"} /> errors are computed as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"55000 \\times \\log(p_0)"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          And Class <InlineMath math={"9"} /> errors are computed as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath math={"300 \\times \\log(p_9)"} />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where <InlineMath math={"p_0"} /> and <InlineMath math={"p_9"} /> are
          the class predictions.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Due to the large disparity, the model would be optimized to account
          for and minimize Class <InlineMath math={"0"} /> errors over Class{" "}
          <InlineMath math={"9"} /> errors, leading to potentially
          under-confident or over-confident predictions when faced with
          predicting instances from the minority class (Class{" "}
          <InlineMath math={"9"} />
          ).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In the facet of intra-class clustering, unreliable estimates are
          potential by-products and this is due to the fact that local clusters
          per class are not inherently uniform. In our case, each class has{" "}
          <InlineMath math={"4"} /> distinct sub-patterns, but classifiers only
          learn a single estimate per class. Model outputs on the other hand,
          operate by averaging the probabilities across all clusters, but each
          cluster returns a specific certainty (or uncertainty as the case may
          be). Assuming we got the true probability values per cluster for Class{" "}
          <InlineMath math={"9"} /> given as:
        </p>
        <div className={getMathBlockClass()}>
          <BlockMath
            math={"[p_9^a, p_9^b, p_9^c, p_9^d] = [0.90, 0.70, 0.45, 0.25]"}
          />
        </div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The model learns that <InlineMath math={"p_9"} /> is{" "}
          <InlineMath math={"0.58"} /> which is the averaged value across all
          clusters, but in reality, probabilities vary significantly across
          clusters, thereby leading to an extremely unreliable estimate. The
          resulting miscalibration issue is that <InlineMath math={"p_9"} />{" "}
          becomes the new base rate, and the model becomes over-confident in
          overlap regions and under-confident in clean regions (this would be
          explained better in a bit).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In the case of class overlap, the reduced class separation creates
          overlapping decision boundaries that obscures true class membership.
          While it’s a huge problem on its own, it forces classifiers to make
          definitive decisions with little to no information, so in essence,
          models cannot recognize fundamental uncertainty and often create an
          artificial one. This is due to the fact that in overlap regions, the
          true Bayes optimal probability is <InlineMath math={"0.5"} />{" "}
          indicating true ambiguity, but softmax forces probabilistic values
          even in cases of significant uncertainty, as models inherently don’t
          have the ability to express “I don’t know”. This leads to systematic
          overconfidence especially in boundary regions, further leading to a
          miscalibrated classifier.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Feature Redundancy also serves as a primary source of unreliable
          estimates. This is due to the fact that redundant features which are
          primarily no new information, appear as independent evidence to the
          model. Given our case of about <InlineMath math={"51\\%"} />{" "}
          redundancy, it’ll especially hurt the experimental classifiers that
          rely on statistical dominance. Mathematically speaking, redundant
          features are simply linear transformations of true informative
          features (same signal, but different representation), but now the
          model thinks that it has <InlineMath math={"45"} /> pieces of evidence
          instead of <InlineMath math={"15"} />. To make matters even worse,
          when a model comes into contact with a redundant feature after a truly
          informative one, it takes it as a confirmation to the previously
          learned pattern, which leads to an artificially inflated confidence
          score. This then leads to over-confident prediction behaviors,
          especially in easy-to-work-with regions like dense regions in the
          feature space and regions with virtually no class overlap.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To account or mitigate for these, a pre-calibration step is absolutely
          necessary, due to the systematic untrustworthiness given the multiple
          interacting causes.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h1 className={getHeadingClass(1, { responsive: true, muted: true })}>
          Classifier Selection Criteria
        </h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The aim was to have a well-mixed spread of linear, non-linear,{" "}
          <UnderlineLink href="https://obukofejoey.notion.site/Generative-Classifiers-21677c2a65138081a59cc0e178f509a1?source=copy_link">
            generative
          </UnderlineLink>
          ,{" "}
          <UnderlineLink href="https://obukofejoey.notion.site/Discriminative-Classifiers-1f077c2a651380fdbdd0e152e6a5f51f?source=copy_link">
            discriminative
          </UnderlineLink>
          , ensemble, and meta-learning classifiers with varying inductive
          biases, model expressiveness, and decision surface complexities.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2, { responsive: true, muted: true })}>
          Inductive Bias
        </h2>
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
          assumes a non-linear (curved) decision boundary against different
          classes. SVMs assume clear margin separations and since the synthetic
          dataset we are working with has a lot of overlapping and
          not-well-separated decision boundaries, I also have low hopes for this
          classifier as well. Depending on the base learners and setup, some
          ensemble classifiers blend predictive biases together and tend to
          overcompensate, which is why they can be prone to overfitting issues,
          especially if they are not properly regularized, but given the
          complexity of the data, I expect them to do fairly well over the other
          base classifiers.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2, { responsive: true, muted: true })}>
          Decision Surface Complexity
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The same can be said for the decision surface complexity. To start
          with, a decision surface (or decision boundary) is the invisible line
          (or surface in higher dimensions) that a classifier draws in a feature
          space to separate the different classes. In <InlineMath math={"2"} />
          D, it is referred to as a “line”, in <InlineMath math={"3"} />D it is
          a “plane”, and in <InlineMath math={"n"} />
          D, it is a “hyperplane”. As opposed to the Logistic Regression
          classifier that uses a single straight line to linearly separate
          classes, SVMs with RBF kernel use extremely complex (squiggly) lines
          to affirm class distinction. Given the complex nature of the data as
          regards complex decision boundaries, I would more or less trust the
          SVC more than the Logistic Regression in a test of overall
          correctness.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To reaffirm, for any possible and unknown reason where a least
          expressive classifier may be better calibrated than a more expressive
          one (in terms of model capacity and complexity), I am keeping an open
          mind to accept that possibility and not aiming to fanboy any
          classifier or pass down any form of “complexity bias” to the computed
          calibration score which, again, is the core reason for working with
          out-of-box classifiers in the first place, given the aim of this
          experiment — to find out exactly where each classifier messes up.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          More specifically, I included a mix of:
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
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
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
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
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
          Naive Bayes Classifier
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Like the other classifiers that come with strongly simplifying
          assumptions, this guy is no different, and it assumes that all
          features are conditionally independent given the class.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In the context of this experiment, I was particularly interested in
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
          Given my case of imbalanced class distribution, the Naive Bayes
          classifier can handle it only up to a point, as it relies heavily on
          the class prior, and with the most dominant class (
          <InlineMath math={"40\\%"} /> in my case), it’d most likely default to
          that class automatically. For the likelihood computation, they may be
          noisy and likely not distinctive enough due to the complex decision
          surface and significant class overlap. That said, it doesn’t
          inherently prioritize minority class recall, so I might end up with a
          high accuracy and a lower per-class discrimination metric like the
          AUC-ROC score in this case, meaning I’d get pessimisticly classified
          data points especially for the minority classes, as ones that didn’t
          cleanly fall into its independent, per-feature likelihood profiles.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          While also being fairly simple to implement, my major expectation
          about this classifier is how overconfident it can get, and this is
          majorly due to how it determines the likelihood as a product of
          possibly codependent features under the assumption that they are
          independent. It’s even worse especially in my case where I have a
          significant number of redundant features defined by n_redundant, and
          Naive Bayes being Naive Bayes would assume they independently
          contribute the same signal (the same likelihood) and artificially
          inflate the uncertainty by the likelihood multiplication. Based on
          this, I should expect possibly overconfident predictions from this
          classifier especially in the majority classes.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Since we are dealing with continuous features (after scaling), I
          implemented the Gaussian Naive Bayes (GaussianNB) variant as an
          out-of-the-box model that explicitly deals with continuous variables.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
          Gaussian Mixture Model (GMM) Classifier
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
          Support Vector Classifier (Linear Kernel)
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
          Support Vector Classifier (Polynomial Kernel)
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
          Support Vector Classifier (Gaussian RBF Kernel)
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
          Decision Tree Classifier
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
          Random Forest Classifier
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
          Gradient Boosted Trees (XGBoost Classifier)
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
          Stacked Ensemble Classifier
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2, { responsive: true, muted: true })}>
          Evaluation Metrics
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The selection criteria of the evaluation metrics for the experimental
          classifiers were mostly based on investigating global correctness,
          ranking ability, and ambiguity. Aside from the on-paper behavior of
          out-of-box classifiers, given our synthetic data, I needed to
          understand how well they would fare, especially in discriminating
          between minority classes.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
          Macro Accuracy
        </h3>
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
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
          Weighted Accuracy
        </h3>
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
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
          Top-k Accuracy
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          I employed the top-
          <InlineMath math={"k"} /> accuracy metric as a softer evaluation for
          classifier confidence, and I needed to test classifier ambiguity and
          possible class confusion (if any). Here, before the actual calibration
          measures, I wanted to sort of see the early warning signs that a
          classifier was either confidently dumb or doubtfully right (uncertain
          but still managing to land the correct class somewhere in its top
          guesses).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where general accuracy (also known as Top-
          <InlineMath math={"1"} /> accuracy) denotes and measures if the
          classifier was absolutely right (total correctness across all
          classes), top-
          <InlineMath math={"k"} /> accuracy measures if the classifier’s
          predictions were at least in the specified class limit denoted by{" "}
          <InlineMath math={"k"} />. In more intuitive terms, it measures how
          often the correct class is at least considered as one of the top
          plausible answers. Now, while it might seem counterintuitive in this
          stress-testing experiment that values pure correctness (either of the
          positive class or not), I am also interested in seeing edge cases of
          possible confidence misalignment from the get-go, so it is more or
          less an early warning sign of a possibly miscalibrated classifier. For
          example, if a classifier has a low top-
          <InlineMath math={"1"} /> score but high top-
          <InlineMath math={"k"} /> score, then we can hypothesize that such a
          classifier is possibly miscalibrated (right intuition but wrong
          representation). If it has a low top-
          <InlineMath math={"1"} /> score and top-
          <InlineMath math={"2"} /> score, then we can be sure that the
          classifier is confused even after giving it two tries (a sign of
          possible underfitting).
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
          Macro AUC-ROC
        </h3>
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
          classes, which inherently makes them less compatible with ROC
          analysis, plus the confidence estimates seem much more interpretable
          as they are between <InlineMath math={"0"} /> and{" "}
          <InlineMath math={"1"} />, but can be misleading as the raw values are
          constrained to always exist between those boundary values. However,
          with the case of non-probabilistic classifiers like SVCs with hinge
          loss and Decision Tree classifiers, they output margin distances or
          decision scores, and these raw confidence estimates are perfect for
          ROC analysis even while it is often less interpretable. Then again, it
          all boils down to how well the probabilistic confidence scores
          preserve the relative class ordering.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In that sense, I added the AUC-ROC metric as more of a ranking stress
          test metric, especially for classifiers that may have high accuracy
          scores (high correctness), but may be pessimistic or optimistic about
          it — they could either predict instances close to or equal to the base
          rate (indicating low confidence or poor separation between classes) or
          closer to the tails (high confidence scores that aren’t always
          justified) as characterized by the AUC-ROC score.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
          Per-Class AUC-ROC
        </h3>
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
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2, { responsive: true, muted: true })}>
          Calibration Metrics
        </h2>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
          Expected Calibration Error (ECE)
        </h3>
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
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
          Maximum Calibration Error (MCE)
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Where ECE gives the weighted global average, this shows the worst-case
          calibration error across all bins. I am using this metric to
          complement the ECE to properly investigate cases where my experimental
          classifiers are dangerously wrong somewhere (either extremely
          overconfident in one region or underconfident in another).
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
          Brier Score (MSE)
        </h3>
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
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
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
          interpretability, the score is usually normalized to be between{" "}
          <InlineMath math={"0"} /> (uniformly uncertain) and{" "}
          <InlineMath math={"1"} /> (fully confident in one class).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          I implemented this to complement the ECE and MCE scores to indicate
          whether the classifiers were confidently bad or cautiously correct.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2, { responsive: true, muted: true })}>
          Experiment Overview
        </h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This experiment is designed to train, evaluate, calibrate, and compare
          the performances of out-of-box classifiers with respect to both
          classification correctness and probabilistic reliability. It is
          stratified into several distinct but interlinked stages: training,
          post-training evaluation, post-training miscalibration assessment,
          calibration, post-calibration evaluation, and post-calibration
          miscalibration assessment. Each stage feeds logically into the next,
          with clear contextual requirements and audit trails, thereby ensuring
          full transparency and reproducibility.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          We start by fitting the experimental classifiers on a synthetic
          training set and then evaluating them based on a measure of general
          correctness and class discriminatory abilities. We also investigate
          their calibration extent, quality, and prediction confidence levels
          out of the box by evaluating calibration-focused metrics like the ECE,
          MCE, and Brier scores. After evaluation, we then apply a suite of
          calibration methods, specifically to the classifiers that support
          probabilistic outputs, and then repeat the evaluation steps above to
          understand each classifier’s predictive performances and confidence
          estimates before and after calibration. By comparing pre- and
          post-calibration results, we identify which calibration techniques
          most effectively align model confidence with reality.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Throughout, design safeguards and procedures were considered and
          implemented. These procedures were not limited to the use of
          stratified data splits for effective strata representativeness,
          disjoint training/calibration/test sets, consistent preprocessing per
          model family, etc.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Ultimately, calibrated probabilities make the classifiers’ outputs
          more trustworthy, and our goal is to minimize the miscalibration
          extent while preserving (or improving) class discrimination.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h1 className={getHeadingClass(1, { responsive: true, muted: true })}>
          Experiment Goals and Motivations
        </h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          While the end goal of this experiment is to train classifiers that not
          only achieve strong accuracy and ranking abilities, but also produce
          well-calibrated probability estimates, which are critical for
          downstream decision-making in especially high-stakes contexts, it also
          addresses these core challenges:
        </p>
        <ul
          className={getListClass({
            responsive: true,
            padded: true,
            muted: false,
          })}
        >
          <li>
            <b>Identifying gaps in model reliability</b>, especially for
            underrepresented or minority classes.
          </li>
          <li>
            <b>Applying multiple calibration strategies</b> to assess and
            subsequently improve probability estimates.
          </li>
          <li>
            <b>Evaluating each calibrated version independently</b> to observe
            impact on both discriminative and probabilistic metrics.
          </li>
          <li>
            <b>
              Auditing dataset characteristics and classifier behaviors across
              different pipeline stages
            </b>{" "}
            to extract insights about data uncertainty and entropy, as well as
            classifier configurations and behavioral estimates.
          </li>
          <li>
            <b>Ensuring modular experiment tracking</b> through clear separation
            of concerns via MLflow, including nested (parent-child) runs,
            artifacts, tags, and metrics.
          </li>
        </ul>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h1 className={getHeadingClass(1, { responsive: true, muted: true })}>
          Experiment Setup
        </h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The dataset contained () samples with () features and () target
          classes in imbalanced proportions. Prior to modeling, we analyzed data
          quality (missing values, duplicates, constant features etc.) and split
          the data (stratified by class) into three disjoint subsets: training
          (~… samples …%), training (~… samples …%) and training (~… samples
          …%). This stratification ensured that strata proportions remained
          consistent across splits. The splits were then saved and version with
          DVC with data hashes for full traceability. Each classifier was then
          trained only on the training set, and then a separate calibration set
          (not seen by the model during training) was used to fit post-hoc
          calibrators. The final test set was held out entirely until the end of
          the pipeline.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Feature preprocessing was customized per model family. For
          distance-sensitive metrics like the Logistic Regression and SVCs, we
          applied standardization (zero mean, unit variance), so all features
          contribute equally to distance computations. In contrast, tree- and
          split-based models such as Decision and Gradient Boosted Trees were
          fed raw features, as they depend on only feature ordering and not
          scale. This helped in avoiding comparison contamination in cases such
          as SVCs given an artificial advantage (or disadvantage as the case may
          be) due to a preprocessing step.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Trained and subsequently calibrated classifiers were then serialized
          and stored locally in a DVC dedicated and versioned classifier base
          path that contained both the calibrated and uncalibrated versions of
          the same fitted classifier, as well as the training and calibration
          metadata which logged information about the classifier type and
          specifications, hyperparameters, whether it was a pipeline object, an
          ensemble, or a stacked architecture, plus its DVC hash for
          traceability, MLflow run ID for reproducibility and lineage, and
          artifact URI for transparency and recoverability. It also logged
          details about the training and calibration time both in seconds and
          milliseconds as well as the calibration methods used and the path to
          the said calibrator objects.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In a bid to supporting fair evaluation, each classifiers’ predicted
          output (label, decision score and probability) were kept “raw” until
          explicitly calibrated, meaning no additional post-processing asides
          feature scaling was performed. We also standardized prediction
          interfaces across trained classifiers, so when evaluating for general
          correctness, we used predict that returns hard labels. predict_proba
          for calibration and evaluating probabilistic metrics, and the
          decision_function for discriminatory metrics like the AUC-ROC score.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In summary, the experimental setup ensured that each classifier
          operated in its optimal regime (proper scaling and prediction
          interfaces) and that no data or metric leakage occurred between the
          pipeline stages.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h1 className={getHeadingClass(1, { responsive: true, muted: true })}>
          Experiment Design Notes
        </h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2, { responsive: true, muted: true })}>
          Model Identity Crisis and Divergence Control
        </h2>
        <h3 className={getHeadingClass(3)}>Design Goal</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To ensure clear model traceability across different layers (e.g., base
          learning layer, stacking layer, calibration layer), I designed the
          system in such a way that treats each model instantiation as
          context-specific. This means even if two classifiers share the same
          hyperparameters and architecture (with the same random seed for
          reproducibility), they are independently initialized, trained, and
          named based on their pipeline role and contextual usage.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3, { responsive: true, muted: true })}>
          Risks Avoided
        </h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          <ul
            className={getListClass({
              responsive: true,
              padded: true,
              muted: false,
            })}
          >
            <li>
              Confusion about which model was to be evaluated, calibrated, or
              stacked.
            </li>
            <li>
              Accidental reuse of a model trained on data that influenced its
              downstream use.
            </li>
            <li>
              Unintentional behavioral divergence (learned bias) due to the
              previous state. An example here is reusing a trained base
              classifier in a meta-learning architecture, where the meta-model
              would inherit the learned biases from the base models.
            </li>
            <li>
              Loss of clarity in MLflow logs, model artifacts and evaluation
              results
            </li>
          </ul>
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Feature Scaling Strategy</h2>
        <h3 className={getHeadingClass(3)}>Design Goal</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To strike a balance between algorithmic efficiency and input fidelity.
          To this effect, I avoided scaling features for tree-based models
          (which relied on splits, not magnitudes) while scaling input features
          for distance-sensitive models like SVMs and logistic regression. This
          also ensured that the experimental models operated in their optimal
          mathematical regime without unnecessary transformations. Plus, it also
          prevented the introduction of scaling-induced bias across metric
          evaluations.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3)}>Risks Avoided</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          <ul
            className={getListClass({
              responsive: true,
              padded: true,
              muted: false,
            })}
          >
            <li>
              Artificial distortion of input space for tree-based learners, that
              is, inflating the possible noise significance.
            </li>
            <li>Degraded performance of scale-sensitive models.</li>
          </ul>
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Feature Scaling Inconsistencies</h2>
        <h3 className={getHeadingClass(3)}>Design Goal</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To ensure fair comparability across models and fairness in
          metric-based evaluation, I standardized my preprocessing pipelines per
          model family and made the feature transformation consistent within
          model-type boundaries.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3)}>Risks Avoided</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          <ul
            className={getListClass({
              responsive: true,
              padded: true,
              muted: false,
            })}
          >
            <li>
              Metric contamination where differences in evaluation results are
              falsely attributed to the model architecture when they may have
              stemmed from inconsistent preprocessing. In a more common case,
              feeding raw features to tree models, but scaled features to SVMs,
              and then unfairly comparing them head-to-head on metrics like the
              Brier score.
            </li>
          </ul>
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Prediction Interface Consistency</h2>
        <h3 className={getHeadingClass(3)}>Design Goal</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To guarantee smoother integration across all pipeline stages, I
          standardized the interface expectations:
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          <ul
            className={getListClass({
              responsive: true,
              padded: true,
              muted: false,
            })}
          >
            <li>
              <InlineCode>predict()</InlineCode> - returns hard class labels
              which were useful for accuracy-related metric evaluations.
            </li>
            <li>
              <InlineCode>predict_proba()</InlineCode> - returns class
              probabilities which were useful for calibration and probabilistic
              metrics.
            </li>
            <li>
              <InlineCode>decision_function()</InlineCode> - returns decision
              scores which were useful in the facet of discriminatory metrics
              (where applicable).
            </li>
          </ul>
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3)}>Risks Avoided</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          <ul
            className={getListClass({
              responsive: true,
              padded: true,
              muted: false,
            })}
          >
            <li>
              Silent metric degradation due to interface mismatch. For example,
              assuming predict_proba is always available (and if it is,
              meaningful) when it may be poorly estimated.
            </li>
          </ul>
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>
          Keeping Model Outputs Raw (Until Told Otherwise)
        </h2>
        <h3 className={getHeadingClass(3)}>Design Goal</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To avoid unexpected transformations, I enforced a rule that model
          outputs should remain raw unless explicitly post-processed or
          calibrated. This was especially relevant in stacking and calibration
          stages where output semantics were to be controlled tightly.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3)}>Risks Avoided</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          <ul
            className={getListClass({
              responsive: true,
              padded: true,
              muted: false,
            })}
          >
            <li>
              False interpretability gains from silent and often double
              transformations.
            </li>
          </ul>
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>
          Cross-Validated Evaluation for Stability
        </h2>
        <h3 className={getHeadingClass(3)}>Design Goal</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To ensure reliable performance estimates across datasets with class
          imbalance or sampling variance, I adopted cross_val_predict() with
          stratification to compute evaluation metrics per fold (fold-level
          estimates), and aggregates them.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3)}>Risks Avoided</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          <ul
            className={getListClass({
              responsive: true,
              padded: true,
              muted: false,
            })}
          >
            <li>Evaluation instability from single splits.</li>
            <li>Overfitting to validation sets.</li>
            <li>High variance in imbalanced test sets.</li>
          </ul>
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>
          Metric Contamination Across Layers
        </h2>
        <h3 className={getHeadingClass(3)}>Design Goal</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To keep metric interpretation accurate and context-aware, I tagged
          evaluation results by stage (e.g., post-training, post-calibration)
          and only applied metrics in contexts where they were valid (e.g.,
          macro accuracy only after model fitting, or NNE before and after model
          calibration, ensuring predict_proba() is available). This tagging
          ensured clean experiment boundaries in such a way that every layer was
          self-sufficient and never overlapped into another.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3)}>Risks Avoided</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          <ul
            className={getListClass({
              responsive: true,
              padded: true,
              muted: false,
            })}
          >
            <li>
              False and misleading conclusions made from comparing classifier
              performances across different contexts.
            </li>
          </ul>
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Evaluation Leakage Trap</h2>
        <h3 className={getHeadingClass(3)}>Design Goal</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To preserve the integrity of the experimental steps, I ensured strict
          separation of datasets: training sets, calibration sets, and test
          sets. So no data used in the calibration layer touched the training
          process of any other classifier.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3)}>Risks Avoided</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          <ul
            className={getListClass({
              responsive: true,
              padded: true,
              muted: false,
            })}
          >
            <li>
              Information leakages where the calibration methods “learn” from
              data that was already seen by base models, thereby leading to
              invalid downstream results.
            </li>
          </ul>
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Calibrate Once, Use Everywhere</h2>
        <h3 className={getHeadingClass(3)}>Design Goal</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To avoid repeated calibration (which introduces overfitting risk and
          biased evaluations), calibrated models are stored as distinct
          artifacts and used wherever calibration is required. This ensures
          calibration is applied once and respected across stages.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h3 className={getHeadingClass(3)}>Risks Avoided</h3>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          <ul
            className={getListClass({
              responsive: true,
              padded: true,
              muted: false,
            })}
          >
            <li>
              Repeated calibration leading to possible overfitting, distorted
              output distributions and biased evaluations.
            </li>
          </ul>
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h1 className={getHeadingClass(1)}>Model Training</h1>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Objective</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Fit several multiclass classifiers and benchmark their training
          performances.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Approach</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The out-of-box classifiers were trained using a stratified training
          sample to ensure class distribution fidelity. Each classifier was
          isolated and initialized within each pipeline layer to prevent
          identity conflicts, so no trained instances were reused across layers.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This design choice was implemented by fitting an instantiated
          classifier (or pipeline object) on the same constant instance of the
          training set, then logging the artifact path as a function of the
          current timestamp information (after training), and then saving the
          model object in the defined artifact path, as well as optionally
          registering the model in the MLflow model registry with the model run
          version, training time metadata, and model alias, all under a given
          defined MLflow run with a distinct run ID, which can be fully
          traceable and reproducible as a parent path for nested child paths in
          subsequent pipeline stages for either evaluation or calibration.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Considerations</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Tree- and split-based models handled unscaled inputs, and
          non-tree-scale-sensitive models required feature standardization. To
          cater for this, pipeline objects were incorporated, with the{" "}
          <InlineCode>StandardScaler</InlineCode> required as a feature
          normalization step before model fitting for models that would require
          such, and then raw classifier objects for the rest.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Class imbalance was also accounted for during model training and
          metric computation, where in the facet of model training, the training
          set was sampled in a stratified manner, and in the latter case,
          class-focused metrics such as the weighted accuracy and per-class
          AUC-ROC scores were assessed, especially to investigate how badly each
          trained classifier performed in the underrepresented classes.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Model prediction characteristics (in terms of confidence) were also
          inferred based on domain knowledge and out-of-box (vanilla) behavior,
          where some predictions could be over- or under-confident. For example,
          the Logistic Regression classifier has a built-in probabilistic
          interpretation, so reasonably calibrated probabilities were to be
          expected. On the flip side, poorly calibrated predictions were also
          expected from the Naive Bayes classifier that often pushes
          probabilities to <InlineMath>0</InlineMath> or{" "}
          <InlineMath>1</InlineMath> (severely over-confident), and the Decision
          Tree classifier that averages scores, thus preventing extreme
          predictions (severely under-confident).
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Also, to return more reliable estimates for model evaluation and
          calibration assessment (before and after model training), the{" "}
          <InlineCode>cross_val_predict</InlineCode> was implemented.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Constraints</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Model complexity was largely attributed to the out-of-box approach and
          usage of the experimental models. Each model was instantiated with its
          default hyperparameter values and in some edge cases, capped off, like
          the Polynomial Regression that implemented a cubic degree.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          No classifiers were to be reused for any reason, even within the same
          layer. Each classifier, for any need, was independently initialized
          and properly named to avoid context mismatch.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Only classifiers with the <InlineCode>predict_proba</InlineCode>{" "}
          method advances to the calibration stage, as model calibration solely
          deals with predicted probabilities. To this effect, the SVC family
          (with different kernels) were trained and evaluated purely as a
          benchmarking need, as the returned probabilities are already
          inherently calibrated (by Platt Scaling) which could lead to bias
          results downstream.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Observations</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Training times varied significantly across model types, primarily
          reflecting algorithmic complexity. Simpler linear models like the
          Logistic Regression completed training in under a second, whereas
          ensembles like the Random Forests (with the default depth constraints)
          took several seconds. More computationally demanding models like the
          …. showed longer durations, especially when paired with the
          high-dimensional synthetic training data.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <div>
          <ClassifierTrainingTimesTable />
        </div>
        <div className={getTableAllowanceClass()}></div>
        <p
          className={`${getTextClass({
            responsive: true,
            muted: true,
          })} text-center`}
        >
          Table of Trained Classifiers and Training Times in Seconds and
          Milliseconds
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          In terms of model complexity and expressiveness, we tracked the
          approximate number of learnable parameters per classifier where
          applicable with a custom … function that involves …. For instance, the
          Logistic Regression with () features and () classes involved around ()
          learned weights (plus bias terms), while Random Forests with multiple
          trees had thousands of parameters, given the … characteristic of …
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <p
          className={`${getTextClass({
            responsive: true,
            muted: true,
          })} text-center`}
        >
          Plot of Number of Learnable Parameters per Classifier (Linear
          Classifiers)
        </p>
        <div className={getChartAllowanceClass()}></div>
        <div className="flex items-center justify-center">
          <HorizontalBarPlotChart
            data={linearClassifierParams}
            xKey="classifier"
            yKey="parameters"
          />
        </div>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <p
          className={`${getTextClass({
            responsive: true,
            muted: true,
          })} text-center`}
        >
          Plot of Number of Learnable Parameters per Classifier (Generative
          Classifiers)
        </p>
        <div className={getChartAllowanceClass()}></div>
        <div className="flex items-center justify-center">
          <HorizontalBarPlotChart
            data={generativeClassifierParams}
            xKey="classifier"
            yKey="parameters"
          />
        </div>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <p
          className={`${getTextClass({
            responsive: true,
            muted: true,
          })} text-center`}
        >
          Plot of Number of Learnable Parameters per Classifier (Margin
          Classifiers)
        </p>
        <div className={getChartAllowanceClass()}></div>
        <div className="flex items-center justify-center">
          <HorizontalBarPlotChart
            data={marginClassifierParams}
            xKey="classifier"
            yKey="parameters"
          />
        </div>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <p
          className={`${getTextClass({
            responsive: true,
            muted: true,
          })} text-center`}
        >
          Plot of Number of Learnable Parameters per Classifier (Tree
          Classifiers)
        </p>
        <div className={getChartAllowanceClass()}></div>
        <div className="flex items-center justify-center">
          <HorizontalBarPlotChart
            data={treeClassifierParams}
            xKey="classifier"
            yKey="parameters"
          />
        </div>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Insights</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Classifiers with much fewer parameters tend to train extremely fast
          and are inherently limited in expressiveness, which in turn makes them
          more interpretable and stable, but potentially underpowered for
          complex decision boundaries. On the other hand, more expressive
          classifiers with larger parameters have a much higher likelihood of
          capturing more nuanced patterns in the data, but with a cost of longer
          training times.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Asides internal classifier probability interpretations, the
          relationship between parameter count, model expressiveness and
          training times also set the stage for calibration, as more expressive
          classifiers fit the data better (trained much longer), but often
          produce less reliable probability estimates (may be overconfident).
          These sets of classifiers would benefit more from post-hoc calibration
          operations, as their raw confidence scores may not accurately reflect
          the true likelihoods.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h1 className={getHeadingClass(1)}>Model Evaluation (Post-Training)</h1>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Objective</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Evaluate classifier correctness and ranking ability (class
          discrimination).
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Approach</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          At its core, this stage leverages cross-validation prediction to
          assess both classification accuracy and probabilistic discriminative
          power, and it does so by generating out-of-fold predictions for every
          instance in the training dataset. We implemented this prediction
          method and then computed metrics that measured macro-averaged accuracy
          (treating each class equally), weighted accuracy (accounting for class
          prevalence/support) and top-k accuracy (top-2 in our case), to capture
          and account for partial successes. We also computed metrics that
          assessed class discrimination which was the AUC-ROC score, measured in
          a one-vs-rest fashion (OvR) and then averaged across classes (macro
          AUC-ROC), as well as per class AUC-ROC.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          To ensure classifier reproducibility for consistent evaluations, the
          run ID was returned from the previous model fitting stage and
          referenced as a parent run using MLflow’s tagging capability, then a
          nested child run was instantiated from this train run.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Key metadata such as the number of cross-validation folds and the
          top-k threshold values were logged as MLflow parameters alongside the
          evaluation metrics. These tags ensured that all results were fully
          traceable within MLflow’s environment and also interpretable in the
          downstream audit steps.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The output of this stage is a structured summary of evaluation
          metrics, a dedicated MLflow run for this evaluation step (nested under
          the original training run), and a reference run ID which would be used
          for calibration and downstream analysis.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Considerations</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          We ensured that the metric computations used where also implemented in
          the correct model prediction interfaces, so accuracy (macro and
          weighted) focused on discrete predictions with the predict() method,
          with the top-k accuracy metric implementing the predict_proba method.
          If the classifier supported the decision_function method, it’ll use it
          to compute AUC-ROC scores, else it’ll fallback to predict_proba.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Constraints</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Only classifiers with the predict_proba method were allowed to pass
          this stage. This was due to the need for consistent probabilistic
          outputs and calibration readiness, especially in a tightly controlled
          environment for calibration benchmarking. Probabilistic values are
          essential in not only computing top-k and AUC-ROC scores but also in
          enabling a seamless transition from the model evaluation stage to the
          model calibration stage, as confidence scores were required for
          interpreting and correcting miscalibration behavior.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Observations</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Most classifiers exhibited reasonably high macro and weighted
          accuracy, which could suggest possible string correctness across
          classes. However, the presence of class imbalance meant that the
          weighted accuracy often appeared inflated (or deflated as the case may
          be), particularly for classifiers that are less convincing towards the
          minority class or bias towards the majority ones.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Top-k accuracy was consistently higher than standard accuracy metrics.
          This also indicates that while top-ranked predictions often contain
          the true/actual class, calibration confidence might still be
          suboptimal and the classifier may just be trying to play it safe and
          luckily getting it right.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Macro AUC-ROC scores revealed that certain classifiers maintained a
          balanced separability across classes, but would be better explained
          with the per-class variant, as it is likely that the minority classes
          would show significantly lower discriminatory power.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <div>
          <ClassifierEvaluationPostTrainingTable />
        </div>
        <div className={getTableAllowanceClass()}></div>
        <p
          className={`${getTextClass({
            responsive: true,
            muted: true,
          })} text-center`}
        >
          Table of Trained Classifiers and Evaluation Metrics
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Expectedly, most classifiers struggled especially with the minority
          classes as explained by the per-class AUC-ROC scores. More robust
          classifiers like the tree ensembles and stacked … generally maintained
          good AUC-ROC scores for a reasonable number of classes, while SVCs
          displayed a much greater sensitivity to class imbalance.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <div>
          <ClassifierEvaluationPostTrainingPerClassAUCROCTable />
        </div>
        <div className={getTableAllowanceClass()}></div>
        <p
          className={`${getTextClass({
            responsive: true,
            muted: true,
          })} text-center`}
        >
          Table of Trained Classifiers and Per-Class AUC-ROC Scores
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Insights</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Strong classification performance is not uniformly distributed. High
          macro or weighted accuracy does not guarantee consistent per-class
          performance. This discrepancy highlights the importance of examining
          class-level AUC-ROC scores like we did, especially when dealing with
          imbalanced datasets.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Top-k accuracy could possibly mask confidence issues. While it was
          used as a proxy for identifying class-level conviction, it doesn’t
          essentially guarantee that the model is confident in its ranking,
          especially since the evaluation granularity points to local
          predictions per class, not globally across classes. This further
          suggested the need for more robust reliability assessments, which will
          be addressed in the calibration assessment stages.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          AUC-ROC is an early indicator of class separability, but it does not
          speak to the quality or calibration of predicted probabilities,
          especially when calibration methods may likely change the separability
          extent (but would not flip the order). This means that a model could
          rank classes well but may still be overconfident or underconfident in
          its estimates.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          These metrics provide a discrimination-first baseline, which serves as
          a reference point for evaluating the impact of calibration. Without
          them, it would be difficult to isolate or even measure improvements
          purely by post-hoc reliability adjustments.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h1 className={getHeadingClass(1)}>
          Miscalibration Assessment (Post-Training)
        </h1>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Objective</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Quantify how well the predicted probabilities match the observed
          outcomes.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Approach</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          This stage is responsible for quantifying the reliability of the
          probabilistic outputs produced by the trained classifiers (from the
          model training stage), and we implement this by assessing how closely
          the predicted probabilities align with true likelihoods.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Like the model evaluation stage, this assessment is performed using
          cross-validated predicted probabilities, ensuring that the predictions
          used for evaluation are out-of-fold and free from possible overfitting
          bias. Only classifiers that support the predict_proba interface are
          evaluated at this stage, as probabilistic outputs are a strict
          requirement for calibration metrics.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Once validated predictions are obtained, the model is assessed using
          the following reliability metrics: Expected Calibration Error (ECE),
          Maximum Calibration Error (MCE), Brier Score, and the mean and std of
          the Normalized Negative Entropy (NNE). Each metric is then logged with
          MLflow, alongside metadata like the number of cross-validation folds
          and number of bins used during ECE and MCE computation. If the
          classifier does not support predict_proba, it is excluded from
          calibration analysis and flagged with the appropriate metadata for
          traceability.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          By structuring the assessment in this way, we ensure a standardized
          and model-agnostic procedure for reliability evaluation. This then
          forms the foundation for the next pipeline stage (post-hoc
          calibration) where the goal shifts from measuring miscalibration to
          actively correcting it.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Considerations</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          While most binary classification tasks allow for the direct
          computation of the calibration metrics like the MCE and ECE,
          multiclass scenarios (like in my case) introduce an added layer of
          complexity. In order to adapt to the given scenario, the calibration
          metrics were augmented to use the maximum predicted probability per
          sample (which in this case was the confidence in the predicted class →
          formula). This simplified the analysis to a very large extent, but
          didn’t capture intra-class uncertainty.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Furthermore, ECE and MCE metrics relied on discretizing the
          probability space into a fixed bin size defined by the n_bins
          parameter. So the choice of bin count largely affects sensitivity,
          where too few bins could mask local calibration issues, and too many
          may result in sparse estimates. A moderate bin count (10 in my case)
          was chosen to balance resolution and stability.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          For the Brier score, due to its definition, it is inherently
          restricted to only binary classification tasks. To cater for this, we
          implemented a multiclass generalization by using a label binarizer
          that returns one-hot label encodings for all classes. The good thing
          about this simplification is that it seamlessly adapts to multiclass
          scenarios with super high clarity, but it’s interpretability might be
          obscured when measured along side other metrics, especially since the
          Brier score measures two distinct behaviors in a singular quantitative
          definition.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Also, the use of the normalized negative entropy (NNE) was purely to
          diagnose confidence variance across samples (as a proxy to classifier
          confidence) and is not used as a standalone measure of reliability.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          While reliability diagrams are commonly used in assessing classifier
          reliability, they were omitted in this stage to keep the process
          model-agnostic. This was a pragmatic decision for batch pipeline
          execution, though future iterations may include visual diagnostics for
          much better interpretation.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Rather than fail the entire pipeline when encountering a
          non-probabilistic model, these cases were logged with metadata and
          skipped. This allows for full pipeline completion even with
          heterogeneous model types and enables auditing of which models were
          excluded and why.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Constraints</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Only models that expose a predict_proba method were eligible for
          calibration analysis. This decision was intentional, as calibration is
          fundamentally about evaluating the trustworthiness of predicted
          probabilities, not raw class labels or pure decision scores. While
          this excludes models that relied on decision thresholds alone, like
          some hard-margin classifiers (SVCs) or tree ensembles without
          probability calibration, it ensures metric integrity.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Additionally, support vector classifiers (SVCs), even when configured
          to return probabilistic values, internally rely on Platt scaling,
          effectively performing implicit calibration. Including them in a fair
          and explicitly controlled calibration study would therefore be
          misleading. This constraint ensures a level playing field, where
          calibration behaviors are consistently externalized and evaluated
          rather than buried within model internals.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Observations</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <div>
          <ClassifierCalibrationPostTrainingTable />
        </div>
        <div className={getTableAllowanceClass()}></div>
        <p
          className={`${getTextClass({
            responsive: true,
            muted: true,
          })} text-center`}
        >
          Table of Trained Classifiers and Calibration Metrics
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Across the evaluated models, distinct calibration patterns emerged
          from the above metric scores.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Expected Calibration Error (ECE) values varied notably, with Model 1
          achieving the lowest ECE, suggesting a relatively smooth alignment
          between predicted probabilities and actual outcomes. Conversely, Model
          Y recorded the highest ECE, …
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          While ECE provides an averaged view, the Maximum Calibration Error
          (MCE) highlights the worst-case deviation between confidence and
          accuracy (in either the over-confident or the under-confident side),
          and this further differentiated the models. This was particularly
          apparent in Model ? which had a relatively acceptable ECE score but a
          large MCE score. Overall, MCE scores remained …
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Brier Scores, which combine both calibration and refinement, remained
          relatively low across the board, suggesting overall high-quality
          probabilistic predictions, with Model Y having the highest Brier
          score, indicating that predictions from this classifier are extremely
          miscalibrated and often dull, and Model X displaying the lowest score,
          which further indicates that its predictions are closer to the true
          empirical distribution and are also well refined. However, the overall
          small differences in the scores of the evaluated classifiers helped to
          surface some subtle gaps between the classifiers that would otherwise
          appear similar if judged with ECE/MCE alone.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The … classifier exhibited the lowest NNE mean ( ) and the lowest NNE
          std ( ) indicating not only strong overall calibration but also high
          local consistency. This means that when this classifier assigns, say,
          an x% confidence to an outcome, it consistently behaves like a “x%
          sure” classifier across various confidence bins.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The … classifier followed closely with a relatively low mean (0.18)
          and moderate variability (0.05), which implies reliable calibration
          with only mild local fluctuations. Not as smooth as the … classifier,
          but still fairly maintains a strong level of confidence across its
          predictions.
        </p>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          The … classifier on the other hand showed the highest NNE mean (…) and
          the largest standard deviation (…). This indicates not only less
          confident or overly conservative predictions, but also uneven
          calibration performance (as highlighted by its elevated variability),
          further denoting inconsistent reliability.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Insights</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h1 className={getHeadingClass(1)}>Model Calibration</h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Objective</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Improve the alignment between predicted probabilities and observed
          correctness.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Approach</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Considerations</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Constraints</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Observations</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Insights</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h1 className={getHeadingClass(1)}>
          Model Evaluation (Post-Calibration)
        </h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Objective</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Assess the improvement in model calibration post-correction.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Approach</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Considerations</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Constraints</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Observations</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Insights</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h1 className={getHeadingClass(1)}>
          Miscalibration Assessment (Post-Calibration)
        </h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Objective</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          Assess the improvement in model calibration post-correction.
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Approach</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Considerations</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Constraints</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Observations</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Insights</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h1 className={getHeadingClass(1)}>Model and Data Auditing</h1>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Objective</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Approach</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Considerations</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Constraints</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Observations</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
        <div className={getAllowanceClass({ axis: "py" })}></div>
        <h2 className={getHeadingClass(2)}>Insights</h2>
        <p className={getParagraphClass({ responsive: true, muted: false })}>
          ...
        </p>
      </section>
    </>
  ),
};

export default function Week22Page() {
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
        url: "/images/thumbnails/22.png",
        width: 1200,
        height: 630,
        alt: "Week 22 Recap",
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
        url: "/images/thumbnails/22.png",
        width: 1200,
        height: 630,
        alt: "Week 22 Recap",
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
      name: "Week 22 Recap",
      description: "Calibration Experimentation",
      url: `https://obukofejoseph.com/learning/recap/week-${recap.metadata.weekNumber}`,
      author: {
        "@type": "Person",
        name: "Obukofe Joseph",
        alternateName: "Obukofe Joe",
        url: "https://obukofejoseph.com",
        image: "https://obukofejoseph.com/images/thumbnails/22.png",
        sameAs: ["https://twitter.com/obukofejoe"],
      },
    }),
  },
};
