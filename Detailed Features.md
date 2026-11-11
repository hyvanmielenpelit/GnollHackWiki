> 👉 **GnollHack changes NetHack's rules in almost every area of the game, from attributes and skills to monsters, pets, items, and the dungeon.**

For a shorter overview, see [[Features]] or [[How GnollHack differs from NetHack]]. [[Starting Guide for NetHack Veterans]] explains what to do differently as a NetHack player.

## 📖 General

### 🌟 Difficulty Levels

GnollHack has 7 [[difficulty levels]]. The status bar shows the one you chose as a letter, after the letter of any special game mode:

| Difficulty Level | Status Bar Letter |
| :--- | :---: |
| **Standard** | `s` |
| **Experienced** | `e` |
| **Adept** | `a` |
| **Veteran** | `v` |
| **Expert** | `x` |
| **Master** | `m` |
| **Grand Master** | `g` |

On the easier levels, you start with extra scrolls of identify and a [[/Items/wand of probing]], which can also tell you a corpse's properties, and your starting stash holds two [[manuals|Manuals and Catalogues]] that explain game mechanics. The [[/Monsters/Elven bard]], who teaches you about Elbereth, is also more likely to appear on them.

When you or a monster polymorphs, including shapeshifters such as chameleons, the new form suits the current difficulty, and polymorph control can fail for forms far above your experience level.

### ✨ Runewords

Engraving *Gilthoniel* stops monsters from picking up items or looting containers on that square outside Gehennom. *Morgoth* does the same inside Gehennom. See [[Runewords]].

### ⌨️ Controls and Safety

- Swap weapons (`x`) switches instantly between two weapon sets, such as a one-handed weapon with a shield and a two-handed weapon. See [[Changing Between Two Sets of Weapon and Shield]].
- Two-weapon combat no longer uses the second weapon set. You toggle it with Dual weapon mode (`Ctrl+x`); see [[/Skills/Dual wielding]].
- Character details (`}`) shows your detailed statistics, including your alignment.
- The game asks before you step into water or lava, step onto a known trap, or put a container inside another container.
- Running never takes you into a trap you know about.
- You can still use containers while wielding a cursed two-handed weapon.
- There are many new options, such as `tellexp`, `metric_system`, and `show_weight_summary`. See [[Options]] and [[Additional Options]].

## 👤 Player Character

### 💪 Attributes

Exercise is gone. You raise attributes by eating certain corpses and fruits instead, so even a vegetarian can raise most of them. See [[Attribute Scores]].

| Attribute | Examples of Food Sources |
| :--- | :--- |
| **Strength** 💪 | Giants, spinach |
| **Dexterity** 🎯 | Snakes, monkeys, bananas |
| **Constitution** 🔋 | Ogres, pomegranates |
| **Intelligence** 🧠 | Tentacled ones, lichens |
| **Wisdom** 🦉 | Owlbears, treants, nagas |
| **Charisma** ✨ | Nymphs (which no longer give teleportitis), avocados |

Attributes give different bonuses than in NetHack; the Attributes entry of the Abilities (`Shift+a`) menu shows the exact values. A change in Constitution changes your maximum hit points at once, and a change in Intelligence or Wisdom does the same for your [[maximum mana]].

### ❤️ Health and Armor Class

- Players and monsters regain a fixed fraction of their maximum hit points and mana each turn. Regeneration effects raise the rate. See [[Hit Point and Mana Regeneration Rates]].
- Both players and monsters generally have more hit points and deal more damage than in NetHack. See [[Hit Point Comparison]].
- Dexterity improves Armor Class, so better AC is possible than in NetHack, for monsters as well. See [[Armor Class (AC) and Magic Cancellation (MC)]].
- Being slowed cuts your speed to two-thirds of your base speed and cancels all speed bonuses. See [[Conditions]].

### 📈 Experience and Carrying Capacity

The [[experience level]] cap is 50, and the experience curve is much faster than in NetHack: level 30 takes 204,000 experience points instead of 100,000,000. Characters can also carry more. See [[Encumbrance]].

## 👹 Monsters

### 🧠 Monster Stats and Behavior

