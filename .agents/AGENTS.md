# GnollHackWiki Rules

When modifying or creating wiki pages, always refer to the `wiki_editing` skill for detailed instructions on Markdown formatting, Gollum-style wikilinks, image handling, and repository conventions. When changing the same line or field across many pages, also read the `wiki_bulk_edits` skill before editing anything.

## Quick Reminders:
- **Markdown Flavor**: The wiki uses Gollum-style Markdown, not GitHub Flavored Markdown. It does not support GitHub-style alerts (e.g., `> [!IMPORTANT]`, `> [!NOTE]`). Instead, use alternatives like `> ℹ️ **Note:**` or `> ⚠️ **Warning:**`.
- **Wikilinks**: Use Gollum-style links. All wikilinks pointing to a page in a subfolder (e.g., `[[/Artifacts/Vorpal Blade]]`, `[[/Monsters/Ki-rin]]`, or `[[/Items/Golden chest]]`) must start with a slash (`/`) regardless of where the source file is located (root or subdirectory). If a link points to a page in the root directory (e.g., `[[Home]]`), it should not start with a slash, *unless* the source document is in a subdirectory, in which case any link targeting a root page must start with a leading slash (e.g. `[[/Rings]]` from a page in the `Rooms/` folder). Do not include the `.md` extension. Never wrap wikilinks in backticks (e.g., write `[[Page Name]]`, never `` `[[Page Name]]` ``). The alias in wikilinks is never used when the name of the page is the same as the page name, e.g., `[[/Roles/Priest]]` (never use `[[Priest|/Roles/Priest]]`). Use an alias only when the link text needs to differ, such as for the plural form of a page name (e.g., `[[Priests|/Roles/Priest]]`). If the display text matches the page name (case-insensitively), do not write `[[rings|/Rings]]` but simply `[[/rings]]` since the path portion is hidden by default and it will display as "rings" automatically. **Never create wikilinks for "gold" or "gold pieces". Do not link to generic or specific item/monster category pages (e.g. "books", "spellbooks", "potions", "scrolls", "weapons", "armor", "ammunition", "comestibles", "rings", "gems", "wands", "reagents", "dragons", "vampires") UNLESS a corresponding page actually exists in the wiki (e.g., if a page like Weapons or Rings exists, it is allowed to link to it; otherwise, leave them as plain text).**
- **Headings**: Use an `H1` (`#`) only on the first line to set a custom page title when the desired title differs from the filename (e.g., incorrect casing or special pages). Otherwise, omit the `H1`. Use `H2` (`##`) or lower for section headings. Use blank lines before and after headings. Never apply a Unicode icon to H1 (`#`) headings.
- **Ingress**: If an article has an ingress, it must be styled as a block quote (`>`) starting with a `👉` emoji, followed by bold text (e.g., `> 👉 **This is the ingress.**`).
- **Conclusions**: If an article has a conclusions or summary section, it should use the `💡` emoji (e.g., `## 💡 Conclusions` or `## 💡 Summary`).
- **Lists**: Use a dash (`-`) for Markdown lists instead of an asterisk (`*`) by default.
- **Images**: All images go under `/uploads/`, mirroring the page's directory path. The format must be WebP.
- **Horizontal Lines**: Do not use horizontal lines (e.g., `---` or `***`) anywhere in the wiki. They are not needed in Markdown documents.
- **No Source Code References**: Wiki pages are player documentation. Never cite source file paths, line numbers, or C identifiers (e.g., `src/zap.c`, `include/mondata.h`, `MR_FEAR`) on a page; state the mechanic in the game's own vocabulary and keep the evidence in the handoff report. Pages must stay human-readable and must not drift into AI-skill or specification style when they are improved from AI benchmarking results or analysis findings.
- **Reserved Folders**: Do not modify the `/gollum/` or `/.gollum/` directories.
- **Mathematical Formulas (KaTeX)**: Use KaTeX notation only for complex mathematical formulas, and prefer plain text for simple expressions. All KaTeX formulas must start with `$` and end with `$`. For example: `$P = \frac{1}{10 + 2 \times G \times A}$`. Always leave an empty line before and after a KaTeX formula that is not an inline formula, but is on its own line.
- **Arrows**: Use Unicode `→` instead of `->` and Unicode `←` instead of `<-`.
- **Legal and Compliance Documents**: Pages serving as legal disclosures (e.g., `[[Overseer AI Providers]]`, `[[Privacy Policy]]`, `[[Gnoll Overseer Privacy Policy]]`, `[[AI Usage Policy]]`) must NEVER use Unicode icons/emojis in section headings. `[[Overseer AI Providers]]` is directly linked from Steam's "Connects to 3rd-Party Service for AI Content Generation: OpenAI, Anthropic, and Google" store notice and must remain strictly focused on third-party legal disclosures, terms of service and privacy links, and data transmission policies without unnecessary gameplay guide links.

## Text Restoration

- **Do NOT restore text that has been deleted by the user**, unless explicitly requested by the user.
- This applies especially when the user requests you to do something else that is not related to the deleted text. Always respect the user's manual edits and deletions.

## Skill Naming and Harness Wiring

Skills in this repository use the **`wiki_`** prefix. Canonical bodies live in
`.agents/skills/<underscore_name>/SKILL.md`; the `.claude/skills/<kebab-name>/` stubs are
**generated** by `SharedAgentSkills\tools\sync_stubs.ps1 -Repo <this repository>` and must
never be hand-edited. After adding or renaming a canonical skill, or changing its frontmatter,
re-run that script.
