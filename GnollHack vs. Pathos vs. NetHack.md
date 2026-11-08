> 👉 **GnollHack is a fork of NetHack 3.6.2 that keeps its rules and dungeon, while Pathos: NetHack Codex is a separate game, written from scratch, that borrows NetHack's monsters and items.**

## ⚡ At a Glance

| Feature | NetHack | GnollHack | Pathos: NetHack Codex |
| :--- | :--- | :--- | :--- |
| **Relation to NetHack** | The original game | A fork of NetHack 3.6.2: the same engine, dungeon layout, and interactions, with more added to combat, loot, and magic | Written from scratch: NetHack's names and themes, but its own rules and mechanics |
| **Mobile & Touch UI** | ❌ None officially; third-party ports use on-screen keyboards | ✅ Native touch UI with context menus; no keyboard needed | ✅ Native touch UI with context menus; no keyboard needed |
| **Graphics & Animations** | ASCII text or basic static 2D tiles | High-resolution tiles from 64x96 to 192x192 pixels, with [[animations]] | Retro 2D tile sets with animations |
| **Audio** | No sound | A [[music]] soundtrack, spatial sound effects, and over 5,000 [[voiceovers]] | Sound effects and background music, no voiceovers |
| **Help for Beginners** | One difficulty, permadeath only; players rely on external wikis | 7 [[difficulty levels]], optional modes without permadeath, stats and hints in the game, and the [[Gnoll Overseer]] AI advisor | A built-in encyclopedia (the Codex); instant revive after death, with a score and fame penalty |

## 🧬 Fork or Rewrite

GnollHack and Pathos can look like two graphical skins on the same game, but only GnollHack runs NetHack's code. It is a direct fork of NetHack 3.6.2, so NetHack's simulation still runs under the graphics, and almost all of the interactions behind the saying "the DevTeam thinks of everything" work as they do in vanilla NetHack. The dungeon is NetHack's: the Dungeons of Doom, the Gnomish Mines, Sokoban, Vlad's Tower, your role's Quest, Gehennom, and the Elemental Planes. GnollHack keeps that depth on small screens with context menus and detailed item descriptions, and it changes combat, loot, and magic; [[How GnollHack differs from NetHack]] lists the changes.

Pathos was written from scratch by its solo developer, Callan Hodgskin, as a mobile roguelike inspired by NetHack. You will recognize monsters such as grid bugs, mind flayers, and liches, and items such as bags of holding and scrolls of identify, but the math behind them is Pathos's own, and strategies from the NetHack Wiki often do not apply. Several systems are simpler. A single **Karma** resource replaces NetHack's three-alignment religion, prayer, and sacrifice, and elemental resistances are percentages instead of intrinsic and extrinsic properties. Its own engine also lets Pathos do things NetHack does not: you can control a party of up to six adventurers, play local co-op, use crafting workbenches, and play other campaign modules, such as overworld adventures.

## ⚔️ Gameplay and Mechanics Comparison

| System | NetHack | GnollHack | Pathos: NetHack Codex |
| :--- | :--- | :--- | :--- |
| **Religion & Alignment** | Lawful, neutral, and chaotic gods; altar sacrifice, prayer timeouts, and crowning gifts | NetHack's gods, altars, and prayer, plus temple services paid with gold | **Karma** points, gained by killing enemies and spent at shrines |
| **Magic & Spells** | About 40 spells, memorized from spellbooks, which fade from memory over time | Over 200 spells, prepared with material reagents and never forgotten | Spells learned and upgraded from spellbooks, up to 3 stars; uses mana |
| **Loot & Equipment** | Standard items with `+1` or `+2` enchantments; 7 armor and weapon slots | ARPG-style loot with quality tiers and mythic and legendary affixes; 22 equipment slots | Standard items; crafting workbenches scrap and forge gear |
| **Identification** | Price identification, engrave-testing, and blind-testing, or external spoilers | Many identification scrolls and wands, paid identification by NPCs, and detailed item stats in the game | The built-in Codex shows item pools; NPCs and shrines can identify gear |
| **Instant Deaths** | Drowning, stoning, sickness, and choking can kill you at once | Many instant deaths are delayed by several turns, so you can react | More predictable damage scaling and fewer obscure instant-death traps |
| **Permadeath & Modes** | Permadeath only | Permadeath in [[Classic Mode]], or resurrection at a checkpoint in [[Modern Mode]] | Instant revive on the spot after every death, but the game can no longer enter the leaderboard |
| **Difficulty Settings** | One fixed difficulty | 7 [[difficulty levels]], from *Standard* to *Grand Master* | One standard difficulty per campaign module |

## 💻 Platform Availability and Ecosystem

