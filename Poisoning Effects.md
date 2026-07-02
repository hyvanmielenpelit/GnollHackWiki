![Poisoning Effects](/uploads/Poisoning%20Effects/poisoning-effects-q85.webp)

> 👉 **This page provides a comprehensive list of all poisoning effects in GnollHack, detailing what happens when a character has poison resistance versus when they lack it.**

## 🍎 Consuming Poisonous Food, Corpses, and Objects

When eating items, corpses, or even objects (e.g., when polymorphed into a metallivore) that are poisonous:

- **Standard Poisonous Items (`EDIBLETYPE_POISONOUS`):**
  - **Without Resistance:** You lose **1-4 points of strength** and take **1-15 HP** of poison damage.
  - **With Resistance:** You are completely immune ("You seem unaffected by the poison.").
- **Deadly Poisonous Items (`EDIBLETYPE_DEADLY_POISONOUS`):**
  - **Without Resistance:** The effects are much more severe. You lose **2-12 points of strength** and take **5-100 HP** of poison damage.
  - **With Resistance:** You are completely immune.

## 🗡️ Monster Attacks

When a monster strikes you with a poisonous natural attack (such as a bite or sting) or uses a poisoned weapon against you:

### 🐍 Natural Attacks (Bite, Sting)

Poisonous natural attacks can use one of three damage types, which determines the stat they drain: **Strength** (`AD_DRST`), **Dexterity** (`AD_DRDX`), or **Constitution** (`AD_DRCO`).

- **Without Resistance:** You are poisoned. You take **6-15 HP** of poison damage, and have a **5% to 15% chance** (depending on the monster's level: 5% for levels 1-2, 10% for levels 3-5, 15% for levels 6+) to lose **1-3 points** of the specific stat tied to the attack's damage type. If the attacking monster is level 9 or higher, there is a **10% chance** the poison will trigger a "deadly poison" strike, inflicting massive damage ([see below](#deadly-poison-mechanics)).
- **With Resistance:** The poison is fully neutralized ("The poison doesn't seem to affect you."). You only take the standard physical damage from the attack itself.

### 🏹 Thrown Poisoned Weapons (Arrows, Darts)

- **Without Resistance:** You take **2-12 HP** (`2d6`) of poison damage and have a **10% chance** to lose **1 point of Strength**. Thrown weapons actually *never* trigger the massive deadly poison strike (contrary to some beliefs!).
- **With Resistance:** The poison is fully neutralized.

### 🗡️ Melee Attacks with Poisoned Weapons (e.g., Orcish Dagger)

- **Without Resistance:** You take **2-12 HP** (`2d6`) of poison damage and have a **10% chance** to lose **1 point of Strength**. Like thrown weapons, melee attacks with poisoned weapons *never* trigger the massive deadly poison strike.
- **With Resistance:** The poison is fully neutralized.

## 🪤 Traps

When triggering traps laced with poison, such as poisoned [[dart|/Items/Dart]] traps, poisoned needles, or falling into a spiked pit with poisoned spikes:

- **Without Resistance:** You suffer **2-12 HP** (`2d6`) of poison damage. You also have a **10% chance** to lose **1 point of Constitution** (from poisoned darts and needles) or **1 point of Strength** (from spiked pits).
- **With Resistance:** The poison has no effect on you, though you still take the physical damage from the trap (e.g., the dart hitting you or falling on the spikes).

## ☁️ Poison Gas Clouds

When walking through or being caught in a localized poison gas cloud (e.g., from an explosion or environmental hazard):

- **Without Resistance:** You suffer **2-12 HP** (`2d6`) of poison damage and have a **10% chance** to lose **1 point of Strength** for every turn you remain within the gas cloud.
- **With Resistance:** You are completely immune to the gas and can pass through it without taking any damage.

## ⛲ Poisoned Fountains

When drinking from a fountain that has been tainted with poison:

- **Without Resistance:** The water is tainted, and you lose **2-5 points of strength** and take **1-10 HP** of poison damage.
- **With Resistance:** You notice the water tastes bitter, but you suffer no ill effects whatsoever.

## 🧪 Potion of Poison

[[/Items/Potion of poison]] has a dangerous effect when quaffed or when they shatter and release vapors:

- **Without Resistance:** Quaffing one causes you to take immediate poison damage and randomly lose a stat point (e.g., strength, dexterity). The stat loss can be 1-12 points depending on the potion's BUC status. If one shatters near you, the vapors cause you to lose up to 5 HP (though this vapor damage won't drop your HP below 1).
- **With Resistance:** You are completely immune to the damage and stat loss when quaffing ("However, you are unaffected by the poison.") and take no damage from shattered potions.
- **Note:** Quaffing a potion of poison cures hallucination and lycanthropy regardless of whether you have poison resistance or not!

## 📖 Contact-Poisoned Spellbooks

When failing to read a cursed or extremely difficult spellbook, the book may trigger a contact-poison effect:

- **Without Resistance:** You lose **3-6 points of strength** and take **2-20 HP** of damage.
- **With Resistance:** The poison's severity is significantly mitigated. You only lose **1-2 points of strength** and take **1-6 HP** of damage.

## ☠️ Deadly Poison Mechanics

In GnollHack, a "deadly poison" attack is no longer a guaranteed instant death regardless of your hit points. Instead, a deadly poison attack inflicts massive poison damage: usually **30-46 HP** (`6d6 + 10`), but scaling from **25-40 HP** (`5d6 + 10`) up to **35-52 HP** (`7d6 + 10`) depending on the attacker's level. If your HP drops below 1 after taking this damage, you die with the message "The poison was deadly...".

The chances for a poison attack to trigger this massive deadly damage are as follows:
- **Monster Melee Attacks:** A poisonous natural attack (e.g., bite or sting) from a monster of level 9 or higher has a **10% chance** (1 in 10) to trigger a deadly poison strike. Monsters level 8 or lower cannot trigger this effect.
- **Player Polymorphed:** If the player is polymorphed into a poisonous monster and attacks another monster, there is a **10% chance** to trigger a deadly poison strike against the monster.
- **Thrown Poisoned Weapons:** Thrown poisoned weapons (like [[darts|/Items/Dart]] or [[arrows|/Items/Arrow]]) **never** trigger the massive deadly poison damage in GnollHack. They only ever deal their standard 2d6 poison damage.
- **Traps:** Environmental traps (like poisoned [[darts|/Items/Dart]], spiked pits, gas clouds, and needles) **never** trigger the massive deadly poison damage. They only deal their standard poison damage, though this can still be fatal if your hit points are already critically low.

## 🛡️ Acquiring Poison Resistance

Poison resistance is one of the most critical intrinsics to acquire early in the game to avoid dying to massive poison damage or gradual HP depletion from poisoned [[darts|/Items/Dart]], spiked pits, and monster attacks. It can be gained safely by eating certain corpses (if you already have poison resistance or a means to survive the initial meal), wearing an [[Amulet versus Poison|/Items/Amulet versus poison]], wearing a [[Ring of Poison Resistance|/Items/Ring of poison resistance]], or playing specific roles (e.g., [[Healers|/Roles/Healer]], [[Barbarians|/Roles/Barbarian]]) that start with or acquire the resistance as they level up.
