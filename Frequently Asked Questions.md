## How Does Safe Enchantable Level Exactly Work?

> If an item has a Safe Enchantable Level of +3, does it mean that one can enchant it *one more time* when the enchantment is at +3, or does it mean that one needs to *stop at +3*?

It's the level where you can enchant the item *one more time* safely.

However, even if you enchant an item above its safe enchantable limit, it may not be destroyed. The section below describes the details.

### What is the Chance that an Item Evaporates when Enchanted Above the Safe Enchantable Limit?

When enchanting an item above its Safe Enchantable Limit, there is a chance it will either **evaporate** (be destroyed) or **give out blue smoke** (enchantment drops to +0, but the item survives). The overall chance of evaporation depends on the item type, its material, and whether it is an artifact. 

First, the item must fail the enchantment check:
- **Weapons:** 2/3 (66.7%) chance to fail.
- **Armor:** `(E - 1) / E` chance to fail, where `E` is its current enchantment level.

If it fails, it will evaporate unless it gives out blue smoke. It gives out blue smoke if it passes a material/artifact resistance check:
- **Normal items (not orichalcum):** 0% chance to resist (always evaporates on failure).
- **Artifacts (not orichalcum):** 75% chance to resist.
- **Orichalcum items:** 100% chance to resist.

However, if the item has already given out blue smoke previously, its chance to resist is reduced by 1/3 (meaning the resistance chance is multiplied by 2/3).

Combining these, the total chances of **evaporation** are:

**For Weapons:**
- **Normal Weapons:** 66.7% (2/3)
- **Artifact Weapons (first failure):** 16.7% (1/6)
- **Artifact Weapons (subsequent failures):** 33.3% (1/3)
- **Orichalcum Weapons (first failure):** 0%
- **Orichalcum Weapons (subsequent failures):** 22.2% (2/9)

**For Armor (where `E` is the current enchantment level):**
- **Normal Armor:** `(E - 1) / E`
- **Artifact Armor (first failure):** `(E - 1) / (4 * E)`
- **Artifact Armor (subsequent failures):** `(E - 1) / (2 * E)`
- **Orichalcum Armor (first failure):** 0%
- **Orichalcum Armor (subsequent failures):** `(E - 1) / (3 * E)`
