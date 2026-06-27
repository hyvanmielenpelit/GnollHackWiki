---
name: wiki_editing
description: Instructions and conventions for editing the GnollHack Wiki Markdown pages and handling images.
---

# GnollHack Wiki Editing Guidelines

When editing or creating pages for the GnollHack Wiki, follow these conventions optimized for AI agents like Gemini 3.5 Flash.

## 1. File and Heading Structure
- **Page Titles**: The wiki automatically uses the filename (without `.md`) as the page title. Never start a page with an `H1` (`#`) or `H2` (`##`) heading that is identical to the page's name (the filename without extension). In such cases, omit the heading completely, as it is implied and provided to the page from the filename. Use a single `H1` heading (`#`) on the very first line ONLY if you need a custom title that differs from the filename (e.g., incorrect filename casing or special pages like the home page). In most cases, an H1 is not needed.
- **Section Headings**: Use only `H2` (`##`) and lower for all other section headings.
- **Spacing**: Always place an empty line before and after all headings (except before the `H1` at the very beginning of the file).
- **Subdirectories**: Group files into subdirectories (e.g., `/Monsters/`, `/Items/`) to prevent naming conflicts and organize content.
- **Ingress**: If an article has an ingress, it must be styled as a block quote (`>`) starting with a `👉` emoji, followed by bold text (e.g., `> 👉 **This is the ingress.**`).
- **Lists**: Use a dash (`-`) for Markdown lists instead of an asterisk (`*`) by default.

## 2. Wikilinks (Gollum Syntax)
- **Syntax**: Use Gollum-style wikilinks: `[[Alias|Page Name#section-heading]]` or `[[Page Name]]`. **IMPORTANT**: The alias always comes first and the page name comes last!
- **Paths**: All wikilinks pointing to a page in a subfolder (e.g., `[[/Items/potion of healing]]`, `[[/Artifacts/Vorpal Blade]]`) must start with a slash (`/`), regardless of whether the source file is located in the root directory or in a subdirectory. If a link points to a page in the root directory (e.g., `[[Home]]`), it should not start with a slash.
- **File Extensions**: Do not include the `.md` extension in wikilinks.
- **Case-Insensitivity**: Wikilinks and file names are case-insensitive.
- **Aliases**: Never use an alias in wikilinks when the link text is the same as the target page name (e.g., use `[[/Roles/Priest]]` instead of `[[Priest|/Roles/Priest]]`). Use an alias only when the link text must differ from the page name, such as to use the plural form of the page name (e.g., `[[Priests|/Roles/Priest]]`). Remember: **Alias comes first, Page Name comes last**.
- **Dashes and Spaces**: In the latest version of Gollum, dashes (`-`) in Markdown filenames represent literal dashes, unlike GitHub wikis where they represent spaces. A space in a filename denotes a space (and is represented as `%20` in URLs). Therefore, when linking to a page with a dash in its filename, **keep the dash in the wikilink**; do not replace it with a space.
- **Capitalization**: If you must capitalize a letter in the wikilink text (for example, capitalizing the first letter to start a sentence), do it by capitalizing the letter in the filename portion of the wikilink (the part after the subdirectory, if present). For example, use `[[/Items/Potion of healing]]` instead of `[[Potion of healing|/Items/potion of healing]]`.

## 3. Images and Uploads
- **Upload Directory**: All images must be placed under the `/uploads/` directory. Match the subdirectory structure of the document (e.g., an image for `/Races/Dwarf.md` goes to `/uploads/Races/Dwarf/image.webp`).
- **Format**: Use **WebP** format exclusively.
  - A quality setting of **85** is used by default, and almost always for larger images, such as 512x512-pixel AI-generated illustrations.
  - A quality setting of **100** (lossless) is used only for small icons (32x32 or smaller) and for images with flat colors, such as Excel screenshots (for example, comparison pages may have such images). They can have a very high pixel resolution but compress to a very small file size when encoded losslessly. Even though there is no strict maximum file size for such images, their file sizes are often under 100 KB.
  - If a WEBP file is larger than 100 KB, tell the user the used quality setting and ask them to suggest what to do (e.g., accept the large size, lower the encoding quality, or provide a custom WEBP file).
- **Styling for Illustrative Images** (these rules apply *only* to illustrative images, which are usually generated with AI): 
  - File size should be under 100 KB.
  - Transparent backgrounds (no white backgrounds).
  - 12-pixel rounded corners for sharp-cornered images.
  - Dimensions: Square (512x512), Horizontal (Width 512), Vertical (Height 512).
- **Link Syntax**: Use standard Markdown image syntax referencing the absolute path: `![Alt Text](/uploads/Path/To/image.webp)`

## 4. Restrictions
- **Reserved Folders**: Do not create, modify, or put anything in the `/gollum/` or `/.gollum/` directories. These are strictly reserved for wiki software functions and website files.
- **Horizontal Lines**: Do not use horizontal lines (e.g., `---` or `***`) anywhere in the wiki. They are not needed in Markdown documents.
- **Markdown Flavor**: The wiki uses Gollum-style Markdown, not GitHub Flavored Markdown. It does not support GitHub-style alerts (e.g., `> [!IMPORTANT]`, `> [!NOTE]`). Use standard Markdown blockquotes with bold text and colored unicode icons as the best alternatives:
  - Note: `> ℹ️ **Note:** This is a note.`
  - Tip: `> 💡 **Tip:** This is a tip.`
  - Important: `> 📢 **Important:** This is important.`
  - Warning: `> ⚠️ **Warning:** This is a warning.`
  - Caution: `> 🛑 **Caution:** This is caution.`

## 5. Mathematical Formulas (KaTeX)
- **Prefer Plain Text for Simple Formulas**: For simple mathematical expressions or basic requirements (e.g., `Level >= 3` or `Luck >= 0`), format them as plain text. Do not use KaTeX for simple expressions.
- **Use KaTeX Only for Complex Formulas**: Use KaTeX notation only for complex mathematical formulas, fraction-based equations, or multi-variable calculations.
- **Delimiters**: All KaTeX formulas must start with `$` and end with `$`.
- **Example**:
  - Complex formula in KaTeX: `$P = \frac{1}{10 + 2 \times G \times A}$`
  - Simple formula in plain text: `Luck >= 0` or `1 in 10`


