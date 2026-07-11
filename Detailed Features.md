> 👉 **A comprehensive reference of all major mechanical changes, balance adjustments, and feature enhancements introduced in GnollHack.**

## 📖 General

### ⚙️ Mechanics & Difficulty

- **Difficulty Levels** — Features 7 distinct [[Difficulty Levels]]. The chosen difficulty will show in the status bar before the dungeon level as a letter:

  | Difficulty Level | Status Bar Letter |
  | :--- | :---: |
  | **Standard** | `s` |
  | **Experienced** | `e` |
  | **Adept** | `a` |
  | **Veteran** | `v` |
  | **Expert** | `x` |
  | **Master** | `m` |
  | **Grand Master** | `g` |

- **Polymorph Balancing** — Polymorph, polymorph traps, and polymorphing monsters (such as chameleons) always polymorph into in-difficulty forms. Polymorph control is also restricted to prevent transforming into out-of-difficulty forms.
- **Rune Words** — Added new protective runes: *Gilthoniel* prevents monsters from picking up items or looting containers in that square (does not work in Gehennom); *Morgoth* does the same and works in Gehennom.

### 🧬 Attributes & Health

#### 🍖 Attribute Training

- **Nutrition Training** — Removed the attribute training system. Instead, you gain attributes by eating corpses and some fruits (a vegetarian option):

  | Attribute | Food / Corpse Sources |
  | :--- | :--- |
  | **Strength** 💪 | Giants, Spinach |
  | **Dexterity** 🎯 | Snakes, Monkeys, Bananas |
  | **Constitution** 🔋 | Ogres, Pomegranates |
  | **Intelligence** 🧠 | Mind flayers, Lichens |
  | **Wisdom** 🦉 | Owlbears, Treants |
  | **Charisma** ✨ | Nymphs, Avocados (no teleportitis anymore) |

#### 🩸 Health & Mana Regeneration

- **Regeneration Rates** — Players and monsters regenerate hit points at the rate of `MaxHP/300` per turn (doubled by Regeneration) and mana at the rate of `MaxMana/900` per turn (doubled by Replenishment).
- **HP & Damage Scaling** — Players and monsters generally have more hit points and deal more damage than in NetHack.
- **AC Calculations** — Players and monsters can have higher AC than in NetHack, because Dexterity increases one's AC.
- **Attribute Bonuses** — Attributes, like strength and dexterity, give out different amounts of bonuses than in vanilla NetHack. Check the Abilities (`Alt+A`) page for exact information.

### ⚔️ Combat & Controls

- **Weapon Sets Swapping** — Exchanging weapons with `X` has been greatly improved. You can wield a one-handed weapon and a shield in one set and a two-handed weapon in a second set, and swapping them is instantaneous.
- **Two-Weapon Combat** — Two-weapon combat does not use the second readied weapon set anymore. Instead, it is toggled directly by pressing `Ctrl+X`.

### 🔐 Containers & Items

- **Water Safety Prompt** — There is a warning prompt when you try to enter a water square.
- **Bag Safety Prompt** — There is a warning prompt when you try to put a container bag into another bag.
- **Known Trap Safety Prompt** — There is a warning prompt when you try to enter a known trap.
- **Status Bar Clean-up** — Gold and alignment are not shown on the status bar. You can check your gold by checking your inventory, and you can find your alignment in the character details page (`}`).
- **Two-Handed Curses** — You can use containers even when you wield a cursed two-handed weapon.

### 🔗 Learn More

- [[Difficulty Levels]] — Detailed modifiers for difficulty ratings

## 👤 Player Character

### 📈 Progression & Stats

- **Extended Level Cap** — The [[Experience Level]] cap is increased to 50.
- **Experience Curve** — The experience curve has been streamlined; it requires only 204,000 experience points to reach level 30, compared to 100,000,000 in NetHack.
- **Carrying Capacity** — Characters can carry more than in NetHack.
- **Dynamic Stats Update** — Changes in Constitution immediately reflect in your maximum hit points, while changes in Intelligence and Wisdom immediately reflect in your maximum mana.

### 🔗 Learn More

- [[Experience Level]] — Overview of progression and experience requirements

## 👹 Monsters

### 🧬 Monster Stats & AI

#### 📊 Core Stats & AI

- **Monster Attributes** — Monsters have attributes like the player character (Strength, Dexterity, etc.).
- **Monster Intelligence** — Monsters are more intelligent than before and can use a wider variety of items.
- **Fear Resistance** — Undead and mindless monsters do not flee from battle and are immune to fear.
- **Corpse Generation** — All monsters except wraiths generate a corpse 100% of the time.

