# Sacrifice Offering

> 👉 **Sacrificing is a major mechanic in GnollHack. Players can offer items (most commonly corpses) on an altar using the `#offer` command (or `o`) to appease their god, receive gifts, or manipulate the altar's alignment.**

To offer a sacrifice, you must be standing on an altar and you must not be currently swallowed by a monster. While most items can be offered, most will simply be consumed or rejected by the gods without significant benefit. The primary items to sacrifice are **corpses**.

## 💡 Summary of Offerings

The following items have special interactions when sacrificed on an altar:
- **Corpses**: The most common and valuable offering. Must generally be fresh (killed within the last 50 turns), with the exception of acid blobs, which never rot.
- **The Amulet of Yendor**: Sacrificing the real Amulet on a high altar is the ultimate goal of the game and completes your ascension.
- **Fake Amulet of Yendor**: Sacrificing a fake amulet angers the gods.

If an invalid or zero-value item is sacrificed, it is typically consumed in a flash of light (lawful altars) or a burst of flame (neutral/chaotic altars), and no alignment or luck changes occur. If you are blind, it merely disappears. If you are hallucinating, the item may puff up and pop or collapse into dancing particles.

## Corpse Value

The value of a sacrificed corpse determines how much it can appease your god.
- The base value of a fresh corpse is equal to its monster's **difficulty + 1**.
- The maximum value for any standard corpse is **24**.
- Undead corpses offer no value to chaotic players, but provide `+1` value to non-chaotic players.

## Sacrificing on a Co-Aligned Altar

When you sacrifice a valid corpse on an altar that matches your current alignment (a co-aligned altar), your god will evaluate the sacrifice. Depending on your current standing with your god, several things may happen in the following priority order:

1. **Decreasing Anger**: If your god is currently angry with you, the sacrifice will reduce their anger based on the corpse's value (chaotic gods are appeased slightly slower than lawful or neutral gods). You may receive the message that your god seems *"slightly mollified"* or *"mollified"*.
2. **Decreasing Alignment Penalty**: If you have a negative alignment record, a valuable corpse will partially absolve you, increasing your alignment record by the corpse's value (up to the maximum possible for that corpse). You will feel *"partially absolved"*.
3. **Decreasing Prayer Timeout**: If your prayer timeout is currently active (meaning it is too early to pray safely), sacrificing reduces this timeout proportionally based on the corpse's value. If the timeout is completely removed, you will have a *"feeling of reconciliation"*. If it is merely reduced, you will have a *"hopeful feeling"*.
4. **Receiving a Gift**: If you are in good standing (level > 2, luck is at least 0, no anger, no negative alignment, no prayer timeout), there is a chance your god will grant you a divine gift. The chance of receiving a gift decreases as more artifacts are generated in the game. For more details on what you can receive, see [[/Sacrifice Gifts]].
5. **Increasing Luck**: If none of the above apply, or the value of the sacrifice exceeds what is needed, your Luck may be increased. If this happens, you will glimpse a *"four-leaf clover at your feet"*.
6. **Blessing Praying Items**: If you are in good standing or your prayer timeout was reduced, there is a chance that special praying items in your inventory (such as a holy symbol or prayerstone) will be blessed and softly glow.

## Sacrificing on a Cross-Aligned Altar

If you sacrifice on an altar that does not match your alignment (a cross-aligned altar), the outcome depends on whether your own god is angry with you.

### Converting Yourself
If your god is angry with you (or if you are sacrificing at Moloch's unaligned altar in Gehennom), the altar's god may accept your allegiance. This will **convert you** to the altar's alignment. This conversion is costly: it decreases your Luck by 3 and significantly increases your prayer timeout. 

> ⚠️ **Warning:** If you attempt to convert but it is rejected (or you sacrifice on Moloch's altar while not in Gehennom), your original god will become even angrier, you will lose alignment record and Luck, and your god will smite you.

### Converting the Altar
If your god is *not* angry with you, a conflict arises between your god and the altar's god. 
- You have a chance to **convert the altar** to your alignment. This chance is calculated as: $\frac{2 + \text{Level}}{8 + \text{Level}}$. If successful, the altar glows in your alignment's color, your Luck increases by 1, and your god's power increases. However, if a priest of the former alignment is present, they will become angry.
- If the conversion fails, you will feel your god's power decrease, and your Luck will decrease by 1.

## Special Sacrifices

### Sacrificing Your Own Race
Sacrificing a corpse of your own race (e.g., a human sacrificing a human, or an elf sacrificing an elf) is considered an infamous offense.
- **For Non-Demons**: Unless you are chaotic, this will lower your Wisdom. If offered on a co-aligned or cross-aligned altar (that is not Moloch's or chaotic), you will curse the altar, turning it chaotic and staining it with blood. Your alignment and Luck will drastically decrease, and you will anger your god.
- **On Chaotic/Moloch Altars**: Human/same-race sacrifices on chaotic or Moloch altars function as **demon summoning**. Blood covers the altar, and a powerful Demon Lord (or Demogorgon, if in Gehennom) will be summoned. If you are chaotic and have a high alignment record, there is a chance the demon will be peaceful; otherwise, it will be hostile and may terrify you.
- **For Demons**: If you are a demon, sacrificing your own race is considered "very satisfying" and increases your Wisdom.

### Sacrificing Pets
Sacrificing a tame monster (your pet) is an act of betrayal. You will receive the message *"So this is how you repay loyalty?"*, your alignment will decrease by 3, and you will permanently aggravate monsters in the dungeon.

### Sacrificing Unicorns
Unicorns have strong alignments, and sacrificing them has unique consequences depending on how their alignment compares to yours and the altar's:
- **Same as Altar**: If the unicorn's alignment matches the altar's alignment, it is a grave insult. Your Wisdom is decreased, and the sacrifice value becomes -5.
- **Same as You**: If the unicorn's alignment matches your own, but the altar is different, this causes an immediate alignment conversion. Your alignment record is reset to -1.
- **Cross-Aligned Unicorn on Co-Aligned Altar**: If you sacrifice a unicorn of a different alignment on an altar of your alignment, this is a very good action. You will feel *"thoroughly on the right path"* (or *"appropriately aligned"*), gain alignment record (+5), and the corpse value receives a +3 bonus.

## The Amulet of Yendor

Sacrificing the true Amulet of Yendor on the high altar of your alignment on the Astral Plane completes the game and grants you immortality (see [[/Ascension]] for more details). 

> ℹ️ **Note:** Attempting to sacrifice the Amulet on a high altar of an opposing alignment will result in the opposing god taking the Amulet and sparing your life, ending the game in an escape rather than an ascension. Sacrificing it on Moloch's high altar will result in Moloch snuffing out your life.

Sacrificing a **fake** Amulet of Yendor will anger the gods, causing a nearby thunderclap, decreasing your Luck by 3, decreasing your alignment record by 1, and increasing your god's anger.
