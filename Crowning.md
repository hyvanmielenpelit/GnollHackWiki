![Crowning](/uploads/Crowning/crowning.webp)

> 👉 **Crowning is a unique, one-time event in GnollHack where a deity blesses an exceptionally faithful and lucky character, granting them a special title, a suite of permanent intrinsics, a powerful gift and an extra weapon skill slot.**

## 📋 Crowning Requirements

To be crowned by their deity, a character must satisfy the following absolute prerequisites during prayer:

- **Maximum Alignment**: The character's alignment record must be exactly **20** (Pious status).
- **Not Yet Crowned**: Crowning is a one-time event per character.
- **High Luck**: Luck must be at least **+10** (or **+6** if the player already possesses all other intrinsic divine gifts: Telepathy, Speed, Stealth, and maximum divine protection). The game determines the favor received by generating a random number according to the formula:
  
  $$ \text{Result} = \text{random}\left(0, \lfloor \frac{\text{Luck} + 6}{2} \rfloor - 1\right) $$
  
  If the result is 7 or 8 (or 5 if all other gifts are maxed), the character is crowned.

### 📈 Crowning Chances

The probability of being crowned depends heavily on whether the character has any **troubles** (such as being hungry, low on health, or afflicted with status conditions) when praying. 

#### 🟢 Scenario 1: Character has NO troubles

If the character prays while completely healthy and unburdened by problems, they bypass the deity's troubleshooting logic entirely. In this scenario, **an altar is not required**, and the character has the highest possible chance of being crowned:

| Luck | Base Chance | Chance (All Gifts Maxed)* |
| :--: | :---------: | :-----------------------: |
| **+13** | 22.2% | 33.3% |
| **+12** | 22.2% | 33.3% |
| **+11** | 12.5% | 25.0% |
| **+10** | 12.5% | 25.0% |
| **+9** | 0% | 14.3% |
| **+8** | 0% | 14.3% |
| **+7** | 0% | 16.7% |
| **+6** | 0% | 16.7% |
| **≤ +5** | 0% | 0% |

*\* The character already possesses intrinsic Telepathy, Speed, Stealth, and maximum divine protection.*
> ℹ️ **Note:** The probability of crowning with all gifts maxed paradoxically **drops** when your Luck increases from +7 to +8 (from 16.7% down to 14.3%). This is a quirk of the game's internal random number generator logic.

#### 🟡 Scenario 2: Character HAS troubles

If the character has troubles (e.g., they are wounded or hungry), praying will typically just fix those troubles. To have a chance at crowning while having troubles, **the character must be on a co-aligned altar**. Praying without an altar when in trouble has a **0%** chance of crowning.

Being on an altar inside a temple (a **shrine**) slightly increases the odds over a non-temple altar.

| Luck | Base Chance (Altar) | Base Chance (Shrine) | Chance (All Gifts Maxed)* (Altar) | Chance (All Gifts Maxed)* (Shrine) |
| :--: | :-----------------: | :------------------: | :-------------------------------: | :--------------------: |
| **+13** | 16.7% | 17.0% | 25.0% | 25.5% |
| **+12** | 16.3% | 16.7% | 24.4% | 25.0% |
| **+11** | 8.9% | 9.2% | 17.9% | 18.3% |
| **+10** | 8.7% | 8.9% | 17.3% | 17.9% |
| **+9** | 0% | 0% | 9.5% | 9.9% |
| **+8** | 0% | 0% | 9.1% | 9.5% |
| **+7** | 0% | 0% | 10.0% | 10.6% |
| **+6** | 0% | 0% | 9.3% | 10.0% |
| **≤ +5** | 0% | 0% | 0% | 0% |

*\* The character already possesses intrinsic Telepathy, Speed, Stealth, and maximum divine protection.*
> ℹ️ **Note:** The probability of crowning with all gifts maxed paradoxically **drops** when your Luck increases from +7 to +8 (e.g., from 10.6% down to 9.5% on a shrine). This is a quirk of the game's internal random number generator logic.

## 🧬 Intrinsics Granted

Crowning permanently grants the character the following intrinsics (acquired via divine favor):

- See invisible
- Fire resistance (Weak, 50%)
- Cold resistance (Weak, 50%)
- Shock resistance (Weak, 50%)
- Poison resistance
- Sleep resistance
- Death resistance
- Lycanthropy resistance
- Fear resistance

## ⚠️ Additional Side Effects

| Effect | Description |
| :--- | :--- |
| **Skill Credit** | Grants 1 extra weapon skill slot/credit. |
| **Weapon Skill Unrestriction** | Unrestricts the weapon skill of the gifted weapon. |
| ⚠️ **Permanent Prayer Timeout Increase** | As a negative side effect, the crowning increases subsequent prayer timeouts significantly, by a random amount of up to 1000 turns (500 turns for a [[/Roles/Priest]]). |

## 👑 Crowning Titles

Crowned characters receive a special title depending on their alignment:

| Alignment | Title |
| :--- | :--- |
| **Lawful** | The Hand of Elbereth |
| **Neutral** | The Envoy of Balance |
| **Chaotic** | The Glory of Arioch |

## ✨ Crowning Gifts by Role

### 🏺 Archaeologist

| Alignment | Gift |
| :--- | :--- |
| **All** | Sickness resistance (intrinsic, helpful against mummy rot) |
| **Lawful** or **Neutral** | [[/Artifacts/The Holy Grail]] (if it does not exist yet) |

### ⚔️ Barbarian, Caveman, Healer, Ranger, Rogue, Samurai

