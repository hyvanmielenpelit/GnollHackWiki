---
name: wiki_verify_monsters
description: Instructions for comparing monsters in GnollHackWiki with the GnollHack C code data structures (permonst) to spot mistakes in the documentation.
---

# Verifying Monsters

When verifying monsters on the GnollHackWiki against the GnollHack C code, compare the monster's documentation with `struct permonst` defined in `include/permonst.h` and the data in `src/monst.c`.

## Important Rules
- **NEVER compare item weights.** Do not check or update corpse weight (`cwt`) or any other weight on the wiki.
- **Pay attention to which kind of data is present in `struct permonst`.** 

## What to Compare

### 1. Base Properties
- **Difficulty/Level**: Compare with `difficulty` and `mlevel`.
- **Movement Speed**: Compare with `mmove`.
- **Armor Class (AC)**: Compare with `ac`.
- **Magic Cancellation (MC)**: Compare with `mc`.
- **Magic Resistance (MR)**: Compare with `mr`.
- **Alignment**: Compare with `maligntyp`.

### 2. Attributes
- **Base Attributes**: Compare with `str`, `dex`, `con`, `intl`, `wis`, `cha`.
- **Resistances**: Compare with `mresists` and `mresists2`.
- **Conveys**: Compare with `mconveys` (what the monster conveys when eaten).

### 3. Attacks
- **Attacks Array (`mattk`)**: Compare each attack in the matrix for `aatyp` (attack type, e.g., claw, bite), `adtyp` (damage type, e.g., physical, fire), `damn` (number of dice), and `damd` (size of dice).

## How to Verify
1. Locate the monster in `src/monst.c`.
2. Map the fields to the `struct permonst` definition.
3. Check the wiki page for discrepancies based on the list above.
