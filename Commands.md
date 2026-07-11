> 👉 **This page lists all the commands available in GnollHack, organized by theme.**

GnollHack supports playing with a physical keyboard on all platforms, including modern mobile and desktop clients. Keyboard shortcuts on this wiki are written in lowercase notation: a single letter (e.g. `e`) represents a normal key, and modifier combinations are written with a plus sign (e.g. `Shift+e`, `Alt+e`, `Ctrl+e`, `Alt+Shift+e`).

## 🧭 Movement and Exploration

Use the following commands to navigate the dungeon, climb stairs, rest, and search.

| Command | Hotkey | Description | Notes |
| :--- | :---: | :--- | :--- |
| **Go Down** | `>` | Go down a staircase or ladder to the next level. | |
| **Go Up** | `<` | Go up a staircase or ladder to the previous level. | |
| **Wait** | `.` | Rest or wait for one turn (does nothing). | Pass time or let monsters approach. |
| **Travel** | `_` | Automatically travel to a selected map tile. | Uses a pathfinding algorithm to navigate. |
| **Search** | `s` | Search adjacent tiles for hidden secret doors and traps. | Success depends on perception and luck. |
| **Go Mode (Rush)** | `g` | Move in a direction, stopping at interesting features. | Stops when seeing a monster, door, trap, etc. |
| **Move Mode (Rush)** | `m` | Move in a direction without picking up items on the ground. | |
| **Go Mode (Run)** | `Shift+g` | Run in a direction until blocked or interrupted. | Stops at walls, monsters, or interesting objects. |
| **Move Mode (Run)** | `Shift+m` | Run in a direction without picking up items on the ground. | |
| **Jump** | `j` | Jump to a nearby tile. | Alternate hotkey: `Alt+j`. Requires jumping ability. |
| **Untrap** | `u` | Attempt to disarm a trap, untrap a container/door, or rescue a trapped monster. | Alternate hotkey: `Alt+u`. |
| **Ride** | `Alt+Shift+r` | Mount or dismount a saddled steed. | |
| **Sit** | `Ctrl+s` | Sit down on the floor, a throne, or another seat. | Sitting on a throne can trigger magical effects. |

### 🧭 Directional Controls

You can move in the eight cardinal and diagonal directions using several different layout controls.

### 🧭 Arrow Keys

On keyboards without a number pad, you can combine the arrow keys with **Ctrl** or **Alt** to move diagonally:

| Key | Cardinal | Ctrl + Key | Diagonal | Alt + Key | Diagonal |
| :---: | :---: | :---: | :---: | :---: | :---: |
| ↑ | North (`↑`) | Ctrl + ↑ | Northwest (`↖`) | Alt + ↑ | Northeast (`↗`) |
| ↓ | South (`↓`) | Ctrl + ↓ | Southwest (`↙`) | Alt + ↓ | Southeast (`↘`) |
| ← | West (`←`) | Ctrl + ← | Northwest (`↖`) | Alt + ← | Southwest (`↙`) |
| → | East (`→`) | Ctrl + → | Northeast (`↗`) | Alt + → | Southeast (`↘`) |

### 🧭 Number Pad

If your keyboard has a number pad, enable **Num Lock** and use the keys as follows:

- **7**, **8**, **9** for Northwest, North, Northeast.
- **4**, **6** for West, East.
- **1**, **2**, **3** for Southwest, South, Southeast.
- **5** in the center enables run/rush mode.

### 🧭 Regular Number Keys

On compact keyboards without a number pad, the regular number keys can be used for direction:

- **7**, **8**, **9** for Northwest, North, Northeast.
- **4**, **6** for West, East.
- **1**, **2**, **3** for Southwest, South, Southeast.
- **5** in the center enables run/rush mode.

## ⚔️ Combat and Attacks

These commands are used for attacking, shooting, throwing, and managing your active weapons.

