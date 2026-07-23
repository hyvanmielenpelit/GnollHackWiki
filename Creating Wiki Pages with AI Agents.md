![google-antigravity](/uploads/Creating%20Wiki%20Pages%20with%20AI%20Agent/google-antigravity-256.webp)

> 👉 **You can leverage the [Antigravity Standalone App](https://antigravity.google/product/antigravity-2) powered by Gemini and Claude AI models to automatically research, draft, and format wiki pages. By providing the AI agent with access to all related repositories, it can cross-reference code and graphics to create accurate and comprehensive documentation.**

> ℹ️ **Note:** You may need a paid **Google One AI subscription** to use the recommended AI agents. You can subscribe via the [Google One AI plan subscription page](https://one.google.com/about/google-ai-plans/).
>
> - The recommended AI model for easy tasks is *Gemini 3.5 Flash (Medium)*.
> - The recommended AI model for moderately difficult tasks is *Gemini 3.1 Pro (High)*. It requires at least the **$23 Google AI Pro** plan.
> - The recommended AI model for difficult tasks is *Claude Opus 4.6 (Thinking)*. It requires at least the **$100 Google AI Ultra** plan.

## 📂 Local Repository Setup

Ensure you have the following repositories cloned locally on your computer:
- [`GnollHackWiki`](https://github.com/hyvanmielenpelit/GnollHackWiki) (The wiki repository for creating and editing pages)
- [`GnollHack`](https://github.com/hyvanmielenpelit/GnollHack) (The game repository for researching mechanics, stats, and source code)
- [`GnollHackTileSet`](https://github.com/hyvanmielenpelit/GnollHackTileSet) (The tileset repository for finding sprite assets)

## ⚙️ Antigravity Workspace Configuration

1. Open the **[Antigravity Standalone App](https://antigravity.google/product/antigravity-2)**.
2. Create a new project and add all three repository folders (`GnollHackWiki`, `GnollHack`, and `GnollHackTileSet`) to it. This allows the agent to read and search across the entire project ecosystem. Name the project "GnollHackWiki".
3. The agent will automatically discover the AI skills in the included projects.

## 🧠 Model Selection

The Antigravity App allows you to select between different models and reasoning levels. The following are the recommended models and their reasoning levels for wiki editing:

- 🏆 **Gemini 3.5 Flash (Medium):** This is the recommended model for easy tasks. It can also convert images to WebP.
- 🛠️ **Gemini 3.1 Pro (High):** This is the recommended model for moderately difficult tasks. It is also excellent for answering separate questions outside of agentic workflows.
- 💭 **Claude Opus 4.6 (Thinking):** This is the recommended model for difficult tasks, such as verifying complex information on the wiki against the GnollHack codebase. It excels at advanced reasoning and inspecting vast amounts of code with great accuracy.

> ℹ️ **Note:** Claude Opus 4.6 consumes a large amount of usage quota per task, and therefore you may only be able to use it a few times a week with the *$100 AI Ultra Plan*. If you use it often, you need to purchase additional AI credits or upgrade to the highest-tier plan.

## 🤖 Common AI Tasks

### 📝 Checking Grammar and Spelling

- **Recommended Model:** Gemini 3.5 Flash (Medium)

> 💡 **Example Prompt:** Check the grammar and spelling in the "Alchemy.md" page and fix any typos. Do not change the overall tone or structure of the document.

### 📊 Formatting Text and Tables

- **Recommended Model:** Gemini 3.5 Flash (Medium)

> 💡 **Example Prompt:** Format the monster stats list in "Monsters.md" into a Markdown table with columns for Name, Base Level, Health, and Armor Class.

### 🔍 Researching and Creating a New Page

- **Recommended Model:** Gemini 3.1 Pro (High)

> 💡 **Example Prompt:** Research the 'Archon' monster in the GnollHack codebase. Create a new wiki page for it under `/Monsters/`, following the wiki conventions. Find its image in the GnollHackTileSet repository, ensure it is in WebP format, and embed it correctly.

### ⚖️ Verifying Wiki Information Against Codebase

- **Recommended Models:**
  - *Gemini 3.1 Pro (High):* Simple information
  - *Claude Opus 4.6 (Thinking):* Complex information

> 💡 **Example Prompt:** Verify the damage stats of the "Vorpal Blade" in "Artifacts.md" against the C source code in the GnollHack repository. If there are any discrepancies, update the wiki page to match the code.
