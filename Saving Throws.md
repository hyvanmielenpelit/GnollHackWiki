> 👉 **This page covers the ability-based saving throws in GnollHack that allow targets to resist certain spells, wands, and effects.**

## 🧠 Wisdom-Based Saving Throw

Contrary to NetHack, charm, sleep, and other mind-affecting spells and effects, such as fear, do not check against the magic resistance of monsters. Instead, monsters need to make a wisdom-based saving throw to resist the effect. The chance of resisting is equal to:

$-30\% + 5\% \times \text{Wisdom}$

### Base Saving Throw Chance

| Wisdom | Chance of Resisting |
| :---: | :---: |
| **6** | 0% |
| **10** | 20% |
| **14** | 40% |
| **18** | 60% |
| **21** | 75% |
| **25** | 95% |

### Spell Skill Modifiers

The caster's proficiency in the relevant spell school modifies the target's chance to resist. Higher skill levels make the spell harder to resist, while lower skill levels grant the target a bonus.

| Skill Level | Saving Throw Modifier |
| :--- | :---: |
| **Unskilled** | +15% |
| **Basic** | 0% |
| **Skilled** | -15% |
| **Expert** | -30% |
| **Master** | -45% |
| **Grand Master** | -60% |

#### Extra Penalty for Slow, Hold, and Fear Spells

The spells [[/Spells/Slow monster]], [[/Spells/Mass slow]], [[/Spells/Hold monster]], [[/Spells/Mass hold]], [[/Spells/Hold undead]], and [[/Spells/Fear]] apply an additional penalty of -10% per skill level above Unskilled to the target's saving throw, on top of the general modifier above.

| Skill Level | General modifier | Extra (slow/hold/fear) | Effective |
| :--- | :---: | :---: | :---: |
| **Unskilled** | +15% | 0% | +15% |
| **Basic** | 0% | -10% | -10% |
| **Skilled** | -15% | -20% | -35% |
| **Expert** | -30% | -30% | -60% |
| **Master** | -45% | -40% | -85% |
| **Grand Master** | -60% | -50% | -110% |

In the source code, the extra term is `save_adj -= 2 * (skill_level - P_UNSKILLED)` in src/zap.c at line 772 (the case shared by slow monster, mass slow, and the wand of slow monster), line 815 (hold monster, mass hold), line 850 (hold undead), and line 949 (fear). One point of `save_adj` is 5% (src/mhitu.c:1517, `percentage = 5 * adjscore - 30`). The general modifier is `get_spell_skill_level_saving_throw_adjustment` at src/zap.c:361-364.

Immunity is checked before the save: monsters that are immune to fear outright — those with innate fear resistance, all undead, and all mindless monsters — are simply unaffected and never roll at all. See [[/Spells/Fear]].

### Wand Skill Modifiers

When a wand is used, the user's Wand skill level applies a penalty to the target's saving throw, making wands more reliable at higher skill levels.

| Skill Level | Saving Throw Modifier |
| :--- | :---: |
| **Basic** | -10% |
| **Skilled** | -20% |
| **Expert** | -30% |

### Lowered Magic Resistance Penalties

If a target's Magic Resistance has been lowered or depleted, they suffer severe penalties to all ability-based saving throws, making them significantly more vulnerable.

| Magic Resistance Status | Saving Throw Penalty |
| :---: | :---: |
| **Full** | 0% |
| **3/4** | -20% |
| **1/2** | -40% |
| **1/4** | -60% |
| **None** | -100% |

### Monster Rank Modifiers

When monsters cast spells or use wands, their rank simulates high skill levels.

| Monster Rank | Simulated Skill Level | Saving Throw Penalty |
| :--- | :---: | :---: |
| **Lord-tier** | Expert | -30% |
| **Prince-tier** | Grand Master | -60% |

### Item Beatitude Modifiers

Items with mind-affecting effects (such as a [[/Items/scroll of taming]] or [[/Items/wand of sleep]]) apply modifiers based on beatitude.

| Beatitude | Saving Throw Modifier | Notes |
| :--- | :---: | :--- |
| **Blessed** | -25% | |
| **Uncursed** | 0% | |
| **Cursed** | +25% | Applies if there is no separate cursed effect. |

## 🔋 Constitution-Based Saving Throw

Some spells, such as Power Words and [[/Spells/Holy word]], and some potion effects, such as sickness and poison, check against the constitution of the target. The chance of resisting is:

$-30\% + 5\% \times \text{Constitution}$

### Base Saving Throw Chance

| Constitution | Chance of Resisting |
| :---: | :---: |
| **6** | 0% |
| **10** | 20% |
| **14** | 40% |
| **18** | 60% |
| **21** | 75% |
| **25** | 95% |

> ℹ️ **Note:** The [[/Spells/Holy word]] spell checks against the Constitution of the target to determine if it is affected, just like other constitution-based saving throws.

### Spell Skill Modifiers

The caster's proficiency in the relevant spell school modifies the target's chance to resist. Higher skill levels make the spell harder to resist, while lower skill levels grant the target a bonus.

| Skill Level | Saving Throw Modifier |
| :--- | :---: |
| **Unskilled** | +15% |
| **Basic** | 0% |
| **Skilled** | -15% |
| **Expert** | -30% |
| **Master** | -45% |
| **Grand Master** | -60% |

## 🤸 Dexterity-Based Saving Throw

The [[/Spells/Flesh to stone]] spell checks against the dexterity of the target to see if they can dodge the petrification effect. The chance of resisting uses the same formula:

$-30\% + 5\% \times \text{Dexterity}$

### Base Saving Throw Chance

| Dexterity | Chance of Resisting |
| :---: | :---: |
| **6** | 0% |
| **10** | 20% |
| **14** | 40% |
| **18** | 60% |
| **21** | 75% |
| **25** | 95% |

## 🗣️ Charisma-Based Saving Throw

The [[/Spells/Silence]] spell checks against the charisma of the target to see if they can resist the effect. The chance of resisting uses the same formula:

$-30\% + 5\% \times \text{Charisma}$

### Base Saving Throw Chance

| Charisma | Chance of Resisting |
| :---: | :---: |
| **6** | 0% |
| **10** | 20% |
| **14** | 40% |
| **18** | 60% |
| **21** | 75% |
| **25** | 95% |

## ℹ️ See Also

- [[Resistances and Saving Throws]]
