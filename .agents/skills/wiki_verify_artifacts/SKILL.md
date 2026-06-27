---
name: wiki_verify_artifacts
description: Instructions for comparing artifacts in GnollHackWiki with the GnollHack C code data structures (artifact) to spot mistakes in the documentation.
---

# Verifying Artifacts

When verifying artifacts on the GnollHackWiki against the GnollHack C code, compare the artifact's documentation with `struct artifact` defined in `include/artifact.h` and the data in `src/artilist.c`.

## Important Rules
- **NEVER compare item weights.** Do not check or update weight on the wiki.
- **Pay attention to which kind of data is present in `struct artifact`.** 

## What to Compare

### 1. Base Properties
- **Base Item**: Check the `otyp` to ensure the artifact is based on the correct item (e.g., `LONG_SWORD`).
- **Cost**: Compare the listed artifact price with the `cost` field.
- **Alignment**: Check the `alignment` field (e.g., `A_LAWFUL`, `A_NEUTRAL`, `A_CHAOTIC`, `A_NONE`).
- **Material**: Compare with the `material` field.

### 2. Combat Bonuses
- **To-Hit Bonus**: Compare with `tohit_dice`, `tohit_diesize`, and `tohit_plus`.
- **Extra Damage**: Check the `attk` struct (`attk.damn`, `attk.damd`, etc.) for any extra damage dice added when the artifact hits the right target.
- **Special Attacks**: Look at `aflags` (e.g., `AF_BEHEAD`, `AF_BISECT`, `AF_DRLI`) and `aflags2` for extra combat effects.

### 3. Special Effects
- **Wielded/Worn Effects**: Compare `spfx` (e.g., `SPFX_ESP`, `SPFX_REGEN`, `SPFX_STLTH`, `SPFX_HSPDAM`).
- **Carried Effects**: Compare `cspfx` (effects conferred just by carrying).
- **Invoked Powers**: Compare `inv_prop` for powers activated by invoking the artifact (e.g., `ARTINVOKE_HEALING`). Check `inv_duration_dice` and `repower_time` (cooldown).

## How to Verify
1. Locate the artifact in `src/artilist.c`.
2. Map the fields to the `struct artifact` definition.
3. Check the wiki page for discrepancies based on the list above.
