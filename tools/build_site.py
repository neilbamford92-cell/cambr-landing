#!/usr/bin/env python3
"""Assemble the site for GitHub Pages and render the partner pages.

Run by .github/workflows/pages.yml on every push to main:

    python3 tools/build_site.py _site

1. Every file git tracks is copied into OUT_DIR byte for byte, except .github/
   and tools/. That is exactly what the old branch deploy served, so every other
   page is unchanged by this script.
2. Each partner page in PARTNERS is written as OUT_DIR/<slug>.html (served at
   /<slug>), rendered from index.html with three changes:
     - the Kit form ID in KIT_FORM_ACTION is swapped for the partner's form,
     - <link rel="canonical"> is replaced by <meta name="robots" content="noindex, nofollow">,
     - the partner line goes in at the <!-- partner-eyebrow --> comment in the hero.
   Everything else, the signup script and its success handling included, is the
   homepage as it stands. Partner pages are never committed, so they cannot drift.

If index.html changes shape so that any of the three changes can't be made
exactly once, the build fails and nothing deploys. That is deliberate: a
partner link that quietly 404s or collects into the wrong form is worse than a
loud failure. The error says which marker went missing.

Partner pages stay out of sitemap.xml, and nothing on the site links to them.
Standard library only, no dependencies.
"""
import html
import pathlib
import re
import shutil
import subprocess
import sys

# One entry per partner. The Kit form, and the tag a Kit rule adds to its
# subscribers, are set up in Kit; this only points the page at the form.
PARTNERS = [
    {
        "slug": "carmods",                       # /carmods
        "kit_form_id": "10143048",               # Kit form "carmods partner nov"
        "eyebrow": "For carmods.ai subscribers",
    },
]

ROOT = pathlib.Path(__file__).resolve().parent.parent
SKIP_PREFIXES = (".github/", "tools/")

KIT_ACTION = re.compile(r'(const KIT_FORM_ACTION = "https://app\.kit\.com/forms/)\d+(/subscriptions";)')
CANONICAL = re.compile(r'<link rel="canonical" href="[^"]*">')
EYEBROW_MARKER = re.compile(r'[ \t]*<!-- partner-eyebrow:[^>]*-->')


def fail(msg):
    sys.exit("build_site: " + msg)


def replace_once(pattern, repl, text, what):
    out, n = pattern.subn(repl, text)
    if n != 1:
        fail(f"expected exactly one {what} in index.html, found {n}. "
             "Restore it, or update tools/build_site.py to match.")
    return out


def render_partner(home, p):
    if not re.fullmatch(r"\d+", p["kit_form_id"]):
        fail(f"{p['slug']}: kit_form_id must be digits")
    page = replace_once(KIT_ACTION, lambda m: m.group(1) + p["kit_form_id"] + m.group(2),
                        home, 'KIT_FORM_ACTION line')
    page = replace_once(CANONICAL, '<meta name="robots" content="noindex, nofollow">',
                        page, '<link rel="canonical"> tag')
    page = replace_once(EYEBROW_MARKER,
                        lambda m: '      <p class="partner-eyebrow">' + html.escape(p["eyebrow"]) + '</p>',
                        page, '<!-- partner-eyebrow: ... --> comment')
    return page


def main():
    if len(sys.argv) != 2:
        fail("usage: build_site.py OUT_DIR")
    out = pathlib.Path(sys.argv[1]).resolve()
    if out == ROOT or ROOT in out.parents and not out.name.startswith("_"):
        fail("OUT_DIR inside the repo must start with an underscore, e.g. _site")
    if out.exists():
        shutil.rmtree(out)

    tracked = subprocess.run(["git", "ls-files", "-z"], cwd=ROOT, check=True,
                             capture_output=True).stdout.decode().split("\0")
    tracked = [f for f in tracked if f and not f.startswith(SKIP_PREFIXES)]
    for rel in tracked:
        dst = out / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / rel, dst)

    home = (ROOT / "index.html").read_text(encoding="utf-8")
    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    for p in PARTNERS:
        slug = p["slug"]
        if not re.fullmatch(r"[a-z0-9-]+", slug):
            fail(f"bad slug {slug!r}")
        if any(f == slug + ".html" or f.startswith(slug + "/") for f in tracked):
            fail(f"/{slug} already exists in the repo")
        if "/" + slug in sitemap:
            fail(f"/{slug} is in sitemap.xml; partner pages must stay out of it")
        (out / (slug + ".html")).write_text(render_partner(home, p), encoding="utf-8")

    print(f"build_site: {len(tracked)} files copied, partner pages: "
          + ", ".join("/" + p["slug"] for p in PARTNERS))


if __name__ == "__main__":
    main()
