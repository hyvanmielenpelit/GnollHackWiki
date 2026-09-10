---
name: wiki-bulk-edits
description: How to make the same mechanical edit across many GnollHackWiki pages safely. Covers the fact that no page generator or template exists, the repeating header-line fields on spell, monster and item pages, verifying a target article on disk before linking it, the CRLF and UTF-8-without-BOM requirements, a PowerShell regex recipe that preserves both, the Git Bash sed -i hazard, and the verification and handoff steps. Read before editing more than a handful of pages in one pass.
---

The full skill lives in this repository's tool-neutral agent directory (`.agents/`),
which is shared with other AI coding agents. This file is only a pointer.

Read `.agents/skills/wiki_bulk_edits/SKILL.md` (path relative to the repository root) in full
before proceeding, and follow it. Any `references/` files it links are relative to that
same directory.