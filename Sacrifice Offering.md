# 🛐 Sacrifice Offering

> 👉 **Sacrificing is a core gameplay mechanic in GnollHack. By using the Offer (`Alt+o`) command while standing on an altar, you can sacrifice a corpse to appease your god, manipulate altar alignments, and obtain divine gifts.**

To offer a sacrifice, you must be standing on an altar.

## 💡 Summary of Offerings

The primary items offered on an altar are:
- 🥩 **Corpses**: They must be fresh, meaning they were killed within the last 50 turns<sup>1</sup>.

If you attempt to sacrifice other items or old corpses, the game will reject them or ignore the offering:

| Attempted Offering | Condition | Message Seen by Player | Result |
| :--- | :--- | :--- | :--- |
| **Invalid Item** | Any item that is not a corpse | *"You can't sacrifice that!"* | Item is not consumed; action ends |
| **Old Corpse** | Corpse killed more than 50 turns ago<sup>1</sup> | *"Nothing happens."* | Corpse is not consumed; action ends |
| **Fresh Corpse** | Corpse killed within 50 turns<sup>1</sup> | *Depends on character state (see below)* | Corpse is consumed; effects applied |

- <sup>1</sup> Lizard and lichen corpses do not rot for eating purposes, but they still become too old to be sacrificed after 50 turns. Acid blob corpses are the only corpses that are accepted as fresh regardless of age.

## 🧟 Rotten vs. Fresh Corpses

When dealing with corpses, the game distinguishes between being "rotten" (for eating) and being "fresh" (for sacrificing). This distinction is especially important for undead corpses (such as zombies, vampires, mummies, and liches).

- **Eating (Rotten):** The game considers undead corpses inherently tainted. If you attempt to eat one, it is treated as "rotten" and will make you sick, regardless of when the monster was killed.
- **Sacrificing (Fresh):** The sacrifice mechanic ignores food taint. A corpse is considered "fresh" for sacrificing strictly based on its age—specifically, if the monster was killed within the last 50 turns. 

Therefore, a newly killed undead corpse is "rotten" for eating but "fresh" for sacrificing. You can successfully sacrifice these fresh undead corpses for their full value (plus the alignment bonus for lawful and neutral players) without any penalty.

## 💨 Offering Consumption Messages

When a valid fresh corpse is successfully offered, it is consumed and a message is displayed based on your character's status:

| Character State | Message Seen by Player |
| :--- | :--- |
| **Lawful** (Not Blind, Not Hallucinating) | *"Your sacrifice is consumed in a flash of light!"* |
| **Neutral or Chaotic** (Not Blind, Not Hallucinating) | *"Your sacrifice is consumed in a burst of flame!"* |
| **Blind & Lawful** | *"Your sacrifice disappears!"* |
| **Blind & Neutral or Chaotic** | *"Your sacrifice is consumed in a burst of flame!"* |
| **Hallucinating** (1 of 3 chosen randomly) | 1. *"Your sacrifice sprouts wings and a propeller and roars away!"* <br /> 2. *"Your sacrifice puffs up, swelling bigger and bigger, and pops!"* <br /> 3. *"Your sacrifice collapses into a cloud of dancing particles and fades away!"* |

## 🎚️ Corpse Value

The value of a fresh corpse determines its efficacy.
- **Base Value**: Equal to the monster's **difficulty + 1**.
- **Maximum Value**: Capped at **24** (e.g., adult dragons, arch-liches).
- **Partially Eaten Corpses**: The value is scaled down proportionally to the remaining nutrition.

### 🧟 Undead Corpses

Sacrificing an undead corpse provides different values depending on the player's alignment:
- **Lawful and Neutral players**: Receive a `+1` bonus to the value. 
  - A *fresh* undead corpse has a final value of **`Difficulty + 2`** (base `Difficulty + 1` plus `1` bonus).
  - An *old* undead corpse has a final value of **`1`** (base `0` plus `1` bonus). Because the final value is greater than 0, lawful and neutral players can successfully sacrifice old undead corpses!
