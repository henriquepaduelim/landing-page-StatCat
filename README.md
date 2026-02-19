# StatCat Landing Page

Production-ready, mobile-first landing page for StatCat Sports with a central content system and theme tokens.

## Getting started

```bash
npm install
npm run dev
```

## Rebranding guide

1. Update brand name, hero copy, navigation labels, and section text in `src/data/content.ts`.
2. Adjust pricing tiers, setup fee, add-ons, and discount values in `src/data/content.ts`.
3. Change colors, typography scale, spacing, radius, shadows, and gradients in `src/index.css` (`:root` tokens).
4. Update font families in `src/index.css` and the Google Fonts link in `index.html`.
5. Replace the logo text or mark by updating `content.brand.logoText` and `content.brand.logoMark` in `src/data/content.ts`.

## Notes

- Material Symbols are used for icons via the stylesheet in `index.html`.
- Theme tokens live in `src/index.css` and are mapped to Tailwind in `tailwind.config.ts`.
