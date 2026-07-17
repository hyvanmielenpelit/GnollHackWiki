![google-antigravity](/uploads/Creating%20Wiki%20Pages%20with%20AI%20Agent/google-antigravity-256.webp)

You can leverage the **[Antigravity App](https://antigravity.google/product/antigravity-2)** powered by Gemini models to automatically research, draft, and format wiki pages. By providing the AI agent access to all related repositories, it can cross-reference code, graphics, and audio to create accurate and comprehensive documentation.

> ℹ️ **Note:** You may need a paid **Google One AI subscription** to use recommended AI agents. You can subscribe via the [Google One AI plan subscription page](https://one.google.com/about/google-ai-plans/).
> - The recommended AI agent for most tasks is *Gemini 3.5 Flash (Medium)*. The recommended plan for light usage is **$23 Google AI Pro** plan.
> - The recommended AI agent for difficult tasks is *Claude Opus 4.6 (Thinking)*, which requires the **$100 Google AI Ultra** plan. It gives you only 2–3 usages per week for hard tasks, but wiki editing doesn't usually require the use of such a heavy AI agent — so, this is usually enough.

## 📂 Local Repository Setup

Ensure you have the following repositories cloned locally on your computer:
- [`GnollHackWiki`](https://github.com/hyvanmielenpelit/GnollHackWiki) (The wiki content file repository, for creating and editing pages)
- [`GnollHack`](https://github.com/hyvanmielenpelit/GnollHack) (For researching game mechanics, stats, and source code)
- [`GnollHackTileSet`](https://github.com/hyvanmielenpelit/GnollHackTileSet) (For finding sprite assets)

## ⚙️ Antigravity Workspace Configuration

1. Open the **[Antigravity App](https://antigravity.google/product/antigravity-2)**.
2. Ensure that your workspace is configured so the agent can access all four repository folders (`GnollHackWiki`, `GnollHack`, and `GnollHackTileSet`). This allows the agent to read and search across the entire project ecosystem.
3. The agent will automatically discover the AI skills in the repository.

## 🧠 Model Selection and Reasoning Levels

The Antigravity App allows you to select between different models and reasoning levels. You should choose the appropriate combination based on the complexity of the wiki page you are creating:

### 🏆 Gemini 3.5 Flash (Medium)

**This is the recommended model for most tasks.** It is highly effective for standard wiki tasks. It can also do image conversion to WebP. 

### 🛠️ Gemini 3.1 Pro (High)

**This is the recommended model for synthesizing information and reviewing implementation plans and implementation results.** It is also excellent for **single questions outside agentic workflows**.

### Claude Opus 4.6 (Thinking)

**This is the recommended model for difficult tasks**, such as verifying complex information on the wiki against GnollHack codebase, which requires advanced reasoning and checking vast amounts of code. It is available only in *Google AI Ultra plans*. It consumes a huge amount of usage quota per use, which usually means that you can't utilize it very often per week, unless you buy AI credits or upgrade to the most expensive Google AI Ultra plan.

## 🤖 Common AI Tasks

### 📝 Checking Grammar and Spelling

-   **Recommended Model:** Gemini 3.5 Flash (Medium)

> 💡 **Example Prompt:** Check the grammar and spelling in the "Alchemy.md" page and fix any typos. Do not change the overall tone or structure of the document.

### 📊 Formatting Text and Tables

-   **Recommended Model:** Gemini 3.5 Flash (Medium)

> 💡 **Example Prompt:** Format the monster stats list in "Monsters.md" into a Markdown table with columns for Name, Base Level, Health, and Armor Class.

### 🔍 Researching and Creating a New Page

-   **Recommended Model:** Gemini 3.5 Flash (Medium)

> 💡 **Example Prompt:** Research the 'Archon' monster in the GnollHack codebase. Create a new wiki page for it under `/Monsters/`, following the wiki conventions. Find its image in the GnollHackTileSet repository, ensure it is in WebP format, and embed it correctly.

### ⚖️ Verifying Wiki Information Against Codebase

-   **Recommended Model** 
    - *Gemini 3.5 Flash (Medium):* Easy tasks
    - *Gemini 3.1 Pro (High):* A bit harder tasks
    - *Claude Opus 4.6 (Thinking):* Hard tasks

> 💡 **Example Prompt:** Verify the damage stats of the "Vorpal Blade" in "Artifacts.md" against the C source code in the GnollHack repository. If there are any discrepancies, update the wiki page to match the code.
