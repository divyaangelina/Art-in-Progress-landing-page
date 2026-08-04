# Art in Progress — Landing Page (v1)

A museum-gallery-styled waitlist landing page, built with React + Vite.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a production build in `dist/`.

## Where things live

- **`src/theme/theme.js`** — every design token: colors, typography, spacing,
  radius, shadows, motion, frame styles, spotlight settings. Change the
  visual identity here without touching any component.
- **`src/theme/assets.js`** — every image used on the page, keyed by name.
  Swap an image by editing its `src` here only.
- **`src/hooks/useThemeVars.js`** — projects `theme.js` onto CSS custom
  properties at mount, so component `.css` files can use `var(--color-ink)`
  etc. This is the only file that translates the token object into CSS.
- **`src/components/`** — one component per section (`Hero`, `About`,
  `Features`, `Waitlist`), plus shared pieces (`FramedArtwork`,
  `FeatureCard`).
- **`src/styles/`** — one stylesheet per component, plus `global.css` for
  resets and base typography.

## Notes

- Images in `assets.js` are Unsplash placeholders — swap in final photography
  or artwork before launch.
- The waitlist form currently just shows a thank-you state on submit; wire
  `handleSubmit` in `Waitlist.jsx` to your email provider (Mailchimp,
  ConvertKit, a serverless function, etc.).
- Animations respect `prefers-reduced-motion`.
