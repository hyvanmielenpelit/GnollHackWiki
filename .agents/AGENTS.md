# GnollHackWiki Rules

When modifying or creating wiki pages, always refer to the `wiki_editing` skill for detailed instructions on Markdown formatting, Gollum-style wikilinks, image handling, and repository conventions.

## Quick Reminders:
- **Markdown Flavor**: The wiki uses Gollum-style Markdown, not GitHub Flavored Markdown. It does not support GitHub-style alerts (e.g., `> [!IMPORTANT]`, `> [!NOTE]`). Instead, use alternatives like `> ℹ️ **Note:**` or `> ⚠️ **Warning:**`.
- **Wikilinks**: Use Gollum-style links. All wikilinks pointing to a page in a subfolder (e.g., `[[/Artifacts/Vorpal Blade]]`, `[[/Monsters/Ki-rin]]`, or `[[/Items/Golden chest]]`) must start with a slash (`/`) regardless of where the source file is located (root or subdirectory). If a link points to a page in the root directory (e.g., `[[Home]]`), it should not start with a slash, *unless* the source document is in a subdirectory, in which case any link targeting a root page must start with a leading slash (e.g. `[[/Rings]]` from a page in the `Rooms/` folder). Do not include the `.md` extension. The alias in wikilinks is never used when the name of the page is the same as the page name, e.g., `[[/Roles/Priest]]` (never use `[[Priest|/Roles/Priest]]`). Use an alias only when the link text needs to differ, such as for the plural form of a page name (e.g., `[[Priests|/Roles/Priest]]`). If the display text matches the page name (case-insensitively), do not write `[[rings|/Rings]]` but simply `[[/rings]]` since the path portion is hidden by default and it will display as "rings" automatically. **Never create wikilinks for "gold" or "gold pieces". Do not link to generic or specific item/monster category pages (e.g. "books", "spellbooks", "potions", "scrolls", "weapons", "armor", "ammunition", "comestibles", "rings", "gems", "wands", "reagents", "dragons", "vampires") UNLESS a corresponding page actually exists in the wiki (e.g., if a page like Weapons or Rings exists, it is allowed to link to it; otherwise, leave them as plain text).**
- **Headings**: Use an `H1` (`#`) only on the first line to set a custom page title when the desired title differs from the filename (e.g., incorrect casing or special pages). Otherwise, omit the `H1`. Use `H2` (`##`) or lower for section headings. Use blank lines before and after headings.
- **Ingress**: If an article has an ingress, it must be styled as a block quote (`>`) starting with a `👉` emoji, followed by bold text (e.g., `> 👉 **This is the ingress.**`).
- **Lists**: Use a dash (`-`) for Markdown lists instead of an asterisk (`*`) by default.
- **Images**: All images go under `/uploads/`, mirroring the page's directory path. The format must be WebP.
- **Horizontal Lines**: Do not use horizontal lines (e.g., `---` or `***`) anywhere in the wiki. They are not needed in Markdown documents.
- **Reserved Folders**: Do not modify the `/gollum/` or `/.gollum/` directories.
- **Mathematical Formulas (KaTeX)**: Use KaTeX notation only for complex mathematical formulas, and prefer plain text for simple expressions. All KaTeX formulas must start with `$` and end with `$`. For example: `$P = \frac{1}{10 + 2 \times G \times A}$`.
- **Arrows**: Use Unicode `→` instead of `->` and Unicode `←` instead of `<-`.

## Text Restoration

- **Do NOT restore text that has been deleted by the user**, unless explicitly requested by the user.
- This applies especially when the user requests you to do something else that is not related to the deleted text. Always respect the user's manual edits and deletions.
