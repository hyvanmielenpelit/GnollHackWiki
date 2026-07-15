---
name: wiki_editing
description: Instructions and conventions for editing the GnollHack Wiki Markdown pages and handling images.
---

# GnollHack Wiki Editing Guidelines

When editing or creating pages for the GnollHack Wiki, follow these conventions optimized for AI agents like Gemini 3.5 Flash.

## 1. File and Heading Structure
- **Page Titles**: The wiki automatically uses the filename (without `.md`) as the page title. Never start a page with an `H1` (`#`) or `H2` (`##`) heading that is identical to the page's name (the filename without extension). In such cases, omit the heading completely, as it is implied and provided to the page from the filename. Use a single `H1` heading (`#`) on the very first line ONLY if you need a custom title that differs from the filename (e.g., incorrect filename casing or special pages like the home page). In most cases, an H1 is not needed.
- **Section Headings**: Use only `H2` (`##`) and lower for all other section headings.
- **Spacing**: Always place an empty line before and after all headings (except before the `H1` at the very beginning of the file). This explicitly includes `H2` (`##`) and `H3` (`###`) headings, which must have an empty line above and below them.
- **Subdirectories**: Group files into subdirectories (e.g., `/Monsters/`, `/Items/`) to prevent naming conflicts and organize content.
- **Ingress**: If an article has an ingress, it must be styled as a block quote (`>`) starting with a `👉` emoji, followed by bold text (e.g., `> 👉 **This is the ingress.**`).
- **Lists**: Use a dash (`-`) for Markdown lists instead of an asterisk (`*`) by default.

## 2. Wikilinks (Gollum Syntax)
- **Syntax**: Use Gollum-style wikilinks: `[[Alias|Page Name]]` or `[[Page Name]]`. **IMPORTANT**: The alias always comes first and the page name comes last!
- **Section Links**: Do **NOT** use Gollum-style wikilinks with a hash (e.g., `[[#Section Name]]` or `[[Page Name#Section Name]]`) to link to sections in Gollum wikis. It is best to avoid section links entirely. If a section link is absolutely needed, you must use standard Markdown link syntax: `[Alias](#section-anchor)`. The section anchor must be:
  - Converted to lowercase.
  - Spaces replaced with dashes (`-`).
  - Emojis and other special characters removed (or converted to dashes).
  - Cleaned up so there are never two consecutive dashes (e.g., `--` becomes `-`).
  - Example: For a heading `## 🪨 Plane of Earth`, the section link should be `[Plane of Earth](#plane-of-earth)`.
- **Paths**: All wikilinks pointing to a page in a subfolder (e.g., `[[/Items/potion of healing]]`, `[[/Artifacts/Vorpal Blade]]`) must start with a slash (`/`), regardless of whether the source file is located in the root directory or in a subdirectory. If a link points to a page in the root directory (e.g., `[[Home]]`), it should not start with a slash, *unless* the source document is in a subdirectory (e.g. `Rooms/`), in which case the link targeting the root page must start with a leading slash (e.g. `[[/Rings]]` or `[[/Weapons]]`).
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
  - Start item names (and other link text) with a lowercase letter when they appear in the middle of a sentence. For example, use `[[/Items/potion of healing]]`.
  - If you must capitalize a letter (e.g., starting a sentence), capitalize the letter directly in the filename portion of the wikilink (the part after the subdirectory, if present). For example, use `[[/Items/Potion of healing]]` instead of `[[Potion of healing|/Items/potion of healing]]`.
