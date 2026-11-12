---
name: wiki_traffic_analysis
description: "Analyze Google Analytics 4 traffic of wiki.gnollhack.com, gnollhack.com, and account.gnollhack.com for a date range (default the last 30 complete days) through the Google Analytics MCP server. Separates human visitors from automated traffic, analyzes bot traffic when it matters, and reports audience, acquisition, behavior, the account registration funnel, conversion, and recommendations for marketing, content, and tracking. Use when asked to analyze GnollHack website, wiki, or account site traffic, visitors, or analytics. Arguments: an optional date range, such as 'last 90 days' or '2026-10-01 to 2026-10-31', and optionally the sites to include."
---

# Website Traffic Analysis

This skill starts the website traffic analysis. The procedure itself is a wiki page.

## Arguments

Read the text after the command, or the user's request, as follows:

- **Date range:** Explicit dates (`2026-10-01 to 2026-10-31`), "last N days", a month (`October 2026`), or a named period. With no date range, use the last 30 complete days, ending yesterday. Never include today.
- **Sites:** Any of wiki.gnollhack.com, gnollhack.com, and account.gnollhack.com that the text names. With no site named, analyze all three.

If the text cannot be read as a date range or a site list, ask the user before you start.

## Procedure

Read `Development/AI/Website Traffic Analysis.md` (path relative to the repository root) in full, and follow it. That page is the procedure; this skill only starts it. Where this skill and the page differ, the page wins.
