import clsx from "clsx";
import { base, typography, jetbrainsMono } from "../lib/typography";

type Breakpoints = "base" | "sm" | "md" | "lg" | "xl";

function applyResponsive(
  obj: Partial<Record<Breakpoints, string | undefined>>
) {
  return Object.entries(obj)
    .filter(([, className]) => !!className)
    .map(([breakpoint, className]) =>
      breakpoint === "base" ? className : `${breakpoint}:${className}`
    );
}

export function getHeadingClass(
  level: 1 | 2 | 3,
  options?: {
    responsive?: boolean;
    customColor?: string;
  }
) {
  const heading = typography.headings[`h${level}` as "h1" | "h2" | "h3"];
  return clsx(
    base.font.grotesk,
    base.weight.semibold,
    heading.base,
    heading.spacing,
    options?.customColor ?? base.color.default,
    options?.responsive &&
      applyResponsive({
        sm: heading.sm,
        md: heading.md,
        lg: heading.lg,
        xl: heading.xl,
      })
  );
}

export function getParagraphClass(options?: {
  responsive?: boolean;
  muted?: boolean;
}) {
  return clsx(
    base.font.satoshi,
    typography.paragraph.fontWeight,
    typography.paragraph.fontSize.base,
    typography.paragraph.leading.base,
    options?.muted ? base.color.muted : base.color.default,
    options?.responsive && [
      ...applyResponsive(typography.paragraph.fontSize),
      ...applyResponsive(typography.paragraph.leading),
    ]
  );
}

export function getSectionClass(options?: {
  includeMarginTop?: boolean;
  includeMarginBottom?: boolean;
}) {
  return clsx(
    typography.section.gap,
    options?.includeMarginTop && typography.section.marginTop,
    options?.includeMarginBottom && typography.section.marginBottom
  );
}

export function getDividerClass() {
  return clsx(
    typography.divider.base,
    ...applyResponsive({
      sm: typography.divider.sm,
      md: typography.divider.md,
      lg: typography.divider.lg,
      xl: typography.divider.xl,
    })
  );
}

type ListOptions = {
  listType?: "ul" | "ol";
  muted?: boolean;
  padded?: boolean;
  responsive?: boolean;
};

export function getListClass(options: ListOptions = {}) {
  const {
    listType = "ul",
    muted = false,
    padded = true,
    responsive = true,
  } = options;

  const bulletStyle = listType === "ul" ? "list-disc" : "list-decimal";
  const padding = padded ? "pl-6" : "";
  const color = muted ? base.color.muted : base.color.default;

  const fontSize = responsive
    ? applyResponsive(typography.paragraph.fontSize)
    : typography.paragraph.fontSize.base;
  const leading = responsive
    ? applyResponsive(typography.paragraph.leading)
    : typography.paragraph.leading.base;

  return clsx(
    base.font.satoshi,
    typography.paragraph.fontWeight,
    fontSize,
    color,
    leading,
    base.spacing.list,
    bulletStyle,
    padding
  );
}

export function getMathBlockClass() {
  return clsx("overflow-x-auto", "max-w-full", "px-4");
}

export function getInlineCodeClass() {
  return clsx(
    jetbrainsMono.variable,
    ...applyResponsive(typography.inlineCode.fontSize),
    ...applyResponsive(typography.inlineCode.padding),
    typography.inlineCode.rounded,
    typography.inlineCode.color,
    typography.inlineCode.bgColor,
    typography.inlineCode.border
  );
}

export function getButtonClass(options?: { muted?: boolean; bold?: boolean }) {
  return clsx(
    base.font.grotesk,
    typography.paragraph.fontSize.base,
    options?.muted ? base.color.muted : base.color.default,
    options?.bold ? base.weight.semibold : base.weight.medium,
    ...applyResponsive(typography.paragraph.fontSize)
  );
}

export function getAllowanceClass({
  axis = "py",
}: { axis?: "py" | "pt" | "pb" | "my" | "mt" | "mb" } = {}) {
  const values = {
    base: `${axis}-5`,
    sm: `${axis}-5`,
    md: `${axis}-5.2`,
    lg: `${axis}-5.4`,
    xl: `${axis}-5.6`,
  };

  return clsx(
    values.base,
    ...applyResponsive({
      sm: values.sm,
      md: values.md,
      lg: values.lg,
      xl: values.xl,
    })
  );
}

export function getDigitalClockClass(options?: {
  responsive?: boolean;
  muted?: boolean;
}) {
  return clsx(
    base.font.grotesk,
    typography.paragraph.fontWeight,
    typography.paragraph.fontSize.base,
    typography.paragraph.leading.base,
    options?.muted ? base.color.muted : base.color.default,
    options?.responsive && [
      ...applyResponsive(typography.paragraph.fontSize),
      ...applyResponsive(typography.paragraph.leading),
    ]
  );
}

export function getDateClass(options?: {
  responsive?: boolean;
  muted?: boolean;
}) {
  return clsx(
    base.font.grotesk,
    typography.paragraph.fontSize.base,
    options?.muted ? base.color.muted : base.color.default,
    options?.responsive && [...applyResponsive(typography.paragraph.fontSize)]
  );
}