- **Monster & Item Categories / Valid Links**: Do not create wikilinks to non-existing pages. Always verify that a target page actually exists before linking it. Do not link to generic monster or item category pages (like "books", "spellbooks", "potions", "scrolls", "weapons", "armor", "ammunition", "comestibles", "rings", "gems", "wands", "reagents", "dragons", "vampires") UNLESS a corresponding page actually exists in the wiki (e.g., if a page like Weapons or Rings exists, it is allowed to link to it; otherwise, leave them as plain text). If a category page DOES exist (such as Nymphs), make a wikilink to the category page (e.g., `[[/Monsters/Nymphs]]`).
- **Gold**: Never create wikilinks for "gold" (e.g., `[[/Items/Gold]]` or `[[gold|/Items/Gold piece]]`). Always leave the word "gold" or "gold pieces" as plain text.
- **Aliases in Tables**: Never use wikilinks with aliases (pipes `|`) inside Markdown tables, because pipes can conflict with the table's column delimiters in some Markdown parsers. Always use simple wikilinks without aliases (e.g., `[[/Items/potion of healing]]`) in tables. If the display text needs to be lowercase, simply write the link path in lowercase (e.g., `[[/Monsters/gnome king]]` instead of `[[gnome king|/Monsters/Gnome king]]`); Gollum is case-insensitive for linking but will display exactly the casing you type in the link.

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
- **Link Syntax**: Use standard Markdown image syntax referencing the absolute path: `![Alt Text](/uploads/Path/To/image.webp)`. Any spaces in the image path must be URL-encoded as `%20` (e.g., `![Alt Text](/uploads/Path/To%20Some/image.webp)`).

## 4. Restrictions
- **Reserved Folders**: Do not create, modify, or put anything in the `/gollum/` or `/.gollum/` directories. These are strictly reserved for wiki software functions and website files.
- **Horizontal Lines**: Do not use horizontal lines (e.g., `---` or `***`) anywhere in the wiki. They are not needed in Markdown documents.
- **Markdown Flavor**: The wiki uses Gollum-style Markdown, not GitHub Flavored Markdown. It does not support GitHub-style alerts (e.g., `> [!IMPORTANT]`, `> [!NOTE]`). Use standard Markdown blockquotes with bold text and colored unicode icons as the best alternatives:
  - Note: `> ℹ️ **Note:** This is a note.`
  - Tip: `> 💡 **Tip:** This is a tip.`
  - Important: `> 📢 **Important:** This is important.`
  - Warning: `> ⚠️ **Warning:** This is a warning.`
  - Caution: `> 🛑 **Caution:** This is caution.`
- **HTML Lists**: Gollum does not support HTML lists (such as `<ul>` and `<li>` tags). Avoid using them in Markdown files, including inside tables. Instead, represent list items in tables using Unicode bullets (e.g., `• `) separated by HTML line breaks (`<br />`).

## 5. Mathematical Formulas (KaTeX)
- **Prefer Plain Text for Simple Formulas**: For simple mathematical expressions or basic requirements (e.g., `Level >= 3` or `Luck >= 0`), format them as plain text. Do not use KaTeX for simple expressions.
- **Use KaTeX Only for Complex Formulas**: Use KaTeX notation only for complex mathematical formulas, fraction-based equations, or multi-variable calculations.
- **Delimiters**: All KaTeX formulas must start with `$` and end with `$`.
- **Example**:
  - Complex formula in KaTeX: `$P = \frac{1}{10 + 2 \times G \times A}$`
  - Simple formula in plain text: `Luck >= 0` or `1 in 10`

