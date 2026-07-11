> 👉 **This page details the auto-stashing mechanics, algorithm, options, and commands in GnollHack.**

## 📖 Overview

Auto-stashing is a convenience feature in GnollHack that automatically places picked-up items or inventory items into the best available container in your inventory. This avoids the multiple steps required in traditional NetHack, where players must manually open and loot containers to organize their gear.

## 📥 Stashing Commands

Several commands are available to interact with the stashing system:

| Command | Hotkey / Extended Command | Description | Modern UI Integration |
| :--- | :---: | :--- | :--- |
| **Pick Up and Stash** | `;` | Picks up items under you and stashes them into the best container. | Tap the **Pick & Stash** option on the ground's context menu. |
| **Autostash** | `#autostash` | Stashes multiple selected items from inventory into available containers. | Access via the Action menu in your inventory. |
| **Stash** | `#stash` | Stashes a single item from inventory into a container in your inventory. | Tap the item in inventory and select **Stash**. |
| **Stash to Floor** | `#stashfloor` | Stashes a single item from inventory into a container on the floor. | Tap the item, select **Stash**, and choose a container on the ground. |
| **Set Quick Bag** | `#setquickbag` | Marks a container in your inventory as the designated Quick Bag. | Tap a container in your inventory and select **Set Quick Bag**. |
| **Unset Quick Bag** | `#unsetquickbag` | Removes the Quick Bag designation from a container. | Tap the Quick Bag in your inventory and select **Unset Quick Bag**. |

> 💡 **Tip:** You can also use the Loot (`l` or `Alt+l`) command to manually take items out of or put items into containers.

## 🧠 The Auto-Stashing Algorithm

When you pick up items with the Pick Up and Stash (`;`) command or run the Autostash (`#autostash`) command, GnollHack determines the "best container" for each item. The game automatically searches your inventory for a valid (proper, unlocked, and open) container based on the following priority list:

| Priority | Target Container | Conditions / Item Category Weight Reductions |
| :---: | :--- | :--- |
| **1** | Designated Quick Bag | The item goes here first if a Quick Bag is active, unlocked, and has an open lid. |
| **2a** | [[/Items/Bag of Treasure Hauling]] | Valuation-based weight reduction: gold, gems and stones, rings, amulets, miscellaneous items, art objects, or any items made of gold, silver, platinum, mithril, adamantium, or gemstones. |
| **2b** | [[/Items/Bag of Wizardry]] | Magic-based weight reduction: reagents, spellbooks, wands, scrolls, or any artifact/mythic items. |
| **2c** | [[/Items/Bag of the Glutton]] | Food-based weight reduction: potions or normally edible comestibles. |
| **3** | [[/Items/Bag of Holding]] | General-purpose magic bag that reduces the weight of all items placed within it. |
| **4** | Normal Bags | Non-magical containers such as a [[/Items/Sack]] or an [[/Items/Oilskin Sack]]. |
| **5** | Fallback Magic Bags | If the item does not match any specific category (e.g. food in [[/Items/Bag of Wizardry]]), but a magic bag is the only container available, the algorithm defaults to using them in this order: [[/Items/Bag of Treasure Hauling]] -> [[/Items/Bag of Wizardry]] -> [[/Items/Bag of the Glutton]]. |

### 🛡️ Magical Explosion Safety Check

To prevent catastrophic magical explosions that destroy both the magic bag and its contents, the algorithm performs a safety check:
- It **never** auto-stashes a cancellation hazard (like a [[/Items/Wand of Cancellation]] or items with the magic-bag-destroying flag) into any magic bag.
- If either the item's type or the Wand of Cancellation is **unidentified**, the algorithm plays it safe and treats **all wands** as potential cancellation hazards, stashing them only in normal sacks.

## ⚙️ Settings and Options

Stashing options can be toggled in the [[Settings]] menu or options configuration file:

| Option | Values | Default | Description |
| :--- | :---: | :---: | :--- |
| `stash_on_autopickup` | `true` / `false` | `false` | If `true`, items picked up automatically by walking over them are immediately stashed. |
| `knapsack_prompt` | `true` / `false` | `true` | If `true`, prompts you to stash/drop items when the inventory becomes full. If `false`, stashes automatically without prompting. |

> ℹ️ **Note:** Thrown weapons are excluded from auto-stashing when retrieved if the `pickup_thrown` option is enabled, ensuring they remain immediately ready for use in your primary inventory.

## 🛑 Limitations and Special Cases

Not all items or containers can participate in auto-stashing. The game enforces specific restrictions:

| Category | Items / Conditions | Stashing Restriction & Behavior |
| :--- | :--- | :--- |
| **Containers** | [[/Items/Sack]], [[/Items/Bag of Holding]], Box, Chest, etc. | Cannot be auto-stashed inside other containers. |
| **Equipped Items** | Worn armor, worn accessories | Cannot be stashed. Worn items must be taken off first. Wielded weapons or quivered items are automatically unwielded/unquivered by the system before stashing. |
| **Unfit Items** | [[/Items/Ice Box]], [[/Items/Bookshelf]], [[/Items/Coffin]], [[/Items/Sarcophagus]], [[/Items/Chest]], [[/Items/Large Box]], [[/Items/Boulder]], [[/Items/Statue]] | Cannot be stashed in containers due to size/immobility restrictions. |
| **Cursed Items** | Cursed items that cannot be dropped (e.g., [[/Items/Loadstone]]) | Cannot leave your inventory and are skipped by the algorithm. |
| **Quest Artifacts** | [[/Items/Amulet of Yendor]], [[/Artifacts/Candelabrum of Invocation]], [[/Artifacts/Bell of Opening]], [[/Artifacts/Book of the Dead]] | Cannot be placed in containers under any circumstances. |
| **Invalid Bags** | Locked containers, containers with closed lids | Automatically skipped by the algorithm. |
| **Attached/Leashed** | Attached [[/Items/iron chain]] or [[/Items/heavy iron ball]], pet [[/Items/Leash]] | Cannot be stashed. |
| **Welded Weapons** | Cursed weapons welded to hands | Cannot be stashed until uncursed and unwielded. |
