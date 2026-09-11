# Art in Progress — Landing Page

A museum-gallery-styled waitlist landing page, built with React + Vite.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a production build in `dist/`.

**The waitlist form will not work under `npm run dev`.** Vite serves the static site only — it does not execute the function in `api/`, so the submit returns 404 and the form shows its network error. That is expected. To run both together, see *Testing the waitlist locally* below.

## Where things live

- **`src/versions/v2/content.js`** — every word on the page, in one object. No component contains prose; rewrite a string here and the page updates. Timeline `status` values (`done` / `current` / `next`) drive how far the gold rail fills.

- **`src/theme/theme.js`** — every design token: colors, typography, spacing, radius, shadows, motion, frame styles, spotlight settings. Change the visual identity here without touching a component.

- **`src/theme/assets.js`** — every image, keyed by name. Swap an image by editing its entry here only. Files live in `public/images/` and are referenced by root-relative path (`/images/foo.jpg`).

- **`src/hooks/useThemeVars.js`** — projects `theme.js` onto CSS custom properties at mount, so component CSS can use `var(--color-ink)`. This is the only file translating the token object into CSS.

- **`src/versions/v2/components/`** — one component per section, plus shared pieces (`RevealText`, `ScrollRail`, `PrivacyPolicy`).

- **`src/versions/v2/styles/`** — styles for the individual sections and pages.

- **`api/waitlist.js`** — the only server-side code. See below.

## The waitlist

The waitlist form posts to `/api/waitlist`, a serverless function that adds the submitted email address to the Art in Progress Google Sheet.

The Google service-account credentials stay on the server and are never sent to the browser.

```text
browser  ──POST {email}──>  api/waitlist.js  ──Google Sheets API──>  Waitlist spreadsheet
(no key)                    (runs on Vercel)                         (stores email + timestamp)
```

### One-time setup

The waitlist endpoint requires three environment variables:

- `GOOGLE_SHEET_ID` — the ID of the Google Sheet used for the waitlist.
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` — the email address of the Google Cloud service account.
- `GOOGLE_PRIVATE_KEY` — the private key associated with the service account.

These values should be stored as environment variables in Vercel and **must never be committed to Git**.

The Google Sheet must also be shared with the service-account email with permission to edit the spreadsheet.

### Spreadsheet format

The waitlist endpoint writes two values to the `Waitlist` sheet:

| Column | Value |
|---|---|
| A | Email address |
| B | Submission timestamp |

The sheet should therefore contain a tab named `Waitlist`.

### Testing the waitlist locally

```bash
npm i -g vercel     # once

vercel link         # once, to connect this folder to the Vercel project

vercel env pull .env.local

vercel dev
```

`vercel dev` runs Vite and the `/api` function together, allowing the waitlist form to work end to end against the configured Google Sheets account.

Environment files such as `.env` and `.env.local` are gitignored and should never be committed.

### Behaviour worth knowing

- An email address is validated in the browser **and** again in the serverless function. The browser check is a convenience; it can be bypassed by posting directly to the endpoint, so the server cannot rely on it.

- The thank-you message replaces the form **only after** Google Sheets confirms that the request succeeded.

- If the Google Sheets request fails, the form remains in place and displays an error so the visitor can retry.

- Each successful submission adds the email address and the submission timestamp as a new row in the waitlist spreadsheet.

## Privacy Policy

The landing page includes a separate Privacy Policy at `/privacy`.

The current policy applies specifically to the landing page and waitlist. It may be updated when the Art in Progress MVP launches and the platform begins collecting or processing additional information.

## Notes

- Animations respect `prefers-reduced-motion`.

- `public/logo.png` was converted from a black-backed file to real transparency (un-premultiplied against black). The original is kept at `logo-original.png` in the project root, which is not served.

- Photography source files live in `new_photos/`; a photo must be copied into `public/images/` before its path in `assets.js` will resolve.

- The project is currently a landing page and waitlist for Art in Progress. The full MVP is planned for a later release.