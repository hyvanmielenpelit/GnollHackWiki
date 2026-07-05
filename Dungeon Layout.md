![Dungeon Layout](/uploads/Dungeon%20Layout/dungeon-layout-q85.webp)

The dungeon in GnollHack consists of a main sequence of levels known as the [[/Dungeon/The Dungeons of Doom]], which extends from the surface down to the gateway of [[/Dungeon/Gehennom]]. Along the way, brave adventurers will discover numerous **branches** and **special levels**.

Branches are multi-level sub-dungeons that diverge from the main path. They often feature unique tilesets, specific enemy types, and special rules. Special levels are distinct, single levels that appear within the branches above. They usually have a fixed layout or guaranteed features.

## ⚔️ The Dungeons of Doom

**[[/Dungeon/The Dungeons of Doom]]** is the primary trunk of the game, spanning 24 to 25 levels.

### 🔀 Dungeon Branches

| Branch | Level Range | Description |
| :----- | :---------: | :---------- |
| **[[/Dungeon/The Gnomish Mines]]** | 2–4 | A cavern system filled with gnomes and dwarves. Contains special levels like [[/Dungeon/Mine Town]]. |
| **[[/Dungeon/Sokoban]]** | 6–8 | A puzzle branch where you must push boulders into pits. |
| **[[/Dungeon/The Quest]]** | 11–14 | A role-specific quest branch. *Message: "You receive a faint telepathic message from..." (followed by a message from your Quest Leader).* |
| **[[/Dungeon/Fort Ludios]]** | 12–20 | A hidden fortress guarded by soldiers and [[/Monsters/Croesus]]. The portal is found in a vault. |
| **[[/Dungeon/Gehennom]]** | 24–25 | The fiery underworld. It is the second major half of the game, filled with demons. |
| **[[/Dungeon/The Elemental Planes]]** | 1 | Accessed by ascending the staircase up on the dungeon level 1 after acquiring the [[/Items/Amulet of Yendor]]. It leads to the endgame featuring the Planes of Earth, Air, Fire, Water, and the Astral Plane. |

### 🚩 Special Levels

