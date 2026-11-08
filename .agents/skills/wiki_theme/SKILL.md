---
name: wiki_theme
description: "How the GnollHack wiki theme is built and changed: gnollhack-theme.css, its fonts and background art, Primer variable overrides, the dark color mode in layout.mustache, automatic content-hash versioning with {{#asset_url}}, the cache rules, and the visual and contrast checks. Read before changing the wiki's look or anything in .gollum/."
---

# GnollHack Wiki Theme

The wiki is a dark-only skin over Gollum and its Primer CSS, matching the GnollHack
marketing site, GnollHack Account, and Gnoll Overseer. `wiki_editing` section 4 reserves
`.gollum/`: change it only when the task is a change to the theme or the layout.

## 1. The Files

- `.gollum/css/gnollhack-theme.css`: the theme.
- `.gollum/fonts/`: Cinzel (variable, weights 600-800) and Lato (400, 400 italic, 700), as
  latin-subset `.woff2` files, byte copies from the marketing site's `wwwroot/fonts/`.
  `Cinzel-OFL.txt` and `Lato-OFL.txt` are the fonts' licenses and stay beside them.
- `.gollum/images/gnoll-illustration-darkened-bottom-w1920-q60.webp`: the background art, a
  byte copy from the GnollHack Account site's `wwwroot/img/`.
- `.gollum/templates/layout.mustache`: `<html lang="en" data-color-mode="dark"
  data-dark-theme="dark" data-light-theme="dark">`, the `color-scheme` and `theme-color`
  metas, a preload of the Cinzel font, and the theme `<link>` right after Gollum's `app` and
  `print` stylesheets, so that it overrides Primer.

The code that versions and caches these files is in the GnollHackWikiConfig repository
(`lib/gnollhack_assets.rb`, `config.rb`).

## 2. The Palette

The palette is the marketing site's "Smoked-Obsidian & Burnished-Gold"
(`GnollHackMarketingWebsite/wwwroot/css/site2.scss`, `:root`). Keep it in step with the
marketing site when that changes. The theme's `:root` tokens:

| Token | Value |
|---|---|
| `--gh-page-bg` | `#000000` |
| `--gh-header-bg` | `#0e0c0a` |
| `--gh-surface` | `rgba(16, 15, 14, 0.94)` |
| `--gh-surface-solid` | `#12100d` |
| `--gh-surface-raised` | `#1a1713` |
| `--gh-border` | `rgba(212, 168, 83, 0.32)` |
| `--gh-border-strong` | `rgba(242, 202, 112, 0.64)` |
| `--gh-gold` | `#f3ce72` |
| `--gh-gold-strong` | `#dfb046` |
| `--gh-ivory` | `#fbf5e8` |
| `--gh-prose` | `#ede7db` |
| `--gh-muted` | `#c8beaa` |
| `--gh-quote-bg` | `rgba(243, 206, 114, 0.06)` |
| `--gh-code-bg` | `rgba(0, 0, 0, 0.45)` |
| `--gh-th-bg` | `rgba(212, 160, 23, 0.15)` |
| `--gh-row-alt` | `rgba(255, 255, 255, 0.03)` |
| `--gh-font-sans` | `"Lato", system-ui, …, sans-serif` |
| `--gh-font-display` | `"Cinzel", Georgia, serif` |
| `--gh-font-mono` | `ui-monospace, SFMono-Regular, …, monospace` |

Content elements (`pre`, tables) follow Gnoll Overseer's `.markdown-body` rules. The theme
is dark only; there is no light mode.

## 3. Overriding Primer

- Change Primer's `--color-*` variables first, and element rules second. The variables sit
  on `html[data-color-mode][data-dark-theme]`, whose specificity (0,2,1) beats Primer's
  `[data-color-mode=dark][data-dark-theme=dark]` (0,2,0).
- Syntax colors come from Primer's dark theme (`--color-prettylights-*`); the Rouge token
  classes (`.highlight .k`, `.s`, `.c`, `.nf`, …) are mapped to them. Primer's semantic
  success, danger and attention colors keep their dark-theme values.
