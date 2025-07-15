## General
* New MC system — MC ranges now from 0–25, giving you a chance to resist special attacks, such as level drain. MC from different items also stacks.
* 7 Difficulty levels:
  * **Standard:** Combat difficulty 10% — Monsters deal 25% of normal damage and you deal 252% normal damage.
  * **Experienced:** Combat difficulty 18% — Monsters deal 35% of normal damage and you deal 200% normal damage.
  * **Adept:** Combat difficulty 31% — Monsters deal 50% of normal damage and you deal 159% normal damage.
  * **Veteran:** Combat difficulty 56% — Monsters deal 71% of normal damage and you deal 126% of normal damage.
  * **Expert:** Combat difficulty 100% — Monsters and you deal normal damage. _(This is the same difficulty as in NetHack.)_
  * **Master:** Combat difficulty 178% — Monsters deal 141% of normal damage and you deal 79% of normal damage.
  * **Grand master:** Combat difficulty 317% — Monsters deal 200% of normal damage and you deal 63% of normal damage.
* The chosen difficulty will show in the status bar before the dungeon level as a letter:
  * **Standard**: s
  * **Experienced**: e
  * **Adept**: a
  * **Veteran**: v
  * **Expert**: x
  * **Master**: m
  * **Grand Master**: g
* Removed the attribute training system. Instead, you gain attributes by eating corpses and some fruits (a vegetarian option).
  * Giants and spinach give strength.
  * Snakes, monkeys, and bananas give dexterity.
  * Ogres and pomegranates give constitution.
  * Mind flayers and lichens (vegetarian) give intelligence.
  * Owlbears and treants (vegetarian) give wisdom.
  * Nymphs and avocados give charisma (and no teleportiis anymore).
* There is a warning prompt, when you try to enter a water square.
* There is a warning prompt, when you try to put a bag into a bag.
* There is a warning prompt, when you try to enter a known trap.
* Polymorph, polymorph traps, and polymorphing monsters (such as chameleons) always polymorph into in-difficulty forms.
* Polymorph control has been also nerfed. You cannot polymorph into out-of-difficulty forms.
* Gold and alignment are not shown on the status bar. You can check your gold by checking your inventory, and you can find your alignment in the new character page (Alt-y).
* Players and monsters regenerate hit points at the rate of `MaxHP/300` per turn. Regeneration doubles that.
* Players regenerate mana at the rate of `MaxMana/900` per turn. Replenishment doubles that.
* Players and monsters generally have more hit points and deal more damage than in NetHack.
* Players and monsters can have higher AC than in NetHack, because Dexterity increases one's AC.
* Attributes, like strength and dexterity, give out different amount of bonuses than in vanilla NetHack. Check 'Ctrl-y' for exact information.
* Exchanging weapons with 'x' has been greatly improved. You can wield a one-handed weapon and a shield in one set and a two-handed weapon in a second set, and it works great.
* Two-weaponing has been greatly improved. It does not use the second readied set weapon anymore. It is toggled by 'Ctrl-x'.
* New rune word: Gilthoniel, which prevents monsters from picking up items or looting containers in the square that is protected by it. Gilthoniel does not work in Gehennom.
* New rune word: Morgoth, which does the same as Gilthoniel but works in Gehennom.
* You can use containers even when you wield a cursed two-handed weapon.

## Player Character
* Experience level cap increased to 50.
* It requires only 1,000,000 experience points to reach level 30, compared to 100,000,000 in NetHack.
* Characters can carry more than before.
* Changes in Constitution immediately reflect in your maximum hit points.
* Changes in Intelligence and Wisdom immediately reflect in your maximum mana.

