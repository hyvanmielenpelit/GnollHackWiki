![Eating Guide](/uploads/Eating%20Guide/eating-guide-q85.webp)

> 👉 **This guide covers hunger states, comestibles, corpse attribute/level gains, dangerous foods, and brain-eating mechanics in GnollHack.**

## 🍗 Hunger and Nutrition States

Characters in GnollHack have a nutrition level that dictates their current hunger state. Maintaining a well-fed status is crucial, as hunger states directly impact [[attribute scores]], speed, and overall survival.

| Hunger State | Nutrition Range | Strength Penalty | Status Effects & Hazards |
| :--- | :--- | :--- | :--- |
| **SATIATED** | > 1000 | None | High choking risk if eating food with > 50 nutrition. |
| **NOT HUNGRY** | 151 – 1000 | None | The optimal baseline state. |
| **HUNGRY** | 51 – 150 | None | Character begins to feel hungry. Stops travel and non-eating occupations. |
| **WEAK** | 1 – 50 | -1 [[Strength]] | Character experiences temporary [[Strength]] loss and needs food badly. |
| **FAINTING** | <= 0 | -1 [[Strength]] | High chance of fainting and losing consciousness for 1 to 10 turns. |
| **FAINTED** | (Unconscious) | -1 [[Strength]] | Unconscious and completely vulnerable to attacks. |
| **STARVED** | Below -(100 + 10 * [[Constitution]]) | Dead | Instant death due to starvation (unless life-saved). |

### 😵 Choking Hazard
Eating while in the **SATIATED** state can be fatal. If your nutrition level rises to **2000** or above, your character will choke to death. 
- **Safe Foods:** Edible items that provide **50 or less nutrition** (such as fruits, herbs, garlic, and most mushrooms) do not trigger choking checks and can be consumed safely even when satiated.
- **Choking Warning:** If you attempt to eat an item with more than 50 nutrition while satiated, the game will warn you: *"However, you are feeling very full; eat it nevertheless?"*. Proceeding carries a risk of choking.
- **Magical Breathing:** Characters with magical breathing (such as those wearing an amulet of magical breathing or polymorphed into a breathless monster) are immune to choking to death. If they overeat, they will "choke, but recover their composure."

## 🍎 Comestibles and Special Food Items

GnollHack features traditional food items as well as new fruits and mushrooms. Unlike standard NetHack, some standard fruits now grant permanent attribute increases when eaten.