#### 📁 Monster Classification

- **Class Letters** — Some letter changes: Gnomes are now in 'g', lesser undead in 'z', and greater undead in 'Z'. Zruty is now in 'Y'.
- **New Classes** — New monster class Gnoll 'G', including Gnolls and Flinds.
- **Copyright Replacements** — For copyright reasons, there are now tentacled ones, gazers, and underworld hulks instead of mind flayers, beholders, and umber hulks.

### ☠️ Special Attacks & Resistances

#### 🐍 Instadeath & Strangling

- **Strangling Attacks** — [[Couatls|/Monsters/Couatl]], [[mariliths|/Monsters/Marilith]], and constrictor snakes have now a strangling attack, which kills the target in 6 turns.
- **Non-Fatal Drowning** — Drowning attacks are no longer instadeath.
- **Purple Worm Swallowing** — [[Purple worms|/Monsters/Purple Worm]] do not instakill pets and monsters anymore.

#### 🪄 Summoning & Petrification

- **Summoning Adjustments** — The *Summon Nasties* monster spell has been heavily nerfed, and demons summon other demons more seldomly.
- **Petrification Rules** — A cockatrice is more dangerous, petrifying you on a successful hit if it passes MC; however, cockatrice corpses are less dangerous, needing to pass MC to petrify a monster.

#### 💀 Touch of Death

- **Spell Limitation** — Mage spell casters cannot cast Touch of Death anymore (this includes the Wizard of Yendor).
- **High Priest Attacks** — High Priest class clerical spell casters can cast Touch of Death (and magic resistance does not protect against it; death resistance is required instead).
- **Death's Touch** — Death resistance is also required against the Grim Reaper [[Death|/Monsters/Death]]'s touch of death.

### ⚔️ Combat Mechanics

#### 📈 Difficulty & Scaling

- **Difficulty Formulas** — Monster difficulty level is calculated dynamically based on `SQRT(damage_per_turn * effective_hit_points)`. You can inspect difficulty using `/`.
- **Monster Scaling** — Monsters range in difficulty levels between 0 and 200, though the upper limit is not capped.

#### 🏆 Experience Points

- **Experience Calculations** — Killing monsters grants experience equal to about `1 + monster_difficulty_level ^ 2`.
- **Encounter XP** — Monsters appearing in an encounter give out extra experience depending on the difficulty of the encounter.

#### 🤺 Fleeing & Covetousness

- **Covetousness Removal** — Covetousness has been removed from all monsters except the Wizard of Yendor, whose recovery and stealing behaviors have been nerfed.

### 🔗 Learn More

- [[Monsters]] — Overview of monster classes and bestiary list
- [[/Monsters/Wizard of Yendor]] — Boss guide for the Wizard of Yendor
- [[/Monsters/Death]] — Guide to Death and death resistance

## 🐾 Pets

### 🧭 Behavior & Pathing

- **Pet Pathing Engine** — Pets use the built-in travel pathing engine, preventing them from getting stuck on the other side of the map.
- **Stand Ground** — You can command pets to stay put to prevent them from eating corpses.
- **Aggression Scaling** — Pets will attack high-level monsters but are in danger of being killed by them. Pets do not attack peaceful monsters.

### ⚙️ Pet Interaction

- **Equipment Management** — You can give items to your pet and tell it to wear, drop, or undress them.
- **Riding Tweaks** — Riding as a non-knight is easier, and the pet loses tamedness slower.
- **Hiring Mercenaries** — You can hire some peaceful monsters for a gold fee to join your party.
- **Discussion Option** — You can chat with pets and peaceful monsters to ask them to join your party.

### 📊 Statistics & HUD

- **HUD Status Lines** — Pet hit points and other statistics are shown on status lines 4-8.
- **HP Inspection** — You can check your pet's hit points by using `/`.
- **Better Notifications** — Better messaging is displayed when your pet is hungry.
- **Dungeon Food** — More food is generated for your pets in the dungeon (e.g., grass/carrots in garden rooms for horses).

### 🔗 Learn More

- [[/Items/Manuals/Understanding Pets and Hirelings]] — Guide to managing taming, feeding, and companions
- [[/Skills/Riding]] — Info on pet riding requirements and skill levels

## 🏪 Shopkeepers, Priests, and the Oracle

### 🏪 Shopkeepers & Merchants

- **Item Identification** — Shopkeepers can identify unknown items for a gold fee.
- **Anti-Theft AI** — Shopkeepers have been trained to spot pets trying to steal items from their shops.

### ⛪ Priests & Altars

- **Altar Services** — Priests can bless/curse items and heal the player character for a gold fee.

### 🔮 The Oracle

