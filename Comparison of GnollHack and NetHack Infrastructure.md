> 👉 **Most of NetHack's online services, from public servers to IRC bots, are run by its community, and GnollHack has built several of them into the game: accounts, bones sharing, save transfers, and score posting.**

## 📲 Distribution and App Store Presence

GnollHack is distributed through [Google Play](https://play.google.com/store/apps/details?id=com.soundmindentertainment.gnollhack), the [Apple App Store](https://apps.apple.com/us/app/gnollhack/id1626979951), and [Steam](https://store.steampowered.com/app/3558190/GnollHack/), with age ratings (ESRB Everyone 10+, PEGI 7+, and regional equivalents), and every store version is the developer's own.

The DevTeam distributes NetHack's source code and binaries only through [`nethack.org`](https://www.nethack.org/) and GitHub. The versions in the stores are made by other developers, such as [iNethack2](https://apps.apple.com/us/app/inethack2/id962114968) (iOS), [Vulture for NetHack](https://store.steampowered.com/app/341390/Vulture_for_NetHack/) (Steam), and [NetHack: Legacy](https://store.steampowered.com/app/837200/NetHack_Legacy/) (Steam), a variant developed independently of the DevTeam.

## 👤 Accounts, Cloud Saves, and Cross-Platform Play

In GnollHack, one account covers scoring, bones sharing, save transfers, and tournaments.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Account System** | A separate account on each server, created through dgamelaunch | One [[GnollHack Account]] at [`account.gnollhack.com`](https://account.gnollhack.com/), used on Android, iOS, Linux, macOS, and Windows |
| **Cloud Save Transfer** | Not available; saves are local or tied to one server | [[Save File Transfer]] between devices and platforms through the cloud, for saves from version 3.1 on (see [[Save Game Compatibility]]). It moves the file, so a save exists in only one place at a time. |
| **Anti-Cheat** | Enforced by the server on public servers | [[Save File Tracking]] checks that a save is loaded only once and has not been modified |

## 🏆 Scoreboards and Tournaments

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Score Logging** | Each server writes an `xlogfile`, a machine-readable extended log | The app posts scores directly to [`account.gnollhack.com`](https://account.gnollhack.com/) |
| **Global Aggregation** | [`nethackscoreboard.org`](https://nethackscoreboard.org/) collects the xlogfiles of NAO, Hardfought, and other servers | [`account.gnollhack.com`](https://account.gnollhack.com/) is the central scoreboard, and NetHack Scoreboard also lists the games posted there |
| **Scoring Model** | Gold carried, item values, dungeon depth, experience | Achievements, with multipliers for difficulty and turn count, conduct bonuses, and role-specific scoring (see [[Scoring]]) |
| **Junethack** | Players play on the servers registered with [Junethack](https://junethack.net/), whose xlogfiles feed the tournament | The [[GnollHack Account]] is linked to a Junethack username, and scores are posted through the account service. [[Tournament Mode]] enforces Classic Mode, at least Expert difficulty, server posting, and save file tracking. |

NetHack also had the /dev/null/nethack tournament, held from 1999 to 2016 and since retired. How to enter GnollHack games in the annual Junethack is on the [[Junethack]] page.

## 🦴 Bones Sharing

Bones files are levels where a player died, with that player's gear and ghost. A public server shares bones among its own players, in NetHack and GnollHack alike.

NetHack has no built-in way to share bones beyond one server. Players use the third-party [Hearse](https://hearse.krollmark.com/) utility, a client and server tool that exchanges bones files over the internet and hands out only bones from compatible NetHack versions.

GnollHack does it in the game for [[GnollHack Account]] users, through [[Bones Sharing]]. When your character dies, the bones are uploaded, and other players' games download them. Bones are kept apart by difficulty level and game version, and they are created and shared only in [[Classic Mode]].

## 🤖 AI Advisors, Bots, and Social Features

GnollHack's [[Gnoll Overseer]] is an AI chat advisor in the game. It uses models from [Google AI](https://ai.google/), [Anthropic](https://www.anthropic.com/), and [OpenAI](https://openai.com/), runs on a dedicated server in the US, analyzes snapshots of the live game, and looks up the monster and item data, the C source code, and the wikis of both GnollHack and NetHack. NetHack has nothing like it; its players ask IRC bots instead.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Event Announcements** | **Rodney** (an IRC bot on [Libera.Chat](https://libera.chat/) `#nethack`) and **Beholder** (bridges server events to IRC and Discord) | The [[Post Game Progress|Share Your Progress to Discord Server Channel]] setting sends events to the Discord `#player-log` channel as they happen |
| **Info and Spoiler Queries** | **Rodney** (`learndb` database) and **Pinobot** (monster and item stats for variants) | The Gnoll Overseer |

Players and server admins can also set their own Discord webhook URLs in GnollHack, to post progress to their own channels.

## 🌐 Community Platforms

NetHack players chat on IRC, on [Libera.Chat](https://libera.chat/) in `#nethack`, `#nethack-variants`, and `#hardfought`, and discuss the game on Reddit ([`r/nethack`](https://www.reddit.com/r/nethack/)) and the NetHack Wiki ([`nethackwiki.com`](https://nethackwiki.com/)), a community-maintained MediaWiki.

GnollHack's chat and discussion both happen on its [Discord server](https://discord.gg/cQuExnzUQy). Its wiki, `wiki.gnollhack.com`, runs on Gollum and is maintained by the developers.

## 💻 Public Servers

NetHack and the text version of GnollHack can be played over SSH on public Linux servers, and NetHack has more of them. GnollHack has its own server and is also on the community-run Hardfought network; see [[Public Servers]].

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Primary Servers** | NAO ([`nethack.alt.org`](https://alt.org/nethack/)), [Hardfought](https://www.hardfought.org/) (US/EU/AU) | GnollHack's own server (`server.gnollhack.com`), also on Hardfought |
| **Access Methods** | SSH, Telnet, web terminal | SSH for the text version; the GnollHack app on each platform for the graphical one |
| **Server Management** | `dgamelaunch` (community open-source) | Its own software, based on dgamelaunch |
| **Live Spectating** | Built into dgamelaunch (SSH `w` key) | The `w` key in the main menu, on both servers; not in the app |

## 🎬 Game Recording and Replays

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Recording Format** | `ttyrec` (terminal recording, server-side) | Built-in input recording (`Record Game` setting) |
| **Replay Access** | Web-based ttyrec browsers (`browsettyrec`) on NAO and Hardfought | A replay viewer in the app; replays can be uploaded to the cloud automatically or exported as a ZIP file |
| **Livestreaming** | Streaming software such as OBS, to Twitch or YouTube | The same, with [[Streaming guides|Live Streaming Instructions]] for Twitch Studio, Streamlabs OBS, and OBS Studio |

## 🔬 AI Research

AI researchers use vanilla NetHack as a test problem, because it is very hard and procedurally generated, has permadeath, and needs long-term planning. Facebook AI Research (FAIR, now part of Meta), with researchers from Oxford, UCL, and other universities, built the [NetHack Learning Environment (NLE)](https://github.com/facebookresearch/nle) as a reinforcement learning benchmark and presented it at NeurIPS 2020. Later work includes the [MiniHack](https://minihack.readthedocs.io/) sandbox (NeurIPS 2021) and the [BALROG](https://arxiv.org/abs/2411.13543) LLM evaluation suite (ICLR 2025).

GnollHack is not used as an outside reinforcement learning benchmark. Its developers run an internal agentic LLM benchmark, [[GnollBench]], which tests AI models for the [[Gnoll Overseer]] on GnollHack's mechanics and on reasoning about live game states.

## 🛠️ Source Code and Development

NetHack's source is on GitHub at [`NetHack/NetHack`](https://github.com/NetHack/NetHack), developed by the NetHack DevTeam, a volunteer collective. GnollHack's is at [`hyvanmielenpelit/GnollHack`](https://github.com/hyvanmielenpelit/GnollHack), developed by Sound Mind Games (Hyvän mielen pelit ry), a Finnish non-profit. Both are released under the NetHack General Public License (NGPL).

## 📖 See Also

- **[[Comparisons to Other Games]]**

## 📅 Validity

The GnollHack details are valid for GnollHack 3.39 (4.3.0 Build 39), checked on November 8, 2026. The details of NetHack's servers, IRC channels, and bots date from August 2026.