- Element rules exist where Gollum hard-codes light colors or Primer's defaults do not fit:
  the page root and `body` (the root carries the page color, `body` stays transparent),
  `body::before` (the fixed background art; `background-attachment: fixed` is ignored on
  iOS), `#wiki-wrapper` (the content panel), headings and the gold `h2` rule, the heading
  anchor icon (`filter`), links and focus outlines, `#head` and `nav.actions` (the navigation
  bar), `#search-query`, `.breadcrumb`, block quotes, tables (`th`, even rows, borders),
  `pre` and inline `code`, Rouge tokens, `hr`, `kbd`, `.katex`, `.toc` and `.toc-title`,
  `.Box` and `#wiki-header`, the sidebar and footer.
- Width: Gollum nests a second 1012px `container-lg` (`.main-content`) inside the panel.
  From 1012px up, `body > .container-lg` is widened to 1110px with a 16px inline gutter, so
  the 1078px panel (32px padding and 1px border per side) holds the full inner container.
  Going wider also means overriding `.main-content`; with the sidebar, the text column is
  already about 87 characters per line.
- After any Gollum upgrade, re-run the visual checks (section 7): new Primer variables or
  hard-coded colors show up there first.

## 4. Versioning and Caching

- Reference every stylesheet or script under `.gollum/` through
  `{{#asset_url}}/.gollum/...{{/asset_url}}{{^asset_url}}/.gollum/...{{/asset_url}}`. The
  helper appends `?v=<content hash>`; the inverted section renders the plain URL when the
  config lacks the helper.
- Never rename a CSS file for cache reasons: its URL changes with its content.
- Fonts and images are cached for a week without a version, so they take a new file name
  when their content changes.
- `url(...)` inside the CSS is relative (`../fonts/`, `../images/`).
- Cache rules: `?v=` equal to the current hash, immutable for a year; any other `?v=`,
  revalidate; unversioned CSS and JavaScript, revalidate; other files, one week.

## 5. Deployment

- A file under `.gollum/` is served only if it is committed in the served branch. Its bytes
  then come from the working tree, so a pulled change takes effect on the next page view,
  with no restart: the helper rehashes a file when its modification time or size changes.
- The GnollHackWikiConfig deployment with `asset_url` must be in place first. Otherwise the
  theme still loads, from the unversioned URL, with weaker caching.

## 6. Printing

Every theme rule except the `@font-face` rules, the `:root` tokens, and the code word-wrap
rule is inside `@media screen`, so printing keeps Gollum's light print stylesheet. Keep new
rules inside it.

## 7. Accessibility and Visual Checks

- The target is WCAG AA: 4.5:1 for body text, links, table text, quotes, code, buttons, the
  breadcrumb and the sidebar; 3:1 for headings of 24px or larger and for UI borders.
- `--gh-border` (about 1.9:1) is for decorative borders only; controls use
  `--gh-border-strong`.
- Measured on the theme: body text 15.7:1, links 12.7:1, `th` 10.1:1, even rows 14.8:1,
  inline code 12.8:1, buttons 18.1:1, muted text 10.3:1, syntax tokens at least 7.9:1.
- Check with a contrast script in the browser that composites each element's alpha
  backgrounds from the root down over black, and compares the result with the element's
  text color.
- Pages to check: Home, Download, an item page and a monster page, Skill Comparison
  (tables), a Development page with code, Scoring (KaTeX), Options (ingress), search,
  overview, latest changes, history, and a missing page. Check each at 1280px and 375px
  wide. At 375px there is no horizontal page scroll; wide tables scroll inside their
  container.
- The `@media (forced-colors: active)` block drops the background art; system colors apply.

## 8. Font Subset

The fonts hold the latin subset only. Other characters (emoji, `∕`, `×`, arrows, math) fall
back to system fonts.

## 9. Encoding

`.css`, `.mustache` and the OFL `.txt` files are CRLF in the working tree, like pages; run
the closing check in `wiki_editing` section 18. `.woff2` and `.webp` are binary
(`.gitattributes`).
