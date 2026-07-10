> 👉 **Runewords are magical words engraved on the floor that grant special properties, protections, or mechanics to players, monsters, and items.**

## ℹ️ Overview

Runewords in GnollHack are special words that can be engraved on the floor. Depending on the runeword and the player's current branch of the dungeon, they can frighten hostile monsters or protect items on the ground from being picked up.

There are three runewords in GnollHack:
- **[Elbereth](#elbereth)**: Frightens hostile monsters and prevents them from attacking.
- **[Gilthoniel](#gilthoniel)**: Protects items from being looted by monsters outside Gehennom.
- **[Morgoth](#morgoth)**: Protects items from being looted by monsters inside Gehennom.


## 📝 Engraving Mechanics

Engraving a runeword on the floor requires using the **Engrave** command. Beginners can do this manually, or configure a "Quick Engrave" command for convenience.

### 🚀 Step-by-Step Guide: How to Engrave

There are two primary ways to engrave runewords on the floor: **Manual Engraving** and **Quick Engrave**.

#### 1️⃣ Manual Engraving

Use this method if you want to engrave a specific word or use a specific item from your inventory.

| Step | Action | Example (Writing in Dust) |
| :--- | :--- | :--- |
| **1. Initiate** | Press the **Engrave** command (`E`). | Press `E` |
| **2. Select Tool** | Press `-` to use your fingers (writes in dust, or in blood if you are a demon or vampire), or press the inventory letter of a tool (e.g., a wand or weapon). | Press `-` |
| **3. Enter Text** | Type the runeword exactly as spelled (e.g., `Elbereth` or `Gilthoniel`). | Type `Elbereth` |
| **4. Confirm** | Press **Enter** to write the text on the floor. | Press **Enter** |

#### 2️⃣ Quick Engrave (Preset Writing)

You can automate the engraving process a bit with the **Quick Engrave** command. It is used as follows:

| Step | Action / Example |
| :--- | :--- |
| **Setup Settings** | In the game options, set **Quick Engrave Text** to `Elbereth` and **Quick Engrave Style** to "Always finger". |
| **Execute Command** | Press the **Engrave quick** command (`Alt-E`). The preset text will be engraved instantly without any prompts. |

### ⏱️ Engraving Speed

When engraving a runeword, the speed depends on the method and the tool used. Engraving with soft methods or highly specialized tools is much faster than carving into the floor with standard items. Thus, the time required to engrave is classified into two categories:

| Engraving Speed | Extra Turns Required | Engraving Methods / Tools |
| :--- | :--- | :--- |
| **Fast** | 0 extra turns (instant) | Writing in dust (fingers), writing in blood, using a [[/Items/magic marker]], a [[/Items/wand of fire]], a [[/Items/wand of lightning]], or carving with an uncursed [[/Items/athame]]. |
| **Slow** | 1 extra turn per character (e.g., 8 turns for "Elbereth") | Carving with standard [[weapons]], [[rings]], or [[Gems and Stones]]. |

> ⚠️ **Warning:** Slow engraving takes a total of 9 turns (the action turn plus 8 extra turns) for an 8-character word like "Elbereth". If you attempt to engrave slowly in the presence of hostile monsters, they will get multiple free turns to attack you while you are paralyzed.


## 🧹 Erosion and Smudging

The permanence of an engraving—how easily it is erased or smudged by physical actions (like fighting or monsters walking over it)—depends entirely on the tool or method used to write it.

### 🛡️ Engraving Permanence

Engravings are classified into three levels of durability:

| Durability | Engraving Methods / Tools | Smudging Mechanics |
| :--- | :--- | :--- |
| **Soft (Dust / Blood)** | Writing in dust (fingers), or writing in blood (when using fingers in demon or vampire form). | Highly susceptible to erosion. Physical actions erode the exact number of characters listed in the table below. Both mediums have a 4% (1 in 25) chance per character to scramble/mix up the message upon writing. |
| **Hard (Carved / Ink)** | Standard [[weapons]], [[rings]], [[Gems and Stones]], an [[/Items/athame]], or a [[/Items/magic marker]]. | Highly resistant to erosion. When a physical action occurs, there is only a very small random chance (typically around 5% to 10%) that a **single** character is eroded, regardless of the action's normal severity. |
| **Burned** | A [[/Items/wand of fire]] or [[/Items/wand of lightning]]. | Completely permanent. Burned engravings cannot be smudged or eroded by physical actions or monster movement. |

### ⚔️ Player and Monster Erosion Actions

Performing physical actions on the square containing an engraving causes characters to be eroded from the text (based on its durability type). A word is completely wiped out when all characters are erased.

| Action / Event | Base Characters Eroded (For Soft Engravings) |
| :--- | :--- |
| Melee attacking a monster | 3 characters |
| Digging downwards | 3 characters |
| Kicking | 2 characters |
| Throwing items or shooting ranged weapons | 2 characters |
| Whipping with a [[/Items/bullwhip]] | 2 characters |
| Whipping with a weapon from [[Polearms]] | 1 to 2 characters |
| Struggling out of webs or traps | 1 to 3 characters |
| Jumping or sliding over the square | Up to 5 characters |
| Monster stepping onto the square | 1 character |

> ℹ️ **Note:** The runewords `Gilthoniel` and `Morgoth` are magically protected and are completely immune to all forms of erosion and smudging from both player actions and monster movement.


## 🔮 Elbereth

`Elbereth` is the classic protective warding runeword. Standing on an active `Elbereth` engraving prevents most hostile monsters from attacking the player in melee or stepping onto the square.

### ⚙️ Mechanics

- **Activation**: The player must be standing on the square containing the engraving (or the player's displaced image must be on that square).
- **Effect**: Most hostile monsters attempting to move onto the square or attack the player will be frightened, causing them to turn around and flee for a random number of turns.
- **Strict Spelling**: The engraving must match the word strictly case-insensitively (e.g., "elbereth" or "Elbereth"). The full Tolkien prayer "A Elbereth Gilthoniel" does not trigger the warding effect.

> ℹ️ **Note:** Elbereth will **not** protect you from any missile or spell attack. Partial exceptions exist where Elbereth will still protect you from non-melee; no monster already fleeing from you due to Elbereth can use its ranged attacks while adjacent, and are much less likely to do so even when not adjacent.

### 🚫 Limitations

#### 🔀 Branch Restrictions

`Elbereth` does not work in [[/Dungeon/Gehennom]] or the [[/Dungeon/Elemental Planes]].

#### 🛡️ Immune Monsters

The following monsters ignore the effects of `Elbereth`:

| Monster / Category | Reason / Condition |
| :--- | :--- |
| **Unique monsters** | Includes all major bosses and unique demons. |
| **The [[/Monsters/Wizard of Yendor]]** | Often called Rodney, he ignores all scaring. |
| **Lawful minions and [[/Monsters/Angel]]s** | Divinely resistant to Elbereth. |
| **The Riders** | Death, Famine, and Pestilence. |
| **Shopkeepers** | Ignore Elbereth regardless of whether they are inside their shop or polymorphed. |
| **Vault guards** | Ignore Elbereth (even if polymorphed). |
| **Aligned priests** | When inside their own temple. |
| **Smiths** | When inside their own smithy. |
| **NPCs** | When inside their own rooms. |
| **Blind monsters** | They cannot see the engraving. |
| **Peaceful monsters** | They will not attack or move towards you anyway. |
| **Humans and Elves** | Represented by the `@` monster class symbol. |
| **[[/Monsters/Minotaur]]s, [[/Monsters/Baphomet]], and [[/Monsters/Yacc]]** | Have an innate ability to ignore Elbereth. |

#### 🗡️ The Hypocrite Penalty

`Elbereth` is a request for peace. If you abuse this sanctuary by attacking a monster while standing on an `Elbereth` engraving, you will be penalized for being a hypocrite.

When this happens:
1. You receive a message: *"You feel like a hypocrite."*
2. You incur an **alignment penalty of up to -5 points** (specifically, a -5 drop if your alignment is good, or a random drop between -1 and -5 if it is already low).
3. The `Elbereth` engraving immediately fades away completely (you receive the message: *"The engraving beneath you fades."*).

##### What triggers the penalty?
Any active offensive action against an Elbereth-vulnerable (or peaceful) monster while standing on the runeword will trigger the Hypocrite Penalty. This includes:
- **Melee attacks**: Hitting with weapons or bare hands.
- **Ranged attacks**: Throwing items or firing projectiles (arrows, bolts) from launchers. (If the projectile hits, it triggers the penalty; if it misses, there is a 33% chance to trigger it anyway).
- **Wands and Spells**: Zapping offensive wands or casting spells directly at the monster.
- **Other actions**: Kicking a monster, or triggering explosions/area-of-effect hazards that damage them.

> ⚠️ **Warning:** The Hypocrite Penalty causes the engraving to instantly disappear, **even if it was burned permanently into the floor with a wand**. This is the only way a burned engraving can be erased.
>
> ℹ️ **Note:** You are only penalized if the monster you attack respects `Elbereth` (i.e. is scared by it) or if the monster is peaceful. Attacking an immune monster (like a [[/Monsters/Minotaur]] or a unique boss) from an `Elbereth` square will not trigger the penalty.

### 🏆 Conduct and Achievements

- **Conduct**: Engraving `Elbereth` even once breaks the [[/Conducts/Elberethless]] conduct. Remaining "Elberethless" throughout the entire game is recorded at the end of the game and increases the base conduct score by 10 points upon ascension.
- **Achievements**: Engraving `Elbereth` for the first time in a run unlocks the **Engraved Elbereth** achievement and logs the event in the live log.


## ✨ Gilthoniel

`Gilthoniel` is a runeword of protection designed to secure items on the floor from being looted.

### ⚙️ Mechanics

- **Looting Protection**: Hostile monsters and pets are prevented from picking up items (including gold, [[weapons]], [[armor]], and [[comestibles]]) or eating food on a square engraved with `Gilthoniel`.
- **Branch Restrictions**: This protective effect only functions outside of [[/Dungeon/Gehennom]].
- **Exceptions**: Shopkeepers, vault guards, and the [[/Monsters/Wizard of Yendor]] ignore this restriction and can loot items from a `Gilthoniel` square freely.
- **Erosion Immunity**: Engravings of `Gilthoniel` are immune to all forms of smudging and erosion. This immunity applies everywhere (including inside Gehennom, even though the looting protection is inactive there).
- **Natural Generation**: When an Armory room is generated outside Gehennom, a [[/Items/chest]] or [[/Items/large box]] in the room is created with `Gilthoniel` written underneath it.
- **Conducts**: Writing `Gilthoniel` does **not** break the [[/Conducts/Elberethless]] conduct.


## 😈 Morgoth

`Morgoth` is the dark equivalent of Gilthoniel, used to protect items inside the depths of Gehennom.

### ⚙️ Mechanics

- **Looting Protection**: Hostile monsters and pets are prevented from picking up items or eating food on a square engraved with `Morgoth`.
- **Branch Restrictions**: This protective effect only functions inside [[/Dungeon/Gehennom]].
- **Exceptions**: Shopkeepers, vault guards, and the [[/Monsters/Wizard of Yendor]] are immune to the looting prevention and can pick up items from a `Morgoth` square.
- **Erosion Immunity**: Like Gilthoniel, `Morgoth` engravings are immune to all forms of smudging and erosion. This immunity applies everywhere (both inside and outside Gehennom).
- **Natural Generation**: When an Armory room is generated inside Gehennom, a [[/Items/chest]] or [[/Items/large box]] in the room is created with `Morgoth` written underneath it.
- **Conducts**: Writing `Morgoth` does **not** break the [[/Conducts/Elberethless]] conduct.


## 🎨 Visual Effects

In the graphical versions of GnollHack (Android, iOS, and modern Windows ports), active runewords are visually distinguished on the map:
- **Pulsing Magic Glow**: When a runeword is active in its current branch, its text pulses with a magical shine effect.
  - **Outside Gehennom**: Engravings of `Elbereth` and `Gilthoniel` pulse. `Morgoth` does not.
  - **Inside Gehennom**: Engravings of `Morgoth` pulse. `Elbereth` and `Gilthoniel` do not.
- This pulsing glow serves as a direct indicator to the player that the runeword's active warding or looting protection is currently functioning at that location.
