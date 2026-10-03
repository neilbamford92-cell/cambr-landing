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
    glencoe-800.webp / -1200 / -1600 / -2000               # responsive hero (LCP)
    glencoe-1600.jpg                                       # hero JPG fallback
  photography/journal/         # Journal photography, 800/1200/1400 webp + 1400 jpg
    quiraing-*                 # lead image, "What makes a great driving road"
    quiraing-og-1200x630.jpg   # that article's social card
    black-mountain-* glencoe-* # the two in-article plates
uploads/
  app-map-640.webp / .jpg       # hero phone: UK map, A39 Exmoor 88.7 (eager, above the fold)
  app-dukes-640.webp / .jpg     # Duke's Pass score breakdown, 82.7 (lazy)
  app-drive-640.webp / .jpg     # active drive, Bealach na Ba ahead (lazy)
blog/
  index.html                   # the Journal index
  what-makes-a-great-driving-road.html
  assets/article.css           # the Journal design (dark product surface)
  assets/journal.css           # LEGACY cream surface — the five held articles only
privacy/index.html           # privacy policy — linked from the footer and the consent banner
beta-testing/index.html      # legacy URL, meta-refresh redirect to /beta (noindex)
data/                        # unlisted road-scores feed (JSON + CSV). Disallowed in robots.txt
assets/analytics.js          # GA4 + consent banner, loaded on every page
robots.txt                   # Allow all except /data/; declares the sitemap
sitemap.xml                  # 3 URLs — the five held guides are deliberately absent
```

## The Journal (`/blog/`)

The Journal is the **dark product surface** (`#141414`), styled by `blog/assets/article.css`
layered on `colors_and_type.css`. It is a hairline-and-rule system: border-radius `0` everywhere,
no shadows, no gradients. That restraint is the whole visual character and erodes easily.

Two nested measures do the layout work: `.wrap` at 1120px and `.col` at 760px nested inside it,
**left-aligned, not centred**, so photo plates run to the full content width and break out to the
right of the text column. That asymmetry is deliberate — do not centre `.col`.

Figure SVGs are **inlined in the document**, not `<img src>`. An `<img>`-loaded SVG is a sealed
document: it cannot reach the page's webfonts or CSS custom properties, so its labels fall back to
serif and its colours to hardcoded defaults. Each figure ships two artboards — a wide one and a
separate narrow drawing swapped in below 680px, because scaling the 700px artboard into a phone
viewport renders its 10–11px labels at about 5px.

### Five articles are HELD, not published

`best-driving-roads-uk`, `-wales`, `-yorkshire-dales-north-pennines`, `evo-triangle-guide` and
`most-photographed-roads-britain` are **`noindex`**, absent from `sitemap.xml` and unlinked from
the Journal index. They state **23** top-tier roads while listing **18**, and the by-region table
sums to 18. They still use the legacy cream `journal.css`.

To publish one: get the corrected count and regions, fix the list and the table, convert it to
`article.css`, drop the `noindex`, and add it back to the index and the sitemap.

### ⛔ THREE NUMBERS ON THE LIVE LANDING PAGE ARE WRONG

Checked **2026-10-02** against the live road-scores export generated that morning at 10:00 UTC.
The export is the authority — it is what the live map is scoring from, not a doc that may have
drifted. (It now lives in the private app repo, not here.)

```json
"roads": 4483, "by_tier": {"S": 21, "A": 259, "B": 4203}
```
(148 founding + 4,335 discovered.)

| `index.html` says | Reality | Where |
|---|---|---|
| "More than **6,000** roads ranked" | **4,483** | the score card |
| "The **20** best roads in Britain" | **21** in S-tier | S-Tier card |
| "the **nine** things that make a drive worth taking" | **eight** signals under v3.5 | ×5: hero body, score card, and the meta/og/twitter descriptions |

`blog/best-driving-roads-uk.html` repeats "nine" four more times, but it is `noindex` and unlinked.

**Why each is wrong:**

- **6,000 → 4,483.** The count has swung hard all year: 6,644 → 5,772 → 4,405 after the v3.5 cull,
  back over 6,500 when fifteen regions landed on 3 September, and down again since. ⚠️ **This is a
  moving number and should probably not be stated on a static page at all** — "thousands of roads"
  would never need maintaining.
- **20 → 21.** S-tier was 23 until the phantom-classification reversal (16 founding rows carried a
  duplicated `cls_v3` credit from the v3.3 write) was applied. A542 Horseshoe Pass dropped out of
  S-tier; it had been a phantom promotion. The feed confirms the reversal is now live.