- Monsters have Strength, Dexterity, and the other attributes, just like your character.
- Undead and mindless monsters are immune to fear. Mindless monsters also never flee when badly hurt.
- A monster that can leave a corpse always does. Wraiths, spectres, and king wraiths are the exception: they leave one only 1 time in 5.
- Some monsters have names, which they tell you when you chat with them.
- Dragon hatchlings sometimes leave dragon scales, and the [[/Monsters/Silver dragon hatchling]] has reflection.
- The [[/Monsters/Wizard of Yendor]] is the only monster that still steals artifacts and retreats to the stairs to heal, and he is less aggressive about it than in NetHack.

### 🔤 Monster Classes

Gnomes are now in `g`, lesser undead such as zombies and skeletons in `z`, greater undead such as mummies in `Z`, and the zruty in `Y`. The new class `G` holds [[gnolls and flinds|/Monsters/Gnolls]]. For copyright reasons, [[tentacled ones|/Monsters/Tentacled one]], [[gazers|/Monsters/Gazer]], and [[umbral hulks|/Monsters/Umbral hulk]] replace mind flayers, beholders, and umber hulks. See [[Monsters]].

### ☠️ Instadeaths and Special Attacks

- [[Couatls|/Monsters/Couatl]], [[mariliths|/Monsters/Marilith]], and large constrictor snakes can strangle you. You die after 6 turns unless you break free.
- A monster that pulls you under water no longer drowns you at once; you have a few turns to escape.
- [[Purple worms|/Monsters/Purple worm]] no longer kill swallowed pets and monsters instantly.
- A [[/Monsters/Cockatrice]]'s hit petrifies you only if it gets past your magic cancellation. The same check protects a monster you hit with a cockatrice corpse.
- The *Summon Nasties* spell calls fewer and weaker monsters, and demons summon other demons less often.
- Only [[high priests|/Monsters/High priest]] and the demon lords and princes can cast the touch of death spell; mage spellcasters, including the Wizard of Yendor, cannot. Death resistance or a nonliving or demon form makes you immune. Otherwise a magic cancellation check decides, and magic resistance does not help.
- The touch of [[/Monsters/Death]] the Rider is a different attack. Only death resistance protects you from it completely; a nonliving or demon form saves you from the instant death but not from the permanent hit point drain, and magic cancellation does not help.
- [[/Monsters/Jubilex]]'s engulfing attack gives other monsters a terminal illness that kills them about 20 turns later.

### 📊 Difficulty and Experience

Every monster type has a fixed difficulty level from 0 to 100, which Far look (`/`) shows. A kill is worth about 1 plus the monster's difficulty squared in experience points, and monsters that come as an encounter give extra experience depending on how hard the encounter is. See [[Experience Level]].

## 🐾 Pets

### 🧭 Pet Behavior

- Pets find their way to you with the same pathfinding as the travel command, so they no longer get stuck on the other side of the map.
- You can tell a pet to stay put, which also keeps it from eating corpses.
- Pets attack much stronger monsters than in NetHack and can die doing so, but they leave peaceful monsters alone.
- More food is generated for pets, such as fruit, and carrots buried in gardens.

### 🤝 Pet Interaction and Hirelings

You can give items to a pet and ask it to wear, take off, or drop them. Some peaceful monsters join your party if you chat with them and pay them gold. Riding is easier for every role, and your steed loses tameness less often as your [[/Skills/Riding]] skill grows. See [[/Items/Manuals/Understanding Pets and Hirelings]].

### 📊 Pet Status

If you use four or more status lines (up to eight), the fourth and later lines show your pets' hit points and other statistics; see [[Status Bar]]. Far look (`/`) on a pet also shows its hit points, and the game tells you clearly when a pet is hungry or weak.

## 🏪 Shopkeepers, Priests, and the Oracle

[[Shopkeepers|/Monsters/Shopkeeper]] identify items of the kind they sell for a gold fee, and they notice and scare off pets that try to steal from their shops. Temple [[priests|/Monsters/Priest]] heal you, cure sickness, and bless or curse items for a fee. Besides consultations, [[the Oracle|/Monsters/Oracle]] can identify items, give enlightenment, and teach spells.

## 📈 Skills