## Monsters
* Monsters have attributes like the player character (Strength, Dexterity, etc.).
* Summon nasties monster spell has been heavily nerfed. Sorry liches.
* Covetousness has been removed from monsters, except for Wizard of Yendor.
* The covetousness of the Wizard of Yendor has been nerfed so that he does no regenerate hit points so fast. He also cannot steal quest artifacts anymore. He steals only the Amulet of Yendor.
* Monsters are more intelligent than before and can use more different kinds of items.
* Cockatrice is more dangerous, petrifying you on a successful hit, if it passes MC.
* Cockatrice corpse is less dangerous, needing to pass MC to petrify a monster.
* Most monsters with a special attack are more dangerous, since MC% is usually lower in GnollHack than in vanilla NetHack.
* All monsters except wraiths generate a corpse 100% of time.
* Couatls, mariliths, and constrictor snakes have now a strangling attack, which kills you in 6 turns.
* Drowning attack is not instadeath anymore.
* Purple worms do not instakill pets and monsters anymore.
* Monster difficulty level is now mathematically feasible, calculated based on `SQRT(damage_per_turn * effective_hit_points)`. The real formula is more complex.
* Undead and mindless monsters do not flee from battle and are immune to fear.
* Killing monsters gives out experience of about `1 + monster_difficulty_level ^ 2`. This means that a difficulty level 10 monster gives out about 100 XP and a difficulty level 100 monster gives out about 10,000 XP. 
* Monsters appearing in an encounter give out extra experience, depending on the difficulty level of the encounter.
* Monsters range in difficulty levels between 0 and 200, even though the upper limit is not capped.
* You can see the monster difficulty level by using '/'.
* Demons summon other demons more seldomly.
* Some letter changes. Gnomes are now in 'g', lesser undead in 'z', and greater undead in 'Z'. Zruty is now in 'Y'.
* New monster class Gnoll 'G'. Includes Gnolls and Flinds.
* For copyright reasons, there are now tentacled ones, gazers, and underworld hulks instead of mind flayers, beholders, and umber hulks.
* Mage spell casters cannot cast Touch of Death anymore. This includes Wizard of Yendor.
* High Priest class clerical spell casters can cast Touch of Death. Magic resistance does not help against it anymore. You need death resistance. So, please remember to acquire it before engaging combat with any high priest class monsters, such as Greater Mummy High Priest.
* Death resistance is also required against Death's touch of death.


## Pets
* Pets now have a pathing algorithm (the same as in travel). No more pets stuck on the other side of the map.
* Pet hit points and other statistics are now shown on status lines 4-8.
* You can command pets to stay put. Useful, when you do not want them to eat corpses.
* You can give items to your pet and tell it to wear or undress them.
* You can tell your pet to drop its items.
* Pets now attack high level monsters but are also in danger to be killed by them.
* More food for your pets in the dungeon. Especially, more food for the horses in garden rooms.
* Pets have more hit points in the beginning to prevent them from being killed early.
* Pets do not attack peaceful monsters.
* You can see pet hit points by using '/'.
* Better messaging when the pet is hungry.
* Riding as a non-knight is easier. The pet loses tamedness slower.

## Shopkeepers, Priests, and the Oracle
* Shopkeepers and the Oracle can identify items.
* Priests can bless and curse items, and heal you for a fee.
* Oracle can also provide enlightenment.
* Shopkeepers have been trained to spot pets that try to steal items from their shops.

## Skills
* Weapon skills have been combined, so that there are now 14 weapon skills instead of 28.
* Weapon skills grant more bonuses than before.
* Revised spell school skills.
* There is now a Disarm Traps skill, which you can improve.
* Untrapping traps grants items. Magical traps usually give out wands.
* Martial arts is now a prestige skill that you can improve after you have reached Expert in Bare Handed Combat. It requires 2, 3, 3, 4, and 4 skill point slots at Basic, Skilled, Expert, Master, and Grand Master levels, respectively.
* The game shows when you have unused skill points in the status bar.

## Roles
* Monk is heavily improved — He can even do martial art kicks using 'k'. The boots of kicking are now very useful for him.
* Most roles have revised intrinsics per level.
* Tourist starts with a +2 golf club, because he cannot throw darts in a melee range anymore.
* All roles start with a bag. Rogues start with a bag of treasure hauling and wizards with a bag of wizardry. Other roles start with a normal bag or backpack.

