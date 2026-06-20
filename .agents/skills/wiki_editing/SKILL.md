---
name: wiki_editing
description: Instructions and conventions for editing the GnollHack Wiki markdown pages and handling images.
---

# GnollHack Wiki Editing Guidelines

When editing or creating pages for the GnollHack Wiki, follow these conventions optimized for AI agents like Gemini 3.5 Flash.

## 1. File and Heading Structure
- **Page Titles**: The wiki automatically uses the filename (without `.md`) as the page title. Use a single `H1` heading (`#`) on the very first line ONLY if you need a custom title that differs from the filename (e.g., incorrect filename casing or special pages like the home page). In most cases, an H1 is not needed.
- **Section Headings**: Use only `H2` (`##`) and lower for all other section headings.
- **Spacing**: Always place an empty line before and after all headings (except before the `H1` at the very beginning of the file).
- **Subdirectories**: Group files into subdirectories (e.g., `/Monsters/`, `/Items/`) to prevent naming conflicts and organize content.

## 2. Wikilinks (Gollum Syntax)
- **Syntax**: Use Gollum-style wikilinks: `[[Alias|Page Name#section-heading]]` or `[[Page Name]]`.
- **Paths**: For files in subdirectories, prefix paths with `/` to make them relative to the root (e.g., `[[/Items/potion of healing]]`). For files in the root directory, do NOT use a slash at the start (e.g., `[[Home]]`).
- **File Extensions**: Do NOT include the `.md` extension in wikilinks.
- **Case-Insensitivity**: Wikilinks and file names are case-insensitive.

## 3. Images and Uploads
- **Upload Directory**: All images must be placed under the `/uploads/` directory. Match the subdirectory structure of the document (e.g., an image for `/Races/Dwarf.md` goes to `/uploads/Races/Dwarf/image.webp`).
- **Format**: Use **WebP** format exclusively.
  - Lossy images: 85 quality.
  - Lossless/Flat colors (e.g., screenshots): 100 quality.
- **Styling for Illustrative Images** (these rules apply *only* to illustrative images, which are usually generated with AI): 
  - File size should be under 100 KB.
  - Transparent backgrounds (no white backgrounds).
  - 12-pixel rounded corners for sharp-cornered images.
  - Dimensions: Square (512x512), Horizontal (Width 512), Vertical (Height 512).
- **Link Syntax**: Use the standard markdown image syntax referencing the absolute path: `![Alt Text](/uploads/Path/To/image.webp)`

## 4. Restrictions
- **Reserved Folders**: Do NOT create, modify, or put anything in the `/gollum/` or `/.gollum/` directories. These are strictly reserved for wiki software functions and website files.
- **Horizontal Lines**: Do NOT use horizontal lines (e.g., `---` or `***`) anywhere in the wiki. They are not needed in the markdown documents.
- **Markdown Flavor**: The wiki uses Gollum-style markdown, not GitHub Flavored Markdown. It does NOT support GitHub-style alerts (e.g., `> [!IMPORTANT]`, `> [!NOTE]`). Use standard markdown blockquotes with bold text and colored unicode icons as the best alternatives:
  - Note: `> ℹ️ **Note:** This is a note.`
  - Tip: `> 💡 **Tip:** This is a tip.`
  - Important: `> 📢 **Important:** This is important.`
  - Warning: `> ⚠️ **Warning:** This is a warning.`
  - Caution: `> 🛑 **Caution:** This is caution.`
