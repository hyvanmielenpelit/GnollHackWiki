![Gnoll Overseer](/uploads/Guides/Introduction%20to%20Gnoll%20Overseer/gnoll-overseer-avatar-frame-256x256-q85.webp)

> 👉 **The Gnoll Overseer is built into GnollHack, so it reads your actual game and checks its answers against the game's own data and source code instead of guessing from a picture of the screen.**

## 🎯 The Claim

Sound Mind Games, the developer of GnollHack, calls the [[/Gnoll Overseer]] one of the most advanced AI game advisors in the world. The claim rests on five things the Overseer does:

- It reads the state of your game from the game itself, not from a screenshot.
- It looks answers up in the game's data, its source code, and two wikis before it replies.
- It reads the records of your past games, and of other players' games.
- It holds spoilers back until you allow them.
- Every AI model it offers has first been tested for accuracy with a benchmark built for this game.

Each of these is described below, followed by a comparison with the best-known AI gaming assistants and a list of [[where other assistants are ahead|#where-other-assistants-are-ahead]].

## 🎮 It Reads Your Game, Not Your Screen

Most AI gaming assistants are made by companies that did not make the game you are playing. They work from the outside: they capture the screen and work out from the image what is going on, so they know what is drawn at that moment and nothing more.

The Overseer is part of GnollHack. When you open it during play, the game writes a snapshot of its own state:

- Your character, status, hunger, and prayer status.
- The map, with a legend of notable positions and creatures, and an overview of the dungeon.
- Your inventory with weights, including what is inside your containers.
- Your pets, skills, spells, discoveries, and conducts.
- The latest messages. During the chat, the Overseer can also ask the game for the full message history or for a fresh snapshot.

In GnollHack, the fact that decides a fight is often not on the screen at all: what is in your bag, which items you have identified, whether it is safe to pray. If you are cornered and low on health, the Overseer can go through your inventory for a way out, such as a [[/Items/wand of teleportation]] or a [[/Items/scroll of earth]], without you listing what you carry.

You stay in control of this. **Send Game Context** and **Client Data Access** in the game's [[Settings|/Settings#gnoll-overseer-settings]] turn the snapshot and the other device data off.

## 🔍 It Looks Things Up Before It Answers

A general AI chatbot answers from what it remembers from its training. For a game with as many rules as GnollHack, that memory is often wrong, or right for NetHack and wrong for GnollHack.

The Overseer has 31 tools, 20 on its server and 11 on your device, and it is instructed to use them before it answers. With them it can:

- Look up the exact stats, resistances, and attacks of any monster, and the properties of any item or artifact, in the game's own data.
- Search and read the GnollHack Wiki and the NetHack Wiki.
- Read the source code of GnollHack and NetHack to settle how a mechanic really works, such as a spellcasting success rate or a prayer timeout.
- Check the game's GitHub repositories for recent changes and bug fixes.
- Hand a large research task to one of three specialist helpers: the Wiki Researcher, the Source Investigator, or the Game Data Analyst. They are off by default.

The Overseer is also told to say so when it cannot find or verify something, instead of guessing. The full list of tools is in the [[/Guides/Advanced Guide to Gnoll Overseer]].

## 📈 It Learns From Games Already Played

In the GnollHack app, the Overseer can read your score log and the dumplogs of your past characters straight from the device. You can ask it why your last character died, or which mistakes keep coming back across your last three games.

It can also search the recent dumplogs of all players on the server, so its advice can draw on how other characters are actually dying and winning.

## 🤫 It Keeps Your Surprises

Part of GnollHack is finding things out yourself, and an advisor that knows everything could ruin that. The Overseer sorts what it knows into three groups:

- Core mechanics, such as how armor class or encumbrance works, are always explained.
- Item identities, monster abilities, and artifact powers are revealed only when it has verified that you have already met or learned them.
- Future dungeon branches, bosses you have not met, and puzzle solutions are withheld.

Spoilers are off by default, and asking is not permission: the Overseer keeps a spoiler hidden until you turn on **Allow Spoilers** in the settings.

## 🧪 Its Advice Is Tested Before You Get It

In a permadeath game, one confident wrong answer can end a character that took days to build. Before an AI model is offered in the Overseer, it has to pass [[/GnollBench]], the Overseer's own benchmark:

- In a normal benchmark run, the model answers 18 or 36 questions about GnollHack with the same instructions and the same lookup tools as the real chat.
- Two AI graders from two different AI providers mark every answer against an answer key, without seeing each other's marks.
- Accuracy counts for more than completeness, conciseness, and readability together.
- An answer that confidently states something false and dangerous, such as that a [[/Monsters/cockatrice]] is safe to hit bare-handed, can score at most 25 out of 100, however good the rest of it is.
- An honest "I could not verify this" scores at least 50, so a model gains nothing by bluffing.

The results decide which models are offered, and failed questions show the developers which wiki page or tool needs fixing.

GnollBench has limits, and they are stated openly. It is run by the Overseer's own developers, its graders are AIs, its standard suite is small, and only an executive summary of preliminary results has been published. The method itself is public: [[/Guides/Introduction to GnollBench]] explains it, and [[/Guides/Comparison of GnollBench and Popular AI Benchmarks]] sets it beside the public benchmarks.

## 🔓 Free, Optional, and Open

- **Free and opt-in:** The Overseer costs nothing with the system models and never interrupts the game. It stays in the menu until you open it, and you can play without it entirely.
- **Your choice of model:** The system models come from Anthropic, Google, and OpenAI. You can also add your own API key from any of the three, which is stored encrypted. See [[/Guides/Choosing AI Model for Gnoll Overseer]].
- **Three privacy modes:** A chat can be Standard, Confidential (stored encrypted, with internet tools off), or Incognito (never saved). See [[/Guides/Chat Confidentiality Modes in Gnoll Overseer]].
- **Open source:** The game, the Overseer, and GnollBench are open source, so everything said here can be checked in the code.
- **The AI stays in the advisor:** GnollHack's own graphics, music, and voices are made by people, and the [[/AI Usage Policy]] rules out generative AI assets in the game.

## 🆚 How It Compares

The best-known AI gaming assistants come from large technology companies and are built to work with many games at once.

| | Gnoll Overseer | Gaming Copilot | Play Games Sidekick | Project G-Assist | Razer AVA |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Made by** | Sound Mind Games | Microsoft | Google | NVIDIA | Razer |
| **Where it runs** | Inside GnollHack, and on the web | Windows Game Bar and the Xbox mobile app | An overlay on selected Android games from Google Play | The NVIDIA app on PCs with a GeForce RTX graphics card | A desk device or on-screen character connected to a Windows PC; not released yet |
| **How it sees your game** | A snapshot of the game state, written by the game | Screenshots of the game, in Voice Mode | Screen sharing with Gemini Live | Performance and settings data from the PC | Reads the screen in PC Vision Mode |
| **What it advises on** | GnollHack's rules and tactics, and your past games | The game being played, plus your Xbox account, play history, and achievements | The game being played | PC tuning, such as graphics settings and performance; not gameplay | Game coaching and everyday assistant tasks |
| **Games covered** | One | Many | Selected Play Store games | Not tied to a game | Many |
| **Voice** | ❌ No, text chat | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |

An assistant built into a game by its own developer is not unique to GnollHack either. Tencent describes AI teammates and a gameplay companion for Honor of Kings that analyze live matches and give tips during play.

In the public descriptions of these assistants, the developers found none that reads the game's source code to answer a player's question, none that holds back spoilers according to what the player has discovered, and none whose answers are tested with a benchmark whose method is published. Those three, together with the full game snapshot, are what the Overseer's claim stands on.

## ⚖️ Where Other Assistants Are Ahead

- **Voice:** Gaming Copilot, Play Games Sidekick, Project G-Assist, and Razer AVA can all be spoken to. The Overseer is a text chat.
- **Many games:** Gaming Copilot and Play Games Sidekick follow you from game to game. The Overseer knows GnollHack and NetHack, and nothing else.
- **Offline use:** Project G-Assist runs a small AI model on the PC's own graphics card. The Overseer needs an internet connection and a [[/GnollHack Account]], and your messages are sent to an AI provider to be answered.
- **Characters:** Razer AVA is designed as an animated 3D character on your desk. The Overseer has an avatar in a chat window.

The Overseer has limits of its own as well. The free system models can have usage limits, it cannot perform actions in the game for you, and it is still an AI: its sources and its testing make wrong answers rarer, not impossible.

## 💡 Summary

Stated without any qualification, "the world's most advanced AI game advisor" cannot be proven. Nobody has tested every assistant, and several are ahead in voice, in the number of games they cover, or in offline use.

In a narrower form, the claim holds against everything the developers have found: For advice inside a single game, they know of no other AI advisor that reads the whole game state from the game, checks its answers against the game's source code, protects the player from spoilers, and is tested for accuracy before a model reaches players. If you know of one, the developers would like to hear about it through [[/Contact Information]].

The quickest test is your own game. The next time your character is in trouble, open the Overseer from the game menu and ask what your options are; [[/Guides/Introduction to Gnoll Overseer]] shows how to get started.

## 📖 Learn More

- [[/Gnoll Overseer]] — All Gnoll Overseer guides in one place.
- [[/Guides/Technological Overview of Gnoll Overseer]] — The architecture, tools, and privacy framework in detail.

## 🔗 External Links

- [Gnoll Overseer](https://overseer.gnollhack.com) — The Overseer on the web.
- [GnollHack Repository](https://github.com/hyvanmielenpelit/GnollHack) — The source code of the game.
- [MobileGnollHackLogger Repository](https://github.com/hyvanmielenpelit/MobileGnollHackLogger) — The source code of the Overseer and GnollBench.
- [Gaming Copilot (Beta) on Game Bar](https://news.xbox.com/en-us/2025/08/06/gaming-copilot-beta-begins-rolling-out-to-xbox-insiders-on-game-bar-today/) — Microsoft's announcement on Xbox Wire.
- [Play Games Sidekick](https://9to5google.com/2025/09/23/play-games-sidekick-gemini-live/) — 9to5Google's report on Google's overlay.
- [Project G-Assist](https://www.nvidia.com/en-us/software/nvidia-app/g-assist/) — NVIDIA's product page.
- [Razer AVA](https://www.razer.com/razer-ava) — Razer's product page.
- [TiMi Studio Group and Honor of Kings](https://www.tencentcloud.com/customers/detail/3565) — Tencent Cloud's description of the game's AI features.

## 📅 Validity

As of November 10, 2026.
