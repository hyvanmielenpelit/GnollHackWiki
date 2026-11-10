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
- `.gollum/fonts/`: Cinzel (variable, weights 600-800) and Lato (Regular and Italic at 400,
  Heavy and Heavy Italic at 800), as latin-subset `.woff2` files. Cinzel is a byte copy from the marketing site's
  `wwwroot/fonts/`. Lato is version 2.015 (`lato2-latin-*.woff2`), subset with fontTools
  from the official Lato 2.0 TTFs (`Lato2OFL.zip` from latofonts.com) to the same code
  points as Google's latin subset, with default OpenType features and hinting kept.
  `Cinzel-OFL.txt` and `Lato-OFL.txt` are the fonts' licenses and stay beside them.
- `.gollum/images/gnoll-illustration-darkened-bottom-w1920-q60.webp`: the background art, a
  byte copy from the GnollHack Account site's `wwwroot/img/`.
- `.gollum/templates/layout.mustache`: `<html lang="en" data-color-mode="dark"
  data-dark-theme="dark" data-light-theme="dark">`, the viewport meta
  (`width=device-width, initial-scale=1`, which must never disable zoom with
  `maximum-scale` or `user-scalable`), the `color-scheme` and `theme-color` metas, preloads
  of the Cinzel font and the regular Lato face, and the theme `<link>` right after Gollum's
  `app` and `print` stylesheets, so that it overrides Primer.

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
| `--gh-border-subtle` | `rgba(212, 168, 83, 0.24)` |
| `--gh-border-control` | `#7a6743` |
| `--gh-btn-bg` | `#2a241b` |
| `--gh-btn-hover-bg` | `#352d21` |
| `--gh-btn-active-bg` | `#1e1a14` |
| `--gh-btn-border` | `rgba(212, 168, 83, 0.28)` |
| `--gh-field-bg` | `#090807` |
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
  anchor icon (`filter`; in page text a masked block, at most 16px, muted and gold on
  hover, centered in the gutter left of the heading, whose width is `--gh-heading-gutter`:
  16px below 1012px, 32px from there up), links and focus outlines, `#head` and `nav.actions` (the navigation
  bar), the phone menu button (`summary.btn-invisible`) and its masked icon, the phone menu
  (`.SelectMenu` section labels, current page name, items), `#search-query` (a recessed
  field with a magnifier icon), `.breadcrumb`, block quotes, tables (`th`, even rows,
  borders), `pre` and inline `code`, Rouge tokens, `hr`, `kbd`, `.katex`, `.toc` and
  `.toc-title`, `.Box` and `#wiki-header`, the sidebar and footer.
- The search field's text is 16px on every width: iOS Safari zooms in on any focused field
  with smaller text and does not zoom back out. Keep every text field at 16px or more.
- The phone menu button is 44 × 40px with a 20px icon drawn by a CSS mask, not a font
  glyph, so its centering does not depend on fallback font metrics. Below 768px the search
  field is 40px tall to match.
- Below 768px the bar's last cell (desktop-only buttons) and the search cell's right
  padding are collapsed, so both bar gutters are 16px. Recheck after a Gollum upgrade that
  this cell is still empty on phones.
- Default buttons (`.btn`) are styled through Primer's `--color-btn-*` variables as a raised
  tonal fill (`--gh-btn-bg`) with a faint edge, on every page, not only in the navigation
  bar. Outline buttons (`.btn-outline`) take the same fill and edge with their own gold
  text; primary buttons keep the gold fill.
