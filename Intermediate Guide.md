> 👉 **Welcome to the Intermediate Guide. This guide builds upon the basics from the [[Starting Guide for Beginners]] to help you survive the deeper dungeon.**

## 🗺️ Dungeon Branches

The dungeon in GnollHack is not just a single straight line down; it features several branching paths.

| Branch / Area | Description & Strategy |
|:---|:---|
| **Dungeons of Doom** | The main dungeon branch. You start on level 1 and must descend to find the Amulet of Yendor. Stick to this path initially. The deeper you go, the harder the monsters become. |
| **The Gnomish Mines** | A branch typically found between dungeon levels 2 and 4. |
| **Minetown** | A guaranteed town level within the Gnomish Mines, featuring multiple shops and a temple with a priest. It is an excellent place to identify items and buy gear. |
| **Sokoban** | A puzzle branch where you must push boulders into pits to advance. Completing it yields a valuable reward (a [[/Items/Bag of holding]] or an [[/Items/Amulet of reflection]]). |
| **The Quest** | A unique branch tailored to your character's class. The entrance is a magic portal located between dungeon levels 11 and 16. You must be at least experience level 14 to enter it. |
| **Gehennom** | The late-game hellish branch of the dungeon. Unlike NetHack, GnollHack has removed the tedious mazes from Gehennom, making it much more enjoyable and fast-paced to explore. |

### NPCs

You will encounter various specialized NPCs who can identify items or buy your unwanted gear.

| NPC Type | Services Offered |
|:---|:---|
| **General Storekeeper** | Buys and sells a wide variety of items. Can identify any item for a fee. |
| **Specialized Shopkeeper** | E.g., bookstores. They can only identify the types of items they sell. |
| **Artificer** | A specialized NPC who will gladly buy your expensive (but perhaps useless to your class) spellbooks. |
| **Geologist** | A specialized NPC who buys gems. Sell them your identified valuable gems for a massive profit. |
| **Oracle** | Can identify items for a fee, and provides game hints. |
| **Priest** | Found in temples. They can bless and curse items for a fee, and they sell protection (extrinsic AC) if you donate large sums of money. |
| **Smith** | Provides many useful services and can identify weapons and armor for a fee. |


## Hiring Mercenaries

You can interact with peaceful monsters (using the Chat `C` command) and **hire them as mercenaries**. You must pay them gold, but having heavily armed soldiers fighting alongside you makes the early and mid-game significantly easier.

## 🐾 Pet Management

The [[Starting Guide for Beginners]] advises you to rely on your pet, but to survive the mid-game, you need to actively manage and grow them into powerful companions.

- **Feeding and Starvation:** Pets have a hunger timer. If they go too long without eating, they become confused and weakened and will eventually die of starvation.
- **Equipping Pets:** Intelligent pets with hands can wield weapons and wear armor. You can equip them using the Chat `C` command.
- **Gaining Resistances:** Just like you, pets can gain intrinsic resistances (like fire, cold, shock, or poison resistance) by eating the right monster corpses. Strategic feeding can make your pet incredibly resilient.
- **Calling Them Back:** If your pet wanders off, use the Yell (`Y`) command to call them back to your location.

## ⚠️ Dangerous Early-Game Monsters

| Monster | Danger | Survival Strategy |
|:---|:---|:---|
| **[[/Monsters/Cockatrice]]** | Instant death (petrification) upon physical contact. | **Never touch them bare-handed.** Wear gloves before hitting them in melee. Do not eat their corpses. If you fall into a pit while carrying a cockatrice corpse, you will turn to stone and die. |
| **[[/Monsters/Floating eye]]** | Passive paralysis. If you hit them in melee, you will be paralyzed for many turns while other monsters kill you. | **Use ranged combat.** Shoot them with arrows, darts, or spells. Alternatively, apply a blindfold before hitting them (you cannot be paralyzed if you cannot see them). |
| **[[/Monsters/Gelatinous cube]]** | Paralyzing attacks and passive paralysis. If you hit them in melee or they hit you, you will be paralyzed for many turns. | **Use ranged combat.** Keep your distance and use ranged weapons or attack wands. |
| **[[/Monsters/Ghast]]** | Paralyzing attacks and terminal disease (sickness). Their melee attacks can paralyze you for several turns and cause a fatal illness that will quickly kill you if not treated. | **Cure sickness immediately.** Have a noncursed [[/Items/Unicorn horn]], [[/Items/Fig]], or [[/Items/Jar of medicinal salve]] ready, or know the [[/Spells/Cure sickness]] spell. Kill them from a distance. |
| **[[/Monsters/Ghoul]]** | Paralyzing attacks. Their melee attacks can paralyze you for several turns. | **Use ranged combat.** Keep your distance and kill them before they can get into melee range. |
| **[[/Monsters/Nymphs]]** | Item theft. | They will steal your items and teleport away. Kill them with ranged attacks before they get close. |

