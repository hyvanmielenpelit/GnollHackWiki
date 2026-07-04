![google-antigravity](/uploads/Creating%20Wiki%20Pages%20with%20AI%20Agent/google-antigravity-256.webp)

You can leverage the **[Antigravity App](https://antigravity.google/product/antigravity-2)** powered by Gemini models to automatically research, draft, and format wiki pages. By providing the AI agent access to all related repositories, it can cross-reference code, graphics, and audio to create accurate and comprehensive documentation.

> ℹ️ **Note:** You need a paid Google One AI subscription to use recommended AI agents. You can subscribe via the [Google One AI plan subscription page](https://one.google.com/about/google-ai-plans/). *Google AI Pro* or a better plan is required to access the *Gemini 3.1 Pro* AI model, which is the recommended model to create wiki pages. For extensive AI agent usage, we recommend the *Google AI Ultra* plan.

## 📂 Local Repository Setup

Ensure you have the following repositories cloned locally on your computer:
- [`GnollHackWiki`](https://github.com/hyvanmielenpelit/GnollHackWiki) (The wiki content file repository, for creating and editing pages)
- [`GnollHack`](https://github.com/hyvanmielenpelit/GnollHack) (For researching game mechanics, stats, and source code)
- [`GnollHackTileSet`](https://github.com/hyvanmielenpelit/GnollHackTileSet) (For finding sprite assets)
- [`GnollHackSoundSet`](https://github.com/hyvanmielenpelit/GnollHackSoundSet) (For referencing sound effects and voiceovers)

## ⚙️ Antigravity Workspace Configuration

1. Open the **[Antigravity App](https://antigravity.google/product/antigravity-2)**.
2. Ensure that your workspace is configured so the agent can access all four repository folders (`GnollHackWiki`, `GnollHack`, `GnollHackTileSet`, and `GnollHackSoundSet`). This allows the agent to read and search across the entire project ecosystem.
3. The agent will automatically discover the `.agents/skills/wiki_editing` skill, ensuring it follows the repository's strict formatting, linking, and image guidelines.

## 🧠 Model Selection and Reasoning Levels

The Antigravity App allows you to select between different models and reasoning levels. You should choose the appropriate combination based on the complexity of the wiki page you are creating:

### 🏆 Gemini 3.1 Pro (High)

This is the recommended model for most tasks. It utilizes a large compute budget for extensive chain-of-thought, self-correction, and exploring multiple paths before generating the final output. It is highly capable of complex tasks where the AI needs to piece together information from multiple sources. For example, documenting a new monster by reading its C source code in `GnollHack`, locating its corresponding image in `GnollHackTileSet`, checking for sound events in `GnollHackSoundSet`, and synthesizing it all into a correctly formatted `GnollHackWiki` markdown page.

You should also use Gemini 3.1 Pro (High) to write `SKILL.md` files for AI tasks, if such a file for the specific task is not already present in the repository.

### ⚡ Gemini 3.5 Flash (Low)

This model is recommended for simple bulk operations. It generates output with minimal internal chain-of-thought, making it the fastest option for straightforward tasks such as formatting existing text, fixing typos, or creating simple pages.

### 🛠️ Gemini 3.5 Flash (Medium)

This model is recommended for complex tasks when image conversion to WebP is required (or other advanced tool use).

## 🖼️ Image Conversion with FFmpeg

The wiki requires all images to be in WebP format. Both Gemini 3.5 Flash reasoning levels (Low and Medium) can automatically convert image assets to WebP using terminal commands if **FFmpeg** is installed on your computer. 

If you do not have it installed, you can [download FFmpeg here](https://ffmpeg.org/download.html) and ensure it is added to your system's PATH.

## 🤖 Common AI Tasks

### 📝 Checking Grammar and Spelling

*   **Recommended Model:** Gemini 3.5 Flash (Low)
*   **Reasoning:** Simple, straightforward task that requires minimal reasoning and is very fast.

> 💡 **Example Prompt:** Check the grammar and spelling in the "Alchemy.md" page and fix any typos. Do not change the overall tone or structure of the document.

### 📊 Formatting Text and Tables

*   **Recommended Model:** Gemini 3.5 Flash (Low)
*   **Reasoning:** Formatting existing data into tables or lists is a quick, bulk operation that doesn't need deep reasoning.

> 💡 **Example Prompt:** Format the monster stats list in "Monsters.md" into a Markdown table with columns for Name, Base Level, Health, and Armor Class.

### 🔍 Researching and Creating a New Page

*   **Recommended Model:**
    * Gemini 3.5 Flash (Medium) if WebP conversion is required
    * Gemini 3.1 Pro (High) otherwise
*   **Reasoning:** Complex task requiring searching code, synthesizing information from multiple repositories, and generating new formatted content. May require WebP conversion.

> 💡 **Example Prompt:** Research the 'Archon' monster in the GnollHack codebase. Create a new wiki page for it under `/Monsters/`, following the wiki conventions. Find its image in the GnollHackTileSet repository, ensure it is in WebP format, and embed it correctly.

### ⚖️ Verifying Wiki Information Against Codebase

*   **Recommended Model:** Gemini 3.1 Pro (High)
*   **Reasoning:** Requires comparing human-written text with C source code data structures and resolving any discrepancies.

> 💡 **Example Prompt:** Verify the damage stats of the "Vorpal Blade" in "Artifacts.md" against the C source code in the GnollHack repository. If there are any discrepancies, update the wiki page to match the code.