- **Chaotic players**: Receive no bonus and use the standard calculations.
  - A *fresh* undead corpse has a normal value of **`Difficulty + 1`**.
  - An *old* undead corpse has a value of **`0`** and cannot be sacrificed (*"Nothing happens."*).

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
If you are in excellent standing (no anger, positive alignment, no prayer timeout, character level > 2, and Luck $\ge$ 0), there is a chance your god bestows a divine gift:
- **Gift Chance**: Success occurs with a probability of: $P = \frac{1}{10 + 2 \times G \times A}$ where $G$ is the number of gifts previously received, and $A$ is the number of created artifacts in the game.
- **Details**: See [[/Sacrifice Gifts]] for gift pools and mechanics.

### 5. Increasing Luck
If no timeout or anger was reduced, and no gift was granted, your Luck is increased:
$$\text{Luck Increase} = \frac{\text{Corpse Value} \times 10}{48}$$

| Corpse Value | Required Monster Difficulty | Luck Increase | Message |
| :--- | :--- | :--- | :--- |
| **0 to 4** | 0 to 3 (or not fresh) | 0 | *None* |
| **5 to 9** | 4 to 8 | +1 | Glimpse a four-leaf clover at your feet / think something brushed your foot (if blind) / see crabgrass (if hallucinating) |
| **10 to 14** | 9 to 13 | +2 | *Same as above* |
| **15 to 19** | 14 to 18 | +3 | *Same as above* |
| **20 to 23** | 19 to 22 | +4 | *Same as above* |
| **24** | 23+ (e.g. Dragons, Arch-Liches) | +5 | *Same as above* |

### 6. Blessing Special Items
If you are in good standing or your prayer timeout was reduced, there is a chance that a special praying item (like a holy symbol or prayerstone) in your inventory will be blessed.
- Message: *"[Item] softly glows with a [light blue] aura."*

## ⚖️ Sacrificing on a Cross-Aligned Altar

If you sacrifice on a cross-aligned altar, the outcome is determined by your current standing.