## 6. Spelling
- **Archaeologist**: Always prefer the spelling "Archaeologist" (with the 'a' in the middle) instead of "Archeologist". This applies to all references in the wiki and the game.
- **Gehennom**: Always use the term "Gehennom" and never "Hell".
- **Leucrotta**: Always spell the monster name as "Leucrotta" (with a 'u') and never "Leocrotta" (which is the NetHack spelling).
- **The Hand of Elbereth**: Never use the term "the Hand of Elbereth" in a generic sense when referring to crowning (unrelated to the character's alignment). Only use "the Hand of Elbereth" when specifically referring to the crowning title for Lawful characters. For generic cases, simply use "crowning" or "crowned".
- **Special Favor**: Always use the term "special favor" on the wiki instead of the internal C code term "pat on the head".

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

When editing or creating headings for pages, always use appropriate Unicode icons/emojis immediately after the heading markers (`## ` or `### `) to maintain a rich, consistent visual aesthetic across the wiki. Use this verified list as a guide:

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
  - Legal Pages / Privacy & Cookie Policies: `📄` or `🔒`
  - Scores / Tournaments: `🏆` or `🎖️` or `💯`
- **Character Attributes & Core Stats**:
  - Core Attributes (General): `💪` or `🧬`
  - Strength: `💪`
  - Dexterity: `🎯` or `🤸`
  - Constitution / Health: `🔋` or `🪵`
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
  - Wizard: `🪄`
- **Dungeon Exploration & Gameplay**:
  - Level / Map Structure: `🗺️`
  - Dungeon Branches: `🔀`
  - Directions / Navigation: `🧭`
  - Special Levels: `🚩`
  - Characteristics: `ℹ️`
  - Entrance / Entry: `🚪`
  - Drawbridge: `🌉`
  - Gnomish Mines: `⛏️`
  - Sokoban / Puzzles: `🧩` or `🪨`
  - Portals / The Quest: `🌀`
  - Requirements / Entry Requirements: `📜` or `🕯️`
  - Astral Plane: `🌌`
  - Plane Sequence: `🪜`
  - Gehennom: `🔥` or `😈`
  - Towns / Shops / Merchants: `🏪` or `🏛️`
  - Altars / Temples / Sacrifice / Praying: `⛪` or `🕯️` or `🛐` or `🩸`
  - Fountains: `⛲`
  - Traps / Hazards: `🪤` or `🕳️` or `🕸️` or `⚠️`
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
    - Baalzebub: `🪰`
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
  - Helms / Headwear: `🪖`
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
  - Wands: `🪄`
  - Spellbooks / Books: `📕` or `📖`
  - Tools / Miscellaneous Items: `🛠️` or `🧰`
  - Gems / Precious Stones / Touchstones: `💎` or `🪨`
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
  - Petrification / Stone: `🗿` or `🪨`
  - Lycanthropy: `🐺`
  - Curses / Negative Effects: `💀` or `🖤` or `❌`
  - Blessings / Holy / Uncursed: `⭐` or `💛` or `👼`
  - Blindness: `🙈` or `🕶️`
  - Stun / Confusion: `🌀` or `💫`
  - Hallucination: `🌈` or `🍄`
  - Bones Files / Player Graves / Death: `🪦` or `💀`
- **Audio & Sound**:
  - Soundtracks / Music / Audio Systems: `🎵` or `🔊` or `🎹`
  - Voiceovers / Dialogue: `🗣️` or `🎙️`

## 10. Recommended Unicode Icons for Other Uses

When formatting inline content, tables, lists, or callouts, use appropriate Unicode icons/emojis to maintain readability and visual distinction:

- **Alerts & Callouts** (for blockquotes `>`):
  - Note: `ℹ️` (`> ℹ️ **Note:** ...`)
  - Tip: `💡` (`> 💡 **Tip:** ...`)
  - Important: `📢` (`> 📢 **Important:** ...`)
  - Warning: `⚠️` (`> ⚠️ **Warning:** ...`)
  - Caution: `🛑` (`> 🛑 **Caution:** ...`)

- **Document Structure**:
  - Ingress: `👉` (`> 👉 **Welcome...**` at the top of a page)

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
  - Gold / Price / Cost / Shop purchases: `🪙` or `💰`

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

## 12. Footnotes

- Footnotes should use an ordinal numbering system starting from 1. 
- These numbers are included as superscripts with the HTML `<sup>` tag. For example, `<sup>1</sup>`. 
- The footnotes are listed below the table or text in an unordered list with the number in superscript like this: `- <sup>1</sup> Footnote description.`