GnollHack is free on every platform, Steam included, with no ads, microtransactions, or paywalls; see [[Download]]. Pathos is free on Android, iOS, the Microsoft Store, and its own website, but its enhanced Steam edition costs money.

| Platform / Feature | NetHack | GnollHack | Pathos: NetHack Codex |
| :--- | :--- | :--- | :--- |
| **Android** | Unofficial ports only | ✅ Google Play | ✅ Google Play |
| **iOS (iPhone / iPad)** | Unofficial ports only, such as iNetHack2 | ✅ Apple App Store | ✅ Apple App Store |
| **Windows** | ✅ Official download from `nethack.org` | ✅ Steam (free) | ✅ Free on the Microsoft Store and as a desktop installer; paid on Steam |
| **macOS** | ✅ Official download or Homebrew | ✅ Native app on Steam (free) for Apple Silicon Macs (M1 or later) since November 2026; the iOS version from the App Store also runs on them | ❌ No native macOS app. The Steam version is Windows-only, and Proton is not available on macOS. |
| **Linux** | ✅ Official support. Many distributions' package managers may include a prebuilt binary. | ✅ Native [[Linux Version]] on Steam (free), also available as an AppImage | No native version. The Windows version on Steam (paid) runs through Proton, and there is an unofficial community port. |
| **Steam Deck** | Unofficial ports only | ✅ Native on Steam (free), with built-in [[Steam Deck Controls]] | The Windows version on Steam (paid) runs through Proton; the store page mentions controller support on the Steam Deck |
| **Game Controllers** | ❌ None; keyboard and mouse only | ✅ A controller interface with radial menus, on-screen button hints, and controller navigation of every menu, on the Steam Deck, Windows, Linux, and macOS (not on Android or iOS) | Partial: Steam lists partial controller support, and the interface is made for touch first |
| **Cross-Device Cloud Saves** | ❌ Only when playing ASCII over SSH on public servers | ✅ [[Save File Transfer]] through the cloud, across Android, iOS, Linux, macOS, and Windows | Steam Cloud sync on the Steam version; local saves elsewhere |
| **Bones Sharing** | Only on public SSH servers or with the third-party Hearse tool | ✅ Automatic cross-platform [[Bones Sharing]] with a [[GnollHack Account]] | ✅ Built-in revenant (bones) sharing |
| **Language Support** | <img src="/uploads/GnollHack%20vs.%20Pathos%20vs.%20NetHack/us-flag.webp" alt="US Flag" height="13" /> English only | <img src="/uploads/GnollHack%20vs.%20Pathos%20vs.%20NetHack/us-flag.webp" alt="US Flag" height="13" /> English only | Translated into multiple languages |

> ℹ️ **Note:** Proton, Valve's compatibility layer, runs most Windows games from Steam on Linux and the Steam Deck, and that is how Pathos runs there. GnollHack's Windows version does not run on Proton, and it does not need to: the native [[Linux Version]] on Steam is also the version the Steam Deck runs.

## 💡 Which One Should You Play?

GnollHack is the choice if you want NetHack's rules, interactions, and dungeon branches with a touchscreen UI, hand-drawn animated graphics, a musical score, and over 5,000 lines of human voice acting. New players can pick one of the [[difficulty levels]], play without permadeath in [[Modern Mode]] or [[Casual Mode]], and ask the in-game [[AI advisor|Gnoll Overseer]] instead of switching to a wiki; [[Starting Guide for Beginners]] covers the first steps. NetHack veterans get ARPG-style mythic loot, over 200 reagent-based spells, and more late-game content. It is free on Steam for Windows, Mac, Linux, and the Steam Deck, and you can play it with a game controller there (see [[Steam Deck Controls]]).

Pathos: NetHack Codex is lighter and faster. It is inspired by NetHack but does not ask you to learn NetHack's quirks, alignment rules, or survival hazards. Pick it for party control of several characters, co-op multiplayer, or custom campaign modules, or if you need a game in a language other than English.

Vanilla NetHack is for players who like a physical keyboard and ASCII characters in a terminal or on public SSH servers such as Hardfought, and who want to learn the 1980s original with the community wiki at hand.

For NetHack 5.0 in particular, see [[NetHack 5.0 vs. GnollHack Release 3]]. [[Roguelike Comparison]] adds Shattered Pixel Dungeon to these three.

## 📖 See Also

- **[[Comparisons to Other Games]]**

## 🔗 External Links

- **[GnollHack Official Website](https://gnollhack.com/)**
- **[NetHack Official Website](https://www.nethack.org/)**
- **[Pathos: NetHack Codex Official Website](https://pathos-game.onrender.com/)**