| Command | Hotkey | Description | Notes |
| :--- | :---: | :--- | :--- |
| **Wield Weapon** | `w` | Wield a weapon or tool as your primary weapon. | Use `-` to wield bare hands. |
| **Fire** | `f` | Shoot or throw ammunition currently loaded in your quiver. | |
| **Throw** | `t` | Throw an object or weapon from your inventory in a specified direction. | |
| **Swap Weapons** | `x` | Swap your primary wielded weapon with your secondary/alternate weapon. | |
| **Quiver** | `Shift+q` | Select ammunition (arrows, daggers, etc.) to load into your quiver for firing. | |
| **Kick** | `k` | Kick an adjacent door, chest, monster, or other object. | Alternate hotkey: `Ctrl+d`. |
| **Fight** | `Shift+f` | Attack/fight in a specified direction, even if you do not see a monster. | Forces attack on a tile (useful for invisible foes). |
| **Dual Weapon Mode** | `Ctrl+x` | Toggle dual-wielding mode (two-weapon combat) on or off. | |
| **Apply Polearm** | `Alt+Shift+p` | Strike a monster from a distance of two tiles using a wielded polearm or lance. | The polearm can also be a swap weapon. |
| **Wield Previous** | `Alt+Shift+w` | Wield the weapon you previously had wielded. | Useful after using a tool. |
| **Handedness** | `Alt+h` | Toggle weapon swapping mode. | Switch between swapping weapons in right hand only or in both hands. |

## 🎒 Inventory and Item Management

Use these commands to view, organize, select, and inspect items in your inventory or on the ground.

| Command | Hotkey | Description | Notes |
| :--- | :---: | :--- | :--- |
| **Inventory** | `i` | Display all items currently carried in your inventory. | |
| **Pick Up** | `,` | Pick up items from the floor at your current position. | |
| **Drop** | `d` | Drop an item onto the floor. | |
| **Pick Up and Stash** | `;` | Pick up items and automatically insert them into the best container in your inventory. | |
| **Examine** | `Alt+x` | Examine an item to view its detailed statistics and properties. | |
| **Near Look** | `:` | Look at the ground/items present at your current tile. | |
| **Drop Multiple** | `Shift+d` | Drop multiple items from your inventory at once. | |
| **Filtered Inventory** | `Shift+i` | Display a filtered list of inventory items. | e.g. unpaid items, specific item classes. |
| **Adjust Letters** | `Alt+a` | Adjust inventory letters for items. | |

## 🚪 Containers and Door Interaction

Commands for interacting with doors, chests, and bags.

| Command | Hotkey | Description | Notes |
| :--- | :---: | :--- | :--- |
| **Open Door** | `o` | Open an adjacent closed door. | |
| **Close Door** | `c` | Close an adjacent open door. | |
| **Loot** | `l` | Loot a container on the floor, saddle/unsaddle a steed, or retrieve items from decorations (such as torch holders). | Alternate hotkey: `Alt+l`. |
| **Take Out of Bag** | `b` | Take one or more items out of a container in your inventory. | |
| **Put Into Bag** | `Shift+b` | Put one or more items into a container in your inventory. | |
| **Yank (Take Loot)** | `y` | Take one or more items out of a container that is lying on the floor. | |
| **Yank (Put Loot)** | `Shift+y` | Put one or more items into a container that is lying on the floor. | |
| **Tip (Empty)** | `Alt+Shift+t` | Tip/empty a container to dump all of its contents onto the floor. | |
| **Force Lock** | `Alt+f` | Force a lock on a chest or door using a weapon or tool. | |
| **Break** | `Ctrl+b` | Break an item in your inventory to release its magic or contents. | e.g. breaking a wand or potion. |

## 🛠️ Consumables and General Tools

These commands are used to eat, drink, apply utility tools, and manage light sources.