| Special Level | Level Range | Description |
| :------------ | :---------: | :---------- |
| **[[/Dungeon/Delphi]]** | 5–7 | Home to the [[/Monsters/Oracle]], who provides minor and major consultations. |
| **[[/Dungeon/Big Room]]** | 10–12 | A massive, open single-room level filled with monsters. |
| **[[/Dungeon/Treasure Island]]** | 14–17 | A treasure trove with a water moat. New in GnollHack. |
| **[[/Dungeon/Medusa's Island]]** | 22–23 | A water-filled cavern housing [[/Monsters/Medusa]]. |
| **[[/Dungeon/Minotaur Maze]]** | 23–24 | A maze-like level with a [[/Monsters/minotaur]]. Redesigned in GnollHack. |
| **[[/Dungeon/Underground Castle]]** | 24–25 | The heavily fortified gateway to Gehennom, containing a [[/Items/wand of wishing]]. |

## ⛏️ The Gnomish Mines

### 🔀 Dungeon Branches

| Branch | Level Range | Description |
| :----- | :---------: | :---------- |
| **[[/Dungeon/The Large Circular Dungeon]]** | 4–6 | A high-tech dungeon involving quantum mechanics, accessible via a portal located below the [[/Dungeon/Mine Town]]. New in GnollHack. |

### 🚩 Special Levels

| Special Level | Level Range | Description |
| :------------ | :---------: | :---------- |
| **[[/Dungeon/Mine Town]]** | 3–4 | A bustling subterranean town with shops, a temple, and guards. |
| **[[/Dungeon/Mines' End]]** | 8–9 | The deepest part of the mines, containing the [[/Artifacts/The Gladstone]]. |

## 🔥 Gehennom

### 🔀 Dungeon Branches

| Branch | Level Range | Description |
| :----- | :---------: | :---------- |
| **[[/Dungeon/Plane of the Modron]]** | 3–4 | A geometric plane inhabited by Modrons. New in GnollHack. |
| **[[/Dungeon/Hellish Pastures]]** | 8–13 | A hidden cow level filled with demonic bovines. New in GnollHack. |
| **[[/Dungeon/Vlad's Tower]]** | 9–13 | A dark, undead-filled tower containing the [[/Artifacts/Candelabrum of Invocation]]. |

### 🚩 Special Levels

| Special Level | Level Range | Description |
| :------------ | :---------: | :---------- |
| **[[/Dungeon/Valley of the Dead]]** | 1 | A sprawling graveyard that transitions the player from the Dungeons of Doom to Gehennom. |
| **[[/Dungeon/Dis]]** | 2 | The iron city ruled by [[/Monsters/Dispater]]. |
| **[[/Dungeon/Maladomini]]** | 4–8 | The corrupted domain of [[/Monsters/Baalzebub]], Lord of the Flies. |
| **[[/Dungeon/Jubilex's Realm]]** | 4–8 | A disgusting, swampy lair filled with acidic ooze and the Faceless Lord. |
| **[[/Dungeon/Orcus Town]]** | 5–15 | A ruined, demonic reflection of a town ruled by [[/Monsters/Orcus]]. |
| **[[/Dungeon/Wizard's Tower]]** | 10–13 | A three-level tower holding the [[/Monsters/Wizard of Yendor]] and the [[/Artifacts/Book of the Dead]]. |
| **[[/Dungeon/Fake Wizard's Towers]]** | 13–18 | Two decoy towers, one of which contains the portal to the true [[/Dungeon/Wizard's Tower]]. |
| **[[/Dungeon/Lair of Tarrasque]]** | 10–18 | The lair of the fearsome [[/Monsters/Tarrasque]]. New in GnollHack. |
| **[[/Dungeon/Yeenaghu's Domain]]** | 10–18 | The realm of the demon lord of gnolls. New in GnollHack. |
| **[[/Dungeon/Moloch's Sanctum]]** | 18–20 | The lowest level of Gehennom, housing the [[/Items/Amulet of Yendor]] and the [[/Monsters/High Priest]] of Moloch. |

## 🔗 Dungeon Placement Dependencies

In GnollHack, the exact levels where many branches and special levels appear are not entirely random. Instead, their locations are dynamically calculated relative to the placement of other key locations. This creates a chain of dependencies that guarantees a logical flow to the dungeon.

### 🔮 The Oracle as the Key Anchor

**[[/Dungeon/Delphi]]** (the Oracle's level) is one of the most critical anchor points in the early game. Its placement directly determines the locations of several other major features in the Dungeons of Doom:
- **[[/Dungeon/Sokoban]]**: The stairs leading up to Sokoban are always generated exactly 1 level below Delphi.
- **[[/Dungeon/The Quest]]**: The magic portal to your role-specific quest is always placed 6 or 7 levels below Delphi.
- **[[/Dungeon/Treasure Island]]**: This special water-filled level is always generated 9 or 10 levels below Delphi.

Because Delphi can appear anywhere from level 5 to 7, these connected locations will shift deeper or shallower in tandem with it.

### 🏰 Fixed-Range Placements

Some notable features in the Dungeons of Doom do not depend on other anchor points, but are instead confined to their own fixed depth ranges:
- **[[/Dungeon/Big Room]]**: Always generated between levels 10 and 12.
- **[[/Dungeon/Fort Ludios]]**: The portal to this hidden fortress is always placed within a vault between levels 12 and 20.

### 🧭 The Bottom of the Main Dungeon

The final levels of the Dungeons of Doom are anchored to the bottom of the branch, which spans 24 to 25 levels, creating a fixed sequence:
- **[[/Dungeon/Underground Castle]]**: Always placed on the very last level of the Dungeons of Doom.
- **[[/Dungeon/Minotaur Maze]]**: Always generated exactly 1 level above the Underground Castle.
- **[[/Dungeon/Medusa's Island]]**: Always generated exactly 2 levels above the Underground Castle.
- **[[/Dungeon/Gehennom]]**: The entrance to the underworld is directly connected to the Underground Castle. The first level of Gehennom ([[/Dungeon/Valley of the Dead]]) immediately follows the Castle.

### ⛏️ The Gnomish Mines

The Gnomish Mines branch off early in the Dungeons of Doom (between levels 2 and 4). Within the mines themselves, locations are placed relative to the branch's own structure:
- **[[/Dungeon/Mine Town]]**: Always generated on the 3rd or 4th level of the Gnomish Mines branch.
- **[[/Dungeon/The Large Circular Dungeon]]**: The portal to this high-tech branch is anchored to **[[/Dungeon/Mine Town]]**. It will always be found exactly 1 or 2 levels deeper into the mines than Mine Town itself.
- **[[/Dungeon/Mines' End]]**: Anchored to the very bottom, it is always placed on the final level of the Gnomish Mines (the branch spans 8 or 9 levels in total).

### 🔥 Gehennom

Locations in Gehennom are placed using a mix of absolute level ranges and relative positioning to the bottom. Gehennom spans between 18 and 20 levels in total:

**Anchored to the Top of Gehennom:**
- **[[/Dungeon/Valley of the Dead]]**: Always generated on the very first level of Gehennom (level 1).
- **[[/Dungeon/Dis]]**: Always generated exactly 1 level below the Valley of the Dead (level 2).
- **[[/Dungeon/Plane of the Modron]]**: The portal is always generated on level 3 or 4 of Gehennom.
- **[[/Dungeon/Maladomini]]** and **[[/Dungeon/Jubilex's Realm]]**: Always generated between levels 4 and 8 of Gehennom.
- **[[/Dungeon/Orcus Town]]**: Always generated between levels 5 and 15 of Gehennom.
- **[[/Dungeon/Hellish Pastures]]**: The portal is always generated between levels 8 and 13 of Gehennom.
- **[[/Dungeon/Vlad's Tower]]**: The stairs up to Vlad's Tower are always generated between levels 9 and 13 of Gehennom.
- **[[/Dungeon/Wizard's Tower]]**: The three levels of the Wizard's Tower are strictly chained together. The Top Level is generated between levels 10 and 11 of Gehennom. The Middle Level is always exactly 1 level below the Top Level, and the Bottom Level is exactly 2 levels below the Top Level.

**Anchored to the Bottom of Gehennom:**
- **[[/Dungeon/Moloch's Sanctum]]**: Always placed on the very last level of Gehennom.
- **[[/Dungeon/Fake Wizard's Towers]]**: The two fake towers are generated between 2 and 5 levels above the bottom of Gehennom.
- **[[/Dungeon/Lair of Tarrasque]]** and **[[/Dungeon/Yeenaghu's Domain]]**: Anchored to the bottom to guarantee they appear late in the game, generated between 2 and 8 levels above the bottom of Gehennom.
