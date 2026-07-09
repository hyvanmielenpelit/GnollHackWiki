![Intermediate Guide](/uploads/Intermediate%20Guide/intermediate-guide-q85.webp)

> 👉 **Welcome to the Intermediate Guide. This guide builds upon the basics from the [[Starting Guide for Beginners]] to help you survive the deeper dungeon.**

## 🗺️ Part 1: Navigating the Dungeon

### ⛰️ Dungeon Branches

The dungeon in GnollHack is not just a single straight line down; it features several branching paths.

| Dungeon Branch / Area | Area / Entrance Found In | Description |
|:---|:---|:---|
| **[[/Dungeon/Dungeons of Doom]]** | The starting branch | The main dungeon branch. You start on level 1 and must descend to find the [[/Items/Amulet of Yendor]]. Stick to this path initially. The deeper you go, the harder the monsters become. |
| **[[/Dungeon/Gnomish Mines]]** | [[/Dungeon/Dungeons of Doom]] (levels 2-4) | A mostly unlit cavernous branch populated primarily by gnomes and dwarves. |
| **[[/Dungeon/Mine Town]]** | [[/Dungeon/Gnomish Mines]] (levels 5-8) | A guaranteed town level within the Gnomish Mines, featuring multiple [[/Rooms/Shops]] and a [[/Rooms/Temple]] with a Priest. It is an excellent place to identify items and buy gear. |
| **[[/Dungeon/Sokoban]]** | [[/Dungeon/Dungeons of Doom]] (levels 6-10) | A puzzle branch where you must push boulders into pits to advance. Completing it yields a valuable reward (a [[/Items/Bag of holding]] or an [[/Items/Amulet of reflection]]). |
| **[[/Dungeon/Quest]]** | [[/Dungeon/Dungeons of Doom]] (levels 11-16) | A unique branch tailored to your [[Character Classes]]. You must be at least experience level 14 to enter it. |
| **[[/Dungeon/Gehennom]]** | [[/Dungeon/Dungeons of Doom]] (levels 25-29) | The late-game hellish branch of the dungeon. Unlike NetHack, GnollHack has removed the tedious mazes from Gehennom, making it much more enjoyable and fast-paced to explore. |

### 🔗 Learn More

- [[Dungeon Layout]] — Complete overview of all branches, levels, and structures

### 👤 NPCs and Merchants

You will encounter various specialized NPCs who can identify items or buy your unwanted gear.

| NPC Type | Services Offered |
|:---|:---|
| **General Storekeeper** | Buys and sells a wide variety of items. Can identify any item for a fee in [[/Rooms/Shops]]. |
| **Specialized Shopkeeper** | E.g., bookstores. They can only identify the types of items they sell in [[/Rooms/Shops]]. |
| **Artificer** | Resides in the [[/Rooms/Laboratory]] and will gladly buy your expensive (but perhaps useless to your class) spellbooks. |
| **Geologist** | A specialized NPC who buys gems. Sell them your identified valuable gems for a massive profit in the [[/Rooms/Workshop]]. |
| **Oracle** | Can identify items for a fee and provides game hints in [[/Dungeon/Delphi]]. |
| **Priest** | Found in [[/Rooms/Temple]]s. They can bless and curse items for a fee, and they sell protection (extrinsic AC) if you donate large sums of money. |
| **Smith** | Provides many useful services and can identify weapons and armor for a fee in the [[/Rooms/Smithy]]. |


## 🤝 Part 2: Companions & Mercenaries

### 🤝 Hiring Mercenaries

You can interact with peaceful monsters (using the Chat `C` command) and **hire them as mercenaries**. You must pay them gold, but having heavily armed soldiers fighting alongside you makes the early and mid-game significantly easier.

### 🐾 Pet Management

The [[Starting Guide for Beginners]] advises you to rely on your pet, but to survive the mid-game, you need to actively manage and grow them into powerful companions.

