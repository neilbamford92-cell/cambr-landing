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

### Four articles are HELD, not published

`best-driving-roads-wales`, `-yorkshire-dales-north-pennines`, `evo-triangle-guide` and
`most-photographed-roads-britain` are **`noindex`**, absent from `sitemap.xml` and unlinked from
the Journal index. They state **23** top-tier roads while listing **18**, and the by-region table
sums to 18. They still use the legacy cream `journal.css`. (The fifth, the old held
`best-driving-roads-uk`, was replaced on 3 Nov by article 2 at the same URL. The draft is in git
history.)

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
now hero → definition → what we've built → how to use → why Cambr stands out → what's next → FAQ →
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
  eyebrow, the definition line, and the roadmap. The launch sentence is the
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

### Links to the scoring page and article 1

Wired on 2026-11-03, when both pages shipped. See the section below.

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
  `featureList`. The three "Soon" cards (Convoy, AI Trip Planner, Tunnel Finder) moved into the
  "What's next" roadmap on 2026-11-03, copy unchanged, so the features grid is live features only.
- **The car spots line in Browse & Discover is not signed-off copy.** The brief asked for one
  line and supplied none, so it was written here: "There are 71 car spots on there too, the meets
  and cafes worth ending a drive at."
- **Eleven image assets from the SEO pack are outstanding**, including the two that matter most,
  which are photographs rather than screenshots: the hero and an in-car shot. The new sections
  are text-only by design.

## `/how-scoring-works` and the first ranked article (2026-11-03)

Both built from `cambr-web - UPDATED` and published together, so neither ever links to a page
that does not exist yet. Both use the Journal design (`blog/assets/article.css`).

| Page | File | Source |
|---|---|---|
| `/how-scoring-works` | `how-scoring-works.html` (root, flat) | `how-scoring-works/copy.md` + `seo-pack.md` |
| `/blog/best-driving-routes-uk` | `blog/best-driving-routes-uk.html` | `article-1-best-driving-routes/copy.md` + `seo-pack.md` |

**The article lives under `/blog/`.** The handoff gives its slug as `/best-driving-routes-uk`;
the Journal lives at `/blog/`, so the slug is kept, undated, and the breadcrumb reads
Cambr › Journal › article like the other Journal pieces.

**The copy was generated from the markdown, not retyped**, then checked line by line against
the source: 85 of 85 lines on the article and 51 of 51 on the scoring page appear verbatim. The
Journal sets curly quotes, so straight quotes were typeset; no words changed. Deliberate changes:
the article's publish date is **3 November 2026** (Neil: ship date), and the
`[LINK: app page]` placeholder became a link on the word "Cambr".

**FAQ schema mirrors the visible page on both**, as on the homepage. That meant departing from
the packs in two places, because Google requires FAQ answers to be visible:

- The scoring pack's schema asked **"What makes a good driving road?"**, which is not one of the
  page's five visible questions. It is out of the schema. If you want it, add it to the visible
  Questions section and the schema together — it is the page's primary query.
- The article pack's schema carried 4 of the 7 visible questions, some with shortened answers.
  The schema now carries all 7, word for word.

**CTAs use the launch switch.** The scoring copy's CTA label was "Get Cambr for iPhone", which
predates the both-platforms launch; both pages use the switch's labels instead
(Get early access → Download Cambr).

