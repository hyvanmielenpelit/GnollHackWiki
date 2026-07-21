![Sacrifice Offering](/uploads/Sacrifice%20Offering/sacrifice-offering-q85.webp)

> 👉 **Sacrificing is a core gameplay mechanic in GnollHack. By using the Offer (`Alt+o`) command while standing on an altar, you can sacrifice a corpse to appease your god, manipulate altar alignments, and obtain divine gifts.**

To offer a sacrifice, you must be standing on an altar.

## 📖 Overview

The only primary items offered on an altar are **corpses**. They must be fresh, meaning they were killed within the last 50 turns<sup>1</sup>. If you attempt to sacrifice old corpses or other items, the game will reject them or ignore the offering.

| Attempted Offering | Condition | Message Seen by Player | Result |
| :--- | :--- | :--- | :--- |
| **Fresh Corpse** | Corpse killed within 50 turns<sup>1</sup> | *Depends on character state (see below)* | Corpse is consumed; effects applied |
| **Old Corpse** | Corpse killed more than 50 turns ago<sup>1</sup> | *"Nothing happens."* | Corpse is not consumed; action ends |
| **Invalid Item** | Any item that is not a corpse | *"You can't sacrifice that!"* | Item is not consumed; action ends |

- <sup>1</sup> Lizard and lichen corpses do not rot for eating purposes, but they still become too old to be sacrificed after 50 turns. Acid blob corpses are the only corpses that are accepted as fresh regardless of age.

## 🧟 Rotten vs. Fresh Corpses

When dealing with corpses, the game distinguishes between being "rotten" (for eating) and being "fresh" (for sacrificing). This distinction is especially important for undead corpses (such as zombies, vampires, and mummies).

- **Eating (Rotten):** The game considers undead corpses inherently tainted. If you attempt to eat one, it is treated as "rotten" and will make you sick, regardless of when the monster was killed.
- **Sacrificing (Fresh):** The sacrifice mechanic ignores food taint. A corpse is considered "fresh" for sacrificing strictly based on its age—specifically, if the monster was killed within the last 50 turns. 

Therefore, a newly killed undead corpse is "rotten" for eating but "fresh" for sacrificing. You can successfully sacrifice these fresh undead corpses for their full value (plus the alignment bonus for Lawful and Neutral players) without any penalty.

## 💨 Offering Consumption Messages

When a valid fresh corpse is successfully offered, it is consumed and a message is displayed based on your character's status:

| Alignment | Blind | Hallucinating | Message Seen by Player |
| :--- | :---: | :---: | :--- |
| **Any** | Any | ✅ | 1. *"Your sacrifice sprouts wings and a propeller and roars away!"* <br /> 2. *"Your sacrifice puffs up, swelling bigger and bigger, and pops!"* <br /> 3. *"Your sacrifice collapses into a cloud of dancing particles and fades away!"* |
| **Lawful** | ✅ | ❌ | *"Your sacrifice disappears!"* |
| **Lawful** | ❌ | ❌ | *"Your sacrifice is consumed in a flash of light!"* |
| **Neutral** or **Chaotic** | Any | ❌ | *"Your sacrifice is consumed in a burst of flame!"* |

## 🎚️ Corpse Value

The value of a corpse determines its efficacy:

