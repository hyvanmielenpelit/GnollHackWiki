---
name: wiki_verify_spells
description: Instructions for comparing spells and spellbooks in GnollHackWiki with the GnollHack C code data structures (objclass and SPELL macro) to spot mistakes in the documentation.
---

# Verifying Spells and Spellbooks

When verifying spells and spellbooks on the GnollHackWiki against the GnollHack C code, you must compare the item's documentation with the `struct objclass` defined in `include/objclass.h` and the data instantiated via the `SPELL` macro in `src/objects.c`.

## Important Rules
- **NEVER compare item weights.** Do not check or update `oc_weight` or the weight listed on the wiki.
- **Pay attention to which kind of data is present in `struct objclass` and the `SPELL` macro.** 

## Data Sources
Spells and spellbooks are defined together in `src/objects.c` using the `SPELL` macro. The `SPELL` macro arguments populate the `struct objclass` for the spellbook object. The player's runtime spell knowledge is tracked using `struct spell` (`include/spell.h`), but static properties for documentation are found in the `SPELL` macro.

### SPELL Macro Structure
```c
SPELL(name, desc, effectdesc, contentdesc, itemdesc, skill, prob, learndelay, cooldown, \
      level, manacost, attr, range, radius, skillchance, savingthrowadj, mgc, dir, dirsubtype, extraspelldata, \
      sdice, sdam, sdmgplus, ldice, ldam, ldmgplus, \
      sflags, sflags2, mflags, adtype, color, soundset, flags, flags2, flags3, flags4, flags5, flags6)
```

## What to Compare

### 1. General Spell Properties
- **Level**: Compare with the `level` argument (maps to `oc_spell_level` / `oc_oc2`).
- **Mana Cost**: Compare with the `manacost` argument (maps to `oc_spell_mana_cost` / `oc_oc3`).
- **Spell Category / Skill**: Compare with the `skill` argument (e.g., `P_ATTACK_SPELL`, `P_HEALING_SPELL`; maps to `oc_skill`).
- **Base Attribute**: Compare with the `attr` argument (e.g., `A_INT`, `A_WIS`; maps to `oc_spell_attribute` / `oc_oc4`).
- **Cooldown**: Compare with the `cooldown` argument (maps to `oc_spell_cooldown` / `oc_oc1`).

### 2. Spell Effects (Damage, Duration, Range)
- **Range**: Compare with the `range` argument (maps to `oc_spell_range` / `oc_oc5`).
- **Radius**: Compare with the `radius` argument (maps to `oc_spell_radius` / `oc_oc6`).
- **Damage (Base)**: Compare with `sdice`, `sdam` (die size), and `sdmgplus`. (maps to `oc_spell_dmg_dice`, `oc_spell_dmg_diesize`, `oc_spell_dmg_plus`).
- **Damage (Per Level) / Duration**: Compare with `ldice`, `ldam`, and `ldmgplus`. Depending on the spell, this represents per-level scaling or duration (maps to `oc_spell_per_level_dice`, etc.).
- **Directionality**: Compare with the `dir` argument (e.g., `RAY`, `IMMEDIATE`, `NODIR`; maps to `oc_dir`).

### 3. Spellbook Properties
- **Base Cost**: Spells calculate cost dynamically based on level: `(level + 2) * 10 + (level + 1) * (level + 1) * 2 + 10`. Verify the wiki price matches this formula.
- **Reading Delay**: Compare with the `learndelay` argument (maps to `oc_delay`).
- **Color/Description**: Compare with the `desc` argument (e.g., "parchment", "silver-plated").

## How to Verify
1. Locate the spell in `src/objects.c` (search for `SPELL("spell_name"`).
2. Map the macro arguments to the properties listed above.
3. Check the wiki page for the spell and its corresponding spellbook to spot discrepancies.
