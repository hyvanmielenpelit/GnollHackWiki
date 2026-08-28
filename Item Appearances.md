> 👉 **Most magical items in GnollHack hide behind a randomized appearance that changes from game to game. This page explains exactly which items are shuffled, which ones always look the same, and what pool of appearances each item can be drawn from.**

## 🔍 How Appearance Randomization Works

Every object type in GnollHack has two names:

- An **actual name**, such as "potion of full healing", which is shown once the item type has been identified.
- An **appearance** (unidentified description), such as "black potion", which is shown before identification.

At the start of every new game, GnollHack shuffles the appearances **within predefined groups**. The shuffle is a uniform random permutation inside each group, and the result is stored in the save file, so an item's appearance never changes during a game. Restoring a save (or continuing on another device) always restores the same assignment.

### What is swapped

When an appearance is shuffled onto a different item, these things move **with the appearance**:

- The appearance text itself (for example "pine" or "ZELGO MER").
- The display color and the map/inventory tile.
- For some groups only, the item's **material** (see below).
- For jars, the description of the visible contents (for example "yellow ointment").

### What is never swapped

These stay with the item's **true type**, no matter what it looks like:

- Base price, weight, generation probability, and stack size.
- All game effects, enchantment behavior, and charges.
- The item description text shown for identified items.
- The spellbook "contains ..." hint shown when reading an unidentified book.

> 💡 **Tip:** Because price and weight follow the true item and not the appearance, price identification in shops and weighing stacks are still fully reliable identification methods.

### Material shuffling

Some groups shuffle the material together with the appearance, and some do not.

| Behavior | Groups | What it means |
|---|---|---|
| **Material follows the appearance** | Potions, scrolls, spellbooks, amulets, venoms, wands, rings, robes, bracers, crowns, conical hats, brooches, nose rings, headbands, ioun stones, eyeglasses, goggles, belts, mushrooms | A "pine wand" really is wooden and a "wooden ring" really burns. The material is part of the appearance and tells you nothing about the item type. |
| **Material stays with the item type** | Helmets, gloves, cloaks, boots, shirts, staves, bags, candles, lamps, whistles, flutes, horns, harps, drums, jars | The material is hidden because it matches the base material of that type, so no material prefix appears in the item name. It still governs how the item reacts to fire, rust and similar effects. |

Materials are described in more detail on the [[Object Materials]] page.

### Not every appearance is used

Several appearance pools contain more entries than there are real items, and a few items are never randomly generated. In any single game some appearances therefore belong to nothing at all and will never be seen.

| Pool | Appearances | Item types | Never generated |
|---|---|---|---|
| **Potions** | 45 | 45 | — |
| **Scrolls** | 47 | 27 | 20 label-only entries, plus the scroll of supreme diabolism |
| **Wands** | 35 | 32 | 3 appearance-only entries |
| **Rings** | 38 | 38 | — |
| **Amulets** | 15 | 15 | [[/Items/Amulet of seeing]] |
| **Spellbooks** | 266 | 266 | [[/Items/Spellbooks/Spellbook of call hierarch modron]] |

## 🧪 Potions

Potions are shuffled as a whole class, **except for the last three types**, which always look the same in every game.

### Randomized potion appearances (45)

- black
- bright
- bright cyan
- bright magenta
- brilliant blue
- brown
- bubbly
- cloudy
- crimson
- cyan
- dark
- dark green
- dark ochre
- deep red
- effervescent
- emerald
- fizzy
- golden
- gray
- greenish
- light blue
- lime green
- magenta
- milky
- murky
- ochre
- olive
- orange
- pink
- puce
- purple
- purple-red
- red
- ruby
- sapphire
- shimmering
- silvery
- sky blue
- smoky
- swirly
- umber
- verdant
- violet
- white
- yellow

Any one of these 45 appearances may be any of the 45 shuffled potion types:

- [[/Items/Potion of acid]]
- [[/Items/Potion of blindness]]
- [[/Items/Potion of cold immunity]]
- [[/Items/Potion of confusion]]
- [[/Items/Potion of elven herbal brew]]
- [[/Items/Potion of enlightenment]]
- [[/Items/Potion of extra-energy]]
- [[/Items/Potion of extra-healing]]
- [[/Items/Potion of fire immunity]]
- [[/Items/Potion of fruit juice]]
- [[/Items/Potion of full energy]]
- [[/Items/Potion of full healing]]
- [[/Items/Potion of gain ability]]
- [[/Items/Potion of gain energy]]
- [[/Items/Potion of gain level]]
- [[/Items/Potion of greater energy]]
- [[/Items/Potion of greater healing]]
- [[/Items/Potion of greater regeneration]]
- [[/Items/Potion of greater rejuvenation]]
- [[/Items/Potion of greater speed]]
- [[/Items/Potion of hallucination]]
- [[/Items/Potion of healing]]
- [[/Items/Potion of heroism]]
- [[/Items/Potion of invisibility]]
- [[/Items/Potion of lesser regeneration]]
- [[/Items/Potion of lesser rejuvenation]]
- [[/Items/Potion of levitation]]
- [[/Items/Potion of lightning speed]]
- [[/Items/Potion of magic resistance]]
- [[/Items/Potion of monster detection]]
- [[/Items/Potion of object detection]]
- [[/Items/Potion of oil]]
- [[/Items/Potion of paralysis]]
- [[/Items/Potion of poison]]
- [[/Items/Potion of polymorph]]
- [[/Items/Potion of regeneration]]
- [[/Items/Potion of rejuvenation]]
- [[/Items/Potion of restore ability]]
- [[/Items/Potion of see invisible]]
- [[/Items/Potion of shock immunity]]
- [[/Items/Potion of sickness]]
- [[/Items/Potion of sleeping]]
- [[/Items/Potion of speed]]
- [[/Items/Potion of super-heroism]]
- [[/Items/Potion of titan strength]]

### Fixed potion appearances

