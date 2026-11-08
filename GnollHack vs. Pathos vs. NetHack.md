> 👉 **GnollHack is a fork of NetHack 3.6.2; Pathos: NetHack Codex is a separate game, written from scratch, with NetHack's monsters and items and rules of its own.**

## ⚡ At a Glance

| Feature | NetHack | GnollHack | Pathos: NetHack Codex |
| :--- | :--- | :--- | :--- |
| **Graphics** | ASCII text or static 2D tiles | High-resolution tiles from 64x96 to 192x192 pixels, with [[animations]] | 2D tiles with animations; the Steam edition has four tile sets: two in pixel art, one semi-realistic, and one ASCII-style |
| **Audio** | NetHack 5.0 has a few sound effects (musical instruments, squeaky boards, gaining or losing a level) and no music | A [[music]] soundtrack, spatial sound effects, and over 5,000 [[voiceovers]] | Sound effects and background music, no voiceovers |
| **Help for Beginners** | A tutorial level in NetHack 5.0; for the rest, players rely on external wikis | Stats and hints in the game, and the [[Gnoll Overseer]] AI advisor | A built-in encyclopedia (the Codex) |

GnollHack and Pathos have touch interfaces with context menus, so neither needs a keyboard on a phone or tablet. NetHack has no official mobile version, and third-party ports use on-screen keyboards.

## 🧬 Fork or Rewrite

Only GnollHack runs NetHack's code. It is a direct fork of NetHack 3.6.2, so NetHack's simulation still runs under the graphics, and almost all of the interactions behind the saying "the DevTeam thinks of everything" work as they do in vanilla NetHack. The dungeon is NetHack's: the Dungeons of Doom, the Gnomish Mines, Sokoban, Vlad's Tower, your role's Quest, Gehennom, and the Elemental Planes. GnollHack keeps that depth on small screens with context menus and detailed item descriptions, and it changes combat, loot, and magic; [[How GnollHack differs from NetHack]] lists the changes.

Pathos was written from scratch by its solo developer, Callan Hodgskin, as a mobile roguelike inspired by NetHack. You will recognize monsters such as grid bugs, mind flayers, and liches, and items such as bags of holding and scrolls of identify, but the math behind them is Pathos's own, and strategies from the NetHack Wiki often do not apply. Several systems are simpler: **Karma** takes the place of NetHack's religion (see the table below), and elemental resistances are percentages instead of intrinsic and extrinsic properties. Its own engine also lets Pathos do things NetHack does not: you can control a party of up to six adventurers, play local co-op, use crafting workbenches, and play other campaign modules. The Steam edition comes with three besides NetHack Codex: the overland adventures Kaloi Opus and Dhak Legacy, and Pixel Sojourn, a tribute to Shattered Pixel Dungeon.

## ⚔️ Gameplay and Mechanics Comparison

| System | NetHack | GnollHack | Pathos: NetHack Codex |
| :--- | :--- | :--- | :--- |
| **Religion** | Lawful, neutral, and chaotic gods; altar sacrifice, prayer timeouts, and crowning gifts | NetHack's gods, altars, and prayer, plus temple services paid with gold | A single Karma resource instead of gods, prayer, and sacrifice: points gained by killing enemies and spent at shrines |
| **Spells** | About 40 spells, memorized from spellbooks, which fade from memory over time | Over 200 spells, prepared with material reagents and never forgotten | Spells learned and upgraded from spellbooks, up to 3 stars; uses mana |
| **Equipment** | Items with enchantments such as `+1` or `+2`; 14 equipment slots, among them a shirt, a quiver, two rings, and eyewear | Items with quality tiers and mythic and legendary affixes; 22 equipment slots | Crafting workbenches scrap and forge gear |
| **Identification** | Price identification, engrave-testing, and trying items out, or external spoilers | Many identification scrolls and wands, paid identification by NPCs, and detailed item stats in the game | The built-in Codex shows item pools; NPCs and shrines can identify gear |
| **Instant Deaths** | Medusa's gaze, eating a cockatrice corpse, choking on food, and being drowned by an eel kill at once; a cockatrice's hiss gives you 5 turns to cure the stoning, and tainted food 10 to 19 turns to cure the sickness | Many of these are delayed by several turns; when you are drowning, for example, you have a few turns to get back to air | ❓ Not described on its store pages |
| **Death** | Permadeath only | Permadeath in [[Classic Mode]], or resurrection at a checkpoint in [[Modern Mode]] | After a death you can choose to resurrect and continue |
| **Difficulty** | One fixed difficulty | 7 [[difficulty levels]], from *Standard* to *Grand Master* | Steam lists the game under Adjustable Difficulty; the store pages do not describe the setting |

