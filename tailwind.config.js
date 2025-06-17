/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "space-y-5",
    "sm:space-y-6",
    "md:space-y-7",
    "lg:space-y-8",
    "xl:space-y-9",

    "mb-30",
    "sm:mb-32",
    "md:mb-34",
    "lg:mb-36",
    "xl:mb-38",

    "mt-20",
    "sm:mt-22",
    "md:mt-24",
    "lg:mt-26",
    "xl:mt-28",

    "text-[0.75rem]",
    "sm:text-[0.80rem]",
    "md:text-[0.85rem]",
    "lg:text-[0.90rem]",
    "xl:text-[0.95rem]",

    "px-[2rem]",
    "py-[0.15rem]",
    "sm:px-[2rem]",
    "sm:py-[0.15rem]",
    "md:px-[2.5rem]",
    "md:py-[0.175rem]",
    "lg:px-[2.25rem]",
    "lg:py-[0.2rem]",
    "xl:px-[2.25rem]",
    "xl:py-[0.225rem]",

    "rounded-md",
    "bg-gray-100",
    "dark:bg-gray-900",
    "border",
    "border-gray-200",
    "dark:border-gray-700",
    "text-red-600",
    "dark:text-red-400",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        spacing: {
          5.2: "1.3rem",
          5.4: "1.35rem",
          5.6: "1.4rem",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        20: "5rem",
        22: "5.5rem",
        24: "6rem",
        26: "6.5rem",
        28: "7rem",
        30: "7.5rem",
        32: "8rem",
        34: "8.5rem",
        36: "9rem",
        38: "9.5rem",
        40: "10rem",
        42: "10.5rem",
        44: "11rem",
        46: "11.5rem",
        48: "12rem",
      },
      fontSize: {
        "p-sm": ["0.85rem", { lineHeight: "1.65" }],
        "p-md": ["0.90rem", { lineHeight: "1.65" }],
        "p-lg": ["0.95rem", { lineHeight: "1.66" }],
        "p-xl": ["1rem", { lineHeight: "1.67" }],
        "p-2xl": ["1.05rem", { lineHeight: "1.68" }],

        "h1-sm": ["0.95rem"],
        "h1-md": ["1.05rem"],
        "h1-lg": ["1.10rem"],
        "h1-xl": ["1.15rem"],
        "h1-2xl": ["1.20rem"],

        "h2-sm": ["0.90rem"],
        "h2-md": ["1.00rem"],
        "h2-lg": ["1.05rem"],
        "h2-xl": ["1.10rem"],
        "h2-2xl": ["1.15rem"],

        "h3-sm": ["0.85rem"],
        "h3-md": ["0.95rem"],
        "h3-lg": ["1.00rem"],
        "h3-xl": ["1.05rem"],
        "h3-2xl": ["1.10rem"],
      },
      fontFamily: {
        sans: ["var(--font-satoshi)", "sans-serif"],
        grotesk: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        satoshi: ["var(--font-satoshi)", "sans-serif"],
        borna: ["var(--font-borna)", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
