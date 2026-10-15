> 👉 **A comprehensive reference of all major mechanical changes, balance adjustments, and feature enhancements introduced in GnollHack.**

## 📖 General

### 🌟 Difficulty Levels

- **Difficulty Levels** — GnollHack has 7 [[difficulty levels]]. The chosen difficulty is shown on the status bar as a letter, after the letter of any special game mode:

  | Difficulty Level | Status Bar Letter |
  | :--- | :---: |
  | **Standard** | `s` |
  | **Experienced** | `e` |
  | **Adept** | `a` |
  | **Veteran** | `v` |
  | **Expert** | `x` |
  | **Master** | `m` |
  | **Grand Master** | `g` |

- **Starting Help** — On easier difficulty levels, you start with extra scrolls of identify and a [[/Items/wand of probing]], which can also reveal a corpse's properties, and your starting stash contains two [[manuals|Manuals and Catalogues]] that explain game mechanics.
- **Elven Bard** — The [[/Monsters/Elven bard]], who teaches you about Elbereth, is more likely to appear on easier difficulty levels.
- **Polymorph Balancing** — Polymorphing yourself or a monster, including shapeshifters such as chameleons, picks forms suited to the current difficulty, and polymorph control can fail for forms far above your experience level.

### ✨ Runewords

- **Gilthoniel and Morgoth** — Engraving *Gilthoniel* stops monsters from picking up items or looting containers on that square outside Gehennom, and *Morgoth* does the same inside Gehennom. See [[Runewords]].

### ⌨️ Controls and Safety

- **Weapon Sets** — Swap weapons (`x`) switches instantly between two weapon sets, such as a one-handed weapon with a shield and a two-handed weapon. See [[Changing Between Two Sets of Weapon and Shield]].
- **Two-Weapon Combat** — Two-weapon combat no longer uses the second weapon set; it is toggled with Dual weapon mode (`Ctrl+x`). See [[/Skills/Dual wielding]].
- **Character Details** — The Character details (`}`) command shows your detailed statistics, including your alignment.
- **Safety Prompts** — The game asks for confirmation before you step into water or lava, step onto a known trap, or put a container inside another container.
- **Running** — Running never takes you into a trap you know about.
- **Cursed Two-Handed Weapons** — You can use containers even while wielding a cursed two-handed weapon.
- **Options** — GnollHack adds many new options, such as `tellexp`, `metric_system`, and `show_weight_summary`. See [[Options]] and [[Additional Options]].

## 👤 Player Character

### 💪 Attributes

- **No Exercise** — The attribute training system has been removed. Instead, you raise attributes by eating certain corpses and fruits, which also gives vegetarians a way to gain most of them. See [[Attribute Scores]].

  | Attribute | Examples of Food Sources |
  | :--- | :--- |
  | **Strength** 💪 | Giants, spinach |
  | **Dexterity** 🎯 | Snakes, monkeys, bananas |
  | **Constitution** 🔋 | Ogres, pomegranates |
  | **Intelligence** 🧠 | Tentacled ones, lichens |
  | **Wisdom** 🦉 | Owlbears, treants, nagas |
  | **Charisma** ✨ | Nymphs (which no longer give teleportitis), avocados |

- **Attribute Bonuses** — Attributes give different bonuses than in NetHack. The Attributes entry of the Abilities (`Shift+a`) menu shows the exact values.
- **Immediate Updates** — Changes in Constitution immediately change your maximum hit points, and changes in Intelligence or Wisdom immediately change your [[maximum mana]].

### ❤️ Health and Armor Class

- **Regeneration** — Players and monsters regain a fixed fraction of their maximum hit points and mana each turn, and regeneration effects increase the rate. See [[Hit Point and Mana Regeneration Rates]].
- **Hit Points and Damage** — Players and monsters generally have more hit points and deal more damage than in NetHack. See [[Hit Point Comparison]].
- **Dexterity and AC** — Dexterity improves Armor Class, so players and monsters can reach better AC than in NetHack. See [[Armor Class (AC) and Magic Cancellation (MC)]].
- **Slowed** — Being slowed cuts your speed to two-thirds of your base speed and cancels all speed bonuses. See [[Conditions]].

### 📈 Experience and Carrying Capacity

- **Level Cap** — The [[experience level]] cap is increased to 50.
- **Experience Curve** — The experience curve is much faster: reaching level 30 takes 204,000 experience points, compared to 100,000,000 in NetHack.
- **Carrying Capacity** — Characters can carry more than in NetHack. See [[Encumbrance]].

## 👹 Monsters

### 🧠 Monster Stats and Behavior