| Command | Hotkey | Description | Notes |
| :--- | :---: | :--- | :--- |
| **Apply Tool** | `a` | Apply (use) a tool, such as a key, lamp, or pick-axe. | |
| **Eat** | `e` | Eat food or another edible item in your inventory or on the floor. | |
| **Drink (Quaff)** | `q` | Drink a potion, water, or other beverage from your inventory or the floor. | |
| **Light / Snuff** | `Ctrl+l` | Light or snuff out a nearby light source, like a lamp or candle. | |
| **Dig** | `Ctrl+g` | Dig the ground or a wall. | Requires a pick-axe or other digging tool. |
| **Engrave** | `Shift+e` | Write a message on the floor using a tool or your fingers (dust). | |
| **Engrave Quick** | `Alt+Shift+e` | Quickly engrave on the floor using a predefined style or finger. | |
| **Wipe Face** | `Alt+e` | Wipe off dirt, grease, slime, or other substances from your face. | |
| **Rub** | `Alt+r` | Rub a lamp or other object. | Can summon a genie if successful. |
| **Dip** | `Alt+d` | Dip an object into a potion, fountain, sink, or a pool of water. | |
| **Apply Pick-axe Quick** | `Alt+Shift+x` | Quickly apply a pick-axe, mattock, or other cutting tool to dig/cut in a direction. | |

## 🔮 Magic and Spellcasting

Commands to cast spells, use wands, read scrolls, and mix components.

| Command | Hotkey | Description | Notes |
| :--- | :---: | :--- | :--- |
| **Cast Spell** | `Shift+z` | Cast a spell that you have learned. | |
| **Spell Menu** | `+` | Open the spell menu to view or cast spells. | Alternate hotkey: `Alt+z`. |
| **Zap Wand** | `z` | Zap a magic wand in a specified direction. | |
| **Read** | `r` | Read a scroll, spellbook, or engraving. | |
| **Invoke** | `Alt+i` | Invoke the powers of a magical object or artifact. | |
| **Mix Spells** | `Shift+x` | Mix material components (reagents) for a spell. | |

## 👕 Equipment and Wearables

Commands to view, wear, and remove armor and accessories.

| Command | Hotkey | Description | Notes |
| :--- | :---: | :--- | :--- |
| **Equipment** | `*` | Show a list of all your equipped items. | Combines armor, weapons, rings, amulets, and tools. |
| **Wear Armor** | `Shift+w` | Put on a piece of armor (helmet, body armor, gloves, boots, etc.). | |
| **Take Off Armor** | `Shift+t` | Take off a single piece of armor you are currently wearing. | |
| **Wear Many** | `Alt+w` | Put on multiple pieces of armor. | |
| **Take Off Many** | `Alt+t` | Take off multiple pieces of armor at once. | |
| **Put On Accessory** | `Shift+p` | Put on an accessory such as a ring, amulet, or pair of glasses. | |
| **Remove Accessory** | `Shift+r` | Remove an accessory (ring, amulet, etc.) that you are currently wearing. | |
| **Show Worn Armor** | `[` | Display all pieces of armor you are currently wearing. | |
| **Show Worn Rings** | `=` | Display the rings you are currently wearing. | |
| **Show Worn Amulet** | `"` | Display details of the amulet you are currently wearing. | |
| **Show Weapon** | `)` | Display the weapon you are currently wielding. | |
| **List Tools** | `(` | Display a list of tools you are currently using. | |

## 📖 Information and UI Controls

These commands open information screens, name entities, and control the user interface.

