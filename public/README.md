# public/

Vite copies everything in this folder to the site root, untouched. A file
saved here as `logo.svg` is served at `/logo.svg`.

Reference these files by root-relative path (`/logo.svg`), never by an
import — and register them in `src/theme/assets.js` rather than hardcoding
the path into a component.
