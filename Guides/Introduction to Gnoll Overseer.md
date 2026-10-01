![Gnoll Overseer](/uploads/Guides/Introduction%20to%20Gnoll%20Overseer/gnoll-overseer-avatar-frame-256x256-q85.webp)

> 👉 **Gnoll Overseer is a free, optional AI assistant for GnollHack. You can open it from the game menu, from the About page, or on the web. It gives grounded gameplay advice, inspects the game's mechanics and source code, and helps you with the app itself.**

## ✨ What Can Gnoll Overseer Do?

- **Answer questions with source-grounded precision**: Ask about monsters, items, spells, artifacts, dungeon branches, or complex mechanics. The Overseer queries the GnollHack and NetHack source code, inspects exact data definitions, and searches both the GnollHack Wiki and the NetHack Wiki.
- **Understand your current game situation**: When opened during a game, the Overseer reads a snapshot of your character's stats, inventory, surrounding dungeon map, and recent messages, and tailors its advice to your situation.
- **Help you learn from past games**: It can read your dumplogs and explain what went wrong.
- **Troubleshoot the app**: It can help with save files, crashes, and settings.
- **Read attachments**: You can attach screenshots, dumplogs, and documents to a message.

## 🆚 How It Differs From Generic AI Chatbots

Although Gnoll Overseer connects to state-of-the-art AI models, it is a purpose-built assistant integrated into the game:

| Capability | Generic AI Chatbots | Gnoll Overseer |
|---|---|---|
| **Live Game Context** | ❌ None (you must describe the situation yourself) | ✅ A snapshot of your character's stats, inventory, dungeon map, and recent messages |
| **Knowledge Accuracy** | 🟡 General web training data, prone to hallucinations | ✅ Grounded in the GnollHack Wiki, the NetHack Wiki, and the game's own data and source code |
| **Discovery & Spoilers** | ❌ Uncontrolled spoilers and inaccurate secrets | ✅ Configurable spoiler protection that respects what you have discovered |

## 🏁 How to Access It

There are three ways to open Gnoll Overseer:

| Access Method | What the Overseer Knows | Best For |
|---|---|---|
| **In-Game Menu** | ✅ A snapshot of your current game, if **Send Game Context** is on | Real-time tactical advice, item identification, and survival decisions during a game |
| **About Menu** | 🟡 No game snapshot; with **Client Data Access** on, it can read your dumplogs, score log, and app logs on the device | App problems, save files, and troubleshooting, plus general game questions |
| **Web Interface** | 🟡 No game snapshot | Your chat history on any device, your own API keys and models, and the web settings at [overseer.gnollhack.com](https://overseer.gnollhack.com) |

- **From the in-game menu**, the chat is titled "GnollHack Gameplay" followed by your character's name, and the Overseer greets you without your typing anything.
- **From the About page**, the chat opens in technical-support mode and is titled "GnollHack Assistance".
- **On the web**, you sign in with the same account as in the game. The Overseer window in the game is the same app, so your chats appear in both places.

## 📋 What You Need

- A [[/GnollHack Account]], entered in the game under [[Settings → Server Posting|/Settings#server-posting-settings]].
- An internet connection.
- Accepting the AI Data Disclosure the first time you open the Overseer.

## 🆓 Free and Opt-In

The Overseer is **free** and **opt-in**. It sits quietly in the menu and never interrupts your game unless you open it. If you prefer the classic, unaided roguelike experience, you never have to touch it.

- **System models are free**, but they can have usage limits.
- **With your own API key**, you pay your AI provider for what you use. See [[/Guides/Choosing AI Model for Gnoll Overseer]].

> ⚠️ **Warning:** Opening the Overseer from a game sends your game snapshot to the Overseer right away, before you type anything. Turn **Send Game Context** off if you do not want that.

## ⚙️ In-Game Settings

You can customize the Overseer's behavior in the Gnoll Overseer section of the game's [[Settings|/Settings#gnoll-overseer-settings]]:

| Setting | Description | Default |
|---|---|---|
| **Allow Spoilers** | Whether the Overseer may discuss detailed mechanics, monsters you have not met, and other hidden information. Leave it off to discover things on your own. | ❌ Off |
| **Verbose Responses** | Switches between comprehensive explanations and concise tactical answers. | ❌ Off |
| **Send Game Context** | Whether a snapshot of your game (stats, inventory, map, recent messages) is sent when you open the Overseer during play. | ✅ On |
| **Client Data Access** | Whether the Overseer may read more data from the device, such as the full message history, your dumplogs, and app logs. | ✅ On |
| **Game Actions** | Whether the Overseer may perform game actions for you. Not available yet. | ❌ Off |

**Data Consent** shows whether you have accepted the AI Data Disclosure. Press **Revoke** to withdraw your consent; the disclosure appears again the next time you open the Overseer. In the game, tapping or clicking a setting's name opens a popup describing it.

> ℹ️ **Note:** The web site has its own **Spoiler-Free Mode**, which is on by default. For chats opened from the game, the in-game **Allow Spoilers** setting wins.

## 📖 Learn More

- [[/Gnoll Overseer]] — All Gnoll Overseer guides in one place.
- [[/Guides/Choosing AI Model for Gnoll Overseer]] — How to choose the right AI model.
- [[/Guides/Chat Confidentiality Modes in Gnoll Overseer]] — Standard, Confidential, and Incognito chats.
- [[/Guides/Advanced Guide to Gnoll Overseer]] — The tools, spoiler policy, chat features, and web settings in depth.
