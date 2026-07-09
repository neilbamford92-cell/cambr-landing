# cambr-landing

Static marketing/waitlist landing page for **Cambr** — Britain's best driving roads, on a map.

Single self-contained static site: one `index.html`, `colors_and_type.css`, and an `assets/` +
`uploads/` folder. **No build step.** Opens by double-clicking `index.html`; deploys as-is to
GitHub Pages. Mobile-first (most visitors arrive on a phone from an Instagram link).

> **Copy is locked.** The text in `index.html` is signed off and is the single source of truth.
> Do not edit, rephrase, or re-tier any wording, numbers, road names, scores, or mode names.

## Structure

```
index.html                 # the page (locked copy + inline styles + email-capture script)
colors_and_type.css        # Cambr design tokens (colours, type) — linked, do not fork
assets/
  favicon.svg              # favicon (SVG)
  og-image.jpg             # 1200×630 social share card (hero crop + wordmark)
  photography/thumbs/
    azores-cloudline-800.webp / -1200.webp / -1400.webp   # responsive hero (LCP)
    azores-cloudline-1400.jpg                              # hero JPG fallback
uploads/
  IMG_1163-640.webp / .jpg      # hero phone screenshot (lazy)
  dukes-640.webp / .jpg         # Duke's Pass score screenshot (lazy)
```

## Local preview

Two options:

1. **Double-click `index.html`** — opens in your browser. Good for a quick look.
2. **Serve it (recommended)** — needed to properly test the email form (a `file://` page can
   block `fetch`/CORS). From this folder:
   ```
   python3 -m http.server 8000
   ```
   then open <http://localhost:8000/>.

## Wire up the email form (Kit)

Both forms (hero + closer) POST to the **same Kit form**. There is one constant to fill in near the
top of the `<script>` block in `index.html`:

```js
const KIT_FORM_ACTION = "PASTE_KIT_FORM_ACTION_URL_HERE";
```

Paste your Kit form's submission endpoint here — in Kit, open your form ▸ **Embed** ▸ share/HTML;
the action URL looks like `https://app.kit.com/forms/XXXXXX/subscriptions`. The script POSTs the
email as the field `email_address` (Kit's expected name) and shows the design's success state on a
2xx, or a short retry message on failure. **The welcome email is configured in Kit, not here.** No
API keys live in the page. Each form also has a hidden honeypot field for basic spam protection.

## Regenerating the optimised images

The served images are derived from the originals in the design handoff package
(`design_handoff_cambr_landing/`) using Pillow (`/usr/bin/python3`, `pip install Pillow`):

- **Hero** `azores-cloudline` (source 1400×1050): WebP at 800/1200/1400w + a 1400w JPG fallback.
  Capped at the native 1400w — a 1600w variant would upscale.
- **Phone shots** (`IMG_1163`, `dukes`): downscaled to 640w WebP + JPG (displayed ≤ ~300px).
- **OG card** `og-image.jpg` (1200×630): a cover-crop of the hero, graded to match the on-site
  look, with the `Cambr.` wordmark burned in.

If you re-export the hero from the design source, keep the same filenames so `index.html` needs no
edits.

## Deploy

GitHub Pages, from this repo's default branch (root). A `CNAME` file mapping `cambr.uk` is added at
deploy time; DNS is configured in Squarespace. Full step-by-step is done interactively during
deploy.

## Notes

- **Ionicons** are loaded from a CDN (fine for v1).
- The **OG wordmark** is rendered in SF Pro Rounded (closest available match to the brand Nunito on
  the build machine); swap for a Nunito-rendered card later if desired.
