![wishing-guide](/uploads/Wishing%20Guide/wishing-guide.webp)

> 👉 **This guide explains the mechanics and probabilities of wishing for items in GnollHack, including item qualities, affixes, multiple quantities, and artifacts.**

## 📦 Quantities

When wishing for multiple items at once (e.g., "3 potions of healing" or "20 +2 arrows"), the quantity you receive depends on the item type and its stackability.

| Item Type | Rules & Maximum Quantity |
| :--- | :--- |
| **Ammunition & Missiles** | Guaranteed up to **20** per wish (e.g., arrows, bolts, rocks). |
| **Candles** | Guaranteed up to **7** per wish. |
| **Gems** | Hard limited to **1** per wish, despite being stackable. |
| **Non-stackable Items** | Hard limited to **1** per wish (e.g., weapons, armor, most tools, artifacts). |
| **Other Stackable Items** | Success is based on a probability check (see table below). Capped at **5** per wish (e.g., potions, scrolls). |

If the probability check for other stackable items fails, you will receive exactly **1** item instead of the requested amount. The success chances are:

| Requested Quantity | Success Chance |
| :---: | :---: |
| 1 | 100% |
| 2 | 67% |
| 3 | 50% |
| 4 | 33% |
| 5 | 17% |

> 💡 **Example:** Wishing for `"3 potions of full healing"` gives you a 50% chance to get all 3; otherwise you receive exactly 1. Wishing for `"20 arrows"` guarantees you 20 arrows.

## ⚔️ Weapon Qualities

Weapons have base quality probabilities. Note that Elite, Celestial, Primordial, and Infernal qualities always require positive luck. If the probability check fails, you will receive a normal quality weapon instead.

| Quality Level | Success Chance |
| :--- | :---: |
| **Exceptional** | 100% |
| **Elite** | 80% |
| **Celestial / Primordial / Infernal** | 25% |

> 💡 **Example:** Wishing for an `"exceptional long sword"` will always succeed in granting the Exceptional quality.

## 🛡️ Armor Qualities

Armor quality probabilities are generally much lower than weapons. However, some specific armors have *double* or *half* exceptionality modifiers. Positive luck is required for all of these qualities. If the probability check fails, you will receive a normal quality armor piece instead.

| Quality Level | Standard Chance | Double Chance | Half Chance |
| :--- | :---: | :---: | :---: |
| **Exceptional** | 50% | 100% | 50% |
| **Elite** | 25% | 50% | 12.5% |
| **Celestial / Primordial / Infernal** | 5% | 10% | 2.5% |

### Specific Exceptionality Modifiers

- **Double Exceptionality Chance:** This modifier significantly increases the probability of rolling high-tier qualities. It is applied natively to the following standard armors: [[/Items/splint mail]], [[/Items/banded mail]], [[/Items/chain mail]], [[/Items/scale mail]], [[/Items/studded leather armor]], [[/Items/ring mail]], and [[/Items/leather armor]].
- **Half Exceptionality Chance:** This modifier decreases the probability of rolling high-tier qualities to balance highly advanced materials. It is intrinsically applied to items made of *mithril, adamantium, orichalcum*, and *hard crystal*.

> 💡 **Example:** Wishing for `"elite splint mail"` uses the Double Chance column (50%), whereas `"elite dwarvish mithril-coat"` uses the Half Chance column (12.5%).

## 🪄 Wand Qualities

Wands can only be Exceptional or Elite, and they require positive luck. They cannot be generated as Celestial, Primordial, or Infernal. If the probability check fails, you will receive a normal quality wand instead.

| Quality Level | Success Chance |
| :--- | :---: |
| **Exceptional** | 50% |
| **Elite** | 25% |

> 💡 **Example:** Wishing for a `"blessed elite wand of death"` has a 25% chance to grant the Elite quality (provided you have positive luck).

## 🪄 Elemental Enchantments

You can wish for an elemental enchantment prefix (`freezing`, `flaming`, `electrified`, or `death-magical`) on weapons and armor that support it.

- **Elemental Prefix:** 100% chance to obtain if you have positive luck. 
- *Note:* If you wish for a `death-magical` enchantment on an item that cannot receive it, you will receive an `electrified` enchantment instead.

> 💡 **Example:** Wishing for a `"freezing long sword"` is guaranteed to grant the freezing prefix as long as your luck is positive.

## 🔮 Mythic and Legendary Affixes

Wishing for Mythic and Legendary affixes requires positive luck to obtain specific powers. Without positive luck, you will only receive an item with one random affix (or none). 

### Random Affixes

| Request Type | Success Chance | Failure Consequence |
| :--- | :---: | :--- |
| **Random Mythic (One Affix)** | 100% | N/A |
| **Random Legendary (Two Affixes)** | 33% | Item is generated with only one random affix. |

### Specific Affixes