| Appearance | Always is |
|---|---|
| **clear** | [[/Items/Potion of water]] (holy and unholy water look the same) |
| **dark ruby** | [[/Items/Potion of dwarven mushroom brew]] |
| **pale yellow** | [[/Items/Potion of urine]] |

> 📢 **Important:** A "clear potion" is always water. This is by far the most useful fixed appearance in the game, because water is the base of holy water, unholy water and most [[Alchemy]] recipes.

See also [[Potions]] and [[Diluted Potions]].

## 📜 Scrolls

Scrolls are shuffled as a whole class up to (but not including) scroll of mail. The pool contains **47 labels for only 27 scroll types**, so roughly 20 labels are attached to nothing in any given game and can never be found.

### Randomized scroll labels (47)

**Labels used by real scroll types:**

- ALA KA ZAM
- ANDOVA BEGARIN
- DAIYEN FOOELS
- DUAM XNAHT
- ELAM EBOW
- ELBIB YLOH
- HACKEM MUCHE
- HOCUS POCUS
- JUYED AWK YACC
- KERNOD WEL
- KIRJE
- LEP GEX VEN ZEA
- NR 9
- NUGG YEBBEH
- PRATYAVAYAH
- PRIRUTSENIE
- REX SAPH
- THARR
- VE FORBRYDERNE
- VELOX NEB
- VENZAR BORGAVVE
- VERR YED HORRE
- VEX DOL
- XIXAXA XOXAXA XUXAXA
- YUM YUM
- ZELGO MER
- ZEPH NI

**Extra labels with no item of their own:**

- ABRA KA DABRA
- ASHPD SODALG
- EIRIS SAZUN IDISI
- ETAOIN SHRDLU
- FNORD
- FOOBIE BLETCH
- GARVEN DEH
- GHOTI
- GNIK SISI VLE
- HAPAX LEGOMENON
- KO BATE
- LOREM IPSUM
- MAPIRO MAHAMA DIROMAT
- PHOL ENDE WODAN
- READ ME
- STRC PRST SKRZ KRK
- TEMOV
- VAS CORP BET MANI
- XOR OTA
- ZLORFIK

> ℹ️ **Note:** The split above is only the order in which the labels are listed in the game data. After shuffling, **any** of the 47 labels can belong to **any** of the 27 scroll types, and the remaining labels belong to nothing.

The 27 shuffled scroll types are:

- [[/Items/Scroll of amnesia]]
- [[/Items/Scroll of charging]]
- [[/Items/Scroll of conflict]]
- [[/Items/Scroll of confuse monster]]
- [[/Items/Scroll of create monster]]
- [[/Items/Scroll of destroy armor]]
- [[/Items/Scroll of earth]]
- [[/Items/Scroll of enchant accessory]]
- [[/Items/Scroll of enchant armor]]
- [[/Items/Scroll of enchant weapon]]
- [[/Items/Scroll of fire]]
- [[/Items/Scroll of food detection]]
- [[/Items/Scroll of genocide]]
- [[/Items/Scroll of gold detection]]
- [[/Items/Scroll of identify]]
- [[/Items/Scroll of light]]
- [[/Items/Scroll of magic mapping]]
- [[/Items/Scroll of protect armor]]
- [[/Items/Scroll of protect weapon]]
- [[/Items/Scroll of punishment]]
- [[/Items/Scroll of remove curse]]
- [[/Items/Scroll of retraining]]
- [[/Items/Scroll of scare monster]]
- [[/Items/Scroll of stinking cloud]]
- [[/Items/Scroll of supreme diabolism]] (never randomly generated)
- [[/Items/Scroll of taming]]
- [[/Items/Scroll of teleportation]]

### Fixed scroll appearances

| Appearance | Always is |
|---|---|
| **stamped** | [[/Items/Scroll of mail]] |
| **unlabeled** | [[/Items/Scroll of blank paper]] |

See also [[Scrolls]].

## 🪄 Wands

The 32 shuffled wand types share a pool of **35 appearances**, so three appearances belong to nothing in any given game.

### Randomized wand appearances (35)

- adamantium
- aluminum
- balsa
- blackwood
- brass
- copper
- crystal
- curved
- ebony
- flimsy
- forked
- glass
- hexagonal
- iridium
- iron
- jeweled
- long
- mahogany
- maple
- marble
- mithril
- oak
- orichalcum
- ornamental
- pine
- platinum
- runed
- short
- silver
- skull-headed
- spiked
- steel
- tin
- uranium
- zinc

The 32 shuffled wand types are:

- [[/Items/Wand of cancellation]]
- [[/Items/Wand of cold]]
- [[/Items/Wand of create monster]]
- [[/Items/Wand of death]]
- [[/Items/Wand of digging]]
- [[/Items/Wand of disintegration]]
- [[/Items/Wand of enlightenment]]
- [[/Items/Wand of evaporation]]
- [[/Items/Wand of fire]]
- [[/Items/Wand of identify]]
- [[/Items/Wand of light]]
- [[/Items/Wand of lightning]]
- [[/Items/Wand of locking]]
- [[/Items/Wand of magic missile]]
- [[/Items/Wand of make invisible]]
- [[/Items/Wand of nothing]]
- [[/Items/Wand of opening]]
- [[/Items/Wand of ore detection]]
- [[/Items/Wand of petrification]]
- [[/Items/Wand of polymorph]]
- [[/Items/Wand of probing]]
- [[/Items/Wand of resurrection]]
- [[/Items/Wand of secret door detection]]
- [[/Items/Wand of sleep]]
- [[/Items/Wand of slow monster]]
- [[/Items/Wand of speed monster]]
- [[/Items/Wand of striking]]
- [[/Items/Wand of teleportation]]
- [[/Items/Wand of town portal]]
- [[/Items/Wand of trap detection]]
- [[/Items/Wand of undead turning]]
- [[/Items/Wand of wishing]]

