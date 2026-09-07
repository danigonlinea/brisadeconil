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
