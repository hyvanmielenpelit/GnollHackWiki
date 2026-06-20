# GnollHackWiki Rules

When modifying or creating wiki pages, always refer to the `wiki_editing` skill for detailed instructions on markdown formatting, Gollum-style wikilinks, image handling, and repository conventions.

## Quick Reminders:
- **Markdown Flavor**: The wiki uses Gollum-style markdown, not GitHub Flavored Markdown. It does NOT support GitHub-style alerts (e.g., `> [!IMPORTANT]`, `> [!NOTE]`). Instead, use alternatives like `> ℹ️ **Note:**` or `> ⚠️ **Warning:**`.
- **Wikilinks**: Use Gollum-style links. Links to files in subdirectories should start with `/` to be relative to the root (e.g., `[[/Path/to/Page]]`). Links to files in the root directory do NOT need the starting slash (e.g., `[[Page Name]]`). Do NOT include `.md`.
- **Headings**: Use `H1` (`#`) ONLY on the first line to set a custom page title when the title differs from the filename (e.g., incorrect casing or special pages). Otherwise, omit H1. Use `H2` (`##`) or lower for section headings. Use blank lines around headings.
- **Ingress**: The ingress of an article (if present) must be styled so that it consists of a block quote (`>`), a starting `👉` sign, and bold text. (e.g., `> 👉 **This is the ingress.**`)
- **Images**: All images go under `/uploads/` mirroring the page's path. Format MUST be WebP.
- **Horizontal Lines**: Do NOT use horizontal lines (e.g., `---` or `***`) anywhere in the wiki. They are not needed in the markdown documents.
- **Reserved Folders**: Do NOT touch `/gollum/` or `/.gollum/`.