### Wand materials by appearance

Wand materials are shuffled together with the appearance, so the material is always consistent with what you see. This matters because wooden wands burn and glass wands shatter.

| Material | Appearances |
|---|---|
| **Wood** | balsa, mahogany, blackwood, maple, pine, oak, ebony, ornamental, flimsy, forked |
| **Iron** | mithril, iron, steel, hexagonal, short, runed, long, adamantium, curved, spiked, jeweled |
| **Other metal** | tin, iridium, zinc, aluminum, uranium |
| **Brass** | brass |
| **Copper** | copper |
| **Silver** | silver |
| **Platinum** | platinum |
| **Orichalcum** | orichalcum |
| **Glass** | glass |
| **Crystal** | crystal |
| **Mineral** | marble |
| **Bone** | skull-headed |

### Fixed wand appearance

| Appearance | Always is |
|---|---|
| **plutonium** | [[/Artifacts/The Rod of Disjunction]] (base item never generates) |

> 💡 **Tip:** The [[/Items/wand of nothing]] gets a random zap behavior at the start of each game. In half of all games it is a no-direction wand and in the other half it asks for a direction. This means the direction prompt alone does not reliably rule the wand of nothing in or out.

See also [[Wands]] and [[Exceptional and Elite Wands]].

## 💍 Rings

All 38 magical ring types are shuffled together with their materials, in a pool of exactly 38 appearances.

### Randomized ring appearances (38)

- adamantium
- agate
- black onyx
- black opal
- black pearl
- brass
- bronze
- clay
- copper
- coral
- crystal
- diamond
- emerald
- engagement
- gold
- granite
- immaculate
- iron
- ivory
- jade
- moonstone
- opal
- pearl
- platinum
- polished
- ruby
- runed
- sapphire
- serpent-headed
- shiny
- silver
- steel
- thin
- tiger eye
- topaz
- twisted
- wire
- wooden

The 38 shuffled ring types are:

- [[/Items/Ring of adornment]]
- [[/Items/Ring of aggravate monster]]
- [[/Items/Ring of cold resistance]]
- [[/Artifacts/The Ring of Conflict]]
- [[/Items/Ring of fire resistance]]
- [[/Items/Ring of fortitude]]
- [[/Items/Ring of free action]]
- [[/Items/Ring of gain constitution]]
- [[/Items/Ring of gain dexterity]]
- [[/Items/Ring of gain intelligence]]
- [[/Items/Ring of gain strength]]
- [[/Items/Ring of gain wisdom]]
- [[/Items/Ring of hunger]]
- [[/Items/Ring of increase accuracy]]
- [[/Items/Ring of increase damage]]
- [[/Items/Ring of invisibility]]
- [[/Items/Ring of levitation]]
- [[/Items/Ring of poison resistance]]
- [[/Items/Ring of polymorph]]
- [[/Items/Ring of polymorph control]]
- [[/Items/Ring of power]]
- [[/Items/Ring of protection]]
- [[/Items/Ring of protection from shape changers]]
- [[/Items/Ring of protection from undeath]]
- [[/Items/Ring of regeneration]]
- [[/Items/Ring of replenishment]]
- [[/Items/Ring of searching]]
- [[/Items/Ring of see invisible]]
- [[/Items/Ring of shock resistance]]
- [[/Items/Ring of slow digestion]]
- [[/Items/Ring of stealth]]
- [[/Items/Ring of sustain ability]]
- [[/Items/Ring of teleport control]]
- [[/Items/Ring of teleportation]]
- [[/Items/Ring of the serpent god]]
- [[/Items/Ring of warning]]
- [[/Items/Ring of wizardry]]
- [[/Items/Ring of X-ray vision]]

Because material is shuffled together with the appearance, a "wooden ring" really is made of wood and an "iron ring" really rusts, regardless of what the ring turns out to be.

### Fixed ring appearance

| Appearance | Always is |
|---|---|
| **golden runed** | [[/Artifacts/The Ruling Ring of Yendor]] (base item never generates) |

See also [[Rings]].

## 📿 Amulets

All 15 amulet types share a pool of 15 geometric shapes.

### Randomized amulet appearances (15)

- circular
- concave
- convex
- cubical
- cylindrical
- hexagonal
- icosahedral
- linear
- octagonal
- oval
- pyramidal
- spherical
- square
- tetrahedral
- triangular

The 15 shuffled amulet types are:

- [[/Items/Amulet of change]]
- [[/Items/Amulet of ESP]]
- [[/Items/Amulet of life saving]]
- [[/Items/Amulet of magical breathing]]
- [[/Items/Amulet of mana]]
- [[/Items/Amulet of reflection]]
- [[/Items/Amulet of restful sleep]]
- [[/Items/Amulet of seeing]] (never randomly generated)
- [[/Items/Amulet of strangulation]]
- [[/Items/Amulet of unchanging]]
- [[/Items/Amulet versus petrification]]
- [[/Items/Amulet versus poison]]
- [[/Items/Amulet versus undeath]]
- [[/Items/Demon blood talisman]]
- [[/Items/Periapt of vitality]]

### Fixed amulet appearance

| Appearance | May be |
|---|---|
| **Amulet of Yendor** | The real [[/Items/Amulet of Yendor]] or a [[/Items/cheap plastic imitation of the Amulet of Yendor]] |

The imitation and the real Amulet look identical and must be identified individually.

See also [[Amulets]].

## 📕 Spellbooks

All **266** ordinary spellbooks are shuffled together in a pool of 266 covers. Listing them is of little practical use, because reading a spellbook nearly always identifies it immediately.

### Why covers rarely matter

- For the great majority of spellbooks, opening the book prints "This spellbook contains '<spell name>'." and identifies the type immediately, before you have to commit to actually studying it. The check costs one round if you decline.
- Only **26 dangerous or extremely powerful books** must actually be read through to be identified. For all of these the game shows a **truthful hint about the school and antiquity of the magic** before you commit, for example "This spellbook contains ancient necromantic magic. Read it?"
- That hint is bound to the **actual spell**, not to the cover, and is therefore never shuffled.