| Corpse State / Condition | Sacrifice Value | Notes |
| :--- | :--- | :--- |
| **Fresh Corpse** | `Difficulty + 1` | Default value for any corpse killed within the last 50 turns. |
| **Old Corpse** | `0` | Any corpse killed more than 50 turns ago. Sacrificing this usually does nothing, unless it is undead ([see below](#undead-corpses)). |
| **Partially Eaten Corpse** | Scaled proportionally | Value is reduced based on the remaining nutrition of the corpse. |
| **Maximum Value** | Capped at `24` | |

### 🧟 Undead Corpses

Sacrificing an undead corpse provides different values and outcomes depending on the player's alignment and the corpse's freshness:

| Player Alignment | Corpse Freshness | Final Sacrifice Value | Outcome / Result |
| :--- | :--- | :--- | :--- |
| **Lawful or Neutral** | Fresh (≤ 50 turns) | `Difficulty + 2` | **Success** (Base `Difficulty + 1` + `1` bonus) |
| **Lawful or Neutral** | Old (> 50 turns) | `1` | **Success** (Base `0` + `1` bonus; corpse is consumed) |
| **Chaotic** | Fresh (≤ 50 turns) | `Difficulty + 1` | **Success** (Standard base calculation; no bonus) |
| **Chaotic** | Old (> 50 turns) | `0` | **Failure** (*"Nothing happens."*; corpse is ignored) |

## 🛐 Sacrificing on a Co-Aligned Altar

When sacrificing a fresh, valid corpse on an altar of your own alignment, your god evaluates the offering. The effects are resolved in the following priority order:

### 1. Decreasing Anger

If your god is angry, the corpse value reduces their anger:

$$\text{Anger Reduction} = \frac{\text{Corpse Value} \times (2 \text{ if Chaotic else } 3)}{24}$$

Depending on how much anger is reduced, the player will see different messages:

| Outcome | Message Seen by Player | Hallucinating Message | Luck Effect |
| :--- | :--- | :--- | :--- |
| **Anger reduced, but still > 0** | *"[God Name] seems slightly mollified."* | *"[God Name] seems groovy."* | Luck +1 (if negative) |
| **Anger reduced to 0** | *"[God Name] seems mollified."* | *"[God Name] seems cosmic (not a new fact)."* | Luck reset to 0 (if negative) |
| **Anger not reduced** | *"You have a feeling of inadequacy."* | *"The gods seem tall."* | None |

### 2. Decreasing Alignment Penalty

If you are not angry but have a negative alignment record, a valuable corpse will increase your alignment by the corpse's value (up to 0).

| Condition | Message Seen by Player | Effect |
| :--- | :--- | :--- |
| **Negative Alignment Record** | *"You feel partially absolved."* | Alignment record increased by corpse value (up to 0) |

### 3. Decreasing Prayer Timeout

If you are in good standing but your prayer timeout is active, the timeout is reduced:

$$\text{Timeout Reduction} = \frac{\text{Corpse Value} \times (500 \text{ if Chaotic else } 300)}{24 \times (2 \text{ if Priest else } 1)}$$

| Character Class | Character Alignment | Max Turn Reduction (Value 24) | Turn Reduction per Value Point |
| :--- | :--- | :--- | :--- |
| **Priest** | Chaotic | 250 turns | 10.4 turns |
| **Priest** | Lawful / Neutral | 150 turns | 6.25 turns |
| **Non-Priest** | Chaotic | 500 turns | 20.8 turns |
| **Non-Priest** | Lawful / Neutral | 300 turns | 12.5 turns |

Depending on how much prayer timeout is reduced, the player will see different messages:

| Outcome | Message Seen by Player | Hallucinating Message | Luck Effect |
| :--- | :--- | :--- | :--- |
| **Timeout reduced, but still > 0** | *"You have a hopeful feeling."* | *"You realize that the gods are not like you and I."* | Luck +1 (if negative) |
| **Timeout reduced to 0** | *"You have a feeling of reconciliation."* | *"Overall, there is a smell of fried onions."* | Luck reset to 0 (if negative) |

### 4. Divine Gifts

If you are in excellent standing (no anger, positive alignment, no prayer timeout, character level > 2, and Luck $\ge$ 0), there is a chance your god bestows a divine gift.

See [[Sacrifice Gifts]] for details.

### 5. Increasing Luck

If no timeout or anger was reduced, and no gift was granted, your Luck is increased:

$$\text{Luck Increase} = \frac{\text{Corpse Value} \times 10}{48}$$

When your Luck increases (corpse value 5 or higher), you will see one of the following messages based on your status:
- **Normal:** *"You glimpse a four-leaf clover at your feet."*
- **Blind:** *"You think something brushed your foot."*
- **Hallucinating:** *"You see crabgrass at your feet. A funny thing in a dungeon."*

| Corpse Value | Required Monster Difficulty | Luck Increase |
| :----------: | :-------------------------: | :-----------: |
| **0 to 4** | 0 to 3 (or not fresh) | 0 (No message shown) |
| **5 to 9** | 4 to 8 | +1 |
| **10 to 14** | 9 to 13 | +2 |
| **15 to 19** | 14 to 18 | +3 |
| **20 to 23** | 19 to 22 | +4 |
| **24** | 23+ | +5 |

### 6. Blessing Special Items

If you are in good standing (meaning your god is not angry and your alignment record is not negative) or if your sacrifice reduced your prayer timeout, the first unblessed special praying item (like a [[/Items/holy symbol]] or [[/Items/prayerstone]]) in your inventory will be automatically blessed. This happens as long as the sacrifice was not used to appease an angry god or fix a negative alignment.

- Message: *"[Item] softly glows with a [light blue] aura."*

## ⚖️ Sacrificing on a Cross-Aligned Altar

When you offer a fresh sacrifice on an altar of a different alignment, the outcome is determined by your current standing with your own god.

### 🔄 Converting the Altar to Your Alignment

If your own god is **NOT angry** with you, you will attempt to convert the cross-aligned altar to your own alignment.

The probability of success is:

$$\text{Success Chance} = \frac{\text{Level} + 2}{\text{Level} + 8}$$

> ℹ️ **Note:** Unaligned "godless" altars outside Gehennom convert at a 100% rate.

On aligned altars, both outcomes begin with the message:
*"You sense a conflict between [Your God] and [Altar God]."*

| Outcome | Effect | Message Addition |
| :--- | :--- | :--- |
| **Success** | • Altar converts to your alignment. <br> • Luck increases by 1. <br> • Wisdom is exercised. <br> • Any cross-aligned priest present becomes angry. | *"...You feel the power of [Your God] increase. The altar glows [white/gray/black]."* |
| **Failure** | • Altar remains unconverted. <br> • Luck decreases by 1. <br> • Wisdom is reduced. | *"...Unluckily, you feel the power of [Your God] decrease."* |

| Character Level | Altar Conversion Success Chance |
| :-------------: | :-----------------------------: |
| **1** | 33.3% |
| **2** | 40.0% |
| **3** | 45.5% |
| **5** | 53.8% |
| **10** | 66.7% |
| **15** | 73.9% |
| **20** | 78.6% |
| **30** | 84.2% |

### 🔄 Converting Yourself to the Alignment of the Altar

If your own god **IS angry** with you (or if you sacrifice at Moloch's altar in Gehennom), you can attempt to convert yourself to the altar's alignment.

Unlike converting an altar, the success chance formula does **not** play a role here. Instead, the outcome is strictly determined by the following conditions:
- **Successful Conversion**: You have **not** converted your alignment before, and the altar has an alignment.
- **Failed Conversion**: You **have** already converted before, or you attempt to convert to Moloch outside Gehennom.

| Outcome | Effect | Message |
| :--- | :--- | :--- |
| **Successful Conversion** | • Alignment base becomes the altar's alignment. <br> • Luck decreases by 3. <br> • Prayer timeout increases by 300 turns (150 for Priests). | *"You have a strong feeling that [Your God] is angry... [Altar God] accepts your allegiance."* |
| **Failed Conversion** | • God's anger increases by 3. <br> • Alignment record decreases by 5. <br> • Luck decreases by 5. <br> • Wisdom drops by 2. <br> • You are smitten by your god ([see below](#divine-anger-smite-outcomes)). | *"[Altar God] rejects your sacrifice!"* <br> *"Suffer, infidel!"* |

> ⚠️ **Warning:** Converting yourself is an extreme action. A failed conversion results in severe penalties and a direct smite! Additionally, if you successfully convert your alignment before completing the Quest, the game may become **unwinnable**. The Quest Leader will banish you for straying from your original alignment, making it impossible to retrieve the [[/Artifacts/Bell of Opening]] from your quest nemesis.

## 🦄 Special Sacrifices

### 🧑‍🤝‍🧑 Sacrificing Your Own Race

Sacrificing a corpse of your own race is a major offense. Depending on your alignment and the altar's alignment, it can result in severe divine punishment, the destruction of the altar, or the summoning of a hostile demon lord.

For a detailed breakdown of the mechanics, penalties, and demon summoning rules, see **[[Same-Race Sacrifice]]**.

### 🐕 Sacrificing Pets

Sacrificing a tame creature is a betrayal of loyalty.
- **Outcome**: Your alignment record decreases by 3, the corpse value is set to -1 (triggering your god's anger), and you permanently aggravate monsters.
- Message: *"So this is how you repay loyalty?"*

### 🦄 Sacrificing Unicorns

Sacrificing unicorns yields highly alignment-dependent effects:

| Altar Alignment | Unicorn Alignment | Outcome | Message |
| :--- | :--- | :--- | :--- |
| **Same as Unicorn** | Any | Gravely insults the altar. Wisdom is reduced, corpse value is set to -5 (triggers god's wrath). | *"Such an action is an insult to [law/balance/chaos]!"* |
| **Same as Player** | Different from Altar & Player | Very good action. Alignment increases by 5, corpse value is increased by 3. | *"You feel thoroughly on the right path."* (or *"appropriately aligned"*) |
| **Different from Player** | Same as Player | Player's alignment record is reset to -1. Corpse value is set to 1. | *None* |
| **Any** | Cross-aligned to both Altar and Player | Ordinary sacrifice. Corpse value is increased by 3. | *None* |

## ⚡ Divine Anger & Smite Outcomes

When a god is angered (either by offering a highly offensive sacrifice, or via a direct divine smite known as `angrygods`—which is triggered by severe transgressions like attacking a peaceful priest, desecrating an altar, or breaking major taboos), a random number from **$0$ to $\text{maxanger} - 1$** is rolled. 

The `maxanger` value is calculated differently depending on whether you anger your own god or a cross-aligned god, and is strictly bounded between $1$ and $15$:

### Angering a Cross-Aligned God

$$ \text{maxanger} = \left\lfloor \frac{\text{Alignment Record}}{2} \right\rfloor + L $$

Where $L$ is the Luck modifier:

$$ L = \begin{cases} - \lfloor \frac{\text{Luck}}{3} \rfloor & \text{if } \text{Luck} > 0 \\ - \text{Luck} & \text{if } \text{Luck} \le 0 \end{cases} $$

### Angering Your Own God

$$ \text{maxanger} = (3 \times \text{God's Anger}) + L $$

Where $L$ is the Luck modifier:

$$ L = \begin{cases} - \lfloor \frac{\text{Luck}}{3} \rfloor & \text{if } \text{Luck} > 0 \text{ or Alignment Record} \ge 4 \text{ (Strident)} \\ - \text{Luck} & \text{otherwise} \end{cases} $$

### Outcome

The outcome of the divine smite is chosen based on this roll:

| Roll Result | Effect | Message |
| :--: | :--- | :--- |
| **0 or 1** | God is displeased. No stat or mechanical penalty. | *"You feel that [God Name] is displeased."* (or *"bummed"*) |
| **2 or 3** | Player loses 1 Wisdom and 1 experience level. | *"Thou hast strayed from the path/art arrogant, [mortal/creature]. Thou must relearn thy lessons!"* |
| **4 or 5** | Random items in inventory are cursed. Black glow surrounds player. | *"Thou hast angered me."* |
| **6** | Player is punished (a heavy iron ball is attached to their leg). If already punished, random items are cursed instead. | *"Thou hast angered me."* |
| **7 or 9** | Hostile minion is summoned. Only triggers if the god is of your original alignment but you have converted away; otherwise, it falls through to case 8. | *"Thou hast strayed from the path, [mortal/creature]. Thou shalt pay for thine indiscretion!"* |
| **8** | Hostile minion is summoned. | *"Thou durst scorn/call upon me? Then die, [mortal/creature]!"* |
| **10+** | Player is directly smitten with magical damage or a lightning bolt. | *"Thou hast angered me."* |

## 👑 The Amulet of Yendor

Sacrificing the real Amulet of Yendor is the method of completing the game:

| Altar Type & Location | Altar Alignment | Amulet Consumed? | Game Outcome | Key Messages & Effects |
| :--- | :--- | :---: | :--- | :--- |
| **Astral Plane High Altar** | Co-Aligned | ✅ | **Win (Ascended)** | You are bathed in radiance. An invisible choir sings, and you ascend to Demigod/Demigoddess status. |
| **Astral Plane High Altar** | Cross-Aligned | ✅ | **Escape (No Win)** | The opposing god gains dominion over your god, but permits you to live. You escape the dungeon. |
| **Moloch's High Altar** (in the Sanctum) | Moloch (Unaligned) | ✅ | **Death (Game Over)** | Moloch shrugs, retains dominion, and mercilessly snuffs out your life. |
| **Normal Altar** | Co-Aligned | ❌ | **Game Continues** | You are prevented from sacrificing. <br> *"You feel an urge to return to the surface."* (or *"homesick"* if hallucinating). |
| **Normal Altar** | Cross-Aligned | ❌ | **Game Continues** | You are prevented from sacrificing. <br> *"You feel ashamed."* (or *"homesick"* if hallucinating). |
| **Normal Altar** | Moloch (Unaligned) | ❌ | **Game Continues** | You are prevented from sacrificing. Moloch gets upset. |

### 🪙 Fake Amulet of Yendor

The consequences of sacrificing a fake Amulet of Yendor depend heavily on whether you **know** it is a fake (it has been identified as a "cheap plastic imitation") or if you genuinely **believed** it was real (it remains unidentified). 

Since the gods cannot be fooled, a fake amulet is **never consumed** when sacrificed:

| Altar Type | Fake Amulet Identified? | Amulet Consumed? | Game Outcome | Key Effects & Consequences | Message |
| :--- | :---: | :---: | :--- | :--- | :--- |
| **Normal Altar** | ❌ | ❌ | **Game Continues** | Treated as if you offered the real Amulet on a normal altar (see above). No thunderclap or penalty. | *"You feel an urge to return..."* or *"You feel ashamed."* |
| **Normal Altar** | ✅ | ❌ | **Game Continues** | Thunderclap. Luck -3, alignment -1, god's anger +3. Your god gets upset. | *"You hear a nearby thunderclap."* <br> *(plus "Oh, no." if deaf)* |
| **High Altar** | ❌ | ❌ | **Game Continues** | Thunderclap. You identify the fake amulet and realize your mistake. Luck -1. | *"You hear a nearby thunderclap."* <br> *"You realize you have made a mistake."* (or *"boo-boo"* if hallucinating) |
| **High Altar** | ✅ | ❌ | **Game Continues** | Thunderclap. Luck -3, alignment -1, god's anger +3. Your god gets upset. On a cross-aligned high altar, this also triggers the devastating high altar desecration smite. | *"You hear a nearby thunderclap."* <br> *(plus "Oh, no." if deaf)* |

> ⚠️ **Warning:** Deliberately sacrificing a fake amulet you **know** is a fake is extremely dangerous. The gods punish this just as harshly on normal and high altars — and on a cross-aligned high altar, the owning god will directly smite you with lightning.