- **Feeding and Starvation:** Pets have a hunger timer. If they go too long without eating, they become confused and weakened and will eventually die of starvation.
- **Equipping Pets:** Intelligent pets with hands can wield weapons and wear armor. You can equip them using the Chat `C` command.
- **Gaining Resistances:** Just like you, pets can gain intrinsic resistances (like fire, cold, shock, or poison resistance) by eating the right monster corpses. Strategic feeding can make your pet incredibly resilient.
- **Calling Them Back:** If your pet wanders off, use the Yell (`Y`) command to call them back to your location.

## ⚔️ Part 3: Combat, Dangers & Resistances

### ⚠️ Dangerous Early-Game Monsters

| Monster | Danger | Survival Strategy |
|:---|:---|:---|
| **[[/Monsters/Cockatrice]]** | Instant death (petrification) upon physical contact. | **Never touch them bare-handed.** Wear gloves before hitting them in melee. Do not eat their corpses. If you fall into a pit while carrying a cockatrice corpse, you will turn to stone and die. |
| **[[/Monsters/Floating eye]]** | Passive paralysis. If you hit them in melee, you will be paralyzed for many turns while other monsters kill you. | **Use ranged combat.** Shoot them with arrows, darts, or spells. Alternatively, apply a blindfold before hitting them (you cannot be paralyzed if you cannot see them). |
| **[[/Monsters/Gelatinous cube]]** | Paralyzing attacks and passive paralysis. If you hit them in melee or they hit you, you will be paralyzed for many turns. | **Use ranged combat.** Keep your distance and use ranged weapons or attack wands. |
| **[[/Monsters/Ghast]]** | Paralyzing attacks and terminal disease (sickness). Their melee attacks can paralyze you for several turns and cause a fatal illness that will quickly kill you if not treated. | **Cure sickness immediately.** Have a noncursed [[/Items/Unicorn horn]], [[/Items/Fig]], or [[/Items/Jar of medicinal salve]] ready, or know the [[/Spells/Cure sickness]] spell. Kill them from a distance. |
| **[[/Monsters/Ghoul]]** | Paralyzing attacks. Their melee attacks can paralyze you for several turns. | **Use ranged combat.** Keep your distance and kill them before they can get into melee range. |
| **[[/Monsters/Nymphs]]** | Item theft. | They will steal your items and teleport away. Kill them with ranged attacks before they get close. |

> 💡 **Tip:** Paralysis is extremely dangerous throughout the entire game. Obtain Free Action (paralysis resistance) as early as possible to prevent monsters from hitting you helplessly.

### 🔗 Learn More

- [[Monsters]] — Full bestiary and encounter difficulty modifiers

### 🧬 Key Resistances

As you descend deeper, obtaining key resistances is vital for survival.

| Resistance | Effect | How to Gain As Intrinsic<sup>1</sup> | How to Gain As Extrinsic<sup>2</sup> |
|:---|:---|:---|:---|
| **Poison Resistance** | Protects against poison darts, traps, and poisonous monster attacks or corpses (e.g., kobolds). | Starting as certain races/roles (e.g., [[/Races/Orc]], [[/Roles/Barbarian]], [[/Roles/Healer]]), or gaining levels in specific roles. | [[/Items/Amulet versus poison]], [[/Items/Ring of poison resistance]], or [[/Items/Green dragon scale mail]]. |
| **Sleep Resistance** | Prevents being put to sleep by wands or traps. | Eating corpses (e.g., [[/Monsters/Elf]], [[/Monsters/Orange dragon]]), starting as a [[/Roles/Monk]], or gaining levels as an [[/Races/Elf]]. | [[/Items/Orange dragon scale mail]]. |
| **Free Action** | Grants complete immunity to paralysis attacks, which would otherwise leave you helpless. | Gaining levels as an [[/Races/Elf]]. | [[/Items/Ring of free action]], or [[/Items/Orange dragon scale mail]]. |
| **Death Resistance** | Essential for surviving late-game insta-death attacks (such as the Finger of Death spell or a [[/Items/wand of death]]). | Gaining levels as a [[/Roles/Priest]]. | [[/Items/Ring of protection from undeath]], [[/Items/Amulet versus undeath]], [[/Items/Gown of the archbishops]], or [[/Items/Black dragon scale mail]]. |
| **Magic Resistance** | Protects you from polymorph traps and most monster spells. *Note that Magic Resistance does *not* protect against death attacks.* | ❌ | [[/Items/Cloak of magic resistance]], [[/Items/Gray dragon scale mail]], or certain artifacts. |
| **Reflection** | Bounces ray attacks (like dragon breath and wands) back at the caster. | ❌ | [[/Items/Amulet of reflection]], [[/Items/Shield of reflection]], or [[/Items/Silver dragon scale mail]]. |

