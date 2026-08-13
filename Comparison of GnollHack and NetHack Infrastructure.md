> 👉 **While the gameplay differences between GnollHack and NetHack are significant, the infrastructure surrounding both games—servers, scoreboards, integrations, and distribution—also differs fundamentally. This page provides a meta-level comparison of the ecosystem that surrounds each game.**

## 💻 Public Servers

Both games support online play through public servers, but their approaches to server management and access differ.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Primary Servers** | NAO (`nethack.alt.org`), Hardfought (US/EU/AU) | Proprietary server (`server.gnollhack.com`), also on Hardfought |
| **Access Methods** | SSH, Telnet, web terminal | SSH (text-based servers), native app (modern ports) |
| **Server Management** | `dgamelaunch` (community open-source) | Proprietary server software |
| **Live Spectating** | Built into dgamelaunch (SSH `w` key) | Built into dgamelaunch on Hardfought; not available on modern ports |

## 📱 App Store and Distribution

GnollHack is designed as a modern application with official distribution, whereas NetHack relies on community ports for modern platforms.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Official Distribution** | Source code from `nethack.org` and GitHub; no official app store releases | Google Play, Apple App Store, Steam |
| **Community Ports** | iNetHack2 (iOS), Vulture for NetHack (Steam), NetHack: Legacy (Steam), community NetHack 3.6 (Microsoft Store) | N/A (single official release) |
| **Age Ratings** | None | ESRB Everyone 10+, PEGI 7+, and regional equivalents |

## 👤 Account Services

GnollHack features a unified account system, whereas NetHack accounts are typically tied to specific servers.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Account System** | Per-server accounts created via dgamelaunch | Centralized [[GnollHack Account]] (`account.gnollhack.com`) |
| **Cross-Platform Identity** | No unified identity; separate accounts per server | Single account works across Android, iOS, and Windows |

## 🏆 Scoreboards

Scoring in GnollHack has been completely overhauled, and the way scores are recorded and aggregated is also different.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Score Format** | `xlogfile` (machine-readable extended log) | Server-posted scores via [[GnollHack Account]] |
| **Per-Server Scores** | Each server maintains its own scoreboard | Scores posted to `account.gnollhack.com` |
| **Global Aggregation** | `nethackscoreboard.org` aggregates xlogfile feeds from NAO, Hardfought, and other servers | `account.gnollhack.com` serves as the central scoreboard; also feeds into NetHack Scoreboard and Junethack |
| **Scoring Model** | Gold carried, item values, dungeon depth, XP | Achievement-based system with difficulty multipliers, conduct bonuses, role-specific scoring, and turn count multipliers (see [[Scoring]]) |

## 🦴 Bones Sharing

Bones files are levels where players have died, complete with their gear and ghost. Sharing them allows you to encounter the remains of other players.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **On Public Servers** | Bones shared automatically between players on the same server | Same behavior on Hardfought |
| **Cross-Server ∕ Device** | Not built-in; requires third-party **Hearse** utility (client/server) | Built into the game natively for [[GnollHack Account]] users; bones uploaded/downloaded automatically on character death (see [[Bones Sharing]]) |
| **Filtering** | Hearse verifies version/config/platform fingerprints | Separated by difficulty level and game version compatibility |
| **Mode Restriction** | N/A | Bones are only generated and shared in [[Classic Mode]] |

## ⚔️ Tournament Infrastructure

Both games participate in the annual Junethack tournament, but GnollHack has built-in features to support tournament play.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Active Tournament** | Junethack (annual, June) | Junethack (annual, June) |
| **Historical Tournaments**| /dev/null/nethack (1999–2016, retired) | None |
| **Dedicated Tournament Mode** | No; players simply play on registered servers during the tournament period | Built-in [[Tournament Mode]] that enforces anti-cheat settings (Classic Mode, minimum Expert difficulty, forced server posting, save file tracking) |
| **Tournament Integration**| Server xlogfiles feed into Junethack | [[GnollHack Account]] links to Junethack username; scores posted via account service |

## 💾 Save File Management

