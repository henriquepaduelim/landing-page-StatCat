export const theme = {
  colors: {
    primary: "239 71 111",
    secondary: "255 209 102",
    accent: "229 158 54",
    bg: "245 247 249",
    surface: "255 255 255",
    text: "12 17 22",
    muted: "88 99 111",
    border: "212 219 229",
  },
  sections: {
    dark: {
      bg: "10 13 18",
      surface: "18 24 33",
      text: "247 37 133",
      muted: "242 243 244",
      border: "35 43 58",
    },
    light: {
      bg: "242 245 249",
      surface: "255 255 255",
      text: "9 12 16",
      muted: "56 66 78",
      border: "214 221 230",
    },
  },
  radius: {
    sm: "6px",
    md: "12px",
    lg: "20px",
    xl: "28px",
    pill: "999px",
  },
  shadow: {
    soft: "0 18px 40px -28px rgb(6 12 28 / 0.25)",
    strong: "0 32px 70px -36px rgb(6 12 28 / 0.45)",
  },
  container: {
    sm: "36rem",
    md: "48rem",
    lg: "80rem",
  },
  spacing: {
    section: "6.5rem",
    hero: "7.5rem",
    stack: "2rem",
  },
  typography: {
    display: "clamp(2.9rem, 5.2vw, 4.5rem)",
    headline: "clamp(1.7rem, 2.6vw, 2.6rem)",
    title: "1.2rem",
    body: "1rem",
    small: "0.9rem",
    lineDisplay: "1.05",
    lineTight: "1.25",
    lineBody: "1.65",
  },
  fonts: {
    display: '"Sora", sans-serif',
    body: '"Manrope", sans-serif',
  },
};

export const applyTheme = (root: HTMLElement = document.documentElement) => {
  const { colors, radius, shadow, container, spacing, typography, fonts, sections } = theme;

  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });

  Object.entries(radius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value);
  });

  Object.entries(shadow).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value);
  });

  Object.entries(container).forEach(([key, value]) => {
    root.style.setProperty(`--container-${key}`, value);
  });

  Object.entries(spacing).forEach(([key, value]) => {
    root.style.setProperty(`--space-${key}`, value);
  });

  root.style.setProperty("--section-dark-bg", sections.dark.bg);
  root.style.setProperty("--section-dark-surface", sections.dark.surface);
  root.style.setProperty("--section-dark-text", sections.dark.text);
  root.style.setProperty("--section-dark-muted", sections.dark.muted);
  root.style.setProperty("--section-dark-border", sections.dark.border);
  root.style.setProperty("--section-light-bg", sections.light.bg);
  root.style.setProperty("--section-light-surface", sections.light.surface);
  root.style.setProperty("--section-light-text", sections.light.text);
  root.style.setProperty("--section-light-muted", sections.light.muted);
  root.style.setProperty("--section-light-border", sections.light.border);

  root.style.setProperty("--text-display", typography.display);
  root.style.setProperty("--text-headline", typography.headline);
  root.style.setProperty("--text-title", typography.title);
  root.style.setProperty("--text-body", typography.body);
  root.style.setProperty("--text-small", typography.small);
  root.style.setProperty("--line-display", typography.lineDisplay);
  root.style.setProperty("--line-tight", typography.lineTight);
  root.style.setProperty("--line-body", typography.lineBody);
  root.style.setProperty("--font-display", fonts.display);
  root.style.setProperty("--font-body", fonts.body);
};
