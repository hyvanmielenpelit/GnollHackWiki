---
name: wiki_verify_monsters
description: Instructions for comparing monsters in GnollHackWiki with the GnollHack C code data structures (permonst) to spot mistakes in the documentation.
---

# Verifying Monsters

When verifying monsters on the GnollHackWiki against the GnollHack C code, compare the monster's documentation with the `MON` macro entries in `src/monst.c`. These macros populate the `struct permonst` defined in `include/permonst.h`.

## Important Rules
- **NEVER compare item weights.** Do not check or update corpse weight (`cwt`) or any other weight on the wiki. Weights in the code might be in different units than weights on the wiki.
- **Pay attention to the macros used within `MON()`.** Many arguments are wrapped in `LVL()`, `SIZ()`, `STATS()`, and `ATTK()`. You must expand these manually in your head to match fields correctly.

## The `MON()` Macro Structure

Each monster in `src/monst.c` is defined using:
`MON(nam, title, desc, femalename, commonname, sym, lvl, gen, atk, siz, stats, mr1, mr2, mc1, flg1, flg2, flg3, flg4, flg5, flg6, flg7, flg8, d, col, soundset, female_soundset, soundset_subtype)`

### 1. Naming & Symbol (`nam`, `title`, `desc`, `femalename`, `commonname`, `sym`)
- **Name/Title**: Matches the base name, title, or description of the monster.
- **Symbol (`sym`)**: The class symbol (e.g., `S_ANT`, `S_DRAGON`).

### 2. Level & Base Stats: `LVL()` Macro
The `lvl` argument is formatted as `LVL(mlevel, mmove, ac, mc, mr, maligntyp)`.
- **Level (`mlevel`)**: The base monster level.
- **Speed (`mmove`)**: The monster's movement speed.
- **Armor Class (`ac`)**: The base AC.
- **Magic Cancellation (`mc`)**: The base MC against touch attacks.
- **Magic Resistance (`mr`)**: The base MR against magic.
- **Alignment (`maligntyp`)**: The basic alignment (negative is chaotic/evil, positive is lawful/good, zero is neutral).

### 3. Generation Flags (`gen`)
This argument defines where and how often the monster spawns.
- `G_FREQ`: Common frequency.
- `G_HELL`, `G_NOHELL`: Spawns in Gehennom / never in Gehennom.
- `G_UNIQ`: Is a unique monster.

### 4. Attacks: `ATTK()` and `A()` Macros
The `atk` argument is wrapped in an `A(...)` macro, consisting of up to 8 `ATTK()` entries.
Each `ATTK(aatyp, adtyp, damn, damd, ...)` dictates:
- **`aatyp`**: Attack type (e.g., `AT_BITE`, `AT_CLAW`).
- **`adtyp`**: Damage type (e.g., `AD_PHYS`, `AD_FIRE`).
- **`damn` d `damd`**: The damage dice (e.g., 2d4).

### 5. Size & Physical Properties: `SIZ()` Macro
The `siz` argument is formatted as `SIZ(cwt, cnutrit, msound, msize, heads, lightrange, body_material_type)`.
- **Corpse Weight (`cwt`)**: DO NOT VERIFY.
- **Nutrition (`cnutrit`)**: The nutritional value of the corpse.
- **Noise (`msound`)**: The type of noise made (e.g., `MS_ROAR`).
- **Size (`msize`)**: Physical size (e.g., `MZ_SMALL`, `MZ_LARGE`).
- **Material (`body_material_type`)**: The material of the creature (e.g., `FLESH`, `IRON`).

### 6. Base Attributes: `STATS()` Macro
The `stats` argument is formatted as `STATS(str, dex, con, intl, wis, cha)`.
- Ensure base stats align with any specific mentions in the wiki.
- **Strength Evaluation**: The `str` stat in `STATS()` may contain integer values, mathematical expressions, or macros. Pay close attention to the following calculation rules:
  - **Raw Values (1-18)**: Displayed exactly as they are on the wiki (e.g., `18`).
  - **Expressions (`18 + X`)**: If you see an expression like `18 + 31`, it represents an AD&D-style percentile strength and is displayed as `18/31` on the wiki.
  - **Values between 19 and 118**: Any evaluated number between 19 and 118 represents a percentile strength and is displayed as `18/X`, where `X` is the value minus 18 (e.g., `49` becomes `18/31`).
  - **`STR18(x)` Macro**: Equals `18 + x`. It represents percentile strengths. For example, `STR18(100)` equals `118` and displays as `18/**` or `18/100`. Note that `STR18(0)` or `STR18(00)` are written simply as `18` and not `18/0`.
  - **`STR19(x)` Macro**: Equals `100 + x`. It represents linear strength values from 19 to 25. For example, `STR19(25)` equals `125` and displays directly as `25`.

### 7. Resistances & Conveys (`mr1`, `mr2`, `mc1`)
- **`mr1` / `mr2`**: Monster resistances (`MR_FIRE`, `MR_COLD`, `MR_POISON`, etc.).
- **`mc1`**: What the corpse conveys when eaten.

### 8. Behavioral & Biological Flags (`flg1` through `flg8`)
These boolean bitflags describe the monster's traits, which are heavily documented on the wiki:
- **Diet**: `M2_CARNIVORE`, `M2_HERBIVORE`, `M2_METALLIVORE`.
- **Movement/Habitat**: `M1_FLY` (Flying), `M1_SWIM` (Swimming), `M1_AMPHIBIOUS`, `M1_WALLWALK`.
- **Biology**: `M1_NOEYES` (No eyes), `M1_NOLIMBS` (No limbs), `M1_NOTAKE` (Cannot pick up items).
- **Behavior**: `M2_HOSTILE` (Hostile), `M2_PEACEFUL` (Peaceful), `M2_STALK` (Stalker).

## How to Verify
1. Locate the monster in `src/monst.c`.
2. Map the fields by mentally expanding `LVL()`, `SIZ()`, `ATTK()`, and `STATS()`.
3. Check the flags (`flg1`-`flg8`) for specific biological or behavioral traits.
4. Compare all these values against the wiki page properties, ensuring you DO NOT compare item weights.
