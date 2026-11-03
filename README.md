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

### ✅ The three wrong numbers are fixed (2026-11-02, scoring v3.6)

Flagged 2026-09-09, again 2026-10-02, and corrected on 2026-11-02 from the `cambr-web`
handoff, which was written against the live database under **v3.6**. Neil signed the copy off,
which lifts the copy lock for these lines specifically.

| `index.html` said | Now says | Where |
|---|---|---|
| "More than **6,000** roads ranked" | "Every driving road in Britain and Ireland" | the score card |
| "The **20** best roads in Britain" | "The **22** highest-scoring roads in Britain and Ireland" | S-Tier card |
| "the **nine** things that make a drive worth taking" | "the **six** things…" | ×4: hero body + the meta/og/twitter descriptions |
| "Duke's Pass scores **82.7**" | **86.5** | the S-chip callout |

**The count is gone, not corrected.** It swung 6,644 → 5,772 → 4,405 → 6,500+ → 4,483 across a
single year, so any figure dates the moment the next region lands. The replacement line states
coverage instead, which never needs maintaining.

**nine → six, not eight.** The old note here read "eight", from `lib/score_v35.py` `W_V35`
(`cur · elv · cls · drv · np · spdx · end · cam`). That was the count of *internal weighted
signals* under v3.5. v3.6 presents **six factors** in the road sheet, and those are what the site
must agree with, because a reader can open the app and count them:

> **Corners · Climb · Scenery · Flow · Width & surface · Road type**, plus a separate press
> reputation layer.

Duke's Pass reconciles exactly: 25.0 + 9.3 + 10.4 + 11.8 + 10.1 + 10.0 = 76.6, plus 9.9 press
= **86.5**. Verified against `uploads/app-dukes-640.jpg`, which is that screen.
Use the app's own six names on any new page — when the page and the product use the same words,
anyone who checks one against the other finds they agree.

### ✅ Eight measures, six score lines — not a contradiction

Neil, 2026-11-03: **the scoring has eight measures.** Six of them have a proper score line, and
those six are what the road-detail screen shows. The other two make more sense stated as a fact
than drawn as a bar — cameras, for instance, reads as *none, some, lots* (the sheet shows "No
cameras" next to the speed limit and average speed). The app also deliberately uses **simpler
names** than the methodology docs.

So all of these are right, and none needs changing:

- `blog/what-makes-a-great-driving-road` — "about **eight** things", methodology names
- the homepage FAQ and article 1's FAQ — the eight, under methodology names
- the homepage score section and `/how-scoring-works` — the **six** the app draws as score lines,
  under the app's names

When writing new copy: say **six** when you mean what the road sheet shows a reader, and use the
app's names for them. Say **eight** only when describing everything the algorithm measures.

⚠️ **Scores expire together.** Every figure on the site is live as of 2026-11-02 under v3.6. The
founding elevation signal is a known defect, deferred by decision. When it is corrected, Hartside
88.9, Buttertubs 86.0, Duke's Pass 86.5, A39 Exmoor 87.8, Bealach 75.9, the 22 S-tier count and
the route percentages all move together. Re-run every figure after that release.

## Homepage 1b — schema and the cold-search sections (2026-11-02)

Built from `cambr-web/homepage/copy.md` (copy) and `seo-pack.md` (meta, schema). Page order is
now hero → definition → what we've built → how to use → comparison → honest limits → FAQ →
closer → footer.

**One `<script type="application/ld+json">` holds a three-node `@graph`:** `SoftwareApplication`,
`Organization`, `FAQPage`. The homepage had no structured data at all before this.

- **No `aggregateRating`**, and none until there are real App Store ratings. Inventing one is
  both a brand-rule violation and a structured-data penalty.
- **`countriesSupported: "GB"`**, the ISO code, which also matches the honest limit in the copy.
- **`operatingSystem: "iOS, Android"`.** Corrected 2026-11-02 on Neil's word that Cambr is in
  test on both devices now and **launches on both on the same day**. That one fact touched
  seven places on this page, so check all of them together if it ever changes: the three meta
  descriptions, `operatingSystem`, the FAQ answer (twice — visible and schema), the hero
  eyebrow, the definition line, and the honest-limits paragraph. The launch sentence is the
  one already signed off on `/android/`: "Cambr will launch on iPhone and Android on the same day."
- **`logo`** points at `assets/cambr-lockup-horizontal.png`, generated for this purpose. The SVG
  lockup is `#F5F5F5` on transparent, so it vanishes on the white background Google renders a
  logo against; the PNG is the lockup on brand dark `#141414` at 1200×400.
- **The FAQ schema mirrors the visible page verbatim.** Google requires the answer text to be
  present on the page, so the two must not drift. If you edit a question, edit both.

**The FAQ has eight questions, not the six in the SEO pack's schema block.** `copy.md` supplies
eight and the copy is the signed-off source, so cutting two to match a summary table would have
been an edit to final copy. The two extra are "Is Cambr a speed camera detector?" and "Who is
Cambr for?".

### Held links

Two internal links are deliberately absent until their pages exist. Both are marked in place:

```
grep -n 'TODO wire' index.html
```

`/how-scoring-works` (work item 2) from the score callout, and `/best-driving-routes-uk`
(work item 3) from the final CTA, anchor text "best driving routes".

### Other notes

- **Meta.** Title and description are the SEO pack's, with Neil's amendment to name Android:
  "Free on iPhone and Android." replaces the pack's "iOS. Free to explore." — 154 characters,
  inside the truncation limit. The H1 is unchanged; `copy.md` explicitly says keep the live one.
- **"Rip Turns. Arrive Late." is both the closer `<h2>` and the footer tag**, on every page.
  It moved out of the homepage footer on 2026-11-02 and Neil put it back on 2026-11-03.
- **The closer eyebrow is "The navigation tool for car enthusiasts"** (Neil, 2026-11-03),
  replacing "Cambr is built by enthusiasts, for enthusiasts."
- **The comparison table must stay a `<table>`.** It is the element most likely to be pulled into
  a search result or an AI answer. It sits in a labelled, keyboard-scrollable container so it
  survives 390px without forcing the page to scroll sideways; do not convert it to cards.
- **Three feature cards are Claude's wording, not handoff copy** (2026-11-03, at Neil's request
  to build out the features now that they are live in test): Curated Drives, Loop Generator,
  Route Builder. Claims were checked against app screenshots — "nearest to you", "x% on great
  roads", "best road in reach", "Add to route" — and "up to five stops" is from the schema
  `featureList`. The three "Soon" cards moved to their own row, unchanged.
