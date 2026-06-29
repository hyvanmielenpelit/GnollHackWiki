## Overview

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

## Weapons

- **Normal Weapons:** 66.7% (2/3)
- **Artifact Weapons**
  - First Failure: 16.7% (1/6)
  - Subsequent Failures: 33.3% (1/3)
- **Orichalcum Weapons**
  - First Failure: 0%
  - Subsequent Failures: 22.2% (2/9)

## Armor

### Normal Armor

| Current Enchantment Level | Safe Limit +3 | Safe Limit +4 | Safe Limit +5 | Safe Limit +6 | Safe Limit +7 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **+4** | 75.0% | – | – | – | – |
| **+5** | 80.0% | 80.0% | – | – | – |
| **+6** | 83.3% | 83.3% | 83.3% | – | – |
| **+7** | 85.7% | 85.7% | 85.7% | 85.7% | – |
| **+8** | 87.5% | 87.5% | 87.5% | 87.5% | 87.5% |
| **+9** | 88.9% | 88.9% | 88.9% | 88.9% | 88.9% |
| **+10** | 90.0% | 90.0% | 90.0% | 90.0% | 90.0% |
| **+11** | 90.9% | 90.9% | 90.9% | 90.9% | 90.9% |
| **+12** | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% |
| **+13** | 92.3% | 92.3% | 92.3% | 92.3% | 92.3% |


### Artifact Armor

#### First Failure

| Current Enchantment Level | Safe Limit +3 | Safe Limit +4 | Safe Limit +5 | Safe Limit +6 | Safe Limit +7 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **+4** | 18.8% | – | – | – | – |
| **+5** | 20.0% | 20.0% | – | – | – |
| **+6** | 20.8% | 20.8% | 20.8% | – | – |
| **+7** | 21.4% | 21.4% | 21.4% | 21.4% | – |
| **+8** | 21.9% | 21.9% | 21.9% | 21.9% | 21.9% |
| **+9** | 22.2% | 22.2% | 22.2% | 22.2% | 22.2% |
| **+10** | 22.5% | 22.5% | 22.5% | 22.5% | 22.5% |
| **+11** | 22.7% | 22.7% | 22.7% | 22.7% | 22.7% |
| **+12** | 22.9% | 22.9% | 22.9% | 22.9% | 22.9% |
| **+13** | 23.1% | 23.1% | 23.1% | 23.1% | 23.1% |


#### Subsequent Failures

| Current Enchantment Level | Safe Limit +3 | Safe Limit +4 | Safe Limit +5 | Safe Limit +6 | Safe Limit +7 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **+4** | 37.5% | – | – | – | – |
| **+5** | 40.0% | 40.0% | – | – | – |
| **+6** | 41.7% | 41.7% | 41.7% | – | – |
| **+7** | 42.9% | 42.9% | 42.9% | 42.9% | – |
| **+8** | 43.8% | 43.8% | 43.8% | 43.8% | 43.8% |
| **+9** | 44.4% | 44.4% | 44.4% | 44.4% | 44.4% |
| **+10** | 45.0% | 45.0% | 45.0% | 45.0% | 45.0% |
| **+11** | 45.5% | 45.5% | 45.5% | 45.5% | 45.5% |
| **+12** | 45.8% | 45.8% | 45.8% | 45.8% | 45.8% |
| **+13** | 46.2% | 46.2% | 46.2% | 46.2% | 46.2% |


### Orichalcum Armor

#### First Failure

0%

#### Subsequent Failures

| Current Enchantment Level | Safe Limit +3 | Safe Limit +4 | Safe Limit +5 | Safe Limit +6 | Safe Limit +7 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **+4** | 25.0% | – | – | – | – |
| **+5** | 26.7% | 26.7% | – | – | – |
| **+6** | 27.8% | 27.8% | 27.8% | – | – |
| **+7** | 28.6% | 28.6% | 28.6% | 28.6% | – |
| **+8** | 29.2% | 29.2% | 29.2% | 29.2% | 29.2% |
| **+9** | 29.6% | 29.6% | 29.6% | 29.6% | 29.6% |
| **+10** | 30.0% | 30.0% | 30.0% | 30.0% | 30.0% |
| **+11** | 30.3% | 30.3% | 30.3% | 30.3% | 30.3% |
| **+12** | 30.6% | 30.6% | 30.6% | 30.6% | 30.6% |
| **+13** | 30.8% | 30.8% | 30.8% | 30.8% | 30.8% |