| Command | Hotkey | Description | Notes |
| :--- | :---: | :--- | :--- |
| **Character Details** | `}` | Display detailed information, statistics, and attributes of your character. | |
| **Abilities** | `Shift+a` | View your character's active and passive abilities. | Opens the status screen. |
| **Look** | `Shift+l` | Examine your surroundings or a specific tile on the map. | |
| **Far Look** | `/` | Look at a distant tile on the map to identify what symbol represents. | |
| **Chat** | `Shift+c` | Chat with an adjacent monster, pet, or NPC. | |
| **Yell for Pets** | `Alt+y` | Yell to summon your pet to your side. | Alternate hotkey: `Ctrl+y`. |
| **Dungeon Overview** | `Ctrl+o` | Show the dungeon overview screen listing visited levels and features. | |
| **Annotate Level** | `Ctrl+n` | Add a text annotation/note to the current dungeon level. | Alternate hotkey: `Alt+Shift+a`. |
| **Name** | `Shift+n` | Name a specific monster, individual item, or category of items. | |
| **Name Category** | `Alt+Shift+n` | Assign a name to a specific monster or category of objects. | |
| **Call** | `Ctrl+c` | Assign a name/call name to a monster, an object, or an object class. | |
| **Previous Message** | `Ctrl+p` | Recall and display the previous message(s). | |
| **Redraw Screen** | `Ctrl+r` | Redraw the entire screen. | |
| **Use Monster Ability** | `Alt+Shift+m` | Use a special ability of your current monster form (if polymorphed). | |
| **Help** | `h` | Display the help menu with game information and commands. | Alternate hotkey: `?`. |

### 🔍 Zoom and View Controls

You can adjust the map zoom level using the following keyboard shortcuts:

| Command | Hotkey | Alternate Hotkey |
| :--- | :---: | :---: |
| **Zoom In** | `Ctrl++` | `Alt++` |
| **Zoom Out** | `Ctrl+-` | `Alt+-` |
| **Reset Zoom** | `Ctrl+0` | `Alt+0` |
| **Toggle Minimap Mode** | `Ctrl+.` | `Alt+.` |

## ⚙️ Game Control and System Meta Commands

Commands that manage the game state, save progress, or display settings.

| Command | Hotkey | Description | Notes |
| :--- | :---: | :--- | :--- |
| **Save** | `Alt+s` | Save the game and exit. | Saves progress securely and returns to the main menu. |
| **Commands Menu** | `Alt+c` | Open the commands menu. | Extremely useful for touchscreen and keyboard-less players. |
| **Repeat** | `Ctrl+a` | Redo/repeat the previous command. | |
| **Number of Actions**<sup>1</sup> | `n` | Specify a repetition count before entering a command. | Alternate hotkey: `Alt+n`. |
| **Pray** | `Alt+p` | Pray to your deity for help, healing, or safety. | See the [[Praying]] guide for details. |
| **Offer Sacrifice** | `Alt+o` | Offer an item or corpse as a sacrifice on an altar to your deity. | |
| **Extended Command** | `#` | Prompt for and execute an extended command (e.g. `#pray`, `#sit`, `#chat`). | |
| **Options** | `Shift+o` | View and modify game options. | See the [[Options]] page. |
| **Pay Bill** | `p` | Pay your shopping bill to the shopkeeper. | |
| **Vanquished Creatures** | `Alt+k` | Show the list of monsters you have killed during the game. | |
| **Genocided Monsters** | `Alt+g` | Show a list of all genocided monster species. | |
| **Version Info** | `v` | Display the version number and build details of the game. | |
| **Game History Info** | `Shift+v` | Display the game's compilation options and version history. | |
| **GnollHack Library Info** | `Alt+v` | Display details about the compiled GnollHack libraries and build. | |
| **Quit** | `Alt+q` | Quit the game (deletes your character and ends the current game session). | |

- <sup>1</sup> Number of actions works like this: press `n`, then write the number of actions in numerals, and then choose the action. For example, `n20s` searches 20 times.

## 🧙‍♂️ Wizard Mode Commands

These commands are only available when playing in [[Wizard mode]] (developer debug mode).

| Command | Hotkey | Description |
| :--- | :---: | :--- |
| **Wish** | `Ctrl+w` | Make a wish for any item. |
| **Reveal Map** | `Ctrl+f` | Reveal the entire map of the current level. |
| **Detect** | `Ctrl+e` | Detect hidden features on the map. |
| **Identify** | `Ctrl+i` | Identify all items in your inventory. |
| **Level Teleport** | `Ctrl+v` | Teleport to a different level of the dungeon. |
| **Genesis** | `Alt+m` | Create a monster. |