- **Monster Attributes** — Monsters have Strength, Dexterity, and other attributes, just like your character.
- **Fear** — Undead and mindless monsters are immune to fear, and mindless monsters never flee when badly hurt.
- **Corpses** — Monsters that can leave a corpse always do, except wraiths, spectres, and king wraiths, which leave one only 1 time in 5.
- **Named Monsters** — Some monsters have a name, which they tell you when you chat with them.
- **Dragon Hatchlings** — Dragon hatchlings sometimes leave dragon scales, and the [[/Monsters/Silver dragon hatchling]] has reflection.
- **Covetousness** — Only the [[/Monsters/Wizard of Yendor]] still steals artifacts and retreats to the stairs to heal, and he does so less aggressively than in NetHack.

### 🔤 Monster Classes

- **Class Letters** — Gnomes are now in `g`, lesser undead such as zombies and skeletons in `z`, greater undead such as mummies in `Z`, and the zruty in `Y`. See [[Monsters]].
- **Gnolls** — The new monster class `G` contains [[gnolls and flinds|/Monsters/Gnolls]].
- **Replacement Monsters** — For copyright reasons, [[tentacled ones|/Monsters/Tentacled one]], [[gazers|/Monsters/Gazer]], and [[umbral hulks|/Monsters/Umbral hulk]] replace mind flayers, beholders, and umber hulks.

### ☠️ Instadeaths and Special Attacks

- **Strangling** — [[Couatls|/Monsters/Couatl]], [[mariliths|/Monsters/Marilith]], and large constrictor snakes can strangle you, killing you after 6 turns unless you break free.
- **Drowning** — Being pulled under water by a monster no longer kills you instantly; you have a few turns to escape.
- **Purple Worms** — [[Purple worms|/Monsters/Purple worm]] no longer kill swallowed pets and monsters instantly.
- **Cockatrices** — A [[/Monsters/Cockatrice]]'s hit petrifies you only if it gets past your magic cancellation, and hitting a monster with a cockatrice corpse petrifies it only if its magic cancellation fails.
- **Summoning** — The *Summon Nasties* monster spell calls fewer and weaker monsters, and demons summon other demons less often.
- **Touch of Death** — Only [[high priests|/Monsters/High priest]] can cast the touch of death; mage spellcasters, including the Wizard of Yendor, no longer can. Magic resistance does not protect against it: death resistance makes you immune, and otherwise only a successful magic cancellation check saves you.
- **Death's Touch** — Only death resistance protects you from the touch of [[/Monsters/Death]].
- **Jubilex** — [[/Monsters/Jubilex]]'s engulfing attack infects other monsters with a terminal illness that kills them about 20 turns later.

### 📊 Difficulty and Experience

- **Monster Difficulty** — Every monster type has a fixed difficulty level from 0 to 100, which you can see by looking at the monster with Far look (`/`).
- **Experience Points** — Killing a monster gives about 1 + its difficulty level squared in experience points, and monsters that appear in an encounter give extra experience depending on the difficulty of the encounter. See [[Experience Level]].

## 🐾 Pets

### 🧭 Pet Behavior

- **Pet Pathing** — Pets find their way to you with the same pathfinding as the travel command, so they no longer get stuck on the other side of the map.
- **Stay Put** — You can tell a pet to stay put, which also keeps it from eating corpses.
- **Aggression** — Pets attack much stronger monsters than in NetHack and can be killed doing so, but they do not attack peaceful monsters.
- **Pet Food** — More food is generated for your pets, such as fruit and buried carrots in gardens.

### 🤝 Pet Interaction and Hirelings

- **Equipment** — You can give items to your pet and ask it to wear, take off, or drop them.
- **Hirelings** — You can chat with some peaceful monsters and pay them gold to join your party.
- **Riding** — Riding is easier for every role, and your steed loses tameness less often as your [[/Skills/Riding]] skill grows.

### 📊 Pet Status

- **Status Lines** — With four or more status lines, your pets' hit points and other statistics are shown on status lines 4 to 8. See [[Status Bar]].
- **Hit Point Inspection** — Looking at a pet with Far look (`/`) shows its hit points.
- **Hunger Messages** — The game tells you clearly when your pet is hungry or weak.

### 📖 Learn More

- [[/Items/Manuals/Understanding Pets and Hirelings]] — Guide to managing taming, feeding, and companions

## 🏪 Shopkeepers, Priests, and the Oracle

- **Shopkeepers** — [[Shopkeepers|/Monsters/Shopkeeper]] identify items of the kind they sell for a gold fee, and they notice and scare off pets that try to steal from their shops.
- **Priests** — Temple [[priests|/Monsters/Priest]] heal you, cure sickness, and bless or curse items for a gold fee.
- **The Oracle** — Besides consultations, [[the Oracle|/Monsters/Oracle]] can identify items, give enlightenment, and teach spells.

## 📈 Skills

### ⚔️ Weapon and Spell Skills