- **nine → eight.** `lib/score_v35.py` `W_V35`, commented *"WHAT SHIPPED 2026-08-13 and what is
  LIVE on the map today"*: `cur .21 · elv .20 · cls .12 · drv .13 · np .11 · spdx .13 · end .05 ·
  cam .05` = 1.00. Eight. "Nine" came from the v3.3 table, which listed nine rows — but `trf` and
  `trn` both carried weight `0.00`. v3.5 drops those two and promotes `spdx` (measured average
  speed) to a first-class signal.

⛔ **Not fixed, because the landing copy is locked and these are Neil's call.** Flagged
2026-09-09 and again 2026-10-02.

✅ **Correct and verified against the same feed:** Duke's Pass **82.7**, A39 Exmoor **88.7** (both
in the app screenshots and the body copy), and the A82 Glencoe hero is itself an S-tier road at
84.5.

⚠️ "What makes a great driving road" is **right** at eight, with an eight-cell grid — the article
was never the problem. Its eight headings are not a 1:1 map of the eight signals, though: it has
"Enough length" (a length bonus, not a signal) and no section for `end` (end-point quality). The
counts agree; the memberships do not quite. Neil's "about eight things" carries that.

## Analytics and consent

GA4 property **G-42KLZHNL5B**, loaded from `assets/analytics.js` on every page. One file, one
include line; change it there and it changes everywhere.

**Why there is a banner at all.** UK PECR requires consent to store or read anything on a
visitor's device. The Data (Use and Access) Act 2025 added a "statistical purposes" exception,
but the ICO scopes it to cases where the sole purpose is your own statistics, the data is not
shared onward, and it is **not** used for advertising. GA4 feeds Google's advertising ecosystem,
so we do not rely on it.

Consent Mode v2 is set to **denied before `gtag.js` loads**, so until a visitor chooses, GA4 sends
cookieless pings and writes no identifiers.

⛔ **`ad_storage`, `ad_user_data` and `ad_personalization` stay denied permanently.** We run no
ads, so we do not ask for permission we have no use for. When paid starts that is a deliberate
edit and a change to the banner copy, not a flag flipped quietly.

⚠️ **Withdrawing consent must be as easy as giving it**, so a stored "granted" that could never be
revoked would not be lawful consent. `cambrConsentReset()` reopens the banner and is wired to a
button in the privacy policy. The two banner buttons are deliberately the same size and weight —
do not make "accept" the prominent one.

### The signup event

`cambrTrack('signup', { form, ref })` fires in `index.html` on the **real** Kit success path only.

⛔ **Do not move it into `showSuccess()`.** That function is also called for the honeypot, so
hooking it there would count bots as conversions. It carries which form converted (`hero-form` or
`closer-form`) and the `?ref=` code, which is what makes flyer-QR traffic visible at traffic level
rather than only when someone converts.

`cambrTrack` swallows its own errors: analytics must never break a signup.

### Deliberately not done

- **No hand-rolled outbound-click tracking.** GA4 Enhanced measurement is on for this stream and
  already fires a richer `click` event for off-site links.
- **No `anonymize_ip`.** That is a Universal Analytics flag; GA4 ignores it and anonymises
  natively, so passing it would imply a control we do not have.

Search Console is verified (auto-verified through the Google Workspace domain) and linked to GA4.
Event and user data retention are both set to 14 months, the maximum on the free tier.

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

## Footer trading disclosure — do not delete

Every page footer carries a `.legal` block naming Cambr Technologies Ltd, England and Wales,
company number 17371232 and the registered office. This is a **UK trading disclosure
requirement**, not decoration — any new page gets the same block, and it should not be
removed from an existing one. The rule is defined twice (inline in `index.html`, and in
`assets/pages.css` for the standalone pages); keep the two in step.

## Regenerating the optimised images

The served images are derived from the originals in the design handoff package
(`design_handoff_cambr_landing/`) using Pillow (`/usr/bin/python3`, `pip install Pillow`):

- **Hero** `glencoe` (source 4000×2250, the A82 through Glencoe): WebP at 800/1200/1600/2000w
  + a 1600w JPG fallback. The old Azores set stopped at 1400w only because its source was 1400;
  this source is 4000w, so the ladder goes further and large screens get a sharper hero.
  ⚠️ The hero grade was retuned with it — `saturate(1.85)` plus a green wash suited the hazy
  Azores frame and turns Glencoe acid green. It is now `contrast(1.06) saturate(1.1)`.
- **Phone shots** (`app-map`, `app-dukes`, `app-drive`): downscaled to 640w WebP + JPG
  (displayed ≤ ~300px). Sources are 1179×2556 iPhone captures and `.phone-screen` is
  `aspect-ratio: 1179/2556`, so they drop in with no cropping. **A score shown in a screenshot is
  also written in the body copy** — re-read both when swapping one in.
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