- **Oracle Services** — The Oracle can identify items and provide enlightenment.

### 🔗 Learn More

- [[/Monsters/Shopkeeper]] — Overview of shopkeeper behavior, services, and inventory
- [[/Monsters/Priest]] — Guide to alignment services, blessings, and altar usage
- [[/Monsters/Oracle]] — Details on consultation and identification fees

## 📈 Skills

### ⚔️ Weapon & Spell Skills

- **Combined Skills** — Weapon skills have been combined into 14 distinct skill groups instead of 28, and they grant more bonuses.
- **Critical Hits** — Weapon skills increase your chance to score a critical hit (causing double damage).
- **Revised Schools** — Revised spell school skills.

### 🪤 Traps & Prestige Skills

- **Disarm Trap Skill** — Added a [[/Skills/Disarm trap]] skill that can be trained. Untrapping traps grants items (magical traps usually give wands).
- **Martial Arts** — [[/Skills/Martial arts]] is a prestige skill that you can improve after reaching Expert in [[/Skills/Bare-handed combat]]. It requires 2, 3, 3, 4, and 4 skill points at Basic, Skilled, Expert, Master, and Grand Master levels.
- **Status Indicator** — The game shows when you have unused skill points in the status bar.

### 🔗 Learn More

- [[Skills]] — List of all weapon, spell, and auxiliary skills

## 🎖️ Roles

### 🥋 Role Enhancements

- **Monk Buffs** — The [[/Roles/Monk]] can do martial arts kicks using `k`, making boots of kicking highly valuable.
- **Revised Intrinsics** — Most roles have revised intrinsics per level.

### 🏁 Starting Equipment

- **Tourist Starter** — The [[/Roles/Tourist]] starts with a +2 golf club because darts cannot be thrown in melee range anymore.
- **Bags & Containers** — All roles start with a bag. [[Rogues|/Roles/Rogue]] start with a [[/Items/bag of treasure hauling]] and [[wizards|/Roles/Wizard]] with a [[/Items/bag of wizardry]].

### 🔗 Learn More

- [[Character Classes]] — Detailed list of roles, starting items, and traits

## 🎒 Items

### 💎 Equipment Enhancements

#### ✨ Mythic & Legendary Affixes

- **Mythic Prefix & Suffix** — Non-magical equipment can spawn with special mythic properties (e.g., demon slaying). Read [[Mythic and Legendary Items]].

#### 💎 Weapon Quality Tiers

- **Item Quality Classes** — Weapons can spawn in different quality tiers. See [[Exceptional, Elite, Celestial, Primordial, and Infernal Items]] for details:

  | Quality Tier | Base Damage Multiplier |
  | :--- | :---: |
  | **Normal** | 1x |
  | **Exceptional** | 2x (Double base damage) |
  | **Elite** | 3x (Triple base damage) |
  | **Celestial** | 4x (Quadruple base damage) |
  | **Primordial** | 4x (Quadruple base damage) |
  | **Infernal** | 4x (Quadruple base damage) |

#### 👕 Extra Equipment Slots

- **Robe Item Slot** — Robes can be worn over armor and under cloaks (the game selects the better AC/MC).
- **Miscellaneous Items** — Added a new Miscellaneous item class ('8') and 5 new slots (e.g., belts and ioun stones).

### 🧪 Item Mechanics & Categories

- **Reagents Category** — Added a new Reagents item class ('9') used for spellcasting.
- **Unicorn Horns** — Unicorn horns have charges and cannot cure attribute point damage, but they work 100% of the time (uncursed horn cures 1 condition; blessed horn cures 2).
- **Panther Caps** — Gain blind telepathy by eating a panther cap (good for vegetarians).
- **Wands of Polymorph** — Nerfed so that blessed/uncursed/cursed wands affect 7/4/1 items per use.
- **Ring of Conflict** — Conflict-granting items have charges and are no longer permanent. The Ring of Conflict is now [[/Artifacts/The Ring of Conflict]] (has charges), scroll of conflict is single-use, and the horn of chaos applies a temporary debuff.
- **Wands of Cancellation** — Wands can also be applied to items to enchant or cancel them.
- **Magic Resistance Nerf** — Magic resistance does not shield against death attacks, magic missiles, or striking, and it does not reduce elemental damage to half.
- **Gold Weight** — Gold weighs 10x more, but the [[/Items/bag of treasure hauling]] reduces gold weight to 1/32.

### ⚔️ Ranged & Melee Combat Tweaks

#### 🏹 Ranged Combat Penalties

- **Melee Launcher Penalty** — Launchers and thrown weapons used in melee range (1 square) receive a to-hit penalty of up to -20.

