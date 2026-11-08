> 👉 **GnollHack's online services run through the app stores and its own account server, while NetHack's grew out of community servers, IRC bots, and third-party tools.**

## 📲 Distribution and App Store Presence

GnollHack is distributed through [Google Play](https://play.google.com/store/apps/details?id=com.soundmindentertainment.gnollhack), the [Apple App Store](https://apps.apple.com/us/app/gnollhack/id1626979951), and [Steam](https://store.steampowered.com/app/3558190/GnollHack/), with age ratings (ESRB Everyone 10+, PEGI 7+, and regional equivalents). There is one official release, maintained by the developer.

NetHack is not on any app store. The DevTeam distributes source code and binaries through [`nethack.org`](https://www.nethack.org/) and GitHub. Mobile and modern desktop versions are unofficial community ports, such as [iNetHack2](https://apps.apple.com/us/app/inethack2/id962114968) (iOS), [Vulture for NetHack](https://store.steampowered.com/app/341390/Vulture_for_NetHack/) (Steam), and [NetHack: Legacy](https://store.steampowered.com/app/2000360/NetHack_Legacy/) (Steam).

## 👤 Accounts, Cloud Saves, and Cross-Platform Play

In GnollHack, one account covers scoring, bones sharing, save transfers, and tournaments.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Account System** | Per-server accounts, created through dgamelaunch | One [[GnollHack Account]] at [`account.gnollhack.com`](https://account.gnollhack.com/) |
| **Cross-Platform Identity** | None; a separate account on each server | The same account works on Android, iOS, Linux, macOS, and Windows |
| **Cloud Save Transfer** | Not available; saves are local or tied to one server | [[Save File Transfer]] between devices through the cloud. It moves the file, so a save exists in only one place at a time. |
| **Cross-Platform Saves** | N/A | [[Cross-platform save compatibility|Save Game Compatibility]] from version 3.1 |
| **Anti-Cheat** | Enforced by the server on public servers | [[Save File Tracking]] checks that a save is loaded only once and has not been modified |

## 🏆 Scoreboards and Tournaments

Both games have global scoreboards and take part in the annual Junethack tournament.

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Score Logging** | Each server writes an `xlogfile`, a machine-readable extended log | The app posts scores directly to [`account.gnollhack.com`](https://account.gnollhack.com/) |
| **Global Aggregation** | [`nethackscoreboard.org`](https://nethackscoreboard.org/) collects the xlogfiles of NAO, Hardfought, and other servers | [`account.gnollhack.com`](https://account.gnollhack.com/) is the central scoreboard, and it also feeds NetHack Scoreboard and [Junethack](https://junethack.net/) |
| **Scoring Model** | Gold carried, item values, dungeon depth, experience | Achievements, with multipliers for difficulty and turn count, conduct bonuses, and role-specific scoring (see [[Scoring]]) |
| **Tournament Participation** | Players play on the registered servers during the tournament | [[Tournament Mode]] enforces anti-cheat settings: Classic Mode, at least Expert difficulty, server posting, and save file tracking |
| **Tournament Integration** | Server xlogfiles feed [Junethack](https://junethack.net/) | The [[GnollHack Account]] is linked to a Junethack username, and scores are posted through the account service |
| **Historical Tournaments** | /dev/null/nethack (1999–2016, retired) | None |

## 🦴 Bones Sharing

Bones files are levels where a player died, with that player's gear and ghost. On a public server, both games share bones between the players on that server.

NetHack has no built-in way to share bones beyond one server. Players use the third-party [Hearse](https://hearse.krollmark.com/) utility, a client and server tool that exchanges bones files over the internet and checks that their version and platform match.

GnollHack does it in the game for [[GnollHack Account]] users. When your character dies, the bones are uploaded, and other players' games download them. Bones are kept apart by difficulty level and game version, and they are created and shared only in [[Classic Mode]]. See [[Bones Sharing]].

## 🤖 AI Advisors, Bots, and Social Features

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **In-Game AI Advisor** | None | The [[Gnoll Overseer]], an AI chat advisor that uses models from [Google AI](https://ai.google/), [Anthropic](https://www.anthropic.com/), and [OpenAI](https://openai.com/). It gives gameplay hints, analyzes snapshots of the live game, and uses custom tools to look up the GnollHack and NetHack C source code and wikis. It runs on a dedicated server in the US. |
| **Event Announcements** | **Rodney** (an IRC bot on [Libera.Chat](https://libera.chat/) `#nethack`) and **Beholder** (bridges server events to IRC and Discord) | The [[Post Game Progress|Share Your Progress to Discord Server Channel]] setting sends events to the Discord `#player-log` channel as they happen |
| **Info ∕ Spoiler Queries** | **Rodney** (`learndb` database) and **Pinobot** (monster and item stats for variants) | The Gnoll Overseer, in the game. It looks up the exact monster and item data, source definitions, and wiki archives of both games. |
| **Custom Webhooks** | N/A | Players and server admins can set their own Discord webhook URLs to post progress to their own channels |

## 🌐 Community Platforms

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Primary Real-Time Chat** | IRC on [Libera.Chat](https://libera.chat/) (`#nethack`, `#nethack-variants`, `#hardfought`) | [Discord server](https://discord.gg/cQuExnzUQy) |
| **Forum ∕ Discussion** | Reddit ([`r/nethack`](https://www.reddit.com/r/nethack/)), NetHack Wiki ([`nethackwiki.com`](https://nethackwiki.com/)) | [Discord server](https://discord.gg/cQuExnzUQy) |
| **Wiki** | [`nethackwiki.com`](https://nethackwiki.com/) (community-maintained MediaWiki) | `wiki.gnollhack.com` (Gollum-based, developer-maintained) |

## 💻 Public Servers

Both games can be played over SSH on public Linux servers. NetHack has more servers. GnollHack has its own server and is also on the community-run Hardfought network; see [[Public Servers]].

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Primary Servers** | NAO ([`nethack.alt.org`](https://alt.org/nethack/)), [Hardfought](https://www.hardfought.org/) (US/EU/AU) | Proprietary server (`server.gnollhack.com`), also on Hardfought |
| **Access Methods** | SSH, Telnet, web terminal | SSH (text-based servers), native app (modern ports) |
| **Server Management** | `dgamelaunch` (community open-source) | Proprietary server software, based on dgamelaunch |
| **Live Spectating** | Built into dgamelaunch (SSH `w` key) | Built into dgamelaunch on Hardfought; not available on modern ports |

## 🎬 Game Recording and Replays

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Recording Format** | `ttyrec` (terminal recording, server-side) | Built-in input recording (`Record Game` setting) |
| **Replay Access** | Web-based ttyrec browsers (`browsettyrec`) on NAO and Hardfought | A replay viewer in the app; replays can be uploaded to the cloud automatically or exported as a ZIP file |
| **Livestreaming** | Terminal spectating through dgamelaunch; external tools such as OBS for Twitch and YouTube | [[Streaming guides|Live Streaming Instructions]] for Twitch Studio, Streamlabs OBS, and OBS Studio |

## 🔬 AI Research

AI researchers use vanilla NetHack as a test problem, because it is very hard and procedurally generated, has permadeath, and needs long-term planning. Meta AI and Oxford University built the [NetHack Learning Environment (NLE)](https://github.com/facebookresearch/nle) as a reinforcement learning benchmark, and work with the [MiniHack](https://minihack.readthedocs.io/) sandbox and the [BALROG](https://arxiv.org/abs/2411.13543) LLM evaluation suite appears at conferences such as ICLR and ICML. GnollHack is not used as an outside reinforcement learning benchmark, but its developers run an internal agentic LLM benchmark, [[GnollBench]], which tests AI models for the [[Gnoll Overseer]] on GnollHack's mechanics and on reasoning about live game states.

## 🛠️ Source Code and Development

| Aspect | NetHack | GnollHack |
|--------|---------|-----------|
| **Source Hosting** | GitHub ([`NetHack/NetHack`](https://github.com/NetHack/NetHack)) | GitHub ([`hyvanmielenpelit/GnollHack`](https://github.com/hyvanmielenpelit/GnollHack)) |
| **Developer** | NetHack DevTeam (volunteer collective) | Sound Mind Games / Hyvän mielen pelit ry (Finnish non-profit) |
| **License** | NGPL (NetHack General Public License) | NGPL |

## 📖 See Also

- **[[Comparisons to Other Games]]**
