![Gnoll Overseer](/uploads/Guides/Introduction%20to%20Gnoll%20Overseer/gnoll-overseer-avatar-frame-256x256-q85.webp)

> 👉 **The Gnoll Overseer is a free, optional AI advisor for GnollHack that you can open from the game menu, the About page, or the web.**

## ✨ What Can the Gnoll Overseer Do?

You can ask it about monsters, items, spells, artifacts, dungeon branches, or how a mechanic works. To answer, the Overseer queries the GnollHack and NetHack source code, looks up the game's exact data definitions, and searches both the GnollHack Wiki and the NetHack Wiki.

When you open it during a game, it reads a snapshot of your character's stats, inventory, the surrounding dungeon map, and recent messages, and bases its advice on what is happening in your game.

It can also:

- Read your dumplogs and explain what went wrong.
- Help with save files, crashes, and settings in the app.
- Read screenshots, dumplogs, and documents that you attach to a message.

## 🆚 How It Differs From Generic AI Chatbots

The Overseer runs on frontier AI models, but unlike a general chatbot it can see your game and look things up in GnollHack's own data:

| Capability | Generic AI Chatbots | Gnoll Overseer |
|---|---|---|
| **Live Game Context** | ❌ None (you must describe the situation yourself) | ✅ A snapshot of your character's stats, inventory, dungeon map, and recent messages |
| **Knowledge Source** | 🟡 General web training data, which can be wrong about GnollHack | ✅ The GnollHack Wiki, the NetHack Wiki, and the game's own data and source code |
| **Spoilers** | ❌ No spoiler control | ✅ Configurable spoiler protection that respects what you have discovered |

## 🏁 How to Access It

| Access Method | What the Overseer Knows | Best For |
|---|---|---|
| **In-Game Menu** | ✅ A snapshot of your current game, if **Send Game Context** is on | Real-time tactical advice and survival decisions during a game |
| **About Menu** | 🟡 No game snapshot; with **Client Data Access** on, it can read your dumplogs, score log, and app logs on the device | App problems, save files, and troubleshooting, plus general game questions |
| **Web Interface** | 🟡 No game snapshot | General gameplay advice |

> ⚠️ **Warning:** Opening the Overseer from a game sends your game snapshot to the Overseer right away, before you type anything. Turn **Send Game Context** off if you do not want that.

## 📋 What You Need

- A [[/GnollHack Account]], entered in the game under [[Settings → Server Posting|/Settings#server-posting-settings]].
- An internet connection.
- Accepting the AI Data Disclosure the first time you open the Overseer.

## 🆓 Free and Opt-In

The Overseer is **free** and **opt-in**. It waits in the menu and never interrupts your game unless you open it, so you can play without it entirely.

The system models cost nothing, but they can have usage limits. If you use your own API key instead, you pay your AI provider for what you use; [[/Guides/Choosing AI Model for Gnoll Overseer]] shows how to add one.

## ⚙️ In-Game Settings

These settings are in the Gnoll Overseer section of the game's [[Settings|/Settings#gnoll-overseer-settings]]:

| Setting | Description | Default |
|---|---|---|
| **Allow Spoilers** | Whether the Overseer may discuss detailed mechanics, monsters you have not met, and other hidden information. Leave it off to discover things on your own. | ❌ Off |
| **Verbose Responses** | Switches between detailed explanations and short tactical answers. | ❌ Off |
| **Send Game Context** | Whether a snapshot of your game (stats, inventory, map, recent messages) is sent when you open the Overseer during play. | ✅ On |
| **Client Data Access** | Whether the Overseer may read more data from the device, such as the full message history, your dumplogs, and app logs. | ✅ On |

> ℹ️ **Note:** The website has its own **Spoiler-Free Mode**, which is on by default. For chats opened from the game, the in-game **Allow Spoilers** setting wins.

The website's other settings, the Overseer's tools, and its spoiler policy are covered in the [[/Guides/Advanced Guide to Gnoll Overseer]].

## 📖 Learn More

- [[/Gnoll Overseer]]
- [[/Guides/Chat Confidentiality Modes in Gnoll Overseer]]