### The 26 books that must be read to be identified

| Hint shown before reading | Possible spells |
|---|---|
| **ancient conjuration magic** | great Yendorian summoning, wish |
| **long-forgotten conjuration magic** | black blade of disaster, sphere of annihilation |
| **alien conjuration magic** | call hierarch modron |
| **ancient clerical prayer** | absolution |
| **ancient celestial prayer** | guardian angel, holy word, summon ancient gold dragon, summon archon |
| **an aeon-old celestial prayer** | divine intervention, call Bahamut, heavenly army |
| **ancient enchantment magic** | mass domination |
| **an ancient movement spell** | time stop |
| **ancient abjuration magic** | globe of invulnerability |
| **long-forgotten abjuration magic** | disjunction |
| **ancient necromantic magic** | touch of death, finger of death, deathspell, power word kill, create dracolich, create elder dracolich |
| **long-forgotten necromantic magic** | armageddon, mass create dracolich |
| **sinister necromantic magic** | call Demogorgon |

Every book in this list carries a hint, so there is never a spellbook whose topic stays completely unknown. The hint is coarse, however: it names only the school and the age of the magic, so "ancient necromantic magic" leaves six possible spells.

### Duplicated covers

Ten covers are used by two or three different books each, so even with a full appearance list some books remain ambiguous.

| Cover | Possible books |
|---|---|
| **hand-patterned** | burning hands, shocking touch |
| **oval-patterned** | meteor swarm, forbid summoning |
| **scintillating** | magic storm, disjunction |
| **wave-patterned** | animate air, greater animate air |
| **octagonal-patterned** | animate earth, greater animate earth |
| **flame-patterned** | animate fire, greater animate fire |
| **water-drop-patterned** | animate water, greater animate water, summon dragon |
| **colorless** | astral vision, true seeing |
| **glowing** | enchant armor, protect armor |
| **unspeakable** | raise minor zombie, raise giant zombie |

### Fixed spellbook appearances

| Appearance | Always is |
|---|---|
| **plain** | [[/Items/Spellbooks/Spellbook of blank paper]] |
| **paperback** | Any of the tribute [[Novels]] |
| **ornamental white** | [[/Artifacts/The Prime Codex]] (base item never generates) |
| **papyrus** | [[/Artifacts/Book of the Dead]] |

The manual has no appearance at all and is always shown by its real name. See also [[/Items/Spellbooks]] and [[Manuals and Catalogues]].

## 🛡️ Armor

Armor is shuffled in small, tight groups. Each group below is a closed pool: an appearance from one group can never appear on an item from another group.

### 🪖 Helmets (4)

| Appearance | Possible items |
|---|---|
| **plumed helmet**, **etched helmet**, **crested helmet**, **visored helmet** | [[/Items/Helmet]], [[/Items/Helm of brilliance]], [[/Items/Helm of opposite alignment]], [[/Items/Helm of telepathy]] |

All four may be randomly generated in adamantium, mithril or bronze, and this material roll is identical for all four types, so it gives no clue.

### 👑 Crowns (2)

| Appearance | Possible items |
|---|---|
| **golden crown**, **ornamental crown** | [[/Items/Royal crown]], [[/Items/Crown of rulership]] |

### 🎩 Conical hats (3)

| Appearance | Possible items |
|---|---|
| **blue conical hat**, **green conical hat**, **red conical hat** | [[/Items/Cornuthaum]], [[/Items/Dunce cap]], [[/Items/Gnomish felt hat]] |

The color in the name always matches the color drawn on screen, because the display color is shuffled together with the appearance.

### 🧥 Cloaks (5)

| Appearance | Possible items |
|---|---|
| **tattered cape**, **opera cloak**, **ornamental cope**, **hard woven cloak**, **piece of cloth** | [[/Items/Cloak of protection]], [[/Items/Cloak of invisibility]], [[/Items/Cloak of magic resistance]], [[/Items/Cloak of integrity]], [[/Items/Cloak of displacement]] |

### 👕 Robes (11)

