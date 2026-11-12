---
name: wiki_editing
description: "Instructions and conventions for editing the GnollHack Wiki Markdown pages: Formatting, wikilinks, images, icons, writing style and tone, and the closing encoding check."
---

# GnollHack Wiki Editing Guidelines

When editing or creating pages for the GnollHack Wiki, follow these conventions. Read section 19, Writing Style, before writing any prose: the formatting rules below say how a page looks, and section 19 says how it reads. Section 20 says when and how a page states the date or version it is valid for.

## 1. File and Heading Structure
- **Page Titles**: The wiki automatically uses the filename (without `.md`) as the page title. Never start a page with an `H1` (`#`) or `H2` (`##`) heading that is identical to the page's name (the filename without extension). In such cases, omit the heading completely, as it is implied and provided to the page from the filename. Use a single `H1` heading (`#`) on the very first line ONLY if you need a custom title that differs from the filename (e.g., incorrect filename casing or special pages like the home page). In most cases, an H1 is not needed. Never apply a Unicode icon to `H1` (`#`) headings.
- **Section Headings**: Use only `H2` (`##`) and lower for all other section headings.
- **Spacing**: Always place an empty line before and after all headings (except before the `H1` at the very beginning of the file). This explicitly includes `H2` (`##`) and `H3` (`###`) headings, which must have an empty line above and below them.
- **Subdirectories**: Group files into subdirectories (e.g., `/Monsters/`, `/Items/`) to prevent naming conflicts and organize content.
- **Ingress**: If an article has an ingress, it must be styled as a block quote (`>`) starting with a `👉` emoji, followed by bold text (e.g., `> 👉 **This is the ingress.**`). An ingress is optional and one sentence long. It states something about the subject ("Auto-stashing puts the items you pick up into the best container you carry."), never about the page ("This page details…", "This guide explains…"). Leave it out on short pages and on pages whose first paragraph already does the job. An existing two-sentence ingress needs no change unless the page is being rewritten.
- **Lists**: Use a dash (`-`) for Markdown lists instead of an asterisk (`*`) by default.
- **Closing Link Sections**: Keep wiki pages and external websites in separate sections at the end of a page. A `## 📖 Learn More` or `## 📖 See Also` section lists only wikilinks to other pages of this wiki. External links (standard Markdown links to other websites) go into their own `## 🔗 External Links` section, placed after it, as the last section of the page except for a Validity section (section 20). Use `## 📖 References` instead when the links are the sources that the page's facts are based on. The icon marks the destination: a book icon means the links stay inside this wiki, and a link icon means they leave it. The same icons apply to an `H3` link subsection inside a longer page. Never mix wikilinks and external links in one list. A closing section is the exception, not the default: section 4 and `AGENTS.md` allow it only for a few essential links that cannot be placed inline, and a hub page that lists the articles of its series is the other case where one belongs. Never add a `### 📖 Learn More` block after each section of a page; link the pages inline where the text mentions them.
- **Curating Closing Links**: Closing link sections are rigorously curated, not exhaustive. List only the pages a reader of this article would genuinely want next: its direct prerequisites and follow-ups, the pages it depends on, and the pages that answer the obvious next question. Leave out anything only vaguely related; a page that merely shares a topic area, or that is listed for completeness, buries the links that matter and makes the section worth less than a shorter one would be. A link to a hub page is always acceptable when the article belongs to a series that the hub hosts. Prefer a short list; when in doubt, leave the link out.
- **Articles Index**: `Articles for Software Developers.md` lists the wiki's standalone long-form articles for software developers, newest first. Each entry is the bold title link followed by `<br />`, then an indented line with the date in italics, `·`, and a one-line description (`*July 2022, revised June 2026* · The early years of the modern client`). When you write a new article for software developers that explains, compares, or tells a story, and is not a reference page, procedure, policy, or hub, add it there. Where a topic hub already lists the article's series, add it only if it is among the few that best serve software developers, and keep the hub link.
- **Meta Description Overrides**: The wiki chooses each page's search-engine description (the meta description) from the page's ingress, first paragraph, or opening list. A page can set its own instead with a `description:` front matter key.
  - **When**: Only when the chosen text does not describe the page, for example on a page of parallel sections with no introduction. Prefer fixing the page itself: add an ingress or write a better first paragraph.
  - **Syntax**: The very first lines of the file, holding a single `description:` key, always double-quoted on one line. Never use a `>` or `|` block scalar: it fails to parse. Write plain text; `&` is fine, Markdown and HTML are not.
  - **Content**: At most 160 characters, about the page's subject, in US English. Start the text after a colon with a capital letter, as in the example below (section 6).
  - **No other keys**: Any other key renders as a visible metadata table at the top of the page, and `title:` loses to the page's H1 anyway.
  - **Line endings**: CRLF in the working tree is fine, because Git stores LF; front matter stored with CRLF in the index would fail to parse.
  - **Gnoll Overseer**: The advisor reads the raw `.md` files and does not strip front matter, so it sees the override as part of the page.
  - **Example**: `Download.md` starts with:

    ```
    ---
    description: "Downloads for GnollHack: Get the game for Android, iOS, Linux, macOS, Steam Deck, and Windows from Google Play, the App Store, Steam, or GitHub."
    ---
    ```

## 2. Wikilinks (Gollum Syntax)
- **Syntax**: Use Gollum-style wikilinks: `[[Alias|Page Name]]` or `[[Page Name]]`. **IMPORTANT**: The alias always comes first and the page name comes last!
- **Section Links**: Never use the `[text](#section-anchor)` format for in-page section links. Always use the Gollum-style format instead: `[[text|#section-anchor]]`. The section anchor must be:
  - Converted to lowercase.
  - Spaces replaced with dashes (`-`).
  - Emojis and other special characters removed.
  - Cleaned up so there are no leading or trailing dashes, and no consecutive dashes (e.g., `--` becomes `-`).
  - The end result should have only lowercase letters, numbers, and dashes.
  - Example: For a heading `## ⛰️ Plane of Earth`, the in-page section link should be `[[Plane of Earth|#plane-of-earth]]`.