### 🔄 Converting Yourself
If your own god is angry with you (or if you sacrifice at Moloch's altar in Gehennom), you can convert yourself to the altar's alignment, provided you have not converted before and the altar has an alignment.
- **Outcome**: Alignment base becomes the altar's alignment, Luck decreases by 3, and your prayer timeout increases by 300 turns (150 for Priests).
- Message: *"You have a strong feeling that [Your God] is angry... [Altar God] accepts your allegiance."*
- ⚠️ **Warning:** If conversion fails or is rejected (or you attempt to convert to Moloch outside Gehennom), your god's anger increases by 3, you lose 5 alignment, you lose 5 Luck, your Wisdom drops by 2, and you will be smitten by your god.

### 🔄 Converting the Altar
If your own god is NOT angry with you, you attempt to convert the altar to your alignment.
- **Success Chance**: Calculated as $\frac{\text{Level} + 2}{\text{Level} + 8}$. (Unaligned "godless" altars outside Gehennom convert at a 100% rate).
- **Successful Conversion**: The altar is converted to your alignment. Luck increases by 1, Wisdom is exercised, and any cross-aligned priest present becomes angry.
  - Message: *"You sense a conflict between [Your God] and [Altar God]. You feel the power of [Your God] increase. The altar glows [white/gray/black]."*
- **Failed Conversion**: Luck decreases by 1, and Wisdom is reduced.
  - Message: *"You sense a conflict between [Your God] and [Altar God]. Unluckily, you feel the power of [Your God] decrease."*

| Character Level | Altar Conversion Success Chance |
| :--- | :--- |
| **Level 1** | 33.3% |
| **Level 2** | 40.0% |
| **Level 3** | 45.5% |
| **Level 5** | 53.8% |
| **Level 10** | 66.7% |
| **Level 15** | 73.9% |
| **Level 20** | 78.6% |
| **Level 30** | 84.2% |

## 🦄 Special Sacrifices

### 🧑‍🤝‍🧑 Sacrificing Your Own Race
Sacrificing a corpse of your own race is a major offense.
- **For Non-Demons**: Lowers Wisdom. If sacrificed on a non-chaotic and non-Moloch altar, it curses the altar to become chaotic, stains it with blood, angers any priest, and angers your own god (decreases alignment and Luck by 5, anger +3, Wisdom -1).
- **Demon Summoning**: Sacrificing your own race on a chaotic or Moloch altar initiates a demon summoning:
  - If you are not chaotic, and the altar is chaotic, the altar is destroyed (*"The blood floods the altar, which vanishes in a black cloud!"*).
  - If you are chaotic or the altar is Moloch's, the altar remains covered in blood (*"The blood covers the altar!"*). Luck increases by 2 (+2), or decreases by 2 (-2) on Moloch's altar.
  - **The Summoned Demon**: In Gehennom, it summons **Demogorgon**. Elsewhere, it summons a random Demon Lord.
  - **Peaceful Chance**: If you are chaotic, the demon has a chance to be peaceful. The **very first** demon lord summoned via altar in a game is **guaranteed** to be peaceful. Subsequent summonings have a lower chance based on your alignment rank.
  - **Terror**: If you do not have Fear Resistance, you will be paralyzed for 3 turns (*"You are terrified, and unable to move."*).
- **For Demons**: If you are in demon form, sacrificing your own race is satisfying and exercises Wisdom (*"You find the idea very satisfying."*).

### 🐕 Sacrificing Pets
Sacrificing a tame creature is a betrayal of loyalty.
- **Outcome**: Alignment record decreases by 3, the corpse value is set to -1 (triggering god's anger), and you permanently aggravate monsters.
- Message: *"So this is how you repay loyalty?"*

### 🦄 Sacrificing Unicorns
Sacrificing unicorns yields highly alignment-dependent effects:

| Altar Alignment | Unicorn Alignment | Outcome | Message |
| :--- | :--- | :--- | :--- |
| **Same as Unicorn** | Any | Gravely insults the altar. Wisdom is reduced, corpse value is set to -5 (triggers god's wrath). | *"Such an action is an insult to [law/balance/chaos]!"* |
| **Same as Player** | Different from Altar & Player | Very good action. Alignment increases by 5, corpse value is increased by 3. | *"You feel thoroughly on the right path."* (or *"appropriately aligned"*) |
| **Different from Player** | Same as Player | Player's alignment record is reset to -1. Corpse value is set to 1. | *None* |
| **Any** | Cross-aligned to both Altar and Player | Ordinary sacrifice. Corpse value is increased by 3. | *None* |

## 💢 Divine Anger & Smite Outcomes

When a god is angered (via `angrygods` or a negative sacrifice value), a random outcome is chosen based on your current anger level (capped at 15):

| Rolled Roll Value | Effect | Message |
| :--- | :--- | :--- |
| **0 or 1** | God is displeased. No stat or mechanical penalty. | *"You feel that [God Name] is displeased."* (or *"bummed"*) |
| **2 or 3** | Player loses 1 Wisdom and 1 experience level. | *"Thou hast strayed from the path/art arrogant, [mortal/creature]. Thou must relearn thy lessons!"* |
| **4 or 5** | Random items in inventory are cursed. Black glow surrounds player. | *"Thou hast angered me."* |
| **6** | Player is punished (a heavy iron ball is attached to their leg). | *"Thou hast angered me."* |
| **7 or 9** | Hostile minion is summoned. (Only if God is original alignment but player converted away). | *"Thou hast strayed from the path, [mortal/creature]. Thou shalt pay for thine indiscretion!"* |
| **8** | Hostile minion is summoned. | *"Thou durst scorn/call upon me? Then die, [mortal/creature]!"* |
| **10+** | Player is directly smote with magical damage or lightning bolt. | *"Thou hast angered me."* |

## 👑 The Amulet of Yendor

Sacrificing the real Amulet of Yendor is the method of completing the game:
- **Astral Plane High Altar (Co-Aligned)**: Offers the Amulet to your god, culminating in your ascension to demigod/demigoddess status. For details, see [[/Ascension]].
- **Astral Plane High Altar (Cross-Aligned)**: The opposing god gains dominion over your god. They permit you to live, and you escape the dungeon.
- **Astral Plane High Altar (Moloch)**: Moloch retains dominion and snuffs out your life.
- **Normal Altar**:
  - Moloch Altar: God is upset.
  - Co-aligned: *"You feel an urge to return to the surface."* (or *"homesick"* if hallucinating).
  - Cross-aligned: *"You feel ashamed."* (or *"homesick"* if hallucinating).

### 🪙 Fake Amulet of Yendor
Sacrificing a fake Amulet of Yendor triggers a thunderclap (*"You hear a nearby thunderclap."*).
- **If Unidentified**: You identify the fake amulet and realize your mistake. Luck decreases by 1.
- **If Already Identified**: Luck decreases by 3, alignment record decreases by 1, god anger increases by 3, and the value is set to -3 (god gets upset). If deaf, you receive the message *"Oh, no."*