When wishing for specific affixes, the game distinguishes between **Common** affixes and **Rare** affixes (*of Elemental Protection, of the Last Alliance, of Banishment, Witch-King's, Olympian, Jotunheimian,* and *Melnibonean*). Rare affixes individually only have a 33% chance to be successfully granted. 

#### Specific Mythic (One Affix)

| Affix Type | Success Chance |
| :--- | :---: |
| **Common Affix** | 100% |
| **Rare Affix** | 33% |

*(If this fails, the item is generated normally without the affix).*

#### Specific Legendary (Two Affixes)

When requesting a Legendary item with two specific affixes, there is an initial **33%** chance to be allowed to keep both affixes. Then, each affix is individually evaluated based on its rarity (100% for Common, 33% for Rare).

| Requested Affixes | Success Chance (Both) |
| :--- | :---: |
| **Two Common Affixes** | 33% |
| **One Common + One Rare Affix** | 11% |
| **Two Rare Affixes** | ~3.7% (1/27) |

*(If you fail the initial check, or one of the affix checks fails, the item will be generated with only one specific affix (Mythic) or no affixes (Normal)).*

> 💡 **Example:** Wishing for a `"long sword of orc slaying"` (Specific Mythic, Common) has a 100% chance to grant the affix. Wishing for `"Witch-King's plate mail of fire resistance"` (Specific Legendary, 1 Rare + 1 Common) has an 11% chance to successfully grant both affixes.

## 🪢 Belts of Giant Strength

When wishing for a specific belt of giant strength, the chance of successfully obtaining it depends on its strength level. If the check fails, you will receive a [[/Items/Belt of hill giant strength]] instead.

| Belt Type | Success Chance |
| :--- | :---: |
| [[/Items/Belt of hill giant strength]] | 100% |
| [[/Items/Belt of stone giant strength]] | 83% |
| [[/Items/Belt of frost giant strength]] | 67% |
| [[/Items/Belt of fire giant strength]] | 50% |
| [[/Items/Belt of storm giant strength]] | 33% |

## 👑 Artifact Wishing

The probability of obtaining an artifact through wishing depends heavily on how many artifacts have already been generated in the current game.

| Generated Artifacts | Success Chance |
| :---: | :---: |
| 0 to 2 | 100% |
| 3 | 67% |
| 4 | 50% |
| 5 | 40% |
| 6 | 33% |
| 7 | 29% |

*(For 3 or more existing artifacts, the formula is exactly $2/n$, where $n$ is the number of already generated artifacts).*

> 💡 **Example:** Wishing for `"Frost Brand"` early in the game (0 to 2 artifacts already generated) has a 100% success rate.

## 🛠️ Item Conditions and Modifiers

You can prepend condition modifiers to your wish (e.g., `"blessed rustproof long sword"`). Some conditions are always guaranteed, while others will fail or even backfire if your luck is negative.

| Modifier Type | Wishing Terms | Success Chance & Rules |
| :--- | :--- | :--- |
| **Beautitude** | `blessed`, `uncursed` | 100% chance if your luck is **non-negative**. <br> ⚠️ *Warning:* If you wish for these with negative luck, the item will be generated as **cursed** instead (unless intrinsically uncurseable). |
| **Damage Proofing** | `rustproof`, `fireproof`, `corrodeproof`, `rotproof`, `fixed` | 100% chance if your luck is **non-negative**. <br> If your luck is negative, the request is ignored and the item generates normally. |
| **Poisoned** | `poisoned` | 100% chance on applicable weapons if your luck is **non-negative**. <br> If your luck is negative, the request is ignored. |
| **Greased** | `greased` | 100% chance, regardless of luck. |

> 💡 **Example:** Wishing for a `"blessed rustproof long sword"` with negative luck will result in a **cursed**, non-rustproof long sword. Wishing for a `"greased cursed long sword"` will always give you exactly what you asked for.

## 📝 Complex Wishing Examples

Here are some examples of highly specific wishes that combine multiple mechanics from this guide.

| Wishing Prompt | Mechanics Explained |
| :--- | :--- |
| **`blessed +3 exceptional freezing long sword`** | Combines quality (Exceptional, 100% chance for weapons) and an elemental prefix (`freezing`, 100% chance with positive luck). |
| **`uncursed celestial splint mail of lightness`** | Combines celestial armor and a Mythic suffix. Splint mail has the *Double Exceptionality Chance* (boosting celestial from 5% to 10%). The common mythic suffix has a 100% chance to apply. |
| **`blessed celestial Witch-King's plate mail of fire resistance`** | Highly complex legendary armor request. Getting this exact item requires succeeding the Celestial check (5%) AND the Legendary checks (11% chance to keep both affixes). The two checks run independently. |

## ℹ️ More Information

- [[Enchantment Wishing Chances]] — Learn about success chances when wishing for item enchantments
