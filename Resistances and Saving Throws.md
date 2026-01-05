![resistances-and-saving-throws](/uploads/Resistances%20and%20Saving%20Throws/resistances-and-saving-throws.webp)

## Overview

GnollHack has seven kinds of resistances to magical attacks:
1. Full Resistances
2. Partial Resistances
3. Magic Resistance
4. Magic Cancellation
5. Wisdom-Based Saving Throw
6. Constitution-Based Saving Throw
7. Reflection

These resistances work similarly for players and monsters with small differences.

## 1. Full Resistances

- **Bisection Resistance** — Immunity to bisection attacks *(namely, [[/Artifacts/The Tsurugi of Muramasa]])*
- **Charm Resistance** — Immunity to nymph stealing and seduction attacks
- **Curse Resistance** — Immunity to cursing of items in the inventory
- **Death Resistance** — Immunity to death attacks
- **Disintegration Resistance** — Immunity to disintegration attacks
- **Flash Resistance** — Immunity to blinding attacks
- **Drain Resistance** — Immunity to level drain attacks
- **Free Action** — Immunity to paralysis attacks
- **Full Acid Resistance** — Immunity to acid attacks
- **Full Cold Resistance** — Immunity to cold attacks, also protects equipment from cold attacks
- **Full Fire Resistance** — Immunity to fire attacks, also protects equipment from fire attacks
- **Full Magic Missile Resistance** — Immunity to magic missiles and striking
- **Full Shock Resistance** — Immunity to lightning attacks, also protects equipment from lightning attacks
- **Hallucination Resistance** — Immunity to hallucination
- **Lycanthropy Resistance** — Immunity to lycanthropy
- **Mind Shielding** — Immunity to telepathic attacks of tentacled ones
- **Poison Resistance** — Immunity to poison attacks
- **Polymorph Resistance** — Immunity to polymorph traps
- **Sickness Resistance** — Immunity to sickness attacks, including *mummy rot*
- **Sleep Resistance** — Immunity to sleep attacks
- **Sliming Resistance** — Immunity to sliming attacks *(namely, the green slime)*
- **Stoning Resistance** — Immunity to petrification attacks

## 2. Partial Resistances

- **50% or 75% Acid Resistance** — Reduces acid damage by 50% or 75%
- **50% or 75% Cold Resistance** — Reduces cold damage by 50% or 75%, and has a 50% or 75% chance to protect equipment from cold attacks
- **50% or 75% Fire Resistance** — Reduces fire damage by 50% or 75%, and has a 50% or 75% chance to protect equipment from fire attacks
- **50% or 75% Magic Missile Resistance** — Reduces magic missile and striking damage by 50% or 75%
- **50% or 75% Shock Resistance** — Reduces lightning damage by 50% or 75%, and has a 50% or 75% chance to protect equipment from lightning attacks

## 3. Magic Resistance

Magic Resistance is very important to get in GnollHack, preferably before dungeon level 8, when polymorph traps start to appear. It protects you from the following things:
- Polymorph traps
- Some other polymorph effects *(see below)*
- Anti-magic traps
- Monster spells

Additionally, unique monsters are shielded from *cancellation spells and effects* by Magic Resistance *(see below)*.

### Nerfs to Magic Resistance

Contrary to NetHack, Magic Resistance does not protect you from:
- **Death attacks** — such as the Finger of Death spell, or the wand of death
    - You need *Death Resistance* to be safe from death attacks
- **Magic missiles** — such as the Magic Missile spell, or the wand of magic missile
    - You need *Full Magic Missile Resistance* to be immune to magic missiles
- **Striking** — such as the Force Bolt spell or the wand of striking
    - You need *Full Magic Missile Resistance* to be immune to striking
- **Curses** — Magic Resistance used to halve the effect of incoming curses but it does not do it anymore
    - You need *Curse Resistance* to be immune to cursing

### Chance to Work

If a player gets Magic Resistance from an item, it has always a 100% chance to work.

However, monsters' Magic Resistance has a percentage chance to work. The magic resistance is listed in the monsters' stats.

### Cancellation Attacks and Magic Resistance

**Cancellation attacks** prevent players and monsters from using *spells* and *wands*. 

They can be resisted as follows:
- **Cancellation spell or effect** against a normal monster bypasses magic resistance and has a 100% chance to work. However, unique monsters are still shielded from cancellation by magic resistance.
- **Disjunction spell or effect** bypasses every monster's magic resistance, including unique ones, and thus has always a 100% chance to work.
- **Cancellation attacks against a player**, such as the gaze attack of a gazer, bypass magic resistance and have a 100% chance to work.

Additionally, it is good to remember the following things about cancellation:
- If you zap a [[/Items/wand of cancellation]] or cast a *cancellation spell* at yourself or at items, it will set items' beautitude to Uncursed, set the enchantment to +0, make most potions into water, blank scrolls and spellbooks, and set items' charges to 0.
- Putting a [[/Items/wand of cancellation]] into a [[/Items/bag of holding]] will destroy the bag.

### Polymorph and Magic Resistance

