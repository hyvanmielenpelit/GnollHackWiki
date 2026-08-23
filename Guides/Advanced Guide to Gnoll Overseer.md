![Gnoll Overseer](/uploads/Guides/Introduction%20to%20Gnoll%20Overseer/gnoll-overseer-avatar-frame-256x256-q85.webp)

> 👉 **Unlock the full potential of Gnoll Overseer with custom models, your own API keys, advanced multi-codebase search tools, and rich conversation management.**

## 🏆 Overview

The [[/Guides/Introduction to Gnoll Overseer]] covers the basics. This guide dives into the Overseer's advanced capabilities: the complete suite of server-side and client-side tools it uses behind the scenes, how to bring your own AI provider key, how to manage conversations with pinning and the Trash bin, and the full range of settings available to power users.

## 🛠️ How the Overseer Finds Answers

Unlike a generic chatbot that might guess or hallucinate, the Overseer is equipped with a large suite of 28 specialized tools (18 server-side and 10 client-side). When you ask a question, the AI actively looks up real game data before answering.

### Server-Side Tools

These tools run on the Overseer server and are always available across both the web interface and in-game sessions:

| Tool | Category | Description | Data Source / Scope |
|---|---|---|---|
| `get_monster_stats` | Monster Stats | Retrieves exact base stats, attributes, resistances, flags, and attack tuples | `monst.c` definitions |
| `get_item_stats` | Item Stats | Queries item properties, weight, material, cost, damage, and attributes | `objects.c` definitions |
| `get_artifact_stats` | Artifact Stats | Retrieves artifact alignments, special powers, damage bonuses, and invocation effects | `artilist.h` definitions |
| `monster_lookup` | Entity Lookup | Resolves fuzzy monster names from player queries | Monster name index |
| `item_lookup` | Entity Lookup | Resolves fuzzy item names from player queries | Object name index |
| `source_code_search` | Code Search | Full-text Lucene search across GnollHack and NetHack `.c` and `.h` sources with repository tagging | C source repositories |
| `source_code_view` | Code View | Inspects exact line ranges and files in GnollHack or NetHack source code | C source files |
| `get_function_definition` | Code Definition | Extracts specific C functions with their complete implementation bodies and comments | C source files |
| `search_definitions` | Code Definition | Finds function declarations, macros, structs, and typedefs | C headers and sources |
| `get_constants` | Constants | Looks up enum values and `#define` constants across headers | C header files |
| `list_indexed_files` | Index Listing | Lists all indexed source files available for search | Lucene index catalog |
| `wiki_search` | GnollHack Wiki | Searches articles from the official GnollHack Wiki | GnollHack Wiki Markdown |
| `wiki_view` | GnollHack Wiki | Retrieves full Markdown content of a GnollHack Wiki page | GnollHack Wiki Markdown |
| `nethack_wiki_search` | NetHack Wiki | High-speed offline querying across the classic NetHack Wiki | Offline NetHack Wiki |
| `nethack_wiki_view` | NetHack Wiki | Reads full Markdown content of an offline NetHack Wiki article | Offline NetHack Wiki |
| `get_knowledge_article` | Knowledge Base | Queries curated first-party technical articles and gameplay guides | Overseer Knowledge Base |
| `get_github_repo_info` | GitHub | Fetches repository statistics, open issues, and pull requests | GitHub REST API |
| `search_github` | GitHub | Searches repository commits, code, and issues with rate limit monitoring | GitHub REST API |
| `search_server_dumplogs` | Server Dumplogs | Searches uploaded player end-of-game dumplogs on the server | Server game dumplogs |

### Client-Side Tools

When you open the Overseer from within a running game, 10 additional client-side tools become available that query your device directly via the native bridge:

| Tool | Purpose | Data Inspected | Access Requirement |
|---|---|---|---|
| `refresh_snapshot` | Takes and uploads a fresh snapshot of current game state (map, inventory, stats) | Live game engine memory | ✅ Active in-game session |
| `get_full_message_history` | Retrieves the complete turn-by-turn game log with optional search filtering | Message log buffer | 🟡 Client Data Access |
| `get_player_library` | Reads discovered game manuals from the player's in-game library | In-game player library | 🟡 Client Data Access |
| `get_oracle_consultations` | Reads the text of received Oracle of Delphi consultations | Oracle consultation history | 🟡 Client Data Access |
| `get_player_xlog` | Retrieves the local score log (`xlog`) containing past game records and stats | Local `xlog` file | 🟡 Client Data Access |
| `get_player_dumplogs` | Reads local text dumplogs of past games saved on the device | Local dumplog directory | 🟡 Client Data Access |
| `get_save_info` | Inspects save file headers and character metadata | Save file header data | 🟡 Client Data Access |
| `get_directory_listing` | Inspects game files and folder contents on the local device | Local game directory | 🟡 Client Data Access |
| `get_app_log` | Retrieves application logs to help diagnose technical issues | Application log file | 🟡 Client Data Access |
| `get_panic_log` | Retrieves game panic and crash logs for troubleshooting | Game panic log file | 🟡 Client Data Access |

