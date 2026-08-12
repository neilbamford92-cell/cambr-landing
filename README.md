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
ios/index.html             # email destination — "I'll use it on iPhone"   (noindex)
android/index.html         # email destination — "I'll use it on Android"  (noindex)
beta/index.html            # beta instructions, edited often               (noindex)
assets/
  pages.css                # shared styling for the three pages above only
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

Both forms (hero + closer) POST to the **same Kit form**, already wired near the top of the
`<script>` block in `index.html`:

```js
const KIT_FORM_ACTION = "https://app.kit.com/forms/9666617/subscriptions";
```

Kit form **9666617**, single opt-in / auto-confirm, sending from `neil@cambr.uk`. This loop
works and is deliberately left alone — do not change the endpoint, the field names, the form
markup or the opt-in behaviour without re-testing a real signup end to end. The script POSTs the
email as the field `email_address` (Kit's expected name) and shows the design's success state on a
2xx, or a short retry message on failure. **The welcome email is configured in Kit, not here.** No
API keys live in the page. Each form also has a hidden honeypot field for basic spam protection.

## Ref-tag attribution (`?ref=`)

Printed flyers carry a **static** QR encoding exactly `https://cambr.uk/?ref=ph`. That QR is in
print and can never change, so the page has to meet it where it is.

On load, `index.html` reads the `ref` query parameter, sanitises it, and stores it in
`sessionStorage` under `cambr_ref`. On submit, it is attached to the Kit POST as
`fields[ref]`. Rules:

- **First touch wins** — an already-stored value is never overwritten.
- **Sanitising** — `[A-Za-z0-9_-]`, 1–32 chars. Anything failing that is *discarded*, not
  truncated: a trimmed code would be indistinguishable from a real one once it is in Kit.
  Re-sanitised on read as well as write, since `sessionStorage` is user-writable.
- **Never rendered** — the value is only ever posted to Kit. It never reaches the DOM, so
  there is no escaping burden.
- **Optional by construction** — no `ref`, blocked storage or a thrown error all leave the
  submission byte-for-byte as it was before. Attribution is nice to have; the signup is not.

> ⚠️ **The `ref` custom field must exist on the Kit account.** Kit's form endpoint answers
> `200 success` for field names that do not exist and silently discards them (verified against
> the live endpoint). A missing field therefore costs attribution but never a subscriber — it
> fails quiet, so confirm on a real subscriber record rather than trusting the 200.

To read the attribution in Kit: **Subscribers ▸ Filter ▸ Custom field ▸ `ref` is `ph`**, or save
it as a Segment.

## The email destination pages

`/ios`, `/android` and `/beta` are linked from subscriber emails. They are **`noindex`** — email
destinations, not search results — and are deliberately absent from `sitemap.xml`.

They share `assets/pages.css` rather than the landing page's inline `<style>`, so that editing
them can never disturb `index.html` or its signup form. The values in `pages.css` are copied
from `index.html`; it introduces no new design decisions. Ionicons is not loaded on these pages
(the one glyph needed, Instagram, is inlined as SVG) — they open from email on a phone, so they
stay dependency-free.

`beta/index.html` is built to be edited often: six fenced blocks, each with a
`<div class="todo">` placeholder that renders as a loud yellow "PLACEHOLDER" panel. Fill the
block in, delete the `todo` wrapper, bump the "Last updated" line. Editing instructions are in a
comment at the top of that file.

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