Magic resistance protects from:
- [[/Items/Wand of polymorph]] zapped at monsters
- Polymorph traps
- [[/Spells/Polymorph]] spell cast at monsters
- Polymorph from being hit with a wielded [[/Items/potion of polymorph]]

Magic resistance does *not* protect you from:
- Polymorph from [[/Items/ring of polymorph]]
- [[/Items/Wand of polymorph]] zapped at yourself
- [[/Spells/Polymorph]] spell cast at yourself
- Polymorph from drinking a [[/Items/potion of polymorph]]

## 4. Magic Cancellation

Magic Cancellation protects you from *magical or semi-magical touch attacks*. You get Magic Cancellation (MC) from armor. Contrary to NetHack, it stacks and the effect is on the scale 0–25, which gives you a % chance to resist magical or semi-magical touch attacks. The chance is listed in the status bar. MC protects you from:
- Life drain attacks (which drain an experience level)
- Lycanthropy
- Nymph stealing attacks (but nymphs' attack gives a big penalty to MC, so it has a bigger than normal chance to work)
- Mummy rot
- Paralysis attacks
- Seduction attacks
- Stoning (petrification) touch attacks
- Terminal illness attacks

### Magic Cancellation Chance

The Magic Cancellation formula is the following:

| MC | Chance to Resist |
|:--:| :--------------: |
| 0 | 0% |
| 1 | 10% |
| 2 | 20% |
| 3 | 30% |
| 4 | 40% |
| 5 | 50% |
| 6 | 55% |
| 7 | 60% |
| 8 | 65% |
| 9 | 70% |
| 10 | 75% |
| 11 | 80% |
| 12 | 82% |
| 13 | 84% |
| 14 | 86% |
| 15 | 88% |
| 16 | 90% |
| 17 | 91% |
| 18 | 92% |
| 19 | 93% |
| 20 | 94% |
| 21 | 95% |
| 22 | 96% |
| 23 | 97% |
| 24 | 98% |
| 25 and above | 99% |

### Modifiers to Magic Cancellation

Monster attacks can incur a bonus or penalty to MC depending on the monster difficulty. Attacks of higher level monsters usually incur more penalty to MC than those of lower level monsters.

### Magic Cancellation from Enchantments

When you enchant an armor, you get +1 MC for every +3 enchantment. Therefore, it is very useful to enchant armor to at least +3. The same rule applies to divine protection that you can buy from a priest NPC by making a major contribution to the temple.

### Intelligence Drain Attacks

Magic Cancellation does *not* protect you from the **intelligence drain attacks of tentacled ones**. Instead, you need a helmet to block 90% of these attacks. Additionally, you can wear a [[/Items/nose ring of cerebral safeguarding]] or a [[/Items/ring of sustain ability]] to become immune to the intelligence drain attacks.

Note that the intelligence drain attacks also cause *amnesia*, which makes you forget items' identification, spells, and the layout of dungeon levels.

## 5. Wisdom-Based Saving Throw

Contrary to NetHack, charm, sleep, and other mind-affecting spells and effects, such as fear, do not check against the magic resistance of monsters. Instead, monsters need to make a wisdom-based saving throw to resist the effect. The chance of resisting is equal to:

`-30% + 5% x Wisdom`

Thus, a monster with Wisdom 10 has a 20% chance of resisting and a monster with Wisdom 20 has a 70% chance of resisting such a spell or effect.

Spells cast with the Skilled or higher spell school skill incur a -15% penalty to the wisdom-based saving throw per skill level above Basic. A spell cast at an Unskilled skill level incurs a +15% bonus to the wisdom-based saving throw.

Blessed items with mind-affecting effects, such a blessed [[/Items/scroll of taming]] or a blessed [[/Items/wand of sleep]], incur a -25% penalty to the wisdom-based saving throw. Similarly, cursed items with mind-affecting effects – if there is no separate cursed effect – such as is the case with a cursed [[/Items/wand of sleep]], incur a +25% bonus to the wisdom-based saving throw.

## 6. Constitution-Based Saving Throw

Some spells, such as Power Words, check against the constitution of the target. The chance of resisting is:

`-30% + 5% x Constitution`

Thus, a monster with Constitution 10 has a 20% chance of resisting and a monster with Constitution 20 has a 70% chance of resisting such a spell or effect.

Spells cast with the Skilled or higher spell school skill incur a -15% penalty to the constitution-based saving throw per skill level above Basic. A spell cast at an Unskilled skill level incurs a +15% bonus to the constitution-based saving throw.

## 7. Reflection

Reflection gives a complete immunity to ray attacks, such as most wands and dragon breath. The rays reflect back to the caster.

## Advice on Getting Resistances

Generally, *magic resistance* and *reflection* are considered most important to get for a player. However, *poison resistance*, *sleep resistance*, *free action*, and *death resistance* are generally very important as well, because they can shield you from some insta-death attacks and situations. Additionally, *drain resistance* is important against some level-draining undead.

Full elemental resistances are also useful against some item-destruction effects (such as shocking spheres) but are generally not considered as must-haves.
