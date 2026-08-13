> 👉 **Beyond gameplay, GnollHack and NetHack differ fundamentally in their surrounding ecosystems—how you get the game, how your progress is tracked, and how you interact with the community. This page compares the infrastructure and services surrounding each game.**

## 📲 Distribution and App Store Presence

The most visible infrastructure difference is simply *how you get the game*.

**GnollHack** is officially distributed through mainstream digital storefronts—**Google Play**, the **Apple App Store**, and **Steam**—complete with age ratings (ESRB Everyone 10+, PEGI 7+, and regional equivalents). There is a single official release maintained by the developer.

**NetHack** has no official presence on any app store. The DevTeam distributes source code and binaries through `nethack.org` and GitHub. Players who want mobile or modern desktop versions rely on unofficial community ports, such as iNetHack2 (iOS), Vulture for NetHack (Steam), NetHack: Legacy (Steam), and a community-built NetHack 3.6 wrapper on the Microsoft Store.

## 👤 Accounts, Cloud Saves, and Cross-Platform Play

GnollHack introduces a centralized account system that ties together scoring, bones sharing, save transfers, and tournament participation into a single service.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Account System** | Per-server accounts created via dgamelaunch | Centralized [[GnollHack Account]] (`account.gnollhack.com`) |
| **Cross-Platform Identity** | No unified identity; separate accounts per server | Single account works across Android, iOS, and Windows |
| **Cloud Save Transfer** | Not available; saves are local or tied to a specific server | Cloud-based [[Save File Transfer]] between devices (move semantics — file exists in only one place at a time) |
| **Cross-Platform Saves** | N/A | Full [[cross-platform save compatibility|Save Game Compatibility]] (v3.1+) |
| **Anti-Cheat** | Server-side enforcement on public servers | [[Save File Tracking]] verifies saves are loaded only once and remain unmodified |

## 🏆 Scoreboards and Tournaments

Both games have global scoreboards and participate in the annual Junethack tournament, but they take very different approaches to scoring.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Score Logging** | `xlogfile` (machine-readable extended log) generated per server | Scores posted directly to `account.gnollhack.com` via the app |
| **Global Aggregation** | `nethackscoreboard.org` aggregates xlogfile feeds from NAO, Hardfought, and other servers | `account.gnollhack.com` serves as the central scoreboard; also feeds into NetHack Scoreboard and Junethack |
| **Scoring Model** | Gold carried, item values, dungeon depth, XP | Achievement-based system with difficulty multipliers, conduct bonuses, role-specific scoring, and turn count multipliers (see [[Scoring]]) |
| **Tournament Participation** | Players simply play on registered servers during the tournament period | Built-in [[Tournament Mode]] enforces anti-cheat settings (Classic Mode, minimum Expert difficulty, forced server posting, save file tracking) |
| **Tournament Integration** | Server xlogfiles feed into Junethack | [[GnollHack Account]] links to Junethack username; scores posted via account service |
| **Historical Tournaments** | /dev/null/nethack (1999–2016, retired) | None |

## 🦴 Bones Sharing

Bones files are levels where players have died, complete with their gear and ghost. Encountering bones from other players is one of the genre's most memorable experiences.

On public servers, both games share bones automatically between players on the same server. The key difference is *cross-device and cross-server* sharing:

- **NetHack**: Not built-in. Players must use the third-party **Hearse** utility (a client/server tool that exchanges bones files over the internet, verifying version and platform compatibility).
- **GnollHack**: Built natively into the game for [[GnollHack Account]] users. Bones are automatically uploaded when your character dies and downloaded into other players' games. Files are separated by difficulty level and game version. Bones are only generated and shared in [[Classic Mode]]. See [[Bones Sharing]] for details.

## 🤖 AI Assistants, Bots, and Social Features