| Appearance | Possible items |
|---|---|
| **old robe**, **decorated robe**, **ornate robe**, **golden ornamental robe**, **shining white robe**, **shining purple robe**, **shining green robe**, **star-patterned robe**, **shining blue robe**, **shining gray robe**, **shining black robe** | [[/Items/Medieval robe]], [[/Items/Wizard's robe]], [[/Items/Clerical gown]], [[/Items/Robe of protection]], [[/Items/Robe of magic resistance]], [[/Items/Gown of the archbishops]], [[/Items/Robe of powerlessness]], [[/Items/Robe of eyes]], [[/Items/Robe of the archmagi]], [[/Items/Robe of splendor]], [[/Items/Robe of starry wisdom]] |

### 💪 Bracers (6)

| Appearance | Possible items |
|---|---|
| **old bracers**, **runed bracers**, **deerskin bracers**, **dilapidated bracers**, **shining bracers**, **ornamental bracers** | [[/Items/Leather bracers]], [[/Items/Bracers of defense]], [[/Items/Bracers of archery]], [[/Items/Bracers of shaking and tottering]], [[/Items/Bracers of spell casting]], [[/Items/Bracers against magic missiles]] |

The [[/Items/bracers of reflection]] are not in the pool and always appear as **polished silver bracers**.

### 👚 Shirts (4)

| Appearance | Possible items |
|---|---|
| **funny T-shirt**, **black T-shirt**, **green T-shirt**, **old T-shirt** | [[/Items/Shirt of uncontrollable laughter]], [[/Items/Shirt of comeliness]], [[/Items/Shirt of sound mindedness]], [[/Items/T-shirt]] |

The [[/Items/Hawaiian shirt]] has no appearance of its own and is always recognized.

### 🧤 Gloves (6)

| Appearance | Possible items |
|---|---|
| **old gloves**, **padded gloves**, **brown gloves**, **deerskin gloves**, **riding gloves**, **fencing gloves** | [[/Items/Leather gloves]], [[/Items/Gauntlets of fumbling]], [[/Items/Gloves of haste]], [[/Items/Gloves of spell casting]], [[/Items/Gauntlets of ogre power]], [[/Items/Gauntlets of dexterity]] |

### 🥾 Boots (8)

| Appearance | Possible items |
|---|---|
| **combat boots**, **runed boots**, **jungle boots**, **hiking boots**, **mud boots**, **buckled boots**, **riding boots**, **snow boots** | [[/Items/Speed boots]], [[/Items/Galadhrim boots]], [[/Items/Water walking boots]], [[/Items/Jumping boots]], [[/Items/Elven boots]], [[/Items/Kicking boots]], [[/Items/Fumble boots]], [[/Items/Levitation boots]] |

> 📢 **Important:** [[/Items/low boots]] (**walking shoes**), [[/Items/shoes]] (**hard shoes**) and [[/Items/high boots]] (**jackboots**) are **not** in the shuffled pool. Those three appearances always mean exactly those three mundane boots.

See also [[Armor]], [[Helms]], [[Cloaks]], [[Robes]], [[Bracers]], [[Shirts]], [[Gloves]] and [[Boots]].

## ⚔️ Weapons

Only one weapon group is shuffled.

### 🪄 Staves (6)

| Appearance | Possible items |
|---|---|
| **runed staff**, **ornamental staff**, **forked staff**, **blue-hued staff**, **serpent-entwined staff**, **twisted staff** | [[/Items/Staff of the magi]], [[/Items/Staff of fire]], [[/Items/Staff of thunder and lightning]], [[/Items/Staff of frost]], [[/Items/Staff of life]], [[/Items/Staff of withering]] |

The ordinary [[/Items/quarterstaff]] is always shown as a **wooden staff** and is not part of the pool.

Every other weapon appearance in the game is fixed. See [[Melee Weapons]], [[Ranged Weapons]], [[Polearms]] and [[Thrown Weapons]].

## 🧰 Tools

Tools are shuffled in nine small groups.

| Group | Appearances | Possible items |
|---|---|---|
| **Bags (10)** | brown bag, vintage bag, decorative bag, ornamental bag, antiquated bag, silvery bag, dilapidated bag, old bag, old-fashioned bag, runed bag | [[/Items/Leather bag]], [[/Items/Sack]], [[/Items/Oilskin sack]], [[/Items/Bag of holding]], [[/Items/Bag of wizardry]], [[/Items/Bag of treasure hauling]], [[/Items/Bag of the glutton]], [[/Items/Pouch of endless bolts]], [[/Items/Bag of infinite sling bullets]], [[/Items/Bag of tricks]] |
| **Candles (3)** | old-fashioned candle, twisted candle, handcrafted candle | [[/Items/Tallow candle]], [[/Items/Wax candle]], [[/Items/Magic candle]] |
| **Lamps (2)** | antiquated brass lamp, oriental brass lamp | [[/Items/Oil lamp]], [[/Items/Magic lamp]] |
| **Whistles (2)** | old whistle, shiny whistle | [[/Items/Tin whistle]], [[/Items/Magic whistle]] |
| **Flutes (2)** | oak flute, blackwood flute | [[/Items/Wooden flute]], [[/Items/Magic flute]] |
| **Horns (5)** | arched horn, spiral horn, curved horn, polished horn, twisted horn | [[/Items/Tooled horn]], [[/Items/Frost horn]], [[/Items/Fire horn]], [[/Items/Horn of chaos]], [[/Items/Horn of plenty]] |
| **Harps (2)** | ornamental harp, runed harp | [[/Items/Wooden harp]], [[/Items/Magic harp]] |
| **Drums (2)** | old drum, antiquated drum | [[/Items/Leather drum]], [[/Items/Drum of earthquake]] |
| **Jars (4)** | glass jar, crystal jar, crystalline jar, transparent jar | [[/Items/Jar of extra healing salve]], [[/Items/Jar of greater healing salve]], [[/Items/Jar of medicinal salve]], [[/Items/Jar of prodigious healing salve]] |

### Jars and their visible contents

An unidentified jar is shown together with the color of the ointment inside, for example "a crystal jar containing purple ointment". The ointment color is shuffled **together with the jar appearance**, so the four pairings below always hold within a game, but which jar type they belong to is random.

| Jar appearance | Ointment shown |
|---|---|
| **glass jar** | yellow ointment |
| **crystal jar** | purple ointment |
| **crystalline jar** | white ointment |
| **transparent jar** | violet ointment |

The [[/Items/jar of basilisk blood]] is not shuffled and always appears as an **ornamental jar containing crimson liquid**.

Other tools with a description, such as the [[/Items/brass horn]], [[/Items/torch]], [[/Items/brass lantern]], [[/Items/bell]] and [[/Items/bugle]], have fixed appearances. See [[Tools]].

## 💎 Miscellaneous Items

| Group | Appearances | Possible items |
|---|---|---|
| **Brooches (2)** | golden brooch, silver brooch | [[/Items/Brooch of shielding]], [[/Items/Brooch of haplessness]] |
| **Nose rings (3)** | golden nose ring, silver nose ring, bronze nose ring | [[/Items/Nose ring of bull strength]], [[/Items/Nose ring of bullheadedness]], [[/Items/Nose ring of cerebral safeguarding]] |
| **Headbands (3)** | shining blue headband, shining green headband, shining red headband | [[/Items/Headband of intellect]], [[/Items/Headband of martial prowess]], [[/Items/Headband of cranial tightness]] |
| **Eyeglasses (5)** | gold-framed eyeglasses, oval eyeglasses, square eyeglasses, silver-framed eyeglasses, round eyeglasses | [[/Items/Lenses]], [[/Items/Eyeglasses of hallucination]], [[/Items/Eyeglasses of awkwardness]], [[/Items/Eyeglasses of X-ray vision]], [[/Items/Eyeglasses of see invisible]] |
| **Goggles (2)** | leather-framed goggles, transparent goggles | [[/Items/Goggles of night]], [[/Items/Goggles of eye protection]] |
| **Belts (9)** | old belt, brown belt, sturdy belt, runed belt, ornamental belt, heavy belt, decorative belt, coarse belt, rudimentary belt | [[/Items/Leather belt]], [[/Items/Belt of change]], [[/Items/Belt of dwarvenkind]], [[/Items/Belt of fortitude]], [[/Items/Belt of hill giant strength]], [[/Items/Belt of stone giant strength]], [[/Items/Belt of frost giant strength]], [[/Items/Belt of fire giant strength]], [[/Items/Belt of storm giant strength]] |
| **Ioun stones (19)** | see the table below | see the table below |

The [[/Items/sunglasses]] are not part of the eyeglasses pool and always appear as **shaded eyeglasses**.

### 🔮 Ioun stones

Nineteen ioun stone types share a pool of only **17 distinct appearances**, because two colors are used twice.

| Appearance | Possible items |
|---|---|
| **cyan ioun stone** | [[/Items/Ioun stone of magical breathing]] or [[/Items/Ioun stone of sustenance]] |
| **bright green ioun stone** | [[/Items/Ioun stone of wisdom]] or [[/Items/Ioun stone of incessant hunger]] |
| black, blue, bright blue, bright cyan, brown, crimson, gray, green, orange, pink, purple, red, transparent, white, yellow | One ioun stone type each, randomly assigned |

The 19 shuffled ioun stone types are:

- [[/Items/Ioun stone of awareness]]
- [[/Items/Ioun stone of charisma]]
- [[/Items/Ioun stone of cold resistance]]
- [[/Items/Ioun stone of constitution]]
- [[/Items/Ioun stone of dexterity]]
- [[/Items/Ioun stone of experience]]
- [[/Items/Ioun stone of fire resistance]]
- [[/Items/Ioun stone of incessant hunger]]
- [[/Items/Ioun stone of intelligence]]
- [[/Items/Ioun stone of magic resistance]]
- [[/Items/Ioun stone of magical breathing]]
- [[/Items/Ioun stone of protection]]
- [[/Items/Ioun stone of regeneration]]
- [[/Items/Ioun stone of restful sleep]]
- [[/Items/Ioun stone of shock resistance]]
- [[/Items/Ioun stone of spell mastery]]
- [[/Items/Ioun stone of strength]]
- [[/Items/Ioun stone of sustenance]]
- [[/Items/Ioun stone of wisdom]]

> ⚠️ **Warning:** Because "cyan" and "bright green" are each shared by one good and one harmful stone, identifying an ioun stone by appearance alone is never fully conclusive for those two colors.

Other miscellaneous items with a description, such as the [[/Items/wings of flying]] (**artificial wings**), [[/Items/gnollish leather mask]] (**crude leather mask**) and [[/Items/beak mask of sickness resistance]] (**beak-shaped mask**), have fixed appearances. See [[Miscellaneous Items]].

## 🍄 Comestibles

The nine mushroom types are shuffled together with their materials.

| Appearances | Possible items |
|---|---|
| **brown mushroom**, **black mushroom**, **golden mushroom**, **red mushroom**, **pale white mushroom**, **violet mushroom**, **orange mushroom**, **gray mushroom**, **green mushroom** | [[/Items/Champignon]], [[/Items/Penny bun]], [[/Items/Chanterelle]], [[/Items/Fly agaric]], [[/Items/Death cap]], [[/Items/Mana mushroom]], [[/Items/Healing mushroom]], [[/Items/Panther cap]], [[/Items/Oracular toadstool]] |

> ⚠️ **Warning:** The [[/Items/death cap]] is deadly poisonous and the [[/Items/fly agaric]] is poisonous. Since all nine mushrooms share one pool, no mushroom color is safe to eat until the type has been identified.

All other comestibles, including [[/Items/slime mold]], [[/Items/food ration]] and the various globs, have fixed appearances or none at all. See [[Comestibles]] and [[Eating Guide]].

## 🪨 Gems, Glass, and Gray Stones

Gems are **not** shuffled. Instead, every gem has a fixed color, and each color is shared by a valuable gem, several less valuable gems and one worthless piece of glass. This is the identification puzzle for gems.

| Color | Possible items |
|---|---|
| **white** | [[/Items/Dilithium crystal]], [[/Items/Diamond]], [[/Items/Opal]], [[/Items/Pearl]], [[/Items/Gem of seeing]], [[/Items/Worthless piece of white glass]] |
| **black** | [[/Items/Black pearl]], [[/Items/Black opal]], [[/Items/Jet]], [[/Items/Obsidian]], [[/Items/Worthless piece of black glass]] |
| **red** | [[/Items/Ruby]], [[/Items/Garnet]], [[/Items/Jasper]], [[/Items/Worthless piece of red glass]] |
| **orange** | [[/Items/Jacinth]], [[/Items/Agate]], [[/Items/Worthless piece of orange glass]] |
| **blue** | [[/Items/Sapphire]], [[/Items/Worthless piece of blue glass]] |
| **green** | [[/Items/Emerald]], [[/Items/Jade]], [[/Items/Worthless piece of green glass]] |
| **yellow** | [[/Items/Citrine]], [[/Items/Chrysoberyl]], [[/Items/Worthless piece of yellow glass]] |
| **yellowish brown** | [[/Items/Amber]], [[/Items/Topaz]], [[/Items/Worthless piece of yellowish brown glass]] |
| **violet** | [[/Items/Amethyst]], [[/Items/Worthless piece of violet glass]] |

### Gems with a randomized color

Three gems get their color rolled at the start of each game and move between the groups above.

| Gem | Possible colors |
|---|---|
| **[[/Items/Turquoise]]** | green (1 in 2) or blue (1 in 2) |
| **[[/Items/Aquamarine]]** | green (1 in 2) or blue (1 in 2) |
| **[[/Items/Fluorite]]** | violet, blue, white or green (1 in 4 each) |

> 💡 **Tip:** A blue gem is not automatically a [[/Items/sapphire]]. Turquoise, aquamarine and fluorite can all join the blue group, which makes blue one of the least reliable colors to gamble on.

### Gray stones

The six gray stones are never shuffled and all share the same **gray** appearance.

| Appearance | Possible items |
|---|---|
| **gray stone** | [[/Items/Luckstone]], [[/Items/Loadstone]], [[/Items/Jinxstone]], [[/Items/Prayerstone]], [[/Items/Touchstone]], [[/Items/Flint]] |

See [[Gems and Stones]].

## 🗝️ Fixed Appearances That Still Hide the Item

Many items have a description that is never shuffled. The item still starts unidentified, but the appearance always means the same thing in every game, so recognizing it is pure knowledge rather than luck.

### Weapons and ammunition

| Appearance | Always is |
|---|---|
| **runed arrow** | [[/Items/Elven arrow]] |
| **crude arrow** | [[/Items/Orcish arrow]] |
| **bamboo arrow** | [[/Items/Ya]] |
| **crude crossbow bolt** | [[/Items/Gnollish quarrel]] |
| **throwing star** | [[/Items/Shuriken]] |
| **throwing spear** | [[/Items/Javelin]] |
| **runed spear** | [[/Items/Elven spear]] |
| **crude spear** | [[/Items/Orcish spear]] |
| **stout spear** | [[/Items/Dwarvish spear]] |
| **crude dagger** | [[/Items/Orcish dagger]] |
| **crudely decorated dagger** | [[/Items/Ornamental orcish dagger]] |
| **black dagger** | [[/Items/Wraithblade]] |
| **runed short sword** | [[/Items/Elven short sword]] |
| **crude short sword** | [[/Items/Orcish short sword]] |
| **broad short sword** | [[/Items/Dwarvish short sword]] |
| **curved sword** | [[/Items/Scimitar]] |
| **shining long sword** | [[/Items/Sword of holy vengeance]] |
| **black long sword** | [[/Items/Sword of unholy desecration]] |
| **bright broadsword** | [[/Items/Sword of luckiness]] |
| **black-hilted long sword** | [[/Items/Sword of nine lives stealing]] |
| **samurai sword** | [[/Items/Katana]] |
| **long samurai sword** | [[/Items/Tsurugi]] |
| **sword-shaped planar rift** | [[/Items/Black blade of disintegration]] |
| **double-headed axe** | [[/Items/Battle-axe]] |
| **broad axe** | [[/Items/Dwarvish axe]] |
| **broad pick** | [[/Items/Dwarvish mattock]] |
| **wooden mace** | [[/Items/Heavenly oak mace]] |
| **skull-headed obsidian mace** | [[/Items/Mace of the underworld]] |
| **runed war hammer** | [[/Items/Heavy war hammer]] |
| **large jagged-toothed club** | [[/Items/Two-handed club]] |
| **thonged club** | [[/Items/Aklys]] |
| **iron staff** | [[/Items/Flindbar]] |
| **wooden staff** | [[/Items/Quarterstaff]] |
| **runed long bow** | [[/Items/Elven long bow]] |
| **crude short bow** | [[/Items/Orcish short bow]] |
| **oriental long bow** | [[/Items/Yumi]] |
| **large shovel** | [[/Items/Spade of colossal excavation]] |
| **silvery saw** | [[/Items/Saw of mighty cutting]] |
| **club-headed metal rod** | [[/Items/Golf club]] |
| **iron hook** | [[/Items/Grappling hook]] |

### Polearms

Every polearm has a fixed, unique appearance:

| Appearance | Always is |
|---|---|
| **vulgar polearm** | [[/Items/Partisan]] |
| **hilted polearm** | [[/Items/Ranseur]] |
| **forked polearm** | [[/Items/Spetum]] |
| **single-edged polearm** | [[/Items/Glaive]] |
| **angled poleaxe** | [[/Items/Halberd]] |
| **long poleaxe** | [[/Items/Bardiche]] |
| **pole cleaver** | [[/Items/Voulge]] |
| **pole sickle** | [[/Items/Fauchard]] |
| **pruning hook** | [[/Items/Guisarme]] |
| **hooked polearm** | [[/Items/Bill-guisarme]] |
| **black ornamental hooked polearm** | [[/Items/Ancus]] |
| **pronged polearm** | [[/Items/Lucern hammer]] |
| **beaked polearm** | [[/Items/Bec de corbin]] |

### Armor

| Appearance | Always is |
|---|---|
| **runed hat** | [[/Items/Elven helm]] |
| **crude hood** | [[/Items/Gnollish hood]] |
| **iron skull cap** | [[/Items/Orcish helm]] |
| **hard hat** | [[/Items/Dwarvish helm]] |
| **thin metal hat** | [[/Items/Tinfoil hat of mind shielding]] |
| **cylindrical hat** | [[/Items/Silk top hat]] |
| **faded pall** | [[/Items/Elven cloak]] |
| **coarse mantelet** | [[/Items/Orcish cloak]] |
| **hooded cloak** | [[/Items/Dwarvish cloak]] |
| **slippery cloak** | [[/Items/Oilskin cloak]] |
| **apron** | [[/Items/Alchemy smock]] |
| **soft cotton robe** | [[/Items/Bathrobe]] |
| **fine robe** | [[/Items/Tailored silk robe]] |
| **crude robe** | [[/Items/Gnollish haircloth robe]] |
| **orange robe** | [[/Items/Simple gown]] |
| **crude bone armor** | [[/Items/Gnollish bone mail]] |
| **crude studded leather armor** | [[/Items/Gnollish studded leather armor]] |
| **crude leather armor** | [[/Items/Gnollish leather armor]] |
| **crude chain mail** | [[/Items/Orcish chain mail]] |
| **crude ring mail** | [[/Items/Orcish ring mail]] |
| **armor-shaped force field** | [[/Items/Force field armor]] |
| **blue and green shield** | [[/Items/Elven shield]] |
| **black shield** | [[/Items/Orcish shield]] |
| **large black shield** | [[/Items/Great orcish shield]] |
| **large round shield** | [[/Items/Dwarvish roundshield]] |
| **polished silver shield** | [[/Items/Shield of reflection]] |
| **polished silver bracers** | [[/Items/Bracers of reflection]] |
| **walking shoes** | [[/Items/Low boots]] |
| **hard shoes** | [[/Items/Shoes]] |
| **jackboots** | [[/Items/High boots]] |

### Tools and other items

| Appearance | Always is |
|---|---|
| **religious symbol** | [[/Items/Holy symbol]] |
| **glass orb** | [[/Items/Crystal ball]] |
| **metal can containing viscous fluid** | [[/Items/Can of grease]] |
| **small runed cube** | [[/Items/Cubic gate]] |
| **sandalwood chest** | [[/Items/Magic chest]] |
| **gold-encrusted bag** | [[/Items/Expensive handbag]] |
| **silk-woven bag** | [[/Items/Oriental silk sack]] |
| **cylindrical bag** | [[/Items/Quiver of infinite arrows]] |
| **wooden grail containing red liquid** | [[/Items/Grail of healing]] |
| **ornamental jar containing crimson liquid** | [[/Items/Jar of basilisk blood]] |
| **artificial wings** | [[/Items/Wings of flying]] |
| **shaded eyeglasses** | [[/Items/Sunglasses]] |
| **crude leather mask** | [[/Items/Gnollish leather mask]] |
| **beak-shaped mask** | [[/Items/Beak mask of sickness resistance]] |
| **gray glob** | [[/Items/Glob of gray ooze]] |
| **brown glob** | [[/Items/Glob of brown pudding]] |
| **green glob** | [[/Items/Glob of green slime]] |
| **black glob** | [[/Items/Glob of black pudding]] |

## ⚠️ Appearances Shared by More Than One Item

A few appearances outside the shuffled pools are used by two or more item types. These stay ambiguous in every game.

| Appearance | Possible items |
|---|---|
| **runed dagger** | [[/Items/Elven dagger]] or [[/Items/Elven runedagger]] |
| **runed broadsword** | [[/Items/Elven broadsword]] or [[/Items/Runesword]] |
| **ornamental long bow** | [[/Items/Divine long bow]] or [[/Items/Galadhrim bow]] |
| **looking glass** | [[/Items/Mirror]] or [[/Items/Magic mirror]] |
| **key** | [[/Items/Skeleton key]], [[/Items/Geometric key]], [[/Items/Ornamental key]] or [[/Items/Master key]] |
| **splash of blinding venom** / **splash of acid venom** | Either venom type; these two descriptions are shuffled against each other, so the name of a venom splash may not match its real type |

The other keys, such as the [[/Items/magic key]], [[/Items/stone key]], [[/Items/bronze key]], [[/Items/silver key]], [[/Items/gold key]], [[/Items/platinum key]], [[/Items/mithril key]], [[/Items/orichalcum key]] and [[/Items/adamantium key]], have no appearance of their own and are always shown by their real names.

## 📊 What the Appearance Does and Does Not Tell You

| Clue | Reliable? | Explanation |
|---|---|---|
| **Appearance text** | Only within its group | It narrows the item down to the members of its shuffle pool, never further. |
| **Display color and tile** | Follows the appearance | Colors and tiles are shuffled together with the description, so they never leak the true type. |
| **Material shown in the name** | Follows the appearance | For groups that shuffle materials, the material is part of the disguise. For the other groups, the material equals the type's base material and is therefore hidden. |
| **Base price** | Yes | Prices stay with the true item type, which is why shop price identification works. |
| **Weight** | Yes | Weight stays with the true item type. |
| **Spellbook read prompt** | Yes | The "contains ... magic" hint is bound to the real spell, not to the cover. |
| **Jar ointment color** | Follows the appearance | The ointment color and the jar description are always the same pairing, but which jar type they mark is random. |
| **Wand direction prompt** | Partly | The [[/Items/wand of nothing]] is randomly a directional or non-directional wand in each game. |

### Items with no appearance at all

Some item categories are always shown by their real names and never require identification of the type:

- All [[Reagents]].
- Most ordinary weapons, suits of armor and shields without a racial or special variant.
- Coins, ordinary rocks, boulders, statues and most [[Art Objects]].
- Ordinary comestibles such as rations, fruit and corpses.

> ℹ️ **Note:** The [[/Items/cotton slippers]] have a purely cosmetic second tile that is chosen randomly for each individual pair when it is created. This affects only the picture, never the name or the behavior.

## 💡 Summary

- Appearances are shuffled **once per game**, inside fixed groups, and are stored in the save file.
- Shuffling moves the description, the color, the tile and sometimes the material, but **never** the price, the weight or the effects.
- The **only fixed potion appearances** are clear (water), dark ruby (dwarven mushroom brew) and pale yellow (urine).
- Scrolls and wands have **more appearances than items**, so some labels and wand descriptions belong to nothing in a given game.
- Spellbook covers rarely matter, because reading a book identifies it, and the 26 books that must be read announce their school truthfully beforehand.
- Gems are **not** shuffled, but each color pools several gems together with a worthless piece of glass, and turquoise, aquamarine and fluorite change color group at the start of each game.
- Many racial, mundane and special items have **fixed appearances**, so learning that table is a permanent advantage across all your games.
