# GnollHackWiki Rules

When modifying or creating wiki pages, always refer to the `wiki_editing` skill for detailed instructions on Markdown formatting, Gollum-style wikilinks, image handling, and repository conventions.

## Quick Reminders:
- **Markdown Flavor**: The wiki uses Gollum-style Markdown, not GitHub Flavored Markdown. It does not support GitHub-style alerts (e.g., `> [!IMPORTANT]`, `> [!NOTE]`). Instead, use alternatives like `> ℹ️ **Note:**` or `> ⚠️ **Warning:**`.
- **Wikilinks**: Use Gollum-style links. Wikilinks inside Markdown files located in subdirectories must start with a slash (`/`) (e.g., `[[/Path/to/Page]]`). Wikilinks inside Markdown files located in the root directory must not start with a slash (`/`) (e.g., `[[Page Name]]`). It does not matter which page the wikilink refers to. Do not include the `.md` extension.
- **Headings**: Use an `H1` (`#`) only on the first line to set a custom page title when the desired title differs from the filename (e.g., incorrect casing or special pages). Otherwise, omit the `H1`. Use `H2` (`##`) or lower for section headings. Use blank lines before and after headings.
- **Ingress**: If an article has an ingress, it must be styled as a block quote (`>`) starting with a `👉` emoji, followed by bold text (e.g., `> 👉 **This is the ingress.**`).
- **Images**: All images go under `/uploads/`, mirroring the page's directory path. The format must be WebP.
- **Horizontal Lines**: Do not use horizontal lines (e.g., `---` or `***`) anywhere in the wiki. They are not needed in Markdown documents.
- **Reserved Folders**: Do not modify the `/gollum/` or `/.gollum/` directories.