### ⚔️ Weapon and Spell Skills

- Weapon skills are combined into 12 skill groups instead of NetHack's 28, and they give larger bonuses. See [[Skills]].
- Higher weapon skill raises your chance of a critical hit, which deals double damage.
- Spells are divided into 12 revised schools, each with its own skill.
- The status bar shows when you can advance a skill.

### 🥋 Unarmed Combat and Disarm Trap

[[/Skills/Bare-handed combat]] gives to-hit and damage bonuses at every skill level up to Grand Master.

[[/Skills/Martial arts]] is a prestige skill that you can improve whatever your Bare-handed combat level. Kicks train it at any time. Unarmed hits train it only once your effective Bare-handed combat level is Grand Master, counting the two levels a worn [[/Items/headband of martial prowess]] adds.

The trainable [[/Skills/Disarm trap]] skill decides your chance to disarm a trap with Untrap (`Alt+u`). Disarmed traps can yield items; magical traps usually give wands.

## 🎖️ Roles

- Most roles have revised intrinsics per level. See [[Character Classes]].
- The [[/Roles/Monk]] kicks with martial arts when using Kick (`k`).
- The [[/Roles/Caveman]] starts with a random beneficial amulet, plenty of food, and enchanted weapons.
- The [[/Roles/Knight]] can no longer jump without jumping boots, and dwarves can now be Knights.
- The [[/Roles/Tourist]] starts with a +3 golf club, since darts thrown at an adjacent target take a heavy to-hit penalty.
- The [[/Roles/Wizard]] starts with either a quarterstaff and a cloak of magic resistance, or a staff of fire and a leather cloak.
- Every role starts with a container. [[Rogues|/Roles/Rogue]] get a [[/Items/bag of treasure hauling]] and wizards a [[/Items/bag of wizardry]].

## 🎒 Items

### 💎 Item Quality and Affixes

Ordinary equipment can come with mythic or legendary properties, such as demon slaying; see [[Mythic and Legendary Items]]. Weapons can also come in exceptional, elite, celestial, primordial, and infernal quality tiers, which multiply their base damage; see [[Exceptional, Elite, Celestial, Primordial, and Infernal Items]]. [[Items]] lists every item class, and [[Artifacts]] the artifacts.

### 👕 Equipment Slots and Armor

- [[Robes]] are worn over body armor and under cloaks. Only the better AC and MC of the two counts.
- [[Miscellaneous Items]], such as belts and ioun stones, are a new item class (`8`) with 5 new slots.
- Gauntlets of power are now [[/Items/gauntlets of ogre power]], and they set your Strength to 18/\*\*.
- Dragon scale mail is much heavier and hinders spellcasting. See [[Body Armor]].
- [[/Items/Crystal plate mail]] grants reflection.
- [[/Items/Bronze plate mail]] has much higher magic cancellation than ordinary plate mail.

### ⚔️ Weapons and Ammunition

- Launchers and thrown weapons used against an adjacent target get a -40 to-hit penalty (-32 for crossbows). See [[Ranged Weapons]].
- Applied [[polearms]] hit monsters two squares away at every skill level, but they are poor weapons against adjacent monsters unless you are riding.
- A [[/Items/spear]] can be applied to hit monsters two squares away once you have Basic skill. Its reach grows at higher skill levels, and it still works at melee range.
- Fired [[ammunition]] breaks only 1 time in 20, and blessed ammunition normally never breaks.
- [[/Artifacts/Cleaver]]'s arc attack no longer hits peaceful or tame creatures, and [[/Artifacts/Stormbringer]] no longer makes you attack them.

### ✨ Magic Items and Tools

- [[Reagents]] are a new item class (`9`), used for preparing spells.
- A [[/Items/unicorn horn]] always works, but it uses a charge each time you apply it and cannot restore lost attribute points.
- Conflict is no longer permanent. [[/Artifacts/The Ring of Conflict]] is an artifact with charges, a scroll of conflict works once, and a horn of chaos drives monsters mad only for a short time.
- A [[/Items/wand of polymorph]] changes up to 7 items if blessed, 4 if uncursed, and 1 if cursed.
- You can apply a wand to an item instead of breaking it, for example to give a weapon an [[elemental enchantment|Elemental Enchantments]] or to cancel an item.
- [[Magic resistance]] does not protect against death attacks, magic missiles, or striking, and it does not halve elemental damage.
- A [[/Items/ring of sustain ability]] protects your brain from the amnesia caused by tentacled ones.
- Gold weighs ten times more than in NetHack. A bag of treasure hauling cuts its weight to 1/32.