> ℹ️ **Tip:** Paralysis is extremely dangerous throughout the entire game, not just in the early levels. It is highly recommended to obtain Free Action (paralysis resistance) as early as possible to avert deaths related to being paralyzed.

## 🧬 Key Intrinsics and Resistances

As you descend deeper, monsters will begin using magical, elemental, and status-inflicting attacks. Obtaining key resistances and intrinsics is vital for survival.

| Intrinsic / Resistance | Effect / Protection |
|:---|:---|
| **Poison Resistance** | Protects against poison darts, traps, and poisonous monster attacks or corpses (e.g., kobolds). |
| **Sleep Resistance** | Prevents being put to sleep by wands, traps, or sleep-inducing monsters. |
| **Free Action** | Grants complete immunity to paralysis attacks, which would otherwise leave you helpless. |
| **Death Resistance** | Essential for surviving late-game insta-death attacks (such as the Finger of Death spell or wands of death). Note that Magic Resistance does *not* protect against death attacks. |
| **Magic Resistance (MR)** | Protects you from polymorph traps, anti-magic traps, and most monster spells. |
| **Reflection** | Bounces ray attacks (like dragon breath and wands) back at the caster. |

For a full breakdown of how to obtain these and how they function, see [[Resistances and Saving Throws]].

## 💎 Item Quality and Tier Upgrades

Weapons, armor, and wands in GnollHack can possess quality modifiers that drastically improve their performance:

| Quality Tier | Weapons | Body Armor | Wands | Alignment & Restrictions |
|:---|:---|:---|:---|:---|
| **Exceptional** | 2x base damage | -4 AC, +1 MC | 2x base damage | None |
| **Elite** | 3x base damage | -8 AC, +2 MC | 3x base damage | None |
| **Celestial / Primordial / Infernal** | 4x base damage | -12 AC, +4 MC | — | Lawful / Neutral / Chaotic only |

> ℹ️ **Note:** Other armor pieces (shields, boots, gloves) also receive AC and MC scaling based on their quality.


You can visit a **Smith** NPC to repair damaged gear, rustproof items, and upgrade weapon and armor quality for a gold fee. For more details, see [[Exceptional, Elite, Celestial, Primordial, and Infernal Items]].


## 🩹 Status Conditions & Curing Strategies

The deeper dungeon holds many debilitating status conditions. Knowing how to cure them instantly can save your run:

| Status Condition | Cure / Mitigation |
|:---|:---|
| **Mummy Rot / Sickness** | Eat a [[/Items/Fig]], use a [[/Items/Jar of medicinal salve]], apply a noncursed [[/Items/Unicorn horn]], or cast a [[/Spells/Cure sickness]] spell. |
| **Stoning / Petrification** | **Act in 1 turn:** Eat a [[/Monsters/Lizard]] corpse or a [[/Items/Dragon fruit]], or use a [[/Items/Jar of basilisk blood]]. Always keep one in open inventory! |
| **Lycanthropy** | Eat a [[/Items/Sprig of wolfsbane]] (requires poison resistance), drink holy water, or pray. |
| **Intelligence Drain** | **Prevent:** Wear a helmet (blocks 90% of attacks), a [[/Items/Nose ring of cerebral safeguarding]], or a [[/Items/Ring of sustain ability]]. **Restore:** Drink a [[/Items/Potion of restore ability]] or eat a [[/Items/Cloudberry]]. |

For more detailed strategies, read [[How to Cure Various Conditions]].
