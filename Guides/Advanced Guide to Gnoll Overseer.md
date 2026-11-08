![Gnoll Overseer](/uploads/Guides/Introduction%20to%20Gnoll%20Overseer/gnoll-overseer-avatar-frame-256x256-q85.webp)

> 👉 **The Gnoll Overseer looks up game data, source code, and the wikis with tools on its server, and reads your live game and past records with tools on your device.**

## ⚔️ Real-Time Tactical Advice

When you open the Overseer from a game with **Send Game Context** on, it receives a snapshot of your character's stats, your inventory, the surrounding dungeon map, and recent game messages. This setting and the other basics are in the [[/Guides/Introduction to Gnoll Overseer]].

If you are cornered by dangerous monsters and low on health, ask the Overseer what your options are. It can check your inventory for escape items, such as a [[/Items/wand of teleportation]] or a [[/Items/scroll of earth]], and suggest the safest course of action.

## 📖 Deep Game Knowledge on Demand

GnollHack has hundreds of monsters, items, artifacts, and hidden mechanics, and the Overseer can look up the exact details of any of them whenever you need them.

- Before you engage a monster, ask for its resistances, attack types, and speed to decide whether to fight or flee.
- For a mechanic you don't understand, like spellcasting success rates, armor class calculations, or prayer timeouts, the Overseer can lay out the exact rules.
- It also gives strategic advice: which skills to train, which weapons suit your role, or what to prepare before entering difficult areas like Gehennom.

## 🧰 The Overseer's Toolkit

### 🌐 Game Knowledge and Reference (Server-Side)

These tools run on the Overseer server, whether you chat from the game or on the web:

| Feature | What It Does |
|---|---|
| **Monster Stats** | Looks up exact stats, resistances, and attacks for any monster. |
| **Item Stats** | Checks the weight, damage, material, and effects of items. |
| **Artifact Stats** | Retrieves the special powers, alignments, and bonuses of artifacts. |
| **Wiki Lookups** | Finds wiki articles about monsters and items by keyword. |
| **Game Engine Inspection** | Reads the GnollHack and NetHack source code to settle complex mechanics questions. |
| **GnollHack Wiki** | Searches and reads articles on the GnollHack Wiki. |
| **NetHack Wiki** | Searches the NetHack Wiki for classic mechanics and lore. |
| **Knowledge Base** | Reads curated articles about the GnollHack app, such as navigation, settings, and troubleshooting. |
| **Development Tracking** | Checks the GitHub repositories for recent updates and bug fixes. |
| **Community Dumplogs** | Searches the recent dumplogs of all players on the server. |
| **Web Search** | Searches the web with the AI provider's own search. |
| **Specialist Helpers** | Hands a large research task to a sub-agent: the Wiki Researcher, the Source Investigator, or the Game Data Analyst. Off by default; turn on **Enable Subagent Use** in the web settings. |

> ℹ️ **Note:** These tools follow the switches under **Settings → AI Permissions** on the web. In Confidential and Incognito chats, the GitHub tools and web search are always off. See [[/Guides/Chat Confidentiality Modes in Gnoll Overseer]].

### 📱 Live Game Integration (Client-Side)

These tools read data from your device, so they work only in a chat opened from the GnollHack app, never in a plain web browser. Refreshing the snapshot and reading the message history need a running game; the other tools also work in a chat opened from the About page.

| Feature | What It Does |
|---|---|
| **Live Game Snapshot** | Takes a fresh look at your current health, stats, inventory, and dungeon map. |
| **Message History** | Reads your game's full message history to see exactly what just happened. |
| **Player Library** | Reads the manuals and lore books stored on the device. |
| **Oracle Consultations** | Reads the major Oracle consultations stored on the device. |
| **Score Log** | Looks at your past games: role, race, score, and how each game ended. |
| **Local Dumplogs** | Analyzes the detailed final records of your past characters to help you learn from your deaths. |
| **Performance Reports** | Reads the app's performance reports to help with slowdowns. |
| **Diagnostic Tools** | Reviews crash logs, save file information, and app logs to help troubleshoot technical issues. |

Both **Client Data Access** in the game's [[Settings|/Settings#gnoll-overseer-settings]] and **Enable Client Data Access** in the web settings must be on.

> ℹ️ **Note:** The **Game Actions** setting is for a future feature. The Overseer cannot perform game actions yet.

## 📈 Learning from Past Mistakes

The Overseer can read the records of your past games and help you understand what went wrong. In the app, it reads your own dumplogs directly from the device. On the web, attach the dumplog file (`.txt` or `.html`) to your message.

Based on your past games, it can also suggest changes to your playstyle, such as being more careful with encumbrance, managing your health better, or using your role's abilities more effectively. For example, you can ask:

