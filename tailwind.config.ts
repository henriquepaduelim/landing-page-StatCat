import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-primary": "rgb(var(--color-brand-primary) / <alpha-value>)",
        "brand-accent": "rgb(var(--color-brand-accent) / <alpha-value>)",
        "bg-deep": "rgb(var(--color-bg-deep) / <alpha-value>)",
        "bg-dark": "rgb(var(--color-bg-dark) / <alpha-value>)",
        "text-primary": "rgb(var(--color-text-primary) / <alpha-value>)",
        "text-muted": "rgb(var(--color-text-muted) / <alpha-value>)",
        "border-subtle": "rgb(var(--color-border-subtle) / <alpha-value>)",
        primary: "rgb(var(--color-brand-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-brand-accent) / <alpha-value>)",
        accent: "rgb(var(--color-brand-accent) / <alpha-value>)",
        bg: "rgb(var(--color-bg-dark) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        text: "rgb(var(--color-text-primary) / <alpha-value>)",
        muted: "rgb(var(--color-text-muted) / <alpha-value>)",
        border: "rgb(var(--color-border-subtle) / <alpha-value>)",
      },
      borderRadius: {
        card: "var(--radius-card)",
        button: "var(--radius-button)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        glow: "var(--shadow-glow)",
        strong: "var(--shadow-strong)",
      },
      backgroundImage: {
        "gradient-brand": "var(--gradient-brand)",
        "gradient-dark-overlay": "var(--gradient-dark-overlay)",
      },
      maxWidth: {
        content: "var(--container-lg)",
        "content-md": "var(--container-md)",
        "content-sm": "var(--container-sm)",
      },
      spacing: {
        section: "var(--space-section)",
        hero: "var(--space-hero)",
        stack: "var(--space-stack)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
      },
      fontSize: {
        display: ["var(--text-display)", { lineHeight: "var(--line-display)", letterSpacing: "-0.03em" }],
        headline: ["var(--text-headline)", { lineHeight: "var(--line-tight)", letterSpacing: "-0.01em" }],
        title: ["var(--text-title)", { lineHeight: "var(--line-tight)" }],
        body: ["var(--text-body)", { lineHeight: "var(--line-body)" }],
        small: ["var(--text-small)", { lineHeight: "var(--line-body)" }],
      },
    },
  },
  plugins: [],
};

export default config;
