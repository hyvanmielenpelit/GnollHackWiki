![spell-casting](/uploads/Spell%20Casting/spell-casting.webp)

## Spell Levels

Spells have 14 different levels:
- Minor cantrip, denoted by the letter "c", equals to level -1
- Major cantrip, denoted by the letter "C", equals to level 0
- Levels 1–12

## Spell Schools

Spells can belong to one of the following spell schools:

- **Abjuration** — Int/Wis, non-somatic
- **Arcane** — Int, somatic
- **Celestial** — Wis/Cha, non-somatic
- **Clerical** — Wis/Cha, non-somatic
- **Conjuration** — Int/Cha, somatic
- **Divination** — Int/Wis/Cha (Any), non-somatic
- **Enchantment** — Int/Cha, non-somatic
- **Healing** — Wis, non-somatic
- **Movement** — Int/Wis, somatic
- **Nature** — Wis/Cha, non-somatic
- **Necromancy** — Wis/Cha, non-somatic
- **Transmutation** — Int/Wis/Cha (Any), somatic

### Attribute Bonus to Spell Casting Success Chance

Spells in a particular spell school get a **bonus to the spell casting success chance** *(see below)* from one of the mental attributes:
- Intelligence (Int)
- Wisdom (Wis)
- Charisma (Cha)

Most spell schools use more than one attribute, and in that case they use the highest of the attributes. The attributes used by each spell school are listed above.

### Armor Penalty to Spell Casting

If a spell has a **somatic component**, using heavy armor incurs a spell casting penalty. If a spell has a somatic component usually depends on which magic school the spell belongs to. This fact is listed in the above list of magic schools.

## Spell Casting Success Chance

Each spell has a chance to cast it successfully. It depends on the following factors:
1. **Spell level:** -50% per each spell level
2. **Skill level in appropriate spell school**: +100% per skill level above Unskilled
3. **Character level:** +0.25%/+0.5%/+0.75%/+1%/+1.25%/+1.5% per character level when one has Unskilled/Basic/Skilled/Expert/Master/Grand Master skill in the appropriate spell school
4. **Attribute score:** +15% x Highest appropriate attribute score
5. **Armor penalty:** -X% from armor spell casting penalty *for somatic spells only (see below)*
6. **Item spell casting bonus:** +X% from items that give bonus to spell casting

The whole spell casting success formula is as follows:

```
-130%
+ -50% x Spell_Level
+ 100% x Skill_Level
+ (Skill_Level + 1) x Character_Level x 0.25%
+ 15% x Highest_Appropriate_Attribute
- Armor_Penalty_For_Somatic_Spells_Only
+ Item_Spell_Casting_Bonus
```

## Spell Components

Spells can have 3 types of components:
- **Verbal component** — Most spells require speaking magic words. If you are strangled or drowning, you cannot cast spells with a verbal component.
- **Somatic component** — If a spell has a somatic component, you get penalty to spell casting success chance for wearing heavy armor. Usually, wizard spells have a somatic component while priest spells do not have it.
- **Material component**  — Most spells require you to prepare (mix) them by using their material components. You do this by using the Mix command.

## Preparing/Mixing Spells

Most spells have one or more material components. When you mix the spells, you get a **number of castings** for that spell.

You prepare spells by using the **Mix** command.

You see the number of remaining castings in both Cast and Mix menu.

## Casting Spells

You cast spells using the **Cast** command. Spells have:
1. Mana Cost
2. Success chance *(see above)*
3. Casting Time
4. Cooldown
5. Number of castings *(from mixing, see above)*

### Mana Cost

Spells cost **mana (energy)** to cast. The amount of current mana and your maximum mana amount are listed in the status bar (old versions of the game) or as a blue orb on the left side of the screen (mobile versions of the game).

You get [[maximum mana]] from:
- [[Character Class|Character Classes]]
- [[Race|Races]]
- [[Intelligence]] or [[Wisdom]] — Higher of Int/Wis is used to calculate your mana pool.
- [[Experience Level]] — You gain more mana as you level up.
- [[Items]] — Some items increase your mana pool.

Mana regenerates over time at the rate of `Max_Mana/640` per turn. Energy regeneration from items doubles the rate.

### Casting Time

Spells usually take 0 or 1 turns to cast. Most spells require 1 turn, but healing spells that restore lost hit points do not consume a turn to cast.

### Cooldown

Spells can also have a cooldown, which prevents the spell being cast again before the cooldown has expired. For example, healing spells that restore lost hit points have a 2-turn cooldown.

## Learning spells

You learn spells from:
- Spell books
- Priest NPCs
- Artificer NPCs

When learning a spell from a spell book, the following rules apply:
- Reading a **blessed spell book** gives you a 100% chance to learn the spell.
- Reading a **uncursed spell book** gives you a percentage chance to learn the spell, depending on your level and your skill level in the appropriate school.
- Reading a **cursed spell book** always fails and gives you a negative effect.

NPCs ask you for a fee, but you learn the spell with a 100% chance.

## Managing Spells

Using the **Spell** menu, you can:
- Reorder spells
- Sort spells
- Make shortcuts to spells, assigning them to the number keys (0–9)
- Forget spells

## Notes

- Spell books crumble to dust when read.
- You cannot forget spells over time like in NetHack.
- If you are *cancelled*, you cannot cast spells or use wands.