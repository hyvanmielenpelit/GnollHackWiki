![starting-guide-for-nethack-veterans](/uploads/Starting%20Guide%20for%20NetHack%20Veterans/starting-guide-for-nethack-veterans.webp)

GnollHack works in many ways differently than NetHack and therefore you might need to adjust your gameplay habits accordingly.

## General Advice

Some of the most important things to keep in mind:

- Meleeing may not be the best fighting option anymore. Please mind using ranged combat and spell casting.
- Chat with your pet, different NPCs, and peaceful monsters.
- Shopkeepers and the oracle can identify items for you for a fee.
- Peaceful priests can bless and curse items for a fee.
- Do not spend your gold only on divine protection. Use it also for identification, blessing items, and buying items in the shops.
- Sell expensive but useless items such as spellbooks, if you are a non-spell casting class. You can use low-level spells, though.
- Learn what new items do. Do not ignore them. They may be crucial for your survival. Use Alt-x to view them, or use 'i' + item letter.
- Remember to get death resistance against some instadeath attacks. Magic resistance won't protect you from these anymore.
- You can wear a body armor, a robe, and a cloak at the same time.
- You can dual-wield artifacts.
- Learn to use new container commands, such as:
  - '**d**': drop items from the bag directly onto the ground.
  - '**p**': pick up items on the ground and put them directly into the bag.

## Difficulty

GnollHack is more difficult than NetHack in the end game, and therefore we recommend that you start playing GnollHack somewhere between the **Experienced** and **Expert difficulties**.
- **Experienced difficulty** allows you to play a relatively easy game while learning new mechanics. It can be a right difficulty for many.
- **Adept difficulty** is probably a bit easier than NetHack, but new mechanics in GnollHack can require time to adjust to, which may increase the difficulty.
- **Veteran difficulty** will probably feel somewhat like NetHack but can be more difficult, if you do not utilize the new mechanics well.
- **Expert difficulty** will probably feel more intense than NetHack.

If you are a NetHack veteran with many ascensions, we do not recommend starting with the **Standard difficulty**, because you will get lots of hints about things you already know. **Master** and **Grand Master difficulties**, on the other hand, require you to know GnollHack really well, or otherwise they can be overwhelming.

## Options

### Enable 4 Statuslines

You should be playing GnollHack with **at least 4 status lines**. If you are using the curses interface, we recommend setting the following in your options file:

`OPTIONS=autostatuslines,statuslines:4`

This will enable automatic adjustment of status lines for you, with a minimum of 4 status lines.

### Rebind the Save Key *(Optional)*

Normally, you save the game in GnollHack by pressing Alt–s. This is different from NetHack, because we increased the importance of skills in the game and wanted to bind the **enchance** menu to S (as in *s*kills). If you are not fond of this change, you can rebind the save key to S by adding the following line to your options file:

`BIND=S:save`

## Changed Command Keys

- Save: Alt-s
- Enhance: S
- Take off many: Alt-t
- Two weapon fighting: Ctrl-x
- Chat: C

You can use 'N' or Alt-n for naming objects and monsters, if you used 'C' for that before.

## New Command Keys

- Examine items: Alt-x
- Mix (prepare) spells: X
- Spell descriptions: Alt-z
- Manage spells: +
- Abilities: A
- Character description (including alignment): Alt-y
- Switch handedness: Alt-h
- Dig: Ctrl-g
- Commands menu: Alt-c
- Yell for pets to come: Y

## New Command Behaviours

- You can use an item in your inventory by opening the inventory 'i' and then clicking its letter. It opens an action menu.
- Exchange weapons 'x' is greatly improved. **It does not cost a turn to use** and can be used to switch to your alternate weapon. Combined with Alt-h (switch handedness) you can control if you switch both weapon and shield at the same time, or only the right-hand weapon.

## Improved Ranged Combat

- You should remember to use ranged weapons more often than in NetHack. Bows and crossbows work very fine in GnollHack.
- You cannot hit with fired missiles or thrown weapons in a melee range.
- You are supposed to use ranged weapons first, and then when the monsters gets into a melee range, change your weapons into melee weapons with 'x'.
- Polearms are better, being able to hit 2 squares away in all directions at all skill levels.
- Spears can hit 2 squares away with apply, but you need to be at least Basic in Spear to do so.

## Improved Spell Casting

- There are more spells in GnollHack than in NetHack.
- Most spells need to be prepared with material components. Each preparation gives a number of castings for that spell.
- Spells with a somatic component suffer penalties from armor use.
- Generally, a priest can cast spells with armor on but a wizard cannot.
- You usually need at least Basic skill in a magic school to cast spells of that school. It's useless to learn spells of schools that are restricted to you.