- **Paths**: All wikilinks pointing to a page in a subfolder (e.g., `[[/Items/potion of healing]]`, `[[/Artifacts/Vorpal Blade]]`) must start with a slash (`/`), regardless of whether the source file is located in the root directory or in a subdirectory. If a link points to a page in the root directory (e.g., `[[Home]]`), it should not start with a slash, *unless* the source document is in a subdirectory (e.g. `Rooms/`), in which case the link targeting the root page must start with a leading slash (e.g. `[[/Rings]]` or `[[/Weapons]]`).
- **No Backticks with Wikilinks**: Never wrap wikilinks in backticks (e.g., write `[[Page Name]]` or `[[/Items/potion of healing]]`, never `` `[[Page Name]]` `` or `` `[[/Items/potion of healing]]` ``). In Gollum markdown, wrapping a wikilink in backticks prevents it from rendering as a clickable hyperlink and displays it as literal code text instead.
- **File Extensions**: Do not include the `.md` extension in wikilinks.
- **Case-Sensitivity**: **Subdirectory names in wikilinks are case-sensitive** and must match the physical directory casing exactly (e.g., `/Items/`, `/Monsters/`, `/Dungeon/`, `/Conducts/`). Only the final page name itself is case-insensitive in Gollum.
- **Aliases**: Never use an alias in wikilinks when the link text is the same as the target page name (e.g., use `[[/Roles/Priest]]` instead of `[[Priest|/Roles/Priest]]`). Use an alias only when the link text must differ from the page name, such as to use the plural form of the page name (e.g., `[[Priests|/Roles/Priest]]`). Remember: **Alias comes first, Page Name comes last**.
- **Simplifying Wikilinks with Subdirectories**: If the desired link text matches the target page's filename exactly (case-insensitively), you do not need an alias, even if the target is in a subdirectory or root directory. In Gollum, the directory path is hidden by default and only the filename is displayed. For example:
  - Use `[[/Rooms/Shops/General store]]` instead of `[[General store|/Rooms/Shops/General store]]`
  - Use `[[/Rooms/shop]]` instead of `[[shop|/Rooms/Shop]]`
  - Use `[[/rings]]` instead of `[[rings|/Rings]]` (from a subdirectory)
  - Use `[[weapons]]` instead of `[[weapons|Weapons]]` (from the root directory)
- **Dashes and Spaces**: In the latest version of Gollum, dashes (`-`) in Markdown filenames represent literal dashes, unlike GitHub wikis where they represent spaces. A space in a filename denotes a space (and is represented as `%20` in URLs). Therefore, when linking to a page with a dash in its filename, **keep the dash in the wikilink**; do not replace it with a space.
- **Capitalization**: Wikilinks should follow standard English grammar capitalization rules for the surrounding sentence, regardless of the actual filename's capitalization (since Gollum links are case-insensitive).
  - Regular item names and regular monster names follow standard English letter capitalization rules. Do not start regular item names (such as the ring of polymorph) always with an uppercase letter. For example, use `[[/Items/potion of healing]]` in the middle of a sentence.
  - Spells are always cased with only the first letter in uppercase (e.g., `[[/Spells/Finger of death]]`).
  - Artifacts and unique monsters follow standard English title casing. For example, use `[[/Monsters/Wizard of Yendor]]`.
  - For title cased names that start with an article like "The" (e.g., artifact names), the article itself follows standard English grammar capitalization (e.g., use `[[/Artifacts/the Katana of Masamune]]` in the middle of a sentence, or `[[/Artifacts/The Katana of Masamune]]` at the start of a sentence). The rest of the name remains title cased.
  - If you must capitalize the first letter of a regular item or monster (e.g., when starting a sentence), capitalize the letter directly in the filename portion of the wikilink (the part after the subdirectory, if present). For example, use `[[/Items/Potion of healing]]` instead of `[[Potion of healing|/Items/potion of healing]]`.
- **Monster & Item Categories / Valid Links**: Do not create wikilinks to non-existing pages. Always verify that a target page actually exists before linking it. Do not link to generic monster or item category pages (like "books", "spellbooks", "potions", "scrolls", "weapons", "armor", "ammunition", "comestibles", "rings", "gems", "wands", "reagents", "dragons", "vampires") UNLESS a corresponding page actually exists in the wiki (e.g., if a page like Weapons or Rings exists, it is allowed to link to it; otherwise, leave them as plain text). If a category page DOES exist (such as Nymphs), make a wikilink to the category page (e.g., `[[/Monsters/Nymphs]]`).
- **Gold**: Never create wikilinks for "gold" (e.g., `[[/Items/Gold]]` or `[[gold|/Items/Gold piece]]`). Always leave the word "gold" or "gold pieces" as plain text.

## 3. Images and Uploads
- **Upload Directory**: All images must be placed under the `/uploads/` directory. Match the subdirectory structure of the document (e.g., an image for `/Races/Dwarf.md` goes to `/uploads/Races/Dwarf/image.webp`).
- **Format**: Use **WebP** format exclusively.
  - A quality setting of **85** is used by default, and almost always for larger images, such as 512x512-pixel AI-generated illustrations.
  - A quality setting of **100** (lossless) is used only for small icons (32x32 or smaller) and for images with flat colors, such as Excel screenshots (for example, comparison pages may have such images). They can have a very high pixel resolution but compress to a very small file size when encoded losslessly. Even though there is no strict maximum file size for such images, their file sizes are often under 100 KB.
  - If a WEBP file is larger than 100 KB, tell the user the used quality setting and ask them to suggest what to do (e.g., accept the large size, lower the encoding quality, or provide a custom WEBP file).
  - **Special-purpose images** may be **JPG** (photographic content) or **PNG** (flat colors or transparency) instead of WebP. A special-purpose image is one that is not an illustration, table, chart or screenshot, such as a reference example on an AI instructions page that shows the exact output another service expects (for example, the Steam event images on `Development/AI/Steam Events and Announcements.md`). The quality settings and the 100 KB check above apply to WebP only, but a special-purpose image should still be no larger in pixels or bytes than its purpose needs.
