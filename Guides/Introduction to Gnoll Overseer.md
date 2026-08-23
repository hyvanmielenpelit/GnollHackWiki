![Gnoll Overseer](/uploads/Guides/Introduction%20to%20Gnoll%20Overseer/gnoll-overseer-avatar-frame-256x256-q85.webp)

> 👉 **Gnoll Overseer is an AI-powered game assistant accessible via the game menu, the About page, or on the web. It provides grounded gameplay advice, inspects game mechanics and source code, and helps players navigate both GnollHack and classic NetHack.**

## ✨ What Can Gnoll Overseer Do?

- **Answer questions with source-grounded precision**: Ask about monsters, items, spells, artifacts, dungeon branches, or complex mechanics. The Overseer directly queries the live GnollHack and NetHack C codebases, inspects exact data definitions, and searches both the GnollHack Wiki and the NetHack Wiki.
- **Understand your current game situation**: When opened during a game, the Overseer inspects a live snapshot of your character's stats, inventory, surrounding dungeon map, and recent message log to deliver tailored advice for your current tactical situation.
- **Manage and organize conversations**: Search through past chats in the sidebar, pin important discussions to keep them anchored at the top, and easily restore deleted conversations from the built-in Trash bin.
- **Transparent AI reasoning and performance**: Observe the Overseer's thinking process in real time with animated status reactions, collapsible reasoning sections, reasoning mode badges, and response performance metrics (Time to First Token and total response duration).
- **Stay updated with the in-app Changelog**: Browse recent updates and new features directly inside the Overseer interface, with notification badges alerting you when important updates are released.

## 🆚 How It Differs From Generic AI Chatbots

Although Gnoll Overseer connects to state-of-the-art AI models, it is a purpose-built assistant deeply integrated into the game engine:

| Capability / Dimension | Generic AI Chatbots | Gnoll Overseer |
|---|---|---|
| **Live Game Context** | ❌ None (Player must describe the situation manually) | ✅ Automated live snapshot of character stats, inventory, dungeon map, and recent messages |
| **Knowledge Accuracy** | 🟡 General web training data prone to hallucinations | ✅ Grounded in C engine struct definitions, exact formulas, and dual wikis |
| **Source Code Inspection** | ❌ Generic code samples from the internet | ✅ Direct Lucene search and file viewing across both GnollHack and NetHack C codebases |
| **Discovery & Spoilers** | ❌ Uncontrolled spoilers and inaccurate secrets | ✅ Configurable spoiler protection respecting discovered content and player preferences |
| **Native Device Integration** | ❌ Isolated web browser session | ✅ Bidirectional native bridge querying local logs, dumplogs, and save metadata |

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
| **Client Data Access** | Grants permission for the Overseer to query your device for local logs, save info, and game records when diagnosing issues. | 🟡 Prompt |

## 💡 Learn More

- [[/Guides/Advanced Guide to Gnoll Overseer]] — Deep dive into the 18 server-side tools, 10 client tools, multi-provider model selection, BYOK keys, and web interface settings.
- [[/Guides/Technological Overview of Gnoll Overseer]] — Technical architecture of the .NET 10.0 backend, Angular 22 SPA, SignalR streaming, and data retention lifecycle.
- [[/Overseer AI Providers]] — Overview of supported AI providers and model families.
