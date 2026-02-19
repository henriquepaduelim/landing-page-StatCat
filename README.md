# StatCat Landing Page

Production-ready, mobile-first landing page for StatCat Sports with a central content system and theme tokens.

## Getting started

```bash
npm install
npm run dev
```

## Media optimization

To keep video payload small in production, run:

```bash
npm run optimize:media
```

This re-encodes:
- `public/media/herolanding.mp4` (H.264, 1280px max width)
- `public/media/EliteOneGoalkeepers.webm` (VP9, 960px max width)
- `public/media/combineChart.webm` (VP9, 960px max width)

## Lighthouse comparison (before/after)

1. Generate/export a **before** report from Chrome DevTools Lighthouse.
2. Apply performance changes.
3. Generate/export an **after** report from the same machine/profile.
4. Compare both reports:

```bash
npm run lh:compare -- <before.report.html> <after.report.html>
```

Note: if a report has `NO_FCP`, it is invalid for comparison and must be re-generated.

## Rebranding guide

1. Update brand name, hero copy, navigation labels, and section text in `src/data/content.ts`.
2. Adjust pricing tiers, setup fee, add-ons, and discount values in `src/data/content.ts`.
3. Change colors, typography scale, spacing, radius, shadows, and gradients in `src/index.css` (`:root` tokens).
4. Update font families in `src/index.css` and the Google Fonts link in `index.html`.
5. Replace the logo text or mark by updating `content.brand.logoText` and `content.brand.logoMark` in `src/data/content.ts`.

## Notes

- Icons are rendered via local SVG paths in `src/components/Icon.tsx` (no external icon webfont).
- Theme tokens live in `src/index.css` and are mapped to Tailwind in `tailwind.config.ts`.
