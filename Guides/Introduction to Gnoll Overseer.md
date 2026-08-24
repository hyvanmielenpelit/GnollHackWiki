![Gnoll Overseer](/uploads/Guides/Introduction%20to%20Gnoll%20Overseer/gnoll-overseer-avatar-frame-256x256-q85.webp)

> 👉 **Gnoll Overseer is an AI-powered game assistant accessible via the game menu, the About page, or on the web. It provides grounded gameplay advice, inspects game mechanics and source code, and helps players navigate both GnollHack and classic NetHack.**

## ✨ What Can Gnoll Overseer Do?

- **Answer questions with source-grounded precision**: Ask about monsters, items, spells, artifacts, dungeon branches, or complex mechanics. The Overseer directly queries the live GnollHack and NetHack C codebases, inspects exact data definitions, and searches both the GnollHack Wiki and the NetHack Wiki.
- **Understand your current game situation**: When opened during a game, the Overseer inspects a live snapshot of your character's stats, inventory, surrounding dungeon map, and recent message log to deliver tailored advice for your current tactical situation.

## 🆚 How It Differs From Generic AI Chatbots

Although Gnoll Overseer connects to state-of-the-art AI models, it is a purpose-built assistant deeply integrated into the game engine:

| Capability / Dimension | Generic AI Chatbots | Gnoll Overseer |
|---|---|---|
| **Live Game Context** | ❌ None (Player must describe the situation manually) | ✅ Automated live snapshot of character stats, inventory, dungeon map, and recent messages |
| **Knowledge Accuracy** | 🟡 General web training data prone to hallucinations | ✅ Grounded in the game's actual data and official wikis |
| **Discovery & Spoilers** | ❌ Uncontrolled spoilers and inaccurate secrets | ✅ Configurable spoiler protection respecting discovered content and player preferences |

## 🏁 How to Access It

There are three ways to use Gnoll Overseer:

| Access Method | Context Availability | Best For |
|---|---|---|
| **In-Game Menu** | ✅ Full live game snapshot, inventory, map, and messages | Real-time tactical advice, item identification, and survival decisions during a run |
| **About Menu** | 🟡 General game knowledge and mechanics | Asking questions between games and browsing strategies from the title screen |
| **Web Interface** | 🟡 Web and account conversation history | Managing past chats on any device, configuring custom BYOK keys, and reading guides at [overseer.gnollhack.com](https://overseer.gnollhack.com) |

## 🆓 Free and Opt-In

The Overseer is **completely free** and **100% opt-in**. It sits quietly in the menu and will never interrupt your gameplay unless you choose to open it. If you prefer the classic, unaided roguelike experience, you never have to touch it.

## ⚙️ In-Game Settings

You can customize the Overseer's core in-game behavior in GnollHack's Settings menu:

| Setting | Description | Default State |
|---|---|---|
| **Allow Spoilers** | Controls whether the Overseer can discuss detailed mechanics, unencountered monsters, and hidden information. Turn this off to discover things on your own. | ❌ Off |
| **Verbose Responses** | Toggles between comprehensive explanations and concise tactical answers. | ❌ Off |
| **Send Game Context** | Controls whether your current game snapshot (stats, inventory, map) is sent to the Overseer when opened during gameplay. | ✅ On |

## 💡 Learn More

- [[/Guides/Advanced Guide to Gnoll Overseer]] — Deep dive into advanced settings, custom API keys, and the web interface.
- [[/Guides/Technological Overview of Gnoll Overseer]] — Technical architecture of the Overseer service.
- [[/Overseer AI Providers]] — Overview of supported AI providers and model families.
