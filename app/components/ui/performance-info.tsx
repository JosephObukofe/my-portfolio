"use client";

import * as React from "react";
import { GradeBadge } from "./grade-badge";
import { MiniAreaChart } from "./miniareaplot";
import { UnderlineLink } from "./underline-link";
import { TransitionLink } from "@/app/components/PageTransition";

type GradeType =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D"
  | "F";

type MetricItem = {
  label: string;
  value: string;
  grade?: GradeType;
  unit?: string;
  link?: string;
  chartData?: any[]; // New prop for chart data
};

type MetricSection = {
  title: string;
  items: MetricItem[];
};

type PerformanceInfoProps = {
  sections: MetricSection[];
};

export function PerformanceInfo({ sections }: PerformanceInfoProps) {
  return (
    <div className="space-y-6 flex flex-col items-center">
      {sections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="
          grid grid-cols-[minmax(5rem,8rem)_1fr_auto] 
          gap-x-4 gap-y-3 items-center
          w-[280px] sm:w-[380px] md:w-[450px] 
          max-w-full
        "
        >
          {/* Section Title */}
          <div className="col-span-3 text-[0.75rem] sm:text-[0.85rem] font-satoshi font-medium mt-4 mb-1">
            {section.title}
          </div>

          {section.items.map((item, itemIndex) => (
            <React.Fragment key={itemIndex}>
              {/* Label */}
              <div className="text-[0.75rem] sm:text-[0.85rem] font-satoshi text-muted-foreground whitespace-nowrap">
                {item.label}
              </div>

              {/* Value - Now supports chart data */}
              <div className="justify-self-start text-[0.75rem] sm:text-[0.85rem] font-satoshi text-neutral-800 dark:text-neutral-200 tabular-nums whitespace-nowrap flex items-center">
                {item.chartData ? (
                  // Render mini chart with value overlay
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-[0.7rem] sm:text-[0.8rem] font-medium">
                      {item.value}
                      {item.unit && (
                        <span className="text-muted-foreground ml-0.5">
                          {item.unit}
                        </span>
                      )}
                    </span>
                    <div className="flex-1 max-w-[60px] sm:max-w-[80px]">
                      <MiniAreaChart data={item.chartData} height={20} />
                    </div>
                  </div>
                ) : item.link ? (
                  <TransitionLink href={item.link}>
                    <UnderlineLink>
                      {item.value}
                      {item.unit && (
                        <span className="text-muted-foreground ml-0.5">
                          {item.unit}
                        </span>
                      )}
                    </UnderlineLink>
                  </TransitionLink>
                ) : (
                  <>
                    {item.value}
                    {item.unit && (
                      <span className="text-muted-foreground ml-0.5">
                        {item.unit}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Badge */}
              <div className="justify-self">
                {item.grade && <GradeBadge grade={item.grade} />}
              </div>
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}