### 💎 Gems, Scrolls, and Food

- A [[/Items/touchstone]] identifies gems without being blessed. The [[/Items/jinxstone]] is a new cursed gray stone.
- Expensive gems cost less than in NetHack. See [[Gems and Stones]].
- The [[/Items/scroll of protect weapon]] and [[/Items/scroll of protect armor]] do what a scroll of enchant weapon or enchant armor does when read while confused.
- Eating a [[/Items/cloudberry]] restores lost attributes, a [[/Items/fig]] cures sickness, and a [[/Items/panther cap]] gives telepathy while blind.

## 🗺️ Dungeon

### 🚪 Special Rooms

- Your starting room has an altar of your own god and a [[/Items/magic chest]] stash holding 2 or 3 random items.
- [[Gardens|/Rooms/Garden]] are full of trees and fruit. Dig (`Ctrl+g`) for buried roots, and chop trees for wood.
- [[Libraries|/Rooms/Library]] hold scrolls and spellbooks guarded by spellcasting monsters.
- A [[/Rooms/dragon lair]] holds a treasure hoard guarded either by one ancient dragon or by a family of adult dragons and hatchlings of one color.
- Two humorous closets, the [[/Rooms/Orc and the Pie]] and the [[/Rooms/Orc Captain and the Pies]], are named after the tiny tabletop adventure *The Orc and the Pie*.
- [[Deserted shops|/Rooms/Shops/Deserted shop]] are full of mimics, including a gargantuan mimic that carries a [[/Items/wand of identify]].

### 🗺️ Dungeon Layout and Features

- Drinking from [[fountains]] is safer, because the most dangerous results happen only deeper in the dungeon. Fountains of healing, mana, power, poison, and spring water are new; the original fountain is now the magic fountain.
- The Dungeons of Doom are slightly shorter. [[/Dungeon/Gehennom]] is shorter too, and it has no mazes except on special levels.
- There are several new dungeon branches. See [[Dungeon Layout]].
- You can find secret doors even with very bad Luck, though less often.

## 🔮 Spells

### 🧪 Preparing and Casting Spells

There are 14 spell levels: minor cantrips, major cantrips, and levels 1 to 12. Most spells must be prepared with Mix (`Shift+x`) from [[reagents]], and each preparation gives a set number of castings, from 1 to 150 depending on the spell. Some spells also have a cooldown before you can cast them again.

Each spell uses Intelligence, Wisdom, or Charisma, or a combination of them. Higher skill in a spell's school lowers its mana cost. Your chance to cast a spell depends mainly on that skill, the spell's level, your casting attribute, and the armor penalty for somatic spells. See [[Spell Casting]].

### 📕 Spellbooks and Spell Management

- Spells are never forgotten.
- A spellbook crumbles to dust once you learn its spell.
- Failing to read a spellbook never paralyzes you.
- In the Spell menu (`+`), you can assign hotkeys to spells or remove them from your spell list.

For every spell and spellbook, see [[Spells]].

## 🏆 Scoring

GnollHack has its own [[scoring]] model. Your current score is calculated as you play and shown on the status bar.

| Score Contributor | Included in GnollHack? | Included in NetHack? |
| :--- | :---: | :---: |
| **Delving Depth** | ✅ | ✅ |
| **Achievements** | ✅ | ❌ |
| **Difficulty Level** | ✅ | ❌ |
| **Turn Count** | ✅ (Ascension only) | ❌ |
| **Conducts** | ✅ (Ascension only) | ❌ |
| **Gold** | ❌ (except for Rogues) | ✅ |
| **Gems** | ❌ (except for Rogues) | ✅ |
| **Artifacts & Amulets** | ❌ (artifacts count for Archaeologists, amulets for Cavemen) | ✅ |
