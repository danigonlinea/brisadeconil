#!/usr/bin/env python3
"""Sweep an entire static build for on-page SEO regressions.

Run AFTER the site build, from the repo root:

    python3 audit-build-seo.py            # defaults to ./dist
    python3 audit-build-seo.py build      # custom output dir

Asserts, for every generated page:
  * exactly one <h1>
  * a <link rel="canonical"> is present
  * every JSON-LD block parses as JSON
  * every site-absolute internal link resolves to a generated file
  * every hreflang alternate resolves to a generated file

Asserts, for every blog post source file (src/content/blog{,-en,-de}/):
  * every translations.<locale> slug exists as a real file in that
    locale's collection
  * the relation is reciprocal (the sibling points back)

Exits non-zero and prints a report when anything fails, so it can gate CI.

Why a whole-build sweep instead of spot checks: per-page grepping misses the
pages you did not think to check, which is exactly where locale-prefixed or
newly templated routes break.
"""
import glob
import json
import os
import re
import sys

OUT = sys.argv[1] if len(sys.argv) > 1 else "dist"

LD = re.compile(r'<script type="application/ld\+json">(.*?)</script>', re.S)
H1 = re.compile(r"<h1[^>]*>")
CANON = re.compile(r'rel="canonical"')
HREF = re.compile(r'href="(/[^"]*)"')
LINK_TAG = re.compile(r"<link\b[^>]*>", re.I)
FM = re.compile(r"\A---\s*\n(.*?)\n---", re.S)
TRANSLATIONS_BLOCK = re.compile(r"^translations:\s*$\n((?:^[ \t]+\w+:.*$\n?)+)", re.M)
TRANSLATION_ENTRY = re.compile(r'^\s+(\w+):\s*"([^"]+)"\s*$', re.M)

# Locale -> markdown source dir (relative to the repo root, i.e. the parent
# of this script's directory) holding that locale's blog collection.
BLOG_SOURCE_DIRS = {
    "es": os.path.join("src", "content", "blog"),
    "en": os.path.join("src", "content", "blog-en"),
    "de": os.path.join("src", "content", "blog-de"),
}

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def resolves(out: str, link: str) -> bool:
    """A site-absolute link resolves if it maps to a built file."""
    clean = link.split("#")[0].split("?")[0]
    if not clean or clean == "/":
        clean = "/index.html"
    candidates = [
        os.path.join(out, clean.lstrip("/")),
        os.path.join(out, clean.strip("/"), "index.html"),
    ]
    return any(os.path.exists(c) for c in candidates)


def resolves_url(out: str, url: str) -> bool:
    """An absolute (https://host/path/) URL resolves if its path maps to a built file."""
    path = re.sub(r"^[a-zA-Z][a-zA-Z0-9+.-]*://[^/]*", "", url)
    return resolves(out, path if path.startswith("/") else "/" + path)


def read_translations(md_path: str) -> dict:
    """Parse the `translations:` frontmatter block of a post, if any."""
    text = open(md_path, encoding="utf-8").read()
    match = FM.match(text)
    if not match:
        return {}
    block = TRANSLATIONS_BLOCK.search(match.group(1))
    if not block:
        return {}
    return dict(TRANSLATION_ENTRY.findall(block.group(1)))


def audit_post_translations() -> "list[tuple[str, str]]":
    """Check existence + reciprocity of blog `translations` links.

    Returns a list of (file, problem) failures. A missing counterpart is
    only a failure when a post *declares* it: posts without a sibling in
    another language simply omit that key from their block.
    """
    failures = []
    declared: dict = {}  # (locale, slug) -> translations dict
    for locale, rel_dir in BLOG_SOURCE_DIRS.items():
        posts = sorted(glob.glob(os.path.join(ROOT, rel_dir, "*.md")))
        for post in posts:
            slug = os.path.splitext(os.path.basename(post))[0]
            declared[(locale, slug)] = read_translations(post)

    for (locale, slug), translations in sorted(declared.items()):
        for target_locale, target_slug in sorted(translations.items()):
            if target_locale not in BLOG_SOURCE_DIRS:
                failures.append(
                    (f"{locale}/{slug}", f"unknown translations locale: {target_locale}")
                )
                continue
            sibling = os.path.join(ROOT, BLOG_SOURCE_DIRS[target_locale], target_slug + ".md")
            if not os.path.exists(sibling):
                failures.append(
                    (
                        f"{locale}/{slug}",
                        f"translations.{target_locale} points at missing post: {target_slug}",
                    )
                )
                continue
            back = declared.get((target_locale, target_slug), {})
            if back.get(locale) != slug:
                failures.append(
                    (
                        f"{locale}/{slug}",
                        f"translations.{target_locale}={target_slug} is not reciprocal "
                        f"(sibling points {locale}={back.get(locale)!r})",
                    )
                )
    return failures


def main() -> int:
    pages = sorted(glob.glob(os.path.join(OUT, "**", "index.html"), recursive=True))
    if not pages:
        print(f"no pages found under {OUT}/ — did the build run?")
        return 1

    failures = []
    for page in pages:
        html = open(page, encoding="utf-8").read()

        headings = H1.findall(html)
        if len(headings) != 1:
            failures.append((page, f"expected 1 <h1>, found {len(headings)}"))

        if not CANON.search(html):
            failures.append((page, "missing rel=canonical"))

        for block in LD.findall(html):
            try:
                json.loads(block)
            except Exception as exc:  # noqa: BLE001 - report any parse failure
                failures.append((page, f"invalid JSON-LD: {exc}"))

        for link in sorted({m for m in HREF.findall(html)}):
            # Fragment-only anchors ("/en/#contacto") point at a page plus an
            # in-page target; strip the fragment before checking existence or
            # every anchor reads as a broken link.
            if not resolves(OUT, link):
                failures.append((page, f"broken internal link: {link}"))

        for tag in LINK_TAG.findall(html):
            if 'rel="alternate"' not in tag or "hreflang=" not in tag:
                continue
            href = re.search(r'href="([^"]+)"', tag)
            lang = re.search(r'hreflang="([^"]+)"', tag)
            if href and not resolves_url(OUT, href.group(1)):
                failures.append(
                    (
                        page,
                        f"broken hreflang alternate "
                        f"hreflang={lang.group(1) if lang else '?'}: {href.group(1)}",
                    )
                )

    for source, problem in audit_post_translations():
        failures.append((f"source:{source}", problem))

    print(f"pages audited: {len(pages)}")
    if failures:
        print(f"problems: {len(failures)}")
        for page, problem in failures:
            print(f"  {page}: {problem}")
        return 1
    print("problems: none")
    return 0


if __name__ == "__main__":
    sys.exit(main())
