"use client";

import * as React from "react";
import { getTextClass } from "@/utils/typography";
import { UnderlineLink } from "./underline-link";
import { StatusBadge } from "./status-badge";

type Resource = {
  label: string;
  url: string;
  type?: string;
};

type StatusType = "Completed" | "Ongoing" | "Draft" | "Skipped" | "Planned";

type WeekInfoProps = {
  week: number;
  date: string;
  status: StatusType;
  description: string;
  focusAreas: string[];
  resources?: Resource[];
};

export function WeekInfo({
  week,
  date,
  status,
  description,
  focusAreas,
  resources = [],
}: WeekInfoProps) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-12 gap-y-5 sm:gap-x-16 sm:gap-y-6 items-start">
      {/* Week */}
      <div className="text-[0.75rem] sm:text-[0.85rem] font-grotesk text-muted-foreground">
        Week
      </div>
      <div className="text-[0.75rem] sm:text-[0.85rem] font-grotesk text-neutral-800 dark:text-neutral-200">
        {week}
      </div>

      {/* Date */}
      <div className="text-[0.75rem] sm:text-[0.85rem] font-grotesk text-muted-foreground">
        Date
      </div>
      <div className="text-[0.75rem] sm:text-[0.85rem] font-grotesk text-neutral-800 dark:text-neutral-200">
        {date}
      </div>

      {/* Status */}
      <div className="text-[0.75rem] sm:text-[0.85rem] font-grotesk text-muted-foreground flex items-center h-[1.1rem] sm:h-auto sm:items-baseline">
        Status
      </div>
      <div className="flex items-center h-[1.1rem] sm:h-auto sm:items-baseline">
        <StatusBadge status={status} />
      </div>

      {/* Description */}
      <div className="text-[0.75rem] sm:text-[0.85rem] font-grotesk text-muted-foreground">
        Description
      </div>
      <div className="text-[0.75rem] sm:text-[0.85rem] font-grotesk text-neutral-800 dark:text-neutral-200">
        {description}
      </div>

      {/* Focus Areas */}
      <div className="text-[0.75rem] sm:text-[0.85rem] font-grotesk text-muted-foreground">
        Focus Areas
      </div>
      <div className="text-[0.75rem] sm:text-[0.85rem] font-grotesk text-neutral-800 dark:text-neutral-200">
        {focusAreas.join(", ")}
      </div>

      {/* Resources */}
      {resources.length > 0 && (
        <>
          <div className="text-[0.75rem] sm:text-[0.85rem] font-grotesk text-muted-foreground">
            Resources
          </div>
          <div className="flex flex-col gap-2 sm:gap-3">
            {resources.map((res, i) => (
              <div
                key={i}
                className="text-[0.75rem] sm:text-[0.85rem] font-grotesk"
              >
                <UnderlineLink href={res.url}>{res.label}</UnderlineLink>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
