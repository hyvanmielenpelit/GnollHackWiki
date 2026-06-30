> 👉 **Praying is an essential mechanic in GnollHack that allows you to call upon your god for help, healing, or special favors when you are in trouble. However, praying too often or when your god is angry can have severe consequences.**

## Introduction

You can pray to your god at any time using the Pray (`Alt-p`) command. When you pray, the outcome heavily depends on your current situation, your alignment record, your luck, and how recently you last prayed. If done correctly, praying can save you from certain death; if done carelessly, it can anger your god and result in severe penalties.

## When is it Safe to Pray?

The primary factor determining if a prayer is safe is your **Prayer Timeout**. Every time you pray successfully, your prayer timeout increases (by 175 turns for Priests and 350 turns for other roles). This timeout acts as a cooldown period. Your current "Troubles" determine how low this timeout needs to be before it is safe to pray again.

> 💡 **Tip:** You can know whether it is currently safe to pray when a blessed [[/Items/holy symbol]] or a blessed [[/Items/prayerstone]] is shimmering.

| Trouble Level | Condition | Safe Timeout Threshold |
| :--- | :--- | :--- |
| **Major Trouble** | You are facing a life-threatening situation. | Timeout $\le$ 200 |
| **Minor Trouble** | You are facing a severe but non-lethal issue. | Timeout $\le$ 100 |
| **No Trouble** | You are not in any immediate danger. | Timeout $\le$ 0 |

> ℹ️ **Note:** If you have killed the Wizard of Yendor or have been [[crowned|Crowning]], your prayer timeout is penalized with massive increases (+500 or +1000 turns respectively), making it much harder to pray safely.

### Unsafe Conditions

Even if your timeout has elapsed, praying under the following conditions is considered unsafe and will result in a negative outcome:

- **Too Naughty**: If your Luck is negative, your God's anger is greater than 0, or your Alignment Record is negative.
- **Gehennom**: It is **never** safe to pray in Gehennom. Your god will not hear you, and doing so might anger them.
- **Wrong Altar**: Praying on an altar dedicated to a god of a different alignment than your own.
- **Vile Creature**: If you are transformed into an undead monster and pray on a Lawful altar (or a Neutral altar with a 10% chance), your god will view you as an abomination.

## Types of Troubles

The game categorizes your problems into Major and Minor troubles. When your god decides to help you, they prioritize fixing these troubles based on severity.

### Major Troubles

| Trouble | Description |
| :--- | :--- |
| **Stoned** | You are turning into stone. |
| **Slimed** | You are turning into green slime. |
| **Strangled** | You are wearing an [[/Items/amulet of strangulation]]. |
| **Lava** | You are trapped in lava. |
| **Sick** | You have a terminal illness or food poisoning. |
| **Food Poisoned** | You are suffering from severe food poisoning. |
| **Mummy Rot** | You are afflicted with mummy rot. |
| **Starving** | Your hunger level is at Starving or worse. |
| **Region** | You are trapped in a stinking cloud. |
| **Hit** | Your HP is critically low. |
| **Lycanthrope** | You have contracted lycanthropy. |
| **Collapsing** | You are severely overencumbered and losing strength. |
| **Stuck in Wall** | You are phased or stuck inside a solid wall. |
| **Cursed Eyeglasses** | You are wearing cursed [[/Items/eyeglasses of hallucination]]. |
| **Cursed Levitation** | You are wearing cursed [[/Items/levitation boots]] or a cursed [[/Items/ring of levitation]]. |
| **Unusable Hands** | Your hands are stuck. |
| **Cursed Blindfold** | You are wearing a cursed [[/Items/blindfold]]. |

### Minor Troubles

| Trouble | Description |
| :--- | :--- |
| **Punished** | You have a [[/Items/heavy iron ball]] chained to you. |
| **Teleportitis** | You suffer from uncontrollable teleportation. |
| **Fumbling** | You are wearing fumbling gear. |
| **Laughing** | You are wearing a [[/Items/shirt of uncontrollable laughter]]. |
| **Cursed Items** | You are wearing or wielding cursed items. |
| **Saddle** | You are stuck on a cursed [[/Items/saddle]]. |
| **Blind** | You are blinded or deafened. |
| **Poisoned** | Your attributes have been drained by poison. |
| **Wounded Legs** | Your legs are wounded. |
| **Hungry** | Your hunger level is at Hungry. |
| **Stunned** | You are stunned. |
| **Confused** | You are confused. |
| **Hallucination** | You are hallucinating. |

## Prayer Outcomes

### Negative Outcomes

If you pray when it is unsafe, you will suffer the following consequences:

- **Vile Creature**: You are forcefully rehumanized and take 1d20 damage.
- **Gehennom**: Your god states they cannot help you. If your Alignment Record is 0 or less, your god will become angry.
- **Too Soon / Too Naughty**: Your prayer fails. Your prayer timeout is increased by 125 (Priests) or 250 (others), your god becomes upset, and your Luck decreases by 3. If you pray on a wrong altar, the altar may curse any [[water|/Items/potion of water]] or [[holy symbols|/Items/holy symbol]] on it.
- **Wrong Altar**: The altar may curse [[water|/Items/potion of water]] and [[holy symbols|/Items/holy symbol]] placed upon it. If so, you incur the same penalties as praying "Too Soon".

### Good Prayer Outcomes

If you pray safely, your god will be pleased. If you pray while standing on your own altar, your god will bless any [[holy symbols|/Items/holy symbol]] or [[prayerstones|/Items/prayerstone]] you are carrying, as well as any [[water|/Items/potion of water]] or [[holy symbols|/Items/holy symbol]] placed on the altar.

Your god will then decide how many troubles to fix based on a random roll tied to your Luck and whether you are standing on an altar.

**Trouble Fixing Actions:**

| Action Level | Result |
| :----------: | :----- |
| **1** | Fixes your worst trouble once. |
| **2** | Fixes your worst trouble up to 10 times. |
| **3** | Fixes your worst trouble once, then does Action Level 2. |
| **4** | Fixes your worst trouble until all troubles are completely gone. |
| **5** | Fixes all troubles entirely and grants a **Special Favor**. |

> 💡 **Tip:** If you are not on an altar, the maximum Action Level you can achieve is 3. If your Alignment Record is below 4 (Strident), the maximum Action Level is 1.

### Special Favors

A "special favor" is granted by your god. It occurs when you achieve an Action Level of 5, or if you pray with absolutely no troubles while maintaining an Alignment Record of at least 14 (Devout).

The favor granted is determined by rolling a random number between `0` and `(Luck + 6) / 2`. The possible outcomes are:

| Roll | Effect |
| :--: | :----- |
| **1** | Repairs and uncurses or blesses your wielded weapon. |
| **2** | Increases your max HP by 5 (or restores a drained level), heals you to full HP, cures blindness and hunger, and resets negative Luck to 0. |
| **3** | Provides a hint for the Castle tune (if applicable), then grants the effects of Roll #2. |
| **4** | Uncurses all cursed items in your inventory. |
| **5** | Grants intrinsic Telepathy, Speed, Stealth, or Protection. |
| **6** | Grants a spellbook (preferring unknown spells). |
| **7 or 8** | Crowns you. This requires an Alignment Record of at least 20 (Pious). See the [[Crowning]] wiki page for detailed information on the mechanics and artifacts granted. |
