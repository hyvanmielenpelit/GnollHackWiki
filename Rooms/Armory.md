> 👉 **An Armory is a special room filled with [[weapons|Weapons]] and [[armors|Armor]], guarded by military forces.**

## ℹ️ Description

An Armory is a GnollHack-specific special room designed as a military depot. It contains multiple [[weapon racks|/Items/Weapon rack]], [[chests|/Items/Chest]], and [[large boxes|/Items/Large box]] filled with [[weapons|/Weapons]] and [[armor|/Armor]]. In addition to standard equipment, it has a chance to generate a random [[artifact weapon|/Artifacts]] and a powerful boss guarding it. Atmospheric anvils are also scattered throughout the room.

## 🗺️ Generation

Armories are randomly generated starting from dungeon level 4 up to Medusa's level. The generation chance is 1 in 2 if fewer than 5 armory boxes have been created in the game so far; otherwise, it is 1 in 6. The room is always lit and has entering sound effects (`SFX_ENTER_ARMORY`).

## 📦 Contents

Every square in an Armory has a 1 in 20 chance to contain an anvil dungeon feature. The room contains several containers ([[chests|/Items/Chest]], [[large boxes|/Items/Large box]], and [[weapon racks|/Items/Weapon rack]]) containing random [[weapons|/Weapons]] and [[armor|/Armor]]. 

These container items are marked with the `no_pickup` flag, meaning the containers themselves cannot be picked up or moved. Underneath one of the primary [[chests|/Items/Chest]] is a hidden engraving of `Gilthoniel` (or `Morgoth` if the room is generated in Gehennom).

### 🗡️ Special Artifact Weapon

If a level-based chance (`depth * 1.5%`) is successful, one of the [[boxes|/Items/Large box]] in the Armory will contain a random [[artifact weapon|Artifacts]].

## 👹 Monsters and Bosses

Monsters in the Armory are generated awake and angry. The monster density depends on depth:
- Above the Oracle: 1 monster in every 12 squares.
- Below Medusa: 1 monster in every square.
- In-between: 1 monster in every 2 squares.

If an [[artifact weapon|Artifacts]] is generated in the Armory, a boss monster will spawn at the center of the room. The boss and surrounding monsters are determined by the player's alignment and race:
- **Chaotic Characters:** Inhabited by dwarves and gnomes. The boss is a [[dwarf king|/Monsters/Dwarf]].
- **Non-Chaotic Characters (Non-Gnoll):** Inhabited by goblins and gnolls. The boss is a [[gnoll king|/Monsters/Gnoll]].
- **Other Characters:** Inhabited by human soldiers. The boss is a [[sergeant|/Monsters/Sergeant]], [[lieutenant|/Monsters/Lieutenant]], or [[captain|/Monsters/Captain]] depending on difficulty.
- **Yeenaghu's Level:** If generated on Yeenaghu's level, the boss is replaced by Yeenaghu's minions.
- **Deep Levels (Medusa and below):** Generates soldiers and standard barracks squads.