- "Why did my last character die?"
- "Look at my last three dumplogs. What mistakes do I keep making?"
- "Compare my best and worst games as a Valkyrie."

## 🤫 Managing Spoilers While Learning

Part of learning GnollHack is discovering things on your own, so the Overseer follows a spoiler policy and does not ruin surprises unless you want it to.

| Policy Level | Information Scope | Overseer Behavior |
|---|---|---|
| **Always Safe** | Core mechanics, damage formulas, AC calculation, encumbrance, skill training, status effects, controls | Freely explained at all times. |
| **Conditional** | Specific item identities, monster abilities, artifact powers, and Elbereth | Revealed only if the Overseer verifies that you have already encountered or learned them. |
| **Always a Spoiler** | Future dungeon branches, hidden levels, unencountered bosses, quest objectives, puzzle solutions, wish lists, endgame content, and optimal meta-strategies | Withheld unless spoilers are allowed. |

> 📢 **Important:** Asking is not permission. Even if you ask for a spoiler directly, the Overseer keeps it hidden until you allow spoilers in the settings.

Spoilers are controlled in two places:

- **In the game:** **Allow Spoilers** in the game's [[Settings|/Settings#gnoll-overseer-settings]], off by default.
- **On the web:** **Spoiler-Free Mode** in the web settings, on by default.

For chats opened from the game, the in-game setting wins. The chat shows a **No spoilers** or **Spoilers** badge, so you can always see which applies. Keep spoilers off if you are new and want to find things out yourself, and turn them on if you want to study the game's mechanics in depth.

## ⚙️ Tailoring the Experience

- **Verbose Responses:** Turn this in-game setting on if you prefer detailed explanations of game mechanics, or leave it off for short, tactical answers. It exists in the game only.
- **Pinning:** Use the pin icon to keep a chat at the top of your chat list and protect it from automatic deletion. This is useful for long-term strategies, checklists, and explanations you want to refer back to.
- **Your Own API Key:** If you hit the usage limits of the system models or want a different model, add your own key on the **API Keys** page, then select **Models → Add Model**. Anthropic, Google, and OpenAI are supported. You then pay your provider for what you use, and the provider's own limits apply. See [[/Guides/Choosing AI Model for Gnoll Overseer]].

> ℹ️ **Note:** You can have up to 50 active chats, and up to 5 of them can be pinned. An unpinned chat with no activity for 90 days moves to the Trash, and the Trash keeps deleted chats for 30 days.

## 💬 Chat Features

| Feature | What It Does |
|---|---|
| **Attachments** | Attach up to 5 files per message, up to 15 MB each: images, PDF, Word, Excel, CSV, text, HTML, and log files. Every file is scanned for malware. |
| **Attach Game Snapshot** | Adds a snapshot of your current game to the chat, in the GnollHack app. |
| **Search Chats** | Finds chats by their title and messages. |
| **Trash** | Restores a deleted chat within 30 days. |
| **Rename** | Gives a chat a title of your own. |
| **Model Picker** | Switches the AI model for the next message. |
| **Show Thinking and Tool Use** | Chooses how much of the model's thinking and tool use you see: Minimal, Blocks, Text, or Blocks and text. Set it under **Settings → General**. |
| **Copy** | Copies a message to the clipboard. |
| **Report Message** | Sends an AI answer, with the conversation up to it, to the developers for review. Not available in Confidential and Incognito chats. |
| **Cost and Context Window** | Shows what the chat has cost and how full the model's context window is. Both can be turned on or off under **Settings → General**. |
| **Release Notes** | Lists what changed in each Overseer version, under **Settings → Version**. |

## ⚙️ Web Settings at a Glance

| Section | What You Can Set |
|---|---|
| **General** | Spoiler-Free Mode, source code references in answers, the context window and chat cost displays, and Show Thinking and Tool Use. |
| **AI Permissions** | Which tools the Overseer may use: web search, server tools, sub-agents, client data access, and game actions. |
| **AI Performance** | How many tool calls are allowed per answer and per chat, how many run in parallel, and how long a tool result may be. |
| **Confidentiality Mode** | The default privacy mode and the rules for confidential chats. |
| **System Model Confidentiality** | Which system models may answer in confidential chats. |
| **Outbound Masking** | Replacing recognizable secrets with placeholders before a message leaves the server. |
| **Chat Data** | Moving all chats to the Trash, unpinning all chats, and managing the Trash. |
| **Version** | The Overseer version and its release notes. |

## 📖 Learn More

- [[/Gnoll Overseer]]
- [[/Guides/Technological Overview of Gnoll Overseer]]
- [[/Settings]]
