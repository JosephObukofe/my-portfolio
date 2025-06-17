import localFont from "next/font/local";

// Font configurations
export const spaceGrotesk = localFont({
  src: [
    {
      path: "../app/fonts/SpaceGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/SpaceGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const jetbrainsMono = localFont({
  src: "../app/fonts/JetBrainsMono-Regular.woff2",
  variable: "--font-jetbrains",
  display: "swap",
});

export const satoshi = localFont({
  src: "../app/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

export const borna = localFont({
  src: "../app/fonts/borna-medium-webfont.woff2",
  variable: "--font-borna",
  display: "swap",
  weight: "500",
  style: "normal",
});

// Base styles
export const base = {
  font: {
    satoshi: "font-satoshi",
    grotesk: "font-grotesk",
  },
  size: {
    base: "text-[0.95rem]",
    sm: "text-[1rem]",
    md: "text-[1.025rem]",
    lg: "text-[1.05rem]",
    xl: "text-[1.10rem]",
  },
  weight: {
    medium: "font-medium",
    semibold: "font-semibold",
  },
  color: {
    default: "text-neutral-800 dark:text-neutral-200",
    muted: "text-muted-foreground",
  },
  spacing: {
    heading: "mt-6 mb-2",
    list: "space-y-1",
  },
} as const;

export const typography = {
  paragraph: {
    fontSize: {
      base: "text-[0.85rem]",
      sm: "sm:text-[0.90rem]",
      md: "md:text-[0.95rem]",
      lg: "lg:text-[1rem]",
      xl: "xl:text-[1.05rem]",
    },
    fontWeight: "font-medium",
    leading: {
      base: "leading-[1.66]",
      sm: "sm:leading-[1.66]",
      md: "md:leading-[1.66]",
      lg: "lg:leading-[1.67]",
      xl: "xl:leading-[1.68]",
    },
  },
  headings: {
    h1: {
      base: "text-[0.95rem]",
      sm: "sm:text-[1.05rem]",
      md: "md:text-[1.10rem]",
      lg: "lg:text-[1.15rem]",
      xl: "xl:text-[1.20rem]",
      spacing: "mt-6 mb-2",
    },
    h2: {
      base: "text-[0.90rem]",
      sm: "sm:text-[1rem]",
      md: "md:text-[1.05rem]",
      lg: "lg:text-[1.10rem]",
      xl: "xl:text-[1.15rem]",
      spacing: "mt-6 mb-2",
    },
    h3: {
      base: "text-[0.85rem]",
      sm: "sm:text-[0.95rem]",
      md: "md:text-[1rem]",
      lg: "lg:text-[1.05rem]",
      xl: "xl:text-[1.10rem]",
      spacing: "mt-6 mb-2",
    },
  },
  section: {
    gap: "space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 xl:space-y-9",
    marginBottom: "mb-30 sm:mb-32 md:mb-34 lg:mb-36 xl:mb-38",
    marginTop: "mt-20 sm:mt-22 md:mt-24 lg:mt-26 xl:mt-28",
  },
  divider: {
    base: "my-5",
    sm: "sm:my-6",
    md: "md:my-7",
    lg: "lg:my-8",
    xl: "xl:my-9",
  },
  spacing: {
    allowance: {
      base: "py-5",
      sm: "py-5",
      md: "py-5.2",
      lg: "py-5.4",
      xl: "py-5.6",
    },
  },
  inlineCode: {
    fontSize: {
      base: "text-[0.75rem]",
      sm: "sm:text-[0.80rem]",
      md: "md:text-[0.85rem]",
      lg: "lg:text-[0.90rem]",
      xl: "xl:text-[0.95rem]",
    },
    padding: {
      base: "px-2 py-0.15",
      sm: "sm:px-[2rem] sm:py-[0.15rem]",
      md: "md:px-[2rem] md:py-[0.175rem]",
      lg: "lg:px-[2.25rem] lg:py-[0.2rem]",
      xl: "xl:px-[2.25rem] xl:py-[0.225rem]",
    },
    border: "border border-gray-200 dark:border-gray-700",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-gray-100 dark:bg-gray-900",
    rounded: "rounded-md",
  },
};

export const toggle = {
  spacing: {
    themeToggleDot: {
      base: "h-6 w-6",
      sm: "h-6 w-6",
      md: "h-7 w-7",
      lg: "h-8 w-8",
      xl: "h-9 w-9",
    },
    themeToggleDotInner: {
      base: "h-3 w-3",
      sm: "h-3 w-3",
      md: "h-3.5 w-3.5",
      lg: "h-4 w-4",
      xl: "h-4.5 w-4.5",
    },
  },
};

// Combined styles with colors and spacing
export const styles = {
  // Headings (using typography.headings + base.font.grotesk + base.weight.semibold)
  h1: `${base.font.grotesk} ${typography.headings.h1.base} ${base.weight.semibold} ${base.color.default} ${typography.headings.h1.spacing}`,
  h2: `${base.font.grotesk} ${typography.headings.h2.base} ${base.weight.semibold} ${base.color.default} ${typography.headings.h2.spacing}`,
  h3: `${base.font.grotesk} ${typography.headings.h3.base} ${base.weight.semibold} ${base.color.default} ${typography.headings.h3.spacing}`,

  // Paragraphs (using typography.paragraph + base.font.satoshi)
  body: `${base.font.satoshi} ${typography.paragraph.fontSize.base} ${typography.paragraph.fontWeight} ${typography.paragraph.leading.base} ${base.color.default}`,
  bodyMuted: `${base.font.satoshi} ${typography.paragraph.fontSize.base} ${typography.paragraph.fontWeight} ${typography.paragraph.leading.base} ${base.color.muted}`,

  // Lists (same font + size as paragraph for consistency)
  list: `${base.font.satoshi} ${typography.paragraph.fontSize.base} ${typography.paragraph.fontWeight} ${base.color.default} ${base.spacing.list} list-disc pl-6`,
  listMuted: `${base.font.satoshi} ${typography.paragraph.fontSize.base} ${typography.paragraph.fontWeight} ${base.color.muted} ${base.spacing.list} list-disc pl-6`,

  // Buttons (still use grotesk font + sm size + weight)
  button: `${base.font.grotesk} ${base.size.sm} ${base.weight.medium} tracking-tight ${base.color.default}`,
  buttonMuted: `${base.font.grotesk} ${base.size.sm} ${base.weight.medium} tracking-tight ${base.color.muted}`,
} as const;
