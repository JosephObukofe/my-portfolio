import clsx from "clsx";
import { useTheme } from "next-themes";
import { base, typography, jetbrainsMono, alignment } from "../lib/typography";

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

export function getTableCellClass() {
  return clsx(
    typography.paragraph.fontSize.base,
    ...applyResponsive(typography.paragraph.fontSize)
  );
}

export function getTableCellPaddingClass() {
  return clsx(
    typography.tableCellPadding.base,
    ...applyResponsive(typography.tableCellPadding)
  );
}

export function getTableHeadClass() {
  return clsx(
    base.font.grotesk,
    typography.paragraph.fontSize.base,
    ...applyResponsive(typography.paragraph.fontSize)
  );
}

export function getTableCaptionClass() {
  return clsx(
    base.font.grotesk,
    base.color.muted,
    typography.paragraph.fontSize.base,
    ...applyResponsive(typography.paragraph.fontSize)
  );
}

export function getTableCellMathClass() {
  return clsx(...applyResponsive(typography.tableCellMath.fontSize));
}

export function getAlignmentClass(options?: {
  text?: keyof typeof alignment.text;
  vertical?: keyof typeof alignment.vertical;
}) {
  return clsx(
    options?.text && alignment.text[options.text],
    options?.vertical && alignment.vertical[options.vertical]
  );
}

export function getChartTextClass() {
  return clsx(base.font.grotesk, base.color.muted, typography.chart.base);
}

export function getTooltipClass() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const baseClasses = clsx(typography.tooltip.base);

  const style = {
    backgroundColor: isDark
      ? typography.tooltip.dark.bg
      : typography.tooltip.light.bg,
    color: isDark
      ? typography.tooltip.dark.color
      : typography.tooltip.light.color,
    border: isDark
      ? typography.tooltip.dark.border
      : typography.tooltip.light.border,
    backdropFilter: typography.tooltip.backdrop,
    WebkitBackdropFilter: typography.tooltip.backdrop,
  };

  return { className: baseClasses, style };
}

export function getBarChartLabelClass() {
  return clsx(base.font.grotesk, typography.chart.base);
}

export function getStackedBarPlotInnerStacks<
  T extends Record<string, number | string>
>(
  data: T[],
  stackKeys: string[],
  gapValue: number = 2
): Array<T & Record<string, number>> {
  return data.map((item) => {
    const spacedItem: Record<string, any> = { ...item };

    stackKeys.forEach((key, idx) => {
      if (idx !== stackKeys.length - 1) {
        const gapKey = `__gap__${key}`;
        spacedItem[gapKey] = gapValue;
      }
    });

    return spacedItem as T & Record<string, number>;
  });
}

export function getGapKeys(stackKeys: string[]): string[] {
  return stackKeys.slice(0, -1).map((key) => `__gap__${key}`);
}

export function getNormalizedDeltaStacks(
  data: any[],
  baselineKey: string,
  deltaKey: string
) {
  return data.map((d) => ({
    model: d.model,
    baseline: d[baselineKey],
    increase: d[deltaKey] > 0 ? d[deltaKey] : 0,
    decrease: d[deltaKey] < 0 ? Math.abs(d[deltaKey]) : 0,
  }));
}

export function convertToPercentageStack(data: any[]): any[] {
  return data.map((d) => ({
    ...d,
    baseline: d.baseline * 100,
    increase: d.increase * 100,
    decrease: d.decrease * 100,
  }));
}
