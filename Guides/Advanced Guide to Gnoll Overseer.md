![Gnoll Overseer](/uploads/Guides/Introduction%20to%20Gnoll%20Overseer/gnoll-overseer-avatar-frame-256x256-q85.webp)

> 👉 **Unlock the full potential of Gnoll Overseer with custom models, your own API keys, and advanced settings.**

## 🏆 Overview

The [[/Guides/Introduction to Gnoll Overseer]] covers the basics. This guide dives into the Overseer's advanced capabilities: the tools it uses behind the scenes, how to bring your own AI provider key, and the full range of settings available to power users.

## 🛠️ How the Overseer Finds Answers

Unlike a generic chatbot that might guess or hallucinate, the Overseer is equipped with a large set of specialized tools. When you ask a question, the AI actively looks up real game data before answering. These tools fall into two categories.

### Server-Side Tools

These tools run on the Overseer server and are always available:

- **Monster, Item, and Artifact Stats** — Retrieves exact stats, flags, and attack tuples directly from the GnollHack C source code.
- **Source Code Search and View** — Full-text search across all GnollHack `.c` and `.h` source files, with the ability to view specific functions and definitions.
- **Wiki Search** — Searches both the GnollHack Wiki and the community NetHack Wiki for broader context.
- **Knowledge Base** — Queries a curated collection of first-party reference articles about the game and the app.
- **GitHub Integration** — Fetches repository info, searches issues and pull requests, and browses code on GitHub.
- **Player Data** — Searches server-side dump logs to help diagnose past games.

### Client-Side Tools

When you open the Overseer from within a running game, additional tools become available that query your device directly:

- **Full Message History** — Retrieves your complete turn-by-turn game log.
- **Refresh Snapshot** — Takes a fresh snapshot of your current game state (map, inventory, stats).
- **Save File Info** — Inspects your save file headers.
- **Player Library and Oracle Consultations** — Reads discovered manuals and Oracle of Delphi consultations from your game.
- **Local Game Logs and Dump Logs** — Reads your local score records and past game summaries.
- **App and Panic Logs** — Retrieves diagnostic logs to help troubleshoot crashes.

> ℹ️ **Note:** Client-side tools can be individually toggled on or off in the game's settings under **Client Data Access**.

## 🧠 Multi-Provider AI Support

The Overseer supports three major AI providers:

| Provider | Example Models |
|---|---|
| **Google** | Gemini 3.6 Flash, Gemini 3.1 Pro |
| **Anthropic** | Claude Sonnet 5, Claude Opus 5 |
| **OpenAI** | GPT-5.6 Sol, GPT-5.6 Terra |

The default model is configured by the server administrators. Power users who bring their own key can choose any model from their provider.

## 🔑 Bring Your Own Key (BYOK)

The free Overseer service is subject to usage quotas to manage server costs. If you want unrestricted access, you can provide your own API key from any supported provider.

When using your own key:

- You bypass the default rate limits entirely.
- You can select any available model from your provider, including the latest and most powerful ones.
- You can configure custom model parameters such as thinking level.
- Your keys are stored using AES-256-GCM encryption on the server and cannot be read by other users.

To set up your own key, go to the **API Keys** section in the Overseer's web interface.

## 🤫 Spoiler Policy

GnollHack is a game of discovery. The Overseer respects this with a configurable spoiler policy:

- **Always Safe** — The Overseer freely explains game mechanics (combat formulas, damage calculation, AC, encumbrance, skill training, status effects, UI controls).
- **Conditional** — Specific item identities, monster abilities, and artifact powers are only revealed if the Overseer can verify you have already encountered them (via your game snapshot, library, or Oracle consultations).
- **Always a Spoiler** — Future dungeon branches, unencountered bosses, quest objectives, endgame content, and optimal meta-strategies are withheld unless you explicitly allow spoilers.

You can toggle **Allow Spoilers** in the game's settings to unlock full information.

## ⚙️ Full Settings Reference

The following settings are available in GnollHack's Settings page:

| Setting | Description |
|---|---|
| **Allow Spoilers** | Permits the Overseer to discuss hidden information freely. |
| **Verbose Responses** | Toggles between detailed explanations and concise answers. |
| **Send Game Context** | Controls whether your game snapshot is sent when opening the Overseer during a game. |
| **Client Data Access** | Allows the Overseer to query your device for game logs, save info, and other local data. |
| **Game Actions** | Reserved for future AI-initiated game actions (currently disabled). |

Additional settings are available in the Overseer's web interface under **Settings**:

| Setting | Description |
|---|---|
| **Show Thinking and Tool Use** | Displays the AI's reasoning process and tool calls in real time. |
| **Show Source Code References** | Appends source file names and line numbers to answers. |
| **Max Tool Iterations** | Limits how many tool calls the AI can make per response. |
| **Request Timeout** | Sets how long to wait for the AI to respond before timing out. |

## 💡 Learn More

For a deep dive into the Overseer's technical architecture, see the [[/Guides/Technological Overview of Gnoll Overseer]].
