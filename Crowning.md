![Crowning](/uploads/Crowning/crowning.webp)

> 👉 **Crowning is a unique, one-time event in GnollHack where a deity blesses an exceptionally faithful and lucky character, granting them a special title, a suite of permanent intrinsics, a powerful gift and an extra weapon skill slot.**

## Crowning Requirements

To be crowned by their deity, a character must satisfy the following absolute prerequisites during prayer:

* **Maximum Alignment**: The character's alignment record must be exactly **20** (Pious status).
* **Not Yet Crowned**: Crowning is a one-time event per character.
* **High Luck**: Luck must be at least **+10** (or **+6** if the player already possesses all other intrinsic divine gifts: Telepathy, Speed, Stealth, and maximum divine protection).

### Crowning Chances

The probability of being crowned depends heavily on whether the character has any **troubles** (such as being hungry, low on health, or afflicted with status conditions) when praying. 

#### Scenario 1: Character has NO troubles

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

#### Scenario 2: Character HAS troubles

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

## Intrinsics Granted

Crowning permanently grants the character the following intrinsics (acquired via divine favor):

* See invisible
* Fire resistance (Weak, 50%)
* Cold resistance (Weak, 50%)
* Shock resistance (Weak, 50%)
* Poison resistance
* Sleep resistance
* Death resistance
* Lycanthropy resistance
* Fear resistance

## Additional Side Effects

* **Skill Credit**: Grants 1 extra weapon skill slot/credit.
* **Weapon Skill Unrestriction**: Unrestricts the weapon skill of the gifted weapon.
* ⚠️ **Permanent Prayer Timeout Increase**: As a negative side effect, the crowning increases subsequent prayer timeouts significantly, by a random amount of up to 1000 turns (500 turns for [[Priests|/Roles/Priest]]).

## Crowning Titles

Crowned characters receive a special title depending on their alignment:

* **Lawful**: The Hand of Elbereth
* **Neutral**: The Envoy of Balance
* **Chaotic**: The Glory of Arioch

## Crowning Gifts by Role

### Archaeologist

* Sickness resistance (intrinsic, helpful against mummy rot).
* **Lawful** or **Neutral**: [[/Artifacts/The Holy Grail]] (if it does not exist yet).

### Barbarian, Caveman, Healer, Ranger, Rogue, Samurai

