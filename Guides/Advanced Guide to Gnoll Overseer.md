![Gnoll Overseer](/uploads/Guides/Introduction%20to%20Gnoll%20Overseer/gnoll-overseer-avatar-frame-256x256-q85.webp)

> 👉 **Unlock the full potential of Gnoll Overseer to speed up your learning and master the deep mechanics of GnollHack.**

## 🏆 Overview

While the [[/Guides/Introduction to Gnoll Overseer]] covers the basics, this guide dives into how the AI assistant can help you become a better player. GnollHack is a game of discovery, survival, and complex interactions. The Overseer acts as a seasoned veteran sitting next to you, ready to offer advice, explain mechanics, and help you analyze your past games.

## ⚔️ Real-Time Tactical Advice

One of the most powerful ways the Overseer helps you learn is by understanding your current game situation. When you open the Overseer from within a game, it receives a snapshot of your character's stats, your inventory, the surrounding dungeon map, and recent game messages (if **Send Game Context** is on).

You can use this to your advantage in several ways. For example, if you are cornered by dangerous monsters and low on health, ask the Overseer what your best options are. It can check your inventory for escape items (like a [[/Items/wand of teleportation]] or a [[/Items/scroll of earth]]) and suggest the safest course of action.

## 📖 Deep Game Knowledge on Demand

GnollHack has hundreds of monsters, items, artifacts, and hidden mechanics. Memorizing all of them takes time. The Overseer can provide exact details whenever you need them, acting as an interactive encyclopedia.

- **Monster and Item Stats:** Ask about specific enemies before engaging them in combat. The Overseer can tell you their resistances, attack types, and speed, helping you decide whether to fight or flee.
- **Complex Mechanics:** If you don't understand how a game mechanic works (like spellcasting success rates, armor class calculations, or prayer timeouts), the Overseer can break down the exact rules for you.
- **Strategic Advice:** Ask which skills to train, which weapons suit your role, or what to prepare before entering difficult areas like Gehennom.

## 🧰 The Overseer's Toolkit

Behind the scenes, the Overseer uses specialized tools to answer your questions and understand your game.

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

Every death in GnollHack is a learning opportunity. The Overseer can read your past game records and help you understand what went wrong.

- **In the app:** The Overseer reads your own dumplogs directly from the device.
- **On the web:** Attach the dumplog file (`.txt` or `.html`) to your message.
- **Strategic Adjustments:** Based on your past games, the Overseer can suggest changes to your playstyle, such as being more careful with encumbrance, managing your health better, or using your role's abilities more effectively.

> 💡 **Example:** "Why did my last character die?" — "Look at my last three dumplogs. What mistakes do I keep making?" — "Compare my best and worst games as a Valkyrie."

## 🤫 Managing Spoilers While Learning

A significant part of learning GnollHack is discovering things on your own. The Overseer follows a spoiler policy so that it does not ruin surprises unless you want it to.

| Policy Level | Information Scope | Overseer Behavior |
|---|---|---|
| **Always Safe** | Core mechanics, damage formulas, AC calculation, encumbrance, skill training, status effects, controls | Freely explained at all times. |
| **Conditional** | Specific item identities, monster abilities, artifact powers, and Elbereth | Revealed only if the Overseer verifies that you have already encountered or learned them. |
| **Always a Spoiler** | Future dungeon branches, hidden levels, unencountered bosses, quest objectives, puzzle solutions, wish lists, endgame content, and optimal meta-strategies | Withheld unless spoilers are allowed. |

> 📢 **Important:** Asking is not permission. Even if you ask for a spoiler directly, the Overseer keeps it hidden until you allow spoilers in the settings.

Spoilers are controlled in two places:

- **In the game:** **Allow Spoilers** in the game's [[Settings|/Settings#gnoll-overseer-settings]], off by default.
- **On the web:** **Spoiler-Free Mode** in the web settings, on by default.

For chats opened from the game, the in-game setting wins. The chat shows a **No spoilers** or **Spoilers** badge, so you can always see which applies. Keeping spoilers off is recommended for new players who want to experience the joy of discovery, while turning them on helps players who want to study the game's mechanics in depth.

## ⚙️ Tailoring the Experience

You can customize the Overseer to suit your learning style:

- **Verbose Responses:** Turn this in-game setting on if you prefer comprehensive explanations of game mechanics, or leave it off for concise, tactical answers. It exists in the game only.
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

- [[/Gnoll Overseer]] — All Gnoll Overseer guides in one place.
- [[/Guides/Introduction to Gnoll Overseer]] — What the Gnoll Overseer is and how to access it.
- [[/Guides/Choosing AI Model for Gnoll Overseer]] — How to choose the right AI model.
- [[/Guides/Chat Confidentiality Modes in Gnoll Overseer]] — Standard, Confidential, and Incognito chats.
- [[/Guides/Technological Overview of Gnoll Overseer]] — The architecture behind the Overseer, for developers.
- [[/Settings]] — All in-game settings, including the Gnoll Overseer section.
