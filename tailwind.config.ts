import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "animate-reveal",
    "opacity-0",
    "translate-y-3",
    "t-card",
    "t-card--hover",
    "t-section",
    "t-cta",
    "t-eyebrow",
    "swiper",
    "swiper-wrapper",
    "swiper-slide",
    "swiper-button-next",
    "swiper-button-prev",
    "swiper-pagination",
    "swiper-pagination-bullet",
    "swiper-pagination-bullet-active",
  ],
  prefix: "",
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
          DEFAULT: "#64748B",
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          foreground: "hsl(var(--secondary-foreground))",
        },
        success: {
          DEFAULT: "#10B981",
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        warning: {
          DEFAULT: "#F59E0B",
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        destructive: {
          DEFAULT: "#EF4444",
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({
      addUtilities,
      addComponents,
      theme,
    }: {
      addUtilities: any;
      addComponents: any;
      theme: (path: string) => any;
    }) {
      // Fluid Typography
      addUtilities({
        ".text-fluid-sm": {
          "font-size": "clamp(0.875rem, 0.8vw + 0.7rem, 1rem)",
        },
        ".text-fluid-base": {
          "font-size": "clamp(1rem, 1vw + 0.75rem, 1.125rem)",
        },
        ".text-fluid-lg": {
          "font-size": "clamp(1.125rem, 1.2vw + 0.9rem, 1.25rem)",
        },
        ".text-fluid-xl": {
          "font-size": "clamp(1.25rem, 1.5vw + 1rem, 1.5rem)",
        },
        ".text-fluid-2xl": {
          "font-size": "clamp(1.5rem, 2vw + 1.1rem, 2rem)",
        },
        ".text-fluid-3xl": {
          "font-size": "clamp(1.875rem, 2.5vw + 1.2rem, 2.5rem)",
        },
        ".text-balance": {
          "text-wrap": "balance",
        },
      });

      // Responsive Container
      addComponents({
        ".container-responsive": {
          width: "100%",
          "margin-left": "auto",
          "margin-right": "auto",
          "padding-left": "clamp(1rem, 3vw, 2rem)",
          "padding-right": "clamp(1rem, 3vw, 2rem)",
          "max-width": "1440px",
        },
        ".grid-auto-cards": {
          display: "grid",
          "grid-template-columns": "repeat(auto-fit, minmax(280px, 1fr))",
          gap: theme("spacing.6"),
        },
      });
    },
  ],
} satisfies Config;
