# GnollHackWiki Rules

When modifying or creating wiki pages, always refer to the `wiki_editing` skill for detailed instructions on markdown formatting, Gollum-style wikilinks, image handling, and repository conventions.

## Quick Reminders:
- **Wikilinks**: Use Gollum-style links. Links to files in subdirectories should start with `/` to be relative to the root (e.g., `[[/Path/to/Page]]`). Links to files in the root directory do NOT need the starting slash (e.g., `[[Page Name]]`). Do NOT include `.md`.
- **Headings**: Use `H1` (`#`) ONLY on the first line to set a custom page title when the title differs from the filename (e.g., incorrect casing or special pages). Otherwise, omit H1. Use `H2` (`##`) or lower for section headings. Use blank lines around headings.
- **Images**: All images go under `/uploads/` mirroring the page's path. Format MUST be WebP.
- **Reserved Folders**: Do NOT touch `/gollum/` or `/.gollum/`.