## 💻 Platforms

GnollHack is free on every platform, Steam included, with no ads or microtransactions; see [[Download]]. Pathos is free on Android, iOS, the Microsoft Store, and its own website, which also links a version that runs in a web browser. Its Steam edition, released on November 4, 2026, costs money.

| Platform | NetHack | GnollHack | Pathos: NetHack Codex |
| :--- | :--- | :--- | :--- |
| **Android** | Unofficial ports only | ✅ Google Play | ✅ Google Play, or an APK from its website |
| **iOS (iPhone / iPad)** | Unofficial ports only, such as iNethack2 | ✅ Apple App Store | ✅ Apple App Store |
| **Windows** | ✅ Official download from `nethack.org` | ✅ Steam (free), or an MSIX package or a ZIP file from GitHub | ✅ Free on the Microsoft Store and as a desktop installer; paid on Steam |
| **macOS** | No official download for NetHack 5.0; Homebrew installs it | ✅ Native app for Apple Silicon Macs (M1 or later), free on Steam since November 2026 and as a DMG from GitHub; the iOS version from the App Store runs on these Macs too | No native app; the iPhone and iPad version from the App Store runs on Apple Silicon Macs. The Steam version is Windows-only. |
| **Linux** | No official download, but the source code builds on Linux. Many distributions' package managers may include a prebuilt binary. | ✅ Native [[Linux Version]] on Steam (free), also available as an AppImage | No native version. The Windows version on Steam (paid) runs through Proton, and a community project linked from the Pathos website runs the Windows version with Wine, as a Flatpak or through Lutris. |
| **Steam Deck** | Unofficial ports only | ✅ Native on Steam (free), with built-in [[Steam Deck Controls]] | The Windows version on Steam (paid) runs through Proton; the store page mentions controller support on the Steam Deck |
| **Web Browser** | ✅ On public servers such as NAO and Hardfought | ❌ | ✅ A browser version linked from its website |
| **Game Controllers** | ❌ None; keyboard and mouse only | ✅ A controller interface with radial menus, on-screen button hints, and controller navigation of every menu, on the Steam Deck, Windows, Linux, and macOS (not on Android or iOS) | Partial: Steam lists partial controller support, and the interface is made for touch first |
| **Cross-Device Saves** | On public servers, the game is saved on the server, so you can continue it from another device | ✅ [[Save File Transfer]] through the cloud, across Android, iOS, Linux, macOS, and Windows | Steam Cloud sync on the Steam version; local saves elsewhere |
| **Bones Sharing** | Only on public servers or with the third-party Hearse tool | ✅ Automatic cross-platform [[Bones Sharing]] with a [[GnollHack Account]] | ✅ Built-in revenant (bones) sharing |
| **Languages** | <img src="/uploads/GnollHack%20vs.%20Pathos%20vs.%20NetHack/us-flag.webp" alt="US Flag" height="13" /> English only | <img src="/uploads/GnollHack%20vs.%20Pathos%20vs.%20NetHack/us-flag.webp" alt="US Flag" height="13" /> English only | English and 15 other languages on Steam, among them Japanese, Korean, Russian, Ukrainian, and both Simplified and Traditional Chinese |

## 💡 Which One to Play

If you want NetHack's rules and dungeon but some help while you learn them, GnollHack has the easier [[difficulty levels]], [[Modern Mode]] and [[Casual Mode]] without permadeath, and the in-game [[AI advisor|Gnoll Overseer]] to ask instead of a wiki; [[Starting Guide for Beginners]] covers the first steps. NetHack players find the same dungeon there, with reworked loot and magic and more late-game content.

Pathos is the only one of the three with party play, local co-op, other campaigns, and translations. Knowing NetHack helps less there, because its rules are its own.

Vanilla NetHack is still the way to play the 1980s original on a physical keyboard, in a terminal or on public servers such as Hardfought, with the community wiki for reference.

For NetHack 5.0 in particular, see [[NetHack 5.0 vs. GnollHack Release 3]]. [[Roguelike Comparison]] adds Shattered Pixel Dungeon to these three.

## 📖 See Also

- **[[Comparisons to Other Games]]**

## 🔗 External Links

- **[GnollHack Official Website](https://gnollhack.com/)**
- **[NetHack Official Website](https://www.nethack.org/)**
- **[Pathos: NetHack Codex Official Website](https://pathos-game.onrender.com/)**

## 📅 Validity

The GnollHack details are valid for GnollHack 3.39 (4.3.0 Build 39), checked on November 8, 2026. The store listings, prices, and platforms of NetHack and Pathos were checked on the same day.