#### 🗡️ Melee & Ammunition

- **Polearms Range** — Polearms hit all adjacent squares (range of `SQRT(8)`) at all skill levels.
- **Ammo Breaking** — Uncursed ammunition has only a 1/20 chance of breaking; blessed ammunition never breaks.

### 🔗 Learn More

- [[Items]] — List of item classes and categories
- [[Artifacts]] — Database of quest and sacrifice gift artifacts

## 🗺️ Dungeon

### 🚪 Special Rooms & Lairs

#### ⛪ Starting Rooms

- **Starting Altars** — Your starting room features an altar of your god and a stash containing 2 to 3 random items.

#### 🌿 Gardens & Libraries

- **Garden Rooms** — Rooms filled with fruits where you can dig (`Ctrl+G`) for roots and chop trees for lumber.
- **Library Rooms** — Rooms containing spellcasting monsters.

#### 🐉 Dragon Lairs & Mimic Shops

- **Dragon Lairs** — Rooms filled with dragons and ancient dragons.
- **Orc-and-the-Pie Rooms** — Two new variations of this classic puzzle room.
- **Deserted Shops** — Shops populated by mimics and a boss mimic that drops the Wand of Identify.

### ⛲ Fountains & Dungeon Layout

#### ⛲ Fountain Varieties

- **Fountain Safety** — Fountains are safer to drink from; negative effects occur only on lower dungeon levels. Added new fountain types (poison, healing, mana, power). The original fountain is now the *magic fountain*.

#### 🗺️ Dungeon Restructuring

- **Doom Shorter** — The Dungeons of Doom branch is slightly shorter.
- **Gehennom Shorter** — Gehennom is slightly shorter and lacks mazes except on special levels.
- **New Branches** — Several new dungeon branches have been added.

### 🔗 Learn More

- [[Dungeon Layout]] — Comprehensive guide to branches, levels, and layouts

## 🔮 Spells

### 🔮 Spell Preparation & Casting

#### 🧪 Mixing & Casting Requirements

- **Spell Levels** — Features 14 spell levels (Minor Cantrip, Major Cantrip, and levels 1–12).
- **Material Components** — Most spells require material reagents to prepare.
- **Spell Castings** — Mixing a spell grants a pool of casts (ranging from 1–100 depending on the spell).
- **Cooldowns** — Spells can have a cooldown timer.
- **Casting Stats** — Spells use casting attributes (Intelligence, Wisdom, Charisma, or combinations).
- **Mana Reduction** — Spell school levels reduce the mana cost of spells.

#### 📈 Spellcasting Success Chance

- **Spell Casting Chance** — The casting success chance is calculated using the following modifiers:

  | Modifier | Effect | Conditions / Details |
  | :--- | :---: | :--- |
  | **Magic School Level** | +100% | Per level in the school |
  | **Spell Level** | -50% | Per spell level |
  | **Attribute Score** | +15% | Per stat point in active attribute (INT, WIS, or CHA) |
  | **Armor Penalty** | `-` | Applies to somatic spells only |
  | **Item Bonus** | `+` | From staves/magic items (does not affect restricted schools) |

### 📕 Spellbooks & Management

#### 📕 Spellbook Mechanics

- **Spell Expiry** — Spells cannot be forgotten over time.
- **Spellbook Crumbling** — Spellbooks crumble to dust upon successful reading.
- **Reading Safety** — Failed spellbook reading does not paralyze the player character.

#### ⌨️ Spell List Management

- **Spell Hotkeys & Removal** — You can hotkey spells or remove them from your active spell list by pressing `+`.

### 🔗 Learn More

- [[Spells]] — List of all spell classes and spellbooks
- [[Spell Casting]] — Guide to spellcasting requirements and modifiers

## 🏆 Scoring

### 🏆 Scoring Calculations

- **Scoring Calculations** — GnollHack has its own scoring model, and your current score is calculated in real-time and displayed on the status bar. Scoring differs significantly from NetHack:

  | Score Contributor | Included in GnollHack? | Included in NetHack? |
  | :--- | :---: | :---: |
  | **Delving Depth** | ✅ | ✅ |
  | **Achievements** | ✅ | ❌ |
  | **Difficulty Level** | ✅ | ❌ |
  | **Turn Count** | ✅ (Ascension only) | ❌ |
  | **Conducts** | ✅ (Ascension only) | ❌ |
  | **Gold** | ❌ | ✅ |
  | **Gems** | ❌ | ✅ |
  | **Artifacts & Amulets** | ❌ | ✅ |

### 🔗 Learn More

- [[Scoring]] — Detailed breakdown of points, multipliers, and achievements