- **Combined Weapon Skills** — Weapon skills have been combined into 12 skill groups instead of NetHack's 28, and they give larger bonuses. See [[Skills]].
- **Critical Hits** — Higher weapon skill increases your chance to score a critical hit, which deals double damage.
- **Spell Schools** — Spells are divided into 12 revised schools, each with its own skill.
- **Skill Indicator** — The status bar shows when you can advance a skill.

### 🥋 Unarmed Combat and Disarm Trap

- **Bare-Handed Combat** — [[/Skills/Bare-handed combat]] gives to-hit and damage bonuses at every skill level up to Grand Master.
- **Martial Arts** — [[/Skills/Martial arts]] is a prestige skill that you can improve whatever your Bare-handed combat level. Kicks train it at any time; unarmed hits train it only once your effective Bare-handed combat level is Grand Master, counting the two levels a worn [[/Items/headband of martial prowess]] adds.
- **Disarm Trap** — The trainable [[/Skills/Disarm trap]] skill decides your chance to disarm a trap with Untrap (`Alt+u`), and disarmed traps can yield items; magical traps usually give wands.

## 🎖️ Roles

- **Revised Intrinsics** — Most roles have revised intrinsics per level. See [[Character Classes]].
- **Monk** — The [[/Roles/Monk]] delivers martial arts kicks with Kick (`k`), making kicking boots highly valuable.
- **Caveman** — The [[/Roles/Caveman]] starts with a random beneficial amulet, plenty of food, and enchanted weapons.
- **Knight** — The [[/Roles/Knight]] can no longer jump without jumping boots, and dwarves can now be Knights.
- **Tourist** — The [[/Roles/Tourist]] starts with a +3 golf club, because darts thrown at melee range suffer a heavy to-hit penalty.
- **Wizard** — The [[/Roles/Wizard]] starts with either a quarterstaff and a cloak of magic resistance, or a staff of fire and a leather cloak.
- **Starting Containers** — All roles start with a container. [[Rogues|/Roles/Rogue]] start with a [[/Items/bag of treasure hauling]] and wizards with a [[/Items/bag of wizardry]].

## 🎒 Items

### 💎 Item Quality and Affixes

- **Mythic and Legendary Properties** — Ordinary equipment can appear with special mythic or legendary properties, such as demon slaying. See [[Mythic and Legendary Items]].
- **Quality Tiers** — Weapons can appear in exceptional, elite, celestial, primordial, and infernal quality tiers, which multiply their base damage. See [[Exceptional, Elite, Celestial, Primordial, and Infernal Items]].

### 👕 Equipment Slots and Armor

- **Robes** — [[Robes]] are worn over body armor and under cloaks, and only the better AC and MC of the robe and the body armor counts.
- **Miscellaneous Items** — [[Miscellaneous Items]], such as belts and ioun stones, form a new item class (`8`) with 5 new slots.
- **Gauntlets of Ogre Power** — Gauntlets of power have been renamed [[/Items/gauntlets of ogre power]], and they set your Strength to 18/\*\*.
- **Dragon Scale Mail** — Dragon scale mail is much heavier and hinders spellcasting. See [[Body Armor]].
- **Crystal Plate Mail** — [[/Items/Crystal plate mail]] grants reflection.
- **Bronze Plate Mail** — [[/Items/Bronze plate mail]] has much higher magic cancellation than ordinary plate mail.

### ⚔️ Weapons and Ammunition

- **Melee-Range Penalty** — Launchers and thrown weapons used against an adjacent target receive a -40 to-hit penalty (-32 for crossbows). See [[Ranged Weapons]].
- **Polearms** — Applied [[polearms]] hit monsters two squares away at every skill level, but they are poor weapons against adjacent monsters unless you are riding.
- **Spears** — A [[/Items/spear]] can be applied to hit monsters two squares away once you have Basic skill, with its reach growing at higher skill levels, and it still works at melee range.
- **Ammunition Breakage** — Fired [[ammunition]] breaks only 1 time in 20, and blessed ammunition normally never breaks.
- **Cleaver and Stormbringer** — [[/Artifacts/Cleaver]]'s arc attack no longer hits peaceful or tame creatures, and [[/Artifacts/Stormbringer]] no longer forces you to attack them.

### 🪄 Magic Items and Tools