| Food Item | Nutrition | Special Effect when Eaten | Notes |
| :--- | :--- | :--- | :--- |
| **[[/Items/Food ration]]** | 800 | None | Standard, highly nutritious travel ration. |
| **[[/Items/K-ration]]** | 525 | None | High-density army ration. |
| **[[/Items/C-ration]]** | 450 | None | Standard canned army ration. |
| **[[/Items/Cram ration]]** | 900 | None | Dwarven travel ration. Non-rotting. |
| **[[/Items/Elven waybread]]** | 1000 | Cures food sickness | Elven travel bread. Non-rotting. |
| **[[/Items/Handful of spinach leaves]]** | 2 | Increases [[Strength]] | Blessed: +1 or +2 Str; Uncursed: +1 Str; Cursed: -1 Str. |
| **[[/Items/Banana]]** | 2 | Increases [[Dexterity]] | Blessed: +1 or +2 Dex; Uncursed: +1 Dex; Cursed: -1 Dex. Can tame [[/Monsters/Monkey]]. |
| **[[/Items/Pomegranate]]** | 2 | Increases [[Constitution]] | Blessed: +1 or +2 Con; Uncursed: +1 Con; Cursed: -1 Con. |
| **[[/Items/Avocado]]** | 2 | Increases [[Charisma]] | Blessed: +1 or +2 Cha; Uncursed: +1 Cha; Cursed: -1 Cha. |
| **[[/Items/Cloudberry]]** | 15 | Restores lost [[attribute scores]] | Works like a potion of restore ability. |
| **[[/Items/Fig]]** | 40 | Cures sickness | Cures food poisoning and illness. |
| **[[/Items/Dragon fruit]]** | 25 | Cures petrification | Stops stoning/petrification countdown. |
| **[[/Items/Phantomberry]]** | 2 | Grants 1 experience level | Cursed: acts as a potion of poison instead. |
| **[[/Items/Carrot]]** | 50 | Cures blindness | Restores sight. |
| **[[/Items/Eucalyptus leaf]]** | 30 | Cures sickness | Cures food poisoning and illness. |
| **[[/Items/Fortune cookie]]** | 15 | Contains a rumor message | Eating one makes the character literate (if they weren't already). |
| **[[/Items/Lump of royal jelly]]** | 200 | Increases [[Strength]] & heals | Blessed/Uncursed: heals HP (and max HP) and cures leg wounds; Cursed: damages HP. |
| **[[/Items/Slime mold]]** | 300 | None | Edible mold. Customizable via game options. |
| **[[/Items/Tin]]** | Varies | Varies | Boiled/Homemade: 50; French fried (greasy): 40; Pickled: 40; Soup: 20; Rotten: -50. |
| **[[/Items/Tripe ration]]** | 200 | Causes sickness for non-carnivores | Safe for carnivores/beast forms. Monks suffer vegan penalties. |

ℹ️ **Note on Greasy Tins:** Opening or eating French fried tins will cause greasy fingers, which makes you slip and drop weapons or fail to cast spells properly.

### 🍄 Shuffled Mushrooms
Mushrooms in GnollHack have shuffled appearances (e.g. "golden mushroom", "violet mushroom") in every game, but their true types and effects are fixed once identified:

- **[[/Items/Champignon]]** (7 Nutrition): Edible mushroom with no special effect.
- **[[/Items/Penny bun]]** (5 Nutrition): Cures hallucination.
- **[[/Items/Chanterelle]]** (3 Nutrition): Cures teleportitis.
- **[[/Items/Fly agaric]]** (5 Nutrition): Poisonous (causes poison damage unless resistant).
- **[[/Items/Death cap]]** (4 Nutrition): Deadly poisonous (causes massive poison damage).
- **[[/Items/Mana mushroom]]** (5 Nutrition): Confers temporary Mana Regeneration.
- **[[/Items/Healing mushroom]]** (5 Nutrition): Confers temporary Health Regeneration.
- **[[/Items/Panther cap]]** (3 Nutrition): Confers Blind Telepathy.
- **[[/Items/Oracular toadstool]]** (5 Nutrition): Causes hallucination.

## 👹 Attribute and Level Gains from Corpses

Eating certain monster corpses offers a chance to permanently increase attributes or experience levels (up to your natural maximum). 

When you fully consume a corpse, the game rolls a conveyance check. If multiple attributes or intrinsics succeed, one is chosen at random to be granted.

| Conveyed Gain | Conveying Monsters | Conveyance Chance | Notes |
| :--- | :--- | :--- | :--- |
| **[[Strength]]** | All [[/Monsters/Giant]] corpses (Fire, Frost, Hill, Stone, Storm, etc.) | **50%** | Giants also convey element-specific resistances (cold, fire, shock). |
| **[[Dexterity]]** | [[/Monsters/Monkey]], all [[/Monsters/Snake]] corpses (except Pythons) | **20%** (Monkey)<br>**10%** (Snakes) | Python corpses convey Dexterity but have a different class chance. |
| **[[Constitution]]** | All [[/Monsters/Ogre]] corpses (Ogre, Ogre Lord, Ogre King, etc.) | **25%** | Ogres are tough, fleshy humanoids. |
| **[[Intelligence]]** | [[/Monsters/Tentacled one]], [[/Monsters/Elder tentacled one]], all [[/Monsters/Lichen]] (Lichen, White, Black) | **25%** (Tentacled ones)<br>**1% – 30%** (Lichens) | Lichen difficulty determines the chance (Lichen: 1%, Black Lichen: 7%). |
| **[[Wisdom]]** | All [[/Monsters/Nagas]], [[/Monsters/Owlbear]]s, [[/Monsters/Treant]]s, and [[/Monsters/Angel]]s | **1% – 30%** | Based on monster difficulty (e.g. Angel: 14%, Treant: 15%, Owlbear: 7%). |
| **[[Charisma]]** | All [[/Monsters/Nymphs]] and [[/Monsters/Harpy]] | **25%** | Nymphs include Wood, Water, and Mountain nymphs. |
| **All [[Attribute Scores]]** | [[/Monsters/Titan]] | **20%** | Titanium size conveys [[Strength]], [[Constitution]], [[Intelligence]], [[Wisdom]], and [[Charisma]]. |
| **[[Experience Level]]** | [[/Monsters/Wraith]], [[/Monsters/Spectre]], [[/Monsters/King wraith]] | **100%** | Level gain is guaranteed upon eating. Undead wights/wraithlords leave no corpses. |

## ⚠️ Dangerous Food and Penalties

GnollHack implements a sensory warning system that alerts characters to dangerous food items before eating them. These prompts will ask you if you want to eat the item anyway.

| Dangerous Food Type | Sensory Warning Prompt | Consequence of Eating |
| :--- | :--- | :--- |
| **Tainted Meat** | *"...could be tainted! Eat it anyway?"* | Causes food poisoning/illness. |
| **Dangerous (Stoning/Sliming/Mummy Rot)** | *"...could be something very dangerous! Eat it anyway?"* | Immediate petrification (death) or green sliming (death) or mummy rot. |
| **Rotten Food** | *"...could be rotten! Eat it anyway?"* | Causes vomiting, confusion, and loss of nutrition. |
| **Poisonous Food** | *"...might be poisonous! Eat it anyway?"* | Causes poison damage, [[Strength]] loss, or death (unless resistant). |
| **Stunning Food** | *"...might make you stunned! Eat it anyway?"* | Confers the Stunned condition for several turns. |
| **Cursed Apple** | *"...might have been poisoned. Eat it anyway?"* | Puts you to sleep for a substantial duration. |
| **Non-Vegetarian (Monks)** | *"...unhealthy. Eat it anyway?"* | Violates vegetarian conduct, leading to a loss of alignment and luck. |
| **Acidic Food** | *"...rather acidic. Eat it anyway?"* | Inflicts acid damage to mouth/stomach (unless resistant). |

### 🥩 Cannibalism & Pet penalties
Eating corpses of your own starting species, polymorphed species, or domestic pets carries heavy penalties:
- **Cannibalism Penalty:** Triggers when eating a corpse of your starting race (e.g. Human eating Human), polymorphed race, or were-beast counterpart. Results in **Monster Aggravation** (intrinsically alerts monsters to your presence) and a **Luck loss of -2 to -5**.
- **Domestic Pet Penalty:** Eating a domestic cat or dog ([[/Monsters/Little dog]], [[/Monsters/Dog]], [[/Monsters/Large dog]], [[/Monsters/Kitten]], [[/Monsters/Housecat]], [[/Monsters/Large cat]]) results in **Monster Aggravation**.
- **Exemptions:** Characters playing as a [[/Roles/Caveman]] or of the [[/Races/Orc]] race are exempt from both cannibalism and pet penalties and can consume these foods without consequence.

### 🤢 Rotten and Cursed Foods (Unconsciousness & Status Ailments)

Consuming rotten or cursed food in GnollHack carries severe penalties. A food item can become rotten or be treated as such based on its state and age.

#### Spoilage & Rotting Rules

| Food Status / Type | Spoilage / Rotting Rule |
| :--- | :--- |
| **Cursed Food** | **Always** treated as rotten immediately, regardless of age. |
| **Blessed Food** | Can rot after **80 turns** with a **1 in 7 (14.3%)** chance on the first bite. |
| **Uncursed Food** | Can rot after **40 turns** with a **1 in 7 (14.3%)** chance on the first bite. |
| **Non-Rotting Food** | **Immune** to spoiling. Includes [[/Items/Cram ration]], [[/Items/Elven waybread]], [[/Items/Tin]]s, and [[/Items/Fortune cookie]]s. |

Once an item has rolled a successful rotting check, it is permanently marked as rotten.

#### First-Bite Consequences

Taking a bite of rotten or cursed food prints the message *"Blecch! Rotten [food]!"* and triggers two immediate effects:
1. **Nutrition Halved:** The remaining nutrition value of the food item is immediately halved.
2. **Status Ailment Roll:** The game checks for status ailments in a sequential sequence (if one triggers, the rest are skipped):

| Status Ailment | Chance (Normal Vision) | Chance (If Already Blind) | Duration | Description / Details |
| :--- | :--- | :--- | :--- | :--- |
| **Confusion** | **25%** | **25%** | 2d4 turns | Prints a light-headed message and confuses the character. |
| **Blindness** | **18.75%** | **0%** | 2d10 turns | Only checked if you did not become confused. |
| **Unconsciousness** | **18.75%** | **25%** | 1 to 10 turns | Only checked if you did not become confused or blinded. You pass out/faint. |
| **No Effect** | **37.5%** | **50%** | N/A | You eat the food without any immediate status ailments. |

## 🧠 Brain Eating

When polymorphed into a [[/Monsters/Tentacled one]] or [[/Monsters/Elder tentacled one]], hitting a monster with a tentacle attack allows you to eat its brain, which has unique mechanics and side effects:

- **Intelligence Recovery:** If your current [[Intelligence]] is below your natural maximum, eating a brain recovers **1 point** of lost [[Intelligence]] (printing *"You feel smarter."*). It does not increase your maximum cap.
- **Wisdom Exercise:** Successfully eating a brain exercises your [[Wisdom]] attribute.
- **Nutrition:** Reduces your hunger slightly (increases nutrition by **1 to 30**). This cannot cause choking.
- **Target Damage:** Inflicts severe damage on the target. It drains **1 to 2 points** of the target's [[Intelligence]]. If the target's [[Intelligence]] drops below 2, they die immediately from brain loss.
- **Mindless Targets:** Monsters that are mindless (e.g. golems, molds, fungi) or have brain protection do not notice the attack, and no brain-eating benefits or attribute drains occur.
- **Incorporeal Targets:** Monsters without physical brains (e.g. ghosts, spectres, elementals) have their brains unharmed, and no effects occur.
- **Petrification Hazard:** Eating the brain of a petrifying monster (e.g. Medusa) immediately starts the stoning countdown.
- **Rider Brain Fatality:** Attempting to eat the brain of a Rider (Death, Famine, Pestilence) is **instantly fatal** (printing *"Ingesting that is fatal."*).
- **Cannibalism:** Eating the brain of another tentacled one or a member of your own starting species triggers standard cannibalism penalties.

## 💡 Advanced Eating Mechanics

- **Curing Petrification:** Eating the corpse of a [[/Monsters/Lizard]] or an acidic monster (such as an [[/Monsters/Acid blob]]) immediately cures the petrification process, saving you from a stoning death.
- **Vegetarian and Vegan Conducts:** [[/Roles/Monk]]s or players observing strict diets face severe penalties for eating meat or animal by-products. Review the [[/Roles/Monk]] page for more details on conduct restrictions.
- **Transformation:** Eating a [[/Monsters/Green slime]] corpse or a glob of green slime will eventually turn you into a slime yourself, which is fatal unless cured.
- **Old Corpses:** Corpses left for too long become tainted and cause food poisoning when eaten (unless you are a [[/Roles/Caveman]], an [[/Races/Orc]], or possess sickness resistance). An uncursed corpse becomes tainted after **210 turns** (cursed after **140 turns**, blessed after **280 turns**).