* **Lawful**:
  * If the character is wielding [[/Artifacts/The Katana of Masamune]], it is blessed and its enchantment is increased by +1 to +3.
  * Otherwise, if [[/Artifacts/The Katana of Masamune]] does not exist yet, they are gifted it.
  * Otherwise, if the character is wielding a non-artifact long sword with a base value of less than 2000, it is transformed into [[/Artifacts/Excalibur]] (provided it does not exist yet).
  * Otherwise, they are gifted a blessed, erodeproof, +2 to +5 Celestial silver long sword (or standard long sword if the character's race is silver-hating) with a fire enchantment and a random mythic prefix and suffix.
  * Unrestricts the [[/Skills/Sword]] skill.
* **Neutral**:
  * If the character is wielding [[/Artifacts/Vorpal Blade]], it is blessed and its enchantment is increased by +1 to +3.
  * Otherwise, if [[/Artifacts/Vorpal Blade]] does not exist yet, they are gifted it.
  * Otherwise, they are gifted a blessed, erodeproof, +2 to +5 Primordial long sword with a random mythic prefix and suffix.
  * Unrestricts the [[/Skills/Sword]] skill.
* **Chaotic**:
  * If the character is wielding their chaotic crowning gift artifact, it is blessed and its enchantment is increased by +1 to +3.
  * Otherwise, they are gifted their chaotic crowning gift artifact (if it does not exist yet). The gift is:
    * [[/Artifacts/Howling Flail]] for **Gnolls** (if it does not exist yet).
    * [[/Artifacts/Stormbringer]] for non-Gnolls (or if [[/Artifacts/Howling Flail]] already exists), and it does not exist yet.
    * [[/Artifacts/Mournblade]] if [[/Artifacts/Stormbringer]] already exists.
  * Otherwise, if the chosen artifact already exists, they are gifted a blessed, erodeproof, +2 to +5 Infernal long sword with a random mythic prefix and suffix.
  * Unrestricts the relevant weapon skill ([[/Skills/Flail]] or [[/Skills/Sword]]) and [[/Skills/Dual wielding]] if the gift is Stormbringer or Mournblade.

### Knight

* **Lawful**:
  * [[/Artifacts/Rhongomyniad]] (if it does not exist yet).
  * If [[/Artifacts/Rhongomyniad]] already exists, [[/Artifacts/The Holy Grail]] (if it does not exist yet).
  * Unrestricts the [[/Skills/Thrusting weapon]] skill.
  * Gifted a tame, saddled [[/Monsters/Ki-rin]] (if pets are allowed).
* **Neutral**:
  * Gifted a tame, saddled [[/Monsters/Roc]] (if pets are allowed).
* **Chaotic**:
  * Gifted a tame, saddled [[/Monsters/Gorgon]] (if pets are allowed).

### Monk

* [[/Artifacts/The Gauntlets of Yin and Yang]] (if they do not exist yet).
* If the gauntlets already exist, they are gifted a blessed belt instead:
  * [[/Items/Belt of storm giant strength]] (if they do not carry one yet).
  * [[/Items/Belt of fortitude]] (if they already carry a Belt of Storm Giant Strength).

### Priest

Gifted a [[/Items/Golden chest]] containing alignment-themed gear:

* **Lawful**: [[/Items/Gown of the Archbishops]] (blessed, +1 to +3, erodeproof), a blessed +1 to +3 erodeproof Mace of Banishment (with *Banishment* mythic suffix), [[/Items/Spellbooks/Spellbook of Obliterate]], [[/Items/Spellbooks/Spellbook of Holy Word]], and one random spellbook from: [[/Items/Spellbooks/Spellbook of Summon Gold Dragon]], [[/Items/Spellbooks/Spellbook of Divine Mount]], or [[/Items/Spellbooks/Spellbook of Heavenly Army]].
* **Neutral**: [[/Items/Robe of Magic Resistance]] (blessed, +1 to +3, erodeproof), [[/Items/Staff of Life]] (blessed, +1 to +3, erodeproof), [[/Items/Bracers of Reflection]] (blessed, +1 to +3, erodeproof), [[/Items/Spellbooks/Spellbook of Gaze of Petrification]], [[/Items/Spellbooks/Spellbook of Stick to Boa]], and [[/Items/Spellbooks/Spellbook of Summon Elder Treant]].
* **Chaotic**: [[/Items/Robe of Magic Resistance]] (blessed, +1 to +3, erodeproof), a blessed +1 to +3 erodeproof Mace of the Witch-King (with *Witch-King's* mythic prefix), a blessed [[/Items/Ring of the Serpent God]], [[/Items/Spellbooks/Spellbook of Finger of Death]], [[/Items/Spellbooks/Spellbook of Create Dracolich]] (or [[/Items/Spellbooks/Spellbook of Create Elder Dracolich]] if they already know the former), and [[/Items/Spellbooks/Spellbook of Greater Undeath Replenishment]].

### Tourist

Gifted a tame [[/Monsters/Giant Luggage]] (summoned in a puff of smoke, if pets are allowed and Giant Luggage is not extinct) carrying:

* Blessed [[/Items/Eyeglasses of X-ray vision]] (or [[/Items/Ring of X-ray vision]] if the player already carries eyeglasses; if they carry either, it is blessed instead).
* Blessed [[/Items/Speed boots]] (or [[/Items/Gloves of haste]] if they already carry speed boots; if they carry either, they are blessed, enchanted by +1 to +3, and upgraded to Elite quality).
* Blessed [[/Items/Wings of flying]] (if not carrying them; otherwise blessed).
* Blessed [[/Items/Robe of eyes]] (if they got fewer than 3 of the above items in the luggage due to already carrying them).
* 20 blessed, erodeproof, lightning-enchanted [[darts|/Items/Dart]] (+3 to +5) of alignment-themed quality (Celestial for Lawful, Primordial for Neutral, Infernal for Chaotic, Elite otherwise).

### Valkyrie

Gifted a blessed, erodeproof, +2 to +5 weapon (a Dwarvish Axe if they are a Dwarf, or a Long Sword otherwise) with customized attributes:

* **Lawful**: Celestial quality, silver material (for long sword, if not silver-hating) or mithril (for Dwarvish axe), fire-enchanted, with mythic prefix *Asgardian* and suffix *Giant Slaying*.
* **Neutral**: Primordial quality, lightning-enchanted, with mythic prefix *Asgardian* and suffix *Giant Slaying*.
* **Chaotic**: Infernal quality, cold-enchanted, with mythic prefix *Jotunheimian*.
* Unrestricts [[/Skills/Axe]] skill (if dwarf) or [[/Skills/Sword]] skill (if non-dwarf).
* Gifted a tame, saddled [[/Monsters/Pegasus]] (if pets are allowed).

### Wizard

Gifted a [[/Items/Golden chest]] containing:

* [[/Items/Robe of the Archmagi]] (blessed, +1 to +3, erodeproof)
* [[/Items/Staff of the Magi]] (blessed, +1 to +3, erodeproof)
* Blessed [[/Items/Magic Marker]]
* [[/Items/Spellbooks/Spellbook of Greater Magic Missile]]
* [[/Items/Spellbooks/Spellbook of Wish]]
* One random high-level spellbook from: [[/Items/Spellbooks/Spellbook of Power Word Kill]], [[/Items/Spellbooks/Spellbook of Black Blade of Disaster]], or [[/Items/Spellbooks/Spellbook of Time Stop]].