- **Styling for Illustrative Images** (these rules apply *only* to illustrative images, which are usually generated with AI): 
  - File size should be under 100 KB.
  - Transparent backgrounds (no white backgrounds).
  - 12-pixel rounded corners for sharp-cornered images.
  - Dimensions: Square (512x512), Horizontal (Width 512), Vertical (Height 512).
- **Link Syntax**: Use standard Markdown image syntax referencing the absolute path: `![Alt Text](/uploads/Path/To/image.webp)`. Any spaces in the image path must be URL-encoded as `%20` (e.g., `![Alt Text](/uploads/Path/To%20Some/image.webp)`).

## 4. Restrictions
- **Reserved Folders**: Do not create, modify, or put anything in the `/gollum/` or `/.gollum/` directories. These are strictly reserved for wiki software functions and website files.
- **Horizontal Lines**: Do not use horizontal lines (e.g., `---` or `***`) anywhere in the wiki. They are not needed in Markdown documents. The one exception is the pair of `---` lines that delimits a meta description override (section 1).
- **"See Also" Sections**: Do not create "See Also" sections. Link related pages inline, where the text mentions them. Add a "See Also" section only for a few very important and necessary links that cannot be placed naturally in the text.
- **Markdown Flavor**: The wiki uses Gollum-style Markdown, not GitHub Flavored Markdown. It does not support GitHub-style alerts (e.g., `> [!IMPORTANT]`, `> [!NOTE]`). Use standard Markdown blockquotes with bold text and colored unicode icons as the best alternatives:
  - Note: `> ℹ️ **Note:** This is a note.`
  - Tip: `> 💡 **Tip:** This is a tip.`
  - Example: `> 💡 **Example:** This is an example.`
  - Important: `> 📢 **Important:** This is important.`
  - Warning: `> ⚠️ **Warning:** This is a warning.`
  - Caution: `> 🛑 **Caution:** This is caution.`
- **Callout Count**: Callouts are for the few things a reader must not miss. Use at most a handful per page, and never one per example: several examples of the same option go in one code block, with a short comment line above each.
- **HTML Lists**: Gollum does not support HTML lists (such as `<ul>` and `<li>` tags). Avoid using them in Markdown files, including inside tables. Instead, represent list items in tables using Unicode bullets (e.g., `• `) separated by HTML line breaks (`<br />`).
- **Source Code References**: The wiki is player documentation, not developer documentation. Never cite the game's source code on a page: no file paths (such as `src/zap.c` or `include/mondata.h`), no line numbers, and no C identifiers such as macros, struct fields, enum constants or function names (such as `MR_FEAR` or `save_adj`). State the mechanic in the game's own vocabulary instead, writing "monsters that are immune to fear" rather than "monsters with `MR_FEAR`". Reading the code to establish a fact is correct and expected, but the citation belongs in the implementation plan or the handoff report, never on the page. The only exception is a page under `Development/` that documents the repository itself, where naming a file the reader is meant to open is the point.
- **AI Instructions**: When writing instructions intended to be read by an AI agent, do not include any emojis in the instruction sections.

## 5. Mathematical Formulas (KaTeX)
- **Prefer Plain Text for Simple Formulas**: For simple mathematical expressions or basic requirements (e.g., `Level >= 3` or `Luck >= 0`), format them as plain text. Do not use KaTeX for simple expressions.
- **Use KaTeX Only for Complex Formulas**: Use KaTeX notation only for complex mathematical formulas, fraction-based equations, or multi-variable calculations.
- **Delimiters**: All KaTeX formulas must start with `$` and end with `$`.
- **Spacing**: Always leave an empty line before and after a KaTeX formula that is not an inline formula, but is on its own line.
- **Example**:
  - Complex formula in KaTeX: `$P = \frac{1}{10 + 2 \times G \times A}$`
  - Simple formula in plain text: `Luck >= 0` or `1 in 10`