- <sup>1</sup> *Intrinsic* is an innate ability that doesn't come from an item.
- <sup>2</sup> *Extrinsic* is an ability granted by an item.

### 🔗 Learn More

- [[Resistances and Saving Throws]] — Comprehensive calculations, rates, and saving throw rules

## 🛠️ Part 4: Items, Gear & Upgrades

### 💎 Item Quality and Tier Upgrades

Weapons, armor, and wands in GnollHack can possess quality modifiers that drastically improve their performance:

| Quality Tier | Weapons | Body Armor | Wands | Alignment & Restrictions |
|:---|:---|:---|:---|:---|
| **Exceptional** | 2x base damage | -4 AC, +1 MC | 2x base damage | None |
| **Elite** | 3x base damage | -8 AC, +2 MC | 3x base damage | None |
| **Celestial / Primordial / Infernal** | 4x base damage | -12 AC, +4 MC | — | Lawful / Neutral / Chaotic only |

> ℹ️ **Note:** Other armor pieces (shields, boots, gloves) also receive AC and MC scaling based on their quality.

You can visit a **Smith** NPC to repair damaged gear, rustproof items, and upgrade weapon and armor quality for a gold fee. For more details, see [[Exceptional, Elite, Celestial, Primordial, and Infernal Items]].

### 🔗 Learn More

- [[Items]] — List of all item categories and materials
- [[Weapons]] — Overview of weapon categories and quality tiers
- [[Armor]] — Overview of armor categories, slots, and properties
- [[Exceptional, Elite, Celestial, Primordial, and Infernal Items]] — Full breakdown of quality multipliers and scaling
- [[Mythic and Legendary Items]] — Guide to randomized weapon and armor affixes

## 🩹 Part 5: Status Conditions & Curing

### 🩹 Status Conditions & Curing Strategies

The deeper dungeon holds many debilitating status conditions. Knowing how to cure them instantly can save your run:

| Status Condition | Cure / Mitigation |
|:---|:---|
| **Mummy Rot / Sickness** | Eat a [[/Items/Fig]], use a [[/Items/Jar of medicinal salve]], apply a noncursed [[/Items/Unicorn horn]], or cast a [[/Spells/Cure sickness]] spell. |
| **Stoning / Petrification** | **Act in 1 turn:** Eat a [[/Monsters/Lizard]] corpse or a [[/Items/Dragon fruit]], or use a [[/Items/Jar of basilisk blood]]. Always keep one in open inventory! |
| **Lycanthropy** | Eat a [[/Items/Sprig of wolfsbane]] (requires poison resistance), drink holy water, or pray. |
| **Intelligence Drain** | **Prevent:** Wear a helmet (blocks 90% of attacks), a [[/Items/Nose ring of cerebral safeguarding]], or a [[/Items/Ring of sustain ability]]. **Restore:** Drink a [[/Items/Potion of restore ability]] or eat a [[/Items/Cloudberry]]. |

### 🔗 Learn More

- [[How to Cure Various Conditions]] — Step-by-step methods to recover from all harmful statuses
- [[Conditions]] — Complete mechanics and stats for sickness, stoning, blindness, and more