| Alignment | Gift Logic (in order of priority) | Unrestricted Skill(s) |
| :--- | :--- | :--- |
| **Lawful** | 1. Bless/enchant wielded **The Katana of Masamune**<br>2. Gift **The Katana of Masamune**<br>3. Transform wielded long sword to **Excalibur**<br>4. Gift Celestial silver long sword (+2 to +5, fire, mythic) | [[/Skills/Sword]] |
| **Neutral** | 1. Bless/enchant wielded **Vorpal Blade**<br>2. Gift **Vorpal Blade**<br>3. Gift Primordial long sword (+2 to +5, mythic) | [[/Skills/Sword]] |
| **Chaotic** | 1. Bless/enchant wielded chaotic artifact<br>2. Gift chaotic artifact (**Howling Flail** for Gnolls; **Stormbringer** or **Mournblade** for others)<br>3. Gift Infernal long sword (+2 to +5, mythic) | [[/Skills/Flail]] or [[/Skills/Sword]], and [[/Skills/Dual wielding]] (if Stormbringer/Mournblade) |

> ℹ️ **Note:** The **Caveman** also receives a tame, saddled [[/Monsters/Tyrannosaurus rex]] (if pets are allowed), regardless of alignment.

### 🛡️ Knight

| Alignment | Artifact Gift | Steed Gift | Unrestricted Skill |
| :--- | :--- | :--- | :--- |
| **Lawful** | 1. [[/Artifacts/Rhongomyniad]]<br>2. [[/Artifacts/The Holy Grail]] | Tame, saddled [[/Monsters/Ki-rin]] | [[/Skills/Thrusting weapon]] |
| **Neutral** | - | Tame, saddled [[/Monsters/Roc]] | - |
| **Chaotic** | - | Tame, saddled [[/Monsters/Gorgon]] | - |

### 🥋 Monk

| Primary Gift | Fallback Gift (if primary already exists) |
| :--- | :--- |
| [[/Artifacts/The Gauntlets of Yin and Yang]] | [[/Items/Belt of storm giant strength]] (or [[/Items/Belt of fortitude]]) |

### ⛪ Priest

Gifted a [[/Items/Golden chest]] containing alignment-themed gear:

| Alignment | Contents of Golden chest |
| :--- | :--- |
| **Lawful** | • [[/Items/Gown of the Archbishops]]<br>• Mace of Banishment<br>• [[/Items/Spellbooks/Spellbook of Obliterate]]<br>• [[/Items/Spellbooks/Spellbook of Holy Word]]<br>• 1 random spellbook (Summon Gold Dragon, Divine Mount, or Heavenly Army) |
| **Neutral** | • [[/Items/Robe of Magic Resistance]]<br>• [[/Items/Staff of Life]]<br>• [[/Items/Bracers of Reflection]]<br>• [[/Items/Spellbooks/Spellbook of Gaze of Petrification]]<br>• [[/Items/Spellbooks/Spellbook of Stick to Boa]]<br>• [[/Items/Spellbooks/Spellbook of Summon Elder Treant]] |
| **Chaotic** | • [[/Items/Robe of Magic Resistance]]<br>• Mace of the Witch-King<br>• [[/Items/Ring of the Serpent God]]<br>• [[/Items/Spellbooks/Spellbook of Finger of Death]]<br>• [[/Items/Spellbooks/Spellbook of Create Dracolich]] (or Create Elder Dracolich)<br>• [[/Items/Spellbooks/Spellbook of Greater Undeath Replenishment]] |

### 📸 Tourist

Gifted a tame [[/Monsters/Giant Luggage]] (summoned in a puff of smoke, if pets are allowed and Giant Luggage is not extinct) carrying:

| Item Category | Primary Gift | Fallback Gift |
| :--- | :--- | :--- |
| **Vision** | Blessed [[/Items/Eyeglasses of X-ray vision]] | Blessed [[/Items/Ring of X-ray vision]] |
| **Speed** | Blessed [[/Items/Speed boots]] | Blessed, +1 to +3 Elite [[/Items/Gloves of haste]] |
| **Flight** | Blessed [[/Items/Wings of flying]] | - |
| **Cloak** | Blessed [[/Items/Robe of eyes]] (if fewer than 3 of the above items received) | - |
| **Weapon** | 20 alignment-themed, lightning-enchanted [[/Items/Dart]]s (+3 to +5) | - |

### ⚡ Valkyrie

Gifted a blessed, erodeproof, +2 to +5 weapon (a Dwarvish Axe if they are a Dwarf, or a Long Sword otherwise) with customized attributes:

| Alignment | Weapon Gift |
| :--- | :--- |
| **Lawful** | Celestial silver/mithril weapon (fire, *Asgardian*, *Giant Slaying*) |
| **Neutral** | Primordial weapon (lightning, *Asgardian*, *Giant Slaying*) |
| **Chaotic** | Infernal weapon (cold, *Jotunheimian*) |

> ℹ️ **Note:** The **Valkyrie** also receives a tame, saddled [[/Monsters/Pegasus]] (if pets are allowed) and unrestricts the [[/Skills/Axe]] skill (if a Dwarf) or [[/Skills/Sword]] skill (otherwise), regardless of alignment.

### 🪄 Wizard

Gifted a [[/Items/Golden chest]] containing:

- [[/Items/Robe of the Archmagi]] (blessed, +1 to +3, erodeproof)
- [[/Items/Staff of the Magi]] (blessed, +1 to +3, erodeproof)
- Blessed [[/Items/Magic Marker]]
- [[/Items/Spellbooks/Spellbook of Greater Magic Missile]] (if not already known)
- [[/Items/Spellbooks/Spellbook of Wish]] (if not already known)
- One random high-level spellbook (if not all are already known) from: [[/Items/Spellbooks/Spellbook of Power Word Kill]], [[/Items/Spellbooks/Spellbook of Black Blade of Disaster]], or [[/Items/Spellbooks/Spellbook of Time Stop]].