GnollHack introduces cloud saving and anti-cheat mechanisms for modern ports.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Local Saves** | Standard local save files | Standard local save files |
| **Cloud Transfer** | Not available; saves are local or per-server | Cloud-based [[Save File Transfer]] between devices via `account.gnollhack.com` (move semantics — file exists in only one place at a time) |
| **Anti-Cheat** | Server-side enforcement on public servers | [[Save File Tracking]] verifies saves are loaded only once and remain unmodified |
| **Cross-Platform** | N/A | Full [[Save Game Compatibility|cross-platform save compatibility]] (v3.1+) |

## 🤖 AI Assistants

GnollHack integrates modern Large Language Models directly into the game.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **In-game AI Assistant** | None | **Gnoll Overseer** — built-in AI chat assistant powered by OpenAI, Anthropic, and Google AI; provides gameplay hints and answers questions via custom tools |
| **AI Infrastructure** | N/A | Dedicated AI server (US-hosted); user-provided API keys encrypted at rest |

## 💬 Community Bots and Automation

Both communities use bots to announce player achievements and provide game information.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Event Announcement Bots**| **Rodney** (IRC, Libera.Chat `#nethack`), **Beholder** (bridges server events to IRC/Discord) | Built-in **Post Game Progress** sends real-time events to Discord `#player-log` channel |
| **Information ∕ Spoiler Bots**| **Rodney** (`learndb` database), **Pinobot** (monster/item stats for variants) | Gnoll Overseer serves this role in-game |
| **Custom Webhooks** | N/A | Players and server admins can configure custom Discord webhook URLs to post progress to their own channels |

## 🌐 Community Platforms

The primary real-time communication platforms differ between the communities.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Primary Real-Time Chat** | IRC on Libera.Chat (`#nethack`, `#nethack-variants`, `#hardfought`) | Discord server |
| **Forum ∕ Discussion** | Reddit (`r/nethack`), NetHack Wiki (`nethackwiki.com`) | Discord server |
| **Wiki** | `nethackwiki.com` (community-maintained MediaWiki) | `wiki.gnollhack.com` (Gollum-based, developer-maintained) |

## 🎬 Game Recording and Replays

Recording and playing back games is handled differently in the two ecosystems.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Recording Format** | `ttyrec` (terminal recording, server-side) | Built-in input recording (`Record Game` setting) |
| **Replay Access** | Web-based ttyrec browsers (`browsettyrec`) on NAO and Hardfought | In-app replay viewer; replays can be auto-uploaded to cloud or exported as ZIP |
| **Livestreaming** | Terminal spectating via dgamelaunch; external tools (OBS) for Twitch/YouTube | Streaming guides provided for Twitch Studio, Streamlabs OBS, and OBS Studio |

## 🔬 AI Research

NetHack serves as a significant benchmark in AI research.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Research Benchmark** | **NetHack Learning Environment (NLE)** by Meta AI/Oxford — a major RL benchmark; **MiniHack** sandbox; **BALROG** LLM evaluation suite; active publications at ICLR/ICML | Not used as an AI research benchmark |
| **Significance** | NetHack is considered a "grand challenge" for AI due to procedural generation, permadeath, and long-horizon planning | N/A |

## 🛠️ Source Code and Development

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Source Hosting** | GitHub (`NetHack/NetHack`) | GitHub (`hyvanmielenpelit/GnollHack`) |
| **Latest Stable Version** | NetHack 3.6.7 (February 2023); 3.7.0 in active development | GnollHack Release 3 series (actively updated) |
| **Developer** | NetHack DevTeam (volunteer collective) | Sound Mind Games / Hyvän mielen pelit ry (Finnish non-profit) |
| **License** | NGPL (NetHack General Public License) | NGPL |

## 💡 Conclusions

While NetHack relies heavily on community-driven infrastructure—such as open-source server management (`dgamelaunch`), third-party apps, IRC bots, and the Hearse network—GnollHack centralizes and modernizes these features. With a native account system, built-in cloud saving, AI integration, and official app store distribution, GnollHack aims to provide a seamless, out-of-the-box online experience that feels familiar to modern gamers.

## ℹ️ See Also

- **[[Comparisons to Other Games]]**
