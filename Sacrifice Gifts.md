> 👉 **A sacrifice gift is a reward from your god for offering a fresh, acceptable corpse at an altar.**

In GnollHack, gods occasionally reward their followers with special items when they are particularly pleased with a sacrifice. These items are typically powerful artifacts or, in some cases, high-quality utility and power items as replacement rewards.

## Requirements for a Gift

Not every sacrifice yields a gift. To have a chance of receiving one, you must meet the following criteria:

* **Level:** Your character level must be 3 or higher.
* **Luck:** Your luck must be 0 or higher (non-negative).
* **Alignment:** You must be sacrificing at an altar of your own alignment (or you are converting a cross-aligned altar, though gifts are usually only given when you are in good standing).

If these conditions are met, the chance of receiving a gift is based on the following formula:

$\cfrac{1}{10 + (2 × \text{Gifts} × \text{Artifacts})}$

where
- $\text{Gifts}$ is the number of previous gifts.
- $\text{Artifacts}$ is the total number of artifacts generated in the game.

This means your first gift is relatively easy to obtain (a 1 in 10 chance), but subsequent gifts become progressively rarer, especially as more artifacts are generated in the game.

## The Gift's Properties

When your god bestows a gift, they will say:

> *"Use my gift wisely!"*

The object will appear at your feet. A sacrifice gift has several advantageous properties:

* It is automatically **uncursed** (and its curse status is known).
* It is made **erosion-proof** (rustproof, fireproof, etc.).
* Its **enchantment** is maximized or improved (e.g., weapons will typically be highly enchanted).
* If the item is a launcher (such as a bow, crossbow, or sling), your god will also gift you **50 blessed silver arrows, crossbow bolts, or sling bullets** to go with it. These projectiles will also be erosion-proof and enchanted (+0 to +3).
* Your weapon skill for the gifted weapon type will be automatically unrestricted, allowing you to train it if you couldn't before.

## Guaranteed First Gifts

Only certain role and alignment combinations have a **guaranteed first sacrifice gift**—a specific artifact that their god will always prioritize giving them first, provided it hasn't already been generated elsewhere:

* **Barbarian**: [[/Artifacts/Cleaver]]
* **Samurai**: [[/Artifacts/Snickersnee]]
* **Valkyrie**: [[/Artifacts/Mjollnir]]
* **Wizard**: [[/Artifacts/Magicbane]]

### Monk Weapon Restriction

Monks are dedicated to unarmed combat. As a result, their god **will never gift them weapon artifacts**. Monks only receive non-weapon artifacts (like rings, robes, or lenses). 

Because there are no randomly generatable neutral non-weapon artifacts in the game, **Neutral Monks will always receive a replacement item** (see below) for their first sacrifice gift.

## Eligible Sacrifice Gifts by Alignment

If you do not have a guaranteed first gift, or if you have already received your guaranteed first gift, your god will select a random artifact from the pool of eligible artifacts. 

On your **first gift**, only artifacts matching your alignment can be selected. From your **second gift onwards**, your god can also gift **unaligned artifacts**.

Also note that your god will never gift you an item belonging to a race hostile to yours (e.g., Elves cannot receive Orcish weapons like [[/Artifacts/Grimtooth]], and Orcs cannot receive Elven weapons like [[/Artifacts/Orcrist]] or [[/Artifacts/Sting]]).

Here are the eligible artifacts that can be obtained via sacrifice:

### Lawful Gifts

* [[/Artifacts/Demonbane]] (Silver long sword)
* [[/Artifacts/Grayswandir]] (Silver saber)
* [[/Artifacts/Snickersnee]] (Katana)
* [[/Artifacts/Sunsword]] (Long sword)
* [[/Artifacts/The Katana of Masamune]] (Katana)
* [[/Artifacts/The Kusanagi]] (Tsurugi)
* [[/Artifacts/The Mace of Saint Cuthbert]] (Mace)
* [[/Artifacts/The Holy Grail]] (Grail of healing)