> ℹ️ **Note:** Client-side tools can be toggled on or off in the game's settings under **Client Data Access**.

## 🧠 Multi-Provider AI Support

The Overseer supports three major AI providers and their latest model families:

| Provider | Example Models | Key Capabilities |
|---|---|---|
| **Google** | Gemini 3.7 Flash, Gemini 3.1 Pro | Configurable thinking levels, fast response times, high context window |
| **Anthropic** | Claude Sonnet 5, Claude Opus 5 | Extended thinking with token budgets, deep reasoning, structured tool use |
| **OpenAI** | GPT-5.6 Sol, GPT-5.6 Terra, GPT-5.6 Luna | Reasoning effort controls, advanced problem solving, high instruction fidelity |

The default system model is configured by server administrators. Power users who bring their own API key can choose any supported model from their provider.

## 🔑 Bring Your Own Key (BYOK)

The free Overseer service is subject to daily and monthly usage quotas to manage server costs. If you want unrestricted access, you can provide your own API key from any supported provider.

When using your own key:

- You bypass default system rate limits and token quotas.
- You can select any model available from your provider, including reasoning models.
- You can configure custom parameters, such as thinking budgets and reasoning effort levels.
- Your keys are stored using AES-256-GCM authenticated encryption on the server and are isolated by your user account ID.

To configure your own key, navigate to the **API Keys** section in the Overseer's web interface.

## 💬 Conversation Management and Productivity

The Overseer includes powerful tools for managing your conversations:

| Feature | UI Location / Action | Description |
|---|---|---|
| **Session Pinning** | Sidebar pin icon | Anchors important discussions to the top of the sidebar list. |
| **Full-Text Search** | Sidebar & Trash search bars | Quickly filters active chats in the sidebar or searches deleted sessions inside the Trash modal. |
| **Trash Bin & Recovery** | Settings → Trash Bin | Safely stores soft-deleted sessions for one-click restoration or permanent emptying. |
| **Bulk Actions** | Settings → Chat Management | Move all active chats to Trash at once (with pinned protection) or unpin all chats with a single action. |
| **Clean Clipboard Copy** | Message action bar | Copies clean formatted response text to your clipboard, stripping internal thinking tags and tool calls. |
| **Reasoning & Performance** | Message footer | Displays active reasoning mode badges, collapsible thought boxes with gnoll animations, TTFT, and total duration. |

## 🤫 Spoiler Policy

GnollHack is a game of discovery. The Overseer respects this with a configurable spoiler policy:

| Policy Level | Information Scope | Overseer Behavior |
|---|---|---|
| **Always Safe** | Core mechanics, damage formulas, AC calculation, encumbrance, skill training, status effects, controls | Freely explained and calculated at all times. |
| **Conditional** | Specific item identities, monster abilities, and artifact powers | Revealed only if the Overseer verifies you have already encountered them (via game snapshot, library, or Oracle). |
| **Always a Spoiler** | Future dungeon branches, unencountered bosses, quest objectives, endgame content, and optimal meta-strategies | Strictly withheld unless **Allow Spoilers** is enabled in settings. |

You can toggle **Allow Spoilers** in the game's settings to unlock full information.

## ⚙️ Full Settings Reference

### In-Game Settings

The following settings are available in GnollHack's Settings menu:

| Setting | Description |
|---|---|
| **Allow Spoilers** | Permits the Overseer to discuss hidden information freely. |
| **Verbose Responses** | Toggles between detailed explanations and concise answers. |
| **Send Game Context** | Controls whether your game snapshot is sent when opening the Overseer during a game. |
| **Client Data Access** | Allows the Overseer to query your device for game logs, save info, and other local data. |
| **Game Actions** | Reserved for future AI-initiated game actions (currently disabled). |

### Web Interface Settings

The following settings and controls are available in the Overseer's web interface under **Settings**:

| Setting / Control | Description |
|---|---|
| **Show Thinking and Tool Use** | Displays the AI's reasoning process and tool calls in real time. |
| **Show Source Code References** | Appends source file names and line numbers to answers. |
| **Max Tool Iterations** | Limits how many tool calls the AI can make per response (default 10). |
| **Request Timeout** | Sets how long to wait for the AI to respond before timing out. |
| **Chat Management** | Bulk actions to move active conversations to Trash or unpin all chats. |
| **Trash Bin** | Access soft-deleted sessions to restore them or permanently empty trash. |
| **Changelog** | Opens the release history with version summaries and update times. |

## 💡 Learn More

- [[/Guides/Introduction to Gnoll Overseer]] — General player overview and getting started.
- [[/Guides/Technological Overview of Gnoll Overseer]] — Full developer documentation covering .NET 10.0, Angular 22, SignalR streaming, and data retention architecture.
- [[/Overseer AI Providers]] — Overview of supported AI providers and model options.