- **Reagents** — [[Reagents]] form a new item class (`9`) used for preparing spells.
- **Unicorn Horns** — A [[/Items/unicorn horn]] uses a charge each time it is applied and always works, but it cannot restore lost attribute points.
- **Conflict** — Conflict is no longer permanent: [[/Artifacts/The Ring of Conflict]] is an artifact with charges, a scroll of conflict works once, and a horn of chaos drives monsters mad only for a short time.
- **Wands of Polymorph** — A [[/Items/wand of polymorph]] changes up to 7 items if blessed, 4 if uncursed, and 1 if cursed.
- **Applying Wands** — You can apply a wand to an item instead of breaking it, for example to give a weapon an [[elemental enchantment|Elemental Enchantments]] or to cancel an item.
- **Magic Resistance** — [[Magic resistance]] does not protect against death attacks, magic missiles, or striking, and it does not halve elemental damage.
- **Sustain Ability** — A [[/Items/ring of sustain ability]] protects your brain from the amnesia caused by tentacled ones.
- **Gold Weight** — Gold weighs ten times more than in NetHack, but a bag of treasure hauling reduces its weight to 1/32.

### 💎 Gems, Scrolls, and Food

- **Touchstones and Jinxstones** — A [[/Items/touchstone]] identifies gems without being blessed, but beware the new cursed gray stone, the [[/Items/jinxstone]].
- **Gem Prices** — Expensive gems are less expensive than in NetHack. See [[Gems and Stones]].
- **Protection Scrolls** — The [[/Items/scroll of protect weapon]] and [[/Items/scroll of protect armor]] do the same as reading a scroll of enchant weapon or enchant armor while confused.
- **Fruits and Mushrooms** — Eating a [[/Items/cloudberry]] restores lost attributes, a [[/Items/fig]] cures sickness, and a [[/Items/panther cap]] gives telepathy while blind.

### 📖 Learn More

- [[Items]] — List of item classes and categories
- [[Artifacts]] — Database of quest and sacrifice gift artifacts

## 🗺️ Dungeon

### 🚪 Special Rooms

- **Starting Room** — Your starting room has an altar of your own god and a [[/Items/magic chest]] stash holding 2 or 3 random items.
- **Gardens** — [[Gardens|/Rooms/Garden]] are full of trees and fruit; dig (`Ctrl+g`) for buried roots and chop trees for wood.
- **Libraries** — [[Libraries|/Rooms/Library]] hold scrolls and spellbooks guarded by spellcasting monsters.
- **Dragon Lairs** — A [[/Rooms/dragon lair]] holds either a single ancient dragon or a family of adult dragons and hatchlings of one color, guarding a treasure hoard.
- **The Orc and the Pie** — Two humorous closets, the [[/Rooms/Orc and the Pie]] and the [[/Rooms/Orc Captain and the Pies]], pay tribute to a famous tiny tabletop adventure.
- **Deserted Shops** — [[Deserted shops|/Rooms/Shops/Deserted shop]] are full of mimics, including a gargantuan mimic that carries a [[/Items/wand of identify]].

### 🗺️ Dungeon Layout and Features

- **Fountains** — Drinking from [[fountains]] is safer, because the most dangerous results happen only deeper in the dungeon. New fountains of healing, mana, power, poison, and spring water join the original fountain, which is now the magic fountain.
- **Shorter Dungeons** — The Dungeons of Doom are slightly shorter, and [[/Dungeon/Gehennom]] is shorter and has no mazes except on special levels.
- **New Branches** — Several new dungeon branches have been added. See [[Dungeon Layout]].
- **Secret Doors** — You can find secret doors even with very bad Luck, though less often.

## 🔮 Spells

### 🧪 Preparing and Casting Spells

- **Spell Levels** — There are 14 spell levels: minor cantrips, major cantrips, and levels 1 to 12.
- **Preparation** — Most spells must be prepared with Mix (`Shift+x`) from [[reagents]], and each preparation gives a set number of castings, from 1 to 150 depending on the spell.
- **Cooldowns** — Some spells have a cooldown before you can cast them again.
- **Casting Attributes** — Each spell uses Intelligence, Wisdom, or Charisma, or a combination of them.
- **Mana Cost** — Higher skill in a spell's school lowers its mana cost.
- **Success Chance** — Your chance to cast a spell depends mainly on your skill in its school, the spell's level, your casting attribute, and the armor penalty for somatic spells. See [[Spell Casting]].

### 📕 Spellbooks and Spell Management

- **No Forgetting** — Spells are never forgotten over time.
- **Spellbook Crumbling** — A spellbook crumbles to dust once you learn its spell.
- **Reading Safety** — Failing to read a spellbook never paralyzes you.
- **Spell Menu** — In the Spell menu (`+`), you can assign hotkeys to spells or remove them from your spell list.

### 📖 Learn More

- [[Spells]] — List of all spell classes and spellbooks

## 🏆 Scoring

- **Scoring Model** — GnollHack has its own [[scoring]] model, and your current score is calculated in real time and displayed on the status bar. Scoring differs significantly from NetHack:

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

## 📖 See Also

- [[Features]]
- [[How GnollHack differs from NetHack]]
- [[Starting Guide for NetHack Veterans]]
