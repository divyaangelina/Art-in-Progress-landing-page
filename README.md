# Art in Progress — Landing Page

A museum-gallery-styled waitlist landing page, built with React + Vite.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a production build
in `dist/`.

**The waitlist form will fail under `npm run dev`.** Vite serves the static
site only — it does not execute the function in `api/`, so the submit returns
404 and the form shows its network error. That is expected. To run both
together, see *Testing the waitlist locally* below.

## Where things live

- **`src/versions/v2/content.js`** — every word on the page, in one object.
  No component contains prose; rewrite a string here and the page updates.
  Timeline `status` values (`done` / `current` / `next`) drive how far the
  gold rail fills.
- **`src/theme/theme.js`** — every design token: colors, typography, spacing,
  radius, shadows, motion, frame styles, spotlight settings. Change the
  visual identity here without touching a component.
- **`src/theme/assets.js`** — every image, keyed by name. Swap an image by
  editing its entry here only. Files live in `public/images/` and are
  referenced by root-relative path (`/images/foo.jpg`).
- **`src/hooks/useThemeVars.js`** — projects `theme.js` onto CSS custom
  properties at mount, so component CSS can use `var(--color-ink)`. This is
  the only file translating the token object into CSS.
- **`src/versions/v2/components/`** — one component per section, plus shared
  pieces (`RevealText`, `ScrollRail`).
- **`api/waitlist.js`** — the only server-side code. See below.

## The waitlist

The form posts to `/api/waitlist`, a serverless function that forwards the
address to [Buttondown](https://buttondown.com). The function exists so the
API key stays on the server: anything in `src/` is compiled into the browser
bundle, where a key would be readable by any visitor.

```
browser  ──POST {email}──>  api/waitlist.js  ──+ API key──>  Buttondown
(no key)                    (runs on Vercel)                 (stores it)
```

### One-time setup

1. Create a Buttondown account, then copy the API key from
   **Settings → Programming**.
2. In the Vercel project, go to **Settings → Environment Variables** and add:
   - Name: `BUTTONDOWN_API_KEY`
   - Value: the key from step 1
   - Environments: Production, Preview, and Development
3. Redeploy — environment variables are read at deploy time, so an existing
   deployment will not pick up a newly added key.

### Testing the waitlist locally

```bash
npm i -g vercel     # once
vercel link         # once, to connect this folder to the Vercel project
vercel env pull .env.local
vercel dev
```

`vercel dev` runs Vite and the `api/` function together, so the form works
end to end against the real Buttondown account. `.env.local` is gitignored.

### Behaviour worth knowing

- An address already on the list is treated as **success**, not an error —
  the person asked to be on the list and is on the list, and showing an error
  would only prompt a resubmit.
- The thank-you message replaces the form **only after** Buttondown confirms
  the address was stored. A failure leaves the form in place so the visitor
  can retry.
- The email is validated in the browser *and* again in the function. The
  browser check is a convenience; it can be bypassed by posting directly to
  the endpoint, so the server cannot rely on it.

## Notes

- Animations respect `prefers-reduced-motion`.
- `public/logo.png` was converted from a black-backed file to real
  transparency (un-premultiplied against black). The original is kept at
  `logo-original.png` in the project root, which is not served.
- Photography source files live in `new_photos/`; a photo must be copied into
  `public/images/` before its path in `assets.js` will resolve.