- **The car spots line in Browse & Discover is not signed-off copy.** The brief asked for one
  line and supplied none, so it was written here: "There are 71 car spots on there too, the meets
  and cafes worth ending a drive at."
- **Eleven image assets from the SEO pack are outstanding**, including the two that matter most,
  which are photographs rather than screenshots: the hero and an in-car shot. The new sections
  are text-only by design — the honest-limits section in particular is meant to carry no icons.

## Launch day (24 November) — one switch, then a short checklist

**The switch is `assets/launch.js`.** Set `live: true` and paste the App Store URL into
`appStore`. The Play URL is already in (`uk.cambr.app`, the same package as `assetlinks.json`).
That one edit flips every CTA on every page that loads the file:

| Where | Waitlist (now) | Launch |
|---|---|---|
| Header CTA, homepage + Journal | Get early access → | Download Cambr → |
| Hero eyebrow | Now live in beta testing · iPhone and Android | Out now · iPhone and Android |
| Hero | email form + founding-member note | App Store + Google Play badges, in the copy column |
| Under the hero phone | "Coming soon" badges | hidden |
| Closer | email form | the two store badges |
| Journal closer button | Get early access | Download Cambr |

How it works: elements carry `data-show="waitlist"` or `data-show="launch"`, and one CSS rule
per stylesheet (search **"Launch switch"** — `index.html` and `blog/assets/article.css`) hides
whichever phase is not current. `launch.js` loads synchronously in `<head>` so the attribute is set
before first paint. **No JavaScript means waitlist**, which is the safe default. Links marked
`data-store="appStore"` / `"googlePlay"` get their `href` from the file.

To preview the launch state without flipping it for everyone, run in the browser console:
`document.documentElement.dataset.phase = 'launch'`.

**The switch does not touch prose or JSON-LD.** Do these by hand on the day:

- [ ] Homepage FAQ "Is Cambr available on Android?" — the answer says *in testing now, will
      launch on both on the same day*. Change it **in the visible FAQ and in the `FAQPage` schema**.
- [ ] `SoftwareApplication.offers.description` says "Cambr Pro available at public launch."
- [ ] Honest-limits section: "Convoy … arrives in November" — confirm or update.
- [ ] Founding-member line is hidden with the form at launch. Decide whether the offer continues
      and, if so, where it now lives.
- [ ] `/ios/`, `/android/` and `/beta/` are written for the test period.
- [ ] Add `aggregateRating` to `SoftwareApplication` **only** once real store ratings exist.

The handoff asked for the hero, "the mid-page block" and the final CTA to flip together. The page
has no mid-page CTA — its capture points are the header, the hero and the closer — so all three of
those are covered.

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