## 6. Spelling
- **Archaeologist**: Always prefer the spelling "Archaeologist" (with the 'a' in the middle) instead of "Archeologist". This applies to all references in the wiki and the game.
- **Gehennom**: Always use the term "Gehennom" and never "Hell".
- **Leucrotta**: Always spell the monster name as "Leucrotta" (with a 'u') and never "Leocrotta" (which is the NetHack spelling).
- **The Hand of Elbereth**: Never use the term "the Hand of Elbereth" in a generic sense when referring to crowning (unrelated to the character's alignment). Only use "the Hand of Elbereth" when specifically referring to the crowning title for Lawful characters. For generic cases, simply use "crowning" or "crowned".
- **Special Favor**: Always use the term "special favor" on the wiki instead of the internal C code term "pat on the head".
- **Grammar and Capitalization**: Write correct US English grammar: subject-verb agreement, complete and unambiguous lists, and no comma before "but" when it joins two verbs that share one subject. Start every sentence, and the text in every table cell, with a capital letter.
  - A name whose own styling starts with a lowercase letter keeps that styling, for example iNethack2, xNetHack, itch.io, and nethack.app. A table cell that starts with such a name, or with a link whose text is such a name, is correct as it is.
  - In running text, rephrase a sentence so that such a name does not start it: write "WebHack and the online mode of nethack.app keep their games", not "nethack.app keeps its games".
  - Prefer a capital letter after a colon, everywhere: in running text, in list items and table cells, in headings, and in `description:` front matter. This covers a term and its definition (`**Experiment**: A new project…`), a status and its reason (`🔴 Unmaintained: Last updated in 2021.`), a link and the platforms it serves (`[NAO](…): Web browsers`), a subject and a clause about it (`Downloads for GnollHack: Get the game…`), and a sentence that a colon continues (`One thing matters most: Keep your pet close.`). A name styled in lowercase, such as macOS or iPhone, keeps its styling there too.
  - The one exception is a short inline series of common nouns that finishes the sentence, such as "It resists three elements: fire, cold, and shock." Keep that series in lowercase.
  - Before finishing, read every sentence and table cell you wrote or changed, and fix any grammar or capitalization error you notice elsewhere on the same page. Fixing an error means fixing that error: keep the rest of the sentence, and the writer's voice, as they are. Do not rewrite a human-written page into the house register while correcting it.

## 7. Game Stats Conventions
- **Strength Values**: When writing or verifying strength values that exceed 18, convert the C macros correctly:
  - Values using `STR18(x)` (e.g., `STR18(100)`) should be formatted as `18/xx` (e.g., `18/100`).
  - Values using `STR19(x)` (e.g., `STR19(25)`) should be formatted strictly as `x` (e.g., `25`). Do not write `125` or `19/25`.

## 8. Game Commands and Keyboard Shortcuts

- **Game Commands**: Always mention a game command by its name with a capital letter, followed by its keyboard shortcut in parentheses formatted as code. Example: Pray (`Alt+p`). Do not mention an extended command (e.g., `#pray`) for a game command if there is a keyboard shortcut available for it.
- **GnollHack Keyboard Shortcuts**: Use lowercase letters for the keys in GnollHack game keyboard shortcuts (e.g. `e`, `Shift+e`, `Alt+e`, `Alt+Shift+e`). A normal key is written as a single lowercase letter (e.g. `e`). A Shift key shortcut is written as `Shift+lowercase letter` (e.g. `Shift+e`). Apply this format to all modifier key combinations within the game: Ctrl shortcuts (e.g. `Ctrl+e`), Alt shortcuts (e.g. `Alt+e`), and combined modifiers (e.g. `Ctrl+Shift+e`, `Alt+Shift+e`).
- **Modifier Key Order**: When combining multiple modifier keys in a shortcut (both for GnollHack and non-GnollHack shortcuts), always list them in this standard order: **Ctrl**, then **Alt**, then **Shift** (e.g. `Ctrl+Alt+Shift+key`, `Alt+Shift+e`, `Ctrl+Shift+c`, `Ctrl+Alt+i`).
- **Non-GnollHack Keyboard Shortcuts**: For any keyboard shortcuts that are not specific to the GnollHack game client (such as operating system hotkeys, VS Code markdown editor shortcuts, or other application keys), always use uppercase letters for the shortcut key (e.g., `Ctrl+Shift+P`, `Ctrl+I`, `Ctrl+B`, `Ctrl+Shift+V`, `Win+R`, `Alt+Tab`).

## 9. Recommended Unicode Icons

Put one Unicode icon immediately after the heading marker of every `H2` (`## `) heading. On `H3` (`### `) headings, use an icon only on long reference pages where it helps the reader scan; never use one on `H4` or deeper headings. This rule applies to headings you write or rewrite; do not strip icons from an existing page as a side effect of an unrelated edit. Use this verified list as a guide. **Exceptions**:
- Never use Unicode icons in headings that start with a number (such as `1.`, `2.`, `3.`, or `### 1. Heading Name`).
- Never apply a Unicode icon to H1 (`#`) headings (custom page titles).
- Never use Unicode icons in headings in Privacy Policy, Terms of Service, and other legal documents.
- Use only emoji from Emoji 12.0 (2019) or earlier. Windows 10's emoji font stops at Emoji 12.0 and shows a newer emoji as an empty box. In particular, never use U+1FA83 to U+1FAFF (magic wand, coin, rock, window, ladder, headstone, and so on) or U+1F6DF (ring buoy). The scan in section 18 finds them.

- **General Guides & Meta Info**:
  - General Info / Overview (General articles): `📖` or `ℹ️`
  - Quest / Geographic / World Overview: `🌍`
  - Starting Guide / Beginner Info: `🏁`
  - NetHack Veterans / Experienced Players: `🎖️`
  - Advanced Guide / Strategy: `🏆`
  - Difficulty Levels: `🌟`
  - Gameplay Modes: `🕹️`
  - Settings / Options: `⚙️`
  - Help / FAQ: `❓`
  - Platforms / Installation (Android, iOS, Windows, macOS, Linux, Steam): `💻` or `📱` or `🖥️`
  - Developer Workflows / Build Instructions / Code Contributions: `🛠️` or `🧑‍💻`
  - Prerequisites: `📋`
  - Release / Build Checklists: `📋` or `✅`
  - Scores / Tournaments: `🏆` or `🎖️` or `💯`
  - Conclusions / Summary: `💡`
- **Character Attributes & Core Stats**:
  - Core Attributes (General): `💪` or `🧬`
  - Strength: `💪`
  - Dexterity: `🎯` or `🤸`
  - Constitution / Health: `🔋`
  - Intelligence: `🧠`
  - Wisdom: `📖` or `🦉`
  - Charisma: `✨` or `👑`
  - Experience / Level: `📈` or `🌟`
  - Hit Points (HP) / Health: `❤️`
  - Mana (MP) / Spell Power: `🔮` or `💙`
  - Alignments (General): `⚖️`
  - Lawful / Halo / Deities: `⚖️` or `😇`
  - Neutral / Balance: `😐` or `☯️`
  - Chaotic / Chaos: `😈` or `🔥` or `🌀`
- **Character Classes / Roles**:
  - Archaeologist: `🏺`
  - Barbarian: `🪓`
  - Caveman: `🦴`
  - Healer: `🧪`
  - Knight: `🛡️`
  - Monk: `🥋`
  - Priest: `⛪`
  - Rogue: `🗡️`
  - Ranger: `🏹`
  - Samurai: `⚔️`
  - Tourist: `📸`
  - Valkyrie: `⚡`
  - Wizard: `🧙`
- **Playable Races**:
  - Human: `🧑`
  - Dwarf: `⛏️`
  - Elf: `🧝`
  - Gnoll: `🐺`
  - Orc: `👹`
- **Dungeon Exploration & Gameplay**:
  - Level / Map Structure: `🗺️`
  - Dungeon Branches: `🔀`
  - Directions / Navigation: `🧭`
  - Special Levels: `🚩`
  - Characteristics: `ℹ️`
  - Entrance / Entry: `🚪`
  - Drawbridge: `🌉`
  - Gnomish Mines: `⛏️`
  - Sokoban / Puzzles: `🧩`
  - Portals / The Quest: `🌀`
  - Requirements / Entry Requirements: `📜` or `🕯️`
  - Astral Plane: `🌌`
  - Plane Sequence: `🔢`
  - Gehennom: `🔥` or `😈`
  - Towns / Shops / Merchants: `🏪` or `🏛️`
  - Altars / Temples / Sacrifice / Praying: `⛪` or `🕯️` or `🛐` or `🩸`
  - Fountains: `⛲`
  - Traps / Hazards: `🕳️` or `🕸️` or `⚠️`
  - Movement / Travel: `🚶` or `🏃` or `👟`
  - Encumbrance / Carrying Capacity: `🎒` or `🏋️`
  - Companion / Pets / Canines / Felines: `🐾` or `🐶` or `🐱`
  - Mercenaries / Hirelings: `🤝` or `💂` or `💰`
- **Combat & Monsters**:
  - Combat (General) / Melee: `⚔️` or `🗡️`
  - Ranged / Ammunition / Bows / Throwing: `🏹` or `🎯`
  - Monsters / Enemies / Bestiary (General): `👹` or `🐉` or `💀` or `👾`
  - Bosses / Nemesis (General): `👑` or `😈` or `💀`
  - Specific Major Bosses:
    - The Wizard of Yendor: `🧙‍♂️`
    - Vlad the Impaler: `🧛`
    - Medusa: `🐍`
    - Orcus: `🐐`
    - Baalzebub: `🦟`
    - Dispater, Yacc: `😈`
    - Jubilex: `🦠`
    - Yeenaghu: `🐺`
    - Croesus: `👑`
    - Tarrasque: `🦖`
    - Modron Primus: `👁️` or `🤖`
  - NPCs (Non-Player Characters): `👤`
  - Growing Up (Monsters/Pets): `🐣` or `🌱` or `📈`
- **Equipment & Wearables**:
  - Wearable Items / Equipment Screen: `👕` or `🛡️` or `🎒`
  - Body Armor / Shirts / Robes / Uniforms: `👕` or `🥋` or `🧥`
  - Shields: `🛡️`
  - Helms / Headwear: `⛑️`
  - Cloaks / Capes: `🧥`
  - Gloves / Gauntlets: `🧤`
  - Boots / Shoes / Footwear: `🥾`
  - Bracers: `💪`
  - Rings: `💍`
  - Amulets: `📿` or `🧿`
  - Quality Tiers (Exceptional, Elite, Celestial, etc.): `💎`
- **Items & Consumables**:
  - Item Identification: `🔍` or `👁️`
  - Food / Comestibles: `🍏` or `🥩` or `🍞`
  - Eating / Nutrition / Consuming Food: `🍗` or `🍎`
  - Potions / Alchemy: `🧪` or `⚗️`
  - Diluted Potions: `🧪` or `💧`
  - Evaporation / Destruction: `💨` or `💥`
  - Scrolls: `📜`
  - Wands: `✨`
  - Spellbooks / Books: `📕` or `📖`
  - Tools / Miscellaneous Items: `🛠️` or `🧰`
  - Gems / Precious Stones / Touchstones: `💎`
  - Artifacts / Special Gifts: `✨` or `👑`
  - Starting Items: `🏁`
  - Wishing / Genies: `🧞` or `✨`
- **Magic & Spells**:
  - Spellcasting / Magic Systems: `🔮` or `🧙`
  - Spells (General): `✨` or `⚡`
  - Healing / Divine / Recovery: `🩹` or `❤️` or `➕`
  - Offensive / Conjuration Spells: `💥` or `🔥` or `⚡`
  - Utility / Divination / Transmutation Spells: `👁️` or `🧪` or `🌀`
- **Status Conditions & Hazards**:
  - Status Conditions (General): `🩹` or `🤒`
  - Sickness / Mummy Rot: `🤢` or `🤒`
  - Poison / Poisoning / Deadly Venom: `☠️` or `🤢`
  - Petrification / Stone: `🗿`
  - Lycanthropy: `🐺`
  - Curses / Negative Effects: `💀` or `🖤` or `❌`
  - Blessings / Holy / Uncursed: `⭐` or `💛` or `👼`
  - Blindness: `🙈` or `🕶️`
  - Stun / Confusion: `🌀` or `💫`
  - Hallucination: `🌈` or `🍄`
  - Bones Files / Player Graves / Death: `⚰️` or `💀`
- **Audio & Sound**:
  - Soundtracks / Music / Audio Systems: `🎵` or `🔊` or `🎹`
  - Voiceovers / Dialogue: `🗣️` or `🎙️`

## 10. Recommended Unicode Icons for Other Uses

Use the icons below where they carry meaning: the callout icon at the start of a callout, a status marker (✅ ❌ 🟢 🔴) in a table cell or list item, an alignment or curse marker where the page is about alignments or curse status. Do not start every table cell or list item with an icon for decoration.

- **Alerts & Callouts** (for blockquotes `>`):
  - Note: `ℹ️` (`> ℹ️ **Note:** ...`)
  - Tip: `💡` (`> 💡 **Tip:** ...`)
  - Example: `💡` (`> 💡 **Example:** ...`)
  - Important: `📢` (`> 📢 **Important:** ...`)
  - Warning: `⚠️` (`> ⚠️ **Warning:** ...`)
  - Caution: `🛑` (`> 🛑 **Caution:** ...`)

- **Document Structure**:
  - Ingress: `👉` (`> 👉 **Auto-stashing puts the items you pick up into the best container you carry.**` at the top of a page; see section 1)
  - Conclusions / Summary: `💡` (e.g., `## 💡 Conclusions`)
  - Validity: `📅` (`## 📅 Validity`, the last section; see section 20)

- **User Interface & Interaction Controls**:
  - Keyboard Shortcuts / Keys / Commands: `⌨️`
  - Mouse Clicks / Gestures / Actions: `🖱️`
  - Menus / Settings / Command Rows: `⚙️` or `🕹️` or `📱`
  - Status Lines / Display Layout: `🖥️`
  - External Links / Link References: `🔗`

- **Game Statuses & Indicators**:
  - Active / Classic Mode / Enabled / Yes: `🟢` or `✅`
  - Warning / Classic-Casual Mode / Inactive: `🟡` or `😐`
  - Permadeath Mode / Disabled / Dead / No: `🔴` or `❌`
  - Allowed / Available: `✅`
  - Prohibited / Restricted: `❌`

- **Inline Item & Ability Modifiers**:
  - Blessed / Holy / Amber altar flash: `⭐` or `💛` or `👼`
  - Cursed / Cursed / Black altar flash: `💀` or `🖤` or `😈`
  - Uncursed / Neutral / No altar flash: `⚪`
  - Intrinsic Properties: `🧬`
  - Extrinsic Properties (Equipment-granted): `👕` or `🛡️` or `💍`
  - Upgraded Quality (Exceptional, Elite, etc.): `💎`

- **In-Text Alignment, Gender, & Role Modifiers**:
  - Lawful: `⚖️` or `😇`
  - Neutral: `😐` or `☯️`
  - Chaotic: `😈` or `🔥` or `🌀`
  - Male: `♂️`
  - Female: `♀️`

- **Economy & Value**:
  - Gold / Price / Cost / Shop purchases: `💰`

- **Arrows**:
  - Use Unicode `→` instead of `->`
  - Use Unicode `←` instead of `<-`

## 11. Recommended Unicode Icons for Article Types

When linking to or categorizing different types of articles (for instance, in lists or tables of contents), use the following Unicode icons to indicate the nature of the article. **Note:** These icons do not necessarily need to be inserted before each individual article link; they can instead be applied only to the overarching section heading for that group of articles.

- **Technological Background Articles** (explaining architecture, history, and technical choices): `🏗️` or `🧠` or `💡`
- **Tutorials and Guides** (step-by-step instructions for gameplay): `🎓` or `🏁`
- **Reference and Data** (raw data, game mechanics, item tables): `📊` or `📖`
- **Build Instructions** (compiling and setting up the game): `🛠️` or `🧑‍💻`
- **Troubleshooting and FAQ** (solving common problems): `❓` or `🔧`
- **Project Management and Checklists** (release steps, to-dos): `📋` or `✅`
- **Legal and Policy** (privacy policies, licenses): `📄` or `⚖️`

## 12. Recommended Unicode Icons for Games and Variants

When referencing or comparing different games and NetHack variants, use the following Unicode icons:

- **NetHack / NetHack 5.0**: `🧙‍♂️` (Wizard)
- **GnollHack / GnollHack Release 3**: `🐺` (Wolf)
- **NetHack Windows GUI**: `🖥️` (Desktop Computer)
- **NetHack 3D**: `🧊` (3D Cube)
- **dNetHack**: `🐙` (Octopus)
- **EvilHack**: `😈` (Devil)
- **UnNetHack**: `🎲` (Dice)
- **Pathos**: `📱` (Mobile)
- **Shattered Pixel Dungeon**: `🗝️` (Old Key)

## 13. Footnotes

- Footnotes should use an ordinal numbering system starting from 1. 
- These numbers are included as superscripts with the HTML `<sup>` tag. For example, `<sup>1</sup>`. 
- The footnotes are listed below the table or text in an unordered list with the number in superscript like this: `- <sup>1</sup> Footnote description.`

## 14. Tables

- **First Column**: Usually bold the values of the first column of Markdown tables, when it contains only values and no wikilinks.

## 15. Legal and Store Compliance Documents

- **Scope**: Includes `Privacy Policy.md`, `Gnoll Overseer Privacy Policy.md`, `GnollHack App Privacy Policy.md`, `GnollHack Steam App Privacy Policy.md`, `GnollHack Android App Privacy Policy.md`, `GnollHack iOS App Privacy Policy.md`, `GnollHack Account Privacy Policy.md`, `GnollHack Wiki Cookie Policy.md`, `GnollHack.com Cookie Policy.md`, `GnollHack Account Cookie Policy.md`, `AI Usage Policy.md`, and `Overseer AI Providers.md`.
- **Steam Store Disclosures (`Overseer AI Providers.md`)**: `Overseer AI Providers.md` is a legally binding disclosure document linked directly from the Steam store notice **"Connects to 3rd-Party Service for AI Content Generation: OpenAI, Anthropic, and Google"**. It must remain strictly focused on live third-party AI content generation disclosures, identifying legal entities, providing direct links to external Terms of Service and Privacy Policies, disclosing data transmission scope and local encryption, detailing automated content safety guardrails, and establishing opt-in consent. Do not include gameplay guide text, model benchmarking tables, or non-legal wiki links in this document.
- **No Heading Icons**: Never use Unicode emojis/icons in headings on legal, privacy, or compliance documents.
- **Cross-References**: Cross-link exclusively to relevant first-party legal, policy, and safety pages (such as `[[Gnoll Overseer Privacy Policy]]`, `[[AI Usage Policy]]`, `[[GnollHack Steam App Privacy Policy]]`, or `[[/Development/AI Safety Settings]]`). Avoid linking to general gameplay guides.

## 16. How the Gnoll Overseer Retrieves Wiki Content

The Gnoll Overseer AI advisor answers player questions from this wiki through search and
page-view tools. Two properties of those tools decide whether a fact is reachable:

- **Search is heading-scoped.** Search hits are excerpts under individual headings, scored by
  query-term frequency with headings weighted ten times more than body text. A fact under a
  heading that names it is found; the same fact buried in a paragraph under an unrelated
  heading is often not. Prefer one clear `##` or `###` heading per mechanic.
- **Page views can target a section by heading**, and a page that exists but is linked from
  nowhere the reader arrives at is effectively hidden. When a mechanic page explains something
  that many other pages state in one line (a saving throw, a resistance, a skill), link the
  mechanic page from that line, using the link rules in section 2.

Do not write for the advisor at the expense of human readers; these are tie-breakers when
two layouts are otherwise equal.

## 17. Improving Pages from Benchmark Findings

A Gnoll Overseer benchmark run reports facts that the game implements and a page does not
state. The gap is real and worth fixing, but the fix is a sentence a player can read, not a
transcription of the evidence that found it.

- **Write the mechanic, not the proof.** The answer goes on the page in the game's own
  vocabulary. The code locations, the reasoning and the verification output go in the handoff
  report, which the user reads once, while the page is read by every player forever.
- **Do not let a page turn into an AI skill.** Pages are for players. Symbol names, line
  citations, condition tables lifted from the code, and prose addressed to an assistant all
  make a page worse to read while making it only marginally easier to retrieve. A page that
  reads like a specification has failed even when every fact in it is correct.
- **One added fact, one plain sentence.** Prefer extending an existing sentence, or adding one
  short paragraph, over inventing a heading for every finding. The retrieval advice in
  section 16 breaks ties between otherwise equal layouts; it never licenses restructuring a
  readable page around search.
- **Follow the requested wording only as far as these rules allow.** A benchmark prompt often
  quotes the exact sentence to write, citations included. Strip whatever the conventions
  forbid, write the readable version, and say what was changed and why in the report.

## 18. Before You Finish: Encoding and Line Endings

Every file this session created or edited must end the session as **UTF-8 without a BOM**,
**CRLF**, and **terminated by a newline**. `.gitattributes` pins `* text=auto eol=crlf`, but
Git will not tell you when a file is wrong: the index stores LF, so a page written with LF,
or with a BOM, shows an ordinary content diff and nothing else. Editing tools that preserve
a page's existing endings are safe on an existing page; a **newly created** file is the
usual casualty, because most file-creation tools write LF.

Run this once, as the last step before the handoff, from the session scratch directory. It
takes the list of changed and new files from Git, so it never touches a page the session
did not:

```powershell
$root = 'C:\hmp\GnollHackWiki'
$utf8 = New-Object System.Text.UTF8Encoding($false)
$fixed = @()
foreach ($line in (& git -C $root status --porcelain --untracked-files=all)) {
    $rel = $line.Substring(3).Trim('"')
    if ($rel -match ' -> ') { $rel = ($rel -split ' -> ')[-1] }
    if ([IO.Path]::GetExtension($rel) -notin @('.md', '.mustache', '.css', '.js', '.txt')) { continue }
    $p = Join-Path $root ($rel -replace '/', '\')
    if (-not (Test-Path -LiteralPath $p)) { continue }
    $bytes = [IO.File]::ReadAllBytes($p)
    if ($bytes.Length -eq 0) { continue }
    $orig = [System.Text.Encoding]::UTF8.GetString($bytes)
    $text = $orig.TrimStart([char]0xFEFF).Replace("`r`n", "`n").Replace("`n", "`r`n")
    if (-not $text.EndsWith("`r`n")) { $text += "`r`n" }
    # Ordinal: PowerShell's -ne ignores a leading U+FEFF and would hide a stripped BOM.
    if (-not [string]::Equals($text, $orig, [StringComparison]::Ordinal)) {
        [IO.File]::WriteAllText($p, $text, $utf8); $fixed += $rel
    }
}
"Normalized: $($fixed.Count)"; $fixed
```

Then confirm nothing tracked has drifted:

```powershell
git -C $root ls-files --eol | Select-String -NotMatch 'w/crlf|w/-text'
```

Then confirm no page uses an emoji Windows 10 cannot draw:

```powershell
$root = 'C:\hmp\GnollHackWiki'
# Code points added in Emoji 13.0 or later, which Windows 10's Segoe UI Emoji lacks.
$ranges = @(
    @(0x1F6D6, 0x1F6DF), @(0x1F6FB, 0x1F6FF), @(0x1F7F0, 0x1F7F0), @(0x1F90C, 0x1F90C),
    @(0x1F972, 0x1F972), @(0x1F977, 0x1F979), @(0x1F9A3, 0x1F9A4), @(0x1F9AB, 0x1F9AD),
    @(0x1F9CB, 0x1F9CC), @(0x1FA74, 0x1FA77), @(0x1FA7B, 0x1FA7F), @(0x1FA83, 0x1FA8F),
    @(0x1FA96, 0x1FAFF)
)
$hits = foreach ($f in Get-ChildItem -LiteralPath $root -Recurse -File -Filter *.md) {
    if ($f.FullName -match '\\(\.git|\.agents|\.claude|gollum|\.gollum)\\') { continue }
    $n = 0
    foreach ($line in [IO.File]::ReadAllLines($f.FullName)) {
        $n++
        for ($i = 0; $i -lt $line.Length; $i++) {
            if (-not [char]::IsHighSurrogate($line[$i])) { continue }
            $cp = [char]::ConvertToUtf32($line[$i], $line[$i + 1]); $i++
            foreach ($r in $ranges) {
                if ($cp -ge $r[0] -and $cp -le $r[1]) {
                    '{0}:{1}: U+{2:X5}' -f $f.FullName.Substring($root.Length + 1), $n, $cp
                }
            }
        }
    }
}
"Emoji 13+ characters found: $(@($hits).Count)"; $hits
```

All three outputs go in the handoff report: the number of files the closing step
normalized (ideally `0`, which means every edit was already correct), an empty drift
check, and an emoji count of `0`. A non-empty drift check names a tracked file with the
wrong endings; fix it with the same recipe and say so. A non-zero emoji count names each
page, line, and code point; replace the icon with one from section 9.

## 19. Writing Style

Pages are written for players by people who know the game. Write the way an experienced
player explains a mechanic to another player: plainly and specifically, and then stop. The
formatting rules above say how a page looks; this section says how it reads.

- **Facts over adjectives.** Give the number, the name, the condition. Write "over 23,000
  tiles drawn for GnollHack", not "a wealth of beautiful graphics". If a sentence still
  says something after you delete its adjectives, delete them.
- **Words to avoid.** Comprehensive, seamless(ly), robust, immersive, groundbreaking,
  testament, profound, elevate, unleash, delve, vast array, wealth of, state-of-the-art,
  game-changer, cutting-edge. Also avoid superlatives nobody can check, such as "no other
  roguelike achieves the same".
- **Constructions to avoid.**
  - "X is not just Y; it is Z" and "not only… but also…".
  - "Whether you want to… or…, …".
  - A rhetorical question answered with an exclamation ("Got a question? Just ask!").
  - Lists of three adjectives or three parallel clauses used for rhythm.
  - Sentences about the page itself ("This page outlines…", "In this guide, you will…").
  - Addressing anyone but players and contributors ("For CTOs and technical leads…").
- **Dashes.** `**Label** — description` is fine in a list of links, as on the Home page.
  In running text, use a comma, a colon, parentheses, or a new sentence instead of an em
  dash.
- **Bold labels.** Use `- **Label:** text` bullets only when the items really are labeled
  terms. A list of plain statements is a plain list, and bold is for the one or two words
  in a paragraph a reader must not miss.
- **Structure follows content.** A short page can be a few paragraphs with no headings. Go
  no deeper than `H3`, except on long reference pages. Use a table only when the data has
  real columns; a two-column "Fact | Value" table of four rows reads better as a sentence.
- **Promotional pages too.** Pages that introduce GnollHack (Overview, Features, the
  Gnoll Overseer) may be enthusiastic, but every claim rests on a fact the page states.
- **Do not invent anything.** No made-up facts, numbers, quotes, or examples. Every
  configuration or command example must be checked against the game, and its caption must
  describe what it actually does. If something cannot be checked, leave it out or say it is
  unverified.
- **Keep the existing voice.** When you edit a page someone wrote by hand, change what the
  task needs and leave the rest of the wording alone. Section 6 says the same about
  grammar fixes.

Before finishing, reread every paragraph you wrote and cut anything a player would skim
past.

## 20. Validity

A few pages describe things that change often enough that a reader needs to know when the
page was checked: which AI models are offered, benchmark settings and versions, the results
of a web scan, known working build setups, library versions in a design, or a feature that is
still being developed. Such a page says once, in a last section of its own, when its content
was checked and for which version.

- **Only where it is critical.** Add the section only when the date or version is part of
  what the reader needs to judge the page, because the content is expected to change from
  one release or month to the next. Most pages do not need one, including pages with an
  occasional "at the moment" or "not yet" about a stable fact, pages about game mechanics,
  and hub pages. When in doubt, leave it out.
- **Only a date that means something.** The date is the day the facts were checked, or a
  date the content is tied to, such as a scan or a benchmark version. Never use a date only
  because a line was written then, or because of an unrelated event such as a wiki
  migration. If no such date is known, do not add the section.
- **Heading and place:** `## 📅 Validity`, the very last section of the page, after any
  See Also, Learn More or External Links section.
- **Content:** as short as possible: "As of version 3.39." Add a date only when the content
  is tied to one rather than to a game version, and add other versions only when the page
  depends on several, such as a library or benchmark version. Nothing else: no explanation
  of what was checked or why it may change. Examples:
  - "As of version 3.39."
  - "As of November 1, 2026."
  - "As of version 3.39, with Sentry 6.12.1 and sentry-native 0.17.2."
  - "As of harness version 45 and scoring method version 13 (October 2026)."
- **Nowhere else.** Do not put "As of …" in the ingress, in a callout at the top, or in
  running text when it repeats the page's validity date. A sentence-level note about a
  third-party tool's own version, such as which Xcode goes with which .NET SDK, may stay
  where it is.
- **Which version:** never name a version newer than the latest release on GitHub. Find it
  with
  `gh release list --repo hyvanmielenpelit/GnollHack --exclude-drafts --exclude-pre-releases --limit 1`.
  Write the client version, as in "version 3.39": GitHub's "4.3.0 Build N" is client
  version "3.N". The version number on `master` (`ApplicationDisplayVersion` in
  `GnollHackM.csproj`, `EDITLEVEL` in `include/patchlevel.h`) is not released and is never
  named on a page.
- **Release or `master`:** check whether `master` has changed what the page describes since
  the release tag, for example with `git log 4.3.0-39..origin/master -- <relevant paths>`.
  If nothing relevant has changed, write the release ("As of version 3.39."); this is
  preferred. If something has, write "As of the development code on `master`, <date>."
- **Steam-only builds:** some builds were released only on Steam, such as 3.37 (4.3.0
  Build 37), the macOS release. History may name them, but the latest GitHub release is the
  reference for a Validity section.
- **Dates:** US format, "November 7, 2026". When you edit such a page without re-checking
  its facts, leave the date alone.
- **Out of scope:** history ("released on …", "since …"), feature-introduction versions
  ("starting from version 3.32"), AI instruction pages, and legal pages, which keep their
  "Last updated" line at the top.
