![google-antigravity](/uploads/Creating%20Wiki%20Pages%20with%20AI%20Agents/google-antigravity-256.webp)

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
2. Create a new project and add all three repository folders (`GnollHackWiki`, `GnollHack`, and `GnollHackTileSet`) to it. This allows the agents to read and search across the entire project ecosystem. Name the project **GnollHackWiki**.

## ⌨️ Visual Studio Code Keyboard Shortcuts

For additional speed in wiki editing, it is useful to add a few keyboard shortcuts to Visual Studio Code. They will copy your current editing position in Visual Studio Code to the clipboard, which you can then quickly paste to the Antigravity Standalone App.

### 1. Copy All Current File Info to Clipboard

The first keyboard shortcut copies the **current repository name, relative file path, and line number**. 

> **Example Output:** In the GnollHackWiki repository, in the Items/Long sword.md file at line 5

### 2. Copy Current Relative File Path to Clipboard

The second keyboard shortcut copies only the **relative path of the current file**. 

> **Example Output:** Items/Long sword.md

### 🛠️ Step 1: Create the Custom Tasks

1. Open the Command Palette in VS Code (`Ctrl+Shift+P`).
2. Search for and select **`Tasks: Open User Tasks`**.
3. Add the following task configuration into the `"tasks"` array of your `tasks.json` file:

```json
{
    "label": "Copy Formatted Path and Line",
    "type": "shell",
    "command": "Set-Clipboard -Value 'In the ${workspaceFolderBasename} repository, in the ${relativeFile} file at line ${lineNumber}'",
    "presentation": {
        "reveal": "never",
        "panel": "shared",
        "showReuseMessage": false,
        "clear": true
    },
    "problemMatcher": []
},
{
    "label": "Copy Relative Path",
    "type": "shell",
    "command": "Set-Clipboard -Value '${relativeFile}'",
    "presentation": {
        "reveal": "never",
        "panel": "shared",
        "showReuseMessage": false,
        "clear": true
    },
    "problemMatcher": []
}
```

### ⌨️ Step 2: Bind the Keyboard Shortcuts

Now, let's bind these tasks to the `Ctrl+K, A` and `Ctrl+K, B` key chords.

1. Open the Command Palette (`Ctrl+Shift+P`).
2. Search for and select **`Preferences: Open Keyboard Shortcuts (JSON)`**.
3. Add the following entry to the JSON array in your `keybindings.json` file:

```json
{
    "key": "ctrl+k a",
    "command": "workbench.action.tasks.runTask",
    "args": "Copy Formatted Path and Line"
},
{
    "key": "ctrl+k b",
    "command": "workbench.action.tasks.runTask",
    "args": "Copy Relative Path"
}
```

### 🚀 Usage

1. Open the `GnollHackWiki` repository folder in Visual Studio Code.
2. Open any Markdown file in the repository for editing.
3. Place your cursor on the line you want to reference.
4. Press **`Ctrl+K`**, release, and then press **`A`** or **`B`**.
5. The formatted string is now copied to your clipboard and ready to be pasted!

## 🧠 Model Selection

The Antigravity App allows you to select between different models and reasoning levels. The following are the recommended models and their reasoning levels for wiki editing:

- 🏆 **Gemini 3.5 Flash (Medium):** This is the recommended model for easy tasks. It can also convert images to WebP.
- 🛠️ **Gemini 3.1 Pro (High):** This is the recommended model for moderately difficult tasks. It is also excellent for answering separate questions outside of agentic workflows.
- 💭 **Claude Opus 4.6 (Thinking):** This is the recommended model for difficult tasks, such as verifying complex information on the wiki against the GnollHack codebase. It excels at advanced reasoning and inspecting vast amounts of code with great accuracy.

> ℹ️ **Note:** Claude Opus 4.6 consumes a large amount of usage quota per task, and therefore you may only be able to use it a few times a week with the *$100 AI Ultra Plan*. If you use it often, you need to purchase additional AI credits or upgrade to the highest-tier plan.

## 🤖 Common AI Tasks

### 📝 Checking Grammar and Spelling

- **Recommended Model:** Gemini 3.5 Flash (Medium)

> 💡 **Example Prompt:** In the GnollHackWiki repository, in the Alchemy.md file, check the grammar and spelling and fix any typos. Do not change the overall tone or structure.

### 📊 Formatting Text and Tables

- **Recommended Model:** Gemini 3.5 Flash (Medium)

> 💡 **Example Prompt:** In the GnollHackWiki repository, in the Attribute Scores.md file starting at line 3, format this list into a Markdown table with columns for Attribute, Primary Effect, and Secondary Effects.

### 🔍 Researching and Updating a Page

- **Recommended Model:** Gemini 3.1 Pro (High)

> 💡 **Example Prompt:** In the GnollHackWiki repository, in the Monsters/Archon.md file, research the Archon monster in the GnollHack codebase and update this page.

### ⚖️ Verifying Wiki Information Against Codebase

- **Recommended Models:**
  - *Gemini 3.1 Pro (High):* Simple information
  - *Claude Opus 4.6 (Thinking):* Complex information

> 💡 **Example Prompt:** In the GnollHackWiki repository, in the Artifacts/Vorpal Blade.md file, verify the stats of the Vorpal Blade against the C source code in the GnollHack repository.