**Internal links (article pack's table):** intro → `/how-scoring-works`; methodology → `/`;
FAQ → `/`. The three links to the **sibling roads article** (Hartside, Buttertubs, "Britain's 22
S-tier roads") are held until it exists: `grep -rn 'TODO wire' blog/`. The homepage now links
to both new pages: "Read how the scoring works in full" under the Duke's Pass callout, and
"46 drives and loops" in the closer.

**Route graphics** (Claude Design, 1920×1080) are in `assets/journal/best-driving-routes-uk/`,
named per the SEO pack, each as 800/1200/1600 WebP plus a 1600 JPG, with alt text from the pack.
14 MB of PNG became 2.9 MB across every size. The OG card and the Journal index thumbnail are
cut from the header graphic.

⚠️ **Scores date together.** Both pages say so in a comment at the top of the file. When the
founding elevation signal is corrected, re-run every figure and update the copy, the article's
table and `ItemList`, `dateModified`, and the scoring page's "Last updated" line and version.

### Homepage, round 2 (2026-11-03, Neil's review)

- **Definition band.** The canonical line ("Cambr is a UK iPhone and Android app…") is set at
  statement size: the defining clause in white, the rest grey, "the long way home" in rosso. The
  words are untouched and stay plain text. Beside it is a drawn route in tier colours: the
  article's #1 drive, Penrith to Reeth, labelled with the two S-tier roads it really crosses
  (Hartside Pass 88.9, Buttertubs 86.0) in the app's own road-pill style. If either score
  moves, update the pill.
- **Feature phone.** 328px wide at 1280px and up, which makes it exactly as tall as the card grid
  (both 683px); auto-sized card rows stretch to meet it. Between 901 and 1180px the cards wrap
  taller than any sensible phone, so it sits centred. Interim, pending Claude Design.
- **"Why Cambr stands out" replaces "How Cambr compares".** Title "Scored, not suggested." The
  columns are now map apps, **AI route planners** and Cambr. The magazine-list column is gone
  (Neil: nobody plans a trip from one in 2026). The AI planners Neil named as the real
  competitors are described as a category and never named. Each cell was checked against their
  store listings and press coverage on 2026-11-03:
  - none publishes a road score out of 100 or mentions a motoring-press layer;
  - one scores roads internally ("curves, climbs, surface and traffic") but shows no scale;
  - two navigate turn by turn; one exports to Google Maps instead;
  - one warns of speed cameras;
  - every one is iPhone-only or web-only, which is why "On iPhone and Android" is a row.
  **Re-check before changing a cell.** These apps add features fast — one already does convoys,
  fuel prices and CarPlay, so none of those are rows.
- **"What's next" replaces "What Cambr doesn't do yet"** (Neil: frame what's coming, not what's
  missing). Three stages — during the beta, after launch, on the roadmap — **following `/beta`'s
  own roadmap**, which another session updated the same afternoon (routes in Ireland and Europe
  moved to after launch; social features, convoy and landscape navigation during the beta).
  Sources are in the CSS comment. When `/beta`'s roadmap moves, move this. The limits are still stated, just as things on the way: offline maps, routing
  beyond GB, CarPlay. Two FAQs were reframed the same way, in the page and the schema together:
  offline ("Offline maps are on the roadmap. Until they arrive…") and outside the UK ("The map
  does…").

### `/how-scoring-works`, round 2 (2026-11-03, Neil's review)

The copy stayed; the layout was rebuilt, and two passages were reframed.

- **Layout** lives in `assets/method.css`, on top of the Journal's `article.css`: a hero with two
  phones, full-bleed bands as page breaks, a pull statement, the six factors as a numbered grid
  beside the Duke's Pass sheet, three tier-coloured road cards, a 55→100 tier scale above the
  table, and the version as a display figure.
- **`.device` is a realistic iPhone**, drawn in CSS: titanium edge, side buttons, Dynamic Island,
  glass sheen, optional 3D tilt (`tilt-l`, `tilt-r`). It scales from one variable, `--w`, so any
  page can use it by loading `method.css`. Screenshots go in at 1179×2556 from `uploads/`.
- **The road cards' bars** plot the algorithm score against the final score, both taken from the
  copy (Duke's 88.63 → 86.5, Hardknott 83.48 → 66.9, Bealach 93.19 → 75.9). They show that the
  press layer moved the number without explaining how — the page's rule is never to describe
  the combination.
- **The six factors and the three roads** set their bold lead-ins as headings. Every word is
  kept and the bodies are checked verbatim.
- **Reframed (Neil: what's coming, not what's missing).** "What the score cannot tell you"
  became **"What makes every drive different"**, the same four topics written as what drivers and
  reviews bring. "The day" is unchanged. The "outside the UK" answer leads with what is scored,
  in the page and the schema. The last clause of "What we don't publish" ("…where the whole
  thing falls short") pointed at the old section, so it now reads "…and what makes every drive
  different".
- **Built from the markdown by a script**, like round 1. 34 unchanged paragraphs and the nine
  run-in bodies are verified verbatim; FAQ schema drift is none.

### Round 3 (2026-11-03, Neil's second review)

**Homepage**
- **Definition-band map is real geometry.** Penrith to Reeth from `curated_routes`
  (`north-pennines-to-swaledale`), projected to British National Grid and coloured by the tier
  of each road it uses (unscored links in grey). Behind it, dimmed, is every scored road
  (`road_segments` + `discovered_roads`) in the box E 348000–410000, N 484500–552000. The
  transform is `x = (E − 350000) × 520/58000`, `y = (550000 − N) × 520/58000`, generated with
  PostGIS `ST_AsSVG` on the same affine. Hartside Pass sits north of Buttertubs, as it does on
  the ground. Re-run it if the route or the tiers move.
- **Tier marks** (◆ ▲ ·) on the tier cards are drawn as same-size 12px SVGs.
- **"Why Cambr stands out": seven rows, each a thing only Cambr does.** The title is "Route
  planners give you a route. Cambr gives you the map." The rows are what you pick by, a score for
  every road on an explorable map, the press check, building a route by picking roads off the
  map, navigation that tells you the score of the road you're on, drivers' ratings feeding the
  scores, and iPhone plus Android. A longer grouped version with "Some" cells was cut the same
  day (Neil: clear USPs, not a feature audit). On the route builder, one AI planner lets you
  pick a road and drive to it, but none lets you pick several and join them into a route (Neil,
  hands-on). Keep any new row to that standard: only add it if Cambr is the one with the tick.

**`/how-scoring-works`**
- **Worked examples are now S / A / B with three different stories.** Duke's Pass (agree),
  **A543 Evo Triangle** (the press lifts it: algorithm 63.04 = B, final 76.6 = A, live v3.6) and
  Hardknott (the press pulls it down). The Bealach card is gone because it made the same point
  as Hardknott. The A543 card copy is new and needs Neil's sign-off. A82 Glencoe makes the same
  point (74.83 → 84.5) but it is S tier, which Duke's already holds. Each card ends in a
  "Algorithm alone → With the press" tier line, pinned to the foot so the three line up.
- **Dead space taken out.** The question sits beside "Why score roads at all". The press
  mastheads are larger and centred. The tiers sit beside the route-options screen, "What makes
  every drive different" beside a drive in progress, and "How scores change" beside the
  rate-a-road screen. "What we don't publish" is a strip below it, and the questions are in two
  columns. New phone images: `uploads/app-route-options-640`, `app-loop-drive-640`,
  `app-rate-road-640` (from IMG_4822, IMG_4865 and `uploads/beta/rate-road.jpg`).
- **No more IBM Plex Mono, anywhere.** Neil: it looks AI-generated. `--mono` in `article.css`
  now points at Inter, and labels are set like the homepage eyebrows. **The Journal button is the
  homepage's rosso pill**, so the Journal pages changed with the scoring page. The diagram in
  "What makes a great driving road" is Inter too. The five held articles (`journal.css`) still
  carry Plex. Convert them when they are revived.

## Article 2: `/blog/best-driving-roads-uk` (2026-11-03)

"10 of the best driving roads in the UK and Ireland", built from the **newest** handoff zip
(`cambr-web-handoff - new blogs.zip`, 22:28), whose copy is a light edit of the earlier one. Ten of
the 22 S-tier roads count down from rank 20 to the R115 at 89.3. Every rank, score, length and the
England 11 / Wales 6 / Scotland 3 / Ireland 2 split were checked against the live database on
3 Nov.

- **Images:** `assets/journal/best-driving-roads-uk/`, the same ladder as article 1 (800/1200/1600
  WebP, 1600 JPG, OG 1200×630, index thumbs), from `~/Downloads/export-blog-howmany`. Alt text is
  the SEO pack's.
- **Schema:** Article, ItemList (positions 1–10, best first, as the pack notes), FAQPage mirroring
  all seven visible answers, and BreadcrumbList.
- **Links:** out to `/how-scoring-works` and to article 1 ("the highest-rated driving route in the
  country"). Article 1's three sibling placeholders now point here: "the highest-scoring road in
  Britain", "Buttertubs" and "Britain's 22 S-tier roads". No anchor between the two uses the other
  page's word.
- **Two changes to the signed-off copy, both factual.** (1) The FAQ "Can I navigate these in the
  app?" said all 22 have turn-by-turn, but #1 and R574 are in Ireland, where routing is not live
  yet. It now says the 20 in Britain do and Ireland is on the way. (2) The CTA button said "Get Cambr
  for iPhone". It now uses the launch switch like every other page.
- **Before the next re-score:** the B6276 and B6295 still have no description in the database (the
  pack's note), and R115/R574 are on v3.4 scores.

**Journal index order (3 Nov):** roads article, then `/how-scoring-works` as a Methodology tile
(Neil: it breaks up the two "10 best" tiles), then the routes article, then the founder's note. The
scoring page stays at its root URL; only the tile lives in the Journal. Its thumbnail is in
`assets/journal/how-scoring-works/`, rendered from the page's own phone mock-ups.

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
- [ ] "What's next" roadmap: "During the beta" ends at launch. Move anything that shipped
      out of it, and re-check every stage against `/beta`'s roadmap, which it follows.
- [ ] Founding-member line is hidden with the form at launch. Decide whether the offer continues
      and, if so, where it now lives.
- [ ] `/ios/`, `/android/` and `/beta/` are written for the test period.
- [ ] Add `aggregateRating` to `SoftwareApplication` **only** once real store ratings exist.
- [ ] "Why Cambr stands out": once convoy ships, consider a row for planning a route together
      and driving it together, and re-check the competitor cells against their listings.

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