- Width: the text column fits the Home page's disclaimer on one line and the widest
  table, and text fills it.
  - From 1012px up, `body > .container-lg` is at most 1235px with a 16px inline gutter, so
    the panel reaches 1203px in windows of about 1250px and wider. Gollum's inner
    `container-lg` (`.main-content`) has no cap there, and the sidebar is `col-md-3`'s 25%
    but at most 260px, so the text column holds 860px.
  - The Home page's disclaimer (small italic Lato 2.0) is 786px wide on one line in
    Chromium at 1x and 2x, but Windows at 175% display scaling renders it about 4% wider;
    860px keeps it on one line there with room to spare.
  - The widest table's wrapped (min-content) width is 809px, Hit Point and Mana
    Regeneration Rates, set by its KaTeX formulas, not by Lato. At 17px Lato 2.0 (7.8px per
    character on average) the column is about 111 characters per line. A wider panel
    lengthens every line of prose; a narrower one wraps the disclaimer and makes the widest
    tables scroll. Re-measure when a wider table is added.
  - Code in tables breaks anywhere (`overflow-wrap: anywhere`), so a long path or
    identifier does not hold a table wider than its column.
  - Breakpoints: 768px, sidebar beside the text; 1012px, floating panel and the 260px
    sidebar cap; about 1250px, the panel at full width. Media queries count the scrollbar.
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
- `--gh-border` (1.9:1 against the panel on tables, 2.0:1 against code blocks) is for
  decorative borders only.
- Container outlines (the panel, `.Box`, `#wiki-header`, the navigation bar's divider) use
  `--gh-border-subtle`: 1.70:1 at the panel edge against black, matching GnollHack Account's
  panel.
- Buttons are identified by their text label and their raised fill, so their border is
  decorative (WCAG 2.2 SC 1.4.11 needs no boundary there).
- Text fields use `--gh-border-control`: 3.67:1 against the field and 3.58:1 against the
  navigation bar, above the 3:1 that SC 1.4.11 needs.
- Measured on the theme: body text 15.7:1, links 12.7:1, `th` 10.1:1, even rows 14.8:1,
  inline code 12.8:1, button labels 14.1:1 (gold hover label 9.0:1), the search placeholder
  10.9:1, muted text 10.3:1, syntax tokens at least 7.9:1.
- Check with a contrast script in the browser that composites each element's alpha
  backgrounds from the root down over black, and compares the result with the element's
  text color.
- Pages to check: Home, Download, an item page and a monster page, Skill Comparison
  (tables), a Development page with code, Scoring (KaTeX), Options (ingress), search,
  overview, latest changes, history, and a missing page. Check each at 1280px and 375px
  wide, and at 375px also the phone menu, open. At 375px there is no horizontal page
  scroll; wide tables scroll inside their container.
- Desktop browser emulation reproduces neither iOS Safari's zoom on focused fields nor iOS
  font fallback; check those on a real iPhone.
- The `@media (forced-colors: active)` block drops the background art, keeps the menu
  button's masked icon in `ButtonText` and the heading link icon in `LinkText`; system
  colors apply.

## 8. Font Subset and Weights

- The fonts hold the latin subset only. Other characters (emoji, `∕`, `×`, arrows, math)
  fall back to system fonts. Each Lato `@font-face` declares the subset's `unicode-range`.
- Lato is the four faces of a text family: regular and italic at 400, and the bold pair
  at 800, Heavy and Heavy Italic. Heavy was chosen over Bold (700) from side-by-side
  screenshots of real pages, because it stands out more against the 400 body text. Every
  weight the page uses must map onto one of the faces, or the browser borrows the nearest
  face (a 500 renders as 400, a 600 or 700 as 800) or fakes bold on an italic face.
- Primer sets weights through `--base-text-weight-*` (`strong` and `b` semibold, `.btn`
  and `.Counter` medium). The theme's `:root` maps light, normal and medium to 400, and
  semibold and bold to 800. Theme rules for Lato text use only 400 and 800; `h3` and
  above are Cinzel, whose own 600-800 range is separate.
- A browser downloads a face only when a page renders text in it, so the bold italic file
  costs nothing on the many pages without bold italic. The regular face is on every page
  and is preloaded; the others are not.
- Adding a weight (Lato 2.0 also has Hairline, Thin, Light, Medium, Semibold, Bold and
  Black) adds a file to every page that uses it. Add one only for a visible design need,
  together with the rules that use it, and subset it the same way.
- Before changing weights, scan rendered pages for the computed `font-weight` and
  `font-style` of every Lato text element, and check that each combination has a face.

## 9. Encoding

`.css`, `.mustache` and the OFL `.txt` files are CRLF in the working tree, like pages; run
the closing check in `wiki_editing` section 18. `.woff2` and `.webp` are binary
(`.gitattributes`).