### Neutral Gifts

* [[/Artifacts/Cleaver]] (Battle axe)
* [[/Artifacts/Mjollnir]] (Heavy war hammer)
* [[/Artifacts/Magicbane]] (Athame)
* [[/Artifacts/Orcrist]] (Elven broadsword)
* [[/Artifacts/Sting]] (Elven runedagger)
* [[/Artifacts/Vorpal Blade]] (Long sword)
* [[/Artifacts/The Emerald Sword]] (Two-handed sword)

### Chaotic Gifts

* [[/Artifacts/Stormbringer]] (Runesword)
* [[/Artifacts/Grimtooth]] (Orcish dagger)
* [[/Artifacts/The Serpent Ring of Set]] (Ring)
* [[/Artifacts/The Nine Lives Stealer]] (Long sword)

### Unaligned Gifts (Eligible from the 2nd Gift onwards)

* [[/Artifacts/Frost Brand]] (Long sword)
* [[/Artifacts/Fire Brand]] (Long sword)
* [[/Artifacts/Dragonbane]] (Broadsword)
* [[/Artifacts/Werebane]] (Silver saber)
* [[/Artifacts/Giantslayer]] (Long sword)
* [[/Artifacts/Ogresmasher]] (War hammer)
* [[/Artifacts/Trollsbane]] (Morning star)
* [[/Artifacts/Crossbow of the Gnoll Lords]] (Repeating heavy crossbow - *Gnolls only*)
* [[/Artifacts/Howling Flail]] (Runed flail)
* [[/Artifacts/Luck Blade]] (Ornate broadsword)
* [[/Artifacts/The Ruling Ring of Yendor]] (Ring)
* [[/Artifacts/The Ring of Three Wishes]] (Ring)
* [[/Artifacts/The Ring of Conflict]] (Ring)
* [[/Artifacts/The Rod of Disjunction]] (Wand)
* [[/Artifacts/Staff-Sling of the Ancients]] (Staff-sling)
* [[/Artifacts/Mattock of the Titans]] (Dwarvish mattock)
* [[/Artifacts/Maul of the Titans]] (Two-handed club)

## Replacement Items

If you are chosen to receive a gift, but the game cannot generate a suitable artifact (for example, if all eligible artifacts have already been created, or if you are a Monk and no non-weapon artifacts are available), your god will gift you a high-quality replacement item. 

The replacement item is selected dynamically based on **beneficial properties your character currently lacks**. The game evaluates properties in the following order:

1. **Strength Enhancement:** If your strength is below 19 and you are not carrying a giant strength belt, you receive a [[/Items/Belt of storm giant strength]] (50% chance).
2. **Reflection:** If you do not have reflection and do not carry an item providing it, you receive [[/Items/Bracers of reflection]] (50% chance).
3. **Magic Resistance:** If you do not have magic resistance and do not carry a cloak of magic resistance, you receive a [[/Items/Cloak of magic resistance]] (50% chance).
4. **Speed:** If you do not have very fast speed and do not carry gloves of haste or speed boots, you receive [[/Items/Gloves of haste]] or [[/Items/Speed boots]] (50% chance).
5. **Life Saving:** If you do not have life saving and do not carry an amulet of life saving, you receive an [[/Items/Amulet of life saving]] (50% chance).
6. **Flying:** If you do not have flying and do not carry wings of flying, you receive [[/Items/Wings of flying]] (50% chance).
7. **Death Resistance:** If you do not have death resistance and do not carry protection from undeath, you receive a [[/Items/Ring of protection from undeath]] (50% chance).

If none of the above rules apply (or the 50% checks fail), you will receive one of the following items at random:
* [[/Items/Belt of storm giant strength]] (if your strength is below 25)
* [[/Items/Wand of death]] or [[/Items/Wand of disintegration]]
* [[/Items/Magic marker]]
* [[/Items/Potion of gain level]]
* [[/Items/Potion of lightning speed]] or [[/Items/Potion of greater regeneration]]
