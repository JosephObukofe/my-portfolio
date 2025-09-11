import localFont from "next/font/local";

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

export const laBelleAurore = localFont({
  src: "../app/fonts/LaBelleAurore.woff2",
  variable: "--font-labelle-aurore",
  display: "swap",
});

export const base = {
  font: {
    satoshi: "font-satoshi",
    grotesk: "font-grotesk",
    laBelleAurore: "font-laBelleAurore",
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
      base: "text-[0.75rem]",
      sm: "text-[0.85rem]",
    },
    fontWeight: "font-medium",
    leading: {
      base: "leading-[1.95]",
      sm: "leading-[1.95]",
    },
  },
  headings: {
    h1: {
      fontSize: {
        base: "text-[0.95rem]",
        sm: "text-[1.05rem]",
      },
      leading: {
        base: "leading-[1.3]",
        sm: "leading-[1.3]",
      },
    },
    h2: {
      fontSize: {
        base: "text-[0.85rem]",
        sm: "text-[0.95rem]",
      },
      leading: {
        base: "leading-[1.3]",
        sm: "leading-[1.3]",
      },
    },
    h3: {
      fontSize: {
        base: "text-[0.75rem]",
        sm: "text-[0.85rem]",
      },
      leading: {
        base: "leading-[1.3]",
        sm: "leading-[1.3]",
      },
    },
  },
  section: {
    gap: "space-y-5 sm:space-y-6",
    marginBottom: "mb-30 sm:mb-32",
    marginTop: "mt-20 sm:mt-22",
  },
  divider: {
    base: "my-5",
    sm: "my-6",
  },
  spacing: {
    allowance: {
      base: "py-4",
      sm: "py-5",
    },
  },
  inlineCode: {
    fontSize: {
      base: "text-[0.65rem]",
      sm: "text-[0.70rem]",
    },
    padding: {
      base: "px-2 py-0.15",
      sm: "px-[2rem] py-[0.15rem]",
    },
    border: "border border-gray-200 dark:border-gray-700",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-gray-100 dark:bg-gray-900", // Here, I wanted the background color to be the same as the foreground but we'd correct this later. For now let's focus on responsiveness
    rounded: "rounded-md",
  },
  tableCellPadding: {
    base: "p-3",
    sm: "p-[1rem]",
  },
  tableHead: {
    height: "h-12",
    padding: {
      base: "px-3",
      sm: "px-[1rem]",
    },
    font: `${base.weight.medium} ${base.color.muted}`,
  },
  chart: {
    fontSize: {
      base: "text-[0.65rem]",
      sm: "text-[0.75rem]",
    },
    leading: {
      base: "leading-[1.5]",
      sm: "leading-[1.5]",
    },
  },
  weekInfo: {
    base: "grid grid-cols-[120px_1fr] gap-x-6 gap-y-6 max-w-xl mb-6",
    sm: "grid-cols-[120px_1fr] gap-x-7 gap-y-7 max-w-xl mb-7",
  },
  tooltip: {
    base: "px-3 py-1 rounded-full text-[0.65rem] transition-all duration-200",
    light: {
      bg: "#fefff8",
      color: "#0f172a",
      border: "1px solid #cccccc",
    },
    dark: {
      bg: "#ffffff1a",
      color: "#ffffff",
      border: "1px solid #ffffff33",
    },
    backdrop: "blur(4px)",
  },
  signature: {
    fontSize: {
      base: "text-2xl",
      sm: "text-3xl",
    },
  },
};

export const alignment = {
  text: {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  },
  vertical: {
    top: "align-top",
    middle: "align-middle",
    bottom: "align-bottom",
  },
};

export const toggle = {
  spacing: {
    themeToggleDot: {
      base: "h-6 w-6",
      sm: "h-6 w-6",
    },
    themeToggleDotInner: {
      base: "h-3 w-3",
      sm: "h-3 w-3",
    },
  },
};

export const styles = {
  body: `${base.font.satoshi} ${typography.paragraph.fontSize.base} ${typography.paragraph.fontWeight} ${typography.paragraph.leading.base} ${base.color.default}`,
  bodyMuted: `${base.font.satoshi} ${typography.paragraph.fontSize.base} ${typography.paragraph.fontWeight} ${typography.paragraph.leading.base} ${base.color.muted}`,

  list: `${base.font.satoshi} ${typography.paragraph.fontSize.base} ${typography.paragraph.fontWeight} ${base.color.default} ${base.spacing.list} list-disc pl-6`,
  listMuted: `${base.font.satoshi} ${typography.paragraph.fontSize.base} ${typography.paragraph.fontWeight} ${base.color.muted} ${base.spacing.list} list-disc pl-6`,

  button: `${base.font.grotesk} ${base.size.sm} ${base.weight.medium} tracking-tight ${base.color.default}`,
  buttonMuted: `${base.font.grotesk} ${base.size.sm} ${base.weight.medium} tracking-tight ${base.color.muted}`,
} as const;