## Player Character

- Changes in attributes reflect immediately in Hit Points and Mana Points. This means that if you find an item that increases your Constitution, you will immediately gain extra hit points.
- Attribute training system has been removed. You gain abilities by eating corpses in a similar way as you ate giants in NetHack to gain strength. Ogres give constitution, nymphs charisma (and no teleportiis), and so on. Also some fruits, such as banana, give attribute points, so please be sure to check what fruits do with Alt-x.

## Changed Dungeon Behaviours

- Fountains can be several types now. You should test the fountain type by dipping a potion into it and see what happens.
- Sinks can be used to dilute potions.
- Disarming traps yields items. Disarming magical traps yields magical items, usually wands.
- You can engrave a new rune word 'Gilthoniel' to protect your items. Monsters cannot pick up items or loot containers in squares protected by this rune word.

## Items

- You can put items directly to your bag, no matter whether they are on the ground, in a chest, or in another bag in your inventory. You can also drop items directly from your bag onto the ground. Use these features to speed up your gameplay. For example:
  - use apply bag 'a' and then 'd' to drop items directly from the bag
  - use apply bag 'a' and then 'p' to pick up items from the ground and put them directly into the bag
- Magic resistance does not give death resistance anymore. A good way to acquire extrinsic death resistance is, for example, by wearing a **gown of the arch-bishops**, **ring of protection from undeath**, or an **amulet vs undeath**.
- Some mushrooms are poisonous. Be careful when you eat them.
- Please sure to learn what new items do. Use Alt-x for examining them, or use 'i' + item letter.
- Items now also give MC, which is used to resist special attacks. MC from different items stacks.
- Items give also a spell casting penalty (or sometimes bonus). Heavier armor may give more penalty than light armor.
- Many old useless items have been buffed. Check what they do with Alt-x.
- Touchstone works even when uncursed to identify gems.
- Robes are a new item slot, which does not stack with the body armor. The game will choose the one with better AC and MC. However, you can wear both to utilize their magical properties, such as reflection.
- You can dual-wield artifacts.
- Dragon Scale Mails incur a penalty on spell casting and are heavier than before, so they do not suit for a wizard very well.
- Crystal Plate Mail gives now reflection and is suitable as a body armor for the wizard.
- Figurines have been removed from the game.
- Missiles, such as arrows, break very rarely. Uncursed missiles break at a 5% chance and blessed missiles do not break at all.
- Cleaver is safer to use. Its arc attack does not hit peaceful and tame monsters.
- Excalibur can be obtained only from magic fountains (original NetHack fountains).
- Stormbringer does not hit tame creatures.
- Conflict has been nerfed so that it does not come as a permanent extrinsic but items with conflict have now charges.
- Unicorn horns have now charges, but have 100% chance to work.
- You can apply wands on items using 'a'.
- Gold is heavy in GnollHack unless you find a bag of treasure hauling.
- Blessed scroll of identify can no longer identify the whole inventory.
- There's a new cursed gray stone named jinxstone. So you need to have a pet to identify all the cursed stones. Kicking is not enough.
- Wands deal different amounts of damage. Particularly, a wand of cold deals 12d6.

## Shops

- Pets cannot steal anymore from shops, but you gain more money, so just buy stuff!
- You will find lots of expensive spell books on your journey. If you do not need them, when you find them, consider selling them and buying something useful for you.
- Shopkeepers can identify items for you. General store keepers can identify all item types and shopkeepers in restricted-item-type shops can identify items types which they sell.
- Smiths, geologists, and artificers can identify some item types as well. Additionally, geologist can buy gems and artificers can buy spellbooks.

## Monsters

- High level priests, such as the high priest in the sanctum, can cast the Touch of Death. Remember that Magic Resistance does not protect you from this spell anymore. You need Death Resistance for it, which you can get from some items.
- High level mage casters, such as Wizard of Yendor, cannot cast Touch of Death anymore. So you do not need Death Resistance against them.
- Cockatrice corpse has been nerfed so that when you hit with it, it needs to pass MC to take effect.
- Covetousness has been removed from all monsters except Wizard of Yendor and high-level liches, and therefore many boss monsters are easier than before. However, they may have new abilities and more hit points than before to make up the loss.
- You can hire peaceful monsters to your party. Especially, if you have high charisma, this can be a good way to acquire a powerful pet.