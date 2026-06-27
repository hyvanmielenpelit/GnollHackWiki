---
name: wiki_verify_objects
description: Instructions for comparing regular object items (weapons, armor, tools, etc.) in GnollHackWiki with the GnollHack C code data structures (objclass) to spot mistakes in the documentation.
---

# Verifying Object Items

When verifying standard objects (weapons, armor, comestibles, tools, etc.) on the GnollHackWiki against the GnollHack C code, you must compare the item's documentation with the `struct objclass` defined in `include/objclass.h` and the actual data instantiated in `src/objects.c`.

## Important Rules
- **NEVER compare item weights.** Do not check or update `oc_weight` or the weight listed on the wiki.
- **Pay attention to which kind of data is present in `struct objclass`.** 

## What to Compare

### 1. General Properties (All Objects)
- **Base Cost**: Compare the wiki's listed cost with `oc_cost` (15th argument in `OBJECT` macro).
- **Material**: Compare the wiki's material with `oc_material`.

### 2. Weapons
- **Damage (Small Monsters)**: Compare with `oc_wsdice`, `oc_wsdam` (die size), and `oc_wsdmgplus` (modifier). E.g., `1d6+1` means `oc_wsdice=1`, `oc_wsdam=6`, `oc_wsdmgplus=1`.
- **Damage (Large Monsters)**: Compare with `oc_wldice`, `oc_wldam`, and `oc_wldmgplus`.
- **To-Hit Bonus**: Compare with `oc_hitbonus`.
- **Damage Type**: Check if it's PIERCE, SLASH, or WHACK.

### 3. Armor
- **Armor Class (AC) Bonus**: Compare with `oc_oc1` (which acts as `oc_armor_class` for armor).
- **Magic Cancellation (MC) Bonus**: Compare with `oc_oc2` (which acts as `oc_magic_cancellation` for armor).
- **Spell Casting Penalty**: Compare with `oc_oc7` (which acts as `oc_spell_casting_penalty`).

### 4. Comestibles (Food/Potions)
- **Nutrition**: Compare with `oc_nutrition`.
- **Effects**: Check the properties defined in `oc_oc1` and `oc_oc2` (e.g., `oc_edible_effect`).

## How to Verify
1. Locate the item in `src/objects.c`.
2. Map the fields using the `OBJECT` macro definition. 
3. Check the wiki page for discrepancies based on the list above.
