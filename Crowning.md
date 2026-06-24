![Crowning](/uploads/Crowning/crowning.webp)

> 👉 **Crowning is a unique, one-time event in GnollHack where a deity blesses an exceptionally faithful and lucky character, granting them a special title, a suite of permanent intrinsics, a powerful gift and an extra weapon skill slot.**

## Crowning Requirements

To be crowned by their deity, a character must satisfy the following conditions during prayer:

* **Maximum Alignment**: The character's alignment record must be at the maximum value of 20.
* **High Luck**: The character must have high positive Luck. The game rolls `rn2((Luck + 6) >> 1)` to determine the favor received:
  * A result of 7 or 8 triggers crowning, which requires a Luck of at least **+10**.
  * A result of 5 can also trigger crowning if the player already possesses all other intrinsic gifts (Telepathy, Speed, Stealth, and maximum divine protection), which can occur with a Luck of at least **+6**.
* **Altar (Highly Recommended)**: The prayer is typically performed at a co-aligned altar. Although crowning is technically possible without an altar (if the character has no troubles, their alignment record is at least 14, and Luck is high enough), praying without an altar caps the prayer's value, making the crowning check much harder to satisfy and very risky.

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
  * Unrestricts the Short Sword / Long Sword skill.
* **Neutral**:
  * If the character is wielding [[/Artifacts/Vorpal Blade]], it is blessed and its enchantment is increased by +1 to +3.
  * Otherwise, if [[/Artifacts/Vorpal Blade]] does not exist yet, they are gifted it.
  * Otherwise, they are gifted a blessed, erodeproof, +2 to +5 Primordial long sword with a random mythic prefix and suffix.
  * Unrestricts the Short Sword / Long Sword skill.
* **Chaotic**:
  * If the character is wielding their chaotic crowning gift artifact, it is blessed and its enchantment is increased by +1 to +3.
  * Otherwise, they are gifted their chaotic crowning gift artifact (if it does not exist yet). The gift is:
    * [[/Artifacts/Howling Flail]] for **Gnolls** (if it does not exist yet).
    * [[/Artifacts/Stormbringer]] for non-Gnolls (or if [[/Artifacts/Howling Flail]] already exists), and it does not exist yet.
    * [[/Artifacts/Mournblade]] if [[/Artifacts/Stormbringer]] already exists.
  * Otherwise, if the chosen artifact already exists, they are gifted a blessed, erodeproof, +2 to +5 Infernal long sword with a random mythic prefix and suffix.
  * Unrestricts the relevant weapon skill (Flail or Short Sword / Long Sword) and Two-Weapon Combat (`P_DUAL_WEAPON_COMBAT`) if the gift is Stormbringer or Mournblade.

### Knight

* **Lawful**:
  * [[/Artifacts/Rhongomyniad]] (if it does not exist yet).
  * If [[/Artifacts/Rhongomyniad]] already exists, [[/Artifacts/The Holy Grail]] (if it does not exist yet).
  * Unrestricts the Thrusting Weapon skill.
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
* 20 blessed, erodeproof, lightning-enchanted [[/Items/Dart|darts]] (+3 to +5) of alignment-themed quality (Celestial for Lawful, Primordial for Neutral, Infernal for Chaotic, Elite otherwise).

### Valkyrie

Gifted a blessed, erodeproof, +2 to +5 weapon (a Dwarvish Axe if they are a Dwarf, or a Long Sword otherwise) with customized attributes:

* **Lawful**: Celestial quality, silver material (for long sword, if not silver-hating) or mithril (for Dwarvish axe), fire-enchanted, with mythic prefix *Asgardian* and suffix *Giant Slaying*.
* **Neutral**: Primordial quality, lightning-enchanted, with mythic prefix *Asgardian* and suffix *Giant Slaying*.
* **Chaotic**: Infernal quality, cold-enchanted, with mythic prefix *Jotunheimian*.
* Unrestricts Axe skill (if dwarf) or Short Sword / Long Sword skill (if non-dwarf).
* Gifted a tame, saddled [[/Monsters/Pegasus]] (if pets are allowed).

### Wizard

Gifted a [[/Items/Golden chest]] containing:

* [[/Items/Robe of the Archmagi]] (blessed, +1 to +3, erodeproof)
* [[/Items/Staff of the Magi]] (blessed, +1 to +3, erodeproof)
* Blessed [[/Items/Magic Marker]]
* [[/Items/Spellbooks/Spellbook of Greater Magic Missile]]
* [[/Items/Spellbooks/Spellbook of Wish]]
* One random high-level spellbook from: [[/Items/Spellbooks/Spellbook of Power Word Kill]], [[/Items/Spellbooks/Spellbook of Black Blade of Disaster]], or [[/Items/Spellbooks/Spellbook of Time Stop]].