The way each game connects to the broader internet reflects its era of design. NetHack relies on community-built bots and IRC culture; GnollHack integrates AI and Discord features directly into the client.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **In-Game AI Assistant** | None | **Gnoll Overseer** — AI chat assistant powered by OpenAI, Anthropic, and Google AI; provides gameplay hints and answers questions via custom tools. Runs on a dedicated US-hosted server; user-provided API keys encrypted at rest. |
| **Event Announcements** | **Rodney** (IRC bot on Libera.Chat `#nethack`), **Beholder** (bridges server events to IRC/Discord) | Built-in **Post Game Progress** sends real-time events to Discord `#player-log` channel |
| **Info ∕ Spoiler Queries** | **Rodney** (`learndb` database), **Pinobot** (monster/item stats for variants) | Gnoll Overseer serves this role in-game |
| **Custom Webhooks** | N/A | Players and server admins can configure custom Discord webhook URLs to post progress to their own channels |

## 🌐 Community Platforms

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Primary Real-Time Chat** | IRC on Libera.Chat (`#nethack`, `#nethack-variants`, `#hardfought`) | Discord server |
| **Forum ∕ Discussion** | Reddit (`r/nethack`), NetHack Wiki (`nethackwiki.com`) | Discord server |
| **Wiki** | `nethackwiki.com` (community-maintained MediaWiki) | `wiki.gnollhack.com` (Gollum-based, developer-maintained) |

## 💻 Public Servers

Both games can be played on public Linux servers via SSH. NetHack's server ecosystem is larger and more established, while GnollHack also offers a proprietary server alongside the community-run Hardfought network.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Primary Servers** | NAO (`nethack.alt.org`), Hardfought (US/EU/AU) | Proprietary server (`server.gnollhack.com`), also on Hardfought |
| **Access Methods** | SSH, Telnet, web terminal | SSH (text-based servers), native app (modern ports) |
| **Server Management** | `dgamelaunch` (community open-source) | Proprietary server software |
| **Live Spectating** | Built into dgamelaunch (SSH `w` key) | Built into dgamelaunch on Hardfought; not available on modern ports |

## 🎬 Game Recording and Replays

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Recording Format** | `ttyrec` (terminal recording, server-side) | Built-in input recording (`Record Game` setting) |
| **Replay Access** | Web-based ttyrec browsers (`browsettyrec`) on NAO and Hardfought | In-app replay viewer; replays can be auto-uploaded to cloud or exported as ZIP |
| **Livestreaming** | Terminal spectating via dgamelaunch; external tools (OBS) for Twitch/YouTube | Streaming guides provided for Twitch Studio, Streamlabs OBS, and OBS Studio |

## 🔬 AI Research

NetHack holds a unique place in AI research. Because of its extreme difficulty, procedural generation, permadeath, and reliance on long-horizon planning, vanilla NetHack has become a "grand challenge" for artificial intelligence. Meta AI and Oxford University created the **NetHack Learning Environment (NLE)** as a major reinforcement learning benchmark, and the **MiniHack** sandbox and **BALROG** LLM evaluation suite continue to drive active publications at top-tier conferences (ICLR, ICML). GnollHack is not currently used as an AI research benchmark.

## 🛠️ Source Code and Development

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Source Hosting** | GitHub (`NetHack/NetHack`) | GitHub (`hyvanmielenpelit/GnollHack`) |
| **Latest Stable Version** | NetHack 3.6.7 (February 2023); 3.7.0 in active development | GnollHack Release 3 series (actively updated) |
| **Developer** | NetHack DevTeam (volunteer collective) | Sound Mind Games / Hyvän mielen pelit ry (Finnish non-profit) |
| **License** | NGPL (NetHack General Public License) | NGPL |

## 💡 Conclusions

NetHack's infrastructure has grown organically over decades through community effort—open-source server management, third-party apps, IRC bots, the Hearse network, and aggregated scoreboards. GnollHack takes a different approach by centralizing and modernizing these features into the game itself: a unified account system, built-in cloud saves, an AI assistant, official app store distribution, and native Discord integration. The result is an out-of-the-box online experience designed for the modern gamer.

## ℹ️ See Also

- **[[Comparisons to Other Games]]**