## Items
* Mythic affix item property system — Non-magical weapons and armor can be generated with special properties, such as demon slaying or fire resistance.
* Weapon quality classes — Weapons can now be normal, exceptional, elite, or one of celestial, primordial, or infernal. Exceptional weapons cause double base damage, elite triple, and celestial, primordial, and infernal quadruple damage.
* Elemental enchantment — Weapons can also be elemental enchanted much in the same way as they can be poisoned. Elemental enchantment may wear of during use.
* New item slot 'Robe' — You can wear Robe over your armor and under your cloak. It does not stack with your armor, but the game will pick the AC of the body armor or the robe, whichever is better. Likewise for MC.
* You can fire-enchant, lightning-enchant, and cold-enchant items to do more damage on hit. They work similarly to poison.
* You can apply wands to items to enchant them, or to disenchant them with the wand of cancellation.
* New item class Reagents ('9') has been added.
* New item class Miscellaneous items ('8') has been added. You can wear 5 miscellaneous items on you, such as belts and ioun stones, but only 1 per miscellaneous item slot.
* You can gain blind telepathy by eating a panther cap. Good for vegetarians!
* Vegetable food gives more nutrition.
* Figurines have been removed from the game. Sorry knights and pacifists, no more Archons and ki-rins as pets from wishes.
* Dual-use items, such as a spiked shield, which is a weapon and an armor at the same time.
* Attack wands now do different amount of damage than before (especially wands of fire, cold, and lightning, which had the same 6d6 damage before).
* Gold weighs now 10x more than before, but there is also a bag of treasure hauling, which reduces gold weight to 1/32.
* Using ranged weapons or thrown weapons in a melee range (1 square) receive a heavy to-hit penalty, up to -20.
* Polearms now hit all adjacent squares (i.e., range of SQRT(8)) on all skill levels.
* Thrown weapons and fired missiles, such as darts and arrows, break only at 1/20 chance, when uncursed. When blessed, they do not break at all.
* You can move items directly from a container to another.
* Unicorn horns have charges and cannot cure attribute point damage. However, they work now 100% of time. An uncursed unicorn horn always cures 1 condition and a blessed one 2 conditions.
* Conflict has been nerfed so that items with conflict are no longer permanent but have charges.
  * Ring of Conflict is now an artifact with charges
  * There's a new item: scroll of conflict (single-use conflict)
  * There's a new horn: horn of chaos that gives conflict as a debuff to nearby monsters
* Magic resistance has been nerfed.
  * It does not give immunity to death attacks; there are separate items that give death resistance such as amulet vs death magic and ring of protection from undeath.
  * It does not give shielding from magic missiles and striking; there are separate items that give magic missile resistance, such has bracers of magic missile resistance.
  * It does not reduce elemental damage to half.
* Wand of Polymorph has been nerfed. A blessed/uncursed/cursed wand of polymorph can now affect 7/4/1 items per use.
* You can search for traps in a chest by standing in the same square where the chest is and pressing search 's'.
* You can use items even if you have a cursed two-handed weapon.
* You cannot choke on food that adds 50 or less nutrition.

## Dungeon
* Your starting room has an altar of your god and your stash, which contains an axe (if you do not have a starting axe), 2 scrolls (one of which is a scroll of identify), and a random food item.
* Garden rooms with lots of fruits — And you can dig (Ctrl-d) in them for roots and cut down trees for lumber.
* Library rooms with spell casting monsters.
* Dragon lairs with dragons – even ancient ones.
* Two different types of the orc-and-the-pie rooms.
* A deserted shop with lots of mimics and a boss mimic, which drops the Wand of Identify.
* The number of items generated in the dungeon has been greatly increased compared to NetHack.
* Higher level monsters appear quicker in GnollHack than in NetHack.
* Fountains are safer to drink from. Bad effects happen only on lower dungeon levels.
* There are also several different fountain types, including a fountain of poison, a fountain of healing, a fountain of mana, and a fountain of power. The old fountain is renamed magic fountain.
* Slightly shorter Dungeons of Doom.
* Slightly shorter Gehennom with no mazes except on special levels.
* New dungeon branches

## Spells
* 14 different spell levels: Minor cantrip, major cantrip, and levels 1–12.
* Most spells have now a material component, which is required to mix (prepare) the spell.
* Each mixing gives out a number of castings, ranging from 1–100 across spells.
* Spells can also have a cooldown, which needs to pass before the spell can be cast again.
* Spells use an attribute to cast the spell: Intelligence, Wisdom, Charisma, or any combination of them.
* New spell casting chance system
  * +80% per magic school level
  * -60% per spell level
  * `+` spell casting bonus from items (such as magical staves and other magical items) — they do not work on restricted schools
  * `-` spell casting penalty from armor (somatic spells only)
  * +15% per stat point (INT, WIS or CHA)
* Skill levels in spell schools reduce mana required to cast spells.
* Spells cannot be forgotten over time.
* You can remove spells from the spell list through '+'.
* You can hotkey spells with '+'.
* Spellbooks crumble to dust when read successfully.
* Spellbooks are less dangerous to read – they do not paralyze you when the reading fails.

## Scoring
* GnollHack has its own scoring system
* You get score from:
  * Delving deeper into the dungeon
  * Achievements
  * Ascending (= winning the game)
  * Conducts (ascensions only)
  * Turn count (ascensions only; lower is better)
  * Difficulty level (harder difficulties give more score)
* Compared to NetHack, you don't gain score from:
  * Gold
  * Gems
  * Artifacts
  * Amulets
* The scoring system is designed in a way that your current score can be displayed at any time in the status bar.

The rest of the changes can be found in [[Minor Features]].